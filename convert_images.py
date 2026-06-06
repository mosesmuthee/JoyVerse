import os
from PIL import Image

def convert_images(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.jpg', '.jpeg')):
                img_path = os.path.join(root, file)
                try:
                    img = Image.open(img_path)
                    webp_path = os.path.splitext(img_path)[0] + ".webp"
                    img.save(webp_path, "WEBP")
                    print(f"Converted: {file} to WebP")
                except Exception as e:
                    print(f"Failed to convert {file}: {e}")

convert_images(r"C:\Users\Hp\Desktop\My JB❤\Combined\images\joy")
convert_images(r"C:\Users\Hp\Desktop\My JB❤\Combined\images\us")
