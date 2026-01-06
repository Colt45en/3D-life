import * as THREE from 'three'

/**
 * Performance metrics
 */
export interface RenderMetrics {
  fps: number
  frameTime: number
  triangles: number
  calls: number
  memory?: number
}

/**
 * Calculate scene metrics
 */
export function calculateSceneMetrics(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene
): Omit<RenderMetrics, 'fps' | 'frameTime'> {
  const info = renderer.info
  
  let triangles = 0
  scene.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      const geometry = obj.geometry
      if (geometry.index) {
        triangles += geometry.index.count / 3
      } else if (geometry.attributes.position) {
        triangles += geometry.attributes.position.count / 3
      }
    }
  })

  return {
    triangles: Math.round(triangles),
    calls: info.render.calls,
    memory: (info.memory.geometries + info.memory.textures) || undefined
  }
}

/**
 * FPS counter
 */
export class FPSCounter {
  private frames = 0
  private lastTime = performance.now()
  private fps = 60
  private frameTime = 16.67

  update(): { fps: number; frameTime: number } {
    this.frames++
    const currentTime = performance.now()
    const delta = currentTime - this.lastTime

    if (delta >= 1000) {
      this.fps = Math.round((this.frames * 1000) / delta)
      this.frameTime = delta / this.frames
      this.frames = 0
      this.lastTime = currentTime
    }

    return {
      fps: this.fps,
      frameTime: this.frameTime
    }
  }
}
