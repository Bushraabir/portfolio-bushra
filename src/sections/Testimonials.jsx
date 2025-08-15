"use client";

import { useEffect, useRef, useState, useCallback, memo } from "react";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import hdr from "../assets/testimonial.hdr";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "During breaks at noon, I often see her studying in the library. If it's closed—even forcefully—she finds a spot on the stairs or anywhere else. She even skips meals to save time for studying.",
    name: "Md. Shishir Saidy",
    designation: "Lecturer, Dept. of English, MCSK",
    theme: "dedication"
  },
  {
    quote: "She was one of the first students to be so active in Olympiads, securing 1st place in Jessore in the Physics Olympiad. Her academic scores in STEM are nearly 100%, and she constantly asks thought-provoking questions.",
    name: "Md. Jahangir Hossain",
    designation: "Associate Professor, Dept. of Physics, MCSK",
    theme: "excellence"
  },
  {
    quote: "I have had the privilege of teaching Bushra, and her academic excellence has consistently stood out in my class. She approaches complex subjects with both curiosity and clarity, making her an asset during discussions. Her proactive engagement and dedication have enriched our learning environment. In particular, I have observed her ability to derive different physics equations swiftly, demonstrating a deep and intuitive understanding of the subject. Her grasp of complex concepts and problem-solving skills set her apart, and I am confident that she will bring the same enthusiasm and rigor to her university studies.",
    name: "Ifat Al Karim Shaikot",
    designation: "Lecturer, Dept. Of Physics, KU",
    theme: "understanding"
  },
  {
    quote: "Bushra has demonstrated exceptional analytical skills and an innovative mindset in every project she undertakes. Her ability to connect theoretical concepts with practical applications has significantly elevated our classroom debates. She works well both independently and collaboratively, often leading by example. I wholeheartedly support her scholarship application, knowing she will excel in any academic setting.",
    name: "Dr. K. M. Salim Reza",
    designation: "Associate Professor, Dept. of Chemistry, MCSK",
    theme: "innovation"
  },
  {
    quote: "Throughout my time teaching Bushra, she has impressed me with her perseverance and intellectual curiosity. She consistently seeks out new challenges and approaches them with a thoughtful and creative perspective. Her contributions to class discussions not only reflect deep understanding but also inspire her peers. I am proud to recommend Bushra for this scholarship as she is truly deserving of this opportunity.",
    name: "Md. Enayet Hossain",
    designation: "Demonstrator, Dept. of Physics, MCSK",
    theme: "curiosity"
  },
  {
    quote: "Bushra is a dedicated and motivated student whose passion for learning is evident in every assignment. Her ability to synthesize complex algorithm and present it clearly has made a lasting impact on our classroom dynamic. She balances academic rigor with active participation, often taking initiative in group projects. I am confident that Bushra's drive and commitment will make her an excellent candidate for this scholarship.",
    name: "Partha Chowdhury",
    designation: "Lecturer, Dept. of ICT, MCSK",
    theme: "passion"
  },
];

// Optimized 3D Cube Component with performance monitoring
const TestimonialCube = memo(() => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cubeRef = useRef(null);
  const controlsRef = useRef(null);
  const animationFrameRef = useRef(null);
  const timeoutIdRef = useRef(null);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [error, setError] = useState(false);
  
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  // Performance detection
  useEffect(() => {
    const detectPerformance = () => {
      const isLowEnd = 
        window.innerWidth < 768 ||
        (navigator.deviceMemory && navigator.deviceMemory < 4) ||
        (navigator.connection && (
          navigator.connection.downlink < 2.5 || 
          navigator.connection.effectiveType?.includes("2g")
        )) ||
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      setIsLowPerformance(isLowEnd);
    };
    detectPerformance();
  }, []);

  // Optimized canvas texture generation
  const generateCanvasTexture = useCallback((testimonial, size = 512) => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext("2d");
      
      // Background with gradient
      const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#1a1a2e");
      gradient.addColorStop(1, "#16213e");
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Theme-based accent color
      const themeColors = {
        dedication: "#fbbf24", // amber
        excellence: "#3b82f6", // blue
        understanding: "#10b981", // emerald
        innovation: "#8b5cf6", // violet
        curiosity: "#ec4899", // pink
        passion: "#f97316" // orange
      };
      
      const accentColor = themeColors[testimonial.theme] || "#fbbf24";
      
      // Quote text
      context.fillStyle = "#f1f5f9";
      context.font = `${size < 384 ? 'bold 11px' : 'bold 16px'} 'Playfair Display', serif`;
      context.textAlign = "center";
      
      const maxWidth = canvas.width * 0.85;
      const lineHeight = size < 384 ? 18 : 24;
      const startY = size * 0.15;
      
      wrapText(context, testimonial.quote, canvas.width / 2, startY, maxWidth, lineHeight);
      
      // Name
      context.fillStyle = accentColor;
      context.font = `${size < 384 ? 'italic 10px' : 'italic 14px'} 'Jura', sans-serif`;
      const nameY = canvas.height * 0.75;
      context.fillText(testimonial.name, canvas.width / 2, nameY);
      
      // Designation
      context.font = `${size < 384 ? '8px' : '12px'} 'Jura', sans-serif`;
      const designationY = nameY + (size < 384 ? 20 : 28);
      context.fillText(testimonial.designation, canvas.width / 2, designationY);
      
      // Border accent
      context.strokeStyle = accentColor;
      context.lineWidth = 2;
      context.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
      
      return new THREE.CanvasTexture(canvas);
    } catch (err) {
      console.error("Canvas texture generation failed:", err);
      return null;
    }
  }, []);

  // Helper function for text wrapping
  const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
    const words = text.split(" ");
    let line = "";
    let currentY = y;
    
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const metrics = context.measureText(testLine);
      
      if (metrics.width > maxWidth && i > 0) {
        context.fillText(line, x, currentY);
        line = words[i] + " ";
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, currentY);
  };

  // Setup lighting
  const setupLighting = useCallback((scene) => {
    scene.fog = new THREE.Fog(0x1a1a2e, 10, 50);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = !isLowPerformance;
    scene.add(directionalLight);
    
    if (!isLowPerformance) {
      const spotLight = new THREE.SpotLight(0xa3c4f3, 0.8);
      spotLight.position.set(-5, 10, 5);
      spotLight.angle = Math.PI / 6;
      scene.add(spotLight);
    }
  }, [isLowPerformance]);

  // Main 3D scene initialization
  useEffect(() => {
    if (!containerRef.current || !isInView || error) return;

    let isMounted = true;
    
    try {
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      
      // Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      
      // Camera
      const aspectRatio = rect.width / rect.height;
      const camera = new THREE.PerspectiveCamera(60, aspectRatio, 0.1, 1000);
      
      // Renderer with optimized settings
      const renderer = new THREE.WebGLRenderer({ 
        antialias: !isLowPerformance,
        alpha: true,
        powerPreference: isLowPerformance ? "low-power" : "high-performance"
      });
      renderer.setSize(rect.width, rect.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isLowPerformance ? 1.5 : 2));
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.shadowMap.enabled = !isLowPerformance;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      rendererRef.current = renderer;
      
      container.appendChild(renderer.domElement);

      // HDR Environment (with fallback)
      if (!isLowPerformance) {
        const rgbeLoader = new RGBELoader();
        rgbeLoader.load(
          hdr,
          (texture) => {
            if (!isMounted) return;
            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene.environment = texture;
            scene.background = texture;
            scene.backgroundIntensity = 0.3;
          },
          undefined,
          (error) => {
            console.warn("HDR loading failed, using fallback:", error);
            scene.background = new THREE.Color(0x1a1a2e);
          }
        );
      } else {
        scene.background = new THREE.Color(0x1a1a2e);
      }

      // Cube geometry and materials
      const cubeSize = Math.min(rect.width, rect.height) / 12;
      const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      
      const materials = testimonials.map((testimonial) => {
        const texture = generateCanvasTexture(testimonial, isLowPerformance ? 256 : 512);
        if (!texture) throw new Error("Failed to generate texture");
        
        return new THREE.MeshPhysicalMaterial({
          map: texture,
          color: 0xffffff,
          roughness: isLowPerformance ? 0.4 : 0.2,
          metalness: isLowPerformance ? 0.6 : 0.8,
          clearcoat: isLowPerformance ? 0 : 1,
          clearcoatRoughness: 0.1,
          reflectivity: isLowPerformance ? 0.5 : 0.8,
          envMapIntensity: isLowPerformance ? 0.8 : 1.2,
        });
      });

      const cube = new THREE.Mesh(geometry, materials);
      cube.castShadow = !isLowPerformance;
      cube.receiveShadow = !isLowPerformance;
      scene.add(cube);
      cubeRef.current = cube;

      // Camera positioning
      const distance = cubeSize * 1.8;
      camera.position.set(0, 0, distance);
      camera.lookAt(0, 0, 0);

      // Lighting
      <spotLight 
            position={[5, 10, 5]} 
            angle={0.5} 
            penumbra={0.8} 
            intensity={25} 
            color="#f1c0e8" 
          />

      // Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = true;
      controls.minDistance = distance * 0.7;
      controls.maxDistance = distance * 2;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1;
      controlsRef.current = controls;

      // Auto-rotate pause on interaction
      const onStart = () => {
        controls.autoRotate = false;
        if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
      };
      
      const onEnd = () => {
        timeoutIdRef.current = setTimeout(() => {
          if (controlsRef.current) {
            controlsRef.current.autoRotate = true;
          }
        }, 3000);
      };

      controls.addEventListener("start", onStart);
      controls.addEventListener("end", onEnd);

      // Animation loop with FPS limiting
      let lastTime = 0;
      const targetFPS = isLowPerformance ? 30 : 60;
      const frameInterval = 1000 / targetFPS;

      const animate = (currentTime) => {
        if (!isMounted || !rendererRef.current) return;
        
        if (currentTime - lastTime >= frameInterval) {
          controls.update();
          renderer.render(scene, camera);
          lastTime = currentTime;
        }
        
        animationFrameRef.current = requestAnimationFrame(animate);
      };

      // Resize handler
      const handleResize = () => {
        if (!isMounted || !container) return;
        
        const newRect = container.getBoundingClientRect();
        const newCubeSize = Math.min(newRect.width, newRect.height) / 12;
        
        // Update geometry
        cube.geometry.dispose();
        cube.geometry = new THREE.BoxGeometry(newCubeSize, newCubeSize, newCubeSize);
        
        // Update camera
        camera.aspect = newRect.width / newRect.height;
        camera.updateProjectionMatrix();
        
        // Update renderer
        renderer.setSize(newRect.width, newRect.height);
        
        // Update camera position
        const newDistance = newCubeSize * 2.5;
        camera.position.setZ(newDistance);
        controls.minDistance = newDistance * 0.7;
        controls.maxDistance = newDistance * 2;
      };

      window.addEventListener("resize", handleResize);

      // Start animation
      animationFrameRef.current = requestAnimationFrame(animate);
      setIsLoaded(true);

      // Cleanup
      return () => {
        isMounted = false;
        window.removeEventListener("resize", handleResize);
        
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
        }
        
        controls.removeEventListener("start", onStart);
        controls.removeEventListener("end", onEnd);
        controls.dispose();
        
        if (container && renderer.domElement) {
          container.removeChild(renderer.domElement);
        }
        
        // Dispose materials and geometry
        materials.forEach((material) => {
          if (material.map) material.map.dispose();
          material.dispose();
        });
        geometry.dispose();
        
        renderer.dispose();
        
        // Clear refs
        sceneRef.current = null;
        rendererRef.current = null;
        cubeRef.current = null;
        controlsRef.current = null;
      };

    } catch (err) {
      console.error("3D scene initialization failed:", err);
      setError(true);
    }
  }, [isInView, isLowPerformance, generateCanvasTexture, setupLighting]);

  // Fallback UI for errors or low-performance devices
  if (error || (isLowPerformance && !isLoaded)) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-deep_indigo to-dark_teal rounded-2xl border border-jordy_blue/20">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-gradient-to-br from-jordy_blue to-aquamarine rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-heading text-champagne_pink mb-2">
            {error ? "Unable to Load 3D Experience" : "Loading Testimonials..."}
          </h3>
          <p className="text-champagne_pink/70 text-sm font-description">
            {error ? "Please refresh the page or try on a different device" : "Optimizing for your device..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative"
      style={{ minHeight: "400px" }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-deep_indigo/50 to-dark_teal/50 rounded-2xl backdrop-blur-sm">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-jordy_blue border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-champagne_pink font-description">Initializing 3D testimonials...</p>
          </div>
        </div>
      )}
    </div>
  );
});

// Optimized Text Content Component
const TextContent = memo(() => {
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: false, margin: "-50px" });

  useEffect(() => {
    if (!textRef.current || !isInView) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current.children,
        {
          opacity: 0,
          y: 50,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.3
        }
      );
    }, textRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <div ref={textRef} className="space-y-6">
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-heading text-transparent bg-gradient-to-r from-aquamarine via-jordy_blue to-tea_rose bg-clip-text leading-tight"
        style={{ 
          backgroundSize: "200% 200%",
          animation: "gradient-move 8s ease infinite"
        }}
      >
        Insights from My Closest Mentors
      </motion.h1>
      
      <motion.div
        className="w-20 h-1 bg-gradient-to-r from-tea_rose to-aquamarine rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      
      <motion.p
        className="text-lg md:text-xl font-description leading-relaxed tracking-wide text-lemon_chiffon/90 max-w-2xl"
      >
        Highlighting my journey, character, and achievements through the eyes of those who know me best.
      </motion.p>
      
      <motion.div
        className="pt-4"
      >
        <div className="flex flex-wrap gap-2">
          {["Dedication", "Excellence", "Innovation", "Curiosity", "Passion", "Understanding"].map((trait, index) => (
            <motion.span
              key={trait}
              className="px-4 py-2 bg-gradient-to-r from-jordy_blue/20 to-aquamarine/20 border border-jordy_blue/30 rounded-full text-sm font-description text-champagne_pink backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(163, 196, 243, 0.1)"
              }}
            >
              {trait}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
});

// Main Testimonials Component
const Testimonials = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef(null);
  const resizeTimeoutRef = useRef(null);

  // Responsive detection with debounce
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        setIsMobile(window.innerWidth < 1024);
      }, 150);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
    };
  }, []);

  // Initialize loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Parallax background effect
  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      gsap.to(sectionRef.current, {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-deep_indigo to-dark_teal">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="animate-spin w-12 h-12 border-4 border-aquamarine border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-lemon_chiffon text-lg font-description">Loading testimonials...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.section
      ref={sectionRef}
      id="testimonials"
      className="relative min-h-screen bg-gradient-to-b from-deep_indigo via-dark_teal to-purple-900 overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at top left, rgba(163, 196, 243, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at bottom right, rgba(152, 245, 225, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at center, rgba(241, 192, 232, 0.05) 0%, transparent 70%)
        `,
        backgroundSize: "100% 100%",
        backgroundPosition: "50% 0%"
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-jordy_blue to-aquamarine rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20],
              x: [-10, 10],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className={`
        relative z-10 container mx-auto px-4 py-12 lg:py-20 h-full
        ${isMobile ? "flex flex-col space-y-12" : "flex items-center justify-center lg:space-x-12"}
      `}>
        {/* 3D Cube Section */}
        <motion.div
          className={`${isMobile ? "w-full h-96" : "w-full lg:w-7/12 h-[600px] lg:h-[700px]"}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <TestimonialCube />
        </motion.div>

        {/* Text Content Section */}
        <motion.div
          className={`${isMobile ? "w-full" : "w-full lg:w-5/12"} flex items-center`}
          initial={{ opacity: 0, x: isMobile ? 0 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <div className="w-full">
            <TextContent />
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900 to-transparent pointer-events-none" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-jordy_blue/10 to-transparent rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-aquamarine/10 to-transparent rounded-full blur-xl" />
    </motion.section>
  );
};

export default memo(Testimonials);