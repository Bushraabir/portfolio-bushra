import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; // Import OrbitControls

// Paths to your assets
const hdrImagePath = "src/assets/industrial_sunset_puresky_1k.hdr";

const testimonials = [
  {
    quote: "Bushra is a hardworking and disciplined student.",
    name: "Dr. A. Rahman",
    designation: "Professor of Mechanical Engineering",
  },
  {
    quote: "His creativity and dedication are evident in his projects.",
    name: "Ms. S. Hasan",
    designation: "Head of Innovation Lab",
  },
  {
    quote: "A reliable and motivated individual, Bushra exceeds expectations.",
    name: "Mr. K. Islam",
    designation: "Senior Lecturer, CUET",
  },
  {
    quote: "Bushra has a unique ability to solve complex problems.",
    name: "Prof. J. Dutta",
    designation: "Dean of Students",
  },
  {
    quote: "She is an excellent team player with great leadership qualities.",
    name: "Mr. T. Karim",
    designation: "Project Manager",
  },
  {
    quote: "Her analytical skills make him stand out in every task.",
    name: "Ms. R. Akhtar",
    designation: "Senior Researcher",
  },
];

gsap.registerPlugin(ScrollTrigger);

const TestimonialPolygon = () => {
  const containerRef = useRef(null);
  const [cubeSize, setCubeSize] = useState(60); // Further reduced initial cube size
  const cubeRef = useRef(); // Ref for cube
  const controlsRef = useRef(); // Ref for OrbitControls

  // Update the cube size based on container's width
  const updateCubeSize = () => {
    if (containerRef.current) {
      const newSize = Math.min(containerRef.current.offsetWidth, containerRef.current.offsetHeight) / 10; // Smaller cube size
      setCubeSize(newSize); // Adjust the size dynamically
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.offsetWidth / containerRef.current.offsetHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    containerRef.current.appendChild(renderer.domElement);

    // Load HDRi for environment lighting
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load(hdrImagePath, (hdrTexture) => {
      hdrTexture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = hdrTexture;
    });

    // Create cube geometry and materials with brighter colors
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    const cubeMaterials = testimonials.map((testimonial) => {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 1024;
      const context = canvas.getContext("2d");

      // Background for the text
      context.fillStyle = "rgba(0, 0, 0, 0.7)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Text styling
      context.fillStyle = "#fff";
      context.font = "bold 40px Arial";
      context.textAlign = "center";
      context.fillText(testimonial.quote, canvas.width / 2, canvas.height / 3, 800);

      context.font = "italic 30px Arial";
      context.fillText(testimonial.name, canvas.width / 2, canvas.height / 2 + 50);
      context.fillText(testimonial.designation, canvas.width / 2, canvas.height / 2 + 100);

      const texture = new THREE.CanvasTexture(canvas);

      return new THREE.MeshPhysicalMaterial({
        map: texture,
        color: 0xE6E6FA,  // Dodger blue
        roughness: 0.1,    // Slight roughness for smoothness
        metalness: 0.8,    // Semi-metallic surface
        clearcoat: 1,      // Clear reflective layer
        clearcoatRoughness: 0.5,  // Subtle imperfections in the clearcoat
        reflectivity: 0.8,        // Sharp reflections
        envMapIntensity: 1,        // Stronger environment map reflections
        transmission: 0.9,         // High transparency for glass effect
        ior: 1.45,                 // Index of refraction for glass effect
        thickness: 1.2,            // Thickness of the glass
        sheen: 1,                  // Pearlescent sheen effect
        sheenColor: new THREE.Color(0xE6E6FA),  // Golden sheen effect
        emissive: new THREE.Color(0xE6E6FA),    // Firebrick glowing effect
        emissiveIntensity: 1.5,                  // Intensity of glow
        emissiveMap: texture,                    // Optionally use texture for the emissive map
      });
    });

    const cube = new THREE.Mesh(geometry, cubeMaterials);
    cubeRef.current = cube;
    scene.add(cube);

    // Camera position for better visibility
    camera.position.z = 120; // Adjusted for a better view (slightly closer)
    camera.position.y = 20;  // Raise camera slightly for better view
    camera.lookAt(0, 0, 0);  // Look at the center of the cube

    // Lighting setup with vibrant colors
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Strong ambient light
    scene.add(ambientLight);

    // Blue point light
    const blueLight = new THREE.PointLight(0x4B9CD3, 2, 100);
    blueLight.position.set(50, 50, 50);
    scene.add(blueLight);

    // Orange Point Light
    const orangeLight = new THREE.PointLight(0xF5A623, 2, 100);
    orangeLight.position.set(-50, -50, 50);
    scene.add(orangeLight);

    // Purple Point Light
    const purpleLight = new THREE.PointLight(0x9B59B6, 2, 100);
    purpleLight.position.set(50, -50, -50);
    scene.add(purpleLight);

    // Spotlight with golden color
    const goldLight = new THREE.SpotLight(0xFFD700, 1.5, 100, Math.PI / 4, 0.5, 5);
    goldLight.position.set(0, 100, 0);
    goldLight.target.position.set(0, 0, 0);
    scene.add(goldLight);
    scene.add(goldLight.target);

    // Directional light for sunset effect
    const directionalLight = new THREE.DirectionalLight(0xFF6F61, 1.5);
    directionalLight.position.set(100, 100, 100);
    directionalLight.target.position.set(0, 0, 0);
    scene.add(directionalLight);
    scene.add(directionalLight.target);

    // OrbitControls for user interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Enable smooth damping
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false; // Disable panning in the z-axis
    controls.maxPolarAngle = Math.PI; // Allow full vertical rotation (from top to bottom)
    controls.enableZoom = false; // Disable zoom functionality
    controlsRef.current = controls;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // Update the controls
      renderer.render(scene, camera);
    };

    animate();

    // Adjust on window resize
    const onWindowResize = () => {
      camera.aspect = containerRef.current.offsetWidth / containerRef.current.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
      updateCubeSize(); // Update the cube size on resize
    };

    window.addEventListener("resize", onWindowResize);

    // ScrollTrigger animation for cube
    gsap.to(cube.rotation, {
      y: 2 * Math.PI,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.to(cube.scale, {
      x: 1.5,
      y: 1.5,
      z: 1.5,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Clean up
    return () => {
      window.removeEventListener("resize", onWindowResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [cubeSize]); // Re-render whenever cubeSize changes

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen p-6 bg-indigo-950 lg:flex-row"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Cube Section (Left) */}
      <motion.div
        ref={containerRef}
        className="w-full lg:w-8/12 h-[900px] lg:h-[900px] bg-transparent"
        animate={{ scale: [0.8, 1] }}
        transition={{ duration: 1, ease: "easeOut" }}
      ></motion.div>

      {/* Text Section (Right) */}
      <motion.div
        className="w-full p-6 text-left lg:w-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <h2 className="mb-4 text-4xl font-bold text-indigo-100">What They Say</h2>
        <p className="text-lg leading-relaxed text-gray-600">
          See what others have to say about Bushra's hard work, creativity, and
          leadership abilities. These testimonials highlight his dedication and
          unique skills.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default TestimonialPolygon;
