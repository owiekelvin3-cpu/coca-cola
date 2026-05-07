"use client";
/**
 * CokeBottle3D — R3F canvas with scroll-driven animation.
 *
 * Props:
 *  scrollProgress  — MutableRefObject<number> (0→1), driven by GSAP scrub
 *  autospin        — fallback idle rotation when scroll is 0
 */
import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  MeshTransmissionMaterial,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

// ── Geometries ────────────────────────────────────────────────────
function useBottleGeo() {
  return useMemo(() => {
    const pts = [
      new THREE.Vector2(0.00, -3.00), new THREE.Vector2(0.30, -2.92),
      new THREE.Vector2(0.52, -2.72), new THREE.Vector2(0.60, -2.45),
      new THREE.Vector2(0.63, -2.10), new THREE.Vector2(0.70, -1.60),
      new THREE.Vector2(0.76, -1.00), new THREE.Vector2(0.78, -0.40),
      new THREE.Vector2(0.66,  0.10), new THREE.Vector2(0.56,  0.45),
      new THREE.Vector2(0.62,  0.85), new THREE.Vector2(0.68,  1.25),
      new THREE.Vector2(0.64,  1.65), new THREE.Vector2(0.52,  1.95),
      new THREE.Vector2(0.36,  2.18), new THREE.Vector2(0.22,  2.38),
      new THREE.Vector2(0.20,  2.65), new THREE.Vector2(0.26,  2.75),
      new THREE.Vector2(0.26,  2.95), new THREE.Vector2(0.00,  2.95),
    ];
    return new THREE.LatheGeometry(pts, 80);
  }, []);
}

function useLiquidGeo() {
  return useMemo(() => {
    const pts = [
      new THREE.Vector2(0.00, -2.80), new THREE.Vector2(0.28, -2.72),
      new THREE.Vector2(0.48, -2.55), new THREE.Vector2(0.56, -2.30),
      new THREE.Vector2(0.60, -1.95), new THREE.Vector2(0.66, -1.45),
      new THREE.Vector2(0.72, -0.85), new THREE.Vector2(0.73, -0.25),
      new THREE.Vector2(0.62,  0.18), new THREE.Vector2(0.52,  0.50),
      new THREE.Vector2(0.58,  0.88), new THREE.Vector2(0.63,  1.28),
      new THREE.Vector2(0.59,  1.68), new THREE.Vector2(0.48,  1.96),
      new THREE.Vector2(0.32,  2.18), new THREE.Vector2(0.18,  2.36),
      new THREE.Vector2(0.00,  2.36),
    ];
    return new THREE.LatheGeometry(pts, 60);
  }, []);
}

// ── Scroll-driven bottle ──────────────────────────────────────────
interface BottleProps {
  scrollProgress: React.MutableRefObject<number>;
  autospin: number;
}

function Bottle({ scrollProgress, autospin }: BottleProps) {
  const groupRef  = useRef<THREE.Group>(null);
  const liquidRef = useRef<THREE.Mesh>(null);
  const bottleGeo = useBottleGeo();
  const liquidGeo = useLiquidGeo();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const p = scrollProgress.current; // 0 → 1

    // ── Scroll-driven transforms ──────────────────────────────
    // Y rotation: full 360° over scroll (+ idle autospin when p=0)
    const scrollY = p * Math.PI * 2;
    const idleY   = t * autospin * (1 - p); // fades out as scroll takes over
    groupRef.current.rotation.y = scrollY + idleY;

    // X tilt: 0 → 0.18 rad at midpoint → 0 at end (subtle nod)
    groupRef.current.rotation.x = Math.sin(p * Math.PI) * 0.18;

    // Scale: 0.7 → 1.0 in first 20% of scroll
    const scaleP = Math.min(p / 0.2, 1);
    const scale  = 0.7 + scaleP * 0.3;
    groupRef.current.scale.setScalar(scale);

    // Idle float (only when not scrolling)
    const floatAmt = (1 - p) * 0.08;
    groupRef.current.position.y = Math.sin(t * 0.5) * floatAmt;

    // Liquid counter-rotation
    if (liquidRef.current) {
      liquidRef.current.rotation.y = -(scrollY * 0.4 + t * 0.12 * (1 - p));
    }
  });

  return (
    <group ref={groupRef} scale={0.7}>
      {/* Glass */}
      <mesh geometry={bottleGeo} castShadow>
        <MeshTransmissionMaterial
          backside backsideThickness={0.35}
          samples={10} resolution={512}
          transmission={0.97} roughness={0.03}
          thickness={0.32} ior={1.52}
          chromaticAberration={0.04} anisotropy={0.12}
          distortion={0.07} distortionScale={0.13}
          temporalDistortion={0.08}
          color="#99BBDD"
          attenuationDistance={0.85} attenuationColor="#CC1100"
          envMapIntensity={1.3}
        />
      </mesh>

      {/* Liquid */}
      <mesh ref={liquidRef} geometry={liquidGeo}>
        <meshPhysicalMaterial
          color="#7A0000" transparent opacity={0.9}
          roughness={0.04} transmission={0.25}
          thickness={1.0} side={THREE.BackSide}
        />
      </mesh>

      {/* Label */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.695, 0.695, 1.9, 80, 1, true]} />
        <meshStandardMaterial color="#F40009" roughness={0.22} side={THREE.FrontSide} />
      </mesh>

      {/* White stripe */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.698, 0.698, 0.2, 80, 1, true]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} side={THREE.FrontSide} />
      </mesh>

      {/* Cap */}
      <mesh position={[0, 2.85, 0]}>
        <cylinderGeometry args={[0.265, 0.265, 0.22, 40]} />
        <meshStandardMaterial color="#CC0000" roughness={0.18} metalness={0.65} />
      </mesh>

      {/* Cap top */}
      <mesh position={[0, 2.97, 0]}>
        <cylinderGeometry args={[0.265, 0.265, 0.02, 40]} />
        <meshStandardMaterial color="#AA0000" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Base */}
      <mesh position={[0, -3.01, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.04, 40]} />
        <meshStandardMaterial color="#111" roughness={0.6} metalness={0.2} />
      </mesh>
    </group>
  );
}

// ── Camera zoom driven by scroll ──────────────────────────────────
function CameraRig({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  useFrame(() => {
    const p = scrollProgress.current;
    // Zoom in slightly at midpoint (p=0.5), back out at end
    const zoom = 1 - Math.sin(p * Math.PI) * 0.12;
    camera.position.z = 9 * zoom;
  });
  return null;
}

// ── Dynamic lighting driven by scroll ────────────────────────────
function ScrollLight({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const lightRef = useRef<THREE.PointLight>(null);
  useFrame(() => {
    if (!lightRef.current) return;
    const p = scrollProgress.current;
    // Light sweeps around the bottle as it rotates
    lightRef.current.position.x = Math.sin(p * Math.PI * 2) * 5;
    lightRef.current.position.z = Math.cos(p * Math.PI * 2) * 5;
    lightRef.current.intensity   = 1.0 + p * 0.8;
  });
  return <pointLight ref={lightRef} position={[5, 2, 5]} intensity={1} color="#FF6644" distance={14} />;
}

// ── Scene ─────────────────────────────────────────────────────────
interface SceneProps {
  scrollProgress: React.MutableRefObject<number>;
  autospin: number;
}

function Scene({ scrollProgress, autospin }: SceneProps) {
  return (
    <>
      <Environment preset="studio" />
      <ambientLight intensity={0.15} />
      <directionalLight position={[4, 8, 6]}  intensity={2.5} color="#ffffff" castShadow />
      <directionalLight position={[-3, 2, -6]} intensity={0.7} color="#aaccff" />
      <pointLight       position={[2, -1, 4]}  intensity={1.2} color="#F40009" distance={12} />
      <ScrollLight scrollProgress={scrollProgress} />
      <ContactShadows position={[0, -3.2, 0]} opacity={0.3} scale={5} blur={2} far={4} color="#F40009" />
      <Bottle scrollProgress={scrollProgress} autospin={autospin} />
      <CameraRig scrollProgress={scrollProgress} />
    </>
  );
}

// ── Exported canvas ───────────────────────────────────────────────
interface CokeBottle3DProps {
  scrollProgress: React.MutableRefObject<number>;
  autospin?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function CokeBottle3D({
  scrollProgress,
  autospin = 0.25,
  className = "",
  style,
}: CokeBottle3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 42, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: 4,
        toneMappingExposure: 1.15,
      }}
      shadows
      dpr={[1, 1.5]}
      className={className}
      style={{ background: "transparent", ...style }}
    >
      <Suspense fallback={null}>
        <Scene scrollProgress={scrollProgress} autospin={autospin} />
      </Suspense>
    </Canvas>
  );
}
