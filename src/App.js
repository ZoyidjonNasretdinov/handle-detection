import './App.css'
import React, {useEffect, useRef} from 'react'
import * as tf from '@tensorflow/tfjs'
import * as handPose from '@tensorflow-models/handpose'
import Webcam from 'react-webcam'


const App = () => {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)

  const runHandpose = async () => {
    const net = await handPose.load()
  }


  return (
    <div className='App'>
      <header className='App-header'>
        <Webcam ref={webcamRef} className='webcam' />
        <canvas ref={canvasRef} className='canvas'/>
      </header>
    </div>
  )
}

export default App