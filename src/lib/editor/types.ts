/**
 * Entity types in the scene
 */
export type EntityType =
  | "cube"
  | "sphere"
  | "cylinder"
  | "cone"
  | "avatar"
  | "prefab";

/**
 * Transform data for entities
 */
export interface Transform {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

/**
 * Entity in the scene
 */
export interface Entity {
  id: string;
  name: string;
  type: EntityType;
  transform: Transform;
  color?: string;
  visible?: boolean;
  prefabId?: string;
  avatarUrl?: string;
}

/**
 * Prefab definition
 */
export interface Prefab {
  id: string;
  name: string;
  entities: Entity[];
}

/**
 * Editor tool modes
 */
export type ToolMode = "select" | "move" | "rotate" | "scale";

/**
 * Editor state
 */
export interface EditorState {
  entities: Entity[];
  selectedIds: string[];
  toolMode: ToolMode;
  gridEnabled: boolean;
  gridSize: number;
  snapEnabled: boolean;
  prefabs: Prefab[];
}

/**
 * Command interface for undo/redo
 */
export interface Command {
  execute(): void;
  undo(): void;
  description: string;
}

/**
 * Manifest export format
 */
export interface WorldManifest {
  version: string;
  name: string;
  entities: Entity[];
  prefabs: Prefab[];
  metadata?: {
    createdAt?: string;
    updatedAt?: string;
    author?: string;
  };
}
