import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const getDeviceType = () => {
  const isMobile = window.innerWidth <= 768;
  const isLowEndDevice = window.navigator.connection ? window.navigator.connection.downlink < 2.5 : false;
  return { isMobile, isLowEndDevice };
};

const TestimonialScene = () => {
  const cameraRef = useRef();
  const [highResolution, setHighResolution] = useState(true);
  const { isMobile, isLowEndDevice } = getDeviceType();

  useEffect(() => {
    setHighResolution(!isLowEndDevice);
  }, [isLowEndDevice]);

  return (
    <Canvas
      style={{ height: isMobile ? '100vh' : '100%', width: '100vw' }}
      shadows
      pixelRatio={highResolution ? 2 : 1}
    >
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
        <OrbitControls enableZoom={false} enableRotate={true} enablePan={true} rotateSpeed={0.5} />
      </Suspense>
    </Canvas>
  );
};

export default TestimonialScene;
