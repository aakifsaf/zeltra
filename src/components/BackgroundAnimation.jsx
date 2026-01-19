import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function BackgroundAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 3D Particle System */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <FloatingParticles />
          <FloatingGeometries />
          <PulsingOrbs />
        </Canvas>
      </div>
      
      {/* Animated Gradient Orbs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/30 to-cyan-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-60 -left-20 w-80 h-80 bg-gradient-to-tr from-purple-500/30 to-pink-500/20 rounded-full blur-3xl animate-pulse-slower"></div>
      <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/10 rounded-full blur-3xl animate-pulse-medium"></div>
      
      {/* Floating 3D Grid */}
      <div className="absolute inset-0 opacity-15">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <FloatingGrid />
        </Canvas>
      </div>
      
      {/* Animated Mesh */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 opacity-30">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <RotatingTorus />
        </Canvas>
      </div>
      
      {/* Particle Lines */}
      <div className="absolute inset-0 opacity-20">
        <Canvas>
          <FloatingLines />
        </Canvas>
      </div>
      
      {/* Interactive Light Beams */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/30 to-transparent animate-beam"></div>
        <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-purple-500/30 to-transparent animate-beam delay-1000"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent animate-beam delay-2000"></div>
      </div>
    </div>
  );
}

// 3D Particle System Component
function FloatingParticles() {
  const pointsRef = useRef();
  const count = 2000;
  
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
      pointsRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.5;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3b82f6"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Floating Geometries Component
function FloatingGeometries() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      groupRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.getElapsedTime() * 0.5 + i) * 0.3;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Icosahedron */}
      <mesh position={[-3, 0, 0]}>
        <icosahedronGeometry args={[0.8, 0]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.3} />
      </mesh>
      
      {/* Octahedron */}
      <mesh position={[3, 0, 0]}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.3} />
      </mesh>
      
      {/* Dodecahedron */}
      <mesh position={[0, 2, -2]}>
        <dodecahedronGeometry args={[0.6, 0]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

// Pulsing Orbs Component
function PulsingOrbs() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const scale = 1 + Math.sin(state.clock.getElapsedTime() * 2 + i) * 0.2;
        child.scale.setScalar(scale);
      });
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[0.4]} position={[-2, -2, -1]}>
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.1} />
      </Sphere>
      <Sphere args={[0.3]} position={[2, 1, -2]}>
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.1} />
      </Sphere>
      <Sphere args={[0.5]} position={[0, -1, -3]}>
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.1} />
      </Sphere>
    </group>
  );
}

// Floating Grid Component
function FloatingGrid() {
  const gridRef = useRef();
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
      gridRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <mesh ref={gridRef} rotation={[0.5, 0, 0]}>
      <gridHelper args={[20, 40, '#3b82f6', '#1e40af']} />
      <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.3} />
    </mesh>
  );
}

// Rotating Torus Component
function RotatingTorus() {
  const torusRef = useRef();
  
  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      torusRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <mesh ref={torusRef}>
      <torusGeometry args={[1, 0.2, 16, 100]} />
      <meshBasicMaterial 
        color="#8b5cf6" 
        wireframe 
        transparent 
        opacity={0.4}
      />
    </mesh>
  );
}

// Floating Lines Component
function FloatingLines() {
  const linesRef = useRef();
  const count = 50;
  
  const positions = new Float32Array(count * 6);
  for (let i = 0; i < count * 6; i += 6) {
    const x = (Math.random() - 0.5) * 20;
    const y = (Math.random() - 0.5) * 20;
    const z = (Math.random() - 0.5) * 20;
    
    positions[i] = x;
    positions[i + 1] = y;
    positions[i + 2] = z;
    positions[i + 3] = x + (Math.random() - 0.5) * 2;
    positions[i + 4] = y + (Math.random() - 0.5) * 2;
    positions[i + 5] = z + (Math.random() - 0.5) * 2;
  }

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#3b82f6" transparent opacity={0.2} />
    </lineSegments>
  );
}


export default BackgroundAnimation;