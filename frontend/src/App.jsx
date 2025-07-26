import './App.css';
import { useState } from 'react';
import Canvas from './components/Canvas';
import ImageUpload from './components/ImageUpload';
import PredictionResult from './components/PredictionResult';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePrediction = (result) => {
    setPrediction(result);
    setError(null);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setPrediction(null);
  };

  const handleLoading = (loading) => {
    setIsLoading(loading);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI Sketch Classifier</h1>
        <p>Draw or upload an image to classify it as car, cat, dog, house, or tree</p>
      </header>
      <main className="pyramid-main">
        <div className="pyramid-top-row">
          <div className="canvas-section">
            <h2>Draw Your Sketch</h2>
            <Canvas 
              onPrediction={handlePrediction}
              onError={handleError}
              onLoading={handleLoading}
            />
          </div>
          <div className="upload-section">
            <h2>Or Upload an Image</h2>
            <ImageUpload 
              onPrediction={handlePrediction}
              onError={handleError}
              onLoading={handleLoading}
            />
          </div>
        </div>
        <div className="pyramid-bottom-row">
          <PredictionResult 
            prediction={prediction}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
    </div>
  );
}

export default App;