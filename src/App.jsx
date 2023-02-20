import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import './App.css';
import Paint from './components/Paint';

function App() {
  return (
        <Paint />
    // <Canvas id="three-canvas-container" shadows>
    //   <Suspense fallback={<></>}>
    //   </Suspense>
    // </Canvas>
  )
}

export default App
