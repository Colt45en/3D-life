'use client'

import React, { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid as DreiGrid } from '@react-three/drei'
import SceneRoot from './SceneRoot'
import { useEditorStore } from '@/lib/editor/store'

export default function Viewport3D() {
  const { gridEnabled, gridSize } = useEditorStore()
  
  return (
    <div className="w-full h-full bg-gray-950">
      <Canvas
        camera={{ position: [10, 10, 10], fov: 50 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#0a0a0a']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        
        {gridEnabled && (
          <DreiGrid
            args={[100, 100]}
            cellSize={gridSize}
            cellThickness={0.5}
            cellColor="#6e6e6e"
            sectionSize={gridSize * 5}
            sectionThickness={1}
            sectionColor="#9d4b4b"
            fadeDistance={50}
            fadeStrength={1}
            infiniteGrid
          />
        )}
        
        <SceneRoot />
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  )
}
