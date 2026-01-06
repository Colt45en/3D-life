# Commands

## Command Pattern

World Sandbox IDE uses the Command pattern for all state-modifying operations, enabling undo/redo functionality.

## Command Interface

```typescript
interface Command {
  execute(): void
  undo(): void
  description: string
}
```

## Built-in Commands

### AddEntityCommand

Adds a new entity to the scene.

```typescript
new AddEntityCommand(
  entity,        // Entity to add
  entities,      // Current entities array
  setEntities    // State setter function
)
```

**Undo**: Removes the entity from the scene

### DeleteEntityCommand

Removes entities from the scene.

```typescript
new DeleteEntityCommand(
  entityIds,     // IDs of entities to delete
  entities,      // Current entities array
  setEntities    // State setter function
)
```

**Undo**: Restores the deleted entities

### TransformEntityCommand

Updates entity transform (position, rotation, scale).

```typescript
new TransformEntityCommand(
  entityId,        // Entity to transform
  oldTransform,    // Previous transform state
  newTransform,    // New transform state
  entities,        // Current entities array
  setEntities      // State setter function
)
```

**Undo**: Reverts to old transform

## Command History

### CommandHistory Class

Manages the command stack and undo/redo operations.

```typescript
class CommandHistory {
  execute(command: Command): void
  undo(): boolean
  redo(): boolean
  canUndo(): boolean
  canRedo(): boolean
  clear(): void
  getHistory(): string[]
}
```

### Features

- **Max History**: 50 commands (configurable)
- **Linear History**: Redo stack cleared on new command
- **Description Tracking**: Each command has a human-readable description

### Usage

```typescript
const history = new CommandHistory()

// Execute command
const cmd = new AddEntityCommand(...)
history.execute(cmd)

// Undo
if (history.canUndo()) {
  history.undo()
}

// Redo
if (history.canRedo()) {
  history.redo()
}
```

## Creating Custom Commands

To create a custom command:

1. Extend `BaseCommand` class
2. Implement `execute()` method
3. Implement `undo()` method
4. Provide a `description`

```typescript
class CustomCommand extends BaseCommand {
  description = "My custom operation"
  
  execute() {
    // Perform operation
  }
  
  undo() {
    // Reverse operation
  }
}
```

## Current Limitations

- Not all operations use commands yet
- Some state changes bypass command history
- Command history not persisted between sessions

## Future Enhancements

- Keyboard shortcuts (Ctrl+Z, Ctrl+Y)
- Command history visualization
- Batch/macro commands
- Command persistence
- Named command groups
