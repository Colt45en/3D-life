import { create } from 'zustand'
import { Entity, EditorState, ToolMode, Prefab, Transform } from './types'
import { CommandHistory } from './commands'
import { generateId, generatePrefixedId } from '../core/ids'

const MAX_COLOR_VALUE = 0xFFFFFF

interface EditorStore extends EditorState {
  commandHistory: CommandHistory
  
  // Entity operations
  addEntity: (type: Entity['type'], position?: [number, number, number]) => void
  deleteEntities: (ids: string[]) => void
  updateEntity: (id: string, updates: Partial<Entity>) => void
  duplicateEntities: (ids: string[]) => void
  
  // Selection
  selectEntity: (id: string, multi?: boolean) => void
  clearSelection: () => void
  
  // Tools
  setToolMode: (mode: ToolMode) => void
  
  // Grid
  toggleGrid: () => void
  setGridSize: (size: number) => void
  toggleSnap: () => void
  
  // Prefabs
  createPrefab: (name: string) => void
  spawnPrefab: (prefabId: string, position?: [number, number, number]) => void
  
  // Avatar
  importAvatar: (url: string, position?: [number, number, number]) => void
  
  // Export
  exportManifest: () => string
  
  // History
  undo: () => void
  redo: () => void
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  entities: [],
  selectedIds: [],
  toolMode: 'select',
  gridEnabled: true,
  gridSize: 1,
  snapEnabled: false,
  prefabs: [],
  commandHistory: new CommandHistory(),

  addEntity: (type, position = [0, 0, 0]) => {
    const entity: Entity = {
      id: generateId(),
      name: `${type}_${Date.now()}`,
      type,
      transform: {
        position,
        rotation: [0, 0, 0],
        scale: [1, 1, 1]
      },
      color: '#' + Math.floor(Math.random() * MAX_COLOR_VALUE).toString(16).padStart(6, '0'),
      visible: true
    }
    
    set(state => ({
      entities: [...state.entities, entity],
      selectedIds: [entity.id]
    }))
  },

  deleteEntities: (ids) => {
    set(state => ({
      entities: state.entities.filter(e => !ids.includes(e.id)),
      selectedIds: state.selectedIds.filter(id => !ids.includes(id))
    }))
  },

  updateEntity: (id, updates) => {
    set(state => ({
      entities: state.entities.map(e => 
        e.id === id ? { ...e, ...updates } : e
      )
    }))
  },

  duplicateEntities: (ids) => {
    const state = get()
    const toDuplicate = state.entities.filter(e => ids.includes(e.id))
    const duplicated = toDuplicate.map(entity => ({
      ...entity,
      id: generateId(),
      name: entity.name + '_copy',
      transform: {
        ...entity.transform,
        position: [
          entity.transform.position[0] + 1,
          entity.transform.position[1],
          entity.transform.position[2] + 1
        ] as [number, number, number]
      }
    }))
    
    set(state => ({
      entities: [...state.entities, ...duplicated],
      selectedIds: duplicated.map(e => e.id)
    }))
  },

  selectEntity: (id, multi = false) => {
    set(state => ({
      selectedIds: multi 
        ? state.selectedIds.includes(id)
          ? state.selectedIds.filter(sid => sid !== id)
          : [...state.selectedIds, id]
        : [id]
    }))
  },

  clearSelection: () => {
    set({ selectedIds: [] })
  },

  setToolMode: (mode) => {
    set({ toolMode: mode })
  },

  toggleGrid: () => {
    set(state => ({ gridEnabled: !state.gridEnabled }))
  },

  setGridSize: (size) => {
    set({ gridSize: size })
  },

  toggleSnap: () => {
    set(state => ({ snapEnabled: !state.snapEnabled }))
  },

  createPrefab: (name) => {
    const state = get()
    const selectedEntities = state.entities.filter(e => 
      state.selectedIds.includes(e.id)
    )
    
    if (selectedEntities.length === 0) return
    
    const prefab: Prefab = {
      id: generatePrefixedId('prefab'),
      name,
      entities: selectedEntities.map(e => ({
        ...e,
        id: generateId() // New IDs for prefab entities
      }))
    }
    
    set(state => ({
      prefabs: [...state.prefabs, prefab]
    }))
  },

  spawnPrefab: (prefabId, position = [0, 0, 0]) => {
    const state = get()
    const prefab = state.prefabs.find(p => p.id === prefabId)
    
    if (!prefab) return
    
    const spawnedEntities = prefab.entities.map(e => ({
      ...e,
      id: generateId(),
      prefabId,
      transform: {
        ...e.transform,
        position: [
          e.transform.position[0] + position[0],
          e.transform.position[1] + position[1],
          e.transform.position[2] + position[2]
        ] as [number, number, number]
      }
    }))
    
    set(state => ({
      entities: [...state.entities, ...spawnedEntities],
      selectedIds: spawnedEntities.map(e => e.id)
    }))
  },

  importAvatar: (url, position = [0, 0, 0]) => {
    const entity: Entity = {
      id: generateId(),
      name: `avatar_${Date.now()}`,
      type: 'avatar',
      transform: {
        position,
        rotation: [0, 0, 0],
        scale: [1, 1, 1]
      },
      avatarUrl: url,
      visible: true
    }
    
    set(state => ({
      entities: [...state.entities, entity],
      selectedIds: [entity.id]
    }))
  },

  exportManifest: () => {
    const state = get()
    const manifest = {
      version: '1.0.0',
      name: 'world-sandbox',
      entities: state.entities,
      prefabs: state.prefabs,
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: 'World Sandbox IDE'
      }
    }
    
    return JSON.stringify(manifest, null, 2)
  },

  undo: () => {
    const state = get()
    state.commandHistory.undo()
  },

  redo: () => {
    const state = get()
    state.commandHistory.redo()
  }
}))
