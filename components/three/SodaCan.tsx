"use client";
import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Center, Bounds, useBounds, AccumulativeShadows, RandomizedLight } from "@react-three/drei";
import * as THREE from "three";

interface CanModelProps {
  autospin?: number;
  scrollProgress?: React.MutableRefObject<number>;
}

function FitCamera() {
  const bounds = useBounds();
  // Only fit once on mount
  const fitted = useRef(false);
  useFrame(() => {
    if (!fitted.current) {
      bounds.refresh().fit();
      fitted.current = true;
    }
  });
  return null;
}

function CanModel({ autospin = 1.5, scrollProgress }: CanModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/soda_can.glb");

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const p = scrollProgress?.current ?? 0;
    groupRef.current.rotation.y = t * autospin + p * Math.PI * 2;
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.04;
    groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.025;
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

useGLTF.preload("/models/soda_can.glb");

interface SodaCanProps {
  autospin?: number;
  scrollProgress?: React.MutableRefObject<number>;
  className?: string;
  style?: React.CSSProperties;
}

export default function SodaCan({
  autospin = 1.5,
  scrollProgress,
  className = "",
  style,
}: SodaCanProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        // ACESFilmic tone mapping — same as Sketchfab default
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      dpr={[1, 2]}
      shadows
      className={className}
      style={{ background: "transparent", ...style }}
    >
      <Suspense fallback={null}>
        {/* City warehouse HDR — rich reflections on metallic surfaces */}
        <Environment
          preset="city"
          background={false}
          environmentIntensity={1.4}
        />

        {/* Key light — strong from top-right */}
        <directionalLight
          position={[3, 5, 4]}
          intensity={2.5}
          color="#fff8f0"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        {/* Fill light — soft from left */}
        <directionalLight
          position={[-4, 2, -2]}
          intensity={0.8}
          color="#c8d8ff"
        />
        {/* Rim light — back highlight for metallic edge */}
        <directionalLight
          position={[0, -2, -5]}
          intensity={1.2}
          color="#ff3322"
        />
        {/* Ambient */}
        <ambientLight intensity={0.3} />

        <Bounds fit clip observe margin={1.15}>
          <FitCamera />
          <CanModel autospin={autospin} scrollProgress={scrollProgress} />
        </Bounds>
      </Suspense>
    </Canvas>
  );
}
