import React, { useState, useEffect, useMemo, useRef, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics, useSphere, usePlane } from '@react-three/cannon';
import { OrbitControls, Environment, PerspectiveCamera, Html, useProgress } from '@react-three/drei';
import { EffectComposer, Bloom, SSAO, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';
import spaceBackground from '../assets/background.jpg';

const Loader = () => {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)}% loaded</Html>;
};

const InteractiveParticle = React.memo(({ position, color, radius, quality }) => {
  const [ref] = useSphere(() => ({
    mass: 0.5,
    position,
    args: [radius],
    material: { friction: 0.5, restitution: 0.9 },
    linearDamping: 0.1,
    angularDamping: 0.1,
    ccdSpeedThreshold: 0.1,
    ccdIterations: 10
  }), [radius]);

  const handleClick = useCallback(() => {
    const colors = ['#E1C16C', '#88A6B7', '#B8B5B4', '#4A6B64', '#C6A78C', '#C2B9B0'];
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    ref.current.material.color.set(newColor);
  }, [ref]);

  const onPointerDown = useCallback((event) => {
    event.stopPropagation();
    handleClick();
  }, [handleClick]);

  return (
    <mesh ref={ref} castShadow onPointerDown={onPointerDown}>
      <sphereGeometry args={[radius, quality === 'low' ? 32 : 128, quality === 'low' ? 16 : 128]} />
      <meshPhysicalMaterial
        color={color}
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
      />
    </mesh>
  );
});

const GroundPlane = React.memo(() => {
  const [ref] = usePlane(() => ({
    position: [0, -3.5, 0],
    rotation: [-Math.PI / 2, 0, 0],
    material: { friction: 0.3, restitution: 0.9 }
  }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[200, 200]} />
      {/* Updated premium ground color → dark slate with subtle cool hues */}
      <meshStandardMaterial color="#2C3E50" roughness={0.8} metalness={0.2} />
    </mesh>
  );
});

const BackgroundScene = React.memo(({ quality }) => {
  const segments = quality === 'low' ? 32 : 64;
  const gradientMaterial = useMemo(() => new THREE.ShaderMaterial({
    // Premium sky gradient: Dark night sky to a deep cosmic purple
    uniforms: { 
      topColor: { value: new THREE.Color('#0E1C29') },    // dark cosmic blue
      bottomColor: { value: new THREE.Color('#2C3A47') }  // rich deep purple
    },
    vertexShader: `
      varying vec3 vPosition; 
      void main(){
        vPosition = position; 
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); 
      }`,
    fragmentShader: `
      varying vec3 vPosition; 
      uniform vec3 topColor; 
      uniform vec3 bottomColor; 
      void main(){ 
        float mixValue = (vPosition.y+50.0)/100.0; 
        gl_FragColor = vec4(mix(bottomColor, topColor, mixValue),1.0); 
      }`,
    side: THREE.BackSide,
    depthWrite: false,
    transparent: true
  }), []);

  return (
    <group>
      <mesh>
        <sphereGeometry args={[100, segments, segments]} />
        <primitive object={gradientMaterial} attach="material" />
      </mesh>
    </group>
  );
});

const ParticleSystem = React.memo(({ particles, quality }) => (
  <>
    {particles.map((particle) => (
      <InteractiveParticle key={particle.id} position={particle.position} color={particle.color} radius={particle.radius} quality={quality} />
    ))}
  </>
));

const ParticleScene = () => {
  const [quality, setQuality] = useState('high');
  const cameraRef = useRef();
  const initialParticleCount = useMemo(() => {
    return typeof window !== 'undefined' && window.innerWidth < 768 ? 5 : 19;
  }, []);
  const [particles, setParticles] = useState(() => {
    const arr = [];
    for (let i = 0; i < initialParticleCount; i++) {
      arr.push({
        id: crypto.randomUUID(),
        position: [(Math.random() - 0.5) * 20, Math.random() * 5 + 2, (Math.random() - 0.5) * 20],
        color: ['#E1C16C', '#88A6B7', '#B8B5B4', '#4A6B64', '#C6A78C', '#C2B9B0'][Math.floor(Math.random() * 6)],
        radius: Math.random() * (1.7 - 0.5) + 0.5
      });
    }
    return arr;
  });

  const checkPerformance = useCallback(() => {
    let perf = 'high';
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) {
        perf = 'low';
      } else if (window.navigator.connection) {
        const { downlink, effectiveType } = window.navigator.connection;
        if (downlink < 2.5 || (effectiveType && effectiveType.includes('2g'))) perf = 'low';
      }
      if (window.navigator.deviceMemory && window.navigator.deviceMemory < 4) perf = 'low';
    }
    setQuality(perf);
  }, []);

  useEffect(() => {
    checkPerformance();
    if (typeof window !== 'undefined' && window.navigator.connection && typeof window.navigator.connection.addEventListener === 'function') {
      window.navigator.connection.addEventListener('change', checkPerformance);
    }
    return () => {
      if (typeof window !== 'undefined' && window.navigator.connection && typeof window.navigator.connection.removeEventListener === 'function') {
        window.navigator.connection.removeEventListener('change', checkPerformance);
      }
    };
  }, [checkPerformance]);

  const handleCanvasClick = (event) => {
    event.stopPropagation();
    const mouse = new THREE.Vector2();
    const rect = event.target.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    const raycaster = new THREE.Raycaster();
    const camera = cameraRef.current;
    if (!camera) return;
    raycaster.setFromCamera(mouse, camera);
    const groundY = -2.5;
    const margin = 0.05;
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), groundY);
    const intersectPoint = new THREE.Vector3();
    if (raycaster.ray.intersectPlane(plane, intersectPoint)) {
      const randomOffset = (Math.random() * 2 - 1) * 1.0;
      const offsetVector = raycaster.ray.direction.clone().multiplyScalar(randomOffset);
      intersectPoint.add(offsetVector);
      const colors = ['#E1C16C', '#88A6B7', '#B8B5B4', '#4A6B64', '#C6A78C'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomRadius = Math.random() * 1.5 + 0.5;
      let newPosition = intersectPoint.clone();
      if (newPosition.y - randomRadius < groundY + margin) {
        newPosition.y = groundY + randomRadius + margin;
      }
      const maxAttempts = 10;
      let attempt = 0;
      let collision = true;
      while (collision && attempt < maxAttempts) {
        collision = false;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const existingPos = new THREE.Vector3(...p.position);
          if (newPosition.distanceTo(existingPos) < randomRadius + p.radius + margin) {
            collision = true;
            break;
          }
        }
        if (collision) {
          newPosition.add(raycaster.ray.direction.clone().multiplyScalar(0.2));
          if (newPosition.y - randomRadius < groundY + margin) {
            newPosition.y = groundY + randomRadius + margin;
          }
        }
        attempt++;
      }
      setParticles((prev) => [...prev, { id: crypto.randomUUID(), position: newPosition.toArray(), color: randomColor, radius: randomRadius }]);
    }
  };

  return (
    <Canvas
      style={{ height:  '100vh' , width: '100vw', touchAction: 'pan-y' }}
      shadows
      onClick={handleCanvasClick}
      dpr={quality === 'low' ? [1, 1] : [1, 2]}
    >
      <Suspense fallback={<Loader />}>
        <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 5, 15]} fov={50} near={0.1} far={1000} />
        <BackgroundScene quality={quality} />
        <Environment files={spaceBackground} background />
        <ambientLight intensity={0.2} color="#404040" />
        <directionalLight position={[15, 20, 10]} intensity={1.2} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
        <spotLight position={[-15, 25, -10]} angle={Math.PI / 6} penumbra={0.5} intensity={1.5} castShadow />
        <pointLight position={[5, 10, 5]} intensity={0.8} />
        <hemisphereLight intensity={0.2} />
        <Physics
          gravity={[0, -9.8, 0]}
          iterations={quality === 'low' ? 10 : 20}
          allowSleep
          defaultContactMaterial={{
            friction: 0.5,
            restitution: 0.6,
            contactEquationStiffness: 1e7,
            contactEquationRelaxation: 4
          }}
        >
          <GroundPlane />
          <ParticleSystem particles={particles} quality={quality} />
        </Physics>
        <OrbitControls enableZoom={false} enableRotate={true} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
        <EffectComposer>
          <Bloom intensity={quality === 'low' ? 0.5 : 1.0} radius={quality === 'low' ? 0.1 : 0.2} />
          <SSAO radius={quality === 'low' ? 0.1 : 0.2} intensity={quality === 'low' ? 6 : 12} />
          <DepthOfField focusDistance={0.02} focalLength={0.1} bokehScale={quality === 'low' ? 1.5 : 2.5} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
};

export default ParticleScene;
