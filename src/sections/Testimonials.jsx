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
  const [cubeSize, setCubeSize] = useState(60);
  const cubeRef = useRef();
  const controlsRef = useRef();

  const updateCubeSize = () => {
    if (containerRef.current) {
      const newSize = Math.min(
        containerRef.current.offsetWidth,
        containerRef.current.offsetHeight
      ) / 10;
      setCubeSize(newSize);
    }
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

    const rgbeLoader = new RGBELoader();
    rgbeLoader.load(hdrImagePath, (hdrTexture) => {
      hdrTexture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = hdrTexture;
    });

    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    const cubeMaterials = testimonials.map((testimonial) => {
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

      const texture = new THREE.CanvasTexture(canvas);

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

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const goldLight = new THREE.SpotLight(0xFFC857, 1.5, 100, Math.PI / 4, 0.5);
    goldLight.position.set(0, 100, 0);
    goldLight.target.position.set(0, 0, 0);
    scene.add(goldLight);
    scene.add(goldLight.target);

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
      camera.aspect =
        containerRef.current.offsetWidth / containerRef.current.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.offsetWidth,
        containerRef.current.offsetHeight
      );
      updateCubeSize();
    };

    window.addEventListener("resize", onWindowResize);

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
    };
  }, [cubeSize]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#F9F5F0] lg:flex-row"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        ref={containerRef}
        className="w-full lg:w-8/12 h-[900px] lg:h-[900px] bg-transparent"
        animate={{ scale: [0.8, 1] }}
        transition={{ duration: 1, ease: "easeOut" }}
      ></motion.div>

      <motion.div
        className="relative w-full p-8 overflow-hidden text-left lg:w-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <h2 className="mb-6 text-5xl font-bold text-[#007C8A] font-serif tracking-wide leading-tight transform transition duration-300 ease-in-out hover:text-[#004f5c] shadow-lg">
          What They Say
        </h2>
        <p className="text-lg text-[#ADA7C9] leading-relaxed font-sans tracking-wide">
          See what others have to say about Bushra's hard work, creativity, and
          leadership abilities. These testimonials highlight his dedication and
          unique skills.
        </p>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FFC857] to-[#FF6F3C] opacity-10 -z-10"></div>
      </motion.div>
    </motion.div>
  );
};

export default TestimonialPolygon;
