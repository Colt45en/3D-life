'use client'

import React from 'react'
import { useEditorStore } from '@/lib/editor/store'
import Panel from '@/components/ui/Panel'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function Inspector() {
  const { entities, selectedIds, updateEntity, deleteEntities, duplicateEntities } = useEditorStore()
  
  const selectedEntity = entities.find(e => selectedIds[0] === e.id)

  if (selectedIds.length === 0) {
    return (
      <div className="w-80 bg-gray-900 border-l border-gray-700 p-4">
        <Panel title="Inspector">
          <p className="text-gray-400 text-sm">No entity selected</p>
        </Panel>
      </div>
    )
  }

  if (selectedIds.length > 1) {
    return (
      <div className="w-80 bg-gray-900 border-l border-gray-700 p-4">
        <Panel title="Inspector">
          <p className="text-gray-400 text-sm mb-4">
            {selectedIds.length} entities selected
          </p>
          <div className="space-y-2">
            <Button 
              className="w-full" 
              onClick={() => duplicateEntities(selectedIds)}
            >
              Duplicate
            </Button>
            <Button 
              className="w-full" 
              variant="danger"
              onClick={() => deleteEntities(selectedIds)}
            >
              Delete
            </Button>
          </div>
        </Panel>
      </div>
    )
  }

  if (!selectedEntity) return null

  const handlePositionChange = (axis: number, value: string) => {
    const num = parseFloat(value) || 0
    const newPos: [number, number, number] = [...selectedEntity.transform.position]
    newPos[axis] = num
    updateEntity(selectedEntity.id, {
      transform: { ...selectedEntity.transform, position: newPos }
    })
  }

  const handleRotationChange = (axis: number, value: string) => {
    const num = parseFloat(value) || 0
    const newRot: [number, number, number] = [...selectedEntity.transform.rotation]
    newRot[axis] = num
    updateEntity(selectedEntity.id, {
      transform: { ...selectedEntity.transform, rotation: newRot }
    })
  }

  const handleScaleChange = (axis: number, value: string) => {
    const num = parseFloat(value) || 1
    const newScale: [number, number, number] = [...selectedEntity.transform.scale]
    newScale[axis] = num
    updateEntity(selectedEntity.id, {
      transform: { ...selectedEntity.transform, scale: newScale }
    })
  }

  return (
    <div className="w-80 bg-gray-900 border-l border-gray-700 p-4 overflow-y-auto space-y-4">
      <Panel title="Inspector">
        <div className="space-y-3">
          <Input
            label="Name"
            value={selectedEntity.name}
            onChange={(e) => updateEntity(selectedEntity.id, { name: e.target.value })}
          />
          
          <div>
            <label className="text-sm font-medium text-gray-200 mb-1 block">Type</label>
            <p className="text-sm text-gray-400">{selectedEntity.type}</p>
          </div>

          {selectedEntity.color && (
            <div>
              <label className="text-sm font-medium text-gray-200 mb-1 block">Color</label>
              <input
                type="color"
                value={selectedEntity.color}
                onChange={(e) => updateEntity(selectedEntity.id, { color: e.target.value })}
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>
          )}
        </div>
      </Panel>

      <Panel title="Transform">
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-200 mb-2 block">Position</label>
            <div className="grid grid-cols-3 gap-2">
              <Input
                placeholder="X"
                type="number"
                step="0.1"
                value={selectedEntity.transform.position[0]}
                onChange={(e) => handlePositionChange(0, e.target.value)}
              />
              <Input
                placeholder="Y"
                type="number"
                step="0.1"
                value={selectedEntity.transform.position[1]}
                onChange={(e) => handlePositionChange(1, e.target.value)}
              />
              <Input
                placeholder="Z"
                type="number"
                step="0.1"
                value={selectedEntity.transform.position[2]}
                onChange={(e) => handlePositionChange(2, e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-200 mb-2 block">Rotation</label>
            <div className="grid grid-cols-3 gap-2">
              <Input
                placeholder="X"
                type="number"
                step="0.1"
                value={selectedEntity.transform.rotation[0]}
                onChange={(e) => handleRotationChange(0, e.target.value)}
              />
              <Input
                placeholder="Y"
                type="number"
                step="0.1"
                value={selectedEntity.transform.rotation[1]}
                onChange={(e) => handleRotationChange(1, e.target.value)}
              />
              <Input
                placeholder="Z"
                type="number"
                step="0.1"
                value={selectedEntity.transform.rotation[2]}
                onChange={(e) => handleRotationChange(2, e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-200 mb-2 block">Scale</label>
            <div className="grid grid-cols-3 gap-2">
              <Input
                placeholder="X"
                type="number"
                step="0.1"
                value={selectedEntity.transform.scale[0]}
                onChange={(e) => handleScaleChange(0, e.target.value)}
              />
              <Input
                placeholder="Y"
                type="number"
                step="0.1"
                value={selectedEntity.transform.scale[1]}
                onChange={(e) => handleScaleChange(1, e.target.value)}
              />
              <Input
                placeholder="Z"
                type="number"
                step="0.1"
                value={selectedEntity.transform.scale[2]}
                onChange={(e) => handleScaleChange(2, e.target.value)}
              />
            </div>
          </div>
        </div>
      </Panel>

      <Panel title="Actions">
        <div className="space-y-2">
          <Button 
            className="w-full" 
            onClick={() => duplicateEntities([selectedEntity.id])}
          >
            Duplicate
          </Button>
          <Button 
            className="w-full" 
            variant="danger"
            onClick={() => deleteEntities([selectedEntity.id])}
          >
            Delete
          </Button>
        </div>
      </Panel>
    </div>
  )
}
