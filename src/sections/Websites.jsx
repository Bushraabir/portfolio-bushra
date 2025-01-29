import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import Lottie from "react-lottie";
import animationData from "../assets/animation/coding.json";
import atheletics from "../assets/gallery/2022_atheletics.jpg";
const Websites = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      name: "Project One",
      description: "This is a description of Project One.",
      tags: [
        { name: "React", color: "text-cyan-400" },
        { name: "Framer Motion", color: "text-pink-400" },
      ],
      images: [atheletics, atheletics],
      detailedDescription:
        "Project One is a web-based application developed using React, showcasing dynamic animations with Framer Motion. It uses GSAP for advanced transitions and is mobile-responsive.",
      source_code_link: "https://github.com/project-one",
    },
    {
      name: "Project Two",
      description: "This is a description of Project Two.",
      tags: [
        { name: "JavaScript", color: "text-yellow-500" },
        { name: "GSAP", color: "text-green-500" },
      ],
      images: [atheletics, atheletics],
      detailedDescription:
        "Project Two focuses on performance optimization and advanced animations with GSAP. This project includes a multi-step interactive user interface.",
      source_code_link: "https://github.com/project-two",
    },
  ];

  const websites = [
    {
      title: "Website One",
      description: "This is a description of Website One.",
      tags: [
        { name: "HTML", color: "text-red-400" },
        { name: "CSS", color: "text-green-400" },
      ],
      images: [atheletics, atheletics],
      detailedDescription:
        "Website One is an interactive portfolio created using pure HTML, CSS, and JavaScript. It showcases my skills and projects dynamically.",
      source_code_link: "https://github.com/website-one",
    },
    {
      title: "Website Two",
      description: "This is a description of Website Two.",
      tags: [
        { name: "CSS Grid", color: "text-purple-500" },
        { name: "Responsive", color: "text-blue-400" },
      ],
      images: [atheletics, atheletics],
      detailedDescription:
        "Website Two is a responsive business landing page with multiple sections that auto-align based on screen size. It utilizes modern CSS Grid and Flexbox for layout.",
      source_code_link: "https://github.com/website-two",
    },
  ];

  const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, type: "spring", stiffness: 100 },
    }),
  };

  const typingAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 2, ease: "easeInOut" },
    },
  };

  const ProjectCard = ({
    index,
    name,
    description,
    tags,
    images,
    detailedDescription,
    source_code_link,
  }) => (
    <motion.div
      custom={index}
      variants={animationVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full max-w-[360px] p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl hover:opacity-100"
      style={{
        background: 'rgba(255, 255, 255, 0.1)',  // Semi-transparent background for Glassmorphism
        backdropFilter: 'blur(15px)',  // Blur effect for the background
        WebkitBackdropFilter: 'blur(15px)',  // For Safari compatibility
        border: '6px solid rgba(255, 255, 255, 0.2)',  // Light border to enhance glass effect
      }}
      onClick={() => {
        setActiveTab("projects");
        setSelectedProject({
          name,
          description,
          tags,
          images,
          detailedDescription,
          source_code_link,
          type: "project",
        });
      }}
    >
      {/* Image Section */}
      <Tilt options={{ max: 25, scale: 1.05, speed: 400 }} className="relative w-full h-[230px] mb-4 overflow-hidden rounded-xl">
        <motion.img
          src={images[0]}
          alt={name}
          className="object-cover w-full h-full transition-all duration-300 ease-in-out transform rounded-xl hover:scale-110 hover:rotate-2"
        />
        <div className="absolute inset-0 flex justify-end m-3">
          <motion.div
            onClick={() => window.open(source_code_link, "_blank")}
            className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-[#FFC857] to-[#FF6F3C] rounded-full cursor-pointer shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
          >
            <img
              src="https://img.icons8.com/ios-glyphs/30/ffffff/github.png"
              alt="GitHub"
              className="w-6 h-6"
            />
          </motion.div>
        </div>
      </Tilt>
  
      {/* Title and Description */}
      <div className="mt-5">
        <motion.h3
          variants={typingAnimation}
          initial="hidden"
          animate="visible"
          className="text-2xl font-bold text-[#FFC857] transition-all duration-300 hover:text-[#FF6F3C]"
        >
          {name}
        </motion.h3>
        <motion.p
          variants={typingAnimation}
          initial="hidden"
          animate="visible"
          className="mt-2 text-[#F9F5F0] transition-all duration-200 hover:text-[#C1D3E5]"
        >
          {description}
        </motion.p>
      </div>
  
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((tag, tagIndex) => (
          <motion.span
            key={tagIndex}
            variants={typingAnimation}
            initial="hidden"
            animate="visible"
            className={`text-sm font-medium text-[#F9F5F0] ${tag.color} px-4 py-2 rounded-full shadow-sm`}
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
    source_code_link,
  }) => (
    <motion.div
      custom={index}
      variants={animationVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full max-w-[360px] p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl hover:opacity-100"
      style={{
        background: 'rgba(255, 255, 255, 0.1)',  // Semi-transparent background for Glassmorphism
        backdropFilter: 'blur(15px)',  // Blur effect for the background
        WebkitBackdropFilter: 'blur(15px)',  // For Safari compatibility
        border: '6px solid rgba(255, 255, 255, 0.2)',  // Light border to enhance glass effect
      }}
      onClick={() => {
        setActiveTab("websites");
        setSelectedProject({
          title,
          description,
          tags,
          images,
          detailedDescription,
          source_code_link,
          type: "website",
        });
      }}
    >
      {/* Image Section */}
      <Tilt
        options={{ max: 25, scale: 1.1, speed: 400 }}
        className="relative w-full h-[230px] mb-6 overflow-hidden rounded-xl"
      >
        <motion.img
          src={images[0]}
          alt={title}
          className="object-cover w-full h-full transition-all duration-300 ease-in-out transform rounded-xl hover:scale-110 hover:rotate-2"
        />
        <div className="absolute inset-0 flex justify-end m-3">
          <motion.div
            onClick={() => window.open(source_code_link, "_blank")}
            className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#FFC857] to-[#FF6F3C] rounded-full cursor-pointer shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
          >
            <img
              src="https://img.icons8.com/ios-glyphs/30/ffffff/github.png"
              alt="GitHub"
              className="w-6 h-6"
            />
          </motion.div>
        </div>
      </Tilt>
  
      {/* Title and Description */}
      <div className="mt-5">
        <motion.h3
          variants={typingAnimation}
          initial="hidden"
          animate="visible"
          className="text-2xl font-bold text-[#FFC857] transition-all duration-300 hover:text-[#FF6F3C]"
        >
          {title}
        </motion.h3>
        <motion.p
          variants={typingAnimation}
          initial="hidden"
          animate="visible"
          className="mt-2 text-[#F9F5F0] transition-all duration-200 hover:text-[#C1D3E5]"
        >
          {description}
        </motion.p>
      </div>
  
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((tag, tagIndex) => (
          <motion.span
            key={tagIndex}
            variants={typingAnimation}
            initial="hidden"
            animate="visible"
            className={`text-sm font-medium text-[#F9F5F0] ${tag.color} px-4 py-2 rounded-full shadow-sm`}
          >
            #{tag.name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
  
  
  
  
  const closeDetails = () => {
    setSelectedProject(null);
  };

  // Lottie animation options
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData, // Lottie animation JSON data
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
<section className="relative w-full py-16 bg-gradient-to-r from-primaryDark via-primaryLight to-accent2">
{/* Background Enhancements */}
<div className="absolute inset-0 bg-gradient-to-b from-dark via-secondaryLight to-primaryLight opacity-90">
  <div
    className="absolute inset-0 opacity-80"
    style={{
      background: `
        radial-gradient(circle at top left, #E6B800 20%, transparent 70%),
        radial-gradient(circle at bottom right, #00A7D0 25%, transparent 60%),
        linear-gradient(to bottom, rgba(47, 58, 88, 0.7), rgba(73, 86, 114, 0.8))
      `,
    }}
  ></div>
  <div
    className="absolute inset-0 animate-gradient-move opacity-70"
    style={{
      background: `
        linear-gradient(
          120deg,
          rgba(242, 107, 56, 0.4) 25%,
          rgba(255, 200, 87, 0.3) 50%,
          rgba(0, 124, 138, 0.4) 75%
        )
      `,
      mixBlendMode: "overlay",
    }}
  ></div>
  <div className="absolute inset-0 bg-noise opacity-10"></div>
  <div className="absolute inset-0 bg-glow"></div>
</div>


  <div className="container relative z-10 px-6 mx-auto lg:px-20">
    <motion.div
      className="flex flex-col items-center justify-between mb-12 lg:flex-row"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      {/* Left Side - Description */}
      <div className="lg:w-1/2">
        <h1 className="font-serif text-4xl font-extrabold text-primary text-bold drop-shadow-lg">
          Code Canvas
        </h1>
        <p className="mt-4 font-sans leading-relaxed tracking-wide text-light">
          In collaboration with my partner Muzahidul Islam Abir, we have embarked on a transformative journey to design and develop innovative projects and websites that address pressing real-world challenges.
        </p>
        <p className="mt-4 font-sans leading-relaxed tracking-wide text-light">
          From conceptualizing ideas to implementing solutions, we have demonstrated expertise in C, C++, Python, HTML, CSS, JavaScript, React, Vite, Three.js, GSAP, Framer Motion, Plotly, and Firebase.
        </p>
        <p className="mt-4 font-sans leading-relaxed tracking-wide text-light">
          At the heart of our work lies a passion for innovation and a drive to overcome challenges.
        </p>
      </div>

      {/* Right Side - Lottie Animation */}
      <div className="flex justify-center mt-12 lg:w-1/2 lg:mt-0">
        <Lottie
          options={lottieOptions}
          height={"80%"}
          width={"80%"}
          className="drop-shadow-2xl"
        />
      </div>
    </motion.div>

    <div className="flex justify-center mb-8 space-x-6">
  <button
    className={`py-3 px-8 text-lg font-medium rounded-full transition-all duration-300 shadow-xl transform hover:scale-105 hover:shadow-2xl ${
      activeTab === "websites"
        ? "bg-gradient-to-r from-[#FFC857] to-[#007C8A] text-[#F9F5F0] drop-shadow-lg"
        : "bg-transparent text-[#FFC857] border border-[#FFC857] hover:bg-gradient-to-r hover:from-[#FFC857] hover:to-[#FF6F3C] hover:text-[#F9F5F0]"
    }`}
    onClick={() => setActiveTab("websites")}
  >
    Websites
  </button>
  <button
    className={`py-3 px-8 text-lg font-medium rounded-full transition-all duration-300 shadow-xl transform hover:scale-105 hover:shadow-2xl ${
      activeTab === "projects"
        ? "bg-gradient-to-r from-[#FFC857] to-[#007C8A] text-[#F9F5F0] drop-shadow-lg"
        : "bg-transparent text-[#FFC857] border border-[#FFC857] hover:bg-gradient-to-r hover:from-[#FFC857] hover:to-[#FF6F3C] hover:text-[#F9F5F0]"
    }`}
    onClick={() => setActiveTab("projects")}
  >
    Projects
  </button>
</div>



    {/* Projects or Websites Cards */}
    <motion.div
      className="grid grid-cols-1 gap-8 px-4 lg:grid-cols-3 sm:px-8"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, delay: 0.4 } },
      }}
    >
      {activeTab === "projects" &&
        projects.map((project, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            <ProjectCard index={index} {...project} />
          </motion.div>
        ))}
      {activeTab === "websites" &&
        websites.map((website, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            <WebsiteCard index={index} {...website} />
          </motion.div>
        ))}
    </motion.div>

    {/* Detailed project or website modal */}
{/* Detailed project or website modal */}
{selectedProject && (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center bg-dark bg-opacity-70"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <motion.div
      className="bg-gradient-to-br from-primaryDark via-primaryLight to-accent2 p-8 rounded-2xl w-4/5 lg:w-1/2 max-h-[80vh] overflow-y-auto shadow-2xl backdrop-blur-md border border-opacity-20 border-[#FFF] relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {/* Close Button */}
      <motion.button
        onClick={closeDetails}
        className="absolute p-2 text-white transition-transform rounded-full shadow-md top-4 right-4 bg-accent2 hover:scale-110 hover:shadow-lg"
        whileHover={{
          scale: 1.1,
          rotate: 15,
          transition: { type: "spring", stiffness: 300 },
        }}
      >
        ✕
      </motion.button>

      {/* Title */}
      <motion.h2
        className="mb-4 font-serif text-3xl font-extrabold text-secondary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {selectedProject.name || selectedProject.title}
      </motion.h2>

      {/* Description */}
      <motion.p
        className="mb-6 font-sans text-lg leading-relaxed text-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {selectedProject.detailedDescription}
      </motion.p>

      {/* Images Section */}
      <motion.div
        className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        {selectedProject.images.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt={`image ${index}`}
            className="object-cover w-full h-32 transition-transform transform shadow-md rounded-xl hover:scale-105 hover:shadow-lg"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.4 }}
          />
        ))}
      </motion.div>

      {/* View Source Code Button */}
      <motion.div
          className="flex justify-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <a
            href={selectedProject.source_code_link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 text-lg font-medium transition-transform transform rounded-full shadow-md text-light bg-gradient-to-r from-accent1 to-accent2 hover:shadow-lg hover:opacity-90 hover:scale-105"
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
