import numpy as np
import tensorflow as tf
from tensorflow import keras

# Categories must match the order used during training
categories = ['car', 'cat', 'dog', 'house', 'tree']

# Load the trained model
model = keras.models.load_model('backend/my_model_full.keras')

def process_image(img_path):
    from PIL import Image
    img = Image.open(img_path).convert('L').resize((28, 28))
    img_arr = np.array(img) / 255.0  # Convert to array and normalize
    img_arr = img_arr.reshape(1, 28, 28, 1)  # Add batch and channel dimensions
    return img_arr





img_path = 'C:\CODE\AI-Sketch-Classifier\sample_car_4.png'  # Change this to your image path
img_array = process_image(img_path)
prediction = model.predict(img_array)
predicted_class = np.argmax(prediction)
print('Predicted class:', categories[predicted_class])



