import { useRef, useEffect, useState } from 'react';
import predict from "../api/predict";

function Canvas({ onPrediction, onError, onLoading }) {
    const canvasRef = useRef(null);
    const [drawing, setDrawing] = useState(false);
    const drawingRef = useRef(false);
    const [brushSize, setBrushSize] = useState(5);
    const [brushColor, setBrushColor] = useState("#000000");

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const handlePredict = async () => {
        const canvas = canvasRef.current;
        
        // Check if canvas is empty
        const context = canvas.getContext('2d');
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const hasContent = imageData.data.some(pixel => pixel !== 0);
        
        if (!hasContent) {
            onError("Please draw something before predicting");
            return;
        }

        onLoading(true);
        
        canvas.toBlob(async (blob) => {
            if (!blob) {
                onError("Failed to process drawing");
                onLoading(false);
                return;
            }
            
            try {
                const result = await predict(blob);
                onPrediction(result);
            } catch (error) {
                onError('Prediction failed: ' + error.message);
            } finally {
                onLoading(false);
            }
        }, 'image/png');
    };

    // Keep drawingRef in sync with drawing state
    useEffect(() => {
        drawingRef.current = drawing;
    }, [drawing]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        // Set initial drawing style
        context.strokeStyle = brushColor;
        context.lineWidth = brushSize;
        context.lineCap = "round";
        context.lineJoin = "round";

        const startDrawing = (e) => {
            setDrawing(true);
            context.beginPath();
            context.moveTo(e.offsetX, e.offsetY);
        };
        
        const draw = (e) => {
            if (!drawingRef.current) return;
            context.lineTo(e.offsetX, e.offsetY);
            context.stroke();
        };

        const stopDrawing = () => {
            setDrawing(false);
            context.closePath();
        };
        
        // Add event listeners
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseleave', stopDrawing);

        // Cleanup event listeners on unmount
        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', stopDrawing);
            canvas.removeEventListener('mouseleave', stopDrawing);
        };
    }, [brushColor, brushSize]);

    return (
        <div className="canvas-wrapper">
            <div className="canvas-controls">
                <div className="control-group">
                    <label htmlFor="brushSize">Brush Size:</label>
                    <input
                        id="brushSize"
                        type="range"
                        min="1"
                        max="20"
                        value={brushSize}
                        onChange={(e) => setBrushSize(parseInt(e.target.value))}
                    />
                    <span>{brushSize}px</span>
                </div>
                
                <div className="control-group">
                    <label htmlFor="brushColor">Color:</label>
                    <input
                        id="brushColor"
                        type="color"
                        value={brushColor}
                        onChange={(e) => setBrushColor(e.target.value)}
                    />
                </div>
            </div>
            
            <div className="canvas-container">
                <canvas
                    ref={canvasRef}
                    width={280}
                    height={280}
                    className="drawing-canvas"
                />
            </div>
            
            <div className="canvas-actions">
                <button onClick={clearCanvas} className="btn btn-secondary">
                    Clear Canvas
                </button>
                <button onClick={handlePredict} className="btn btn-primary">
                    Predict Drawing
                </button>
            </div>
        </div>
    );
}

export default Canvas;
