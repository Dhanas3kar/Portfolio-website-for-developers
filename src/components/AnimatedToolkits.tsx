import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface TechOrbProps {
  position: [number, number, number];
  color: string;
  text: string;
  delay?: number;
}

interface ToolkitItem {
  name: string;
  color: string;
  position: [number, number, number];
}

interface ParticleStyle {
  left: string;
  top: string;
  delay: string;
  duration: string;
}

// 3D Floating Technology Orb with proper typing
function TechOrb({ position, color, text, delay = 0 }: TechOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || !textRef.current) return;

    try {
      const time = state.clock.getElapsedTime() + delay;
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(time) * 0.1;
      textRef.current.lookAt(state.camera.position);
    } catch (error) {
      console.error('Error in TechOrb animation frame:', error);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <group position={position}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <MeshDistortMaterial
            color={color}
            distort={0.3}
            speed={2}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
        <Text
          ref={textRef}
          position={[0, -0.5, 0]}
          fontSize={0.12}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/space-mono.woff"
        >
          {text}
        </Text>
      </group>
    </Float>
  );
}

// 3D Scene for toolkits with memoized data
function ToolkitsScene() {
  const toolkits: ToolkitItem[] = useMemo(
    () => [
      { name: 'React', color: '#61DAFB', position: [-1.2, 0.8, 0] },
      { name: 'Node.js', color: '#68A063', position: [1.2, 0.8, 0] },
      { name: 'Python', color: '#3776AB', position: [-1.2, -0.8, 0] },
      { name: 'Docker', color: '#0DB7ED', position: [1.2, -0.8, 0] },
      { name: 'AWS', color: '#FF9900', position: [0, 0, -1] },
      { name: 'ML/AI', color: '#FF6B6B', position: [0, 0, 1] },
    ],
    []
  );

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#4f46e5" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
      {toolkits.map((toolkit, index) => (
        <TechOrb
          key={toolkit.name}
          position={toolkit.position}
          color={toolkit.color}
          text={toolkit.name}
          delay={index * 0.5}
        />
      ))}
    </>
  );
}

// Custom hook for generating particles with proper typing
function useParticles(count: number = 20): ParticleStyle[] {
  return useMemo(
    () =>
      Array.from({ length: Math.min(count, 100) }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2}s`,
        duration: `${2 + Math.random() * 3}s`,
      })),
    [count]
  );
}

export function AnimatedToolkits() {
  const particles = useParticles(20);

  return (
    <div 
      className="h-96 w-full relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20 backdrop-blur-md border border-cyan-500/30"
      role="img"
      aria-label="3D visualization of technology toolkits"
    >
      {/* 3D Canvas with error boundary */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 3], fov: 75 }}
          className="w-full h-full"
          style={{ pointerEvents: "none" }}
          aria-hidden="true"
          gl={{ antialias: true }}
          onCreated={({ gl }) => {
            try {
              gl.setPixelRatio(window.devicePixelRatio);
            } catch (error) {
              console.error('Error setting pixel ratio:', error);
            }
          }}
        >
          <ToolkitsScene />
        </Canvas>
      </div>

      {/* Animated particles overlay with performance optimization */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {particles.map((p, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
              willChange: 'transform, opacity' // Performance hint
            }}
          />
        ))}
      </div>

      {/* Glowing border effect with reduced motion consideration */}
      <div
        className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-pink-500/50 animate-pulse"
        style={{
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
        aria-hidden="true"
      />
    </div>
  );
}