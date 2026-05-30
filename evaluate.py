import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.metrics import classification_report, confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt

model = load_model(r"C:\Users\VICTUS\Documents\Breast Cancer\model\breast_cancer_model.h5")

datagen = ImageDataGenerator(rescale=1./255, validation_split=0.2)
val_gen = datagen.flow_from_directory(
    r"C:\Users\VICTUS\Documents\Breast Cancer\data_flat",
    target_size=(50, 50), batch_size=32,
    class_mode="binary", subset="validation", shuffle=False
)

preds = (model.predict(val_gen) > 0.5).astype(int).flatten()
true = val_gen.classes

print(classification_report(true, preds, target_names=["Benign", "Malignant"]))

cm = confusion_matrix(true, preds)
sns.heatmap(cm, annot=True, fmt="d", cmap="Blues",
            xticklabels=["Benign","Malignant"],
            yticklabels=["Benign","Malignant"])
plt.title("Confusion Matrix")
plt.savefig("confusion_matrix.png")
plt.show()