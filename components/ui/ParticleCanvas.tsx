"use client";
/**
 * ParticleCanvas — standalone R3F canvas for the preloader particle phase.
 * 2400 red particles swirl in chaos then converge into a bottle silhouette.
 * `converge` ref (0→1) drives the formation. `opacity` ref fades the whole thing out.
 */
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 2400;

function buildBottlePoints(): { home: Float32Array; chaos: Float32Array } {
  const pts = [
    [0.00,-3.00],[0.30,-2.92],[0.52,-2.72],[0.60,-2.45],
    [0.63,-2.10],[0.70,-1.60],[0.76,-1.00],[0.78,-0.40],
    [0.66, 0.10],[0.56, 0.45],[0.62, 0.85],[0.68, 1.25],
    [0.64, 1.65],[0.52, 1.95],[0.36, 2.18],[0.22, 2.38],
    [0.20, 2.65],[0.26, 2.75],[0.26, 2.95],[0.00, 2.95],
  ];
  const v2 = pts.map(([x, y]) => new THREE.Vector2(x, y));
  const geo = new THREE.LatheGeometry(v2, 80);
  const pos = geo.attributes.position;
  const total = pos.count;

  const home  = new Float32Array(COUNT * 3);
  const chaos = new Float32Array(COUNT * 3);

  for (let i = 0; i < COUNT; i++) {
    const vi = Math.floor(Math.random() * total);
    home[i*3]   = pos.getX(vi);
    home[i*3+1] = pos.getY(vi);
    home[i*3+2] = pos.getZ(vi);

    const r     = 3.5 + Math.random() * 4;
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    chaos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
    chaos[i*3+1] = r * Math.cos(phi) - 1;
    chaos[i*3+2] = r * Math.sin(phi) * Math.sin(theta);
  }

  geo.dispose();
  return { home, chaos };
}

function Particles({
  converge,
  opacity,
}: {
  converge: React.RefObject<number>;
  opacity:  React.RefObject<number>;
}) {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);

  const { home, chaos, colors, initPos } = useMemo(() => {
    const { home, chaos } = buildBottlePoints();
    const colors  = new Float32Array(COUNT * 3);
    const initPos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const t = Math.random();
      colors[i*3]   = 0.85 + t * 0.15;
      colors[i*3+1] = 0.0;
      colors[i*3+2] = 0.05;
      initPos[i*3]   = chaos[i*3];
      initPos[i*3+1] = chaos[i*3+1];
      initPos[i*3+2] = chaos[i*3+2];
    }
    return { home, chaos, colors, initPos };
  }, []);

  useFrame((state) => {
    if (!ref.current || !matRef.current) return;
    const t  = state.clock.getElapsedTime();
    const c  = converge.current;
    const ec = c * c * (3 - 2 * c); // smoothstep
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < COUNT; i++) {
      const swirl = (1 - c) * 0.45;
      const angle = t * 0.55 + i * 0.011;
      const sx = Math.sin(angle) * swirl;
      const sz = Math.cos(angle * 0.7) * swirl;

      pos.setXYZ(
        i,
        chaos[i*3]   + (home[i*3]   - chaos[i*3])   * ec + sx,
        chaos[i*3+1] + (home[i*3+1] - chaos[i*3+1]) * ec,
        chaos[i*3+2] + (home[i*3+2] - chaos[i*3+2]) * ec + sz,
      );
    }
    pos.needsUpdate = true;

    ref.current.rotation.y = t * 0.22 * (1 - c * 0.85);
    matRef.current.opacity  = opacity.current;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[initPos, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        size={0.058}
        vertexColors
        transparent
        opacity={1}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

interface ParticleCanvasProps {
  converge: React.RefObject<number>;
  opacity:  React.RefObject<number>;
}

export default function ParticleCanvas({ converge, opacity }: ParticleCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      style={{ position: "absolute", inset: 0, background: "transparent" }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[2, 2, 4]} intensity={1.5} color="#F40009" />
      <Particles converge={converge} opacity={opacity} />
    </Canvas>
  );
}
