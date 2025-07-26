function PredictionResult({ prediction, isLoading, error }) {
  const getCategoryIcon = (category) => {
    const icons = {
      'car': '🚗',
      'cat': '🐱',
      'dog': '🐕',
      'house': '🏠',
      'tree': '🌳'
    };
    return icons[category] || '❓';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'car': '#ff6b6b',
      'cat': '#4ecdc4',
      'dog': '#45b7d1',
      'house': '#96ceb4',
      'tree': '#feca57'
    };
    return colors[category] || '#95a5a6';
  };

  if (isLoading) {
    return (
      <div className="prediction-result loading">
        <div className="loading-spinner"></div>
        <p>Analyzing your image...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="prediction-result error">
        <div className="error-icon">⚠️</div>
        <h3>Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="prediction-result empty">
        <div className="empty-icon">🎨</div>
        <h3>Ready to Predict</h3>
        <p>Draw something or upload an image to get started!</p>
      </div>
    );
  }

  return (
    <div className="prediction-result success">
      <div className="result-header">
        <h3>Prediction Result</h3>
      </div>
      
      <div 
        className="result-content"
        style={{ borderColor: getCategoryColor(prediction.category) }}
      >
        <div className="category-display">
          <span className="category-icon">
            {getCategoryIcon(prediction.category)}
          </span>
          <h2 className="category-name">
            {prediction.category.charAt(0).toUpperCase() + prediction.category.slice(1)}
          </h2>
        </div>
        
        {prediction.confidence && (
          <div className="confidence-bar">
            <div className="confidence-label">
              Confidence: {Math.round(prediction.confidence * 100)}%
            </div>
            <div className="confidence-track">
              <div 
                className="confidence-fill"
                style={{ 
                  width: `${prediction.confidence * 100}%`,
                  backgroundColor: getCategoryColor(prediction.category)
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
      
      <div className="result-footer">
        <p>Try drawing or uploading another image!</p>
      </div>
    </div>
  );
}

export default PredictionResult;