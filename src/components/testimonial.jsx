import React, { Suspense, useRef, useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: '#fff', fontSize: '1.2rem' }}>{progress.toFixed(0)}% loaded</div>
    </Html>
  );
};

const useDeviceType = () => {
  const [device, setDevice] = useState({
    isMobile: window.innerWidth <= 768,
    isLowEndDevice: window.navigator.connection ? window.navigator.connection.downlink < 2.5 : false,
  });
  useEffect(() => {
    let timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setDevice({
          isMobile: window.innerWidth <= 768,
          isLowEndDevice: window.navigator.connection ? window.navigator.connection.downlink < 2.5 : false,
        });
      }, 200);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return device;
};

const TestimonialScene = () => {
  const cameraRef = useRef();
  const { isMobile, isLowEndDevice } = useDeviceType();
  const [highResolution, setHighResolution] = useState(true);
  const [enableShadows, setEnableShadows] = useState(true);
  useEffect(() => {
    setHighResolution(!isLowEndDevice);
    setEnableShadows(!isLowEndDevice);
  }, [isLowEndDevice]);
  return (
    <Canvas
      style={{ height: isMobile ? '100vh' : '100%', width: '100vw' }}
      shadows={enableShadows}
      pixelRatio={highResolution ? 2 : 1}
      frameloop="demand"
    >
      <Suspense fallback={<Loader />}>
        <ambientLight intensity={0.15} />
        {enableShadows ? (
          <>
            <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
            <spotLight
              position={[0, 8, -5]}
              intensity={0.8}
              angle={Math.PI / 6}
              penumbra={0.5}
              castShadow
            />
            <pointLight position={[3, 5, 3]} intensity={1} color="orange" castShadow />
          </>
        ) : (
          <>
            <directionalLight position={[5, 10, 5]} intensity={1.0} />
            <spotLight
              position={[0, 8, -5]}
              intensity={0.6}
              angle={Math.PI / 6}
              penumbra={0.5}
            />
            <pointLight position={[3, 5, 3]} intensity={0.8} color="orange" />
          </>
        )}
        <mesh position={[0, -1, -10]} receiveShadow={enableShadows}>
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
