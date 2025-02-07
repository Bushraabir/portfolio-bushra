import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics, useSphere, usePlane } from '@react-three/cannon';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { Bloom, EffectComposer, SSAO, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import spaceBackground from '../assets/background.jpg';

const InteractiveParticle = ({ position, color, radius, isLowQuality }) => {
  const [particleColor, setParticleColor] = useState(color);
  const [particleRadius, setParticleRadius] = useState(radius);
  const [ref] = useSphere(() => ({
    mass: 0.5,
    position,
    args: [particleRadius],
    material: { friction: 0.1, restitution: 0.9 },
    linearDamping: 0.02,
    angularDamping: 0.02,
  }));

  const handleClick = () => {
    const colors = [
      '#00A7D0',
      '#F26B38',
      '#E6B800',
      '#2F3A58',
      '#4A5672',
      '#F2D966',
      '#0088A6',
      '#F79D7D',
      '#C59700',
      '#B8B8B8',
    ];
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    const newRadius = Math.random() * 0.5 + 0.5;
    setParticleColor(newColor);
    setParticleRadius(newRadius);
    console.log('Particle clicked! New color:', newColor, 'New radius:', newRadius);
  };

  const generateNoiseTexture = () => {
    const size = 256;
    const data = new Uint8Array(size * size);
    for (let i = 0; i < size * size; i++) {
      data[i] = Math.random() * 255;
    }
    const texture = new THREE.DataTexture(data, size, size, THREE.LuminanceFormat);
    texture.needsUpdate = true;
    return texture;
  };

  return (
    <mesh ref={ref} castShadow onClick={handleClick}>
      <sphereGeometry args={[particleRadius, isLowQuality ? 32 : 128, isLowQuality ? 16 : 128]} />
      <meshPhysicalMaterial
        color={particleColor}
        metalness={0.9}
        roughness={0.05}
        clearcoat={1}
        clearcoatRoughness={0.15}
        reflectivity={0.95}
        envMapIntensity={0.5}
        transmission={0.8}
        ior={1.45}
        thickness={1.2}
        sheen={1}
        sheenColor={new THREE.Color(0xffffff)}
      >
        {!isLowQuality && (
          <>
            <primitive attach="displacementMap" object={generateNoiseTexture()} />
            <primitive attach="roughnessMap" object={generateNoiseTexture()} />
          </>
        )}
      </meshPhysicalMaterial>
    </mesh>
  );
};

const GroundPlane = () => {
  const [ref] = usePlane(() => ({
    position: [0, -2.5, 0],
    rotation: [-Math.PI / 2, 0, 0],
    material: { friction: 0.2, restitution: 0.9 },
  }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial color="#2a1b3d" roughness={0.8} metalness={0.2} />
    </mesh>
  );
};

const BackgroundScene = () => {
  const gradientMaterial = new THREE.ShaderMaterial({
    uniforms: {
      topColor: { value: new THREE.Color("#1d3557") },
      bottomColor: { value: new THREE.Color("#fbf8cc") },
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

const ParticleSystem = ({ addParticleAt, setAddParticleAt, initialParticles, isLowQuality }) => {
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
      isLowQuality={isLowQuality}
    />
  ));
};

const ParticleScene = () => {
  const [addParticleAt, setAddParticleAt] = useState(null);
  const cameraRef = useRef();
  const [isLowQuality, setIsLowQuality] = useState(false);

  useEffect(() => {
    if (window.navigator.connection && window.navigator.connection.downlink < 2.5) {
      setIsLowQuality(true);
    }
  }, []);

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
          '#00A7D0',
          '#F26B38',
          '#E6B800',
          '#2F3A58',
          '#4A5672',
          '#F2D966',
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
      dpr={isLowQuality ? [1, 1] : [1, 2]}
    >
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        position={[0, 5, 15]}
        fov={50}
        near={0.1}
        far={1000}
      />
      {!isLowQuality && <BackgroundScene />}
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
      {!isLowQuality && <Environment files={spaceBackground} background />}
      <Physics gravity={[0, -9.8, 0]}>
        <GroundPlane />
        <ParticleSystem
          addParticleAt={addParticleAt}
          setAddParticleAt={setAddParticleAt}
          initialParticles={initialParticles}
          isLowQuality={isLowQuality}
        />
      </Physics>
      <OrbitControls enableZoom={false} enableRotate maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
      {!isLowQuality && (
        <EffectComposer>
          <Bloom intensity={1.0} radius={0.2} />
          <SSAO radius={0.2} intensity={12} />
          <DepthOfField focusDistance={0.02} focalLength={0.1} bokehScale={2.5} />
        </EffectComposer>
      )}
    </Canvas>
  );
};

export default ParticleScene;
