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

/* -------------------------------
  InteractiveParticle 
---------------------------------*/
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
    const colors = [
      '#1a1f33', '#3b4a72', '#6a4c93', '#a1b8d1', '#e3e1e1',
      '#f78c6c', '#ec4d6f', '#c17bdb', '#50516b', '#ffb3e1'
    ];
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    // Defensive: ensure material exists
    if (ref.current && ref.current.material) {
      try { ref.current.material.color.set(newColor); } catch (e) {}
    }
  }, [ref]);

  const onPointerDown = useCallback((event) => {
    event.stopPropagation();
    handleClick();
  }, [handleClick]);

  return (
    <mesh ref={ref} castShadow receiveShadow onPointerDown={onPointerDown}>
      <sphereGeometry args={[radius, quality === 'low' ? 32 : 48 , quality === 'low' ? 16 : 48]} />
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

/* -------------------------------
  GroundPlane 
---------------------------------*/
const GroundPlane = React.memo(() => {
  const [ref] = usePlane(() => ({
    position: [0, -3.5, 0],
    rotation: [-Math.PI / 2, 0, 0],
    material: { friction: 0.3, restitution: 0.9 }
  }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial color="#2C3E50" roughness={0.8} metalness={0.2} />
    </mesh>
  );
});

/* -------------------------------
  BackgroundScene 
---------------------------------*/
const BackgroundScene = React.memo(({ quality }) => {
  const segments = quality === 'low' ? 32 : 64;
  const gradientMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      topColor: { value: new THREE.Color('#0E1C29') },
      bottomColor: { value: new THREE.Color('#2C3A47') }
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

/* -------------------------------
  ParticleSystem 
---------------------------------*/
const ParticleSystem = React.memo(({ particles, quality }) => (
  <>
    {particles.map((particle) => (
      <InteractiveParticle
        key={particle.id}
        position={particle.position}
        color={particle.color}
        radius={particle.radius}
        quality={quality}
      />
    ))}
  </>
));

/* -------------------------------
  ParticleScene with spatial hash
  - Uses a grid keyed by integer cells (x,z)
  - Each spawn checks only the 9 neighboring cells → constant work
---------------------------------*/
const ParticleScene = () => {
  const [quality, setQuality] = useState('high');
  const cameraRef = useRef();

  const initialParticleCount = useMemo(() => {
    return typeof window !== 'undefined' && window.innerWidth < 768 ? 5 : 19;
  }, []);

  // particles state (immutable array for R3F rendering)
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

  // Refs for faster reads & spatial grid
  const particlesRef = useRef(particles);
  const gridRef = useRef(new Map()); // Map<string, Set<id>>
  const cellSizeRef = useRef(2.5); // base cell size (should be >= max expected radius * 2)

  // populate the grid on initial mount
  useEffect(() => {
    const grid = new Map();
    const cellSize = cellSizeRef.current;
    const cellKey = (x, z) => `${x},${z}`;
    particles.forEach(p => {
      const [px, , pz] = p.position;
      const cx = Math.floor(px / cellSize);
      const cz = Math.floor(pz / cellSize);
      const key = cellKey(cx, cz);
      if (!grid.has(key)) grid.set(key, new Set());
      grid.get(key).add(p.id);
    });
    gridRef.current = grid;
    particlesRef.current = particles;
  }, []); // only on mount

  // keep particlesRef synced when state changes
  useEffect(() => {
    particlesRef.current = particles;
  }, [particles]);

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

  /* -------------------------------
    Spatial grid helpers (O(1) neighborhood lookup)
  ---------------------------------*/
  const cellKey = (cx, cz) => `${cx},${cz}`;

  const worldToCell = (vec3) => {
    const cs = cellSizeRef.current;
    return [Math.floor(vec3.x / cs), Math.floor(vec3.z / cs)];
  };

  const addToGrid = (id, position) => {
    const grid = gridRef.current;
    const [cx, cz] = worldToCell(new THREE.Vector3(...position));
    const key = cellKey(cx, cz);
    if (!grid.has(key)) grid.set(key, new Set());
    grid.get(key).add(id);
  };

  // get candidate particles near a world position (neighbors from 3x3 cells)
  const getNearbyParticleIds = (position) => {
    const [cx, cz] = worldToCell(new THREE.Vector3(...position));
    const grid = gridRef.current;
    const ids = new Set();
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        const key = cellKey(cx + dx, cz + dz);
        const set = grid.get(key);
        if (set) {
          for (const id of set) ids.add(id);
        }
      }
    }
    return ids;
  };

  /* -------------------------------
    Spawn logic: uses only neighbor candidates
    -> practically O(1) because neighbors are limited
  ---------------------------------*/
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

      const colors = [
        '#1a1f33', '#3b4a72', '#6a4c93', '#a1b8d1', '#e3e1e1',
        '#f78c6c', '#ec4d6f', '#c17bdb', '#50516b', '#ffb3e1'
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomRadius = Math.random() * 1.5 + 0.5;
      let newPosition = intersectPoint.clone();
      if (newPosition.y - randomRadius < groundY + margin) {
        newPosition.y = groundY + randomRadius + margin;
      }

      // Check only nearby particles using spatial hash (3x3 camera-proximate cells)
      const maxAttempts = 10;
      let attempt = 0;
      let collision = true;
      // Convert current particles list into a Map for quick lookup by id (O(1))
      const lookupById = new Map();
      for (const p of particlesRef.current) lookupById.set(p.id, p);

      while (collision && attempt < maxAttempts) {
        collision = false;
        const nearbyIds = getNearbyParticleIds(newPosition.toArray());
        for (const id of nearbyIds) {
          const p = lookupById.get(id);
          if (!p) continue;
          const existingPos = new THREE.Vector3(...p.position);
          if (newPosition.distanceTo(existingPos) < (randomRadius + p.radius + margin)) {
            collision = true;
            break;
          }
        }

        if (collision) {
          // Move the spawn point slightly along the ray to try again (small steps keep neighborhood checks cheap)
          newPosition.add(raycaster.ray.direction.clone().multiplyScalar(0.2));
          if (newPosition.y - randomRadius < groundY + margin) {
            newPosition.y = groundY + randomRadius + margin;
          }
        }
        attempt++;
      }

      // Commit the new particle (update state and grid)
      const newParticle = {
        id: crypto.randomUUID(),
        position: newPosition.toArray(),
        color: randomColor,
        radius: randomRadius
      };

      // Update grid immediately (so subsequent spawns see it)
      addToGrid(newParticle.id, newParticle.position);

      // Update state immutably
      setParticles(prev => {
        const next = [...prev, newParticle];
        // keep particlesRef in sync immediately
        particlesRef.current = next;
        return next;
      });
    }
  };

  return (
    <Canvas
      style={{ height: '100vh', width: '100vw', touchAction: 'pan-y' }}
      shadows={{
        enabled: true,
        type: THREE.PCFSoftShadowMap,
        autoUpdate: true
      }}
      onClick={handleCanvasClick}
      dpr={quality === 'low' ? [1, 1] : [1, 2]}
    >
      <Suspense fallback={<Loader />}>
        <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 5, 15]} fov={50} near={0.1} far={1000} />
        <BackgroundScene quality={quality} />
        <Environment files={spaceBackground} background />
        {/* Lighting*/}        
        <ambientLight intensity={0.3} color="#404040" />
        <directionalLight 
          position={[25, 30, 15]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize-width={quality === 'low' ? 2048 : 4096} 
          shadow-mapSize-height={quality === 'low' ? 2048 : 4096}
          shadow-camera-left={-50}
          shadow-camera-right={50}
          shadow-camera-top={50}
          shadow-camera-bottom={-50}
          shadow-camera-near={0.1}
          shadow-camera-far={100}
          shadow-bias={-0.0001}
          shadow-radius={quality === 'low' ? 4 : 8}
        />
        <directionalLight 
          position={[-20, 25, -15]} 
          intensity={0.8} 
          castShadow 
          shadow-mapSize-width={quality === 'low' ? 1024 : 2048} 
          shadow-mapSize-height={quality === 'low' ? 1024 : 2048}
          shadow-camera-left={-40}
          shadow-camera-right={40}
          shadow-camera-top={40}
          shadow-camera-bottom={-40}
          shadow-camera-near={0.1}
          shadow-camera-far={80}
          shadow-bias={-0.0001}
          shadow-radius={quality === 'low' ? 3 : 6}
        />
        <spotLight 
          position={[0, 35, 0]} 
          angle={Math.PI / 3} 
          penumbra={0.3} 
          intensity={1.0} 
          castShadow
          shadow-mapSize-width={quality === 'low' ? 1024 : 2048}
          shadow-mapSize-height={quality === 'low' ? 1024 : 2048}
          shadow-camera-fov={60}
          shadow-camera-near={1}
          shadow-camera-far={80}
          shadow-bias={-0.0001}
          shadow-radius={quality === 'low' ? 3 : 6}
        />
        <pointLight position={[10, 8, 10]} intensity={0.6} />
        <pointLight position={[-10, 8, -10]} intensity={0.6} />
        <hemisphereLight 
          skyColor="#87CEEB" 
          groundColor="#2C3E50" 
          intensity={0.4} 
        />
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
