"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import hdr from "../assets/industrial_sunset_puresky_1k.hdr";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "During breaks at noon, I often see her studying in the library. If it's closed—even forcefully—she finds a spot on the stairs or anywhere else. She even skips meals to save time for studying.",
    name: "Md. Shishir Saidy",
    designation: "Lecturer, Dept. of English, MCSK",
  },
  {
    quote: "She was one of the first students to be so active in Olympiads, securing 1st place in Jessore in the Physics Olympiad. Her academic scores in STEM are nearly 100%, and she constantly asks thought-provoking questions.",
    name: "Md. Jahangir Hossain",
    designation: "Associate Professor, Dept. of Physics, MCSK",
  },
  {
    quote: "I have had the privilege of teaching Bushra, and her academic excellence has consistently stood out in my class. She approaches complex subjects with both curiosity and clarity, making her an asset during discussions. Her proactive engagement and dedication have enriched our learning environment.In particular, I have observed her ability to derive different physics equations swiftly, demonstrating a deep and intuitive understanding of the subject. Her grasp of complex concepts and problem-solving skills set her apart, and I am confident that she will bring the same enthusiasm and rigor to her university studies.",
    name: "Ifat Al Karim Shaikot",
    designation: "Lecturer, Dept. Of Physics, KU",
  },
  {
    quote: "Bushra has demonstrated exceptional analytical skills and an innovative mindset in every project she undertakes. Her ability to connect theoretical concepts with practical applications has significantly elevated our classroom debates. She works well both independently and collaboratively, often leading by example. I wholeheartedly support her scholarship application, knowing she will excel in any academic setting.",
    name: "Dr. K. M. Salim Reza",
    designation: "Associate Professor, Dept. of Chemistry, MCSK",
  },
  {
    quote: "Throughout my time teaching Bushra, she has impressed me with her perseverance and intellectual curiosity. She consistently seeks out new challenges and approaches them with a thoughtful and creative perspective. Her contributions to class discussions not only reflect deep understanding but also inspire her peers. I am proud to recommend Bushra for this scholarship as she is truly deserving of this opportunity.",
    name: "Md. Enayet Hossain",
    designation: "Demonstrator, Dept. of Physics, MCSK",
  },
  {
    quote: "Bushra is a dedicated and motivated student whose passion for learning is evident in every assignment. Her ability to synthesize complex algorithm and present it clearly has made a lasting impact on our classroom dynamic. She balances academic rigor with active participation, often taking initiative in group projects. I am confident that Bushra’s drive and commitment will make her an excellent candidate for this scholarship.",
    name: "Partha Chowdhury",
    designation: "Lecturer, Dept. of ICT, MCSK",
  },
];

const TestimonialPolygon = () => {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    if (window.navigator.connection && window.navigator.connection.downlink < 2.5) {
      setIsLowEnd(true);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    let animationFrameId;
    const scene = new THREE.Scene();
    const aspectRatio = containerRef.current.offsetWidth / containerRef.current.offsetHeight;
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: !isLowEnd, alpha: true });
    renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
    renderer.setPixelRatio(isLowEnd ? 1 : window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    containerRef.current.appendChild(renderer.domElement);
    if (!isLowEnd) {
      const rgbeLoader = new RGBELoader();
      rgbeLoader.load(
        hdr,
        (hdrTexture) => {
          hdrTexture.mapping = THREE.EquirectangularReflectionMapping;
          scene.environment = hdrTexture;
          scene.background = hdrTexture;
          setIsLoaded(true);
        },
        undefined,
        () => {
          scene.environment = new THREE.Color(0x1e1e1e);
          scene.background = new THREE.Color(0x1e1e1e);
          setIsLoaded(true);
        }
      );
    } else {
      scene.environment = new THREE.Color(0x1e1e1e);
      scene.background = new THREE.Color(0x1e1e1e);
      setIsLoaded(true);
    }
    const cubeSize = Math.min(containerRef.current.offsetWidth, containerRef.current.offsetHeight) / 10;
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMaterials = testimonials.map((testimonial) => {
      const texture = generateCanvasTexture(testimonial, isLowEnd);
      texture.needsUpdate = true;
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
    scene.add(cube);
    camera.position.set(0, 20, 120);
    camera.lookAt(0, 0, 0);
    setupLighting(scene);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = !isLowEnd;
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    const onWindowResize = () => {
      if (!containerRef.current) return;
      const newCubeSize = Math.min(containerRef.current.offsetWidth, containerRef.current.offsetHeight) / 10;
      cube.geometry.dispose();
      cube.geometry = new THREE.BoxGeometry(newCubeSize, newCubeSize, newCubeSize);
      camera.aspect = containerRef.current.offsetWidth / containerRef.current.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
    };
    window.addEventListener("resize", onWindowResize);
    return () => {
      window.removeEventListener("resize", onWindowResize);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      cubeMaterials.forEach((material) => material.dispose());
      renderer.dispose();
    };
  }, [isLowEnd]);

  const generateCanvasTexture = (testimonial, isLowQuality) => {
    const canvasSize = isLowQuality ? 256 : 512;
    const canvas = document.createElement("canvas");
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    const context = canvas.getContext("2d");
    context.fillStyle = "rgba(26, 26, 26, 1)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#FFC857";
    context.font = isLowQuality ? "bold 14px 'Playfair Display', serif" : "bold 18px 'Playfair Display', serif";
    context.textAlign = "center";
    const paddingTop = isLowQuality ? 30 : 40;
    const quoteX = canvas.width / 2;
    const quoteY = paddingTop;
    const maxWidth = canvas.width * 0.8;
    const lineHeight = isLowQuality ? 18 : 22;
    wrapText(context, testimonial.quote, quoteX, quoteY, maxWidth, lineHeight);
    context.fillStyle = "#FFC857";
    context.font = isLowQuality ? "italic 12px 'Roboto', sans-serif" : "italic 14px 'Roboto', sans-serif";
    const nameY = quoteY + maxWidth * 0.8;
    context.fillText(testimonial.name, canvas.width / 2, nameY);
    const designationSpacing = isLowQuality ? 25 : 35;
    const designationY = nameY + designationSpacing;
    context.fillText(testimonial.designation, canvas.width / 2, designationY);
    return new THREE.CanvasTexture(canvas);
  };

  const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
    const words = text.split(" ");
    let line = "";
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const metrics = context.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        context.fillText(line, x, y);
        line = words[i] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  };

  const setupLighting = (scene) => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);
    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(5, 10, 0);
    scene.add(spotLight);
  };

  return (
    <motion.div
      id="testimonials"
      className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-deep_indigo to-dark_teal lg:flex-row"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        ref={containerRef}
        className="w-full lg:w-8/12 h-[50vh] lg:h-[900px]"
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
            className="text-4xl font-extrabold font-heading text-transparent sm:text-5xl md:text-6xl bg-gradient-to-r from-aquamarine via-jordy_blue to-tea_rose bg-clip-text sm:-mt-10 md:-mt-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <br />
            Insights from My Closest Mentors
            <br />
          </motion.h1>
          <p className="text-lg font-description leading-relaxed tracking-wide text-lemon_chiffon">
          Highlighting my journey, character, and achievements.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TestimonialPolygon;
