import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshLine, MeshLineMaterial } from 'three.meshline';
import PaintMesh from '../PaintMesh';

const Paint = () => {
  const lines = useRef([])
  const mouse = useRef([0, 0])
  const velocity = useRef([0, 0])

  const addLine = () => {
    const material = new MeshLineMaterial({
      color: '#000',
      lineWidth: 0.05,
      dashArray: 0.1,
      dashRatio: 0.1,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    })

    const points = []
    lines.current.push({ material, points })
  }

  const removeLine = () => {
    lines.current.shift()
  }

  const updateLine = () => {
    console.log({ lines });
    const [x, y] = mouse.current
    const [vx, vy] = velocity.current

    const line = lines.current[lines.current.length - 1]
    line.points.push(x, y, 0)

    if (line.points.length > 6) {
      line.points.shift()
    }

    const points = line.points.map((p, i) => {
      if (i % 3 === 2) {
        return p
      }

      const j = Math.floor(i / 3)
      const d = j / (line.points.length / 3 - 1)
      const a = Math.sin(d * Math.PI)

      return p + (a * vy + (1 - a) * vx) * 0.01
    })

    line.material.uniforms.dashOffset.value -= 0.01
    line.material.uniforms.opacity.value = Math.min(1, 0.1 + velocity.current[0] * 10)

    line.mesh.setDrawRange(0, points.length / 3)
    line.mesh.geometry.setFromPoints(points)
  }

  const onMouseDown = (e) => {
    addLine()
  }

  const onMouseUp = (e) => {
    removeLine()
  }

  const onMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1
    const y = -(e.clientY / window.innerHeight) * 2 + 1

    mouse.current[0] = x
    mouse.current[1] = y

    if (lines.current.length > 0) {
      const [lx, ly] = lines.current[lines.current.length - 1].points.slice(-3)

      velocity.current[0] = x - lx
      velocity.current[1] = y - ly

      updateLine()
    }
  }

  return (
    <Canvas
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      style={{ background: '#fff' }}
    >
      <PaintMesh lines={lines} updateLine={updateLine} />
    </Canvas>
  )
}

export default Paint
