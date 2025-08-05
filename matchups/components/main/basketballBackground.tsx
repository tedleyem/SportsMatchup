"use client";

import { Sphere, useTexture } from "@react-three/drei";
import { Canvas, Euler, ExtendedColors, Layers, Matrix4, NodeProps, NonFunctionKeys, Overwrite, Quaternion, useFrame, Vector3 } from "@react-three/fiber";
import { EventHandlers } from "@react-three/fiber/dist/declarations/src/core/events";
import * as random from "maath/random";
import * as THREE from 'three';
import { useState, useRef, Suspense, JSX } from "react";
import { Mesh, Group, Object3DEventMap } from "three"; 

export const BasketballBackground = (props: JSX.IntrinsicAttributes & Omit<ExtendedColors<Overwrite<Partial<Group<Object3DEventMap>>, NodeProps<Group<Object3DEventMap>, typeof Group>>>, NonFunctionKeys<{ position?: Vector3; up?: Vector3; scale?: Vector3; rotation?: Euler; matrix?: Matrix4; quaternion?: Quaternion; layers?: Layers; dispose?: (() => void) | null; }>> & { position?: Vector3; up?: Vector3; scale?: Vector3; rotation?: Euler; matrix?: Matrix4; quaternion?: Quaternion; layers?: Layers; dispose?: (() => void) | null; } & EventHandlers) => {
//  const groupRef = useRef(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const [positions] = useState(() =>
    random.inSphere(new Float32Array(100 * 3), { radius: 1.2 }) // Reduced to 100 basketballs
  );
  const texture = useTexture("/textures/basketball.jpg"); // Load basketball texture

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Example: Move group along x-axis (replace with your desired logic)
      groupRef.current.position.x += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, Math.PI / 4]} {...props}>
      {Array.from({ length: 100 }).map((_, index) => (
        <mesh
          key={index}
          position={[
            positions[index * 3],
            positions[index * 3 + 1],
            positions[index * 3 + 2],
          ]}
        >
          <sphereGeometry args={[0.02, 32, 32]} /> {/* Small sphere for basketball */}
          <meshStandardMaterial
            map={texture} // Apply basketball texture
            roughness={0.5}
            metalness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

export const BasketballCanvas = () => (
  <div className="w-full h-auto fixed inset-0 -z-10">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <BasketballBackground />
      </Suspense>
    </Canvas>
  </div>
);