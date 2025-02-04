import React, { useEffect, useRef ,useState} from "react";
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
  const [isLoaded, setIsLoaded] = useState(false);

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
      rgbeLoader.load(hdr, (hdrTexture) => {
        hdrTexture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = hdrTexture;
        scene.background = hdrTexture;
        hdrTextureRef.current = hdrTexture;
        setIsLoaded(true); // Set isLoaded to true once the texture is loaded
      });
    }

    const cubeSize = Math.min(containerRef.current.offsetWidth, containerRef.current.offsetHeight) / 10;
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

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

    const cube = new THREE.Mesh(geometry, cubeMaterials);
    cubeRef.current = cube;
    scene.add(cube);

    camera.position.z = 120;
    camera.position.y = 20;
    camera.lookAt(0, 0, 0);

    // Set up lighting
    setupLighting(scene);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controlsRef.current = controls;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const onWindowResize = () => {
      const cubeSize = Math.min(containerRef.current.offsetWidth, containerRef.current.offsetHeight) / 10;
      cube.geometry.dispose();
      cube.geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      camera.aspect = containerRef.current.offsetWidth / containerRef.current.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
    };

    window.addEventListener("resize", onWindowResize);

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

  const generateCanvasTexture = (testimonial) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const context = canvas.getContext("2d");
    context.fillStyle = "rgba(26, 26, 26, 0.85)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#FFC857";
    context.font = "bold 40px 'Playfair Display', serif";
    context.textAlign = "center";
    context.fillText(testimonial.quote, canvas.width / 2, canvas.height / 3, 800);
    context.font = "italic 30px 'Roboto', sans-serif";
    context.fillText(testimonial.name, canvas.width / 2, canvas.height / 2 + 50);
    context.fillText(testimonial.designation, canvas.width / 2, canvas.height / 2 + 100);
    return new THREE.CanvasTexture(canvas);
  };

  const setupLighting = (scene) => {
    const ambientLight = new THREE.AmbientLight(0xF2D966, 2);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xF79D7D, 5);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);
    const spotLight = new THREE.SpotLight(0x00A7D0, 500, 50, Math.PI / 4, 0.5, 10000);
    spotLight.position.set(5, 10, 0);
    scene.add(spotLight);
  };

  return (
    <motion.div  id="testimonials"
      className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-deep_indigo to-dark_teal lg:flex-row"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        ref={containerRef}
        className="w-full lg:w-8/12 h-[900px]"
        animate={{ scale: [0.8, 1] }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      {isLoaded && (
        <motion.div
          className="relative w-full p-8 lg:w-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <motion.h1
            className="text-4xl font-extrabold text-left text-transparent sm:text-5xl md:text-6xl bg-gradient-to-r from-aquamarine via-jordy_blue to-tea_rose bg-clip-text sm:-mt-10 md:-mt-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <br />What they say<br />
          </motion.h1>
          <p className="text-lg leading-relaxed tracking-wide text-neutral">
            See what others have to say about Bushra's hard work, creativity, and leadership abilities.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TestimonialPolygon;