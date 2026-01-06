# World Sandbox IDE

A complete 3D world sandbox editor built with Next.js, React Three Fiber, TypeScript, Tailwind CSS, and Zustand.

## Features

- **Next.js 14** with App Router and TypeScript strict mode
- **React Three Fiber** for 3D rendering with Three.js
- **Zustand** for state management
- **Command History** with undo/redo support
- **Prefab System** for reusable entity groups
- **Avatar Import** with GLTF/GLB preview and spawn
- **Manifest Export** for saving world data as JSON
- **Transform Tools**: Select, Move, Rotate, Scale
- **Inspector Panel** for precise entity editing
- **Grid System** with snapping support

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

- **Home**: Navigate between Studio and Avatar Preview
- **Studio** (`/studio`): Main 3D editor interface
- **Avatar** (`/avatar`): Preview and import avatar models

## Documentation

For detailed documentation, see:

- [Architecture](src/docs/ARCHITECTURE.md) - System design and structure
- [State Management](src/docs/STATE.md) - Zustand store details
- [Tools](src/docs/TOOLS.md) - Editor tools and grid system
- [Commands](src/docs/COMMANDS.md) - Command pattern and undo/redo
- [README](src/docs/README.md) - User guide

## Project Structure

```
world-sandbox-ide/
├─ src/
│  ├─ app/                  # Next.js App Router pages
│  ├─ components/           # React components
│  │  ├─ ide/              # IDE-specific components
│  │  └─ ui/               # Reusable UI components
│  ├─ lib/                 # Libraries and utilities
│  │  ├─ core/            # Core utilities
│  │  ├─ editor/          # Editor logic and state
│  │  └─ three/           # Three.js utilities
│  └─ docs/               # Documentation
├─ package.json
├─ tsconfig.json
└─ tailwind.config.ts
```

## Technologies

- Next.js 14.0.4
- React 18.2.0
- TypeScript 5.3.3
- Tailwind CSS 3.4.0
- Three.js 0.160.0
- React Three Fiber 8.15.12
- React Three Drei 9.92.7
- Zustand 4.4.7
- TanStack React Query 5.17.9

## License

See [LICENSE](LICENSE) file for details.

