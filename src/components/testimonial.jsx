import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei'; // Import useGLTF
import * as THREE from 'three';

// New 3D Model Component
const NewModel = () => {
  const { scene } = useGLTF('src/assets/3d model/New Folder (2)/scene.gltf');
  const modelRef = useRef();

  // Ensure model is oriented correctly by adjusting its rotation
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.rotation.x = 0; // Reset X-axis rotation
      modelRef.current.rotation.y = Math.PI / 2; // Adjust Y-axis rotation (to fix tilt)
      modelRef.current.rotation.z = 0; // Reset Z-axis rotation
    }
  }, [scene]);

  return <primitive ref={modelRef} object={scene} scale={[1.5, 1.5, 1.5]} />;
};

// Main Scene Component
const TestimonialScene = () => {
  const cameraRef = useRef();

  // Load the background texture
  const texture = new THREE.TextureLoader().load('src/assets/space-background-realistic-starry-night-cosmos-shining-stars-milky-way-stardust-color-galaxy.jpg');

  return (
    <Canvas style={{ height: '200vh', width: '100vw' }} shadows>
      {/* Set the background to the starry space image */}
      <ambientLight intensity={0.3} /> {/* Reduced ambient light for deeper shadows */}

      {/* Key Light (Stronger, Warm Color for a Cinematic Effect) */}
      <directionalLight
        position={[10, 15, 10]} // Move light above and towards the front
        intensity={2.5}          // Increased intensity for a stronger, more dramatic light
        color={new THREE.Color(1, 0.85, 0.6)} // Warm color, similar to sunset light
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.001}    // Adjust shadow bias to reduce flickering artifacts
      />

      {/* Fill Light (Lower Intensity, Cooler Color) */}
      <directionalLight
        position={[-10, -5, 10]} // From the opposite side
        intensity={0.5}           // Subtle, to fill in shadows from the key light
        color={new THREE.Color(0.4, 0.6, 1)} // Cooler tone (blueish)
        castShadow={false}
      />

      {/* Rim Light (Backlight to highlight the edges of the model) */}
      <spotLight
        position={[0, 10, -5]}   // From behind and slightly above
        intensity={1.5}           // Light intensity
        angle={Math.PI / 4}       // Narrow spotlight angle for more focused light
        penumbra={1}              // Soft transition between lit and shadow areas
        castShadow
        color={new THREE.Color(1, 1, 1)}  // White light
        target={cameraRef.current}        // Make sure it's aimed at the model
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Additional Point Light for dramatic highlights */}
      <pointLight
        position={[3, 5, 3]}      // Position it dynamically
        intensity={1.8}            // Increased intensity for more pronounced light
        color={new THREE.Color(1, 0.5, 0.3)} // A warm, reddish light
        castShadow
        distance={50}
        decay={2}
      />

      {/* Blue Light */}
      <pointLight
        position={[-5, 5, 0]} // Positioned to the left
        intensity={1.5}
        color={new THREE.Color(0.1, 0.3, 1)} // Cool blue light
        castShadow
        distance={40}
        decay={2}
      />

      {/* Purple Light */}
      <pointLight
        position={[5, 5, 0]}  // Positioned to the right
        intensity={1.5}
        color={new THREE.Color(0.5, 0, 1)} // Purple light
        castShadow
        distance={40}
        decay={2}
      />

      {/* Optional: Additional Ambient Light to avoid total darkness */}
      <ambientLight intensity={0.2} color={new THREE.Color(0.2, 0.2, 0.2)} />

      {/* Set the background using a large plane */}
      <mesh position={[0, 0, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      {/* 3D Model */}
      <NewModel />

      {/* Custom Camera */}
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        position={[0, 15, 5]} // Position the camera above the model
        fov={75}
        near={0.1}
        far={1000}
      />

      {/* Controls */}
      <OrbitControls
        enableZoom={false} // Disable zooming
        maxPolarAngle={Math.PI / 2}  // Restrict vertical rotation (up/down) to 90 degrees
        minPolarAngle={Math.PI / 2}  // Prevent rotating past the bottom (up to 45 degrees above horizontal)
        enableRotate={true}          // Allow rotation
        enablePan={false}            // Disable panning
        rotateSpeed={1}              // Adjust rotation speed for smoother control
        screenSpacePanning={false}   // Restrict panning to screen space
        maxAzimuthAngle={Math.PI}    // Restrict rotation on the horizontal axis (side-to-side) to 180 degrees
        minAzimuthAngle={-Math.PI}   // Prevent rotating more than 180 degrees horizontally
      />
    </Canvas>
  );
};

export default TestimonialScene;
