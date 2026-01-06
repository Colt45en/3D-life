"use client";

import React, { useRef, useState, useEffect } from "react";
import { ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { Entity } from "@/lib/editor/types";
import { useEditorStore } from "@/lib/editor/store";
import { loadGLTF } from "@/lib/three/gltf";

interface EntityMeshProps {
  entity: Entity;
}

export default function EntityMesh({ entity }: EntityMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [avatarModel, setAvatarModel] = useState<THREE.Group | null>(null);
  const { selectedIds, selectEntity } = useEditorStore();
  const isSelected = selectedIds.includes(entity.id);

  // Load avatar model if type is avatar
  useEffect(() => {
    if (entity.type === "avatar" && entity.avatarUrl) {
      loadGLTF(entity.avatarUrl)
        .then((model) => {
          setAvatarModel(model);
        })
        .catch((err) => {
          console.error("Failed to load avatar:", err);
        });
    }
  }, [entity.type, entity.avatarUrl]);

  // Update transform
  useEffect(() => {
    const ref = avatarModel ? groupRef : meshRef;
    if (ref.current) {
      ref.current.position.set(...entity.transform.position);
      ref.current.rotation.set(...entity.transform.rotation);
      ref.current.scale.set(...entity.transform.scale);
    }
  }, [entity.transform, avatarModel]);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    selectEntity(entity.id, e.nativeEvent.shiftKey);
  };

  if (!entity.visible) return null;

  // Render avatar model
  if (entity.type === "avatar" && avatarModel) {
    return (
      <group ref={groupRef} onClick={handleClick}>
        <primitive object={avatarModel.clone()} />
        {isSelected && <boxHelper args={[avatarModel, 0xffff00]} />}
      </group>
    );
  }

  // Render primitive geometry
  let geometry: THREE.BufferGeometry;
  switch (entity.type) {
    case "sphere":
      geometry = new THREE.SphereGeometry(0.5, 32, 32);
      break;
    case "cylinder":
      geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
      break;
    case "cone":
      geometry = new THREE.ConeGeometry(0.5, 1, 32);
      break;
    default:
      geometry = new THREE.BoxGeometry(1, 1, 1);
  }

  return (
    <mesh ref={meshRef} geometry={geometry} onClick={handleClick}>
      <meshStandardMaterial
        color={entity.color || "#888888"}
        emissive={isSelected ? "#ffff00" : "#000000"}
        emissiveIntensity={isSelected ? 0.3 : 0}
      />
    </mesh>
  );
}
