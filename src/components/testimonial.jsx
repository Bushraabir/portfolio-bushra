import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const TestimonialScene = () => {
  const cameraRef = useRef();

  return (
    <Canvas style={{ height: '100vh', width: '100vw' }} shadows>
      <Suspense fallback={null}>
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
        <spotLight position={[0, 8, -5]} intensity={0.8} angle={Math.PI / 6} penumbra={0.5} castShadow />
        <pointLight position={[3, 5, 3]} intensity={1} color="orange" castShadow />
        <mesh position={[0, 0, -10]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#1e1e1e" />
        </mesh>
        <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 5, 10]} fov={70} />
        <OrbitControls enableZoom enableRotate enablePan rotateSpeed={0.5} />
      </Suspense>
    </Canvas>
  );
};

export default TestimonialScene;
