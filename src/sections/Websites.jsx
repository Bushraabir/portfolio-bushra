import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tilt as ReactTilt } from "react-tilt";
import Lottie from "react-lottie";
import animationData from "../assets/animation/coding.json";

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

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Tilt = (props) => {
  const { jsx, ...rest } = props;
  return <ReactTilt {...rest} />;
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, type: "spring", stiffness: 100 }
  })
};

const hoverVariants = {
  hover: {
    scale: 1.07,
    rotate: 1,
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
    transition: { type: "spring", stiffness: 400, damping: 20 }
  }
};

const typingAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } }
};

const Card = ({ index, data, onClick }) => {
  const title = data.title || data.name;
  const { description, tags, images, source_code_link } = data;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover="hover"
      onClick={() => onClick(data)}
      className="mx-auto w-full max-w-[550px] p-8 rounded-3xl shadow-2xl transition-transform transform bg-gradient-to-br from-deep_indigo via-dark_teal to-deep_indigo border border-deep_indigo card"
    >
      <Tilt
        options={{ max: 25, scale: 1.1, speed: 450 }}
        className="relative w-full h-[250px] mb-6 overflow-hidden rounded-2xl"
      >
        <motion.img
          src={images[0]}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 ease-in-out rounded-xl hover:scale-110 hover:rotate-2"
        />
        <div className="absolute inset-0 flex justify-end m-4">
          <motion.div
            onClick={(e) => {
              e.stopPropagation();
              window.open(source_code_link, "_blank");
            }}
            className="flex items-center justify-center transition-transform duration-500 rounded-full shadow-lg cursor-pointer w-14 h-14 bg-gradient-to-r from-aquamarine to-jordy_blue"
            whileHover={{ scale: 1.1 }}
          >
            <img
              src="https://img.icons8.com/ios-glyphs/30/ffffff/github.png"
              alt="GitHub"
              className="w-7 h-7"
            />
          </motion.div>
        </div>
      </Tilt>
      <div className="mt-6">
        <motion.h3
          variants={typingAnimation}
          initial="hidden"
          animate="visible"
          className="text-3xl font-semibold font-heading transition-colors duration-500 text-aquamarine hover:text-jordy_blue"
        >
          {title}
        </motion.h3>
        <motion.p
          variants={typingAnimation}
          initial="hidden"
          animate="visible"
          className="mt-3 transition-colors duration-300 font-description text-lemon_chiffon hover:text-champagne_pink"
        >
          {description}
        </motion.p>
      </div>
      <div className="flex flex-wrap gap-3 mt-6">
        {tags.slice(0, 3).map((tag, tagIndex) => (
          <motion.span
            key={tagIndex}
            variants={typingAnimation}
            initial="hidden"
            animate="visible"
            className={`text-sm font-semibold font-description ${tag.color} px-5 py-2 rounded-full shadow-lg transition-colors duration-300 hover:bg-aquamarine hover:text-jordy_blue`}
          >
            #{tag.name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const Websites = () => {
  const [activeTab, setActiveTab] = useState("websites");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth > 768);
  }, []);

  const courses = [
    {
      name: "Satellite Engineering Course",
      description:
        "An introductory course on satellite systems and engineering, covering the basics of satellite design, operations, and technologies used in modern space exploration.",
      tags: [
        { name: "Satellite Engineering", color: "text-cyan-400" },
        { name: "Space Tech", color: "text-pink-400" },
        { name: "STEM Education", color: "text-pink-400" },
        { name: "Satellite System", color: "text-pink-400" },
        { name: "Space Exploration", color: "text-pink-400" }
      ],
      images: [Satellite],
      detailedDescription:
        "An introductory course on satellite systems and engineering, covering the basics of satellite design, operations, and technologies used in modern space exploration.",
      source_code_link: "https://github.com/Bushraabir/empowereducation"
    },
    {
      name: "Rocket Propulsion Systems",
      description:
        "An introductory course on rocket propulsion, focusing on the principles of thrust, engine design, and the technologies driving modern rocketry.",
      tags: [
        { name: "Rocket Production", color: "text-yellow-500" },
        { name: "Rocket Science", color: "text-green-500" },
        { name: "Space Engineering", color: "text-pink-400" },
        { name: "STEM", color: "text-pink-400" },
        { name: "Thrust", color: "text-pink-400" },
        { name: "Aerospace Tech", color: "text-pink-400" }
      ],
      images: [Rocket],
      detailedDescription:
        "An introductory course on rocket propulsion, focusing on the principles of thrust, engine design, and the technologies driving modern rocketry.",
      source_code_link: "https://github.com/project-two"
    },
    {
      name: "Introduction to Aerospace Engineering and Design",
      description:
        "An introductory course on aerospace engineering, focusing on the principles of aircraft and spacecraft design, aerodynamics, and propulsion systems.",
      tags: [
        { name: "AeroSpace Engineering", color: "text-cyan-400" },
        { name: "Aircraft Design", color: "text-pink-400" },
        { name: "Aerodynamics", color: "text-pink-400" },
        { name: "Space Tech", color: "text-pink-400" },
        { name: "Spacecraft Design", color: "text-pink-400" }
      ],
      images: [AeroSpace],
      detailedDescription:
        "An introductory course on aerospace engineering, focusing on the principles of aircraft and spacecraft design, aerodynamics, and propulsion systems.",
      source_code_link: "https://github.com/Bushraabir/empowereducation"
    },
    {
      name: "Nuclear Science and Engineering",
      description:
        "An introductory course on nuclear science, covering the fundamentals of nuclear reactions, reactor design, and applications in energy production and medical technology.",
      tags: [
        { name: "Nuclear Science", color: "text-cyan-400" },
        { name: "Nuclear Engineering", color: "text-pink-400" },
        { name: "Energy Tech", color: "text-pink-400" },
        { name: "Reactor Eesign", color: "text-pink-400" },
        { name: "Atomic Energy", color: "text-pink-400" }
      ],
      images: [Nuclear],
      detailedDescription:
        "An introductory course on nuclear science, covering the fundamentals of nuclear reactions, reactor design, and applications in energy production and medical technology.",
      source_code_link: "https://github.com/Bushraabir/empowereducation"
    }
  ];

  const websites = [
    {
      title: "EmpowerEd Website",
      description:
        "A dynamic and visually engaging web platform for accessible quality education.",
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
      detailedDescription:
        "EmpowerEd is a non-profit educational platform designed to provide students with mentorship, mental health support, research funding, scholarship opportunities, and study abroad guidance. It features immersive animations and real-time communication tools, built with React.js, GSAP, Framer Motion, and EmailJS.",
      source_code_link: "https://github.com/Bushraabir/empowereducation"
    },
    {
      title: "Advanced Periodic Table Visualizer",
      description:
        "An interactive web application for exploring the periodic table with dynamic visualizations.",
      tags: [
        { name: "Python", color: "text-yellow-500" },
        { name: "Streamlit", color: "text-red-400" },
        { name: "Plotly", color: "text-blue-500" },
        { name: "Pandas", color: "text-green-400" },
        { name: "Data Visualization", color: "text-purple-500" }
      ],
      images: [
        PeriodicTableVisualiser2,
        PeriodicTableVisualiser1,
        PeriodicTableVisualiser3,
        PeriodicTableVisualiser4,
        PeriodicTableVisualiser5,
        PeriodicTableVisualiser6
      ],
      detailedDescription:
        "The Advanced Periodic Table Visualizer is a web tool built with Python, Streamlit, Plotly, and Pandas. It offers interactive data visualizations, filtering options, and insights into periodic trends through charts and 3D visualizations.",
      source_code_link:
        "https://github.com/Bushraabir/periodic_table_visualizer"
    },
    {
      title: "Study Buddy",
      description:
        "An interactive study companion designed to boost student productivity with smart learning tools.",
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
      images: [
        StudyBuddy2,
        StudyBuddy1,
        StudyBuddy3,
        StudyBuddy4,
        StudyBuddy5,
        StudyBuddy6,
        StudyBuddy7,
        StudyBuddy8
      ],
      detailedDescription:
        "Study Buddy is an advanced educational application that enhances study efficiency with interactive flashcards (including quiz mode), a Pomodoro-based session manager, a versatile graphing calculator for multiple equation types, and a smart note-taking system synced in real time via Firebase. Built using React.js, GSAP, Framer Motion, and Plotly.js, it delivers a modern, engaging, and responsive study experience.",
      source_code_link: "https://github.com/Bushraabir/sustainibility"
    },
    {
      title: "Sustainability Adventure",
      description:
        "A Flask-based web application promoting sustainable living through community events and eco-friendly tips.",
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
      images: [
        Sustainibility1,
        Sustainibility2,
        Sustainibility3,
        Sustainibility4,
        Sustainibility5
      ],
      detailedDescription:
        "Sustainability Adventure is a dynamic Flask-based application that encourages eco-friendly living through community events, user engagement, and curated sustainability tips. With secure authentication, event management, and an admin dashboard, it provides a responsive and modern interface built with Flask, SQLAlchemy, and Flask-Login.",
      source_code_link:
        "https://github.com/your-username/sustainability-adventure"
    }
  ];

  const projects = [
    {
      name: ": Building a Self-Made Satellite with a Self-Made Rocket",
      description:
        "This project involves designing and building a satellite along with a custom rocket, powered by hydrogen and oxygen fuel that is processed by us. The satellite will include a transmitter to send its location back to us. The ultimate goal is to launch the satellite into Low Earth Orbit (LEO), aiming to reach the Kármán Line.",
      tags: [
        { name: "Satellite Engineering", color: "text-cyan-400" },
        { name: "Space Tech", color: "text-pink-400" },
        { name: "STEM Education", color: "text-pink-400" },
        { name: "Satellite System", color: "text-pink-400" },
        { name: "Space Exploration", color: "text-pink-400" }
      ],
      images: [Satellite1],
      detailedDescription:
        "This project involves designing and building a satellite along with a custom rocket, powered by hydrogen and oxygen fuel that is processed by us. The satellite will include a transmitter to send its location back to us. The ultimate goal is to launch the satellite into Low Earth Orbit (LEO), aiming to reach the Kármán Line.",
      source_code_link: "https://github.com/Bushraabir/empowereducation"
    },
    {
      name: ": Building a Self-Made Satellite with a Self-Made Rocket",
      description:
        "This project involves designing and building a satellite along with a custom rocket, powered by hydrogen and oxygen fuel that is processed by us. The satellite will include a transmitter to send its location back to us. The ultimate goal is to launch the satellite into Low Earth Orbit (LEO), aiming to reach the Kármán Line.",
      tags: [
        { name: "Satellite Engineering", color: "text-cyan-400" },
        { name: "Space Tech", color: "text-pink-400" },
        { name: "STEM Education", color: "text-pink-400" },
        { name: "Satellite System", color: "text-pink-400" },
        { name: "Space Exploration", color: "text-pink-400" }
      ],
      images: [Satellite1],
      detailedDescription:
        "This project involves designing and building a satellite along with a custom rocket, powered by hydrogen and oxygen fuel that is processed by us. The satellite will include a transmitter to send its location back to us. The ultimate goal is to launch the satellite into Low Earth Orbit (LEO), aiming to reach the Kármán Line.",
      source_code_link: "https://github.com/Bushraabir/empowereducation"
    },
    {
      name: ": Building a Self-Made Satellite with a Self-Made Rocket",
      description:
        "This project involves designing and building a satellite along with a custom rocket, powered by hydrogen and oxygen fuel that is processed by us. The satellite will include a transmitter to send its location back to us. The ultimate goal is to launch the satellite into Low Earth Orbit (LEO), aiming to reach the Kármán Line.",
      tags: [
        { name: "Satellite Engineering", color: "text-cyan-400" },
        { name: "Space Tech", color: "text-pink-400" },
        { name: "STEM Education", color: "text-pink-400" },
        { name: "Satellite System", color: "text-pink-400" },
        { name: "Space Exploration", color: "text-pink-400" }
      ],
      images: [Satellite1],
      detailedDescription:
        "This project involves designing and building a satellite along with a custom rocket, powered by hydrogen and oxygen fuel that is processed by us. The satellite will include a transmitter to send its location back to us. The ultimate goal is to launch the satellite into Low Earth Orbit (LEO), aiming to reach the Kármán Line.",
      source_code_link: "https://github.com/Bushraabir/empowereducation"
    }
  ];

  let activeData = [];
  if (activeTab === "websites") {
    activeData = websites;
  } else if (activeTab === "projects") {
    activeData = projects;
  } else if (activeTab === "courses") {
    activeData = courses;
  }
  const groupedData = [];
  for (let i = 0; i < activeData.length; i += 2) {
    groupedData.push(activeData.slice(i, i + 2));
  }
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  
    const isMobile = window.innerWidth <= 768;
  
    const leftXValues = isMobile ? [-80, -80, -60] : [-600, -600, -400];
    const rightXValues = isMobile ? [80, 80, 60] : [600, 600, 400];
    const leftRotationValues = isMobile ? [-5, -7, -10] : [-20, -20, -35];
    const rightRotationValues = isMobile ? [5, 7, 10] : [20, 20, 35];
    const yValues = isMobile ? [60, -60, -80] : [100, -150, -400];
  
    gsap.utils.toArray(".row").forEach((row, index) => {
      const cardLeft = row.querySelector(".card-left");
      const cardRight = row.querySelector(".card-right");
  
      if (cardLeft) {
        gsap.fromTo(
          cardLeft,
          { x: 0, y: 0, rotation: 0 },
          {
            x: leftXValues[index] || 0,
            y: yValues[index] || 0,
            rotation: leftRotationValues[index] || 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".main",
              start: "top 60%",
              end: "150% bottom",
              scrub: 0.5,
              onUpdate: (self) => {
                const progress = self.progress;
                gsap.set(cardLeft, {
                  x: progress * (leftXValues[index] || 0),
                  y: progress * (yValues[index] || 0),
                  rotation: progress * (leftRotationValues[index] || 0)
                });
              }
            }
          }
        );
      }
  
      if (cardRight) {
        gsap.fromTo(
          cardRight,
          { x: 0, y: 0, rotation: 0 },
          {
            x: rightXValues[index] || 0,
            y: yValues[index] || 0,
            rotation: rightRotationValues[index] || 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".main",
              start: "top 60%",
              end: "150% bottom",
              scrub: 0.5,
              onUpdate: (self) => {
                const progress = self.progress;
                gsap.set(cardRight, {
                  x: progress * (rightXValues[index] || 0),
                  y: progress * (yValues[index] || 0),
                  rotation: progress * (rightRotationValues[index] || 0)
                });
              }
            }
          }
        );
      }
    });


    if (!isMobile) {
      gsap.fromTo(
        ".desc-row",
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power2.out", 
          scrollTrigger: {
            trigger: ".desc-row",
            start: "top 80%",
            end: "bottom center",
            scrub: true,
          }
        }
      );
    }
  }, [activeData]);

  const closeDetails = () => {
    setSelectedProject(null);
  };

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" }
  };

  return (
    <>

      <style>{`
        .card{ 
          will-change: transform;
          background: transparent;
          border: transparent;
        }
      `}</style>

      <section
        id="websites"
        className="overflow-hidden relative py-16 lg:py-24 bg-dark_teal text-lemon_chiffon overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-deep_indigo to-tea_rose opacity-60 pointer-events-none"></div>
        <div className="main bg-transparent">
          <div className="container relative z-10 px-6 mx-auto lg:px-20 bg-transparent">
           
            {!isDesktop && (
              <motion.div
                className="flex flex-col items-center mb-12 lg:flex-row"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <div className="max-w-xl text-center lg:w-1/2 lg:text-left">
                  <h1 className="mb-6 font-heading text-5xl font-extrabold leading-tight tracking-wide text-champagne_pink">
                    STEM Collaboration
                  </h1>
                  <p className="mb-4 text-lg font-description text-lemon_chiffon">
                    Collaborated with Muzahidul Islam Abir on various STEM projects, with ongoing projects to be added soon.
                  </p>
                </div>

              </motion.div>
            )}

            <div className="flex justify-center mb-8 space-x-4 sm:space-x-6 px-4">
              <button
                className={`py-2 px-4 sm:py-3 sm:px-6 md:py-3 md:px-8 text-base sm:text-lg font-medium rounded-full transition-all duration-300 shadow-lg transform hover:scale-105 ${
                  activeTab === "websites"
                    ? "bg-gradient-to-r from-champagne_pink to-tea_rose text-dark_teal"
                    : "bg-transparent text-champagne_pink border border-champagne_pink hover:bg-gradient-to-r hover:from-champagne_pink hover:to-tea_rose hover:text-dark_teal"
                }`}
                onClick={() => setActiveTab("websites")}
              >
                Websites
              </button>
              <button
                className={`py-2 px-4 sm:py-3 sm:px-6 md:py-3 md:px-8 text-base sm:text-lg font-medium rounded-full transition-all duration-300 shadow-lg transform hover:scale-105 ${
                  activeTab === "projects"
                    ? "bg-gradient-to-r from-champagne_pink to-tea_rose text-dark_teal"
                    : "bg-transparent text-champagne_pink border border-champagne_pink hover:bg-gradient-to-r hover:from-champagne_pink hover:to-tea_rose hover:text-dark_teal"
                }`}
                onClick={() => setActiveTab("projects")}
              >
                Projects
              </button>
              <button
                className={`py-2 px-4 sm:py-3 sm:px-6 md:py-3 md:px-8 text-base sm:text-lg font-medium rounded-full transition-all duration-300 shadow-lg transform hover:scale-105 ${
                  activeTab === "courses"
                    ? "bg-gradient-to-r from-champagne_pink to-tea_rose text-dark_teal"
                    : "bg-transparent text-champagne_pink border border-champagne_pink hover:bg-gradient-to-r hover:from-champagne_pink hover:to-tea_rose hover:text-dark_teal"
                }`}
                onClick={() => setActiveTab("courses")}
              >
                Courses
              </button>
            </div>


            
            {groupedData.map((group, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <div className="row grid grid-cols-1 sm:grid-cols-2 gap-8 px-4 sm:px-8">
                  {group.map((item, cardIndex) => (
                    <div
                      key={cardIndex}
                      className={cardIndex === 0 ? "card-left card" : "card-right card"}
                    >
                      <Card
                        index={rowIndex * 2 + cardIndex}
                        data={item}
                        onClick={setSelectedProject}
                      />
                    </div>
                  ))}
                </div>
                {isDesktop && rowIndex === 0 && groupedData.length > 1 && (
                  <div className="desc-row row flex flex-col lg:flex-row items-center justify-between my-12 px-4 sm:px-8">
                    <div className="max-w-xl text-center lg:text-left">
                      <h1 className="mb-6 font-heading text-5xl font-extrabold leading-tight tracking-wide text-champagne_pink">
                        STEM Collaboration
                      </h1>
                      <p className="mb-4 text-lg font-description text-lemon_chiffon">
                        Collaborated with Muzahidul Islam Abir on various STEM projects, with ongoing projects to be added soon.
                      </p>
                    </div>

                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {selectedProject && (
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
                  className="absolute p-2 top-4 right-4 transition-transform rounded-full shadow-xl text-lemon_chiffon bg-aquamarine hover:scale-110 hover:shadow-2xl"
                  whileHover={{
                    scale: 1.1,
                    rotate: 15,
                    transition: { type: "spring", stiffness: 400 }
                  }}
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
                      className="object-cover w-full h-32 transition-transform rounded-xl hover:scale-105 hover:shadow-xl"
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
                    className="px-6 py-3 text-lg font-medium font-cta transition-transform rounded-full shadow-2xl text-lemon_chiffon bg-gradient-to-r from-aquamarine to-jordy_blue hover:scale-110 hover:opacity-90"
                  >
                    View Source Code
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default Websites;
