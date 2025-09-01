import React, { useCallback, useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";  // Import useFrame for rotation
import spaceBackground from '../assets/background.jpg';

const Crystal = ({ position, radius }) => {
  const ref = useRef();

  // Load the texture for the crystal surface
  const texture = new THREE.TextureLoader().load(spaceBackground);

  // Handle click to change the crystal's color
  const handleClick = useCallback(() => {
    const colors = [
      '#1a1f33', // Deep Space Blue
      '#3b4a72', // Midnight Blue
      '#6a4c93', // Nebula Purple
      '#a1b8d1', // Soft Moonlight Blue
      '#e3e1e1', // Star Dust White
      '#f78c6c', // Solar Flare Orange
      '#ec4d6f', // Galactic Pink
      '#c17bdb', // Lavender Dream
      '#50516b', // Twilight Blue
      '#ffb3e1'  // Cosmic Pink Glow
    ];

    const newColor = colors[Math.floor(Math.random() * colors.length)];
    ref.current.material.color.set(newColor);
  }, []);

  // Crystal rotation using useFrame to rotate the mesh only around its center
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01; // Continuous rotation on Y axis
    }
  });

  return (
    <mesh
      position={position}
      onPointerDown={handleClick}
      ref={ref}
      castShadow
      receiveShadow
    >
      {/* Octahedron Geometry for a crystal shape */}
      <octahedronGeometry args={[radius, 0]} />
      <meshPhysicalMaterial
        map={texture} // Use the texture for the surface
        metalness={0.2} // Reflective material for the crystal look
        roughness={0.05} // Smooth surface
        clearcoat={1} // High gloss
        clearcoatRoughness={0.1} // Smooth finish
        transmission={1} // Transparency for a glass-like effect
        ior={1.45} // Index of refraction, for more realistic glass
        thickness={2.2} // Thickness for more depth
        reflectivity={0.05} // Highly reflective
        envMapIntensity={0.5} // Environment map intensity
      
        transparent={false}
        clearcoatRoughness={0.15}
      />
    </mesh>
  );
};

const CrystalScene = () => {
  return (
    <>
      {/* Lighting */}
      {/* Ambient Light for subtle lighting across the scene */}
      <ambientLight intensity={0.5} color="#FFFFFF" />

      {/* Directional Light to simulate sunlight */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={33.0}
        color="#FFFFFF"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-near={1}
        shadow-camera-far={50}
      />

      {/* Additional Directional Light from the opposite side */}
      <directionalLight
        position={[-5, 5, -5]}
        intensity={62.5}
        color="#FFFFFF"  // Yellowish light for contrast
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Point Light for focused light */}
      <pointLight
        position={[0, 3, 0]}
        intensity={33.0}
        color="#FF00FF"
        distance={20}
        decay={2}
        castShadow
      />

      {/* Spotlight for dynamic lighting */}
      <spotLight
        position={[-5, 10, -5]}
        angle={Math.PI / 6}
        penumbra={1}
        intensity={34.0}
        color="#FFFFFF"
        castShadow
      />

      {/* Another spotlight for more intense dynamic lighting */}
      <spotLight
        position={[5, 10, 5]}
        angle={Math.PI / 6}
        penumbra={1}
        intensity={33.5}
        color="#FF4500"  // Adding a warm orange color for contrast
        castShadow
      />

      {/* The Crystal Component */}
      <Crystal position={[0, 0, 0]} radius={0.5} />
    </>
  );
};

export default CrystalScene;
