"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import CokeBottle from "./CokeBottle";

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 200;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#F40009"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function LiquidRings() {
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ringsRef.current) return;
    const t = state.clock.getElapsedTime();
    ringsRef.current.children.forEach((ring, i) => {
      const mesh = ring as THREE.Mesh;
      mesh.scale.setScalar(1 + Math.sin(t * 0.5 + i * 1.2) * 0.05);
      mesh.rotation.z = t * 0.1 * (i % 2 === 0 ? 1 : -1);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.05 + Math.sin(t * 0.8 + i) * 0.03;
    });
  });

  return (
    <group ref={ringsRef} position={[0, 0, -3]}>
      {[3, 4.5, 6, 7.5, 9].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r, 0.02, 8, 100]} />
          <meshBasicMaterial color="#F40009" transparent opacity={0.06} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 2]}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <CokeBottle />
        <ParticleField />
        <LiquidRings />
        <Stars
          radius={50}
          depth={50}
          count={1000}
          factor={2}
          saturation={0}
          fade
          speed={0.5}
        />
      </Suspense>
    </Canvas>
  );
}
