from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = FastAPI()

# Allow Lovable frontend to call this
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = tf.keras.models.load_model("./model/breast_cancer_model.h5")

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    img = Image.open(io.BytesIO(contents)).convert("RGB")
    img = img.resize((50, 50))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)  # shape: (1, 50, 50, 3)

    prediction = model.predict(img_array)[0][0]
    confidence = float(prediction)

    result = {
        "prediction": "malignant" if confidence > 0.5 else "benign",
        "result": "Malignant (Positive)" if confidence > 0.5 else "Benign (Negative)",
        "confidence": round(confidence * 100, 2),
        "raw_score": confidence
    }
    return result

@app.get("/")
def root():
    return {"status": "Breast Cancer Classifier API is running"}