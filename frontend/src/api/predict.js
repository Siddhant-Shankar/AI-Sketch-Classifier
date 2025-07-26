// src/api/predict.js
// This will be the function to call your FastAPI backend
async function predict(imageData) {
  const formData = new FormData();
  
  // Handle both File objects and Blobs
  if (imageData instanceof File) {
    formData.append('file', imageData);
  } else if (imageData instanceof Blob) {
    formData.append('file', imageData, 'drawing.png');
  } else {
    throw new Error('Invalid image data provided');
  }

  try {
    const response = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data; // { category: ... }
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Unable to connect to the server. Please make sure the backend is running.');
    }
    throw error;
  }
}

export default predict;