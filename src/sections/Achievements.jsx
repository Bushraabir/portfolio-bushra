import React, { useState, useEffect, Suspense ,memo ,useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FaCheck, FaChevronDown } from "react-icons/fa";
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
      "1st place in essay writing competition on Bissho Shishu o Jubo Theater Dibosh in 2023",
      "1st place in painting competition on Bissho Shishu o Jubo Theater Dibosh in 2022",
      "3rd place in painting competition based on 7th March historical speech in 2022",
      "1st place in essay writing competition on Independence Day of Bangladesh in 2022",
      "3rd place in painting competition based on National Mourning Day in 2022",
      "1st place in International Mother Language Day Essay Writing Competition in 2019",
      "1st place in painting competition on National Mourning Day in 2019",
      "2nd place in painting competition on Bissho Shishu o Jubo Theater Dibosh in 2019",
    ]
  },
  {
    title: "Crafting Creativity",
    description: "Creativity is the heartbeat of my work, whether in traditional art or innovative digital designs.",
    points: [
      "Skilled in Acrylic and watercolor painting, pencil sketching, clay sculpture, and crafting",
      "Proficient in 3D modeling and rendering in Blender",
      "Expert in Graphic design and digital art using Adobe Illustrator, Photoshop, and Krita",
      "Best artist in Inter House Painting Competition in 2018, drawing freedom with charcoal",
      "Best writer in Inter House Wall Magazine Competition in 2017",
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
      "Team leader in InterHouse Science Fair Competition in 2022, where the project 'Gusto' with face recognition technology was awarded as the best project",
      "Team leader in Inter House Science Fair Competition in 2019, where the project on easy water purification and supply was awarded as the best project",
      "House Prefect of Bir Protik Dr. Captain Sitara Begum House, leading 92 cadets to overall championship in the 2023 Annual Athletics based on discipline, academics, cleanliness, and integrity",
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
  <Canvas style={{ width: 250, height: 250, position: "absolute", top: "-60px", left: "-90px", zIndex: 10 }}>
    <ambientLight intensity={3} color="#a3c4f3" />
    <spotLight position={[15, 25, 10]} angle={0.7} penumbra={0.9} intensity={40} color="#f1c0e8" castShadow />
    <directionalLight position={[-10, 20, -10]} intensity={6} color="#ffcfd2" />
    <pointLight position={[0, 5, 10]} intensity={30} color="#fde4cf" decay={2} />
    <Suspense fallback={<LoadingFallback />}>
      <Ball />
    </Suspense>
    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.2} />
  </Canvas>
));


const AchievementCard = ({ achievement }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleCard = () => setIsExpanded((prev) => !prev);

  useEffect(() => {
    gsap.fromTo(".achievement-heading", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.2 });
  }, []);

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "rgba(30, 30, 60, 0.6)",
        backdropFilter: "blur(1px)",
        borderRadius: "1.5rem",
        padding: "2.5rem",
        border: "3px solid rgba(255, 255, 255, 0.5)",
      }}
      contentArrowStyle={{ borderRight: "10px solid rgba(30, 30, 60, 0.6)" }}
      iconStyle={{
        background: "linear-gradient(135deg, #6A5ACD, #FF6347)",
        color: "#fefef5",
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
        border: "2px solid #FFC857",
      }}
      icon={<AnimatedModel />}
    >
      <motion.div onClick={toggleCard} role="button" aria-expanded={isExpanded}>
        <h3 className="text-3xl sm:text-4xl font-serif font-extrabold text-transparent bg-gradient-to-r from-lemon_chiffon to-purple-700 bg-clip-text transition-transform transform hover:scale-105 hover:text-accent">
          {achievement.title}
        </h3>
        <p className="mt-6 text-lg sm:text-xl leading-relaxed text-champagne_pink opacity-85 font-light">
          {achievement.description}
        </p>
        <motion.div
          animate={{ rotate: isExpanded ? 0 : 180 }}
          transition={{ duration: 0.3 }}
          className="mt-3 inline-block transform transition-transform duration-300 ease-in-out"
        >
          <FaChevronDown className="text-3xl text-tea_rose hover:text-non_photo_blue" />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={isExpanded ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ overflow: "hidden", marginTop: "1.5rem" }}
      >
        <ul className="space-y-4">
          {achievement.points.map((point, index) => (
            <motion.li
              key={index}
              className="flex items-start space-x-3 text-sm sm:text-md text-non_photo_blue opacity-90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex items-center justify-center w-7 h-7 text-white border-2 border-gradient-to-r from-lemon_chiffon-500 to-tea_rose-600 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md">
                <FaCheck className="text-xs" />
              </div>
              <span className="font-medium">{point}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </VerticalTimelineElement>
  );
  
};



const Achievements = () => {
  const [cursorPosition, setCursorPosition] = useState(null);

  const handleMouseMove = (event) => {
    setCursorPosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    gsap.fromTo(".achievement-heading", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: ".achievement-heading", start: "top 90%" } });
    gsap.fromTo(".achievement-card", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5, scrollTrigger: { trigger: ".achievement-card", start: "top 80%" } });
  }, []);

  return (
    <section id="achievements" className="p-6 mt-16 space-y-12 shadow-xl md:p-12 lg:p-16 bg-gradient-to-b from-deep_indigo via-mauve to-pink_lavender bg-opacity-90 backdrop-blur-sm rounded-t-4xl">

      <motion.div className="mb-32 text-center relative overflow-hidden">
      <motion.h2 
        className="mt-5 achievement-heading text-5xl sm:text-6xl md:text-7xl font-serif font-extrabold text-transparent relative z-20 
          before:content-[attr(data-content)] before:absolute before:inset-0 before:text-transparent 
          before:border-[#fbf8cc] before:-webkit-text-stroke-[2px] text-stroke transition-all duration-1500 ease-out 
          transform hover:scale-105 hover:text-white"
        data-content="Achievements &amp; Recognitions"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 0.8, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Achievements &amp; Recognitions
      </motion.h2>

      <motion.p 
        className="mt-6 sm:mt-8 text-xl sm:text-2xl font-mono text-champagne_pink-500 opacity-85 tracking-wide leading-relaxed max-w-4xl mx-auto transition-all duration-500 ease-in-out transform hover:text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        A journey of excellence, growth, and success, recognized globally, with an unwavering commitment to progress and innovation.
      </motion.p>
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