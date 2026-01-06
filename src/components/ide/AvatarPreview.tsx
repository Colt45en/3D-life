'use client'

import React, { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Panel from '@/components/ui/Panel'
import { useEditorStore } from '@/lib/editor/store'
import { loadGLTF } from '@/lib/three/gltf'

function AvatarModel({ url }: { url: string }) {
  const [model, setModel] = React.useState<THREE.Group | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    loadGLTF(url)
      .then(loaded => {
        setModel(loaded)
        setError(null)
      })
      .catch(err => {
        setError(err.message)
        setModel(null)
      })
  }, [url])

  if (error) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    )
  }

  if (!model) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="gray" wireframe />
      </mesh>
    )
  }

  return <primitive object={model.clone()} />
}

export default function AvatarPreview() {
  const [avatarUrl, setAvatarUrl] = useState('')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const { importAvatar } = useEditorStore()

  const handlePreview = () => {
    if (avatarUrl.trim()) {
      setPreviewUrl(avatarUrl)
    }
  }

  const handleSpawn = () => {
    if (avatarUrl.trim()) {
      importAvatar(avatarUrl)
      alert('Avatar imported to studio!')
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-950">
      <div className="h-14 bg-gray-900 border-b border-gray-700 flex items-center px-4">
        <h1 className="text-xl font-bold text-white">Avatar Preview</h1>
      </div>

      <div className="flex-1 flex">
        <div className="w-80 bg-gray-900 border-r border-gray-700 p-4 space-y-4">
          <Panel title="Import Avatar">
            <div className="space-y-3">
              <Input
                label="Avatar URL"
                placeholder="https://example.com/avatar.glb"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
              />
              <Button className="w-full" onClick={handlePreview}>
                Preview
              </Button>
              <Button className="w-full" onClick={handleSpawn}>
                Import to Studio
              </Button>
            </div>
          </Panel>

          <Panel title="Info">
            <div className="text-sm text-gray-400 space-y-2">
              <p>Supported formats: GLB, GLTF</p>
              <p>Use publicly accessible URLs</p>
              <p>Preview before importing to studio</p>
            </div>
          </Panel>
        </div>

        <div className="flex-1 bg-gray-950">
          <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
            <color attach="background" args={['#0a0a0a']} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight position={[-10, -10, -5]} intensity={0.3} />
            
            <gridHelper args={[10, 10]} />
            
            <Suspense fallback={null}>
              {previewUrl && <AvatarModel url={previewUrl} />}
            </Suspense>
            
            <OrbitControls makeDefault />
          </Canvas>
        </div>
      </div>
    </div>
  )
}
