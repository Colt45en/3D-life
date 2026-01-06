'use client'

import React from 'react'
import { useEditorStore } from '@/lib/editor/store'
import EntityMesh from './EntityMesh'

export default function SceneRoot() {
  const entities = useEditorStore(state => state.entities)
  
  return (
    <>
      {entities.map(entity => (
        <EntityMesh key={entity.id} entity={entity} />
      ))}
    </>
  )
}
