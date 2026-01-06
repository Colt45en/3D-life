'use client'

import React, { useEffect, useState } from 'react'
import { useEditorStore } from '@/lib/editor/store'

export default function StatsOverlay() {
  const entities = useEditorStore(state => state.entities)
  const selectedIds = useEditorStore(state => state.selectedIds)
  const [fps, setFps] = useState(60)

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()

    const updateFps = () => {
      frameCount++
      const currentTime = performance.now()
      const delta = currentTime - lastTime

      if (delta >= 1000) {
        setFps(Math.round((frameCount * 1000) / delta))
        frameCount = 0
        lastTime = currentTime
      }

      requestAnimationFrame(updateFps)
    }

    const id = requestAnimationFrame(updateFps)
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className="absolute top-4 right-4 bg-black/70 text-white p-3 rounded text-sm font-mono space-y-1">
      <div>FPS: {fps}</div>
      <div>Entities: {entities.length}</div>
      <div>Selected: {selectedIds.length}</div>
    </div>
  )
}
