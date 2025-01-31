import React, { useState, useEffect, Suspense ,memo ,useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FaCheck,  } from "react-icons/fa";
import Ball from '../assets/3d_model/Ball';
import Star from "../components/Stars";

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

const LoadingFallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="gray" />
  </mesh>
);

const AnimatedModel = memo(() => (
  <Canvas style={{ width: 150, height: 150, position: "absolute", top: "-20px", left: "-40px", zIndex: 10 }}>
    {/* Ambient light with a soft blue from your Tailwind palette */}
    <ambientLight intensity={5} color="#a3c4f3" /> {/* Jordy Blue */}
    
    {/* Spot light with a soft purple tint, matching with Pink Lavender */}
    <spotLight position={[20, 30, 10]} angle={0.7} penumbra={0.9} intensity={50} color="#f1c0e8" castShadow /> {/* Pink Lavender */}
    
    {/* Directional light with a pink glow, adjusted to Tea Rose */}
    <directionalLight position={[-10, 20, -10]} intensity={8} color="#ffcfd2" /> {/* Tea Rose */}
    
    {/* Point light with a warm golden highlight, aligned with Champagne Pink */}
    <pointLight position={[0, 5, 10]} intensity={50} color="#fde4cf" decay={2} /> {/* Champagne Pink */}
    
    <Suspense fallback={<LoadingFallback />}>
      <Ball />
    </Suspense>
    
    <OrbitControls enableZoom={false} enablePan autoRotate autoRotateSpeed={1.5} />
  </Canvas>
));




const AchievementCard = ({ achievement }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleCard = () => setIsExpanded((prev) => !prev);

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "rgba(30, 30, 60, 0.5)",
        backdropFilter: "blur(12px)",
        borderRadius: "20px",
        padding: "1.5rem",
        border: "1px solid rgba(255, 255, 255, 0.2)"
      }}
      contentArrowStyle={{ borderRight: "8px solid rgba(30, 30, 60, 0.5)" }}
      iconStyle={{
        background: "linear-gradient(135deg, #7B61FF, #FF6F3C)",
        color: "#fff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        border: "2px solid #FFC857"
      }}
      icon={<AnimatedModel />}
    >
      <motion.div onClick={toggleCard} role="button" aria-expanded={isExpanded}>
        <h3 className="font-serif text-2xl font-bold text-transparent sm:text-3xl bg-gradient-to-r from-jordy_blue to-mauve bg-clip-text">
          {achievement.title}
        </h3>
        <p className="mt-2 text-base leading-relaxed text-neutral-200">{achievement.description}</p>
      </motion.div>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={isExpanded ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ overflow: "hidden", marginTop: "1rem" }}
      >
        <ul className="space-y-3">
          {achievement.points.map((point, index) => (
            <motion.li key={index} className="flex items-start space-x-3 text-sm text-accent">
              <div className="flex items-center justify-center w-6 h-6 text-white border-2 border-purple-300 rounded-full shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500">
                <FaCheck className="text-xs" />
              </div>
              <span>{point}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </VerticalTimelineElement>
  );
};

const Achievements = () => {
  const [cursorPosition, setCursorPosition] = useState(null);

  useEffect(() => {
    gsap.fromTo(".achievement-heading", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.2 });
  }, []);

  const handleMouseMove = (event) => {
    setCursorPosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="p-6 mt-20 space-y-10 shadow-xl md:p-12 lg:p-16 bg-gradient-to-b from-deep_indigo via-mauve to-pink_lavender bg-opacity-90 backdrop-blur-sm ">
      <div className="absolute inset-0 opacity-50 bg-gradient-to-r from-aquamarine to-jordy_blue mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-radial-gradient(closest-corner, rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.2)) opacity-20"></div>
      <motion.div
        className="mb-10 text-center achievement-heading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-transparent sm:text-5xl md:text-6xl bg-gradient-to-r from-mauve to-pink_lavender bg-clip-text">
          Achievements and Recognitions
        </h2>
      </motion.div>
      <Star cursorPosition={cursorPosition} />
      <VerticalTimeline lineColor="rgba(255, 255, 255, 0.2)">
        {achievements.map((achievement, index) => (
          <AchievementCard key={index} achievement={achievement} />
        ))}
      </VerticalTimeline>
    </section>
  );
};

export default Achievements;