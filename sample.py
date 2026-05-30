import os
import shutil
import random
from pathlib import Path
from PIL import Image

SOURCE_DIR = r"C:\Users\VICTUS\Documents\Breast Cancer\data\archive"
OUTPUT_DIR = r"C:\Users\VICTUS\Documents\Breast Cancer\data_flat"
SAMPLES_PER_CLASS = 32500  # 32.5k x 2 = 65k total

def is_valid_image(path):
    try:
        with Image.open(path) as img:
            img.verify()
        return True
    except:
        return False

benign = []
malignant = []

print("Scanning folders...")
for patient in os.listdir(SOURCE_DIR):
    patient_path = os.path.join(SOURCE_DIR, patient)
    if not os.path.isdir(patient_path):
        continue
    for label in ["0", "1"]:
        label_path = os.path.join(patient_path, label)
        if not os.path.exists(label_path):
            continue
        for img in os.listdir(label_path):
            full_path = os.path.join(label_path, img)
            if label == "0":
                benign.append(full_path)
            else:
                malignant.append(full_path)

print(f"Found {len(benign)} benign, {len(malignant)} malignant")

random.shuffle(benign)
random.shuffle(malignant)

for label, images in [("0", benign), ("1", malignant)]:
    out = os.path.join(OUTPUT_DIR, label)
    Path(out).mkdir(parents=True, exist_ok=True)
    saved = 0
    skipped = 0
    for src in images:
        if saved >= SAMPLES_PER_CLASS:
            break
        if not is_valid_image(src):
            skipped += 1
            continue
        dst = os.path.join(out, f"{label}_{saved}.png")
        shutil.copy2(src, dst)
        saved += 1
        if saved % 5000 == 0:
            print(f"Class {label}: {saved}/{SAMPLES_PER_CLASS} copied...")
    print(f"Class {label} done: {saved} saved, {skipped} corrupted skipped")

print("Done! 65k images ready in data_flat")

