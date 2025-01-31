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
      className="w-full max-w-[360px] p-8 rounded-3xl shadow-2xl transition-transform transform hover:scale-110 hover:shadow-3xl hover:opacity-100"
      style={{
        background: 'rgba(255, 255, 255, 0.12)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
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
      <Tilt
        options={{ max: 25, scale: 1.1, speed: 450 }}
        className="relative w-full h-[250px] mb-6 overflow-hidden rounded-2xl"
      >
        <motion.img
          src={images[0]}
          alt={name}
          className="object-cover w-full h-full transition-all duration-500 ease-in-out transform rounded-xl hover:scale-125 hover:rotate-2"
        />
        <div className="absolute inset-0 flex justify-end m-4">
          <motion.div
            onClick={() => window.open(source_code_link, "_blank")}
            className="flex items-center justify-center transition-all duration-500 rounded-full shadow-lg cursor-pointer w-14 h-14 bg-gradient-to-r from-aquamarine to-jordy_blue hover:scale-110 hover:shadow-xl"
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
          className="text-3xl font-semibold transition-all duration-500 text-aquamarine hover:text-jordy_blue"
        >
          {name}
        </motion.h3>
        <motion.p
          variants={typingAnimation}
          initial="hidden"
          animate="visible"
          className="mt-3 transition-all duration-300 text-lemon_chiffon hover:text-champagne_pink"
        >
          {description}
        </motion.p>
      </div>
  
      <div className="flex flex-wrap gap-3 mt-6">
        {tags.map((tag, tagIndex) => (
          <motion.span
            key={tagIndex}
            variants={typingAnimation}
            initial="hidden"
            animate="visible"
            className={`text-sm font-semibold text-lemon_chiffon ${tag.color} px-5 py-2 rounded-full shadow-xl transition-all duration-300 hover:bg-aquamarine hover:text-jordy_blue`}
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
      className="w-full max-w-[360px] p-8 rounded-3xl shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl hover:opacity-100"
      style={{
        background: 'rgba(255, 255, 255, 0.12)',
        backdropFilter: 'blur(25px)',
        WebkitBackdropFilter: 'blur(25px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
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
      <Tilt
        options={{ max: 25, scale: 1.1, speed: 450 }}
        className="relative w-full h-[250px] mb-6 overflow-hidden rounded-2xl"
      >
        <motion.img
          src={images[0]}
          alt={title}
          className="object-cover w-full h-full transition-all duration-500 ease-in-out transform rounded-xl hover:scale-110 hover:rotate-2"
        />
        <div className="absolute inset-0 flex justify-end m-4">
          <motion.div
            onClick={() => window.open(source_code_link, "_blank")}
            className="flex items-center justify-center transition-all duration-500 rounded-full shadow-lg cursor-pointer w-14 h-14 bg-gradient-to-r from-aquamarine to-jordy_blue hover:scale-110 hover:shadow-2xl"
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
          className="text-3xl font-semibold transition-all duration-500 text-aquamarine hover:text-jordy_blue"
        >
          {title}
        </motion.h3>
        <motion.p
          variants={typingAnimation}
          initial="hidden"
          animate="visible"
          className="mt-3 transition-all duration-300 text-lemon_chiffon hover:text-champagne_pink"
        >
          {description}
        </motion.p>
      </div>
  
      <div className="flex flex-wrap gap-3 mt-6">
        {tags.map((tag, tagIndex) => (
          <motion.span
            key={tagIndex}
            variants={typingAnimation}
            initial="hidden"
            animate="visible"
            className={`text-sm font-semibold text-lemon_chiffon ${tag.color} px-5 py-2 rounded-full shadow-lg transition-all duration-300 hover:bg-aquamarine hover:text-jordy_blue`}
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
<section className="relative py-16 overflow-hidden lg:py-24 bg-dark_teal text-lemon_chiffon">
  {/* Background Gradient */}
  <div className="absolute inset-0 bg-gradient-to-b from-deep_indigo to-tea_rose opacity-60"></div>

  <div className="container relative z-10 px-6 mx-auto lg:px-20">
    {/* Header Section */}
    <motion.div
      className="flex flex-col items-center mb-12 lg:flex-row"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      {/* Left Side - Description */}
      <div className="max-w-xl text-center lg:w-1/2 lg:text-left">
        <h1 className="mb-6 font-serif text-5xl font-extrabold leading-tight tracking-wide text-champagne_pink">
          Code Canvas
        </h1>
        <p className="mb-4 text-lg text-lemon_chiffon">
          Partnering with Muzahidul Islam Abir, we're creating impactful projects that solve real-world problems through innovative solutions.
        </p>
        <p className="mb-4 text-lg text-lemon_chiffon">
          Our expertise spans C, C++, Python, HTML, CSS, JavaScript, React, Vite, Three.js, GSAP, Framer Motion, Plotly, and Firebase.
        </p>
        <p className="text-lg text-lemon_chiffon">
          We're driven by a passion for creativity and a dedication to overcoming challenges.
        </p>
      </div>

      {/* Right Side - Lottie Animation */}
      <div className="mt-12 lg:w-1/2 lg:mt-0">
        <Lottie options={lottieOptions} height={"80%"} width={"80%"} />
      </div>
    </motion.div>

    {/* Tab Navigation */}
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

    {/* Projects or Websites Grid */}
    <motion.div
      className="grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3 sm:px-8"
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

{/* Detailed Modal for Projects or Websites */}
{selectedProject && (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center bg-dark_teal bg-opacity-70"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
  >
    <motion.div
      className="bg-gradient-to-br from-lemon_chiffon via-tea_rose to-champagne_pink p-8 rounded-2xl w-4/5 lg:w-1/2 max-h-[80vh] overflow-y-auto shadow-2xl backdrop-blur-md border-4 border-opacity-80 border-[#FFF] relative"
      initial={{ scale: 0.85 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.85 }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 35,
      }}
    >
      {/* Close Button */}
      <motion.button
        onClick={closeDetails}
        className="absolute p-2 transition-all rounded-full shadow-xl top-4 right-4 text-lemon_chiffon bg-aquamarine hover:scale-110 hover:shadow-2xl"
        whileHover={{
          scale: 1.1,
          rotate: 15,
          transition: { type: "spring", stiffness: 400 },
        }}
      >
        ✕
      </motion.button>

      {/* Modal Content */}
      <motion.h2
        className="mb-6 font-serif text-4xl font-extrabold text-dark_teal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {selectedProject.name || selectedProject.title}
      </motion.h2>
      <motion.p
        className="mb-8 text-lg leading-relaxed text-deep_indigo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {selectedProject.detailedDescription}
      </motion.p>

      {/* Image Gallery */}
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
            className="object-cover w-full h-32 transition-all transform rounded-xl hover:scale-105 hover:shadow-xl"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.4 }}
          />
        ))}
      </motion.div>

      {/* Source Code Button */}
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
          className="px-6 py-3 text-lg font-medium transition-all transform rounded-full shadow-2xl text-lemon_chiffon bg-gradient-to-r from-aquamarine to-jordy_blue hover:opacity-90 hover:scale-110"
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
