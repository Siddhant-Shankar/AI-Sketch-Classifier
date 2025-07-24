import numpy as np
from fastapi import FastAPI, File, UploadFile
from tensorflow import keras
from PIL import Image
import io
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
#Creating the fast API object

app.add_middleware(
       CORSMiddleware,
       allow_origins=["*"],  # Or specify ["http://localhost:5174"] for more security
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )

categories = ['car', 'cat', 'dog', 'house', 'tree']
model = keras.models.load_model('backend\my_model_full.keras')


def process_image(image_bytes): 
    #Model to prepare an image for input into a machine learning model
    img = Image.open(io.BytesIO(image_bytes)).convert('L').resize((28, 28)) #Prepares the byte_data into a file - like object understood by PIL
    img_arr = np.array(img) / 255 #Normalizing the image(in array format)
    img_arr = img_arr.reshape(1, 28, 28, 1) #Reshaping the image to the input shape of the model
    return img_arr

@app.get("/")
def read_root():
    return {"message": "Welcome to the Sketch Classifier API"}

#app.get requests handle HTTTP Get requests when the client wants something from the server
#This defines an endpoint that returns a JSON response with a message

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read() #Reads the file from the request
    img_arr = process_image(image_bytes) #Processes the image
    prediction = model.predict(img_arr) #Makes a prediction using the model
    category = categories[np.argmax(prediction)] #Gets the category with the highest probability
    return {"category": category} #Returns the category as a JSON response


#app.post requests handle HTTP POST requests when the client wants to send data to the server
#This defines an endpoint at /predict that expects a POST request with a body payload, e.g. a JSON object.

#The parameters part of both methods is the route path and optional metadata