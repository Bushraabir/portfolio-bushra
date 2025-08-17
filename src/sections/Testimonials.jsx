"use client";

import { useEffect, useRef, useState, useCallback, memo } from "react";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { motion, useInView, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import hdr from "../assets/testimonial.hdr";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Testimonials data with enhanced metadata for SEO and theming
 * Each testimonial includes structured data for better search engine understanding
 */
const testimonials = [
  {
    quote: "During breaks at noon, I often see her studying in the library. If it's closed—even forcefully—she finds a spot on the stairs or anywhere else. She even skips meals to save time for studying.",
    name: "Md. Shishir Saidy",
    designation: "Lecturer, Dept. of English, MCSK",
    theme: "dedication",
    icon: "📚",
    institution: "MCSK",
    department: "English",
    keywords: ["dedication", "studying", "commitment", "academic excellence"]
  },
  {
    quote: "She was one of the first students to be so active in Olympiads, securing 1st place in Jessore in the Physics Olympiad. Her academic scores in STEM are nearly 100%, and she constantly asks thought-provoking questions.",
    name: "Md. Jahangir Hossain",
    designation: "Associate Professor, Dept. of Physics, MCSK",
    theme: "excellence",
    icon: "🏆",
    institution: "MCSK",
    department: "Physics",
    keywords: ["excellence", "olympiad", "physics", "STEM", "achievement"]
  },
  {
    quote: "I have had the privilege of teaching Bushra, and her academic excellence has consistently stood out in my class. She approaches complex subjects with both curiosity and clarity, making her an asset during discussions. Her proactive engagement and dedication have enriched our learning environment. In particular, I have observed her ability to derive different physics equations swiftly, demonstrating a deep and intuitive understanding of the subject. Her grasp of complex concepts and problem-solving skills set her apart, and I am confident that she will bring the same enthusiasm and rigor to her university studies.",
    name: "Ifat Al Karim Shaikot",
    designation: "Lecturer, Dept. Of Physics, KU",
    theme: "understanding",
    icon: "🧠",
    institution: "KU",
    department: "Physics",
    keywords: ["understanding", "physics", "problem-solving", "academic excellence"]
  },
  {
    quote: "Bushra has demonstrated exceptional analytical skills and an innovative mindset in every project she undertakes. Her ability to connect theoretical concepts with practical applications has significantly elevated our classroom debates. She works well both independently and collaboratively, often leading by example. I wholeheartedly support her scholarship application, knowing she will excel in any academic setting.",
    name: "Dr. K. M. Salim Reza",
    designation: "Associate Professor, Dept. of Chemistry, MCSK",
    theme: "innovation",
    icon: "💡",
    institution: "MCSK",
    department: "Chemistry",
    keywords: ["innovation", "analytical skills", "chemistry", "leadership"]
  },
  {
    quote: "Throughout my time teaching Bushra, she has impressed me with her perseverance and intellectual curiosity. She consistently seeks out new challenges and approaches them with a thoughtful and creative perspective. Her contributions to class discussions not only reflect deep understanding but also inspire her peers. I am proud to recommend Bushra for this scholarship as she is truly deserving of this opportunity.",
    name: "Md. Enayet Hossain",
    designation: "Demonstrator, Dept. of Physics, MCSK",
    theme: "curiosity",
    icon: "🔍",
    institution: "MCSK",
    department: "Physics",
    keywords: ["curiosity", "perseverance", "creativity", "inspiration"]
  },
  {
    quote: "Bushra is a dedicated and motivated student whose passion for learning is evident in every assignment. Her ability to synthesize complex algorithm and present it clearly has made a lasting impact on our classroom dynamic. She balances academic rigor with active participation, often taking initiative in group projects. I am confident that Bushra's drive and commitment will make her an excellent candidate for this scholarship.",
    name: "Partha Chowdhury",
    designation: "Lecturer, Dept. of ICT, MCSK",
    theme: "passion",
    icon: "🔥",
    institution: "MCSK",
    department: "ICT",
    keywords: ["passion", "algorithms", "ICT", "leadership", "motivation"]
  },
];

/**
 * Theme configurations for consistent styling across testimonial cards
 * Each theme has its own color palette, gradients, and visual identity
 */
const themeConfigs = {
  dedication: {
    gradient: "from-amber-400 via-orange-500 to-red-500",
    bgGradient: "from-amber-50/10 via-orange-100/5 to-red-100/10",
    border: "border-amber-400/30",
    shadow: "shadow-amber-500/20",
    textAccent: "text-amber-400",
    iconBg: "bg-amber-400/20",
    hoverGradient: "hover:from-amber-300 hover:via-orange-400 hover:to-red-400",
    description: "Unwavering commitment to academic excellence"
  },
  excellence: {
    gradient: "from-blue-400 via-indigo-500 to-purple-600",
    bgGradient: "from-blue-50/10 via-indigo-100/5 to-purple-100/10",
    border: "border-blue-400/30",
    shadow: "shadow-blue-500/20",
    textAccent: "text-blue-400",
    iconBg: "bg-blue-400/20",
    hoverGradient: "hover:from-blue-300 hover:via-indigo-400 hover:to-purple-500",
    description: "Outstanding academic performance and achievements"
  },
  understanding: {
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    bgGradient: "from-emerald-50/10 via-teal-100/5 to-cyan-100/10",
    border: "border-emerald-400/30",
    shadow: "shadow-emerald-500/20",
    textAccent: "text-emerald-400",
    iconBg: "bg-emerald-400/20",
    hoverGradient: "hover:from-emerald-300 hover:via-teal-400 hover:to-cyan-500",
    description: "Deep comprehension of complex academic concepts"
  },
  innovation: {
    gradient: "from-violet-400 via-purple-500 to-fuchsia-600",
    bgGradient: "from-violet-50/10 via-purple-100/5 to-fuchsia-100/10",
    border: "border-violet-400/30",
    shadow: "shadow-violet-500/20",
    textAccent: "text-violet-400",
    iconBg: "bg-violet-400/20",
    hoverGradient: "hover:from-violet-300 hover:via-purple-400 hover:to-fuchsia-500",
    description: "Creative problem-solving and innovative thinking"
  },
  curiosity: {
    gradient: "from-pink-400 via-rose-500 to-red-600",
    bgGradient: "from-pink-50/10 via-rose-100/5 to-red-100/10",
    border: "border-pink-400/30",
    shadow: "shadow-pink-500/20",
    textAccent: "text-pink-400",
    iconBg: "bg-pink-400/20",
    hoverGradient: "hover:from-pink-300 hover:via-rose-400 hover:to-red-500",
    description: "Intellectual curiosity and love for learning"
  },
  passion: {
    gradient: "from-orange-400 via-red-500 to-pink-600",
    bgGradient: "from-orange-50/10 via-red-100/5 to-pink-100/10",
    border: "border-orange-400/30",
    shadow: "shadow-orange-500/20",
    textAccent: "text-orange-400",
    iconBg: "bg-orange-400/20",
    hoverGradient: "hover:from-orange-300 hover:via-red-400 hover:to-pink-500",
    description: "Passionate dedication to academic pursuits"
  }
};

/**
 * Utility function to wrap text for canvas rendering
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {string} text - Text to wrap
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} maxWidth - Maximum width for wrapping
 * @param {number} lineHeight - Height between lines
 */
const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
  const words = text.split(" ");
  let line = "";
  let currentY = y;
  
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + " ";
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && i > 0) {
      ctx.fillText(line, x, currentY);
      line = words[i] + " ";
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
};

/**
 * Interactive Testimonial Card Component
 * Renders individual testimonials with theme-based styling and animations
 * 
 * @param {Object} testimonial - Testimonial data object
 * @param {number} index - Card index for staggered animations
 * @returns {JSX.Element} Animated testimonial card
 */
const TestimonialCard = memo(({ testimonial, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const theme = themeConfigs[testimonial.theme];

  // Generate structured data for SEO
  const structuredData = {
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5"
    },
    "author": {
      "@type": "Person",
      "name": testimonial.name,
      "jobTitle": testimonial.designation,
      "worksFor": {
        "@type": "Organization",
        "name": testimonial.institution
      }
    },
    "reviewBody": testimonial.quote,
    "datePublished": new Date().toISOString(),
    "publisher": {
      "@type": "Person",
      "name": "Bushra"
    }
  };

  return (
    <motion.article
      ref={cardRef}
      className={`group relative overflow-hidden rounded-2xl border-2 ${theme.border} bg-gradient-to-br ${theme.bgGradient} backdrop-blur-xl transition-all duration-700 hover:scale-105 ${theme.shadow} hover:shadow-2xl`}
      initial={{ opacity: 0, y: 100, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        type: "spring",
        damping: 20,
        stiffness: 100
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        rotateY: 5,
        rotateX: 5,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      whileTap={{ scale: 0.98 }}
      style={{ transformStyle: "preserve-3d" }}
      itemScope
      itemType="https://schema.org/Review"
      role="article"
      aria-label={`Testimonial from ${testimonial.name} about ${testimonial.theme}`}
    >
      {/* SEO structured data */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} 
      />

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`particle-${index}-${i}`}
            className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${theme.gradient} opacity-20`}
            style={{ 
              left: `${20 + i * 15}%`, 
              top: `${10 + i * 20}%`,
            }}
            animate={{
              y: isHovered ? [-5, 5] : [0],
              x: isHovered ? [-3, 3] : [0],
              scale: isHovered ? [1, 1.2, 1] : [1],
              opacity: isHovered ? [0.2, 0.4, 0.2] : [0.2]
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      {/* Gradient border animation */}
      <motion.div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
        animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 3, ease: "linear", repeat: isHovered ? Infinity : 0 }}
        aria-hidden="true"
      />

      {/* Content container */}
      <div className="relative z-10 p-8 h-full flex flex-col">
        {/* Header with icon and theme */}
        <header className="flex items-center justify-between mb-6">
          <motion.div 
            className={`w-16 h-16 rounded-2xl ${theme.iconBg} backdrop-blur-sm flex items-center justify-center text-2xl shadow-lg`}
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6, type: "spring" }}
            role="img"
            aria-label={`${testimonial.theme} icon`}
          >
            {testimonial.icon}
          </motion.div>
          <div 
            className={`px-4 py-2 rounded-full bg-gradient-to-r ${theme.gradient} text-white text-sm font-bold uppercase tracking-wider shadow-lg`}
            title={theme.description}
          >
            {testimonial.theme}
          </div>
        </header>

        {/* Quote with semantic markup */}
        <motion.blockquote 
          className="flex-1 mb-8 relative"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
          itemProp="reviewBody"
        >
          <div 
            className={`absolute -top-2 -left-2 text-6xl ${theme.textAccent} opacity-20 font-serif`}
            aria-hidden="true"
          >
            "
          </div>
          <p className="text-lemon_chiffon/90 text-base leading-relaxed font-description relative z-10 pl-6">
            {testimonial.quote}
          </p>
          <div 
            className={`absolute -bottom-4 -right-2 text-6xl ${theme.textAccent} opacity-20 font-serif rotate-180`}
            aria-hidden="true"
          >
            "
          </div>
        </motion.blockquote>

        {/* Author info with semantic markup */}
        <motion.footer 
          className="space-y-3"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          itemScope
          itemType="https://schema.org/Person"
        >
          <div className={`h-0.5 w-12 bg-gradient-to-r ${theme.gradient} rounded-full group-hover:w-20 transition-all duration-500`} />
          
          <h4 
            className={`font-heading text-lg ${theme.textAccent} font-bold tracking-wide`}
            itemProp="name"
          >
            {testimonial.name}
          </h4>
          
          <p 
            className="text-champagne_pink/80 text-sm font-description leading-snug"
            itemProp="jobTitle"
          >
            {testimonial.designation}
          </p>

          {/* Keywords for SEO (hidden) */}
          <div className="sr-only">
            <span itemProp="keywords">{testimonial.keywords.join(", ")}</span>
            <span itemProp="worksFor">{testimonial.institution}</span>
          </div>
        </motion.footer>

        {/* Interactive corner accent */}
        <motion.div
          className={`absolute top-4 right-4 w-3 h-3 rounded-full bg-gradient-to-r ${theme.gradient}`}
          animate={isHovered ? { 
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          } : {}}
          transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
          aria-hidden="true"
        />

        {/* Bottom gradient line */}
        <motion.div
          className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${theme.gradient} transition-all duration-500`}
          initial={{ width: "0%" }}
          animate={isInView ? { width: "100%" } : { width: "0%" }}
          transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
          aria-hidden="true"
        />
      </div>

      {/* Glass morphism overlay */}
      <div 
        className="absolute inset-0 bg-white/5 backdrop-blur-3xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
        aria-hidden="true"
      />
    </motion.article>
  );
});

TestimonialCard.displayName = "TestimonialCard";

/**
 * Testimonial Cards Grid Component
 * Renders a responsive grid of testimonial cards with proper accessibility
 * 
 * @returns {JSX.Element} Grid of testimonial cards
 */
const TestimonialCardsGrid = memo(() => {
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: false, margin: "-100px" });

  return (
    <motion.section 
      ref={gridRef}
      className="w-full max-w-7xl mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, type: "spring", damping: 20 }}
      role="region"
      aria-label="Testimonial cards"
    >
      {/* Grid header */}
      <motion.header 
        className="text-center mb-12"
        initial={{ y: -50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h3 className="text-2xl md:text-3xl font-heading text-transparent bg-gradient-to-r from-aquamarine via-jordy_blue to-tea_rose bg-clip-text mb-4">
          What My Mentors Say
        </h3>
        <div className="w-24 h-1 bg-gradient-to-r from-tea_rose to-aquamarine rounded-full mx-auto" />
      </motion.header>

      {/* Cards grid with proper accessibility */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        role="list"
      >
        <AnimatePresence mode="wait">
          {testimonials.map((testimonial, index) => (
            <div 
              key={`testimonial-${testimonial.theme}-${index}`}
              role="listitem"
            >
              <TestimonialCard 
                testimonial={testimonial} 
                index={index}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>

      {/* Interactive background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`bg-particle-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-jordy_blue to-aquamarine rounded-full opacity-20"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%` 
            }}
            animate={{ 
              y: [-30, 30], 
              x: [-15, 15], 
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{ 
              duration: 4 + Math.random() * 3, 
              repeat: Infinity, 
              repeatType: "reverse", 
              delay: Math.random() * 2 
            }}
          />
        ))}
      </div>
    </motion.section>
  );
});

TestimonialCardsGrid.displayName = "TestimonialCardsGrid";

/**
 * 3D Testimonial Cube Component
 * Renders an interactive 3D cube with testimonials as textures
 * Falls back to cards on low-performance devices
 * 
 * @returns {JSX.Element} 3D cube or fallback cards
 */
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
  const [showFallback, setShowFallback] = useState(false);

  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  /**
   * Detect device performance capabilities
   * Determines if device can handle 3D rendering
   */
  useEffect(() => {
    const detectPerformance = () => {
      const isLowEnd = (
        window.innerWidth < 768 ||
        (navigator.deviceMemory && navigator.deviceMemory < 4) ||
        (navigator.connection && (
          navigator.connection.downlink < 2.5 ||
          navigator.connection.effectiveType?.includes("2g")
        )) ||
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      );
      
      setIsLowPerformance(isLowEnd);
      if (isLowEnd) {
        setShowFallback(true);
      }
    };
    
    detectPerformance();
  }, []);

  /**
   * Generate canvas texture for each cube face
   * Creates high-quality textures with testimonial content
   * 
   * @param {Object} testimonial - Testimonial data
   * @param {number} size - Canvas size (default: 512px)
   * @returns {THREE.CanvasTexture|null} Generated texture or null on error
   */
  const generateCanvasTexture = useCallback((testimonial, size = 512) => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#1a1a2e");
      gradient.addColorStop(1, "#16213e");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Theme-based accent colors
      const themeColors = {
        dedication: "#fbbf24",
        excellence: "#3b82f6",
        understanding: "#10b981",
        innovation: "#8b5cf6",
        curiosity: "#ec4899",
        passion: "#f97316",
      };
      const accentColor = themeColors[testimonial.theme] || "#fbbf24";

      // Quote text rendering
      ctx.fillStyle = "#f1f5f9";
      ctx.font = `${size < 384 ? "bold 11px" : "bold 16px"} 'Playfair Display', serif`;
      ctx.textAlign = "center";
      const maxWidth = canvas.width * 0.85;
      const lineHeight = size < 384 ? 18 : 24;
      wrapText(ctx, testimonial.quote, canvas.width / 2, size * 0.15, maxWidth, lineHeight);

      // Author name
      ctx.fillStyle = accentColor;
      ctx.font = `${size < 384 ? "italic 10px" : "italic 14px"} 'Jura', sans-serif`;
      ctx.fillText(testimonial.name, canvas.width / 2, canvas.height * 0.75);

      // Designation
      ctx.font = `${size < 384 ? "8px" : "12px"} 'Jura', sans-serif`;
      ctx.fillText(testimonial.designation, canvas.width / 2, canvas.height * 0.75 + (size < 384 ? 20 : 28));

      // Decorative border
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 2;
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

      return new THREE.CanvasTexture(canvas);
    } catch (err) {
      console.error("Canvas texture generation failed:", err);
      return null;
    }
  }, []);

  /**
   * Initialize Three.js Scene
   * Sets up 3D environment with proper error handling and cleanup
   */
  useEffect(() => {
    if (!containerRef.current || !isInView || error || showFallback || isLowPerformance) return;

    let isMounted = true;

    try {
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      // Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Camera configuration
      const camera = new THREE.PerspectiveCamera(60, rect.width / rect.height, 0.1, 1000);

      // Renderer setup with performance optimization
      const renderer = new THREE.WebGLRenderer({
        antialias: !isLowPerformance,
        alpha: true,
        powerPreference: isLowPerformance ? "low-power" : "high-performance",
      });
      renderer.setSize(rect.width, rect.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isLowPerformance ? 1.5 : 2));
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.shadowMap.enabled = !isLowPerformance;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      rendererRef.current = renderer;
      container.appendChild(renderer.domElement);

      // HDR environment loading
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
          (err) => {
            console.warn("HDR loading failed, using fallback:", err);
            scene.background = new THREE.Color(0x1a1a2e);
          }
        );
      } else {
        scene.background = new THREE.Color(0x1a1a2e);
      }

      // Cube geometry and materials
      const cubeSize = Math.min(rect.width, rect.height) / 12;
      const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

      const materials = testimonials.map((testimonial) =>
        new THREE.MeshPhysicalMaterial({
          map: generateCanvasTexture(testimonial, isLowPerformance ? 256 : 512),
          color: 0xffffff,
          roughness: isLowPerformance ? 0.4 : 0.2,
          metalness: isLowPerformance ? 0.6 : 0.8,
          clearcoat: isLowPerformance ? 0 : 1,
          clearcoatRoughness: 0.1,
          reflectivity: isLowPerformance ? 0.5 : 0.8,
          envMapIntensity: isLowPerformance ? 0.8 : 1.2,
        })
      );

      const cube = new THREE.Mesh(geometry, materials);
      cube.castShadow = !isLowPerformance;
      cube.receiveShadow = !isLowPerformance;
      scene.add(cube);
      cubeRef.current = cube;

      // Camera positioning
      const distance = cubeSize * 1.8;
      camera.position.set(0, 0, distance);

      // Orbit controls setup
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = true;
      controls.minDistance = distance * 0.7;
      controls.maxDistance = distance * 2;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1;
      controlsRef.current = controls;

      // Auto-rotation pause on interaction
      const onStart = () => {
        controls.autoRotate = false;
        if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
      };
      
      const onEnd = () => {
        timeoutIdRef.current = setTimeout(() => {
          if (controlsRef.current) controlsRef.current.autoRotate = true;
        }, 3000);
      };
      
      controls.addEventListener("start", onStart);
      controls.addEventListener("end", onEnd);

      // Animation loop with performance optimization
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

      // Responsive resize handler
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

        // Update controls
        const newDistance = newCubeSize * 2.5;
        camera.position.setZ(newDistance);
        controls.minDistance = newDistance * 0.7;
        controls.maxDistance = newDistance * 2;
      };

      // Event listeners and initialization
      window.addEventListener("resize", handleResize);
      animationFrameRef.current = requestAnimationFrame(animate);
      setIsLoaded(true);

      // Cleanup function
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
        
        materials.forEach((material) => {
          if (material.map) material.map.dispose();
          material.dispose();
        });
        
        geometry.dispose();
        renderer.dispose();
      };
    } catch (err) {
      console.error("3D scene initialization failed:", err);
      setError(true);
      setShowFallback(true);
    }
  }, [isInView, isLowPerformance, generateCanvasTexture, showFallback, error]);

  // Show fallback cards for low-performance devices or errors
  if (showFallback || error || isLowPerformance) {
    return <TestimonialCardsGrid />;
  }

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative" 
      style={{ minHeight: "400px" }}
      role="region"
      aria-label="Interactive 3D testimonials cube"
    >
      {!isLoaded && (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-deep_indigo to-dark_teal rounded-2xl border border-jordy_blue/20">
          <motion.div 
            className="text-center p-8"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div 
              className="w-12 h-12 border-4 border-jordy_blue/30 border-t-jordy_blue rounded-full animate-spin mx-auto mb-4"
              role="status"
              aria-label="Loading"
            />
            <h3 className="text-xl font-heading text-champagne_pink mb-2">
              Loading 3D Experience...
            </h3>
            <p className="text-champagne_pink/70 text-sm font-description">
              Preparing interactive testimonials
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
});

TestimonialCube.displayName = "TestimonialCube";

/**
 * Textual Content Component
 * Renders the main heading and description with animations
 * 
 * @returns {JSX.Element} Animated text content
 */
const TextContent = memo(() => {
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: false, margin: "-50px" });

  useEffect(() => {
    if (!textRef.current || !isInView) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, y: 50, scale: 0.95 },
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
    <article ref={textRef} className="space-y-6">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-heading text-transparent bg-gradient-to-r from-aquamarine via-jordy_blue to-tea_rose bg-clip-text leading-tight">
        Insights from My Closest Mentors
      </h1>
      
      <div 
        className="w-20 h-1 bg-gradient-to-r from-tea_rose to-aquamarine rounded-full" 
        aria-hidden="true"
      />
      
      <p className="text-lg md:text-xl font-description leading-relaxed tracking-wide text-lemon_chiffon/90 max-w-2xl">
        Highlighting my journey, character, and achievements through the eyes of those who know me best.
      </p>
      
      
    </article>
  );
});

TextContent.displayName = "TextContent";

/**
 * Main Testimonials Section Component
 * Orchestrates the entire testimonials section with responsive behavior
 * 
 * @returns {JSX.Element} Complete testimonials section
 */
const Testimonials = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const sectionRef = useRef(null);

  // Responsive detection with performance considerations
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      
      // Force cards view on very small screens
      if (window.innerWidth < 768) {
        setShowCards(true);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * Toggle between 3D and card view
   */
  const toggleView = () => {
    setShowCards(!showCards);
  };

  // Generate structured data for the entire section
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Academic Testimonials for Bushra",
    "description": "Professional testimonials highlighting academic excellence, dedication, and achievements",
    "numberOfItems": testimonials.length,
    "itemListElement": testimonials.map((testimonial, index) => ({
      "@type": "Review",
      "position": index + 1,
      "name": `Testimonial from ${testimonial.name}`,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": testimonial.name,
        "jobTitle": testimonial.designation
      },
      "reviewBody": testimonial.quote,
      "about": {
        "@type": "Person",
        "name": "Bushra"
      }
    }))
  };

  return (
    <>
      {/* SEO structured data */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} 
      />
      
      <section
        id="testimonials"
        ref={sectionRef}
        className="relative min-h-screen bg-gradient-to-b from-deep_indigo via-dark_teal to-purple-900 overflow-hidden"
        role="main"
        aria-label="Testimonials from Academic Mentors"
      >
        {/* Enhanced background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={`bg-particle-main-${i}`}
              className="absolute w-1 h-1 bg-gradient-to-r from-jordy_blue to-aquamarine rounded-full opacity-30"
              style={{ 
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%`,
                filter: 'blur(0.5px)'
              }}
              animate={{ 
                y: [-20, 20], 
                x: [-10, 10], 
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.5, 1]
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

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`geometric-shape-${i}`}
              className="absolute opacity-10"
              style={{
                left: `${20 + (i * 12)}%`,
                top: `${15 + (i * 10)}%`,
                width: `${20 + (i * 5)}px`,
                height: `${20 + (i * 5)}px`,
              }}
              animate={{
                rotate: [0, 360],
                y: [-10, 10],
                x: [-5, 5],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5,
              }}
            >
              <div className={`w-full h-full ${
                i % 3 === 0 ? 'bg-aquamarine' : 
                i % 3 === 1 ? 'bg-jordy_blue' : 'bg-tea_rose'
              } ${
                i % 2 === 0 ? 'rounded-full' : 'rounded-lg rotate-45'
              }`} />
            </motion.div>
          ))}
        </div>


        {/* Main content container */}
        <div className={`relative z-10 container mx-auto px-4 py-12 lg:py-20 h-full ${
          (isMobile || showCards) ? 
            "flex flex-col space-y-12" : 
            "flex items-center justify-center lg:space-x-12"
        }`}>
          {/* Conditional rendering based on view mode */}
          {showCards || isMobile ? (
            <>
              {/* Text content for card view */}
              <div className="w-full text-center mb-12">
                <TextContent />
              </div>
              {/* Cards grid */}
              <div className="w-full">
                <TestimonialCardsGrid />
              </div>
            </>
          ) : (
            <>
              {/* 3D cube view layout */}
              <div className="w-full lg:w-7/12 h-[700px]">
                <TestimonialCube />
              </div>
              <div className="w-full lg:w-5/12 flex items-center">
                <TextContent />
              </div>
              <div>
                        {/* View toggle button (desktop only) */}
                {!isMobile && (
                  <motion.button
                    onClick={toggleView}
                    className=" relative top-24 left-20 z-50 px-4 py-2 bg-gradient-to-r from-jordy_blue to-aquamarine text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-aquamarine/50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    aria-label={`Switch to ${showCards ? "3D view" : "card view"}`}
                  >
                   {showCards ? "3D View" : "Card View"}
                  </motion.button>
                )}

              </div>
            </>
          )}

          
        </div>

        

        {/* Gradient overlays for depth */}
        <div 
          className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-deep_indigo/50 to-transparent pointer-events-none" 
          aria-hidden="true"
        />
        <div 
          className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-900/50 to-transparent pointer-events-none" 
          aria-hidden="true"
        />
      </section>
    </>
  );
};

export default memo(Testimonials);