'use client'

import React from 'react'
import Topbar from './Topbar'
import SidePanel from './SidePanel'
import Inspector from './Inspector'
import Viewport3D from './Viewport3D'
import StatsOverlay from './StatsOverlay'

export default function IdeShell() {
  return (
    <div className="h-screen flex flex-col bg-gray-950">
      <Topbar />
      <div className="flex-1 flex overflow-hidden">
        <SidePanel />
        <div className="flex-1 relative">
          <Viewport3D />
          <StatsOverlay />
        </div>
        <Inspector />
      </div>
    </div>
  )
}
