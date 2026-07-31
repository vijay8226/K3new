import os
from PIL import Image

images_dir = r"c:\Users\Jarvis\OneDrive\Desktop\k3\k3new\images"

for fname in os.listdir(images_dir):
    fpath = os.path.join(images_dir, fname)
    if os.path.isfile(fpath) and fname.lower().endswith(('.png', '.jpg', '.jpeg')):
        try:
            im = Image.open(fpath)
            # Resize if dimensions are larger than 1920
            if im.width > 1920 or im.height > 1920:
                im.thumbnail((1920, 1920), Image.Resampling.LANCZOS)
            
            webp_name = os.path.splitext(fname)[0] + '.webp'
            webp_path = os.path.join(images_dir, webp_name)
            
            # Save RGB
            if im.mode in ("RGBA", "P"):
                im = im.convert("RGB")
            
            im.save(webp_path, 'WEBP', quality=82, optimize=True)
            print(f"Converted {fname} ({os.path.getsize(fpath)} bytes) -> {webp_name} ({os.path.getsize(webp_path)} bytes)")
        except Exception as e:
            print(f"Error processing {fname}: {e}")
