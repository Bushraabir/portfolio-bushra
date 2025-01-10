import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import Lottie from "react-lottie";
import animationData from "../assets/animation/coding.json"; // Your Lottie animation file

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
      images: ["src/assets/Bushra.png", "src/assets/Bushra.png"],
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
      images: ["src/assets/Bushra.png", "src/assets/Bushra.png"],
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
      images: ["src/assets/Bushra.png", "src/assets/Bushra.png"],
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
      images: ["src/assets/Bushra.png", "src/assets/Bushra.png"],
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
      className="w-full max-w-[360px] bg-gradient-to-br from-[#292B42] via-[#3E4A67] to-[#517C99] p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:bg-[#3E5571] hover:shadow-2xl hover:opacity-90"
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
      <Tilt options={{ max: 25, scale: 1.05, speed: 400 }} className="relative w-full h-[230px] mb-4">
        <motion.img
          src={images[0]}
          alt={name}
          className="object-cover w-full h-full transition-all duration-300 ease-in-out rounded-xl hover:scale-110 hover:rotate-2"
        />
        <div className="absolute inset-0 flex justify-end m-3">
          <motion.div
            onClick={() => window.open(source_code_link, "_blank")}
            className="flex items-center justify-center w-10 h-10 transition-all bg-indigo-600 rounded-full cursor-pointer bg-opacity-70 hover:bg-opacity-100 hover:scale-125 hover:shadow-xl"
          >
            <img
              src="https://img.icons8.com/ios-glyphs/30/ffffff/github.png"
              alt="GitHub"
              className="w-6 h-6"
            />
          </motion.div>
        </div>
      </Tilt>

      <div className="mt-5">
        <motion.h3
          variants={typingAnimation}
          initial="hidden"
          animate="visible"
          className="text-2xl font-bold text-[#F4A300] transition-all duration-200 hover:text-[#FF6F61]"
        >
          {name}
        </motion.h3>
        <motion.p
          variants={typingAnimation}
          initial="hidden"
          animate="visible"
          className="mt-2 text-[#C1D3E5] transition-all duration-200 hover:text-[#E4F0FA]"
        >
          {description}
        </motion.p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((tag, tagIndex) => (
          <motion.span
            key={tagIndex}
            variants={typingAnimation}
            initial="hidden"
            animate="visible"
            className={`text-sm font-medium ${tag.color}`}
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
      className="w-full max-w-[360px] bg-gradient-to-br from-[#292B42] via-[#3E4A67] to-[#517C99] p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:bg-[#3E5571] hover:shadow-2xl hover:opacity-90"
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
      <Tilt options={{ max: 25, scale: 1.05, speed: 400 }} className="relative w-full h-[230px] mb-4">
        <motion.img
          src={images[0]}
          alt={title}
          className="object-cover w-full h-full transition-all duration-300 ease-in-out rounded-xl hover:scale-110 hover:rotate-2"
        />
        <div className="absolute inset-0 flex justify-end m-3">
          <motion.div
            onClick={() => window.open(source_code_link, "_blank")}
            className="flex items-center justify-center w-10 h-10 transition-all bg-indigo-600 rounded-full cursor-pointer bg-opacity-70 hover:bg-opacity-100 hover:scale-125 hover:shadow-xl"
          >
            <img
              src="https://img.icons8.com/ios-glyphs/30/ffffff/github.png"
              alt="GitHub"
              className="w-6 h-6"
            />
          </motion.div>
        </div>
      </Tilt>

      <div className="mt-5">
        <motion.h3
          variants={typingAnimation}
          initial="hidden"
          animate="visible"
          className="text-2xl font-bold text-[#F4A300] transition-all duration-200 hover:text-[#FF6F61]"
        >
          {title}
        </motion.h3>
        <motion.p
          variants={typingAnimation}
          initial="hidden"
          animate="visible"
          className="mt-2 text-[#C1D3E5] transition-all duration-200 hover:text-[#E4F0FA]"
        >
          {description}
        </motion.p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((tag, tagIndex) => (
          <motion.span
            key={tagIndex}
            variants={typingAnimation}
            initial="hidden"
            animate="visible"
            className={`text-sm font-medium ${tag.color}`}
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
    <section className="w-full py-16 bg-gradient-to-br from-[#1E2A3A] via-[#16213E] to-[#0F1F28] relative">
      <div className="container relative z-10 px-6 mx-auto lg:px-20">
        <motion.div
          className="flex flex-col items-center justify-between mb-12 lg:flex-row"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {/* Left Side - Description */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-extrabold text-[#F4A300]">Code Canvas</h1>
            <p className="mt-4 text-[#C1D3E5]">
              In collaboration with my partner Muzahidul Islam Abir, we have embarked on a transformative journey to design and develop innovative projects and websites that address pressing real-world challenges. Our mission is rooted in empowering individuals and communities through technology-driven solutions that create tangible, meaningful impact.
            </p>
            <p className="mt-4 text-[#C1D3E5]">
              These initiatives reflect our deep commitment to teamwork, strategic problem-solving, and technical mastery. From conceptualizing ideas to implementing robust solutions, we have demonstrated proficiency in C, C++, Python, HTML, CSS, JavaScript, React, Vite, Three.js, GSAP, Framer Motion, Plotly, and Firebase. Each project is a testament to our ability to combine creativity with functionality, ensuring solutions that are both user-centric and future-ready.
            </p>
            <p className="mt-4 text-[#C1D3E5]">
              At the heart of our work lies a passion for innovation and a drive to overcome challenges. Through dedication, collaboration, and technical expertise, we aim to inspire and make a lasting difference in the real world.
            </p>
          </div>

          {/* Right Side - Lottie Animation */}
          <div className="flex justify-center mt-12 lg:w-1/2 lg:mt-0">
            <Lottie options={lottieOptions} height={"70%"} width={"70%"} />
          </div>
        </motion.div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-8">
          <button
            className={`py-2 px-4 text-lg font-semibold rounded-full transition-all duration-300 ml-4 ${
              activeTab === "websites"
                ? "bg-[#F4A300] text-black"
                : "text-[#F4A300] bg-transparent hover:bg-[#F4A300] hover:text-black"
            }`}
            onClick={() => setActiveTab("websites")}
          >
            Websites
          </button>
          <button
            className={`py-2 px-4 text-lg font-semibold rounded-full transition-all duration-300 ${
              activeTab === "projects"
                ? "bg-[#F4A300] text-black"
                : "text-[#F4A300] bg-transparent hover:bg-[#F4A300] hover:text-black"
            }`}
            onClick={() => setActiveTab("projects")}
          >
            Projects
          </button>
        </div>

        {/* Projects or Websites Cards */}
        <motion.div
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, delay: 0.4 } },
          }}
        >
          {activeTab === "projects" &&
            projects.map((project, index) => (
              <ProjectCard key={index} index={index} {...project} />
            ))}
          {activeTab === "websites" &&
            websites.map((website, index) => (
              <WebsiteCard key={index} index={index} {...website} />
            ))}
        </motion.div>



        {/* Detailed project or website modal */}
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-[#292B42] p-8 rounded-xl w-4/5 lg:w-1/2 max-h-[80vh] overflow-y-auto"
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
                className="absolute top-2 right-2 bg-[#F4A300] text-black p-2 rounded-full"
                whileHover={{
                  scale: 1.1,
                  rotate: 15,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                Close
              </motion.button>
              
              {/* Title */}
              <motion.h2
                className="text-3xl font-extrabold text-[#F4A300] mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {selectedProject.name || selectedProject.title}
              </motion.h2>
              
              {/* Description */}
              <motion.p
                className="text-[#C1D3E5] mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {selectedProject.detailedDescription}
              </motion.p>
              
              {/* Images */}
              <motion.div
                className="flex flex-wrap gap-4 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                {selectedProject.images.map((image, index) => (
                  <motion.img
                    key={index}
                    src={image}
                    alt={`image ${index}`}
                    className="object-cover w-32 h-32 rounded-lg"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.4 }}
                  />
                ))}
              </motion.div>
              
              {/* View Source Code Button */}
              <motion.div
                className="flex justify-end mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <a
                  href={selectedProject.source_code_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#F4A300] text-black py-2 px-4 rounded-full"
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
