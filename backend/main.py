

import numpy as np
import matplotlib.pyplot as plt
categories = ['car', 'cat', 'dog', 'house', 'tree']
for category in categories:
    sample_data = np.load(f"backend/dataset/{category}.npy")
    print(sample_data.shape)
    # img = sample_data[2].reshape(28, 28)
    # plt.imshow(img, cmap='gray')
    # plt.title(category)
    # plt.show(block=False)
    # plt.pause(2)
    # plt.close()



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

# Find the minimum number of samples across all categories
min_samples = min([np.load(f'backend/dataset/{category}.npy').shape[0] for category in categories])

# Load data and create balanced labels
for idx, category in enumerate(categories):
    imgs = np.load(f'backend/dataset/{category}.npy')
    if imgs.shape[0] > min_samples:
        # Randomly select min_samples indices
        selected_indices = np.random.choice(imgs.shape[0], min_samples, replace=False)
        imgs = imgs[selected_indices]
    data.append(imgs)
    labels.append(np.full(imgs.shape[0], idx))


# Visual inspection: Display 3 random images from each class
import matplotlib.pyplot as plt
for idx, category in enumerate(categories):
    imgs = data[idx]
    rand_indices = np.random.choice(imgs.shape[0], 3, replace=False)
    for i, img_idx in enumerate(rand_indices):
        plt.subplot(1, 3, i+1)
        plt.imshow(imgs[img_idx].reshape(28, 28), cmap='gray')
        plt.title(f'{category}')
        plt.axis('off')
    plt.suptitle(f'Random samples from {category}')
    plt.show()


#Stacking all the arrays into one array
X = np.concatenate(data, axis = 0)
y = np.concatenate(labels, axis = 0)

# Print label distribution before shuffling
unique, counts = np.unique(y, return_counts=True)
print('Label distribution before shuffling:')
for cat, count in zip(categories, counts):
    print(f'{cat}: {count}')

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




