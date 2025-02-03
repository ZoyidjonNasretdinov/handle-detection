import './App.css';
import React, { useCallback, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';
import { drawHand } from './utils';

const App = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const detect = useCallback(async (model) => {
    if (
      webcamRef.current &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Set video and canvas dimensions
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make hand predictions
      const hands = await model.estimateHands(video);

      // Draw results
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, videoWidth, videoHeight);
      drawHand(hands, ctx);
    }
  }, []);

  const runHandDetection = useCallback(async () => {
    const model = await handpose.load(); // Correct model loading

    const detectionInterval = setInterval(() => {
      detect(model);
    }, 100);

    return () => clearInterval(detectionInterval);
  }, [detect]);

  useEffect(() => {
    const cleanup = runHandDetection();
    return () => cleanup.then((clear) => clear && clear());
  }, [runHandDetection]);

 
  return (
    <div className='App'>
      <header className='App-header'>
        <Webcam ref={webcamRef} className='webcam' />
        <canvas ref={canvasRef} className='canvas' />
      </header>
    </div>
  );
};

export default App;
