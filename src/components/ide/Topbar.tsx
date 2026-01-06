'use client'

import React from 'react'
import { useEditorStore } from '@/lib/editor/store'
import Button from '@/components/ui/Button'
import { downloadJson } from '@/lib/core/download'

export default function Topbar() {
  const { 
    toolMode, 
    setToolMode, 
    undo, 
    redo, 
    commandHistory,
    exportManifest 
  } = useEditorStore()

  const handleExport = () => {
    const manifest = exportManifest()
    downloadJson('world-manifest.json', JSON.parse(manifest))
  }

  return (
    <div className="h-14 bg-gray-900 border-b border-gray-700 flex items-center px-4 gap-4">
      <h1 className="text-xl font-bold text-white">World Sandbox IDE</h1>
      
      <div className="flex gap-2 ml-4">
        <Button
          variant={toolMode === 'select' ? 'primary' : 'secondary'}
          onClick={() => setToolMode('select')}
        >
          ⌖ Select
        </Button>
        <Button
          variant={toolMode === 'move' ? 'primary' : 'secondary'}
          onClick={() => setToolMode('move')}
        >
          ✥ Move
        </Button>
        <Button
          variant={toolMode === 'rotate' ? 'primary' : 'secondary'}
          onClick={() => setToolMode('rotate')}
        >
          ↻ Rotate
        </Button>
        <Button
          variant={toolMode === 'scale' ? 'primary' : 'secondary'}
          onClick={() => setToolMode('scale')}
        >
          ⇲ Scale
        </Button>
      </div>

      <div className="flex gap-2 ml-auto">
        <Button
          onClick={() => undo()}
          disabled={!commandHistory.canUndo()}
        >
          ↶ Undo
        </Button>
        <Button
          onClick={() => redo()}
          disabled={!commandHistory.canRedo()}
        >
          ↷ Redo
        </Button>
        <Button onClick={handleExport}>
          ⬇ Export
        </Button>
      </div>
    </div>
  )
}
