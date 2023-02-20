import { useFrame } from '@react-three/fiber'
import React from 'react'

const PaintMesh = (lines, updateLine) => {

    useFrame(() => {
        if (lines && lines.current && lines.current.length > 0) {
          updateLine()
        }
      })
    
    return (
        <>
        {lines && lines.current && lines.current.map((line, i) => (
            <mesh key={i}>
            <meshLine attach="geometry" vertices={line.points} />
            <meshLineMaterial attach="material" {...line.material} />
            </mesh>
        ))}
        </>
    )
}

export default PaintMesh;