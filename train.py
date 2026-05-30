import os
import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.utils import class_weight
import matplotlib.pyplot as plt

# ── CONFIG ──────────────────────────────────────────────
DATA_DIR = r"C:\Users\VICTUS\Documents\Breast Cancer\data\archive"
FLAT_DIR = r"C:\Users\VICTUS\Documents\Breast Cancer\data_flat"
MODEL_PATH = r"C:\Users\VICTUS\Documents\Breast Cancer\model\breast_cancer_model.h5"
IMG_SIZE = (50, 50)
BATCH_SIZE = 32
EPOCHS = 15

# ── DATA LOADING ─────────────────────────────────────────
# The kaggle dataset has patient folders, each with 0/ and 1/ subfolders
# We need to flatten it into a single benign/malignant structure first

from pathlib import Path

FLAT_DIR = r"C:\Users\VICTUS\Documents\Breast Cancer\data_flat"

# ── GENERATORS ───────────────────────────────────────────
datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2,
    horizontal_flip=True,
    vertical_flip=True,
    rotation_range=20
)

train_gen = datagen.flow_from_directory(
    FLAT_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode="binary",
    subset="training"
)

val_gen = datagen.flow_from_directory(
    FLAT_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode="binary",
    subset="validation"
)

# ── CLASS WEIGHTS (dataset is imbalanced) ────────────────
labels = train_gen.classes
weights = class_weight.compute_class_weight(
    class_weight="balanced",
    classes=np.unique(labels),
    y=labels
)
class_weights = dict(enumerate(weights))
print("Class weights:", class_weights)

# ── MODEL (Transfer Learning - MobileNetV2) ──────────────
base_model = tf.keras.applications.MobileNetV2(
    input_shape=(50, 50, 3),
    include_top=False,
    weights="imagenet"
)
base_model.trainable = False  # freeze pretrained layers

model = models.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.Dense(128, activation="relu"),
    layers.Dropout(0.3),
    layers.Dense(1, activation="sigmoid")  # binary output
])

model.compile(
    optimizer="adam",
    loss="binary_crossentropy",
    metrics=["accuracy", tf.keras.metrics.AUC(name="auc")]
)

model.summary()

# ── TRAINING ─────────────────────────────────────────────
history = model.fit(
    train_gen,
    validation_data=val_gen,
    epochs=EPOCHS,
    class_weight=class_weights
)

# ── SAVE ─────────────────────────────────────────────────
os.makedirs("./model", exist_ok=True)
model.save(MODEL_PATH)
print(f"Model saved to {MODEL_PATH}")

# ── PLOT ─────────────────────────────────────────────────
plt.figure(figsize=(12, 4))
plt.subplot(1, 2, 1)
plt.plot(history.history["accuracy"], label="Train Acc")
plt.plot(history.history["val_accuracy"], label="Val Acc")
plt.legend(); plt.title("Accuracy")

plt.subplot(1, 2, 2)
plt.plot(history.history["loss"], label="Train Loss")
plt.plot(history.history["val_loss"], label="Val Loss")
plt.legend(); plt.title("Loss")
plt.savefig("./model/training_plot.png")
plt.show()



