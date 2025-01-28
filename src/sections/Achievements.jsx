import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { FaCheck, FaStar, FaTrophy } from "react-icons/fa";
import Ball from '../assets/3d_model/Ball';

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

const AnimatedModel = () => {
  return (
    <Canvas
      style={{ width: 150, height: 150, position: "absolute", top: "-20px", left: "-40px", zIndex: 10 }}
    >
      <ambientLight intensity={0.3} color="#FFC857" />
      <spotLight
        position={[20, 30, 10]}
        angle={0.7}
        penumbra={0.9}
        intensity={40}
        color="#E6B800"
        castShadow
      />
      <directionalLight
        position={[-10, 20, -10]}
        intensity={8}
        color="#F79D7D"
      />
      <pointLight
        position={[0, 5, 10]}
        intensity={25}
        color="#F26B38"
        decay={2}
      />
      <Suspense fallback={<LoadingFallback />}>
        <Ball />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={true} autoRotate autoRotateSpeed={1.5} />
    </Canvas>
  );
};

const AchievementCard = ({ achievement }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCard = () => {
    setIsExpanded((prev) => !prev);
  };

  return (


<VerticalTimelineElement
  contentStyle={{
    background: "rgba(255, 255, 255, 0.1)", // Semi-transparent white for glassmorphism effect
    backdropFilter: "blur(10px)", // Blur the background to achieve glassmorphism
    color: "theme('colors.primaryDark')", // Darker Slate Blue text
    borderRadius: "theme('borderRadius.2xl')", // Smooth corners
    padding: "1.5rem",
    boxShadow: "theme('boxShadow.xl')", // Subtle shadow for a lifted effect
    border: "2px solid theme('colors.primaryLight')", // Light border for glassmorphism effect
  }}
  contentArrowStyle={{ borderRight: `8px solid rgba(255, 255, 255, 0.1)` }} // Matches the transparent background
  iconStyle={{
    background: "theme('colors.accent2')", // Soft Coral icon
    color: "theme('colors.light')", // Light Gray icon text
    boxShadow: "theme('boxShadow.xl')", // Consistent shadow
    border: "2px solid theme('colors.primaryLight')", // Adding border around the icon
  }}
  icon={
    <div className="relative w-24 h-24">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent1Dark to-accent2Dark blur-xl opacity-90" />
      <AnimatedModel />
    </div>
  }
>
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.03 }}
    transition={{ duration: 0.3 }}
    className="cursor-pointer"
    onClick={toggleCard}
    role="button"
    aria-expanded={isExpanded}
  >
    <h3 className="font-serif text-2xl font-bold b-4 sm:text-3xl text-gradient">
      {achievement.title}
    </h3>
    <p className="mt-2 text-base leading-relaxed text-neutral">
      {achievement.description}
    </p>
  </motion.div>

  <motion.div
    initial={{ height: 0, opacity: 0 }}
    animate={isExpanded ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    style={{ overflow: "hidden", marginTop: "1rem" }}
  >
    <ul className="space-y-3">
      {achievement.points.map((point, index) => (
        <motion.li
          key={`achievement-point-${index}`}
          initial={{ opacity: 0, y: 10 }}
          animate={isExpanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start space-x-3 text-sm text-primary"
        >
          <div className="flex items-center justify-center w-6 h-6 text-white border-2 rounded-full shadow bg-secondaryDark border-primaryLight">
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
  useEffect(() => {
    gsap.fromTo(
      ".achievement-heading",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2 }
    );
  }, []);

  return (
    <section className="p-6 mt-20 space-y-10 md:p-12 lg:p-16" >
      <motion.div
        className="text-center achievement-heading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-transparent sm:text-5xl md:text-6xl bg-gradient-to-r from-secondaryLight to-accent1 bg-clip-text sm:-mt-10 md:-mt-12">
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