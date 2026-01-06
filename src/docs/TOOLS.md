# Tools

## Tool Modes

The editor supports four tool modes for interacting with entities.

### Select Tool (⌖)

**Purpose**: Select and deselect entities

**Usage**:
- Click entity to select
- Shift+Click to add/remove from selection
- Click empty space to clear selection

**Keyboard**: `S` (not yet implemented)

### Move Tool (✥)

**Purpose**: Translate entities in 3D space

**Usage**:
- Select entity first
- Drag to move in viewport plane
- Hold Shift to snap to grid (if snap enabled)

**Keyboard**: `M` (not yet implemented)

**Features**:
- Grid snapping support
- Multi-entity movement
- Constrained axis movement (planned)

### Rotate Tool (↻)

**Purpose**: Rotate entities around their center

**Usage**:
- Select entity first
- Drag to rotate
- Each axis can be rotated independently (planned)

**Keyboard**: `R` (not yet implemented)

**Features**:
- Free rotation
- Axis-constrained rotation (planned)
- Angle snapping (planned)

### Scale Tool (⇲)

**Purpose**: Change entity size

**Usage**:
- Select entity first
- Drag to scale uniformly
- Individual axis scaling via inspector

**Keyboard**: `T` (not yet implemented)

**Features**:
- Uniform scaling
- Per-axis scaling via inspector
- Proportional scaling (planned)

## Grid System

### Grid Display

- Toggle: Grid button in toolbar
- Shows infinite grid plane at Y=0
- Cell size configurable
- Section markers every 5 cells

### Grid Snapping

- Toggle: Snap button in toolbar
- Snaps positions to grid intersections
- Configurable grid size
- Applies to move operations

## Tool Workflow

1. Select tool mode from toolbar
2. Click entity to select
3. Perform operation (move/rotate/scale)
4. Changes auto-saved to state
5. Use undo/redo if needed

## Inspector vs Tools

- **Tools**: Interactive viewport manipulation
- **Inspector**: Precise numeric input
- Both methods update the same transform data
- Inspector shows exact values
- Tools provide visual feedback
