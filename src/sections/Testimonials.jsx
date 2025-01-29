import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import hdr from "../assets/industrial_sunset_puresky_1k.hdr"
// Paths to your assets
const hdrImagePath = hdr;

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
  const cubeRef = useRef(null);
  const controlsRef = useRef(null);
  const hdrTextureRef = useRef(null);

  // Calculate cube size based on container size
  const getCubeSize = () => {
    return Math.min(
      containerRef.current.offsetWidth,
      containerRef.current.offsetHeight
    ) / 10;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.offsetWidth / containerRef.current.offsetHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      containerRef.current.offsetWidth,
      containerRef.current.offsetHeight
    );
    renderer.outputEncoding = THREE.sRGBEncoding;
    containerRef.current.appendChild(renderer.domElement);

    // Load HDR image only once
    if (!hdrTextureRef.current) {
      const rgbeLoader = new RGBELoader();
      rgbeLoader.load(hdrImagePath, (hdrTexture) => {
        hdrTexture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = hdrTexture;
        scene.background = hdrTexture;
        hdrTextureRef.current = hdrTexture;
      });
    }

    const cubeSize = getCubeSize();
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    // Reuse canvas for textures to optimize memory
    const generateCanvasTexture = (testimonial) => {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 1024;
      const context = canvas.getContext("2d");

      context.fillStyle = "rgba(26, 26, 26, 0.85)"; // Deep Charcoal
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = "#FFC857"; // Gold for text
      context.font = "bold 40px 'Playfair Display', serif";
      context.textAlign = "center";
      context.fillText(
        testimonial.quote,
        canvas.width / 2,
        canvas.height / 3,
        800
      );

      context.font = "italic 30px 'Roboto', sans-serif";
      context.fillText(
        testimonial.name,
        canvas.width / 2,
        canvas.height / 2 + 50
      );
      context.fillText(
        testimonial.designation,
        canvas.width / 2,
        canvas.height / 2 + 100
      );

      return new THREE.CanvasTexture(canvas);
    };

    // Create cube materials based on testimonials
    const cubeMaterials = testimonials.map((testimonial) => {
      const texture = generateCanvasTexture(testimonial);
      return new THREE.MeshPhysicalMaterial({
        map: texture,
        color: 0xffffff,
        roughness: 0.2,
        metalness: 0.8,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        reflectivity: 0.8,
        envMapIntensity: 1.2,
      });
    });

    // Create cube mesh with the testimonial materials
    const cube = new THREE.Mesh(geometry, cubeMaterials);
    cubeRef.current = cube;
    scene.add(cube);

    // Set the camera position and orientation
    camera.position.z = 120;
    camera.position.y = 20;
    camera.lookAt(0, 0, 0);



// Ambient light with lower intensity for a sophisticated and warm atmosphere
const ambientLight = new THREE.AmbientLight(0xF2D966, 2); // Softer, golden ambient light, aligned with the secondary light in the theme
scene.add(ambientLight);

// Directional light to create dramatic highlights and shadows with a warm, luxurious tone
const directionalLight = new THREE.DirectionalLight(0xF79D7D, 5); // Softer pinkish light to evoke elegance and luxury
directionalLight.position.set(10, 20, 10); // Positioned to create dynamic shadows and highlights
scene.add(directionalLight);

// SpotLight for highlighting specific areas with a cool, calm accent
const spotLight = new THREE.SpotLight(0x00A7D0, 500, 50, Math.PI / 4, 0.5, 10000); // Bright turquoise with a focused beam, adding a premium touch
spotLight.position.set(5, 10, 0); // Adjust position to highlight specific objects or areas
scene.add(spotLight);

// Add a gold spotlight for dramatic effect
const goldLight = new THREE.SpotLight(0xFFC857, 100.5, 100, Math.PI / 4, 5); 
goldLight.position.set(0, 100, 0); // Positioned high above for a dramatic top-down effect
goldLight.target.position.set(0, 0, 0); // Target the center for focus
scene.add(goldLight);
scene.add(goldLight.target);

// Additional Point Light for warm, subtle accents
const warmPointLight = new THREE.PointLight(0xE6B800, 3, 500); // Warm yellow light to add depth and elegance
warmPointLight.position.set(-10, 5, -10); // Positioned at a lower angle for soft illumination
scene.add(warmPointLight);

// A cool blue accent light to add contrast and sophistication
const coolPointLight = new THREE.PointLight(0x00A7D0, 1, 50); // Cool turquoise light
coolPointLight.position.set(10, 5, 10); // Positioned on the opposite side of the warm point light for balance
scene.add(coolPointLight);



// Soft fill light to bring more warmth
const fillLight = new THREE.PointLight(0xF79D7D, 1, 300); // Soft pinkish light for gentle fill
fillLight.position.set(5, 15, 5); // Positioned to softly illuminate the scene from above
scene.add(fillLight);

    // Setup OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controlsRef.current = controls;

    // Animation loop to update the scene and controls
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const onWindowResize = () => {
      const cubeSize = getCubeSize();
      cube.geometry.dispose();
      cube.geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

      camera.aspect =
        containerRef.current.offsetWidth / containerRef.current.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.offsetWidth,
        containerRef.current.offsetHeight
      );
    };

    window.addEventListener("resize", onWindowResize);

    // Scroll animations with GSAP
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

    return () => {
      window.removeEventListener("resize", onWindowResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      cube.geometry.dispose();
      cube.material.forEach((material) => material.dispose());
      if (hdrTextureRef.current) {
        hdrTextureRef.current.dispose();
      }
    };
  }, []);

  return (
<motion.div
  className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-dark via-primaryDark to-dark lg:flex-row"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  <motion.div
    ref={containerRef}
    className="w-full lg:w-8/12 h-[900px]"
    animate={{ scale: [0.8, 1] }}
    transition={{ duration: 1, ease: "easeOut" }}
  ></motion.div>

  <motion.div
    className="relative w-full p-8 lg:w-1/2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.5, delay: 0.5 }}
  >
    <motion.h1
      className="text-4xl font-bold text-left text-transparent sm:text-5xl md:text-6xl bg-gradient-to-r from-secondaryLight to-accent1 bg-clip-text sm:-mt-10 md:-mt-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <br />What they say<br />
    </motion.h1>
    <p className="text-lg leading-relaxed tracking-wide text-neutral">
      See what others have to say about Bushra's hard work, creativity, and
      leadership abilities. These testimonials highlight dedication and unique
      skills.
    </p>
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-secondary to-secondaryLight opacity-10 -z-10"></div>
  </motion.div>
</motion.div>

  );
};

export default TestimonialPolygon;
