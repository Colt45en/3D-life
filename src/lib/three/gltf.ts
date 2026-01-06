import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'

/**
 * Load GLTF model from URL
 */
export async function loadGLTF(url: string): Promise<THREE.Group> {
  const loader = new GLTFLoader()
  
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf) => {
        resolve(gltf.scene)
      },
      undefined,
      (error) => {
        reject(error)
      }
    )
  })
}

/**
 * Get model bounds
 */
export function getModelBounds(model: THREE.Object3D): THREE.Box3 {
  const box = new THREE.Box3()
  box.setFromObject(model)
  return box
}

/**
 * Center model at origin
 */
export function centerModel(model: THREE.Object3D): void {
  const box = getModelBounds(model)
  const center = box.getCenter(new THREE.Vector3())
  model.position.sub(center)
}

/**
 * Scale model to fit in unit cube
 */
export function normalizeModelScale(model: THREE.Object3D, targetSize = 1): void {
  const box = getModelBounds(model)
  const size = box.getSize(new THREE.Vector3())
  const maxDim = Math.max(size.x, size.y, size.z)
  const scale = targetSize / maxDim
  model.scale.multiplyScalar(scale)
}
