import { useState, useRef } from 'react';
import predict from "../api/predict";

function ImageUpload({ onPrediction, onError, onLoading }) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      onError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      onError('File size must be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // Make prediction
    handlePrediction(file);
  };

  const handlePrediction = async (file) => {
    onLoading(true);
    
    try {
      const result = await predict(file);
      onPrediction(result);
    } catch (error) {
      onError('Prediction failed: ' + error.message);
    } finally {
      onLoading(false);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="image-upload-wrapper">
      <div 
        className={`upload-area ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          style={{ display: 'none' }}
        />
        
        {preview ? (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="image-preview" />
            <button 
              onClick={(e) => {
                e.stopPropagation();
                clearPreview();
              }}
              className="btn btn-secondary btn-small"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="upload-prompt">
            <div className="upload-icon">📁</div>
            <p>Click to select an image or drag and drop</p>
            <p className="upload-hint">Supports: JPG, PNG, GIF (max 5MB)</p>
          </div>
        )}
      </div>
      
      {preview && (
        <div className="upload-actions">
          <button onClick={() => handlePrediction(fileInputRef.current.files[0])} className="btn btn-primary">
            Predict Image
          </button>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;