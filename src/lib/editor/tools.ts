import { ToolMode } from './types'

/**
 * Tool helpers
 */
export const tools: Record<ToolMode, { name: string; icon: string }> = {
  select: { name: 'Select', icon: '⌖' },
  move: { name: 'Move', icon: '✥' },
  rotate: { name: 'Rotate', icon: '↻' },
  scale: { name: 'Scale', icon: '⇲' }
}

/**
 * Get tool display name
 */
export function getToolName(mode: ToolMode): string {
  return tools[mode].name
}

/**
 * Get tool icon
 */
export function getToolIcon(mode: ToolMode): string {
  return tools[mode].icon
}
