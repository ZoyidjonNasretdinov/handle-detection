import './App.css'
import React, {useEffect, useRef} from 'react'
import * as tf from '@tensorflow/tfjs'
import * as handPose from '@tensorflow-models/handpose'
import Webcam from 'react-webcam'


const App = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <Webcam className='webcam' />
        <canvas className='canvas'/>
      </header>
    </div>
  )
}

export default App