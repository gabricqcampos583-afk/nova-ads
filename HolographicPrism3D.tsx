import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function PrismMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.8, 0]} />
        <MeshDistortMaterial
          color="#3b82f6"
          roughness={0.1}
          metalness={0.9}
          distort={0.4}
          speed={2}
          transparent
          opacity={0.85}
        />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#a855f7" wireframe />
      </mesh>
    </Float>
  );
}

export default function HolographicPrism3D() {
  return (
    <div className="w-full h-[400px] lg:h-[550px] relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#00ffff" />
        <pointLight position={[-5, -5, -5]} intensity={1.5} color="#a855f7" />
        <PrismMesh />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
}
