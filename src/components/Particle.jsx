import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Canvas , useThree } from '@react-three/fiber';
import { Physics, useSphere, usePlane } from '@react-three/cannon';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { Bloom, EffectComposer, SSAO, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import spaceBackground from '../assets/space-background-realistic-starry-night-cosmos-shining-stars-milky-way-stardust-color-galaxy.jpg';



// Interactive Particle Component
const InteractiveParticle = ({ position, color, radius }) => {
  const [particleColor, setParticleColor] = useState(color);
  const [ref] = useSphere(() => ({
    mass: 0.5,
    position,
    args: [radius],
    material: { friction: 0.8, restitution: 0.95 },
    linearDamping: 0.1,
    angularDamping: 0.1,
  }));

  const handleClick = () => {
    const colors = [
      '#FF5733', // Bright orange
      '#33FF57', // Bright green
      '#3357FF', // Bright blue
      '#F1C40F', // Bright yellow
      '#8E44AD', // Bright purple
      '#FF1493', // Bright pink
      '#FF4500', // Bright red-orange
      '#1E90FF', // Bright sky blue
      '#ADFF2F', // Bright lime green
      '#FFD700'  // Bright gold
    ];
    
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    setParticleColor(newColor);
    console.log('Particle clicked! New color:', newColor);
  };
  function generateNoiseTexture() {
    const size = 256; // Size of the texture
    const data = new Uint8Array(size * size);
    for (let i = 0; i < size * size; i++) {
      data[i] = Math.random() * 255; // Generate random noise
    }
    const texture = new THREE.DataTexture(data, size, size, THREE.LuminanceFormat);
    texture.needsUpdate = true;
    return texture;
  }
  return (
    <mesh ref={ref} castShadow onClick={handleClick}>
      {/* High-detail sphere geometry */}
      <sphereGeometry args={[radius, 128, 128]} /> {/* Increased segments for smoothness */}
      <meshPhysicalMaterial
      color={particleColor}
      metalness={0.9} // Metallic surface
      roughness={0.05} // Low roughness for sharp reflections
      clearcoat={1} // Adds clear reflective coat
      clearcoatRoughness={0.15} // Subtle imperfection in the clearcoat
      reflectivity={0.95} // High reflectivity
      envMapIntensity={0.5} // Enhance environment map reflections
      transmission={0.8} // Glass-like transparency
      ior={1.45} // Index of refraction for realistic glass
      thickness={1.2} // Thickness of glass
      sheen={1} // Pearlescent sheen effect
      sheenColor={new THREE.Color(0xffffff)} // Subtle white sheen Boost environment reflections
      >
        {/* Adding procedural detail */}
        <primitive attach="displacementMap" object={generateNoiseTexture()} />
        <primitive attach="roughnessMap" object={generateNoiseTexture()} />
      </meshPhysicalMaterial>
    </mesh>
  );
};





// Ground Plane Component
const GroundPlane = () => {
  const [ref] = usePlane(() => ({
    position: [0, -2.5, 0],
    rotation: [-Math.PI / 2, 0, 0],
    material: { friction: 0.9 },
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial color="#0E1A40" roughness={0.8} metalness={0.2} />
    </mesh>
  );
};

// Background Scene Component
const BackgroundScene = () => (
  <group>
    <mesh position={[0, -50, -50]}>
      <sphereGeometry args={[100, 64, 64]} />
      <meshStandardMaterial color="#0E1A40" metalness={0.2} roughness={0.8} side={THREE.BackSide} />
    </mesh>
  </group>
);

// Particle System Component
const ParticleSystem = ({ addParticleAt, setAddParticleAt, initialParticles }) => {
  const [particles, setParticles] = useState(initialParticles);

  useEffect(() => {
    if (addParticleAt) {
      const colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomRadius = Math.random() * 0.5 + 0.5;

      setParticles((prev) => [
        ...prev,
        { position: addParticleAt, color: randomColor, radius: randomRadius },
      ]);

      setAddParticleAt(null);
    }
  }, [addParticleAt, setAddParticleAt]);

  return particles.map((particle, index) => (
    <InteractiveParticle
      key={index}
      position={particle.position}
      color={particle.color}
      radius={particle.radius}
    />
  ));
};

// Main Particle Scene Component
const ParticleScene = () => {
  const [addParticleAt, setAddParticleAt] = useState(null);
  const cameraRef = useRef();

  // Generate initial particles
  const initialParticles = useMemo(() => {
    const particles = [];
    for (let i = 0; i < 19; i++) {
      particles.push({
        position: [
          (Math.random() - 0.5) * 20,
          Math.random() * 5 + 2,
          (Math.random() - 0.5) * 20,
        ],
        color: [
          '#FF5733', // Bright orange
          '#33FF57', // Bright green
          '#3357FF', // Bright blue
          '#F1C40F', // Bright yellow
          '#8E44AD', // Bright purple
          '#FF1493', // Bright pink
          '#FF4500', // Bright red-orange
          '#1E90FF', // Bright sky blue
          '#ADFF2F', // Bright lime green
          '#FFD700'  // Bright gold
        ][Math.floor(Math.random() * 10)],
        
        radius: Math.random() * 0.5 + 0.5,
      });
    }
    return particles;
  }, []);

  const handleCanvasClick = (event) => {
    event.stopPropagation();

    const mouse = new THREE.Vector2();
    const rect = event.target.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    const camera = cameraRef.current;

    if (!camera) {
      console.error('Camera reference not found!');
      return;
    }

    raycaster.setFromCamera(mouse, camera);

    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -2);
    const intersectPoint = new THREE.Vector3();

    if (raycaster.ray.intersectPlane(plane, intersectPoint)) {
      setAddParticleAt(intersectPoint.toArray());
    }
  };

  return (
    <Canvas
      style={{ height: '210vh', width: '100vw' }}
      shadows
      onClick={handleCanvasClick}
    >
      {/* Custom Camera */}
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        position={[0, 5, 15]}
        fov={50}
        near={0.1}
        far={1000}
      />

      {/* Background and Scene Setup */}
      <BackgroundScene />

      {/* Lighting */}
      <ambientLight intensity={0.2} color="#404040" />
      <directionalLight
        position={[15, 20, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <spotLight
        position={[-15, 25, -10]}
        angle={Math.PI / 6}
        penumbra={0.5}
        intensity={1.5}
        castShadow
      />
      <pointLight position={[5, 10, 5]} intensity={0.8} />
      <hemisphereLight skyColor="#bb99ff" groundColor="#664422" intensity={0.4} />

      {/* Environment */}
      <Environment files={spaceBackground} background />

      {/* Physics and Particle System */}
      <Physics gravity={[0, -9.8, 0]}>
        <GroundPlane />
        <ParticleSystem
          addParticleAt={addParticleAt}
          setAddParticleAt={setAddParticleAt}
          initialParticles={initialParticles}
        />
      </Physics>

      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />

      {/* Postprocessing */}
      <EffectComposer>
        <Bloom intensity={1.0} radius={0.2} />
        <SSAO radius={0.2} intensity={12} />
        <DepthOfField focusDistance={0.02} focalLength={0.1} bokehScale={2.5} />
      </EffectComposer>
    </Canvas>
    
  );
};

export default ParticleScene;
