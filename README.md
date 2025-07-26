# AI Sketch Classifier - Frontend

A modern React application for classifying hand-drawn sketches using AI.

## Features

- **Interactive Drawing Canvas**: Draw sketches with adjustable brush size and color
- **Image Upload**: Drag and drop or click to upload images
- **Real-time Prediction**: Get instant AI predictions with confidence scores
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Beautiful gradient design with smooth animations

## What I Learned

- Integrating frontend and backend services using Fetch
- Handling image data between JS and Python
- Managing state and canvas drawing logic in React
- Deploying and testing ML models with FastAPI
- Building my own neural network from sratch and implementing CNN's with tensorflow
- Essential CSS Skills like Flexbox

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Backend server running (see backend README)

### Installation

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and go to `http://localhost:5173`

### Backend Setup

Make sure your FastAPI backend is running on `http://localhost:8000` before using the frontend.

## Usage

1. **Drawing Mode**:

   - Use the drawing canvas to sketch your image
   - Adjust brush size and color using the controls
   - Click "Predict Drawing" to classify your sketch

2. **Upload Mode**:

   - Drag and drop an image or click to select a file
   - Supported formats: JPG, PNG, GIF (max 5MB)
   - Click "Predict Image" to classify the uploaded image

3. **Results**:
   - View the predicted category with an emoji icon
   - See confidence scores and probabilities
   - Try different images to test the AI model

## Technologies Used

- React 18
- Vite
- CSS3 with modern features
- Fetch API for backend communication

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Canvas.jsx          # Drawing canvas component
│   │   ├── ImageUpload.jsx     # File upload component
│   │   └── PredictionResult.jsx # Results display component
│   ├── api/
│   │   └── predict.js          # API communication
│   ├── App.jsx                 # Main application component
│   ├── App.css                 # Application styles
│   └── main.jsx                # Application entry point
├── public/                     # Static assets
└── package.json                # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Troubleshooting

- **Connection Error**: Make sure the backend server is running on port 8000
- **CORS Issues**: The backend should have CORS configured to allow requests from the frontend
- **Model Not Found**: Ensure the trained model file exists in the backend directory

## Contributing

Feel free to submit issues and enhancement requests!
