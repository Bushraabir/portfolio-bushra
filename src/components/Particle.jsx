import React, { useState, useEffect, useMemo, useRef, useCallback, Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Physics, useSphere, usePlane } from '@react-three/cannon';
import { OrbitControls, Environment, PerspectiveCamera, Html } from '@react-three/drei';
import { EffectComposer, Bloom, SSAO, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';
import spaceBackground from '../assets/background.jpg';
import universe from "../assets/universe.jpg";
import universe1 from "../assets/universe1.jpg";
import universe2 from "../assets/universe2.jpg";
import Loader1 from './Loader1';



const InteractiveParticle = React.memo(({ position, color, radius, quality, textureMap }) => {
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

  const materialProps = useMemo(() => ({
    color: new THREE.Color(color).multiplyScalar(1.5),
    metalness: 0.1,
    roughness: 0.9,
    clearcoat: 9,
    clearcoatRoughness: 0.05,
    reflectivity: 1.0,
    envMapIntensity: 1.2,
    emissiveIntensity: 2.4,
    transmission: 0.7, 
    ior: 1.45,
    thickness: 0.8,
    sheen: 1.5,
    sheenColor: new THREE.Color(color).multiplyScalar(0.5),
    emissive: new THREE.Color(color).multiplyScalar(0.15),
    emissiveIntensity: 0.4,
    map: textureMap,
    envMap: textureMap
  }), [color, textureMap]);

  const geometryArgs = useMemo(() => {
    const detail = quality === 'low' ? [32, 16] : [128, 128];
    return [radius, ...detail];
  }, [radius, quality]);

  const colorArray = useMemo(() => [
      '#2E1A47', // Deep cosmic purple
      '#3B3B98', // Nebula blue
      '#5F27CD', // Vivid violet
      '#1B1464', // Space navy blue
      '#0A3D62', // Deep teal accent
      '#6C5CE7', // Bright galaxy purple
      '#341F97', // Dark royal purple
        '#2E1A47', // Deep cosmic purple
  '#3B3B98', // Nebula blue
  '#5F27CD', // Vivid violet
  '#1B1464', // Space navy blue
  '#0A3D62', // Deep teal accent
  '#6C5CE7', // Bright galaxy purple
  '#341F97'  // Dark royal purple
  ], []);

  const handleClick = useCallback(() => {
    if (!ref.current) return;
    const newColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    const brightColor = new THREE.Color(newColor).multiplyScalar(1.5);
    ref.current.material.color.copy(brightColor);
    ref.current.material.emissive.copy(new THREE.Color(newColor).multiplyScalar(0.15));
    ref.current.material.sheenColor.copy(new THREE.Color(newColor).multiplyScalar(0.5));
  }, [ref, colorArray]);

  const onPointerDown = useCallback((event) => {
    event.stopPropagation();
    handleClick();
  }, [handleClick]);

  return (
    <mesh ref={ref} castShadow onPointerDown={onPointerDown}>
      <sphereGeometry args={geometryArgs} />
      <meshPhysicalMaterial {...materialProps} />
    </mesh>
  );
});

const GroundPlane = React.memo(() => {
  const [ref] = usePlane(() => ({
    position: [0, -5, 0],
    rotation: [-Math.PI / 2, 0, 0],
    material: { friction: 0.3, restitution: 0.9 }
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial 
        color="#1a1a2e" 
        roughness={0.1} 
        metalness={0.9}
        transparent={true}
        opacity={0}
        visible={false}
      />
    </mesh>
  );
});

const BackgroundScene = React.memo(({ quality, textureMap }) => {
  const segments = useMemo(() => quality === 'low' ? 32 : 64, [quality]);
  
const gradientMaterial = useMemo(() => {
  const material = new THREE.ShaderMaterial({
    uniforms: { 
      topColor: { value: new THREE.Color('#cfbaf0') }, 
      bottomColor: { value: new THREE.Color('#1d3557') },
      envMap: { value: textureMap },
      envMix: { value: 0.8 } // Control environment reflection intensity
    },
    vertexShader: `
      varying vec3 vPosition; 
      varying vec3 vNormal;
      void main(){ 
        vPosition = position; 
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); 
      }`,
    fragmentShader: `
      varying vec3 vPosition; 
      varying vec3 vNormal;
      uniform vec3 topColor; 
      uniform vec3 bottomColor;
      uniform samplerCube envMap;
      uniform float envMix;
      void main(){ 
        // Vertical gradient
        float mixValue = (vPosition.y + 50.0) / 100.0;
        vec3 gradientColor = mix(bottomColor, topColor, mixValue);

        // Environment reflection color
        vec3 envColor = textureCube(envMap, vNormal).rgb;

        // Blend gradient and environment using envMix
        vec3 finalColor = mix(gradientColor, envColor, envMix);

        gl_FragColor = vec4(finalColor, 1.0); 
      }`,
    side: THREE.BackSide,
    depthWrite: false,
    transparent: true
  });
  return material;
}, [textureMap]);

  const sphereGeometry = useMemo(() => 
    new THREE.SphereGeometry(100, segments, segments), 
    [segments]
  );

  return (
    <group>
      <mesh position={[0, -50, -50]}>
        <primitive object={sphereGeometry} />
        <primitive object={gradientMaterial} />
      </mesh>
    </group>
  );
});

const ParticleSystem = React.memo(({ particles, quality, textureMap }) => {
  const particleComponents = useMemo(() => 
    particles.map((particle, index) => (
      <InteractiveParticle 
        key={index} 
        position={particle.position} 
        color={particle.color} 
        radius={particle.radius} 
        quality={quality}
        textureMap={textureMap}
      />
    )), 
    [particles, quality, textureMap]
  );

  return <>{particleComponents}</>;
});

const CinematicLighting = React.memo(({ quality }) => {
  return (
    <>
      {/* Key Light - Main cinematic light from upper left */}
      <directionalLight 
        position={[-20, 25, 15]} 
        intensity={5.5} 
        color="#ffd700"
        castShadow={true}
        shadow-mapSize-width={quality === 'low' ? 1024 : 4096}
        shadow-mapSize-height={quality === 'low' ? 1024 : 4096}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-camera-near={0.1}
        shadow-camera-far={100}
        shadow-bias={-0.0001}
      />
      
      {/* Fill Light - Softer light from right to fill shadows */}
      <directionalLight 
        position={[15, 15, 10]} 
        intensity={3.8} 
        color="#87ceeb"
        castShadow={quality !== 'low'}
        shadow-mapSize-width={quality === 'low' ? 512 : 2048}
        shadow-mapSize-height={quality === 'low' ? 512 : 2048}
      />
      

      
      {/* Dramatic spot lights for atmosphere */}
      <spotLight 
        position={[-25, 30, -15]}
        angle={Math.PI / 4}
        penumbra={0.3}
        intensity={4.0}
        color="#ff4757"
        castShadow={quality !== 'low'}
        shadow-mapSize-width={quality === 'low' ? 512 : 2048}
        shadow-mapSize-height={quality === 'low' ? 512 : 2048}
      />
      
      <spotLight 
        position={[25, 25, 20]}
        angle={Math.PI / 5}
        penumbra={0.4}
        intensity={3.2}
        color="#3742fa"
        castShadow={quality !== 'low'}
      />
      
      {/* Atmospheric point lights */}
      <pointLight 
        position={[-10, 8, 8]} 
        intensity={2.5}
        color="#ff9ff3"
        distance={30}
        decay={2}
      />
      
      <pointLight 
        position={[12, 6, -8]} 
        intensity={2.0}
        color="#54a0ff"
        distance={25}
        decay={2}
      />
      
      {/* Low ambient light to maintain mood */}
      <ambientLight intensity={0.3} color="#1e3799" />
      
      {/* Hemisphere light for subtle fill */}
      <hemisphereLight 
        skyColor="#4834d4" 
        groundColor="#130f40" 
        intensity={2.6}
      />
      
      {/* Additional colored lights for cinematic atmosphere */}
      <rectAreaLight
        position={[-15, 15, -10]}
        width={10}
        height={10}
        intensity={3.5}
        color="#ff6348"
      />
      
      <rectAreaLight
        position={[15, 15, 10]}
        width={8}
        height={8}
        intensity={6.2}
        color="#1dd1a1"
      />
    </>
  );
});

const CameraController = React.memo(() => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 5, 15);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
});

const ParticleScene = () => {
  const [quality, setQuality] = useState('high');
  const cameraRef = useRef();



const textureMap = useMemo(() => {
  const textures = [universe, universe1, universe2]; // import or define your three image paths
  const randomTexturePath = textures[Math.floor(Math.random() * textures.length)];

  const texture = new THREE.TextureLoader().load(randomTexturePath);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.flipY = false;

  return texture;
}, []);

  const initialParticleCount = useMemo(() => {
    return typeof window !== 'undefined' && window.innerWidth < 768 ? 15 : 29;
  }, []);

const colorPalette = useMemo(() => [
  '#2E1A47', // Deep cosmic purple
  '#3B3B98', // Nebula blue
  '#5F27CD', // Vivid violet
  '#1B1464', // Space navy blue
  '#0A3D62', // Deep teal accent
  '#6C5CE7', // Bright galaxy purple
  '#341F97'  // Dark royal purple
], []);


  const [particles, setParticles] = useState(() => {
    const arr = [];
    for (let i = 0; i < initialParticleCount; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 20, 
          Math.random() * 5 + 2, 
          (Math.random() - 0.5) * 20
        ],
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        radius: Math.random() * (3.7 - 1.5) + 0.5
      });
    }
    return arr;
  });

  const checkPerformance = useCallback(() => {
    let perf = 'high';
    if (typeof window !== 'undefined') {
      const { innerWidth, navigator } = window;
      
      if (innerWidth < 768) {
        perf = 'low';
      } else {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
          const { downlink, effectiveType } = connection;
          if (downlink < 2.5 || (effectiveType && effectiveType.includes('2g'))) {
            perf = 'low';
          }
        }
        
        if (navigator.deviceMemory && navigator.deviceMemory < 4) {
          perf = 'low';
        }
        
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) {
          const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
          if (debugInfo) {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            if (renderer.toLowerCase().includes('intel') || renderer.toLowerCase().includes('amd')) {
              perf = 'low';
            }
          }
        }
      }
    }
    setQuality(perf);
  }, []);

  useEffect(() => {
    checkPerformance();
    const connection = window.navigator?.connection;
    if (connection && typeof connection.addEventListener === 'function') {
      connection.addEventListener('change', checkPerformance);
      return () => connection.removeEventListener('change', checkPerformance);
    }
  }, [checkPerformance]);

  const physicsConfig = useMemo(() => ({
    gravity: [0, -9.8, 0],
    iterations: quality === 'low' ? 8 : 20,
    allowSleep: true,
    broadphase: 'Naive',
    defaultContactMaterial: {
      friction: 0.5,
      restitution: 0.6,
      contactEquationStiffness: 1e7,
      contactEquationRelaxation: 4
    }
  }), [quality]);

  const isMobile = quality === 'low';

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
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -1);
    const intersectPoint = new THREE.Vector3();
    if (raycaster.ray.intersectPlane(plane, intersectPoint)) {
      const randomOffset = (Math.random() * 2 - 1) * 1.0;
      const offsetVector = raycaster.ray.direction.clone().multiplyScalar(randomOffset);
      intersectPoint.add(offsetVector);
      const colors = [    '#8E2DE2', // Bright violet
  '#4A00E0', // Electric deep blue
  '#6C63FF', // Soft glowing purple
  '#00CFFD', // Bright cyan star color
  '#A020F0', // Pure vivid purple
  '#C77DFF' , // Light lavender glow
    '#2E1A47', // Deep cosmic purple
  '#3B3B98', // Nebula blue
  '#5F27CD', // Vivid violet
  '#1B1464', // Space navy blue
  '#0A3D62', // Deep teal accent
  '#6C5CE7', // Bright galaxy purple
  '#341F97'  // Dark royal purple
  ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomRadius = Math.random() * 1.3 + 0.3;
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
      setParticles((prev) => [...prev, { position: newPosition.toArray(), color: randomColor, radius: randomRadius }]);
    }
  };


  const canvasProps = useMemo(() => ({
    style: { 
      height: isMobile ? '100vh' : '150vh', 
      width: '100vw', 
      touchAction: 'pan-y',
      background: 'linear-gradient(135deg, #0f0f23 0%, #2d1b69 50%, #130f40 100%)'
    },
    shadows: true,
    onClick: handleCanvasClick,
    dpr: quality === 'low' ? [1, 1] : [1, 2],
    performance: {
      min: 0.5,
      max: 1,
      debounce: 200
    },
    gl: {
      antialias: quality !== 'low',
      alpha: false,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
      toneMapping: THREE.ACESFilmicToneMapping,
      toneMappingExposure: 1.2
    }
  }), [isMobile, handleCanvasClick, quality]);

  const postProcessingConfig = useMemo(() => ({
    bloom: {
      intensity: quality === 'low' ? 1.0 : 2.5,
      radius: quality === 'low' ? 0.3 : 0.6,
      threshold: 0.1
    },
    ssao: {
      radius: quality === 'low' ? 0.15 : 0.25,
      intensity: quality === 'low' ? 8 : 16
    },
    dof: {
      focusDistance: 0.02,
      focalLength: 0.15,
      bokehScale: quality === 'low' ? 1.5 : 3.0
    }
  }), [quality]);

  return (
    <Canvas {...canvasProps}>
      <Suspense >
        <PerspectiveCamera 
          makeDefault 
          ref={cameraRef} 
          position={[0, 5, 15]} 
          fov={50} 
          near={0.1} 
          far={1000} 
        />
        <CameraController />
        <BackgroundScene quality={quality} textureMap={textureMap} />
        <Environment files={spaceBackground} background />
        <CinematicLighting quality={quality} />

        <Physics {...physicsConfig}>
          <GroundPlane />
          <ParticleSystem particles={particles} quality={quality} textureMap={textureMap} />
        </Physics>

        <OrbitControls 
          enableZoom={false} 
          enableRotate={true} 
          maxPolarAngle={Math.PI / 2} 
          minPolarAngle={Math.PI / 2} 
        />

        {quality !== 'low' && (
          <EffectComposer>
            <Bloom 
              intensity={postProcessingConfig.bloom.intensity} 
              radius={postProcessingConfig.bloom.radius}
              threshold={postProcessingConfig.bloom.threshold}
            />
            <SSAO 
              radius={postProcessingConfig.ssao.radius} 
              intensity={postProcessingConfig.ssao.intensity} 
            />
            <DepthOfField 
              focusDistance={postProcessingConfig.dof.focusDistance} 
              focalLength={postProcessingConfig.dof.focalLength} 
              bokehScale={postProcessingConfig.dof.bokehScale} 
            />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  );
};

export default ParticleScene;