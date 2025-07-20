# import numpy as np
# from PIL import Image

# # Load an image from your dataset (change category as needed)
# imgs = np.load('backend/dataset/dog.npy')  # e.g., 'cat.npy', 'car.npy', etc.
# img = imgs[1]  # Pick the first image

# # Convert the numpy array to a PIL Image (ensure dtype is uint8)
# if img.dtype != np.uint8:
#     img = (img * 255 / img.max()).astype(np.uint8)  # Scale if needed

# img_pil = Image.fromarray(img)
# img_pil.save('sample_cat_2.png')  # Save as PNG

# print("Sample image saved as sample_cat_2.png")