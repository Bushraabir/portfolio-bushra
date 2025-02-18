import React, { useState, useEffect, useRef, memo } from "react";
import { motion } from "framer-motion";
import { Tilt as ReactTilt } from "react-tilt";
import Lottie from "react-lottie";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import animationData from "../assets/animation/coding1.json";


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
import Sustainibility1 from "../assets/Website/Sustainibility/1.png";
import Sustainibility2 from "../assets/Website/Sustainibility/2.png";
import Sustainibility3 from "../assets/Website/Sustainibility/3.png";
import Sustainibility4 from "../assets/Website/Sustainibility/4.png";
import Sustainibility5 from "../assets/Website/Sustainibility/5.png";





import Satellite from "../assets/Projects/Satellite.png";
import Rocket from "../assets/Projects/Rocket.png";
import Nuclear from "../assets/Projects/Nuclear.png";
import AeroSpace from "../assets/Projects/Aerospace.png";
import Satellite1 from "../assets/Projects/Satellite1.png";
import Aquarium from "../assets/Projects/Aquarium.png";
import Drone from "../assets/Projects/Drone.png";
import Bio from "../assets/Projects/Bio.png";
import Telescope from "../assets/Projects/Telescope.png";


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
      const durationVal = 999000050;
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: initialMessageRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
      tl.to(stemRef.current, { x: -2500, scale: 5.5, ease: "expo.out", duration: durationVal }, 0)
        .to(collabRef.current, { x: 3500, scale: 5.5, ease: "expo.out", duration: durationVal }, 0)
        .to(lottieContainerRef.current, { scale: 65, ease: "expo.out", duration: durationVal }, 0)
        .to(lottieContainerRef.current, { opacity: 0, ease: "expo.out", duration: durationVal }, 0.01);
      gsap.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ease: "expo.out",
          duration: 1.2,
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
      gsap.fromTo(
        buttonsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ease: "expo.out",
          duration: 1.2,
          delay: 0.4,
          scrollTrigger: {
            trigger: buttonsRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "expo.out",
          duration: 1.2,
          delay: 0.6,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [isDesktop]);
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" }
  };
  const courses = [
    {
      name: "Satellite Engineering Course",
      description: "An introductory course on satellite systems and engineering, covering the basics of satellite design, operations, and technologies used in modern space exploration.",
      tags: [
        { name: "Satellite Engineering", color: "text-cyan-400" },
        { name: "Space Tech", color: "text-pink-400" },
        { name: "STEM Education", color: "text-pink-400" },
        { name: "Satellite System", color: "text-pink-400" },
        { name: "Space Exploration", color: "text-pink-400" }
      ],
      images: [Satellite],
      detailedDescription: "An introductory course on satellite systems and engineering, covering the basics of satellite design, operations, and technologies used in modern space exploration.",
      source_code_link: "https://github.com/Bushraabir/empowereducation"
    },
    {
      name: "Rocket Propulsion Systems",
      description: "An introductory course on rocket propulsion, focusing on the principles of thrust, engine design, and the technologies driving modern rocketry.",
      tags: [
        { name: "Rocket Production", color: "text-yellow-500" },
        { name: "Rocket Science", color: "text-green-500" },
        { name: "Space Engineering", color: "text-pink-400" },
        { name: "STEM", color: "text-pink-400" },
        { name: "Thrust", color: "text-pink-400" },
        { name: "Aerospace Tech", color: "text-pink-400" }
      ],
      images: [Rocket],
      detailedDescription: "An introductory course on rocket propulsion, focusing on the principles of thrust, engine design, and the technologies driving modern rocketry.",
      source_code_link: "https://github.com/project-two"
    },
    {
      name: "Introduction to Aerospace Engineering and Design",
      description: "An introductory course on aerospace engineering, focusing on the principles of aircraft and spacecraft design, aerodynamics, and propulsion systems.",
      tags: [
        { name: "AeroSpace Engineering", color: "text-cyan-400" },
        { name: "Aircraft Design", color: "text-pink-400" },
        { name: "Aerodynamics", color: "text-pink-400" },
        { name: "Space Tech", color: "text-pink-400" },
        { name: "Spacecraft Design", color: "text-pink-400" }
      ],
      images: [AeroSpace],
      detailedDescription: "An introductory course on aerospace engineering, focusing on the principles of aircraft and spacecraft design, aerodynamics, and propulsion systems.",
      source_code_link: "https://github.com/Bushraabir/empowereducation"
    },
    {
      name: "Nuclear Science and Engineering",
      description: "An introductory course on nuclear science, covering the fundamentals of nuclear reactions, reactor design, and applications in energy production and medical technology.",
      tags: [
        { name: "Nuclear Science", color: "text-cyan-400" },
        { name: "Nuclear Engineering", color: "text-pink-400" },
        { name: "Energy Tech", color: "text-pink-400" },
        { name: "Reactor Eesign", color: "text-pink-400" },
        { name: "Atomic Energy", color: "text-pink-400" }
      ],
      images: [Nuclear],
      detailedDescription: "An introductory course on nuclear science, covering the fundamentals of nuclear reactions, reactor design, and applications in energy production and medical technology.",
      source_code_link: "https://github.com/Bushraabir/empowereducation"
    }
  ];
  const websites = [
    {
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
        { name: "React Router", color: "text-pink-400" }
      ],
      images: [emp3, emp1, emp2, emp3, emp4, emp5, emp6],
      detailedDescription: "EmpowerEd is a non-profit educational platform designed to provide students with mentorship, mental health support, research funding, scholarship opportunities, and study abroad guidance. It features immersive animations and real-time communication tools, built with React.js, GSAP, Framer Motion, and EmailJS.",
      source_code_link: "https://github.com/Bushraabir/empowereducation"
    },
    {
      title: "Advanced Periodic Table Visualizer",
      description: "An interactive web application for exploring the periodic table with dynamic visualizations.",
      tags: [
        { name: "Python", color: "text-yellow-500" },
        { name: "Streamlit", color: "text-red-400" },
        { name: "Plotly", color: "text-blue-500" },
        { name: "Pandas", color: "text-green-400" },
        { name: "Data Visualization", color: "text-purple-500" }
      ],
      images: [PeriodicTableVisualiser2, PeriodicTableVisualiser1, PeriodicTableVisualiser3, PeriodicTableVisualiser4, PeriodicTableVisualiser5, PeriodicTableVisualiser6],
      detailedDescription: "The Advanced Periodic Table Visualizer is a web tool built with Python, Streamlit, Plotly, and Pandas. It offers interactive data visualizations, filtering options, and insights into periodic trends through charts and 3D visualizations.",
      source_code_link: "https://github.com/Bushraabir/periodic_table_visualizer"
    },
    {
      title: "Study Buddy",
      description: "An interactive study companion designed to boost student productivity with smart learning tools.",
      tags: [
        { name: "React", color: "text-blue-400" },
        { name: "GSAP", color: "text-green-400" },
        { name: "Framer Motion", color: "text-purple-400" },
        { name: "Lottie Animation", color: "text-yellow-400" },
        { name: "React Router", color: "text-indigo-400" },
        { name: "Firebase Authentication", color: "text-red-400" },
        { name: "Firebase Firestore", color: "text-orange-400" },
        { name: "Formik & Yup", color: "text-teal-400" },
        { name: "ReactQuill", color: "text-pink-400" },
        { name: "Plotly.js", color: "text-cyan-400" },
        { name: "Math.js", color: "text-emerald-400" }
      ],
      images: [StudyBuddy2, StudyBuddy1, StudyBuddy3, StudyBuddy4, StudyBuddy5, StudyBuddy6, StudyBuddy7, StudyBuddy8],
      detailedDescription: "Study Buddy is an advanced educational application that enhances study efficiency with interactive flashcards (including quiz mode), a Pomodoro-based session manager, a versatile graphing calculator for multiple equation types, and a smart note-taking system synced in real time via Firebase. Built using React.js, GSAP, Framer Motion, and Plotly.js, it delivers a modern, engaging, and responsive study experience.",
      source_code_link: "https://github.com/Bushraabir/sustainibility"
    },
    {
      title: "Sustainability Adventure",
      description: "A Flask-based web application promoting sustainable living through community events and eco-friendly tips.",
      tags: [
        { name: "Flask", color: "text-green-400" },
        { name: "SQLAlchemy", color: "text-blue-400" },
        { name: "Werkzeug", color: "text-yellow-400" },
        { name: "Flask-Login", color: "text-red-400" },
        { name: "Jinja2", color: "text-purple-400" },
        { name: "HTML", color: "text-pink-400" },
        { name: "CSS", color: "text-indigo-400" },
        { name: "JavaScript", color: "text-yellow-300" }
      ],
      images: [Sustainibility1, Sustainibility2, Sustainibility3, Sustainibility4, Sustainibility5],
      detailedDescription: "Sustainability Adventure is a dynamic Flask-based application that encourages eco-friendly living through community events, user engagement, and curated sustainability tips. With secure authentication, event management, and an admin dashboard, it provides a responsive and modern interface built with Flask, SQLAlchemy, and Flask-Login.",
      source_code_link: "https://github.com/your-username/sustainability-adventure"
    }
  ];
  const projects = [
    {
      name: " Building a Self-Made Satellite with a Self-Made Rocket",
      description: "This project involves designing and building a satellite along with a custom rocket, powered by hydrogen and oxygen fuel that is processed by us. The satellite will include a transmitter to send its location back to us. The ultimate goal is to launch the satellite into Low Earth Orbit (LEO), aiming to reach the Kármán Line.",
      tags: [],
      images: [Satellite1],
      detailedDescription:
        "This project involves designing and building a satellite along with a custom rocket, powered by hydrogen and oxygen fuel that is processed by us. The satellite will include a transmitter to send its location back to us. The ultimate goal is to launch the satellite into Low Earth Orbit (LEO), aiming to reach the Kármán Line.",
      source_code_link: "https://github.com/Bushraabir/empowereducation"
    },


    {
      name: "Aquarium Water Purification System",
      description: "This project involves designing and building a satellite along with a custom rocket, powered by hydrogen and oxygen fuel that is processed by us. The satellite will include a transmitter to send its location back to us. The ultimate goal is to launch the satellite into Low Earth Orbit (LEO), aiming to reach the Kármán Line.",
      tags: [],
      images: [Aquarium],
      detailedDescription: "This project involves designing and building a custom aquarium water purifier equipped with a 12V water pump. The system will reduce ammonia levels, remove fish waste, and promote the growth of beneficial planktonwhile maintaining balanced oxygen levels in the water. The purifier will include a filtration mechanism to ensure clean and healthy water for aquatic life. The ultimate goal is to create a self-sustaining ecosystem within the aquarium, ensuring optimal water quality and supporting the well-being of the fish and other aquatic organisms.",
      source_code_link: "https://github.com/Bushraabir/empowereducation"
    },

    {
      name: "Quadcopter Drone for Aerial Photography and Surveillance",
      description: "This project involves designing and assembling a customizable quadcopter drone using off-the-shelf components. The drone will be equipped with a camera for aerial photography, basic flight stabilization, and remote-control capabilities. The ultimate goal is to create a cost-effective, modular drone for hobbyist aerial imaging, environmental monitoring, or educational purposes, while learning principles of aerodynamics, electronics, and robotics.",
      tags: [],
      images: [Drone],
      detailedDescription: "This project involves designing and assembling a customizable quadcopter drone using off-the-shelf components. The drone will be equipped with a camera for aerial photography, basic flight stabilization, and remote-control capabilities. The ultimate goal is to create a cost-effective, modular drone for hobbyist aerial imaging, environmental monitoring, or educational purposes, while learning principles of aerodynamics, electronics, and robotics.",
      source_code_link: "https://github.com/Bushraabir/empowereducation"
    },




    {
      name: "Bio Diesel Production System",
      description: "This project involves designing and constructing a small-scale bio diesel reactor that converts waste cooking oil, vegetable oil, or animal fats into usable bio diesel fuel. The system will use a chemical process called transesterification to break down triglycerides into fatty acid methyl esters (FAME), producing clean-burning bio diesel. The ultimate goal is to create a sustainable, low-cost method to recycle waste oils into renewable fuel for vehicles, generators, or heating systems, reducing reliance on fossil fuels and lowering carbon emissions.",
      tags: [],
      images: [Bio],
      detailedDescription: "This project involves designing and constructing a small-scale bio diesel reactor that converts waste cooking oil, vegetable oil, or animal fats into usable bio diesel fuel. The system will use a chemical process called transesterification to break down triglycerides into fatty acid methyl esters (FAME), producing clean-burning bio diesel. The ultimate goal is to create a sustainable, low-cost method to recycle waste oils into renewable fuel for vehicles, generators, or heating systems, reducing reliance on fossil fuels and lowering carbon emissions.",
      source_code_link: "https://github.com/Bushraabir/empowereducation"
    },


    {
      name: "Telescope for Amateur Astronomy",
      description: "This project involves designing and constructing a simple, low-cost refracting telescope using affordable, off-the-shelf components. The telescope will use optical lenses to collect and focus light, enabling observation of celestial objects like the Moon, planets, and bright star clusters. The ultimate goal is to create a functional, portable telescope for educational purposes learning fundamental principles of optics and astronomy.",
      tags: [],
      images: [Telescope],
      detailedDescription: "This project involves designing and constructing a simple, low-cost refracting telescope using affordable, off-the-shelf components. The telescope will use optical lenses to collect and focus light, enabling observation of celestial objects like the Moon, planets, and bright star clusters. The ultimate goal is to create a functional, portable telescope for educational purposes learning fundamental principles of optics and astronomy.",
      source_code_link: "https://github.com/Bushraabir/empowereducation"
    },
  ];
  const activeData = activeTab === "websites" ? websites : activeTab === "projects" ? projects : courses;
  const groupedData = activeData.reduce((acc, cur, i) => {
    if (i % 2 === 0) acc.push(activeData.slice(i, i + 2));
    return acc;
  }, []);
  const Card = memo(({ data, onClick }) => {
    const title = data.title || data.name;
    const { description, tags, images, source_code_link } = data;
    return !isDesktop ? (
      <div onClick={() => onClick(data)} className="mx-auto w-full max-w-[550px] p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-deep_indigo via-dark_teal to-deep_indigo border border-deep_indigo cursor-pointer transition-transform">
        <div className="relative w-full h-[250px] mb-6 overflow-hidden rounded-2xl">
          <img src={images[0]} alt={title} className="object-cover w-full h-full rounded-xl" />
          <div className="absolute inset-0 flex justify-end m-4">
            <div
              onClick={(e) => {
                e.stopPropagation();
                window.open(source_code_link, "_blank");
              }}
              className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg bg-gradient-to-r from-aquamarine to-jordy_blue cursor-pointer"
            >
              <img src="https://img.icons8.com/ios-glyphs/30/ffffff/github.png" alt="GitHub" className="w-7 h-7" />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h6 className="sm:text-4xl text-2xl font-heading text-aquamarine">{title}</h6>
          <p className="mt-3 font-description text-lemon_chiffon">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3 mt-6">
          {tags.slice(0, 3).map((tag, index) => (
            <span key={index} className={`text-sm font-semibold font-description ${tag.color} px-5 py-2 rounded-full shadow-lg`}>
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
    ) : (
      <motion.div onClick={() => onClick(data)} className="mx-auto w-full max-w-[550px] p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-deep_indigo via-dark_teal to-deep_indigo border border-deep_indigo cursor-pointer transition-transform transform hover:scale-105">
        <ReactTilt options={{ max: 25, scale: 1.1, speed: 450 }} className="relative w-full h-[250px] mb-6 overflow-hidden rounded-2xl">
          <motion.img src={images[0]} alt={title} className="object-cover w-full h-full rounded-xl transition-transform duration-500 ease-in-out hover:scale-110 hover:rotate-2" />
          <div className="absolute inset-0 flex justify-end m-4">
            <motion.div
              onClick={(e) => {
                e.stopPropagation();
                window.open(source_code_link, "_blank");
              }}
              className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg bg-gradient-to-r from-aquamarine to-jordy_blue cursor-pointer transition-transform duration-500 hover:scale-110"
            >
              <img src="https://img.icons8.com/ios-glyphs/30/ffffff/github.png" alt="GitHub" className="w-7 h-7" />
            </motion.div>
          </div>
        </ReactTilt>
        <div className="mt-6">
          <motion.h6 className="sm:text-4xl text-2xl font-heading text-aquamarine transition-colors duration-500 hover:text-jordy_blue">
            {title}
          </motion.h6>
          <motion.p className="mt-3 font-description text-lemon_chiffon transition-colors duration-300 hover:text-champagne_pink">
            {description}
          </motion.p>
        </div>
        <div className="flex flex-wrap gap-3 mt-6">
          {tags.slice(0, 3).map((tag, index) => (
            <motion.span key={index} className={`text-sm font-semibold font-description ${tag.color} px-5 py-2 rounded-full shadow-lg transition-colors duration-300 hover:bg-aquamarine hover:text-jordy_blue`}>
              #{tag.name}
            </motion.span>
          ))}
        </div>
      </motion.div>
    );
  });
  return (
    <>
      <style>{`
        .card { 
          will-change: transform;
          background: transparent;
          border: transparent;
        }
      `}</style>
      <section id="research" className="py-16 lg:py-24 bg-deep_indigo text-lemon_chiffon">
        <div className="container mx-auto px-6 lg:px-20">
          <div ref={initialMessageRef} className="flex flex-col items-center justify-center min-h-screen mt-55">
            <div className="flex items-center">
              {isDesktop ? (
                <motion.h1 ref={stemRef} className="sm:text-12xl text-4xl font-extrabold font-heading text-champagne_pink">
                  STEM
                </motion.h1>
              ) : (
                <h1 ref={stemRef} className="sm:text-12xl text-4xl font-extrabold font-heading text-champagne_pink">
                  STEM
                </h1>
              )}
              <div ref={lottieContainerRef} className="-mx-3 mt-4">
                <Lottie options={lottieOptions} height={isDesktop ? 80 : 30} width={isDesktop ? 80 : 30} />
              </div>
              {isDesktop ? (
                <motion.h1 ref={collabRef} className="sm:text-12xl text-4xl font-extrabold font-heading text-champagne_pink">
                  Collabolation
                </motion.h1>
              ) : (
                <h1 ref={collabRef} className="sm:text-12xl text-4xl font-extrabold font-heading text-champagne_pink">
                  Collabolation
                </h1>
              )}
            </div>
          </div>
          {isDesktop ? (
            <motion.div ref={descriptionRef} className="text-center mb-12 mt-32">
              <p className="text-lg font-description">
                Collaborated with Muzahidul Islam Abir on various STEM projects, with ongoing projects to be added soon.
              </p>
            </motion.div>
          ) : (
            <div ref={descriptionRef} className="text-center mb-12 mt-32">
              <p className="text-lg font-description">
                Collaborated with Muzahidul Islam Abir on various STEM projects, with ongoing projects to be added soon.
              </p>
            </div>
          )}
          {isDesktop ? (
            <motion.div ref={buttonsRef} className="flex justify-center mb-8 space-x-4 sm:space-x-6">
              <button
                className={`py-2 px-4 sm:py-3 sm:px-6 md:py-3 md:px-8 text-base sm:text-lg font-medium rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 ${
                  activeTab === "websites"
                    ? "bg-gradient-to-r from-champagne_pink to-tea_rose text-dark_teal"
                    : "bg-transparent text-champagne_pink border border-champagne_pink hover:bg-gradient-to-r hover:from-champagne_pink hover:to-tea_rose hover:text-dark_teal"
                }`}
                onClick={() => setActiveTab("websites")}
              >
                Websites
              </button>
              <button
                className={`py-2 px-4 sm:py-3 sm:px-6 md:py-3 md:px-8 text-base sm:text-lg font-medium rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 ${
                  activeTab === "projects"
                    ? "bg-gradient-to-r from-champagne_pink to-tea_rose text-dark_teal"
                    : "bg-transparent text-champagne_pink border border-champagne_pink hover:bg-gradient-to-r hover:from-champagne_pink hover:to-tea_rose hover:text-dark_teal"
                }`}
                onClick={() => setActiveTab("projects")}
              >
                Projects
              </button>
              <button
                className={`py-2 px-4 sm:py-3 sm:px-6 md:py-3 md:px-8 text-base sm:text-lg font-medium rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 ${
                  activeTab === "courses"
                    ? "bg-gradient-to-r from-champagne_pink to-tea_rose text-dark_teal"
                    : "bg-transparent text-champagne_pink border border-champagne_pink hover:bg-gradient-to-r hover:from-champagne_pink hover:to-tea_rose hover:text-dark_teal"
                }`}
                onClick={() => setActiveTab("courses")}
              >
                Courses
              </button>
            </motion.div>
          ) : (
            <div ref={buttonsRef} className="flex justify-center mb-8 space-x-4 sm:space-x-6">
              <button
                className={`py-2 px-4 sm:py-3 sm:px-6 md:py-3 md:px-8 text-base sm:text-lg font-medium rounded-full shadow-lg ${
                  activeTab === "websites"
                    ? "bg-gradient-to-r from-champagne_pink to-tea_rose text-dark_teal"
                    : "bg-transparent text-champagne_pink border border-champagne_pink"
                }`}
                onClick={() => setActiveTab("websites")}
              >
                Websites
              </button>
              <button
                className={`py-2 px-4 sm:py-3 sm:px-6 md:py-3 md:px-8 text-base sm:text-lg font-medium rounded-full shadow-lg ${
                  activeTab === "projects"
                    ? "bg-gradient-to-r from-champagne_pink to-tea_rose text-dark_teal"
                    : "bg-transparent text-champagne_pink border border-champagne_pink"
                }`}
                onClick={() => setActiveTab("projects")}
              >
                Projects
              </button>
              <button
                className={`py-2 px-4 sm:py-3 sm:px-6 md:py-3 md:px-8 text-base sm:text-lg font-medium rounded-full shadow-lg ${
                  activeTab === "courses"
                    ? "bg-gradient-to-r from-champagne_pink to-tea_rose text-dark_teal"
                    : "bg-transparent text-champagne_pink border border-champagne_pink"
                }`}
                onClick={() => setActiveTab("courses")}
              >
                Courses
              </button>
            </div>
          )}
          {isDesktop ? (
            <motion.div ref={cardsRef}>
              {groupedData.map((group, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-4 sm:px-8 mb-8">
                  {group.map((item, cardIndex) => (
                    <Card key={cardIndex} data={item} onClick={setSelectedProject} />
                  ))}
                </div>
              ))}
            </motion.div>
          ) : (
            <div ref={cardsRef}>
              {groupedData.map((group, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-4 sm:px-8 mb-8">
                  {group.map((item, cardIndex) => (
                    <Card key={cardIndex} data={item} onClick={setSelectedProject} />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
        {selectedProject &&
          (isDesktop ? (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-dark_teal bg-opacity-70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <motion.div
                className="bg-gradient-to-br from-lemon_chiffon via-tea_rose to-champagne_pink p-8 rounded-2xl w-11/12 sm:w-3/4 md:w-1/2 max-h-[80vh] overflow-y-auto shadow-2xl backdrop-blur-md border-4 border-lemon_chiffon border-opacity-80 relative"
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.85 }}
                transition={{ type: "spring", stiffness: 320, damping: 35 }}
              >
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className="absolute p-2 top-4 right-4 rounded-full shadow-xl text-lemon_chiffon bg-aquamarine transition-transform hover:scale-110 hover:shadow-2xl"
                  whileHover={{ scale: 1.1, rotate: 15, transition: { type: "spring", stiffness: 400 } }}
                >
                  ✕
                </motion.button>
                <motion.h2
                  className="mb-6 font-heading text-4xl font-extrabold text-dark_teal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  {selectedProject.title || selectedProject.name}
                </motion.h2>
                <motion.p
                  className="mb-8 text-lg font-description leading-relaxed text-deep_indigo"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  {selectedProject.detailedDescription}
                </motion.p>
                <motion.div
                  className="flex flex-wrap gap-3 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  {selectedProject.tags.map((tag, idx) => (
                    <motion.span
                      key={idx}
                      className={`text-sm font-semibold font-description ${tag.color} px-5 py-2 rounded-full shadow-lg transition-colors duration-300 hover:bg-aquamarine hover:text-jordy_blue`}
                    >
                      #{tag.name}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.div
                  className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  {selectedProject.images.map((image, idx) => (
                    <motion.img
                      key={idx}
                      src={image}
                      alt={`Image ${idx}`}
                      className="object-cover w-full h-32 rounded-xl transition-transform hover:scale-105 hover:shadow-xl"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: idx * 0.2, duration: 0.4 }}
                    />
                  ))}
                </motion.div>
                <motion.div
                  className="flex justify-center mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <a
                    href={selectedProject.source_code_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 text-lg font-medium font-cta rounded-full shadow-2xl text-lemon_chiffon bg-gradient-to-r from-aquamarine to-jordy_blue transition-transform hover:scale-110 hover:opacity-90"
                  >
                    View Source Code
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark_teal bg-opacity-70">
              <div className="bg-gradient-to-br from-lemon_chiffon via-tea_rose to-champagne_pink p-8 rounded-2xl w-11/12 sm:w-3/4 md:w-1/2 max-h-[80vh] overflow-y-auto shadow-2xl backdrop-blur-md border-4 border-lemon_chiffon border-opacity-80 relative">
                <button onClick={() => setSelectedProject(null)} className="absolute p-2 top-4 right-4 rounded-full shadow-xl text-lemon_chiffon bg-aquamarine">
                  ✕
                </button>
                <h2 className="mb-6 font-heading text-4xl font-extrabold text-dark_teal">
                  {selectedProject.title || selectedProject.name}
                </h2>
                <p className="mb-8 text-lg font-description leading-relaxed text-deep_indigo">
                  {selectedProject.detailedDescription}
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  {selectedProject.tags.map((tag, idx) => (
                    <span key={idx} className={`text-sm font-semibold font-description ${tag.color} px-5 py-2 rounded-full shadow-lg`}>
                      #{tag.name}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {selectedProject.images.map((image, idx) => (
                    <img key={idx} src={image} alt={`Image ${idx}`} className="object-cover w-full h-32 rounded-xl" />
                  ))}
                </div>
                <div className="flex justify-center mt-8">
                  <a
                    href={selectedProject.source_code_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 text-lg font-medium font-cta rounded-full shadow-2xl text-lemon_chiffon bg-gradient-to-r from-aquamarine to-jordy_blue"
                  >
                    View Source Code
                  </a>
                </div>
              </div>
            </div>
          ))}
      </section>
    </>
  );
};

export default Website;
