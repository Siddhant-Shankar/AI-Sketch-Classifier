from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout


def create_model(input_shape, num_classes): 
    model = Sequential([
        Conv2D(32, (3,3), activation='relu', input_shape=input_shape),
        MaxPooling2D(2,2), 
        Conv2D(64, (3,3), activation = 'relu'), 
        MaxPooling2D(2,2), 
        Flatten(),
        Dense(128, activation = 'relu'),
        Dropout(0.5),
        Dense(num_classes, activation = 'softmax')
    ])
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    return model



#Quick notes about all the parts of the Sequenial model
# Conv 2d - Convolutional Layer - Applies a set of filters (small matrices) to the input image to extract features (like edges, shapes, etc.).
#Max 2d - Pooling Layer - Reduces the spatial size (width and height) of the feature maps by taking the maximum value in each region (usually 2x2).
# Flatten - Converts the 2d map into a 1d vector
# Dense - Fully connected network
# Dropout - randomly excludes a specific set of neurons to prevent ovcerfitting
