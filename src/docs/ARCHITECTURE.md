# Architecture

## Overview

World Sandbox IDE is built with a clean separation of concerns:

- **UI Layer**: React components for the interface
- **State Layer**: Zustand store for editor state management
- **Core Layer**: Utilities and business logic
- **3D Layer**: Three.js integration via React Three Fiber

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (app)/             # Route group for app pages
│   │   ├── studio/        # Main editor page
│   │   └── avatar/        # Avatar preview page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── ide/               # IDE-specific components
│   │   ├── IdeShell.tsx   # Main IDE container
│   │   ├── Topbar.tsx     # Top toolbar
│   │   ├── SidePanel.tsx  # Left sidebar
│   │   ├── Inspector.tsx  # Right properties panel
│   │   ├── Viewport3D.tsx # 3D viewport canvas
│   │   ├── SceneRoot.tsx  # Scene entity manager
│   │   ├── EntityMesh.tsx # Individual entity renderer
│   │   └── AvatarPreview.tsx # Avatar preview page
│   └── ui/                # Reusable UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Panel.tsx
├── lib/
│   ├── core/              # Core utilities
│   │   ├── ids.ts         # ID generation
│   │   ├── math.ts        # Math utilities
│   │   └── download.ts    # File download helpers
│   ├── editor/            # Editor logic
│   │   ├── types.ts       # TypeScript types
│   │   ├── commands.ts    # Command pattern for undo/redo
│   │   ├── tools.ts       # Tool definitions
│   │   └── store.ts       # Zustand state management
│   └── three/             # Three.js utilities
│       ├── gltf.ts        # GLTF loading
│       └── metrics.ts     # Performance metrics
└── docs/                  # Documentation
```

## Key Design Patterns

### Command Pattern

All state-modifying operations use the Command pattern to enable undo/redo:

```typescript
class AddEntityCommand extends BaseCommand {
  execute() { /* add entity */ }
  undo() { /* remove entity */ }
}
```

### State Management

Zustand provides a simple, type-safe global store:

```typescript
const useEditorStore = create<EditorStore>((set, get) => ({
  entities: [],
  addEntity: (type) => { /* ... */ }
}))
```

### Component Architecture

- **Container Components**: Handle state and logic (IdeShell, SceneRoot)
- **Presentational Components**: Render UI (Button, Input, Panel)
- **3D Components**: Render Three.js objects (EntityMesh, Viewport3D)

## Data Flow

1. User interaction → UI Component
2. UI Component → Zustand Store Action
3. Store Action → State Update
4. State Update → Component Re-render
5. Component → 3D Scene Update

## Rendering Pipeline

1. Next.js SSR → Initial HTML
2. Client Hydration → React Components
3. Canvas Mount → Three.js Context
4. Entity Changes → SceneRoot Update
5. SceneRoot → EntityMesh Instances
6. EntityMesh → Three.js Geometry
