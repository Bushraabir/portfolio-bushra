import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { FaTrophy } from 'react-icons/fa';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";



gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    title: "Pillars of Excellence",
    description: "Driven by dedication, perseverance, and a thirst for knowledge, I have consistently excelled across multiple academic levels, earning recognition and scholarships.",
    points: [
      "Ranked 31st in Bangladesh University of Engineering Technology (BUET), the top Engineering University of Bangladesh in 2024",
      "Nominated as Upazilla Bitthik Sresto Shikkharti in 2024",
      "Top performer in high school and college",
      "GPA 5.00 in Higher Secondary School Certificate (HSC) in 2023",
      "General Grade Scholarship in Higher Secondary School Certificate (HSC) in 2023",
      "GPA 5.00 in Secondary School Certificate (SSC) in 2021",
      "Talentpool Scholarship in Secondary School Certificate (SSC) in 2021",
      "GPA 5.00 in Junior School Certificate (JSC) in 2018",
      "Talentpool Scholarship in Junior School Certificate (JSC) in 2018",
      "GPA 5.00 in Primary Education Completion Examination (PECE) in 2015",
    ],
  },
  {
    title: "Rising through Challenges",
    description: "I thrive in competitive environments, using every challenge as a stepping stone to growth and excellence.",
    points: [
      "Participated and selected in the International Youth Math Challenge (IYMC) in 2024",
      "1st place at the regional level of Bangladesh Physics Olympiad (BDPHO) in 2022",
      "Regional level winner in Bangladesh Junior Science Olympiad (2019)",
      "Best Cadet Award for 2017",
    ]
  },
  {
    title: "Crafting Creativity",
    description: "Creativity is the heartbeat of my work, whether in traditional art or innovative digital designs.",
    points: [
      "Skilled in Acrylic and watercolor painting, pencil sketching, clay sculpture, and crafting",
      "Proficient in 3D modeling and rendering in Blender",
      "Expert in Graphic design and digital art using Adobe Illustrator, Photoshop, and Krita",
    ]
  },
  {
    title: "Bridging Art and Technology",
    description: "I merge creativity with technology to build solutions that stand out.",
    points: [
      "Proficient in programming languages like C, C++, Python",
      "Passionate about Machine Learning and Artificial Intelligence with Python",
      "Skilled in frontend web development (HTML, CSS, JavaScript, React, Vite, Three.js, Tailwind CSS)",
      "Worked on backend solutions with Firebase",
      "Experienced in web animation using GSAP and Framer Motion",
    ]
  },
  {
    title: "Driven by Curiosity",
    description: "I explore the vastness of knowledge and the endless possibilities to innovate and push boundaries.",
    points: [
      "Deep interest in astronomy and the mysteries of the Universe",
      "Authored research papers and articles",
      "Exploring data structures and algorithms",
      "Creating innovative projects that solve real-world problems",
      "Passionate about creating 3D physics simulations",
    ]
  },
  {
    title: "Leadership with Purpose",
    description: "Guided by a sense of responsibility, I’ve led teams and inspired others to excel both academically and beyond.",
    points: [
      "Served as house prefect, leading the champion house with organizational skills and vision",
      "Best Cadet Award in 2017 for exemplary discipline and performance",
      "Proven leadership in fostering collaboration and team growth",
    ]
  },
  {
    title: "Empowering Through Education",
    description: "As the founder of EmpowerEd, I strive to inspire and empower others through education, mentorship, and innovation.",
    points: [
      "Founded and led an organization focused on empowering individuals through education and innovation",
      "Organized events and programs focused on skill development and personal growth",
      "Exhibited leadership, teamwork, and entrepreneurial spirit in managing the organization",
    ]
  },
  {
    title: "Mentorship in Action",
    description: "I believe in the power of mentorship to unlock potential and guide others to success.",
    points: [
      "Provided tuition for 2 months to 3 students, enhancing their understanding of Physics and Mathematics",
      "Fostered problem-solving skills and conceptual clarity",
      "Exhibited patience, adaptability, and effective teaching methods to inspire growth",
    ]
  },
];
const Model = ({ modelPath }) => {
  const gltf = useLoader(GLTFLoader, modelPath);
  return <primitive object={gltf.scene} scale={1.5} />;
};


const LoadingFallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="gray" />
  </mesh>
);


const AnimatedModel = () => {
  return (
    <Canvas
      style={{ width: 150, height: 150, position: "absolute", top: "-20px", left: "-40px", zIndex: 10 }}
    >
      <ambientLight intensity={0.8} color="#A3C4F1" />
      <spotLight
        position={[15, 20, 5]}
        angle={1.5}
        penumbra={1.5}
        intensity={40}
        color="#B8C8FF"
      />
      <directionalLight position={[10, 15, 10]} intensity={3.5} color="#A1B9D9" />
      <Suspense fallback={<LoadingFallback />}>
      <Model modelPath="/portfolio-bushra/src/assets/3d_model/scene.gltf" />
    </Suspense>
      <OrbitControls enableZoom={false} enablePan={true} autoRotate autoRotateSpeed={1.5} />
    </Canvas>
  );
};

// Achievement Card Component
const AchievementCard = ({ achievement }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCard = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "linear-gradient(135deg, #4A4E9E, #576CA8)",
        color: "#F4F9FF",
        overflow: "hidden",
        borderRadius: "12px",
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
      }}
      contentArrowStyle={{ borderRight: "7px solid #576CA8" }}
      iconStyle={{ background: "transparent", boxShadow: "none" }}
      icon={
        <div style={{ width: 100, height: 100, position: "relative" }}>
          <AnimatedModel />
        </div>
      }
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.05, boxShadow: "0px 12px 25px rgba(0, 0, 0, 0.3)" }}
        transition={{ duration: 0.3 }}
        onClick={toggleCard}
        style={{ cursor: "pointer" }}
      >
        <h3 className="text-white text-[24px] font-bold hover:text-indigo-200 transition-all duration-300">
          {achievement.title}
        </h3>
        <p className="text-[#D1D8E0] text-[16px] font-semibold hover:text-gray-300 transition-all duration-300">
          {achievement.description}
        </p>
      </motion.div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={isExpanded ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ overflow: "hidden", marginTop: "10px" }}
      >
        <ul className="mt-3 space-y-3">
          {achievement.points.map((point, index) => (
            <motion.li
              key={`achievement-point-${index}`}
              initial={{ opacity: 0, y: 15 }}
              animate={isExpanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ delay: index * 0.15 }}
              className="flex items-center space-x-3 text-[#B4C9E2] text-[16px] font-medium pl-2 pr-3 tracking-wider hover:text-indigo-400 hover:bg-[#2C3A56] hover:scale-105 hover:shadow-lg rounded-lg transition-all duration-300 ease-in-out"
            >
              <FaTrophy className="text-2xl text-indigo-300" />
              <span>{point}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </VerticalTimelineElement>
  );
};

const Achievements = () => {
  useEffect(() => {
    gsap.fromTo(
      ".achievement-heading",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2 }
    );
  }, []);

  return (
    <section className="p-6 space-y-10 md:p-12 lg:p-16">
      <motion.div
        className="text-center achievement-heading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-[#4B5C84]">
          My Achievements
        </h2>
      </motion.div>
      <VerticalTimeline>
        {achievements.map((achievement, index) => (
          <AchievementCard key={index} achievement={achievement} />
        ))}
      </VerticalTimeline>
    </section>
  );
};

export default Achievements;
