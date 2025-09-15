import React, { useState, useEffect, useRef, memo, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from "framer-motion";

/**
 * Website Showcase Component
 * 
 * An interactive web development gallery showcasing modern applications
 * built with cutting-edge technologies and innovative design patterns.
 * 
 * Features:
 * - High-performance animations with Framer Motion
 * - Responsive design optimized for all devices
 * - Accessible interaction patterns with ARIA labels
 * - SEO-optimized with semantic HTML structure
 * - Progressive image loading with error handling
 * - Advanced hover effects and micro-interactions
 * 
 * Technical Implementation:
 * - React 18+ with modern hooks and patterns
 * - Framer Motion for physics-based animations
 * - Intersection Observer API for scroll-triggered effects
 * - Custom Tailwind CSS configuration with design tokens
 * - Performance optimization with memo and useCallback
 * 
 * @component
 * @example
 * <Website />
 */

// Utility Icons Components
const GithubIcon = memo(() => (
  <svg 
    className="w-5 h-5" 
    fill="currentColor" 
    viewBox="0 0 24 24" 
    aria-hidden="true"
    role="img"
    aria-label="GitHub"
  >
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
));

const ExternalLinkIcon = memo(() => (
  <svg 
    className="w-4 h-4 sm:w-5 sm:h-5" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    aria-hidden="true"
    role="img"
    aria-label="External Link"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
));

const ChevronDownIcon = memo(() => (
  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
  </svg>
));

const PlayIcon = memo(() => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 5v14l11-7z"/>
  </svg>
));

// Import all website screenshots (kept original paths)
import emp1 from "../assets/Website/EmpEd/1.png";
import emp2 from "../assets/Website/EmpEd/2.png";
import emp3 from "../assets/Website/EmpEd/3.png";
import emp4 from "../assets/Website/EmpEd/4.png";
import emp5 from "../assets/Website/EmpEd/5.png";
import emp6 from "../assets/Website/EmpEd/6.png";

import PeriodicTableVisualiser1 from "../assets/Website/PeriodicTableVisualiser/1.png";
import PeriodicTableVisualiser2 from "../assets/Website/PeriodicTableVisualiser/2.png";
import PeriodicTableVisualiser3 from "../assets/Website/PeriodicTableVisualiser/3.png";
import PeriodicTableVisualiser4 from "../assets/Website/PeriodicTableVisualiser/4.png";
import PeriodicTableVisualiser5 from "../assets/Website/PeriodicTableVisualiser/5.png";
import PeriodicTableVisualiser6 from "../assets/Website/PeriodicTableVisualiser/6.png";

import StudyBuddy1 from "../assets/Website/StudyBuddy/1.png";
import StudyBuddy2 from "../assets/Website/StudyBuddy/2.png";
import StudyBuddy3 from "../assets/Website/StudyBuddy/3.png";
import StudyBuddy4 from "../assets/Website/StudyBuddy/4.png";
import StudyBuddy5 from "../assets/Website/StudyBuddy/5.png";
import StudyBuddy6 from "../assets/Website/StudyBuddy/6.png";
import StudyBuddy7 from "../assets/Website/StudyBuddy/7.png";
import StudyBuddy8 from "../assets/Website/StudyBuddy/8.png";

import Space1 from "../assets/Website/Space/1.png";
import Space2 from "../assets/Website/Space/2.png";
import Space3 from "../assets/Website/Space/3.png";

import Tube1 from "../assets/Website/EmpTube/1.png";

import relevia1 from "../assets/Website/relevia/1.png";
import relevia2 from "../assets/Website/relevia/2.png";
import relevia3 from "../assets/Website/relevia/3.png";
import relevia4 from "../assets/Website/relevia/4.png";
import relevia5 from "../assets/Website/relevia/5.png";
import relevia6 from "../assets/Website/relevia/6.png";
import relevia7 from "../assets/Website/relevia/7.png";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Website Showcase Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 sm:p-8">
          <div className="text-center text-amber-100 max-w-md">
            <h2 className="text-xl sm:text-2xl font-bold font-sans mb-4">Something went wrong</h2>
            <p className="text-cyan-300 font-sans mb-6 text-sm sm:text-base">
              We're sorry, but there was an error loading the website showcase.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-sm sm:text-base"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Scroll Progress Indicator
const ScrollProgress = memo(() => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 origin-left z-50 shadow-lg"
      style={{ scaleX }}
      role="progressbar"
      aria-label="Page scroll progress"
    />
  );
});

ScrollProgress.displayName = 'ScrollProgress';

// Animated Background Elements
const BackgroundOrbs = memo(() => {
  const orbs = useMemo(() => 
    Array.from({ length: 4 }, (_, i) => ({
      id: i,
      size: Math.random() * 200 + 150,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 20,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full opacity-5 sm:opacity-10"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${
              orb.id % 3 === 0 
                ? '#67e8f9' 
                : orb.id % 3 === 1 
                  ? '#60a5fa' 
                  : '#a78bfa'
            } 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        />
      ))}
    </div>
  );
});

BackgroundOrbs.displayName = 'BackgroundOrbs';

// Text Animation Component
const AnimatedText = memo(({ children, delay = 0, className = "", duration = 0.8 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        initial={{ y: 30, opacity: 0, rotateX: 10 }}
        animate={isInView ? { y: 0, opacity: 1, rotateX: 0 } : {}}
        transition={{ 
          duration, 
          delay, 
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {children}
      </motion.div>
    </div>
  );
});

AnimatedText.displayName = 'AnimatedText';

// Enhanced Magnetic Button
const MagneticButton = memo(({ children, className = "", href, onClick, ...props }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current || window.innerWidth < 768) return; // Disable on mobile
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const deltaX = (e.clientX - centerX) * 0.1;
    const deltaY = (e.clientY - centerY) * 0.1;
    
    setPosition({ x: deltaX, y: deltaY });
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (window.innerWidth >= 768) setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  }, []);

  const Component = href ? 'a' : 'button';

  return (
    <Component
      ref={ref}
      className={`relative transition-all duration-300 ease-out transform-gpu ${className}`}
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px) scale(${isHovered ? 1.03 : 1})` 
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      href={href}
      {...props}
    >
      {children}
    </Component>
  );
});

MagneticButton.displayName = 'MagneticButton';

// Main Website Component
const Website = () => {
  // State management
  const [selectedProject, setSelectedProject] = useState(null);
  const [imageLoadErrors, setImageLoadErrors] = useState(new Set());
  const [globalImageIndex, setGlobalImageIndex] = useState({});

  // Refs for scroll animations
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  // Scroll-based animations
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Handle image loading errors
  const handleImageError = useCallback((imageSrc) => {
    setImageLoadErrors(prev => new Set([...prev, imageSrc]));
  }, []);

  // Body scroll lock for modal
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  // Website data structure
  const websites = useMemo(() => [
    {
      id: 'empowered',
      title: "EmpowerEd Platform",
      shortDescription: "Comprehensive educational platform democratizing access to quality learning through innovative digital solutions.",
      fullDescription: [
        "EmpowerEd serves as a transformative educational ecosystem designed to break down barriers to quality education. The platform combines cutting-edge web technologies with intuitive design principles to create an accessible learning environment for students worldwide.",
        "Built with React.js and enhanced through GSAP animations, the website delivers smooth, engaging interactions that guide users through comprehensive educational resources. The platform features mentorship programs, scholarship databases, mental health support, and study abroad guidance.",
        "The technical architecture emphasizes performance and accessibility, utilizing modern web standards to ensure compatibility across all devices and assistive technologies. Advanced scroll-triggered animations and responsive design create an immersive experience while maintaining fast load times."
      ],
      tags: [
        { name: "React", color: "text-blue-400" },
        { name: "GSAP", color: "text-purple-400" },
        { name: "ScrollTrigger", color: "text-cyan-400" },
        { name: "EmailJS", color: "text-violet-400" },
        { name: "Responsive", color: "text-rose-400" }
      ],
      images: [emp3, emp1, emp2, emp4, emp5, emp6],
      githubLink: "https://github.com/Bushraabir/empowereducation",
      liveLink: "https://bushraabir.github.io/empowereducation/",
      technologies: ["React.js", "GSAP", "ScrollTrigger", "Framer Motion", "EmailJS", "CSS3"],
      category: "Education",
      featured: true,
      color: "from-cyan-500/20 to-blue-500/20"
    },
    {
      id: 'periodic-table',
      title: "Interactive Periodic Table",
      shortDescription: "Advanced scientific visualization tool transforming chemistry education through interactive 3D data exploration.",
      fullDescription: [
        "This sophisticated chemistry visualization platform revolutionizes how students and researchers interact with elemental data. Built using Python's Streamlit framework, it offers comprehensive analytical tools for exploring periodic trends and elemental properties.",
        "The application features interactive 3D visualizations powered by Plotly, enabling users to explore complex relationships between atomic properties. Advanced filtering systems allow for customized data analysis and trend identification across the periodic table.",
        "Educational features include detailed element profiles, comparative analysis tools, and trend visualization capabilities. The platform serves both academic institutions and independent learners seeking to understand chemical relationships through visual exploration."
      ],
      tags: [
        { name: "Python", color: "text-amber-400" },
        { name: "Streamlit", color: "text-rose-400" },
        { name: "Plotly", color: "text-indigo-400" },
        { name: "Data Science", color: "text-violet-400" }
      ],
      images: [PeriodicTableVisualiser2, PeriodicTableVisualiser1, PeriodicTableVisualiser3, PeriodicTableVisualiser4, PeriodicTableVisualiser5, PeriodicTableVisualiser6],
      githubLink: "https://github.com/Bushraabir/periodic_table_visualizer",
      liveLink: "https://periodictablevisualizer.streamlit.app/",
      technologies: ["Python", "Streamlit", "Plotly", "Pandas", "Data Visualization"],
      category: "Science",
      featured: true,
      color: "from-indigo-500/20 to-purple-500/20"
    },
    {
      id: 'study-buddy',
      title: "StudyBuddy Learning Suite",
      shortDescription: "Intelligent study companion featuring spaced repetition, Pomodoro timers, and advanced mathematical tools.",
      fullDescription: [
        "StudyBuddy transforms personal learning through an integrated suite of evidence-based study tools. The platform combines spaced repetition algorithms with productivity techniques to maximize learning retention and academic performance.",
        "Core features include intelligent flashcard systems, Pomodoro technique implementation, and a sophisticated graphing calculator supporting complex mathematical functions. The note-taking system utilizes ReactQuill for rich text editing with real-time synchronization.",
        "Firebase integration provides secure user authentication and cross-device synchronization, while Math.js enables accurate computational capabilities. The responsive design ensures consistent functionality across desktop, tablet, and mobile devices."
      ],
      tags: [
        { name: "React", color: "text-indigo-400" },
        { name: "Firebase", color: "text-violet-400" },
        { name: "Math.js", color: "text-purple-400" },
        { name: "ReactQuill", color: "text-rose-400" }
      ],
      images: [StudyBuddy2, StudyBuddy1, StudyBuddy3, StudyBuddy4, StudyBuddy5, StudyBuddy6, StudyBuddy7, StudyBuddy8],
      githubLink: "https://github.com/Bushraabir/study-buddy",
      liveLink: "https://bushraabir.github.io/study-buddy/",
      technologies: ["React.js", "Firebase", "Plotly.js", "Math.js", "ReactQuill"],
      category: "Productivity",
      featured: false,
      color: "from-violet-500/20 to-rose-500/20"
    },
    {
      id: 'space-invaders',
      title: "Nebula Assault Game",
      shortDescription: "Modern 3D space arcade experience featuring advanced physics, particle effects, and immersive gameplay.",
      fullDescription: [
        "This contemporary reimagining of the classic Space Invaders combines nostalgic gameplay with cutting-edge web technologies. Three.js powers high-performance 3D rendering, creating detailed space environments with realistic lighting and particle systems.",
        "The game engine implements advanced physics calculations for realistic projectile motion and collision detection. Progressive difficulty scaling keeps players engaged, while power-up systems including shields, speed boosts, and multi-shot capabilities add strategic depth.",
        "Visual effects include explosion animations, thruster particles, and post-processing effects like bloom and chromatic aberration. The responsive design ensures smooth 60fps gameplay across desktop and mobile devices."
      ],
      tags: [
        { name: "Three.js", color: "text-violet-400" },
        { name: "WebGL", color: "text-amber-400" },
        { name: "TypeScript", color: "text-cyan-400" },
        { name: "Game Development", color: "text-rose-400" }
      ],
      images: [Space2, Space1, Space3],
      githubLink: "https://github.com/Bushraabir/space-invaders",
      liveLink: "https://bushraabir.github.io/space-invaders/",
      technologies: ["React", "Three.js", "TypeScript", "WebGL", "Post-processing"],
      category: "Gaming",
      featured: false,
      color: "from-blue-500/20 to-amber-500/20"
    },
    {
      id: 'relevia',
      title: "Relevia Mental Health",
      shortDescription: "Evidence-based panic attack management platform providing immediate crisis support and therapeutic resources.",
      fullDescription: [
        "Relevia addresses critical mental health needs through a carefully designed web application focused on panic attack management and anxiety relief. Developed in collaboration with mental health professionals, it provides immediate support during crisis situations.",
        "The platform features scientifically-validated breathing exercises, progressive muscle relaxation techniques, and grounding strategies proven effective for acute anxiety management. Educational components help users understand panic attack physiology, reducing anticipatory anxiety.",
        "The technical implementation prioritizes accessibility during high-stress situations, featuring large, clear interfaces and calming visual designs. Framer Motion provides purposeful animations that promote relaxation rather than overwhelm users during panic episodes."
      ],
      tags: [
        { name: "React", color: "text-blue-400" },
        { name: "Tailwind CSS", color: "text-amber-400" },
        { name: "Mental Health", color: "text-violet-400" },
        { name: "Accessibility", color: "text-cyan-400" }
      ],
      images: [relevia1, relevia2, relevia3, relevia4, relevia5, relevia6, relevia7],
      githubLink: "https://github.com/Bushraabir/relevia",
      liveLink: "https://bushraabir.github.io/relevia/",
      technologies: ["React.js", "Tailwind CSS", "Framer Motion", "Accessibility"],
      category: "Health",
      featured: true,
      color: "from-purple-500/20 to-violet-500/20"
    },
    {
      id: 'empowertube',
      title: "EmpowerTube CMS",
      shortDescription: "Advanced content management system for educational resources with drag-and-drop organization and offline capabilities.",
      fullDescription: [
        "EmpowerTube provides a sophisticated content management solution specifically designed for educational environments. The platform streamlines organization and delivery of diverse learning materials through an intuitive, unified interface.",
        "Supporting multiple content formats including YouTube videos, PDF documents, and article links, the system features drag-and-drop organization, comprehensive search capabilities, and automated content sorting based on user preferences and engagement metrics.",
        "Built with vanilla JavaScript to demonstrate fundamental web development skills, the application includes offline functionality, local storage persistence, and cross-browser compatibility. The responsive design ensures consistent performance across all device types."
      ],
      tags: [
        { name: "Vanilla JS", color: "text-cyan-400" },
        { name: "HTML5", color: "text-indigo-400" },
        { name: "CSS3", color: "text-amber-400" },
        { name: "Local Storage", color: "text-violet-400" }
      ],
      images: [Tube1, Tube1, Tube1],
      githubLink: "https://github.com/Bushraabir/EmpowerTube",
      liveLink: "https://bushraabir.github.io/EmpowerTube/",
      technologies: ["JavaScript", "HTML5", "CSS3", "Local Storage", "Responsive Design"],
      category: "CMS",
      featured: false,
      color: "from-rose-500/20 to-indigo-500/20"
    }
  ], []);

  // Enhanced Project Card Component
  const ProjectCard = memo(({ website, index }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "-15%" });
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    
    const currentImageIndex = globalImageIndex[website.id] || 0;

    const handleImageLoad = useCallback(() => {
      setImageLoaded(true);
    }, []);

    const handleCardClick = useCallback(() => {
      setSelectedProject(website);
    }, [website]);

    return (
      <motion.article
        ref={cardRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`group relative cursor-pointer transform-gpu ${
          website.featured ? 'sm:col-span-2 md:col-span-1 lg:col-span-2' : ''
        }`}
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        aria-label={`Explore ${website.title} project`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
      >
        {/* Card Container */}
        <div className="relative bg-gradient-to-br from-slate-800/80 via-slate-700/90 to-slate-800/80 backdrop-blur-xl border border-cyan-400/20 rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
          
          {/* Featured Badge */}
          {website.featured && (
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: -12 }}
              transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 150 }}
              className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20 px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 text-xs font-bold rounded-full shadow-lg"
            >
              FEATURED
            </motion.div>
          )}

          {/* Image Section with Enhanced Hover Effects */}
          <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
            {/* Dynamic Gradient Overlay */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${website.color} opacity-0 z-10`}
              animate={{ 
                opacity: isHovered ? 0.6 : 0 
              }}
              transition={{ duration: 0.4 }}
            />

            {/* Main Image with Smooth Transitions */}
            <motion.div className="relative w-full h-full">
              <motion.img
                key={currentImageIndex}
                src={website.images[currentImageIndex]}
                alt={`${website.title} interface screenshot ${currentImageIndex + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                transition={{ 
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.6, ease: "easeOut" }
                }}
                onLoad={handleImageLoad}
                onError={() => handleImageError(website.images[currentImageIndex])}
                loading="lazy"
              />
            </motion.div>

            {/* Loading State */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-slate-800/60 backdrop-blur-sm flex items-center justify-center">
                <motion.div
                  className="w-8 h-8 sm:w-12 sm:h-12 border-2 sm:border-3 border-cyan-400 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            )}

            {/* Interactive Action Buttons - Hidden on mobile for better UX */}
            <motion.div
              className="hidden sm:flex absolute top-4 right-4 gap-3 z-20"
              initial={{ opacity: 0, y: -20 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                y: isHovered ? 0 : -20 
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <MagneticButton
                href={website.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-slate-900 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300 border border-white/20"
                aria-label={`Visit ${website.title} live website`}
              >
                <ExternalLinkIcon />
              </MagneticButton>
              <MagneticButton
                href={website.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-10 h-10 lg:w-12 lg:h-12 bg-slate-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-cyan-400 shadow-lg hover:shadow-xl transition-all duration-300 border border-cyan-400/30"
                aria-label={`View ${website.title} source code on GitHub`}
              >
                <GithubIcon />
              </MagneticButton>
            </motion.div>

            {/* Live Demo Indicator */}
            <motion.div
              className="hidden sm:flex absolute bottom-4 left-4 items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-sm rounded-full z-20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                x: isHovered ? 0 : -20 
              }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
            >
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-white text-xs font-medium">Live Demo</span>
            </motion.div>

            {/* Image Counter */}
            {website.images.length > 1 && (
              <motion.div
                className="hidden sm:block absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-medium z-20"
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0, 
                  x: isHovered ? 0 : 20 
                }}
                transition={{ duration: 0.3, ease: "easeOut", delay: 0.15 }}
              >
                {currentImageIndex + 1} / {website.images.length}
              </motion.div>
            )}

            {/* Mobile Action Buttons Overlay */}
            <div className="sm:hidden absolute bottom-2 right-2 flex gap-2 z-20">
              <MagneticButton
                href={website.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-slate-900 shadow-lg backdrop-blur-sm border border-white/20"
                aria-label={`Visit ${website.title} live website`}
              >
                <ExternalLinkIcon />
              </MagneticButton>
              <MagneticButton
                href={website.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 bg-slate-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-cyan-400 shadow-lg border border-cyan-400/30"
                aria-label={`View ${website.title} source code on GitHub`}
              >
                <GithubIcon />
              </MagneticButton>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-3 sm:p-4 lg:p-6 xl:p-8">
            {/* Category and Title */}
            <div className="mb-3 sm:mb-4">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="inline-block px-2 py-1 sm:px-3 sm:py-1 text-xs font-medium bg-gradient-to-r from-indigo-500/20 to-cyan-400/20 text-cyan-400 rounded-full border border-cyan-400/30 mb-2 sm:mb-3"
              >
                {website.category}
              </motion.span>

              <AnimatedText delay={index * 0.1 + 0.4}>
                <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold font-sans bg-gradient-to-r from-amber-100 to-amber-300 bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-500 leading-tight">
                  {website.title}
                </h3>
              </AnimatedText>
            </div>

            {/* Description */}
            <AnimatedText delay={index * 0.1 + 0.5}>
              <p className="text-amber-100/80 font-sans leading-relaxed mb-3 sm:mb-4 lg:mb-6 text-sm sm:text-base line-clamp-2 sm:line-clamp-3">
                {website.shortDescription}
              </p>
            </AnimatedText>

            {/* Technology Tags */}
            <motion.div
              className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4 lg:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.6 }}
            >
              {website.tags.slice(0, 3).map((tag, tagIndex) => (
                <motion.span
                  key={tag.name}
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    scale: 1, 
                    rotate: 0 
                  } : {}}
                  transition={{ 
                    delay: index * 0.1 + 0.7 + tagIndex * 0.05,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`text-xs px-2 py-1 sm:px-3 sm:py-1 rounded-full bg-slate-700/30 backdrop-blur-sm ${tag.color} border border-current/20 hover:border-current/40 transition-all duration-300 cursor-default`}
                >
                  {tag.name}
                </motion.span>
              ))}
              {website.tags.length > 3 && (
                <span className="text-xs px-2 py-1 sm:px-3 sm:py-1 rounded-full bg-slate-700/30 backdrop-blur-sm text-amber-100/60 border border-amber-100/20">
                  +{website.tags.length - 3}
                </span>
              )}
            </motion.div>

            {/* Stats Row */}
            <motion.div
              className="flex items-center justify-between text-xs sm:text-sm text-amber-100/60 border-t border-cyan-400/10 pt-2 sm:pt-3 lg:pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.8 }}
            >
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="font-medium">
                  {website.technologies.length} Tech
                </span>
                <span className="font-medium hidden sm:inline">
                  {website.images.length} Screens
                </span>
              </div>
              <motion.div
                className="flex items-center gap-1"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full"></div>
                <span className="text-xs">Live</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Hover Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-xl sm:rounded-2xl lg:rounded-3xl opacity-0 pointer-events-none"
            style={{
              background: 'linear-gradient(45deg, transparent, rgba(103, 232, 249, 0.1), rgba(96, 165, 250, 0.1), transparent)',
              filter: 'blur(1px)',
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.article>
    );
  });

  ProjectCard.displayName = 'ProjectCard';

  return (
    <ErrorBoundary>
      {/* SEO Meta Information */}
      <div className="sr-only">
        <h1>Interactive Web Development Showcase</h1>
        <p>Explore cutting-edge web applications featuring modern technologies, responsive design, and innovative user experiences. Projects include educational platforms, scientific visualizations, productivity tools, and interactive games.</p>
      </div>

      <div className="relative min-h-screen bg-transparent  overflow-hidden">
        {/* Scroll Progress Indicator */}
        <ScrollProgress />

        {/* Animated Background */}
        <BackgroundOrbs />

        {/* Hero Section */}
        <motion.section 
          ref={heroRef}
          className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-12 sm:py-20"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="text-center max-w-6xl mx-auto relative z-10">
            {/* Main Hero Content */}
            <motion.div className="mb-8 sm:mb-12">
              <motion.h1 
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-12xl font-bold font-sans mb-4 sm:mb-6"
              >
                <span className="block bg-gradient-to-r from-amber-100 via-amber-300 to-cyan-400 bg-clip-text text-transparent leading-tight">
                  Web Development
                </span>
                <motion.span 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="block bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-400 bg-clip-text text-transparent leading-tight"
                >
                  Showcase
                </motion.span>
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 1.4 }}
                className="w-16 sm:w-24 lg:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mb-6 sm:mb-8"
              />
            </motion.div>

            {/* Subtitle */}
            <AnimatedText delay={1.6}>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-amber-100/90 font-sans leading-relaxed mb-8 sm:mb-12 max-w-4xl mx-auto px-4">
                Discover innovative web applications built with modern technologies,
                <br className="hidden sm:block" />
                featuring exceptional user experiences and cutting-edge design patterns.
              </p>
            </AnimatedText>

            {/* Interactive Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 max-w-3xl mx-auto px-4"
            >
              {[
                { number: `${websites.length}`, label: "Projects", suffix: "+" },
                { number: "10", label: "Technologies", suffix: "+" },
                { number: "100", label: "Responsive", suffix: "%" },
                { number: "A11Y", label: "Compliant", suffix: "" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 2 + index * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300"
                >
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-sans text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text mb-1">
                    {stat.number}{stat.suffix}
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-amber-100/70 font-sans">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.4 }}
              className="flex flex-col items-center gap-4 sm:gap-6"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-cyan-400/70"
              >
                <ChevronDownIcon />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Projects Showcase Section */}
        <section 
          ref={containerRef}
          className="relative px-4 sm:px-6 py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto"
          aria-label="Website projects showcase"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="space-y-12 sm:space-y-16 lg:space-y-20"
          >
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <AnimatedText>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold font-sans text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text mb-4 sm:mb-6">
                  Featured Projects
                </h2>
              </AnimatedText>
              <AnimatedText delay={0.2}>
                <p className="text-sm sm:text-base lg:text-xl text-amber-100/80 font-sans max-w-3xl mx-auto leading-relaxed px-4">
                  A curated collection of web applications showcasing modern development practices, 
                  innovative user interfaces, and technical excellence across diverse domains.
                </p>
              </AnimatedText>
            </div>

            {/* Projects Grid */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            >
              {websites.map((website, index) => (
                <ProjectCard key={website.id} website={website} index={index} />
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Enhanced Project Detail Modal */}
        <AnimatePresence mode="wait">
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-xl"
              onClick={(e) => {
                if (e.target === e.currentTarget) setSelectedProject(null);
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30
                }}
                className="bg-gradient-to-br from-slate-800/95 to-slate-700/95 backdrop-blur-2xl border border-cyan-400/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-3xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex justify-between items-start mb-6 sm:mb-8">
                  <div className="flex-1 pr-4 sm:pr-8">
                    <motion.h2 
                      id="modal-title"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-sans text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text mb-2 sm:mb-3"
                    >
                      {selectedProject.title}
                    </motion.h2>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-2 sm:gap-4 flex-wrap"
                    >
                      <span className="px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm bg-gradient-to-r from-indigo-500/20 to-cyan-400/20 text-cyan-400 rounded-full border border-cyan-400/30">
                        {selectedProject.category}
                      </span>
                      {selectedProject.featured && (
                        <span className="px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm bg-gradient-to-r from-cyan-400/20 to-blue-500/20 text-blue-400 rounded-full border border-blue-400/30">
                          Featured Project
                        </span>
                      )}
                    </motion.div>
                  </div>
                  
                  <MagneticButton
                    onClick={() => setSelectedProject(null)}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-800/80 backdrop-blur-sm text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 flex items-center justify-center border border-cyan-400/20 hover:border-cyan-400/60 flex-shrink-0"
                    aria-label="Close project details"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </MagneticButton>
                </div>

                {/* Modal Content */}
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
                  {/* Left Column - Content */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Project Description */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-lg sm:text-xl font-bold font-sans text-cyan-400 mb-3 sm:mb-4">
                        Project Overview
                      </h3>
                      <div id="modal-description" className="space-y-3 sm:space-y-4">
                        {selectedProject.fullDescription.map((paragraph, index) => (
                          <p key={index} className="text-amber-100/90 font-sans leading-relaxed text-sm sm:text-base">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </motion.div>

                    {/* Technologies */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="text-lg sm:text-xl font-bold font-sans text-cyan-400 mb-3 sm:mb-4">
                        Technologies & Tools
                      </h3>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        {selectedProject.technologies.map((tech, index) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.05 }}
                            className="px-3 py-2 sm:px-4 sm:py-2 bg-slate-700/30 backdrop-blur-sm text-blue-400 text-center border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 text-xs sm:text-sm font-medium rounded-lg"
                          >
                            {tech}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6"
                    >
                      <MagneticButton
                        href={selectedProject.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 font-bold py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                      >
                        <ExternalLinkIcon />
                        View Live Demo
                      </MagneticButton>
                      <MagneticButton
                        href={selectedProject.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-slate-700/50 backdrop-blur-sm text-cyan-400 font-bold py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl border border-cyan-400/30 hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                      >
                        <GithubIcon />
                        Source Code
                      </MagneticButton>
                    </motion.div>
                  </div>

                  {/* Right Column - Gallery */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-lg sm:text-xl font-bold font-sans text-cyan-400 mb-3 sm:mb-4">
                      Project Gallery
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-h-96 sm:max-h-full overflow-y-auto pr-2">
                      {selectedProject.images.map((image, index) => (
                        <motion.img
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          whileHover={{ scale: 1.03, zIndex: 10 }}
                          src={image}
                          alt={`${selectedProject.title} interface screenshot ${index + 1}`}
                          className="w-full h-24 sm:h-28 lg:h-32 object-cover rounded-lg border border-cyan-400/20 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
};

// SEO and Performance Optimizations
Website.displayName = 'WebsiteShowcase';

export default Website;