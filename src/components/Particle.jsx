import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Physics, useSphere, usePlane } from '@react-three/cannon';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { Bloom, EffectComposer, SSAO, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import spaceBackground from '../assets/background.jpg';

// Interactive Particle Component
const InteractiveParticle = ({ position, color, radius }) => {
  const [particleColor, setParticleColor] = useState(color);
  const [particleRadius, setParticleRadius] = useState(radius);
  const [ref] = useSphere(() => ({
    mass: 0.5,
    position,
    args: [particleRadius],
    material: { friction: 0.8, restitution: 0.95 },
    linearDamping: 0.1,
    angularDamping: 0.1,
  }));

  const handleClick = () => {
    const colors = [
      '#00A7D0', // Bright Turquoise (accent1)
      '#F26B38', // Soft Coral (accent2)
      '#E6B800', // Golden Yellow (secondary)
      '#2F3A58', // Slate Blue (primary)
      '#4A5672', // Lighter tint of primary
      '#F2D966', // Lighter tint of secondary
      '#0088A6', // Darker shade of accent1
      '#F79D7D', // Lighter tint of accent2
      '#C59700', // Darker shade of secondary
      '#B8B8B8',  // Cool Gray (neutral)
    ];
    
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    const newRadius = Math.random() * 0.5 + 0.5; // Randomize radius on click
    setParticleColor(newColor);
    setParticleRadius(newRadius);
    console.log('Particle clicked! New color:', newColor, 'New radius:', newRadius);
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
      <sphereGeometry args={[particleRadius, 128, 128]} /> {/* Increased segments for smoothness */}
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
      <meshStandardMaterial color="#2a1b3d" roughness={0.8} metalness={0.2} /> {/* Soft gray for ground */}
    </mesh>
  );
};

// Background Scene Component
const BackgroundScene = () => {
  const gradientMaterial = new THREE.ShaderMaterial({
    uniforms: {
      topColor: { value: new THREE.Color("#1d3557") }, // Pink Lavender color at the top
      bottomColor: { value: new THREE.Color("#fbf8cc") }, // Lemon Chiffon color at the bottom
    },
    vertexShader: `
      varying vec3 vPosition;
      void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vPosition;
      uniform vec3 topColor;
      uniform vec3 bottomColor;
      void main() {
        gl_FragColor = vec4(mix(bottomColor, topColor, vPosition.y / 50.0), 1.0);
      }
    `,
    side: THREE.BackSide,
    depthWrite: false,
    transparent: true,
  });

  return (
    <group>
      <mesh position={[0, -50, -50]}>
        <sphereGeometry args={[100, 64, 64]} />
        <meshBasicMaterial attach="material" color="#8eecf5" />
        <primitive object={new THREE.Mesh(new THREE.SphereGeometry(100, 64, 64), gradientMaterial)} />
      </mesh>
    </group>
  );
};

// Particle System Component
const ParticleSystem = ({ addParticleAt, setAddParticleAt, initialParticles }) => {
  const [particles, setParticles] = useState(initialParticles);

  useEffect(() => {
    if (addParticleAt) {
      const colors = ['#00A7D0', '#F26B38', '#E6B800', '#2F3A58', '#4A5672'];
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
          '#00A7D0', // Bright Turquoise
          '#F26B38', // Soft Coral
          '#E6B800', // Golden Yellow
          '#2F3A58', // Slate Blue
          '#4A5672', // Lighter tint of primary
          '#F2D966', // Lighter tint of secondary
        ][Math.floor(Math.random() * 6)],
        
        radius: Math.random() * (1.5 - 0.5) + 0.5,
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
      style={{ height: '215vh', width: '100vw' }}
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
      <ambientLight intensity={.2} color="#404040" />
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
