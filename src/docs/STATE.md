# State Management

## Zustand Store

The editor uses a single Zustand store for all state management.

### Store Structure

```typescript
interface EditorStore {
  // Scene data
  entities: Entity[]
  prefabs: Prefab[]
  
  // Selection
  selectedIds: string[]
  
  // Tools
  toolMode: ToolMode
  
  // Grid settings
  gridEnabled: boolean
  gridSize: number
  snapEnabled: boolean
  
  // Command history
  commandHistory: CommandHistory
}
```

### State Access

```typescript
// In components
const entities = useEditorStore(state => state.entities)
const addEntity = useEditorStore(state => state.addEntity)

// Select specific state
const selectedIds = useEditorStore(state => state.selectedIds)
```

### State Updates

All state updates should go through store actions:

```typescript
// ✅ Good
addEntity('cube', [0, 0, 0])

// ❌ Bad - don't modify state directly
entities.push(newEntity)
```

## Entity State

### Entity Structure

```typescript
interface Entity {
  id: string              // Unique identifier
  name: string            // Display name
  type: EntityType        // cube, sphere, etc.
  transform: Transform    // Position, rotation, scale
  color?: string          // Hex color
  visible?: boolean       // Visibility flag
  prefabId?: string       // Reference to prefab
  avatarUrl?: string      // URL for avatar models
}
```

### Transform

```typescript
interface Transform {
  position: [number, number, number]
  rotation: [number, number, number]  // Radians
  scale: [number, number, number]
}
```

## Selection State

- `selectedIds`: Array of entity IDs currently selected
- Single selection: Click entity
- Multi-selection: Shift+Click entity
- Clear selection: Click empty space

## Tool State

- `toolMode`: Current active tool
- Options: 'select', 'move', 'rotate', 'scale'
- Tools affect interaction behavior in viewport

## Command History

- Tracks all state-modifying operations
- Enables undo/redo functionality
- Limited to last 50 operations
- Cleared on manual state reset

## Prefab State

- `prefabs`: Array of saved entity groups
- Can be spawned multiple times
- Each spawn creates new entity instances
- Original prefab remains unchanged

## State Persistence

Currently, state is not persisted between sessions. To save work:

1. Export manifest via "Export" button
2. Save JSON file locally
3. Re-import in future session (feature TBD)
