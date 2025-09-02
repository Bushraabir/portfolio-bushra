import React, { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tilt as ReactTilt } from "react-tilt";
import Lottie from "react-lottie";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import animationData from "../assets/animation/coding1.json";
import { FiGithub } from "react-icons/fi";
import { FaEye } from "react-icons/fa";

// Website Assets - EmpowerEd
import emp1 from "../assets/Website/EmpEd/1.png";
import emp2 from "../assets/Website/EmpEd/2.png";
import emp3 from "../assets/Website/EmpEd/3.png";
import emp4 from "../assets/Website/EmpEd/4.png";
import emp5 from "../assets/Website/EmpEd/5.png";
import emp6 from "../assets/Website/EmpEd/6.png";

// Website Assets - Periodic Table Visualizer
import PeriodicTableVisualiser1 from "../assets/Website/PeriodicTableVisualiser/1.png";
import PeriodicTableVisualiser2 from "../assets/Website/PeriodicTableVisualiser/2.png";
import PeriodicTableVisualiser3 from "../assets/Website/PeriodicTableVisualiser/3.png";
import PeriodicTableVisualiser4 from "../assets/Website/PeriodicTableVisualiser/4.png";
import PeriodicTableVisualiser5 from "../assets/Website/PeriodicTableVisualiser/5.png";
import PeriodicTableVisualiser6 from "../assets/Website/PeriodicTableVisualiser/6.png";

// Website Assets - Study Buddy
import StudyBuddy1 from "../assets/Website/StudyBuddy/1.png";
import StudyBuddy2 from "../assets/Website/StudyBuddy/2.png";
import StudyBuddy3 from "../assets/Website/StudyBuddy/3.png";
import StudyBuddy4 from "../assets/Website/StudyBuddy/4.png";
import StudyBuddy5 from "../assets/Website/StudyBuddy/5.png";
import StudyBuddy6 from "../assets/Website/StudyBuddy/6.png";
import StudyBuddy7 from "../assets/Website/StudyBuddy/7.png";
import StudyBuddy8 from "../assets/Website/StudyBuddy/8.png";

// Website Assets - Space Game
import Space1 from "../assets/Website/Space/1.png";
import Space2 from "../assets/Website/Space/2.png";
import Space3 from "../assets/Website/Space/3.png";

// Website Assets - EmpowerTube
import Tube1 from "../assets/Website/EmpTube/1.png";
import Tube2 from "../assets/Website/EmpTube/1.png";
import Tube3 from "../assets/Website/EmpTube/1.png";

// Website Assets - Relevia
import relevia1 from "../assets/Website/relevia/1.png";
import relevia2 from "../assets/Website/relevia/2.png";
import relevia3 from "../assets/Website/relevia/3.png";
import relevia4 from "../assets/Website/relevia/4.png";
import relevia5 from "../assets/Website/relevia/5.png";
import relevia6 from "../assets/Website/relevia/6.png";
import relevia7 from "../assets/Website/relevia/7.png";

// Project Assets
import Satellite from "../assets/Projects/Satellite.png";
import Rocket from "../assets/Projects/Rocket.png";
import Nuclear from "../assets/Projects/Nuclear.png";
import AeroSpace from "../assets/Projects/Aerospace.png";
import Satellite1 from "../assets/Projects/Satellite1.png";
import Aquarium from "../assets/Projects/Aquarium.png";
import Drone from "../assets/Projects/Drone.png";
import Bio from "../assets/Projects/Bio.png";
import Telescope from "../assets/Projects/Telescope.png";
import Biogas from "../assets/Projects/Biogas.png";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * STEM Projects and Websites Portfolio Component
 * 
 * A comprehensive React component that showcases a portfolio of websites, STEM projects, 
 * and educational courses with advanced animations, filtering capabilities, and responsive design.
 * 
 * Features:
 * - Interactive tabbed navigation (Websites, Projects, Courses)
 * - GSAP ScrollTrigger animations for desktop and mobile
 * - Framer Motion transitions and micro-interactions
 * - Modal project details with image galleries
 * - Responsive design with different animation sets for mobile/desktop
 * - Accessibility features including ARIA labels and semantic HTML
 * - SEO-optimized structure with proper heading hierarchy
 * - Performance optimizations with lazy loading and memoized components
 * 
 * Technologies Used:
 * - React 18+ with Hooks (useState, useEffect, useRef)
 * - GSAP with ScrollTrigger for scroll-based animations
 * - Framer Motion for component animations and transitions
 * - React Tilt for 3D card effects (desktop only)
 * - Lottie React for animated icons
 * - CSS-in-JS for styled components with custom animations
 * 
 * Performance Considerations:
 * - Memoized Card component to prevent unnecessary re-renders
 * - Lazy loading for images to improve initial load time
 * - Cleanup functions for GSAP animations to prevent memory leaks
 * - Responsive breakpoints to optimize animations per device
 * 
 * Accessibility Features:
 * - ARIA labels for interactive elements
 * - Semantic HTML structure with proper heading hierarchy
 * - Keyboard navigation support
 * - Screen reader friendly content descriptions
 * - Color contrast optimized for readability
 * 
 * SEO Optimization:
 * - Structured data markup ready
 * - Semantic HTML5 elements (section, main, heading tags)
 * - Meta-friendly descriptions and alt texts
 * - Performance optimized loading strategies
 * 
 * @component
 * @example
 * // Basic usage
 * <Website />
 * 
 * @example
 * // With custom props (if needed for future extensions)
 * <Website 
 *   initialTab="projects"
 *   showAnimations={true}
 *   responsiveBreakpoint={768}
 * />
 * 
 */
const Website = () => {
  // ===== STATE MANA
  //   const stemRef = useRef(null);
  
  /** @type {React.RefObject<HTMLHeadingElement>} - "PROJECTS" text element */
  const collabRef = useRef(null);
  
  /** @type {React.RefObject<HTMLDivElement>} - Lottie animation container */
  const lottieContainerRef = useRef(null);
  
  /** @type {React.RefObject<HTMLDivElement>} - Description section */
  const descriptionRef = useRef(null);
  
  /** @type {React.RefObject<HTMLDivElement>} - Tab buttons container */
  const buttonsRef = useRef(null);
  
  /** @type {React.RefObject<HTMLDivElement>} - Cards grid container */
  const cardsRef = useRef(null);
  
  /** @type {React.RefObject<HTMLDivElement>} - Tab indicator element */
  const tabIndicatorRef = useRef(null);

  // ===== RESPONSIVE DESIGN HANDLER =====
  
  /**
   * Effect to handle window resize events and update desktop state
   * Optimizes animations based on screen size for better performance
   */
  useEffect(() => {
    /**
     * Handles window resize events to update responsive state
     */
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    // Add event listener and initialize
    window.addEventListener("resize", handleResize);
    handleResize();

    // Cleanup event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ===== GSAP SCROLL ANIMATIONS =====
  
  /**
   * Effect to initialize GSAP ScrollTrigger animations
   * Creates different animation sets for desktop and mobile devices
   * Includes proper cleanup to prevent memory leaks
   */
  useEffect(() => {
    /**
     * Cleanup function to remove all GSAP animations and ScrollTriggers
     * Prevents memory leaks when component unmounts or re-renders
     */
    const cleanup = () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf([
        stemRef.current,
        collabRef.current,
        lottieContainerRef.current,
        descriptionRef.current,
        buttonsRef.current,
        cardsRef.current?.children,
      ]);
    };

    if (isDesktop) {
      // ===== DESKTOP ANIMATIONS =====
      
      /**
       * Main hero section animation timeline for desktop
       * Creates dramatic zoom and scale effects with pinning
       */
      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: initialMessageRef.current,
          start: "top top",
          endTrigger: cardsRef.current,
          end: "top 20%",
          scrub: 1.5, // Smooth scrubbing animation
          pin: true, // Pin the hero section during animation
          anticipatePin: 1, // Improve pinning performance
        },
      });

      // Animate hero elements with staggered effects
      heroTimeline
        .to(stemRef.current, { x: -1500, scale: 4, ease: "power4.out" }, 0)
        .to(collabRef.current, { x: 2500, scale: 4, ease: "power4.out" }, 0)
        .to(lottieContainerRef.current, { scale: 50, ease: "power4.out" }, 0)
        .to(lottieContainerRef.current, { opacity: 0, ease: "power4.out" }, 0.1);

      // Description section entrance animation
      gsap.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          ease: "expo.out",
          duration: 1.5,
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Tab buttons entrance animation
      gsap.fromTo(
        buttonsRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          ease: "expo.out",
          duration: 1.5,
          delay: 0.3,
          scrollTrigger: {
            trigger: buttonsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards staggered entrance animation
      gsap.fromTo(
        cardsRef.current?.children,
        { opacity: 0, y: 150 },
        {
          opacity: 1,
          y: 0,
          ease: "expo.out",
          duration: 1.5,
          stagger: 0.2, // Stagger each card by 0.2s
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    } else {
      // ===== MOBILE ANIMATIONS =====
      
      /**
       * Mobile-optimized hero animation timeline
       * Reduced scale and movement for better mobile performance
       */
      const mobileHeroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: initialMessageRef.current,
          start: "top top",
          endTrigger: cardsRef.current,
          end: "top 30%",
          scrub: 1,
          pin: true,
        },
      });

      // Mobile hero animations with reduced intensity
      mobileHeroTimeline
        .to(stemRef.current, { x: -200, scale: 2, ease: "power2.out" }, 0)
        .to(collabRef.current, { x: 200, scale: 2, ease: "power2.out" }, 0)
        .to(lottieContainerRef.current, { scale: 10, ease: "power2.out" }, 0)
        .to(lottieContainerRef.current, { opacity: 0, ease: "power2.out" }, 0.2);

      // Mobile-optimized description animation
      gsap.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ease: "expo.out",
          duration: 1,
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Mobile-optimized buttons animation
      gsap.fromTo(
        buttonsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ease: "expo.out",
          duration: 1,
          delay: 0.2,
          scrollTrigger: {
            trigger: buttonsRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Mobile-optimized cards animation
      gsap.fromTo(
        cardsRef.current?.children,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          ease: "expo.out",
          duration: 1,
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Return cleanup function
    return cleanup;
  }, [isDesktop]);

  // ===== MODAL BODY SCROLL HANDLER =====
  
  /**
   * Effect to manage body scroll when modal is open
   * Prevents background scrolling when modal is active
   */
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup: restore scroll on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProject]);

  // ===== LOTTIE ANIMATION CONFIGURATION =====
  
  /**
   * Configuration object for Lottie animation
   * @type {Object}
   */
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: { 
      preserveAspectRatio: "xMidYMid slice" 
    },
  };

  // ===== DATA STRUCTURES =====

  /**
   * Educational courses data array
   * Contains information about STEM courses offered
   * @type {Array<Object>}
   */
  const courses = [
    {
      type: "course",
      name: "Satellite Engineering Course",
      description: "An introductory course on satellite systems and engineering, covering the basics of satellite design, operations, and technologies used in modern space exploration.",
      tags: [
        { name: "Satellite Engineering", color: "text-electric_blue" },
        { name: "Space Tech", color: "text-pink_lavender" },
        { name: "STEM Education", color: "text-aquamarine" },
        { name: "Satellite System", color: "text-jordy_blue" },
        { name: "Space Exploration", color: "text-mauve" },
      ],
      images: [Satellite],
      detailedDescription: "An introductory course on satellite systems and engineering, covering the basics of satellite design, operations, and technologies used in modern space exploration. Students will learn about orbital mechanics, satellite communications, power systems, and mission planning. The course includes hands-on projects and real-world case studies from successful satellite missions.",
      source_code_link: "#", // Placeholder for course materials
    },
    {
      type: "course",
      name: "Rocket Propulsion Systems",
      description: "An introductory course on rocket propulsion, focusing on the principles of thrust, engine design, and the technologies driving modern rocketry.",
      tags: [
        { name: "Rocket Production", color: "text-champagne_pink" },
        { name: "Rocket Science", color: "text-aquamarine" },
        { name: "Space Engineering", color: "text-pink_lavender" },
        { name: "STEM", color: "text-tea_rose" },
        { name: "Thrust", color: "text-electric_blue" },
        { name: "Aerospace Tech", color: "text-non_photo_blue" },
      ],
      images: [Rocket],
      detailedDescription: "An introductory course on rocket propulsion, focusing on the principles of thrust, engine design, and the technologies driving modern rocketry. Topics include chemical propulsion, electric propulsion, hybrid systems, and future propulsion technologies. Students will engage with practical calculations and design exercises.",
      source_code_link: "#", // Placeholder for course materials
    },
    {
      type: "course",
      name: "Introduction to Aerospace Engineering and Design",
      description: "An introductory course on aerospace engineering, focusing on the principles of aircraft and spacecraft design, aerodynamics, and propulsion systems.",
      tags: [
        { name: "AeroSpace Engineering", color: "text-electric_blue" },
        { name: "Aircraft Design", color: "text-pink_lavender" },
        { name: "Aerodynamics", color: "text-aquamarine" },
        { name: "Space Tech", color: "text-jordy_blue" },
        { name: "Spacecraft Design", color: "text-mauve" },
      ],
      images: [AeroSpace],
      detailedDescription: "An introductory course on aerospace engineering, focusing on the principles of aircraft and spacecraft design, aerodynamics, and propulsion systems. The curriculum covers flight mechanics, structural analysis, materials science, and control systems with practical design projects and simulation exercises.",
      source_code_link: "#", // Placeholder for course materials
    },
    {
      type: "course",
      name: "Nuclear Science and Engineering",
      description: "An introductory course on nuclear science, covering the fundamentals of nuclear reactions, reactor design, and applications in energy production and medical technology.",
      tags: [
        { name: "Nuclear Science", color: "text-electric_blue" },
        { name: "Nuclear Engineering", color: "text-pink_lavender" },
        { name: "Energy Tech", color: "text-aquamarine" },
        { name: "Reactor Design", color: "text-jordy_blue" },
        { name: "Atomic Energy", color: "text-tea_rose" },
      ],
      images: [Nuclear],
      detailedDescription: "An introductory course on nuclear science, covering the fundamentals of nuclear reactions, reactor design, and applications in energy production and medical technology. Students explore nuclear physics, radiation safety, reactor operations, and sustainable energy solutions through theoretical study and laboratory experiences.",
      source_code_link: "#", // Placeholder for course materials
    },
  ];

  /**
   * Websites portfolio data array
   * Contains information about developed web applications
   * @type {Array<Object>}
   */
  const websites = [
    {
      type: "website",
      title: "EmpowerEd Website",
      description: "A dynamic and visually engaging web platform for accessible quality education.",
      tags: [
        { name: "React", color: "text-electric_blue" },
        { name: "GSAP", color: "text-pink_lavender" },
        { name: "ScrollTrigger", color: "text-aquamarine" },
        { name: "Lottie Animation", color: "text-jordy_blue" },
        { name: "React Vertical Timeline Component", color: "text-mauve" },
        { name: "EmailJS", color: "text-tea_rose" },
        { name: "Vite", color: "text-champagne_pink" },
        { name: "CSS & Media Queries", color: "text-non_photo_blue" },
        { name: "React Router", color: "text-lemon_chiffon" },
      ],
      images: [emp3, emp1, emp2, emp3, emp4, emp5, emp6],
      detailedDescription: "EmpowerEd is a comprehensive educational platform designed to empower students through various resources and support systems. The website features a clean, modern design with immersive animations and interactive elements that enhance user engagement. Built with React.js, it leverages GSAP for smooth animations, ScrollTrigger for interactive scroll effects, and Framer Motion for additional dynamic movements. The platform includes a contact form integrated with EmailJS for communication, a vertical timeline component to showcase the organization's journey, and responsive design techniques using CSS and media queries to ensure accessibility across devices. React Router manages the navigation between different sections of the platform, creating a seamless user experience. EmpowerEd offers students a range of services including mentorship opportunities, mental health support, research funding, scholarship information, and guidance for studying abroad. The platform's design emphasizes accessibility and usability, making educational resources available to a diverse student population.",
      source_code_link: "https://github.com/Bushraabir/empowereducation",
      website_link: "https://bushraabir.github.io/empowereducation/",
    },
    {
      type: "website",
      title: "Periodic Table Visualizer",
      description: "An interactive web application for exploring the periodic table with dynamic visualizations.",
      tags: [
        { name: "Python", color: "text-champagne_pink" },
        { name: "Streamlit", color: "text-tea_rose" },
        { name: "Plotly", color: "text-jordy_blue" },
        { name: "Pandas", color: "text-aquamarine" },
        { name: "Data Visualization", color: "text-mauve" },
      ],
      images: [PeriodicTableVisualiser2, PeriodicTableVisualiser1, PeriodicTableVisualiser3, PeriodicTableVisualiser4, PeriodicTableVisualiser5, PeriodicTableVisualiser6],
      detailedDescription: "The Periodic Table Visualizer is an interactive web application built with Python, Streamlit, Plotly, and Pandas. It offers a comprehensive exploration of chemical elements through various interactive features including an interactive periodic table, data analysis tools, trend visualization, 3D analytics, element gallery, and detailed element information. The application provides users with the ability to filter elements by various properties, visualize trends across atomic numbers, analyze relationships between element properties in 3D space, and view detailed information about each element including physical and chemical properties. This educational tool makes chemistry more accessible and engaging for students and educators alike.",
      source_code_link: "https://github.com/Bushraabir/periodic_table_visualizer",
      website_link: "https://periodictablevisualizer.streamlit.app/",
    },
    {
      type: "website",
      title: "Study Buddy",
      description: "An interactive study companion designed to boost student productivity with smart learning tools.",
      tags: [
        { name: "React", color: "text-jordy_blue" },
        { name: "GSAP", color: "text-aquamarine" },
        { name: "Framer Motion", color: "text-mauve" },
        { name: "Lottie Animation", color: "text-champagne_pink" },
        { name: "React Router", color: "text-pink_lavender" },
        { name: "Firebase Authentication", color: "text-tea_rose" },
        { name: "Firebase Firestore", color: "text-non_photo_blue" },
        { name: "Formik & Yup", color: "text-electric_blue" },
        { name: "ReactQuill", color: "text-lemon_chiffon" },
        { name: "Plotly.js", color: "text-electric_blue" },
        { name: "Math.js", color: "text-aquamarine" },
      ],
      images: [StudyBuddy2, StudyBuddy1, StudyBuddy3, StudyBuddy4, StudyBuddy5, StudyBuddy6, StudyBuddy7, StudyBuddy8],
      detailedDescription: "Study Buddy is an interactive educational application designed to enhance student productivity through a comprehensive suite of study tools. The platform combines interactive flashcards with quiz functionality, a Pomodoro-based session manager for time tracking, an advanced graphing calculator supporting multiple equation types, and a smart note-taking system with real-time synchronization via Firebase. Built using React.js, GSAP, Framer Motion, and Plotly.js, Study Buddy delivers a modern, responsive learning experience with premium animations and intuitive design. The application implements secure user authentication, personalized study tracking, and mathematical computation capabilities through math.js, creating a complete study solution that helps students maximize their academic performance.",
      source_code_link: "https://github.com/Bushraabir/study-buddy",
      website_link: "https://bushraabir.github.io/study-buddy/",
    },
    {
      type: "website",
      title: "Space Invaders: Nebula Assault",
      description: "A modern take on the classic Space Invaders game, built with React, Three.js, and Zustand. Navigate your spaceship through a cosmic battlefield, fend off enemy waves, collect power-ups, and survive the nebula onslaught!",
      tags: [
        { name: "React", color: "text-jordy_blue" },
        { name: "Three.js", color: "text-mauve" },
        { name: "Zustand", color: "text-aquamarine" },
        { name: "TypeScript", color: "text-champagne_pink" },
        { name: "WebGL", color: "text-tea_rose" },
        { name: "Game Development", color: "text-pink_lavender" },
        { name: "3D Graphics", color: "text-electric_blue" },
        { name: "Particle Effects", color: "text-non_photo_blue" },
        { name: "Styled Components", color: "text-lemon_chiffon" },
      ],
      images: [Space2, Space1, Space3],
      detailedDescription: "Space Invaders: Nebula Assault is a dynamic space shooter game built with modern web technologies. The game features 3D graphics powered by Three.js, with a dynamic starfield, detailed spaceship models, and enemy ships. Players can control their spaceship using arrow keys and shoot with the spacebar, while fending off waves of enemies with straight or zigzag movement patterns. The game includes collectibles for bonus points, power-ups (speed boost, shield, and multi-shot), and impressive visual effects like explosions and thruster particles. The state management is handled efficiently with Zustand, and the game features post-processing effects like bloom via @react-three/postprocessing. The user interface is styled with styled-components, providing responsive start, game, and game-over screens with a heads-up display (HUD) showing score, lives, and audio toggle.",
      source_code_link: "https://github.com/Bushraabir/space-invaders",
      website_link: "https://bushraabir.github.io/space-invaders/",
    },
    {
      type: "website",
      title: "Relevia",
      description: "An interactive web application designed to help individuals manage and overcome panic attacks through resources, tools, and support.",
      tags: [
        { name: "React", color: "text-electric_blue" },
        { name: "JavaScript", color: "text-champagne_pink" },
        { name: "Tailwind CSS", color: "text-jordy_blue" },
        { name: "Framer Motion", color: "text-mauve" },
        { name: "Mental Health", color: "text-aquamarine" },
      ],
      images: [relevia1, relevia2, relevia3, relevia4, relevia5, relevia6, relevia7],
      detailedDescription: "Relevia is an interactive web application built with React, Tailwind CSS, and Framer Motion, aimed at assisting individuals in managing and overcoming panic attacks. Developed by EmpowerED Global, it offers a comprehensive set of features including a resource library with articles and guides, interactive tools such as breathing exercises and grounding techniques, and sections for learning about panic attacks, coping strategies, medication information, and contact support. The application features an animated and responsive user interface, ensuring a smooth experience on both mobile and desktop devices. Relevia aims to raise awareness about panic attacks and provide accessible tools for emotional regulation and coping. It includes components like About, Contact, Coping, Home, Medication, and Resources, each designed to be user-friendly and supportive.",
      source_code_link: "https://github.com/Bushraabir/relevia",
      website_link: "https://bushraabir.github.io/relevia/",
    },
    {
      type: "website",
      title: "EmpowerTube - Educational Content Hub",
      description: "A web application for managing and organizing educational content. Supports videos, PDFs, and articles with advanced filtering, dark mode, and drag-and-drop functionality.",
      tags: [
        { name: "HTML", color: "text-aquamarine" },
        { name: "CSS", color: "text-jordy_blue" },
        { name: "JavaScript", color: "text-champagne_pink" },
      ],
      images: [Tube1, Tube2, Tube3],
      detailedDescription: "EmpowerTube is a comprehensive web application designed to help educators and students organize and manage educational content efficiently. The platform supports multiple content formats including YouTube videos, PDF documents, and articles, allowing users to create, read, update, and delete content with ease. Its intelligent organization system enables drag-and-drop rearrangement of content items, making it simple to structure learning materials logically. Advanced filtering options allow users to search by title or content, filter by category, and identify favorite content quickly. Multiple sorting options (Newest, Oldest, Popular) help users find content based on their specific needs. The application features an automatic dark/light mode that detects system preferences for comfortable viewing in any lighting condition. A favorites system allows users to mark and filter their most important content. The modern, minimalist interface with smooth animations ensures an intuitive user experience across all devices. EmpowerTube utilizes LocalStorage for persistent data storage, ensuring content remains available even when offline. Client-side PDF upload and preview functionality allows for seamless document handling without server dependency. Performance optimizations like lazy loading and efficient rendering ensure smooth operation even with large content libraries. Comprehensive error handling and user feedback mechanisms provide a reliable experience, while the use of vanilla JavaScript (without frameworks) keeps the application lightweight and fast. The implementation of CSS Variables and Modern Layout techniques (Grid/Flexbox) creates a responsive, adaptable interface that works perfectly on desktops, tablets, and mobile devices. Font Awesome 6 icons enhance the visual experience with professional-grade symbols throughout the interface.",
      source_code_link: "https://github.com/Bushraabir/EmpowerTube",
      website_link: "https://bushraabir.github.io/EmpowerTube/",
    },
  ];

  /**
   * STEM projects data array
   * Contains information about hands-on engineering and science projects
   * @type {Array<Object>}
   */
  const projects = [
    {
      type: "project",
      name: "Building a Self-Made Satellite with a Self-Made Rocket",
      description: "This project involves designing and building a satellite along with a custom rocket, powered by hydrogen and oxygen fuel that is processed by us. The satellite will include a transmitter to send its location back to us. The ultimate goal is to launch the satellite into Low Earth Orbit (LEO), aiming to reach the Kármán Line.",
      tags: [
        { name: "Satellite Engineering", color: "text-electric_blue" },
        { name: "Rocket Science", color: "text-pink_lavender" },
        { name: "Aerospace", color: "text-aquamarine" },
        { name: "LEO Mission", color: "text-jordy_blue" },
        { name: "Propulsion", color: "text-mauve" },
      ],
      images: [Satellite1],
      detailedDescription: "This ambitious project involves designing and building a satellite along with a custom rocket, powered by hydrogen and oxygen fuel that is processed by us. The satellite will include a transmitter to send its location back to us. The ultimate goal is to launch the satellite into Low Earth Orbit (LEO), aiming to reach the Kármán Line at 100 kilometers altitude. The project encompasses multiple engineering disciplines including propulsion system design, satellite communications, orbital mechanics, fuel processing and handling, structural engineering for both rocket and satellite components, and mission control systems. This represents a comprehensive exploration of aerospace engineering principles from concept to launch.",
      source_code_link: "#", // Placeholder for project documentation
    },
    {
      type: "project",
      name: "Aquarium Water Purification System",
      description: "This project involves designing and building a custom aquarium water purifier equipped with a 12V water pump. The system will reduce ammonia levels, remove fish waste, and promote the growth of beneficial plankton while maintaining balanced oxygen levels in the water.",
      tags: [
        { name: "Water Treatment", color: "text-electric_blue" },
        { name: "Aquaculture", color: "text-pink_lavender" },
        { name: "Biotechnology", color: "text-aquamarine" },
        { name: "Environmental Engineering", color: "text-jordy_blue" },
        { name: "Ecosystem Design", color: "text-mauve" },
      ],
      images: [Aquarium],
      detailedDescription: "This project involves designing and building a custom aquarium water purifier equipped with a 12V water pump. The system will reduce ammonia levels, remove fish waste, and promote the growth of beneficial plankton while maintaining balanced oxygen levels in the water. The purifier will include a multi-stage filtration mechanism featuring mechanical filtration for large debris, biological filtration for beneficial bacteria cultivation, and chemical filtration for harmful substance removal. The ultimate goal is to create a self-sustaining ecosystem within the aquarium, ensuring optimal water quality and supporting the well-being of the fish and other aquatic organisms. The project incorporates principles of environmental engineering, aquaculture, and biotechnology to create a balanced aquatic environment.",
      source_code_link: "#", // Placeholder for project documentation
    },
    {
      type: "project",
      name: "Quadcopter Drone for Aerial Photography and Surveillance",
      description: "This project involves designing and assembling a customizable quadcopter drone using off-the-shelf components. The drone will be equipped with a camera for aerial photography, basic flight stabilization, and remote-control capabilities.",
      tags: [
        { name: "Drone Technology", color: "text-electric_blue" },
        { name: "Aerial Photography", color: "text-pink_lavender" },
        { name: "Flight Control", color: "text-aquamarine" },
        { name: "Remote Systems", color: "text-jordy_blue" },
        { name: "Robotics", color: "text-mauve" },
      ],
      images: [Drone],
      detailedDescription: "This project involves designing and assembling a customizable quadcopter drone using off-the-shelf components. The drone will be equipped with a high-resolution camera for aerial photography, GPS navigation system, basic flight stabilization using gyroscopic sensors, and remote-control capabilities through radio frequency communication. The ultimate goal is to create a cost-effective, modular drone for hobbyist aerial imaging, environmental monitoring, or educational purposes, while learning principles of aerodynamics, electronics, and robotics. The project covers flight controller programming, motor and propeller selection, battery management systems, camera gimbal stabilization, and safety protocols for responsible drone operation.",
      source_code_link: "#", // Placeholder for project documentation
    },
    {
      type: "project",
      name: "Bio Diesel Production System",
      description: "This project involves designing and constructing a small-scale bio diesel reactor that converts waste cooking oil, vegetable oil, or animal fats into usable bio diesel fuel.",
      tags: [
        { name: "Renewable Energy", color: "text-electric_blue" },
        { name: "Chemical Engineering", color: "text-pink_lavender" },
        { name: "Sustainability", color: "text-aquamarine" },
        { name: "Biofuel", color: "text-jordy_blue" },
        { name: "Green Technology", color: "text-mauve" },
      ],
      images: [Bio],
      detailedDescription: "This project involves designing and constructing a small-scale bio diesel reactor that converts waste cooking oil, vegetable oil, or animal fats into usable bio diesel fuel. The system will use a chemical process called transesterification to break down triglycerides into fatty acid methyl esters (FAME), producing clean-burning bio diesel. The reactor design includes temperature control systems, mixing mechanisms, separation tanks for glycerin byproduct, and purification processes to meet fuel quality standards. The ultimate goal is to create a sustainable, low-cost method to recycle waste oils into renewable fuel for vehicles, generators, or heating systems, reducing reliance on fossil fuels and lowering carbon emissions. The project demonstrates principles of chemical engineering, environmental sustainability, and renewable energy technology.",
      source_code_link: "#", // Placeholder for project documentation
    },
    {
      type: "project",
      name: "Telescope for Amateur Astronomy",
      description: "This project involves designing and constructing a simple, low-cost refracting telescope using affordable, off-the-shelf components.",
      tags: [
        { name: "Optics", color: "text-electric_blue" },
        { name: "Astronomy", color: "text-pink_lavender" },
        { name: "Precision Engineering", color: "text-aquamarine" },
        { name: "DIY Science", color: "text-jordy_blue" },
        { name: "Educational Tools", color: "text-mauve" },
      ],
      images: [Telescope],
      detailedDescription: "This project involves designing and constructing a simple, low-cost refracting telescope using affordable, off-the-shelf components. The telescope will use optical lenses to collect and focus light, enabling observation of celestial objects like the Moon, planets, and bright star clusters. The design includes a primary objective lens for light gathering, an eyepiece system for magnification, a sturdy mounting system for stability, and fine adjustment mechanisms for precise tracking. The ultimate goal is to create a functional, portable telescope for educational purposes while learning fundamental principles of optics, astronomy, and precision mechanical engineering. The project covers lens selection and positioning, focal length calculations, mounting design, and observational techniques.",
      source_code_link: "#", // Placeholder for project documentation
    },
    {
      type: "project",
      name: "Bio Gas Plant for Household Energy",
      description: "This project involves designing and constructing a small-scale bio gas system that converts organic household waste into methane gas and organic fertilizer.",
      tags: [
        { name: "Biogas Technology", color: "text-electric_blue" },
        { name: "Waste Management", color: "text-pink_lavender" },
        { name: "Renewable Energy", color: "text-aquamarine" },
        { name: "Sustainable Living", color: "text-jordy_blue" },
        { name: "Circular Economy", color: "text-mauve" },
      ],
      images: [Biogas],
      detailedDescription: "This project involves designing and constructing a small-scale bio gas system that converts organic household waste (e.g., kitchen scraps, garden waste, or livestock manure) into methane gas and organic fertilizer. The main goal is to use human feces as it is cost-free and challenging to manage as waste. The system will use anaerobic digestion to break down waste, capture methane for cooking or heating, and produce nutrient-rich slurry for gardening and farming. The design includes a sealed digester tank, gas collection and storage system, waste input and slurry output mechanisms, temperature monitoring and control, and safety measures for gas handling. The ultimate goal is to create a sustainable, closed-loop energy solution that reduces waste, lowers reliance on fossil fuels, and supports eco-friendly agriculture while addressing waste management challenges.",
      source_code_link: "#", // Placeholder for project documentation
    },
  ];

  // ===== DATA PROCESSING =====
  
  /**
   * Get active data based on selected tab
   * @type {Array<Object>}
   */
  const activeData = activeTab === "websites" ? websites : activeTab === "projects" ? projects : courses;
  
  /**
   * Group data into rows of 3 for grid layout
   * @type {Array<Array<Object>>}
   */
  const groupedData = activeData.reduce((acc, cur, i) => {
    if (i % 3 === 0) acc.push(activeData.slice(i, i + 3));
    return acc;
  }, []);

  // ===== ANIMATION VARIANTS =====
  
  /**
   * Framer Motion variants for tab animations
   * Defines different states for smooth tab transitions
   * @type {Object}
   */
  const tabVariants = {
    inactive: { 
      scale: 1, 
      opacity: 0.7, 
      y: 0,
      boxShadow: "0px 0px 0px rgba(0,0,0,0)"
    },
    active: { 
      scale: 1.1, 
      opacity: 1, 
      y: -8,
      boxShadow: "0px 15px 35px rgba(152, 245, 225, 0.4)"
    },
    hover: { 
      scale: 1.05, 
      opacity: 0.9,
      y: -4,
      boxShadow: "0px 8px 20px rgba(152, 245, 225, 0.2)"
    }
  };

  // ===== MEMOIZED COMPONENTS =====
  
  /**
   * Memoized Card Component for performance optimization
   * Prevents unnecessary re-renders when parent state changes
   * 
   * @param {Object} props - Component props
   * @param {Object} props.data - Project/website/course data object
   * @param {Function} props.onClick - Click handler function
   * @returns {JSX.Element} Rendered card component
   */
  const Card = memo(({ data, onClick }) => {
    // Extract common properties with fallbacks
    const title = data.title || data.name;
    const { description, tags, images, source_code_link, type, website_link } = data;
    
    /**
     * Handle external link clicks with event propagation prevention
     * @param {Event} e - Click event
     * @param {string} url - URL to open
     */
    const handleExternalClick = (e, url) => {
      e.stopPropagation();
      window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
      <motion.div
        onClick={() => onClick(data)}
        className="website-card mx-auto w-full max-w-[550px] p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-deep_indigo via-dark_teal to-deep_indigo border border-dark_teal cursor-pointer overflow-hidden"
        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(data);
          }
        }}
      >
        {/* Image Section with Conditional Tilt Effect */}
        {isDesktop ? (
          <ReactTilt 
            options={{ max: 20, scale: 1.05, speed: 400 }} 
            className="relative w-full h-[250px] mb-6 overflow-hidden rounded-2xl"
          >
            <motion.img
              src={images[0]}
              alt={`${title} preview screenshot`}
              className="object-cover w-full h-full rounded-xl"
              loading="lazy"
              initial={{ scale: 1.1 }}
              whileHover={{ scale: 1.15, rotate: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Action Buttons Overlay */}
            <div className="absolute inset-0 flex justify-end m-4 space-x-2">
              {type === "website" && website_link && (
                <motion.button
                  onClick={(e) => handleExternalClick(e, website_link)}
                  className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-gradient-to-r from-aquamarine to-jordy_blue cursor-pointer"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  aria-label={`Visit ${title} website`}
                >
                  <FaEye size={28} color="white" />
                </motion.button>
              )}
              {source_code_link && source_code_link !== "#" && (
                <motion.button
                  onClick={(e) => handleExternalClick(e, source_code_link)}
                  className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-gradient-to-r from-aquamarine to-jordy_blue cursor-pointer"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  aria-label={`View ${title} source code`}
                >
                  {type === "website" ? (
                    <FiGithub size={28} color="white" />
                  ) : (
                    <FaEye size={28} color="white" />
                  )}
                </motion.button>
              )}
            </div>
          </ReactTilt>
        ) : (
          <div className="relative w-full h-[250px] mb-6 overflow-hidden rounded-2xl">
            <motion.img
              src={images[0]}
              alt={`${title} preview screenshot`}
              className="object-cover w-full h-full rounded-xl"
              loading="lazy"
              whileTap={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Mobile Action Buttons */}
            <div className="absolute inset-0 flex justify-end m-4 space-x-2">
              {type === "website" && website_link && (
                <motion.button
                  onClick={(e) => handleExternalClick(e, website_link)}
                  className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-gradient-to-r from-aquamarine to-jordy_blue cursor-pointer"
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  aria-label={`Visit ${title} website`}
                >
                  <FaEye size={28} color="white" />
                </motion.button>
              )}
              {source_code_link && source_code_link !== "#" && (
                <motion.button
                  onClick={(e) => handleExternalClick(e, source_code_link)}
                  className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-gradient-to-r from-aquamarine to-jordy_blue cursor-pointer"
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  aria-label={`View ${title} source code`}
                >
                  {type === "website" ? (
                    <FiGithub size={28} color="white" />
                  ) : (
                    <FaEye size={28} color="white" />
                  )}
                </motion.button>
              )}
            </div>
          </div>
        )}

        {/* Card Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6"
        >
          <h3 className="sm:text-4xl text-2xl font-heading text-aquamarine font-extrabold tracking-tight">
            {title}
          </h3>
          <p className="mt-3 font-description text-lemon_chiffon text-sm sm:text-base leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Tags Section */}
        <motion.div
          className="flex flex-wrap gap-3 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {tags.slice(0, 3).map((tag, index) => (
            <motion.span
              key={`${tag.name}-${index}`}
              className={`text-xs sm:text-sm font-semibold font-description ${tag.color} px-4 py-2 rounded-full shadow-md bg-dark_teal/20`}
              whileHover={{ scale: 1.1, backgroundColor: "#26C6DA" }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              #{tag.name}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    );
  });

  // Set display name for debugging
  Card.displayName = 'ProjectCard';

  // ===== RENDER COMPONENT =====
  
  return (
    <>
      {/* ===== CUSTOM STYLES ===== */}
      <style jsx>{`
        .website-section {
          background: linear-gradient(135deg, #2a1b3d 0%, #1d3557 50%, #2a1b3d 100%);
          position: relative;
          overflow: hidden;
          isolation: isolate;
          min-height: 100vh;
        }
        
        /* Animated background glow effect */
        .website-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(152, 245, 225, 0.1) 0%, rgba(152, 245, 225, 0.05) 30%, rgba(255,255,255,0) 70%);
          animation: rotateGlow 20s linear infinite;
          z-index: 0;
        }
        
        /* Additional background gradients */
        .website-section::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(163, 196, 243, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(241, 192, 232, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(207, 186, 240, 0.1) 0%, transparent 50%);
          z-index: 0;
        }
        
        /* Rotating glow animation */
        @keyframes rotateGlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Ensure cards appear above background */
        .website-card {
          z-index: 1;
        }
        
        /* Intro text styling */
        .intro-text {
          max-width: 900px;
          margin: 0 auto;
          line-height: 1.9;
          text-align: center;
        }
        
        .intro-text p {
          background: linear-gradient(135deg, #fbf8cc 0%, #98f5e1 50%, #fde4cf 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 30px rgba(152, 245, 225, 0.3);
          position: relative;
        }
        
        .intro-text p::before {
          content: '';
          position: absolute;
          top: -10px;
          left: -20px;
          right: -20px;
          bottom: -10px;
          border-radius: 20px;
          z-index: -1;
          opacity: 0.7;
        }
        
        /* Premium tab styling */
        .premium-tab {
          position: relative;
          overflow: hidden;
        }
        
        .premium-tab::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(152, 245, 225, 0.4),
            transparent
          );
          transition: left 0.5s ease;
        }
        
        .premium-tab:hover::before {
          left: 100%;
        }
        
        /* Tab glow effect */
        .tab-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(152, 245, 225, 0.3) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        
        .premium-tab.active .tab-glow {
          opacity: 1;
        }
        
        /* Mobile responsive styles */
        @media (max-width: 768px) {
          .website-section {
            padding-top: 2rem;
            padding-bottom: 2rem;
          }
          .website-card {
            padding: 1rem;
          }
          .intro-text {
            max-width: 100%;
            padding: 0 1rem;
          }
        }
        
        /* Print styles for accessibility */
        @media print {
          .website-section {
            background: white;
            color: black;
          }
          .website-card {
            border: 1px solid #ccc;
            background: white;
          }
        }
      `}</style>
      
      {/* ===== MAIN PORTFOLIO SECTION ===== */}
      <section 
        id="websites" 
        className="website-section py-16 lg:py-24 text-lemon_chiffon" 
        role="main" 
        aria-label="STEM Projects Portfolio"
      >
        <div className="container mx-auto px-6 lg:px-20 relative z-10">
          
          {/* ===== HERO SECTION ===== */}
          <header 
            ref={initialMessageRef} 
            className="flex flex-col items-center justify-center min-h-[60vh] mt-20"
          >
            <motion.div
              className="flex items-center relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              {/* STEM Text */}
              <motion.h1
                ref={stemRef}
                className="sm:text-12xl text-4xl font-extrabold font-heading text-champagne_pink drop-shadow-lg"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                STEM
              </motion.h1>
              
              {/* Lottie Animation */}
              <motion.div
                ref={lottieContainerRef}
                className="-mx-3 mt-4"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                style={{ transformOrigin: "center" }}
                aria-hidden="true"
              >
                <Lottie 
                  options={lottieOptions} 
                  height={isDesktop ? 80 : 40} 
                  width={isDesktop ? 80 : 40} 
                />
              </motion.div>
              
              {/* PROJECTS Text */}
              <motion.h1
                ref={collabRef}
                className="sm:text-12xl text-4xl font-extrabold font-heading text-champagne_pink drop-shadow-lg"
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                PROJECTS
              </motion.h1>
            </motion.div>
          </header>

          {/* ===== INTRODUCTION TEXT ===== */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="intro-text mb-12"
          >
            <p className="text-xl sm:text-2xl font-description leading-relaxed">
              Driven by an insatiable curiosity, I dive headfirst into the unknown, where every challenge is a call to adventure. Each obstacle I encounter isn't a barrier but a spark that ignites my imagination, leading me to craft innovative solutions and embark on exciting projects. Through hands-on experimentation with code and design, I not only hone my skills but also keep the flame of excitement burning bright, always eager for the next discovery. This journey is a testament to my unwavering commitment to exploration, problem-solving, and pushing the boundaries of what's possible, where every creation is a chapter in my story of turning curiosity into impactful innovation.
            </p>
          </motion.div>

          {/* ===== COLLABORATION DESCRIPTION ===== */}
          <motion.div
            ref={descriptionRef}
            className="text-center mb-12 mt-32 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="text-lg sm:text-xl font-description leading-relaxed bg-gradient-to-r from-lemon_chiffon via-aquamarine to-champagne_pink bg-clip-text text-transparent">
              Collaborated with Muzahidul Islam Abir on various STEM projects, with ongoing projects to be added soon.
            </p>
          </motion.div>

          {/* ===== PREMIUM TAB NAVIGATION ===== */}
          <motion.nav
            ref={buttonsRef}
            className="flex justify-center mb-16 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            role="tablist"
            aria-label="Portfolio navigation"
          >
            {/* Tab Container with Glass Morphism */}
            <div className="relative bg-gradient-to-r from-deep_indigo/40 via-dark_teal/30 to-deep_indigo/40 backdrop-blur-xl border border-aquamarine/20 rounded-full p-2 shadow-3xl">
              
              {/* Floating Background Elements */}
              <div 
                className="absolute -inset-4 bg-gradient-to-r from-aquamarine/10 to-jordy_blue/10 rounded-full blur-xl opacity-50 animate-pulse"
                aria-hidden="true"
              ></div>
              
              <div className="flex space-x-2 relative z-10">
                {["websites", "projects", "courses"].map((tab, index) => (
                  <motion.button
                    key={tab}
                    className={`premium-tab relative px-8 py-2 text-base sm:text-lg font-bold font-cta rounded-full transition-all duration-500 ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-aquamarine via-electric_blue to-jordy_blue text-deep_indigo shadow-2xl"
                        : "text-aquamarine hover:text-lemon_chiffon"
                    }`}
                    onClick={() => setActiveTab(tab)}
                    onMouseEnter={() => setHoveredTab(tab)}
                    onMouseLeave={() => setHoveredTab(null)}
                    variants={tabVariants}
                    initial="inactive"
                    animate={activeTab === tab ? "active" : hoveredTab === tab ? "hover" : "inactive"}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 30,
                      duration: 0.4 
                    }}
                    role="tab"
                    aria-pressed={activeTab === tab}
                    aria-selected={activeTab === tab}
                    aria-controls={`${tab}-panel`}
                    aria-label={`Show ${tab}`}
                    tabIndex={activeTab === tab ? 0 : -1}
                  >
                    {/* Tab Glow Effect */}
                    <div className={`tab-glow ${activeTab === tab ? 'active' : ''}`} aria-hidden="true"></div>
                    
                    {/* Premium Shimmer Effect */}
                    {activeTab === tab && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity, 
                          repeatDelay: 3,
                          ease: "easeInOut"
                        }}
                        style={{ borderRadius: "inherit" }}
                        aria-hidden="true"
                      />
                    )}
                    
                    <span className="relative z-10">
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </span>
                    
                    {/* Active Indicator Dots */}
                    {activeTab === tab && (
                      <motion.div
                        className="absolute -bottom-2 left-1/2 w-2 h-2 bg-aquamarine rounded-full"
                        initial={{ scale: 0, x: "-50%" }}
                        animate={{ scale: 1, x: "-50%" }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        aria-hidden="true"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
              
              {/* Animated Progress Bar */}
              <motion.div
                className="absolute bottom-0 h-1 bg-gradient-to-r from-aquamarine to-electric_blue rounded-full"
                initial={false}
                animate={{
                  left: `${2 + (["websites", "projects", "courses"].indexOf(activeTab) * 33.33)}%`,
                  width: "29.33%",
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 25,
                  duration: 0.6 
                }}
                aria-hidden="true"
              />
            </div>
          </motion.nav>

          {/* ===== CARDS SECTION ===== */}
          <div 
            ref={cardsRef}
            role="tabpanel"
            id={`${activeTab}-panel`}
            aria-labelledby={`${activeTab}-tab`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {groupedData.map((group, rowIndex) => (
                  <motion.div 
                    key={`${activeTab}-row-${rowIndex}`}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-8 mb-12"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: rowIndex * 0.2, duration: 0.6 }}
                  >
                    {group.map((item, cardIndex) => (
                      <Card 
                        key={`${activeTab}-${item.title || item.name}-${cardIndex}`}
                        data={item} 
                        onClick={setSelectedProject} 
                      />
                    ))}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ===== PROJECT DETAILS MODAL ===== */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              onClick={(e) => {
                if (e.target === e.currentTarget) setSelectedProject(null);
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <motion.div
                className="bg-gradient-to-br from-deep_indigo/95 via-dark_teal/90 to-deep_indigo/95 backdrop-blur-xl border border-aquamarine/30 p-6 sm:p-10 rounded-3xl w-11/12 sm:w-4/5 md:w-3/4 lg:w-3/5 max-h-[90vh] overflow-y-auto shadow-3xl relative"
                initial={{ scale: 0.7, opacity: 0, y: 100, rotateX: -15 }}
                animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
                exit={{ scale: 0.7, opacity: 0, y: 100, rotateX: -15 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30,
                  duration: 0.6 
                }}
              >
                {/* Close Button */}
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-3 rounded-full bg-gradient-to-r from-tea_rose/20 to-champagne_pink/20 text-aquamarine hover:from-aquamarine hover:to-electric_blue hover:text-deep_indigo backdrop-blur-sm border border-aquamarine/30 transition-all duration-300 z-10"
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 500 }}
                  aria-label="Close project details"
                >
                  ✕
                </motion.button>
                
                {/* Modal Content */}
                <motion.h2
                  id="modal-title"
                  className="mb-6 font-heading text-3xl sm:text-4xl font-bold text-transparent bg-gradient-to-r from-aquamarine to-electric_blue bg-clip-text tracking-tight"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                >
                  {selectedProject.title || selectedProject.name}
                </motion.h2>
                
                <motion.p
                  id="modal-description"
                  className="mb-8 text-base sm:text-lg font-description leading-relaxed text-lemon_chiffon/90"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                >
                  {selectedProject.detailedDescription}
                </motion.p>
                
                {/* Tags */}
                {selectedProject.tags && selectedProject.tags.length > 0 && (
                  <motion.div
                    className="flex flex-wrap gap-3 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    role="list"
                    aria-label="Project technologies and tags"
                  >
                    {selectedProject.tags.map((tag, idx) => (
                      <motion.span
                        key={`modal-tag-${tag.name}-${idx}`}
                        className={`text-sm font-semibold font-description ${tag.color} px-4 py-2 rounded-full bg-dark_teal/30 backdrop-blur-sm border border-aquamarine/20 shadow-lg hover:bg-aquamarine hover:text-deep_indigo transition-all duration-300`}
                        whileHover={{ scale: 1.15, y: -2 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        role="listitem"
                      >
                        #{tag.name}
                      </motion.span>
                    ))}
                  </motion.div>
                )}
                
                {/* Images Gallery */}
                <motion.div
                  className="relative mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedProject.images.map((image, idx) => (
                      <motion.img
                        key={`modal-image-${idx}`}
                        src={image}
                        alt={`${selectedProject.title || selectedProject.name} screenshot ${idx + 1}`}
                        className="object-cover w-full h-48 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-aquamarine/20"
                        loading="lazy"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.03, y: -5 }}
                        transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                      />
                    ))}
                  </div>
                </motion.div>
                
                {/* Action Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row justify-center gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
                >
                  {selectedProject.type === "website" && selectedProject.website_link && (
                    <motion.a
                      href={selectedProject.website_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 text-lg font-bold font-cta rounded-2xl bg-gradient-to-r from-aquamarine to-electric_blue text-deep_indigo shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      aria-label={`Visit ${selectedProject.title || selectedProject.name} website`}
                    >
                      <FaEye className="group-hover:scale-110 transition-transform" aria-hidden="true" />
                      Visit Website
                    </motion.a>
                  )}
                  {selectedProject.source_code_link && selectedProject.source_code_link !== "#" && (
                    <motion.a
                      href={selectedProject.source_code_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 text-lg font-bold font-cta rounded-2xl bg-gradient-to-r from-dark_teal/80 to-deep_indigo/80 text-aquamarine border border-aquamarine/30 backdrop-blur-sm shadow-xl hover:from-aquamarine hover:to-electric_blue hover:text-deep_indigo hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      aria-label={`View ${selectedProject.title || selectedProject.name} ${selectedProject.type === "website" ? "source code" : "project details"}`}
                    >
                      {selectedProject.type === "website" ? (
                        <FiGithub className="group-hover:scale-110 transition-transform" aria-hidden="true" />
                      ) : (
                        <FaEye className="group-hover:scale-110 transition-transform" aria-hidden="true" />
                      )}
                      {selectedProject.type === "website" ? "Source Code" : "View Project"}
                    </motion.a>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};

/**
 * SEO-friendly default export with display name
 * Enables better debugging and component identification
 */
Website.displayName = 'STEMPortfolioWebsite';

/**
 * Default props for the component (if needed for future extensions)
 * @type {Object}
 */
Website.defaultProps = {
  // Future props can be added here for customization
};

/**
 * PropTypes for type checking (uncomment if using prop-types library)
 * Website.propTypes = {
 *   initialTab: PropTypes.oneOf(['websites', 'projects', 'courses']),
 *   showAnimations: PropTypes.bool,
 *   responsiveBreakpoint: PropTypes.number,
 * };
 */

export default Website;

