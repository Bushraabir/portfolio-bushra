import React, { useState } from "react";
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

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  images,
  detailedDescription,
  source_code_link
}) => (
  <motion.div
    custom={index}
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    whileHover="hover"
    className="w-full max-w-[360px] p-8 rounded-3xl shadow-2xl transition-transform transform bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 border border-gray-600 opacity-60"
  >
    <Tilt options={{ max: 25, scale: 1.1, speed: 450 }} className="relative w-full h-[250px] mb-6 overflow-hidden rounded-2xl">
      <motion.img
        src={images[0]}
        alt={name}
        className="object-cover w-full h-full transition-transform duration-500 ease-in-out rounded-xl hover:scale-125 hover:rotate-2"
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
        {name}
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

const WebsiteCard = ({
  index,
  title,
  description,
  tags,
  images,
  detailedDescription,
  source_code_link
}) => (
  <motion.div
    custom={index}
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    whileHover="hover"
    className="w-full opacity-60 max-w-[360px] p-8 rounded-3xl shadow-xl transition-transform transform bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 border border-gray-600"
  >
    <Tilt options={{ max: 25, scale: 1.1, speed: 450 }} className="relative w-full h-[250px] mb-6 overflow-hidden rounded-2xl">
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

const atheletics = emp1;

const Websites = () => {
  const [activeTab, setActiveTab] = useState("websites");
  const [selectedProject, setSelectedProject] = useState(null);
  const projects = [
    {
      name: "EmpowerEd Website",
      description: "A dynamic platform for accessible quality education.",
      tags: [
        { name: "React", color: "text-cyan-400" },
        { name: "Framer Motion", color: "text-pink-400" }
      ],
      images: [emp1, emp2, emp3, emp4, emp5, emp6],
      detailedDescription:
        "EmpowerEd is a non-profit educational platform offering mentorship, mental health support, research funding, scholarship opportunities, and study abroad guidance. It uses immersive animations and real-time communication tools for an engaging user experience.",
      source_code_link: "https://github.com/Bushraabir/empowereducation"
    },
    {
      name: "Project Two",
      description: "Focuses on performance optimization and advanced animations.",
      tags: [
        { name: "JavaScript", color: "text-yellow-500" },
        { name: "GSAP", color: "text-green-500" }
      ],
      images: [atheletics, atheletics],
      detailedDescription:
        "Project Two leverages advanced animations with GSAP to create a multi-step interactive UI with performance optimization at its core.",
      source_code_link: "https://github.com/project-two"
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
      images: [
        PeriodicTableVisualiser2,
        PeriodicTableVisualiser1,
        PeriodicTableVisualiser3,
        PeriodicTableVisualiser4,
        PeriodicTableVisualiser5,
        PeriodicTableVisualiser6
      ],
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
      images: [
        Sustainibility1,
        Sustainibility2,
        Sustainibility3,
        Sustainibility4,
        Sustainibility5
      ],
      detailedDescription: "Sustainability Adventure is a dynamic Flask-based application that encourages eco-friendly living through community events, user engagement, and curated sustainability tips. With secure authentication, event management, and an admin dashboard, it provides a responsive and modern interface built with Flask, SQLAlchemy, and Flask-Login.",
      source_code_link: "https://github.com/your-username/sustainability-adventure"
    }
  ];
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" }
  };
  const closeDetails = () => {
    setSelectedProject(null);
  };
  return (
    <section id="websites" className="relative py-16 lg:py-24 bg-dark_teal text-lemon_chiffon overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-deep_indigo to-tea_rose opacity-60"></div>
      <div className="container relative z-10 px-6 mx-auto lg:px-20">
        <motion.div
          className="flex flex-col items-center mb-12 lg:flex-row"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="max-w-xl text-center lg:w-1/2 lg:text-left">
            <h1 className="mb-6 font-heading text-5xl font-extrabold leading-tight tracking-wide text-champagne_pink">
              Code Canvas
            </h1>
            <p className="mb-4 text-lg font-description text-lemon_chiffon">
              Partnering with Muzahidul Islam Abir, we develop innovative solutions in Computer Science, Engineering Physics, and Astrophysics to tackle real-world challenges and empower communities.
            </p>
            <p className="mb-4 text-lg font-description text-lemon_chiffon">
              With expertise in C, C++, Python, HTML, CSS, JavaScript, and more, we build interactive applications, machine learning models, and simulations that drive progress.
            </p>
            <p className="text-lg font-description text-lemon_chiffon">
              Fueled by creativity and problem-solving, we contribute to technological and scientific advancements that shape the future.
            </p>
          </div>
          <div className="mt-12 lg:w-1/2 lg:mt-0 flex justify-center">
            <Lottie options={lottieOptions} height="80%" width="80%" />
          </div>
        </motion.div>
        <div className="flex justify-center mb-8 space-x-6">
          <button
            className={`py-3 px-8 text-lg font-medium rounded-full transition-all duration-300 shadow-lg transform hover:scale-105 ${
              activeTab === "websites"
                ? "bg-gradient-to-r from-champagne_pink to-tea_rose text-dark_teal"
                : "bg-transparent text-champagne_pink border border-champagne_pink hover:bg-gradient-to-r hover:from-champagne_pink hover:to-tea_rose hover:text-dark_teal"
            }`}
            onClick={() => setActiveTab("websites")}
          >
            Websites
          </button>
          <button
            className={`py-3 px-8 text-lg font-medium rounded-full transition-all duration-300 shadow-lg transform hover:scale-105 ${
              activeTab === "projects"
                ? "bg-gradient-to-r from-champagne_pink to-tea_rose text-dark_teal"
                : "bg-transparent text-champagne_pink border border-champagne_pink hover:bg-gradient-to-r hover:from-champagne_pink hover:to-tea_rose hover:text-dark_teal"
            }`}
            onClick={() => setActiveTab("projects")}
          >
            Projects
          </button>
        </div>
        <motion.div
          className="grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3 sm:px-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2, delay: 0.4 }}
        >
          {activeTab === "projects" &&
            projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onClick={() => setSelectedProject(project)}
              >
                <ProjectCard index={index} {...project} />
              </motion.div>
            ))}
          {activeTab === "websites" &&
            websites.map((website, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onClick={() => setSelectedProject(website)}
              >
                <WebsiteCard index={index} {...website} />
              </motion.div>
            ))}
        </motion.div>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark_teal bg-opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <motion.div
              className="bg-gradient-to-br from-lemon_chiffon via-tea_rose to-champagne_pink p-8 rounded-2xl w-11/12 sm:w-3/4 md:w-1/2 max-h-[80vh] overflow-y-auto shadow-2xl backdrop-blur-md border-4 border-white border-opacity-80 relative"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              transition={{ type: "spring", stiffness: 320, damping: 35 }}
            >
              <motion.button
                onClick={closeDetails}
                className="absolute p-2 top-4 right-4 transition-transform rounded-full shadow-xl text-lemon_chiffon bg-aquamarine hover:scale-110 hover:shadow-2xl"
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
                {selectedProject.name || selectedProject.title}
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
                {selectedProject.tags.map((tag, index) => (
                  <motion.span
                    key={index}
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
                {selectedProject.images.map((image, index) => (
                  <motion.img
                    key={index}
                    src={image}
                    alt={`Image ${index}`}
                    className="object-cover w-full h-32 transition-transform rounded-xl hover:scale-105 hover:shadow-xl"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.4 }}
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
  );
};

export default Websites;
