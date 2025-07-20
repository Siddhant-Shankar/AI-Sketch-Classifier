# # import numpy as np
# # cat_data = np.load('dataset/cat.npy')

# # print(cat_data.shape)

# # import matplotlib.pyplot as plt
# # img = cat_data[1].reshape(28, 28)

# # plt.imshow(img, cmap='gray')
# # plt.show()

# import numpy as np
# import matplotlib.pyplot as plt
# categories = ['car', 'cat', 'dog', 'house', 'tree']
# for category in categories:
#     cat_data = np.load(f"dataset/{category}.npy")
#     img = cat_data[0].reshape(28, 28)
#     plt.imshow(img, cmap='gray')
#     plt.title(category)
#     plt.show(block=False)
#     plt.pause(2)
#     plt.close()



#Implementing the main data preparation steps after setting up the virtual enviornement
import numpy as np
from sklearn.model_selection import train_test_split
from tensorflow import keras
from keras.utils import to_categorical

# import os
# print(os.getcwd)


categories = ['car', 'cat', 'dog', 'house', 'tree']

data = []
labels = []

#Load data and create labels
for idx, category in enumerate(categories): 
    imgs = np.load(f'backend/dataset/{category}.npy')
    #print(imgs.shape[0]) #Seeing how many pictures are in the numpy array
    data.append(imgs)
    labels.append(np.full(imgs.shape[0], idx)) #Creates a numpy array of idx listed out how many ever times as in imgs.shape[0] [1,1,1,1,1,1,1 .... how many ever times for example]


#Stacking all the arrays into one array
X = np.concatenate(data, axis = 0)
y = np.concatenate(labels, axis = 0)

#Shuffling the dataset using indices to mantain uniformity across X and Y
indices = np.arange(X.shape[0])
np.random.shuffle(indices)
X = X[indices]
y = y[indices]

#Normalize the images
X = X/255.0

#Reshaping the image for cnnn
X = X.reshape(-1, 28, 28, 1)

#Train - Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

#One hot encoding using to - categorical from keras
y_train = to_categorical(y_train, num_classes=len(categories))
y_test = to_categorical(y_test, num_classes=len(categories))

print("Data preparation complete!")
print("X_train shape:", X_train.shape)
print("y_train shape:", y_train.shape)
print("X_test shape:", X_test.shape)
print("y_test shape:", y_test.shape)


from model import create_model

model = create_model(input_shape=(28, 28, 1), num_classes=len(categories))
history = model.fit(X_train, y_train, epochs=10, batch_size=32, validation_data=(X_test, y_test))

model.save('backend/my_model_full.keras')
print("Full model saved to backend/my_model_full.keras")

# Save only the weights (filename must end with .weights.h5)
model.save_weights('backend/my_model.weights.h5')
print("Model weights saved to backend/my_model.weights.h5")