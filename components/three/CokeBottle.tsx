"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Environment, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function BottleGeometry() {
  const geometry = useMemo(() => {
    // Lathe geometry to create a Coke bottle silhouette
    const points: THREE.Vector2[] = [];
    // Bottom
    points.push(new THREE.Vector2(0.0, -2.8));
    points.push(new THREE.Vector2(0.35, -2.7));
    points.push(new THREE.Vector2(0.55, -2.5));
    points.push(new THREE.Vector2(0.6, -2.2));
    // Body curve
    points.push(new THREE.Vector2(0.62, -1.8));
    points.push(new THREE.Vector2(0.7, -1.2));
    points.push(new THREE.Vector2(0.75, -0.6));
    // Waist
    points.push(new THREE.Vector2(0.65, 0.0));
    points.push(new THREE.Vector2(0.55, 0.4));
    // Upper body
    points.push(new THREE.Vector2(0.6, 0.8));
    points.push(new THREE.Vector2(0.65, 1.2));
    points.push(new THREE.Vector2(0.6, 1.6));
    // Shoulder
    points.push(new THREE.Vector2(0.5, 1.9));
    points.push(new THREE.Vector2(0.35, 2.1));
    // Neck
    points.push(new THREE.Vector2(0.22, 2.3));
    points.push(new THREE.Vector2(0.2, 2.6));
    // Cap
    points.push(new THREE.Vector2(0.25, 2.7));
    points.push(new THREE.Vector2(0.25, 2.9));
    points.push(new THREE.Vector2(0.0, 2.9));

    return new THREE.LatheGeometry(points, 64);
  }, []);

  return geometry;
}

function LiquidInside() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.3;
  });

  const geometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0.0, -2.6));
    points.push(new THREE.Vector2(0.3, -2.5));
    points.push(new THREE.Vector2(0.5, -2.3));
    points.push(new THREE.Vector2(0.55, -2.0));
    points.push(new THREE.Vector2(0.58, -1.5));
    points.push(new THREE.Vector2(0.65, -0.8));
    points.push(new THREE.Vector2(0.68, -0.2));
    points.push(new THREE.Vector2(0.58, 0.3));
    points.push(new THREE.Vector2(0.5, 0.6));
    points.push(new THREE.Vector2(0.55, 1.0));
    points.push(new THREE.Vector2(0.58, 1.4));
    points.push(new THREE.Vector2(0.52, 1.7));
    points.push(new THREE.Vector2(0.4, 1.9));
    points.push(new THREE.Vector2(0.28, 2.1));
    points.push(new THREE.Vector2(0.18, 2.3));
    points.push(new THREE.Vector2(0.0, 2.3));
    return new THREE.LatheGeometry(points, 48);
  }, []);

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color="#8B0000"
        transparent
        opacity={0.85}
        roughness={0.1}
        metalness={0.1}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

function BottleLabel() {
  return (
    <mesh position={[0, -0.3, 0]}>
      <cylinderGeometry args={[0.68, 0.68, 1.8, 64, 1, true]} />
      <meshStandardMaterial
        color="#F40009"
        roughness={0.3}
        metalness={0.1}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}

export default function CokeBottle() {
  const bottleRef = useRef<THREE.Group>(null);
  const bottleGeometry = BottleGeometry();

  useFrame((state) => {
    if (!bottleRef.current) return;
    const t = state.clock.getElapsedTime();
    bottleRef.current.rotation.y = t * 0.4;
    bottleRef.current.position.y = Math.sin(t * 0.6) * 0.15;
  });

  return (
    <>
      <Environment preset="studio" />
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={2}
        color="#ffffff"
        castShadow
      />
      <directionalLight
        position={[-5, 3, -5]}
        intensity={0.8}
        color="#F40009"
      />
      <pointLight position={[0, 5, 3]} intensity={1.5} color="#FF4444" />
      <pointLight position={[0, -3, 3]} intensity={0.5} color="#ffffff" />

      <Sparkles
        count={60}
        scale={6}
        size={1.5}
        speed={0.4}
        color="#F40009"
        opacity={0.6}
      />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={bottleRef} scale={[0.9, 0.9, 0.9]}>
          {/* Glass bottle */}
          <mesh geometry={bottleGeometry} castShadow>
            <MeshTransmissionMaterial
              backside
              samples={16}
              resolution={512}
              transmission={0.95}
              roughness={0.05}
              thickness={0.3}
              ior={1.5}
              chromaticAberration={0.06}
              anisotropy={0.1}
              distortion={0.1}
              distortionScale={0.2}
              temporalDistortion={0.2}
              color="#88CCFF"
              attenuationDistance={0.5}
              attenuationColor="#F40009"
            />
          </mesh>

          {/* Liquid inside */}
          <LiquidInside />

          {/* Label */}
          <BottleLabel />

          {/* Cap */}
          <mesh position={[0, 2.8, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.2, 32]} />
            <meshStandardMaterial color="#CC0000" roughness={0.3} metalness={0.5} />
          </mesh>
        </group>
      </Float>
    </>
  );
}
