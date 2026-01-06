import * as THREE from 'three'

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

/**
 * Linear interpolation
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/**
 * Convert degrees to radians
 */
export function degToRad(degrees: number): number {
  return degrees * (Math.PI / 180)
}

/**
 * Convert radians to degrees
 */
export function radToDeg(radians: number): number {
  return radians * (180 / Math.PI)
}

/**
 * Snap value to grid
 */
export function snapToGrid(value: number, gridSize: number): number {
  return Math.round(value / gridSize) * gridSize
}

/**
 * Round vector to grid
 */
export function snapVector3ToGrid(vector: THREE.Vector3, gridSize: number): THREE.Vector3 {
  return new THREE.Vector3(
    snapToGrid(vector.x, gridSize),
    snapToGrid(vector.y, gridSize),
    snapToGrid(vector.z, gridSize)
  )
}
