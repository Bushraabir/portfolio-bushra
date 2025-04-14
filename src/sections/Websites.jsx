import React, { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tilt as ReactTilt } from "react-tilt";
import Lottie from "react-lottie";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import animationData from "../assets/animation/coding1.json";
import { FiGithub } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
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
import Tube2 from "../assets/Website/EmpTube/1.png";
import Tube3 from "../assets/Website/EmpTube/1.png";


import relevia1 from "../assets/Website/relevia/1.png";
import relevia2 from "../assets/Website/relevia/2.png";
import relevia3 from "../assets/Website/relevia/3.png";
import relevia4 from "../assets/Website/relevia/4.png";
import relevia5 from "../assets/Website/relevia/5.png";
import relevia6 from "../assets/Website/relevia/6.png";
import relevia7   from "../assets/Website/relevia/7.png";





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

gsap.registerPlugin(ScrollTrigger);

const Website = () => {
  const [activeTab, setActiveTab] = useState("websites");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDesktop, setIsDesktop] = useState(typeof window !== "undefined" ? window.innerWidth > 768 : true);

  const initialMessageRef = useRef(null);
  const stemRef = useRef(null);
  const collabRef = useRef(null);
  const lottieContainerRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isDesktop) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: initialMessageRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
          pin: true,
        },
      });
      tl.to(stemRef.current, { x: -1500, scale: 4, ease: "power4.out" }, 0)
        .to(collabRef.current, { x: 2500, scale: 4, ease: "power4.out" }, 0)
        .to(lottieContainerRef.current, { scale: 50, ease: "power4.out" }, 0)
        .to(lottieContainerRef.current, { opacity: 0, ease: "power4.out" }, 0.1);

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

      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 150 },
        {
          opacity: 1,
          y: 0,
          ease: "expo.out",
          duration: 1.5,
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [isDesktop]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };

  const courses = [
    {
      type: "course",
      name: "Satellite Engineering Course",
      description: "An introductory course on satellite systems and engineering, covering the basics of satellite design, operations, and technologies used in modern space exploration.",
      tags: [
        { name: "Satellite Engineering", color: "text-cyan-400" },
        { name: "Space Tech", color: "text-pink-400" },
        { name: "STEM Education", color: "text-pink-400" },
        { name: "Satellite System", color: "text-pink-400" },
        { name: "Space Exploration", color: "text-pink-400" },
      ],
      images: [Satellite],
      detailedDescription: "An introductory course on satellite systems and engineering, covering the basics of satellite design, operations, and technologies used in modern space exploration.",
     
    },
    {
      type: "course",
      name: "Rocket Propulsion Systems",
      description: "An introductory course on rocket propulsion, focusing on the principles of thrust, engine design, and the technologies driving modern rocketry.",
      tags: [
        { name: "Rocket Production", color: "text-yellow-500" },
        { name: "Rocket Science", color: "text-green-500" },
        { name: "Space Engineering", color: "text-pink-400" },
        { name: "STEM", color: "text-pink-400" },
        { name: "Thrust", color: "text-pink-400" },
        { name: "Aerospace Tech", color: "text-pink-400" },
      ],
      images: [Rocket],
      detailedDescription: "An introductory course on rocket propulsion, focusing on the principles of thrust, engine design, and the technologies driving modern rocketry.",
     
    },
    {
      type: "course",
      name: "Introduction to Aerospace Engineering and Design",
      description: "An introductory course on aerospace engineering, focusing on the principles of aircraft and spacecraft design, aerodynamics, and propulsion systems.",
      tags: [
        { name: "AeroSpace Engineering", color: "text-cyan-400" },
        { name: "Aircraft Design", color: "text-pink-400" },
        { name: "Aerodynamics", color: "text-pink-400" },
        { name: "Space Tech", color: "text-pink-400" },
        { name: "Spacecraft Design", color: "text-pink-400" },
      ],
      images: [AeroSpace],
      detailedDescription: "An introductory course on aerospace engineering, focusing on the principles of aircraft and spacecraft design, aerodynamics, and propulsion systems.",
      
    },
    {
      type: "course",
      name: "Nuclear Science and Engineering",
      description: "An introductory course on nuclear science, covering the fundamentals of nuclear reactions, reactor design, and applications in energy production and medical technology.",
      tags: [
        { name: "Nuclear Science", color: "text-cyan-400" },
        { name: "Nuclear Engineering", color: "text-pink-400" },
        { name: "Energy Tech", color: "text-pink-400" },
        { name: "Reactor Design", color: "text-pink-400" },
        { name: "Atomic Energy", color: "text-pink-400" },
      ],
      images: [Nuclear],
      detailedDescription: "An introductory course on nuclear science, covering the fundamentals of nuclear reactions, reactor design, and applications in energy production and medical technology.",
     
    },
  ];

  const websites = [
    {
      type: "website",
      title: "EmpowerEd Website",
      description: "A dynamic and visually engaging web platform for accessible quality education.",
      tags: [
        { name: "React", color: "text-cyan-400" },
        { name: "GSAP", color: "text-pink-400" },
        { name: "ScrollTrigger", color: "text-pink-400" },
        { name: "Lottie Animation", color: "text-pink-400" },
        { name: "React Vertical Timeline Component", color: "text-pink-400" },
        { name: "EmailJS", color: "text-pink-400" },
        { name: "Vite", color: "text-pink-400" },
        { name: "CSS & Media Queries", color: "text-pink-400" },
        { name: "React Router", color: "text-pink-400" },
      ],
      images: [emp3, emp1, emp2, emp3, emp4, emp5, emp6],
      detailedDescription: "EmpowerEd is a comprehensive educational platform designed to empower students through various resources and support systems. The website features a clean, modern design with immersive animations and interactive elements that enhance user engagement. Built with React.js, it leverages GSAP for smooth animations, ScrollTrigger for interactive scroll effects, and Framer Motion for additional dynamic movements. The platform includes a contact form integrated with EmailJS for communication, a vertical timeline component to showcase the organization's journey, and responsive design techniques using CSS and media queries to ensure accessibility across devices. React Router manages the navigation between different sections of the platform, creating a seamless user experience. EmpowerEd offers students a range of services including mentorship opportunities, mental health support, research funding, scholarship information, and guidance for studying abroad. The platform's design emphasizes accessibility and usability, making educational resources available to a diverse student population.",
      source_code_link: "https://github.com/Bushraabir/empowereducation",
      website_link: "https://bushraabir.github.io/empowereducation/"
    },
    {
      type: "website",
      title: "Periodic Table Visualizer",
      description: "An interactive web application for exploring the periodic table with dynamic visualizations.",
      tags: [
        { name: "Python", color: "text-yellow-500" },
        { name: "Streamlit", color: "text-red-400" },
        { name: "Plotly", color: "text-blue-500" },
        { name: "Pandas", color: "text-green-400" },
        { name: "Data Visualization", color: "text-purple-500" }
      ],
      images: [PeriodicTableVisualiser2, PeriodicTableVisualiser1, PeriodicTableVisualiser3, PeriodicTableVisualiser4, PeriodicTableVisualiser5, PeriodicTableVisualiser6],
      detailedDescription: "The Periodic Table Visualizer is an interactive web application built with Python, Streamlit, Plotly, and Pandas. It offers a comprehensive exploration of chemical elements through various interactive features including an interactive periodic table, data analysis tools, trend visualization, 3D analytics, element gallery, and detailed element information. The application provides users with the ability to filter elements by various properties, visualize trends across atomic numbers, analyze relationships between element properties in 3D space, and view detailed information about each element including physical and chemical properties.",
      source_code_link: "https://github.com/Bushraabir/periodic_table_visualizer",
      website_link: "https://periodictablevisualizer.streamlit.app/"
    },
    {
      type: "website",
      title: "Study Buddy",
      description: "An interactive study companion designed to boost student productivity with smart learning tools.",
      tags: [
        { "name": "React", "color": "text-blue-400" },
        { "name": "GSAP", "color": "text-green-400" },
        { "name": "Framer Motion", "color": "text-purple-400" },
        { "name": "Lottie Animation", "color": "text-yellow-400" },
        { "name": "React Router", "color": "text-indigo-400" },
        { "name": "Firebase Authentication", "color": "text-red-400" },
        { "name": "Firebase Firestore", "color": "text-orange-400" },
        { "name": "Formik & Yup", "color": "text-teal-400" },
        { "name": "ReactQuill", "color": "text-pink-400" },
        { "name": "Plotly.js", "color": "text-cyan-400" },
        { "name": "Math.js", "color": "text-emerald-400" }
      ],
      images: [StudyBuddy2, StudyBuddy1, StudyBuddy3, StudyBuddy4, StudyBuddy5, StudyBuddy6, StudyBuddy7, StudyBuddy8],
      detailedDescription: "Study Buddy is an interactive educational application designed to enhance student productivity through a comprehensive suite of study tools. The platform combines interactive flashcards with quiz functionality, a Pomodoro-based session manager for time tracking, an advanced graphing calculator supporting multiple equation types, and a smart note-taking system with real-time synchronization via Firebase. Built using React.js, GSAP, Framer Motion, and Plotly.js, Study Buddy delivers a modern, responsive learning experience with premium animations and intuitive design. The application implements secure user authentication, personalized study tracking, and mathematical computation capabilities through math.js, creating a complete study solution that helps students maximize their academic performance.",
      source_code_link: "https://github.com/Bushraabir/study-buddy",
      website_link: "https://bushraabir.github.io/study-buddy/"
    },

    {
      type: "website",
      title: "Space Invaders: Nebula Assault",
      description: "A modern take on the classic Space Invaders game, built with React, Three.js, and Zustand. Navigate your spaceship through a cosmic battlefield, fend off enemy waves, collect power-ups, and survive the nebula onslaught!",
      tags: [
        { name: "React", color: "text-blue-500" },
        { name: "Three.js", color: "text-purple-500" },
        { name: "Zustand", color: "text-green-500" },
        { name: "TypeScript", color: "text-yellow-500" },
        { name: "WebGL", color: "text-red-500" },
        { name: "Game Development", color: "text-pink-500" },
        { name: "3D Graphics", color: "text-indigo-500" },
        { name: "Particle Effects", color: "text-orange-500" },
        { name: "Styled Components", color: "text-teal-500" }
      ],
      images: [Space2, Space1, Space3, ],
      detailedDescription: "Space Invaders: Nebula Assault is a dynamic space shooter game built with modern web technologies. The game features 3D graphics powered by Three.js, with a dynamic starfield, detailed spaceship models, and enemy ships. Players can control their spaceship using arrow keys and shoot with the spacebar, while fending off waves of enemies with straight or zigzag movement patterns. The game includes collectibles for bonus points, power-ups (speed boost, shield, and multi-shot), and impressive visual effects like explosions and thruster particles. The state management is handled efficiently with Zustand, and the game features post-processing effects like bloom via @react-three/postprocessing. The user interface is styled with styled-components, providing responsive start, game, and game-over screens with a heads-up display (HUD) showing score, lives, and audio toggle.",
      source_code_link: "https://github.com/Bushraabir/space-invaders",
      website_link: "https://bushraabir.github.io/space-invaders/"
    },

    {
      type: "website",
      title: "Relevia",
      description: "An interactive web application designed to help individuals manage and overcome panic attacks through resources, tools, and support.",
      tags: [
        { "name": "React", "color": "text-cyan-500" },
        { "name": "JavaScript", "color": "text-yellow-500" },
        { "name": "Tailwind CSS", "color": "text-blue-500" },
        { "name": "Framer Motion", "color": "text-purple-500" },
        { "name": "Mental Health", "color": "text-green-500" }
      ],
      images: [relevia1, relevia2, relevia3, relevia4, relevia5 , relevia6, relevia7],
      detailedDescription: "Relevia is an interactive web application built with React, Tailwind CSS, and Framer Motion, aimed at assisting individuals in managing and overcoming panic attacks. Developed by EmpowerED Global, it offers a comprehensive set of features including a resource library with articles and guides, interactive tools such as breathing exercises and grounding techniques, and sections for learning about panic attacks, coping strategies, medication information, and contact support. The application features an animated and responsive user interface, ensuring a smooth experience on both mobile and desktop devices. Relevia aims to raise awareness about panic attacks and provide accessible tools for emotional regulation and coping. It includes components like About, Contact, Coping, Home, Medication, and Resources, each designed to be user-friendly and supportive.",
      source_code_link: "https://github.com/Bushraabir/relevia",
      website_link: "https://bushraabir.github.io/relevia/"
    },


    {
      type: "website",
      title: "EmpowerTube - Educational Content Hub",
      description: "An web application for managing and organizing educational content. Supports videos, PDFs, and articles with advanced filtering, dark mode, and drag-and-drop functionality.",
      tags: [
        { name: "HTML", color: "text-green-400" },
        { name: "CSS", color: "text-blue-400" },
        { name: "JavaScript", color: "text-yellow-400" },
      ],
      images: [Tube1, Tube2, Tube3, ],
      detailedDescription: "EmpowerTube is a comprehensive web application designed to help educators and students organize and manage educational content efficiently. The platform supports multiple content formats including YouTube videos, PDF documents, and articles, allowing users to create, read, update, and delete content with ease. Its intelligent organization system enables drag-and-drop rearrangement of content items, making it simple to structure learning materials logically. Advanced filtering options allow users to search by title or content, filter by category, and identify favorite content quickly. Multiple sorting options (Newest, Oldest, Popular) help users find content based on their specific needs. The application features an automatic dark/light mode that detects system preferences for comfortable viewing in any lighting condition. A favorites system allows users to mark and filter their most important content. The modern, minimalist interface with smooth animations ensures an intuitive user experience across all devices. EmpowerTube utilizes LocalStorage for persistent data storage, ensuring content remains available even when offline. Client-side PDF upload and preview functionality allows for seamless document handling without server dependency. Performance optimizations like lazy loading and efficient rendering ensure smooth operation even with large content libraries. Comprehensive error handling and user feedback mechanisms provide a reliable experience, while the use of vanilla JavaScript (without frameworks) keeps the application lightweight and fast. The implementation of CSS Variables and Modern Layout techniques (Grid/Flexbox) creates a responsive, adaptable interface that works perfectly on desktops, tablets, and mobile devices. Font Awesome 6 icons enhance the visual experience with professional-grade symbols throughout the interface.",
      source_code_link: "https://github.com/Bushraabir/EmpowerTube",
      website_link: "https://bushraabir.github.io/EmpowerTube/"
    },
  ];

  const projects = [
    {
      type: "project",
      name: "Building a Self-Made Satellite with a Self-Made Rocket",
      description: "This project involves designing and building a satellite along with a custom rocket, powered by hydrogen and oxygen fuel that is processed by us. The satellite will include a transmitter to send its location back to us. The ultimate goal is to launch the satellite into Low Earth Orbit (LEO), aiming to reach the Kármán Line.",
      tags: [],
      images: [Satellite1],
      detailedDescription: "This project involves designing and building a satellite along with a custom rocket, powered by hydrogen and oxygen fuel that is processed by us. The satellite will include a transmitter to send its location back to us. The ultimate goal is to launch the satellite into Low Earth Orbit (LEO), aiming to reach the Kármán Line.",
      
    },
    {
      type: "project",
      name: "Aquarium Water Purification System",
      description: "This project involves designing and building a custom aquarium water purifier equipped with a 12V water pump. The system will reduce ammonia levels, remove fish waste, and promote the growth of beneficial plankton while maintaining balanced oxygen levels in the water.",
      tags: [],
      images: [Aquarium],
      detailedDescription: "This project involves designing and building a custom aquarium water purifier equipped with a 12V water pump. The system will reduce ammonia levels, remove fish waste, and promote the growth of beneficial plankton while maintaining balanced oxygen levels in the water. The purifier will include a filtration mechanism to ensure clean and healthy water for aquatic life. The ultimate goal is to create a self-sustaining ecosystem within the aquarium, ensuring optimal water quality and supporting the well-being of the fish and other aquatic organisms.",
      
    },
    {
      type: "project",
      name: "Quadcopter Drone for Aerial Photography and Surveillance",
      description: "This project involves designing and assembling a customizable quadcopter drone using off-the-shelf components. The drone will be equipped with a camera for aerial photography, basic flight stabilization, and remote-control capabilities.",
      tags: [],
      images: [Drone],
      detailedDescription: "This project involves designing and assembling a customizable quadcopter drone using off-the-shelf components. The drone will be equipped with a camera for aerial photography, basic flight stabilization, and remote-control capabilities. The ultimate goal is to create a cost-effective, modular drone for hobbyist aerial imaging, environmental monitoring, or educational purposes, while learning principles of aerodynamics, electronics, and robotics.",
     
    },
    {
      type: "project",
      name: "Bio Diesel Production System",
      description: "This project involves designing and constructing a small-scale bio diesel reactor that converts waste cooking oil, vegetable oil, or animal fats into usable bio diesel fuel.",
      tags: [],
      images: [Bio],
      detailedDescription: "This project involves designing and constructing a small-scale bio diesel reactor that converts waste cooking oil, vegetable oil, or animal fats into usable bio diesel fuel. The system will use a chemical process called transesterification to break down triglycerides into fatty acid methyl esters (FAME), producing clean-burning bio diesel. The ultimate goal is to create a sustainable, low-cost method to recycle waste oils into renewable fuel for vehicles, generators, or heating systems, reducing reliance on fossil fuels and lowering carbon emissions.",
      
    },
    {
      type: "project",
      name: "Telescope for Amateur Astronomy",
      description: "This project involves designing and constructing a simple, low-cost refracting telescope using affordable, off-the-shelf components.",
      tags: [],
      images: [Telescope],
      detailedDescription: "This project involves designing and constructing a simple, low-cost refracting telescope using affordable, off-the-shelf components. The telescope will use optical lenses to collect and focus light, enabling observation of celestial objects like the Moon, planets, and bright star clusters. The ultimate goal is to create a functional, portable telescope for educational purposes learning fundamental principles of optics and astronomy.",
     
    },
    {
      type: "project",
      name: "Bio Gas Plant for Household Energy",
      description: "This project involves designing and constructing a small-scale bio gas system that converts organic household waste into methane gas and organic fertilizer.",
      tags: [],
      images: [Biogas],
      detailedDescription: "This project involves designing and constructing a small-scale bio gas system that converts organic household waste (e.g., kitchen scraps, garden waste, or livestock manure) into methane gas and organic fertilizer. The main goal is to use human feces as it is cost-free and challenging to manage as waste. The system will use anaerobic digestion to break down waste, capture methane for cooking or heating, and produce nutrient-rich slurry for gardening and farming. The ultimate goal is to create a sustainable, closed-loop energy solution that reduces waste, lowers reliance on fossil fuels, and supports eco-friendly agriculture.",
     
    },
  ];

  const activeData = activeTab === "websites" ? websites : activeTab === "projects" ? projects : courses;
  const groupedData = activeData.reduce((acc, cur, i) => {
    if (i % 2 === 0) acc.push(activeData.slice(i, i + 2));
    return acc;
  }, []);

  const Card = memo(({ data, onClick }) => {
    const title = data.title || data.name;
    const { description, tags, images, source_code_link, type, website_link } = data;
    return (
      <motion.div
        onClick={() => onClick(data)}
        className="mx-auto w-full max-w-[550px] p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-deep_indigo via-dark_teal to-deep_indigo border border-dark_teal cursor-pointer overflow-hidden"
        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {isDesktop ? (
          <ReactTilt options={{ max: 20, scale: 1.05, speed: 400 }} className="relative w-full h-[250px] mb-6 overflow-hidden rounded-2xl">
            <motion.img
              src={images[0]}
              alt={title}
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
            <div className="absolute inset-0 flex justify-end m-4 space-x-2">
              {type === "website" && (
                <motion.div
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(website_link, "_blank");
                  }}
                  className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-gradient-to-r from-aquamarine to-jordy_blue cursor-pointer"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaEye size={28} color="white" />
                </motion.div>
              )}
              <motion.div
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(source_code_link, "_blank");
                }}
                className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-gradient-to-r from-aquamarine to-jordy_blue cursor-pointer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {type === "website" ? <FiGithub size={28} color="white" /> : <FaEye size={28} color="white" />}
              </motion.div>
            </div>
          </ReactTilt>
        ) : (
          <div className="relative w-full h-[250px] mb-6 overflow-hidden rounded-2xl">
            <motion.img
              src={images[0]}
              alt={title}
              className="object-cover w-full h-full rounded-xl"
              loading="lazy"
              whileTap={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 flex justify-end m-4 space-x-2">
              {type === "website" && (
                <motion.div
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(website_link, "_blank");
                  }}
                  className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-gradient-to-r from-aquamarine to-jordy_blue cursor-pointer"
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaEye size={28} color="white" />
                </motion.div>
              )}
              <motion.div
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(source_code_link, "_blank");
                }}
                className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-gradient-to-r from-aquamarine to-jordy_blue cursor-pointer"
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                {type === "website" ? <FiGithub size={28} color="white" /> : <FaEye size={28} color="white" />}
              </motion.div>
            </div>
          </div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6"
        >
          <h6 className="sm:text-4xl text-2xl font-heading text-aquamarine font-extrabold tracking-tight">{title}</h6>
          <p className="mt-3 font-description text-lemon_chiffon text-sm sm:text-base leading-relaxed">{description}</p>
        </motion.div>
        <motion.div
          className="flex flex-wrap gap-3 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {tags.slice(0, 3).map((tag, index) => (
            <motion.span
              key={index}
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

  return (
    <>
      <style>{`
        .website-section {
          background: linear-gradient(135deg, #1E1B4B 0%, #134E5E 50%, #1E1B4B 100%);
          position: relative;
          overflow: hidden;
        }
        .website-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%);
          animation: rotateGlow 20s linear infinite;
        }
        @keyframes rotateGlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <section id="websites" className="py-16 lg:py-24 website-section text-lemon_chiffon">
        <div className="container mx-auto px-6 lg:px-20 relative z-10">
          <div ref={initialMessageRef} className="flex flex-col items-center justify-center min-h-screen mt-20">
            <motion.div
              className="flex items-center relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <motion.h1
                ref={stemRef}
                className="sm:text-12xl text-4xl font-extrabold font-heading text-champagne_pink drop-shadow-lg"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                STEM
              </motion.h1>
              <motion.div
                ref={lottieContainerRef}
                className="-mx-3 mt-4"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              >
                <Lottie options={lottieOptions} height={isDesktop ? 80 : 40} width={isDesktop ? 80 : 40} />
              </motion.div>
              <motion.h1
                ref={collabRef}
                className="sm:text-12xl text-4xl font-extrabold font-heading text-champagne_pink drop-shadow-lg"
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                Collaboration
              </motion.h1>
            </motion.div>
          </div>

          <motion.div
            ref={descriptionRef}
            className="text-center mb-12 mt-32 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="text-lg sm:text-xl font-description text-lemon_chiffon leading-relaxed">
              Collaborated with  Muzahidul Islam Abir on various STEM projects, with ongoing projects to be added soon.
            </p>
          </motion.div>

          <motion.div
            ref={buttonsRef}
            className="flex justify-center mb-12 space-x-4 sm:space-x-6 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            {["websites", "projects", "courses"].map((tab) => (
              <motion.button
                key={tab}
                className={`py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 text-base sm:text-lg font-medium rounded-full shadow-xl transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-champagne_pink to-tea_rose text-dark_teal"
                    : "bg-dark_teal/20 text-champagne_pink border border-champagne_pink/50 hover:bg-gradient-to-r hover:from-champagne_pink hover:to-tea_rose hover:text-dark_teal"
                }`}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.1, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
            <motion.div
              className="absolute -bottom-2 h-1 bg-champagne_pink rounded-full"
              initial={false}
              animate={{
                left: `${["websites", "projects", "courses"].indexOf(activeTab) * 33.33}%`,
                width: "33.33%",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ width: "33.33%" }}
            />
          </motion.div>

          <div ref={cardsRef}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {groupedData.map((group, rowIndex) => (
                  <div key={rowIndex} className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-4 sm:px-8 mb-12">
                    {group.map((item, cardIndex) => (
                      <Card key={cardIndex} data={item} onClick={setSelectedProject} />
                    ))}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark_teal bg-opacity-80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedProject(null);
              }
            }}
          >
            <motion.div
              className="bg-gradient-to-br from-lemon_chiffon via-tea_rose to-champagne_pink p-6 sm:p-8 rounded-3xl w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 max-h-[85vh] overflow-y-auto shadow-2xl border-2 border-lemon_chiffon/50 relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <motion.button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full shadow-lg bg-aquamarine text-lemon_chiffon"
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                ✕
              </motion.button>
              <motion.h2
                className="mb-6 font-heading text-3xl sm:text-4xl font-extrabold text-dark_teal tracking-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {selectedProject.title || selectedProject.name}
              </motion.h2>
              <motion.p
                className="mb-8 text-lg font-description leading-relaxed text-deep_indigo"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {selectedProject.detailedDescription}
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-3 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {selectedProject.tags.map((tag, idx) => (
                  <motion.span
                    key={idx}
                    className={`text-sm font-semibold font-description ${tag.color} px-4 py-2 rounded-full shadow-md bg-dark_teal/20`}
                    whileHover={{ scale: 1.1, backgroundColor: "#26C6DA" }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    #{tag.name}
                  </motion.span>
                ))}
              </motion.div>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {selectedProject.images.map((image, idx) => (
                  <motion.img
                    key={idx}
                    src={image}
                    alt={`Image ${idx}`}
                    className="object-cover w-full h-32 rounded-xl shadow-md"
                    loading="lazy"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
                    transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
                  />
                ))}
              </motion.div>
              <motion.div
                className="flex justify-center space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {selectedProject.type === "website" && (
                  <a
                    href={selectedProject.website_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 text-lg font-medium font-cta rounded-full shadow-xl text-lemon_chiffon bg-gradient-to-r from-aquamarine to-jordy_blue transition-all hover:shadow-2xl"
                  >
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      View Website
                    </motion.span>
                  </a>
                )}
                <a
                  href={selectedProject.source_code_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 text-lg font-medium font-cta rounded-full shadow-xl text-lemon_chiffon bg-gradient-to-r from-aquamarine to-jordy_blue transition-all hover:shadow-2xl"
                >
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {selectedProject.type === "website" ? "View Source Code" : selectedProject.type === "project" ? "Ongoing" : "Ongoing"}
                  </motion.span>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </section>
    </>
  );
};

export default Website;