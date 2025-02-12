import React, { useState, useEffect, useMemo, useRef, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics, useSphere, usePlane } from '@react-three/cannon';
import { OrbitControls, Environment, PerspectiveCamera, Html, useProgress } from '@react-three/drei';
import { EffectComposer, Bloom, SSAO, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';
import spaceBackground from '../assets/background.jpg';


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error('Error in 3D scene:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red', textAlign: 'center', paddingTop: '20px' }}>
          Oops! Something went wrong with the 3D scene. Please try again later.
        </div>
      );
    }
    return this.props.children;
  }
}

const Loader = () => {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)}% loaded</Html>;
};

const InteractiveParticle = React.memo(({ position, color, radius, quality }) => {
  const [particleColor, setParticleColor] = useState(color);
  const [particleRadius, setParticleRadius] = useState(radius);

  const [ref] = useSphere(() => ({
    mass: 0.5,
    position,
    args: [particleRadius],
    material: { friction: 0.5, restitution: 0.9 },
    linearDamping: 0.1,
    angularDamping: 0.1,
    ccdSpeedThreshold: 0.1,
    ccdIterations: 10,
    onCollide: (e) => {
      console.log('Collision detected on particle!', e.contact);
    }
  }), [particleRadius]);


  const handleClick = useCallback(() => {
    const colors = ['#00A7D0', '#F26B38', '#E6B800', '#2F3A58', '#4A5672', '#F2D966', '#0088A6', '#F79D7D', '#C59700', '#B8B8B8'];
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    const newRadius = Math.random() * 0.5 + 0.5;
    setParticleColor(newColor);
    setParticleRadius(newRadius);
    console.log('Particle clicked! New color:', newColor, 'New radius:', newRadius);
  }, []);


  const dragStart = useRef(null);
  const initialRadius = useRef(particleRadius);
  const dragging = useRef(false);

  const onPointerDown = useCallback((event) => {
    event.stopPropagation();
    dragStart.current = { x: event.clientX, y: event.clientY };
    initialRadius.current = particleRadius;
    dragging.current = false;
  }, [particleRadius]);

  const onPointerMove = useCallback((event) => {
    if (!dragStart.current) return;
    const dx = event.clientX - dragStart.current.x;
    if (Math.abs(dx) > 5) dragging.current = true;
    if (dragging.current) {
      let newRadius = initialRadius.current + dx * 0.01;
      newRadius = Math.max(0.1, Math.min(newRadius, 5));
      setParticleRadius(newRadius);
    }
  }, []);

  const onPointerUp = useCallback(() => {
    if (!dragging.current) handleClick();
    dragStart.current = null;
    dragging.current = false;
  }, [handleClick]);

  const generateNoiseTexture = useCallback(() => {
    const size = quality === 'low' ? 128 : 256;
    const data = new Uint8Array(size * size);
    for (let i = 0; i < size * size; i++) {
      data[i] = Math.floor(Math.random() * 255);
    }
    const texture = new THREE.DataTexture(data, size, size, THREE.LuminanceFormat);
    texture.needsUpdate = true;
    return texture;
  }, [quality]);

  const displacementTexture = useMemo(() => generateNoiseTexture(), [quality, generateNoiseTexture]);
  const roughnessTexture = useMemo(() => generateNoiseTexture(), [quality, generateNoiseTexture]);

  return (
    <mesh ref={ref} castShadow onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}>
      <sphereGeometry args={[particleRadius, quality === 'low' ? 32 : 128, quality === 'low' ? 16 : 128]} />
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
        <primitive attach="displacementMap" object={displacementTexture} />
        <primitive attach="roughnessMap" object={roughnessTexture} />
      </meshPhysicalMaterial>
    </mesh>
  );
});

const GroundPlane = React.memo(() => {
  const [ref] = usePlane(() => ({
    position: [0, -2.5, 0],
    rotation: [-Math.PI / 2, 0, 0],
    material: { friction: 0.3, restitution: 0.9 }
  }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial color="#2a1b3d" roughness={0.8} metalness={0.2} />
    </mesh>
  );
});

const BackgroundScene = React.memo(({ quality }) => {
  const segments = quality === 'low' ? 32 : 64;
  const gradientMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { topColor: { value: new THREE.Color('#1d3557') }, bottomColor: { value: new THREE.Color('#fbf8cc') } },
    vertexShader: `
      varying vec3 vPosition; 
      void main(){ 
        vPosition = position; 
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); 
      }
    `,
    fragmentShader: `
      varying vec3 vPosition; 
      uniform vec3 topColor; 
      uniform vec3 bottomColor; 
      void main(){ 
        float mixValue = (vPosition.y+50.0)/100.0; 
        gl_FragColor = vec4(mix(bottomColor, topColor, mixValue),1.0); 
      }
    `,
    side: THREE.BackSide,
    depthWrite: false,
    transparent: true
  }), []);
  return (
    <group>
      <mesh position={[0, -50, -50]}>
        <sphereGeometry args={[100, segments, segments]} />
        <meshBasicMaterial color="#8eecf5" />
        <primitive object={new THREE.Mesh(new THREE.SphereGeometry(100, segments, segments), gradientMaterial)} />
      </mesh>
    </group>
  );
});

const ParticleSystem = React.memo(({ particles, quality }) => {
  return (
    <>
      {particles.map((particle, index) => (
        <InteractiveParticle key={index} position={particle.position} color={particle.color} radius={particle.radius} quality={quality} />
      ))}
    </>
  );
});

const ParticleScene = () => {
  const [quality, setQuality] = useState('high');
  const cameraRef = useRef();

  const initialParticleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 5 : 19;
  const [particles, setParticles] = useState(() => {
    const arr = [];
    for (let i = 0; i < initialParticleCount; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 20,
          Math.random() * 5 + 2,
          (Math.random() - 0.5) * 20
        ],
        color: ['#00A7D0', '#F26B38', '#E6B800', '#2F3A58', '#4A5672', '#F2D966'][Math.floor(Math.random() * 6)],
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
    if (window.navigator.connection && typeof window.navigator.connection.addEventListener === 'function') {
      window.navigator.connection.addEventListener('change', checkPerformance);
    }
    return () => {
      if (window.navigator.connection && typeof window.navigator.connection.removeEventListener === 'function') {
        window.navigator.connection.removeEventListener('change', checkPerformance);
      }
    };
  }, [checkPerformance]);

  const isMobile = quality === 'low';

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
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -1);
    const intersectPoint = new THREE.Vector3();
    if (raycaster.ray.intersectPlane(plane, intersectPoint)) {
      const randomOffset = (Math.random() * 2 - 1) * 1.0;
      const offsetVector = raycaster.ray.direction.clone().multiplyScalar(randomOffset);
      intersectPoint.add(offsetVector);
      const colors = ['#00A7D0', '#F26B38', '#E6B800', '#2F3A58', '#4A5672'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomRadius = Math.random() * 0.3 + 0.3;
      let newPosition = intersectPoint.clone();
      const groundY = -2.5;
      const margin = 0.05;
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
      setParticles((prevParticles) => [
        ...prevParticles,
        { position: newPosition.toArray(), color: randomColor, radius: randomRadius }
      ]);
    }
  };

  return (
    <Canvas
      style={{ height: isMobile ? '100vh' : '215vh', width: '100vw', touchAction: 'pan-y' }}
      shadows
      onClick={handleCanvasClick}
      dpr={quality === 'low' ? [1, 1] : [1, 2]}
    >
      <Suspense fallback={<Loader />}>
        <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 5, 15]} fov={50} near={0.1} far={1000} />
        <BackgroundScene quality={quality} />

        {quality === 'high' ? (
          <Environment files={spaceBackground} background />
        ) : (
          <color attach="background" args={['#000']} />
        )}
        <ambientLight intensity={0.2} color="#404040" />
        <directionalLight position={[15, 20, 10]} intensity={1.2} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
        <spotLight position={[-15, 25, -10]} angle={Math.PI / 6} penumbra={0.5} intensity={1.5} castShadow />
        <pointLight position={[5, 10, 5]} intensity={0.8} />
        <hemisphereLight skyColor="#bb99ff" groundColor="#664422" intensity={0.4} />
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
        <OrbitControls
          enableZoom={false}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <EffectComposer>
          <Bloom intensity={quality === 'low' ? 0.5 : 1.0} radius={quality === 'low' ? 0.1 : 0.2} />
          <SSAO radius={quality === 'low' ? 0.1 : 0.2} intensity={quality === 'low' ? 6 : 12} />
          <DepthOfField focusDistance={0.02} focalLength={0.1} bokehScale={quality === 'low' ? 1.5 : 2.5} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
};

const App = () => (
  <ErrorBoundary>
    <ParticleScene />
  </ErrorBoundary>
);

export default App;
