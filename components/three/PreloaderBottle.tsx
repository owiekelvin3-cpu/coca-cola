"use client";
/**
 * PreloaderBottle — self-hosted GLB bottle for the loading screen.
 * Loads instantly from /models/coca_cola_bottle.glb — no Sketchfab.
 */
import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Center, Bounds, useBounds } from "@react-three/drei";
import * as THREE from "three";

function FitCamera() {
  const bounds = useBounds();
  const done = useRef(false);
  useFrame(() => {
    if (!done.current) {
      bounds.refresh().fit();
      done.current = true;
    }
  });
  return null;
}

function BottleModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/coca_cola_bottle.glb");

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Slow elegant spin for the preloader
    groupRef.current.rotation.y = t * 0.5;
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.04;
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

useGLTF.preload("/models/coca_cola_bottle.glb");

export default function PreloaderBottle({ style }: { style?: React.CSSProperties }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      dpr={[1, 2]}
      style={{ background: "transparent", width: "100%", height: "100%", ...style }}
    >
      <Suspense fallback={null}>
        <Environment preset="studio" backgroundIntensity={0} environmentIntensity={1.5} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 5, 4]}  intensity={2.5} color="#fff8f0" />
        <directionalLight position={[-4, 2, -2]} intensity={0.8} color="#c8d8ff" />
        <directionalLight position={[0, -2, -5]} intensity={1.0} color="#ff3322" />
        <Bounds fit clip observe margin={1.2}>
          <FitCamera />
          <BottleModel />
        </Bounds>
      </Suspense>
    </Canvas>
  );
}
