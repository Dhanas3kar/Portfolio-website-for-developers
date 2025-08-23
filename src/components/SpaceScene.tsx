import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, OrbitControls, Trail, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Enhanced Animated planet component
function Planet({ position, color, size = 1, speed = 0.005 }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current && trailRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.y += speed;
      meshRef.current.rotation.x += speed * 0.5;
      // Orbital movement
      const radius = 2;
      meshRef.current.position.x = position[0] + Math.cos(time * speed * 10) * radius * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(time * speed * 8) * radius * 0.2;
      meshRef.current.position.z = position[2] + Math.sin(time * speed * 6) * radius * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={trailRef}>
        <Trail width={0.5} length={20} color={color} attenuation={t => t * t}>
          <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[size, 32, 32]} />
            <meshStandardMaterial
              color={color}
              roughness={0.1}
              metalness={0.9}
              emissive={color}
              emissiveIntensity={0.2}
            />
            <Sparkles
              count={15}
              scale={size * 2}
              size={2}
              speed={0.5}
              opacity={0.6}
              color={color}
            />
          </mesh>
        </Trail>
      </group>
    </Float>
  );
}

// Nebula-like background
function Nebula() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.0005;
      meshRef.current.rotation.y += 0.0008;
      meshRef.current.rotation.z += 0.0003;
    }
  });
  return (
    <mesh ref={meshRef} position={[0, 0, -20]} scale={[30, 30, 30]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshBasicMaterial
        color="#1a0033"
        transparent
        opacity={0.3}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

// Asteroid belt
function AsteroidBelt() {
  const asteroids = useMemo(() => {
    return [...Array(50)].map(() => ({
      position: [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      ],
      scale: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 0.02 + 0.01
    }));
  }, []);
  return (
    <>
      {asteroids.map((asteroid, i) => (
        <Float key={i} speed={asteroid.speed} rotationIntensity={1} floatIntensity={0.5}>
          <mesh position={asteroid.position as [number, number, number]} scale={asteroid.scale}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#444"
              roughness={0.8}
              metalness={0.2}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

// Vignette overlay for cinematic effect
function VignetteOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background: 'radial-gradient(ellipse at center, transparent 60%, #000 100%)',
        opacity: 0.5,
      }}
    />
  );
}

// Main enhanced 3D scene component
export function SpaceScene() {
  return (
    <>
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
        style={{ background: "linear-gradient(135deg, #0a0820 0%, #090a1a 100%)" }}
      />
      <VignetteOverlay />
      <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 75 }}
          gl={{ antialias: true, alpha: true }}
        >
          {/* Atmospheric fog for depth */}
          <fog attach="fog" args={["#0a0820", 20, 80]} />
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#4f46e5" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#06b6d4" />
          <pointLight position={[0, 15, 5]} intensity={1.5} color="#8b5cf6" />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={1}
            intensity={2}
            color="#f59e0b"
            castShadow
          />
          {/* Multi-layered starfield */}
          <Stars
            radius={300}
            depth={60}
            count={5000}
            factor={10}
            saturation={0}
            fade={true}
            speed={1}
          />
          <Stars
            radius={100}
            depth={30}
            count={2000}
            factor={5}
            saturation={0.2}
            fade={true}
            speed={0.5}
          />
          {/* Nebula background */}
          <Nebula />
          {/* Planets */}
          <Planet position={[-6, 3, -8]} color="#4f46e5" size={1.2} speed={0.008} />
          <Planet position={[7, -3, -12]} color="#06b6d4" size={1.8} speed={0.006} />
          <Planet position={[-3, -4, -15]} color="#8b5cf6" size={0.9} speed={0.01} />
          <Planet position={[4, 5, -10]} color="#f59e0b" size={1.4} speed={0.007} />
          <Planet position={[0, -6, -18]} color="#ef4444" size={1.1} speed={0.009} />
          <Planet position={[-8, 0, -6]} color="#10b981" size={0.8} speed={0.012} />
          {/* Asteroid belt */}
          <AsteroidBelt />
          {/* Orbit controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 2.2}
          />
        </Canvas>
      </div>
    </>
  );
}
