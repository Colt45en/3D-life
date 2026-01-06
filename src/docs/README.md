# World Sandbox IDE

A Next.js-based 3D world editor with React Three Fiber, TypeScript, Tailwind CSS, and Zustand.

## Features

- **3D Viewport**: Interactive 3D scene with camera controls
- **Entity System**: Create and manipulate primitives (cube, sphere, cylinder, cone)
- **Avatar Import**: Load and preview GLTF/GLB avatar models
- **Prefab System**: Save entity groups as reusable prefabs
- **Command History**: Undo/redo support for all operations
- **Transform Tools**: Select, move, rotate, and scale entities
- **Inspector**: Edit entity properties and transforms
- **Manifest Export**: Export entire scene as JSON

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Build

```bash
npm run build
npm start
```

## Usage

### Studio

Navigate to `/studio` to access the main 3D editor interface.

- Use the sidebar to add primitives and import avatars
- Click entities in the viewport to select them
- Use the inspector panel to modify properties
- Use toolbar buttons to switch between tools
- Export your world as a JSON manifest

### Avatar Preview

Navigate to `/avatar` to preview avatar models before importing.

- Enter a public URL to a GLB/GLTF file
- Preview the model in the 3D viewport
- Import to studio when ready

## Project Structure

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.
