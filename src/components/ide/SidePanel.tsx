'use client'

import React, { useState } from 'react'
import { useEditorStore } from '@/lib/editor/store'
import Button from '@/components/ui/Button'
import Panel from '@/components/ui/Panel'
import Input from '@/components/ui/Input'

export default function SidePanel() {
  const { addEntity, prefabs, spawnPrefab, createPrefab, importAvatar } = useEditorStore()
  const [prefabName, setPrefabName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  const handleCreatePrefab = () => {
    if (prefabName.trim()) {
      createPrefab(prefabName)
      setPrefabName('')
    }
  }

  const handleImportAvatar = () => {
    if (avatarUrl.trim()) {
      importAvatar(avatarUrl)
      setAvatarUrl('')
    }
  }

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-700 overflow-y-auto p-4 space-y-4">
      <Panel title="Primitives">
        <div className="space-y-2">
          <Button className="w-full" onClick={() => addEntity('cube')}>
            ⬜ Add Cube
          </Button>
          <Button className="w-full" onClick={() => addEntity('sphere')}>
            ⚪ Add Sphere
          </Button>
          <Button className="w-full" onClick={() => addEntity('cylinder')}>
            ⬭ Add Cylinder
          </Button>
          <Button className="w-full" onClick={() => addEntity('cone')}>
            ▲ Add Cone
          </Button>
        </div>
      </Panel>

      <Panel title="Avatar">
        <div className="space-y-2">
          <Input
            placeholder="Avatar URL (GLB/GLTF)"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
          <Button className="w-full" onClick={handleImportAvatar}>
            Import Avatar
          </Button>
        </div>
      </Panel>

      <Panel title="Prefabs">
        <div className="space-y-2">
          <Input
            placeholder="Prefab name"
            value={prefabName}
            onChange={(e) => setPrefabName(e.target.value)}
          />
          <Button className="w-full" onClick={handleCreatePrefab}>
            Create from Selection
          </Button>
          
          {prefabs.length > 0 && (
            <div className="mt-4 space-y-1">
              {prefabs.map(prefab => (
                <button
                  key={prefab.id}
                  className="w-full text-left px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded text-sm"
                  onClick={() => spawnPrefab(prefab.id)}
                >
                  {prefab.name} ({prefab.entities.length})
                </button>
              ))}
            </div>
          )}
        </div>
      </Panel>
    </div>
  )
}
