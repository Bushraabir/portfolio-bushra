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
    title: "Academic Excellence & Scholarships",
    description: "Demonstrating consistent academic excellence, I have secured prestigious ranks, scholarships, and accolades throughout my educational journey.",
    points: [
      "Ranked 31st in the Bangladesh University of Engineering and Technology (BUET) Architecture admission test (2023)",
      "Awarded Upazilla Bitthik Sresto Shikkharti recognition (2024)",
      "Achieved a perfect GPA 5.00 in Higher Secondary Certificate (HSC) (2023)",
      "Recipient of the General Grade Scholarship in HSC (2023)",
      "Earned GPA 5.00 in Secondary School Certificate (SSC) (2021)",
      "Awarded Talent Pool Scholarship in SSC (2021)",
      "Attained GPA 5.00 in Junior School Certificate (JSC) (2018)",
      "Received Talent Pool Scholarship in JSC (2018)",
      "Achieved GPA 5.00 in Primary Education Completion Examination (PECE) (2015)",
    ],
  },
  {
    title: "Leadership & Team Management",
    description: "I have taken on leadership roles, guiding teams with discipline, integrity, and vision, fostering excellence in academics and extracurriculars.",
    points: [
      "Junior Prefect – Appointed as the Junior Prefect of Bir Protik Dr. Captain Sitara Begum House (2021)",
      "House Prefect – Led 92 cadets as the House Prefect of Bir Protik Dr. Captain Sitara Begum House (2022-2023)",
      "Under my leadership, the house won the Overall Championship in the 2023 Annual Athletics based on discipline, academics, and teamwork",
      "Best Cadet Award (2017) – Recognized for outstanding discipline, academics, and co-curricular excellence",
    ],
  },
  {
    title: "STEM Competitions & Olympiads",
    description: "Excelling in national-level Olympiads and science fairs, I have continuously pushed my intellectual boundaries.",
    points: [
      "Bangladesh Math Olympiad – Regional Winner, National Round Participant (2020)",
      "Bangladesh Physics Olympiad (BdPhO) – 1st place in the regional round (Jessore), National Round Participant (2023)",
      "Interhouse Astro Olympiad – 3rd place (2022)",
      "Interhouse Astrophysics Olympiad – 1st place in the junior group (2019)",
      "Biggan Uthsob (National) – Regional Winner, National Round Participant with a project on Biodegradable Polythene (2019)",
    ],
  },
  {
    title: "Writing & Communication Excellence",
    description: "With a passion for writing, I have earned multiple awards in essay competitions, demonstrating strong analytical and expressive skills.",
    points: [
      "1st place – MCSK Essay Writing Competition (2017)",
      "2nd place – Interhouse Essay Writing Competition (2020)",
      "1st place – International Mother Language Day Essay Competition (2019)",
      "1st place – Essay Writing Competition on Independence Day of Bangladesh (2022)",
      "Best Writing Award – InterHouse Wall Magazine Competition (2017)",
    ],
  },
  {
    title: "Creative & Artistic Achievements",
    description: "My artistic skills, spanning traditional and digital media, have been recognized in national and institutional competitions.",
    points: [
      "3rd place – Bangla Vision Painting Competition (2013)",
      "1st place – Bissho Shishu o Jubo Theater Dibosh Painting Competition (2019, 2022)",
      "1st place – National Mourning Day Painting Competition (2019)",
      "3rd place – 7th March Historical Speech Painting Competition (2022)",
      "Recognized as Best Artist – Interhouse Painting Competition (2018)",
    ],
  },
  {
    title: "Innovation & Scientific Research",
    description: "Merging science with technology, I have led innovative projects that provide real-world solutions.",
    points: [
      "Team Leader – InterHouse Science Fair (Senior Group), Developed 'Gusto,' a virtual assistant with Face Recognition, awarded Best Project (2022)",
      "Led a project on Easy Water Purification and Supply, awarded Best Project (2019)",
      "Biggan Uthsob (National) – Regional Winner, National Round Participant (2019)",
    ],
  },
  {
    title: "Public Speaking & Debate",
    description: "Effective communication is key to leadership, and I have honed this skill through competitive speaking events.",
    points: [
      "Awarded Soujonno Pouroshkar – 7th March Extempore Speech Competition (2022)",
      "Runners-up – Debate Competition (2016)",
    ],
  },
  {
    title: "Empowering Through Education",
    description: "As the founder of EmpowerEd, I strive to inspire and uplift through education and innovation.",
    points: [
      "Founded EmpowerEd – An initiative focused on skill development and mentorship",
      "Organized educational programs to enhance knowledge and career readiness",
      "Exhibited leadership, teamwork, and entrepreneurial vision in managing the organization",
    ],
  },
  {
    title: "Mentorship & Teaching Experience",
    description: "Passionate about teaching, I have mentored students, helping them excel academically.",
    points: [
      "Provided tuition to 3 students for 2 months, improving their Physics and Mathematics comprehension",
      "Focused on problem-solving skills and conceptual clarity",
      "Implemented adaptive teaching techniques to enhance student learning",
    ],
  },
  {
    title: "Technical Expertise & Digital Skills",
    description: "With a strong technical foundation, I integrate programming, design, and 3D visualization to create impactful solutions.",
    points: [
      "Proficient in programming languages: C, C++, Python",
      "Passionate about Machine Learning and Artificial Intelligence with Python",
      "Experienced in frontend web development (HTML, CSS, JavaScript, React, Vite, Three.js, Tailwind CSS)",
      "Backend experience with Firebase",
      "Skilled in web animation using GSAP and Framer Motion",
      "Passionate about 3D physics simulations",
      "Proficient in 3D modeling and rendering using Blender",
      "Expert in Graphic Design and Digital Art (Adobe Illustrator, Photoshop, Krita)",
    ],
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
        data-content="Accomplishments"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 0.8, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Accomplishments
      </motion.h2>

      <motion.p 
        className="mt-6 sm:mt-8 text-xl sm:text-2xl font-mono text-champagne_pink-500 opacity-85 tracking-wide leading-relaxed max-w-4xl mx-auto transition-all duration-500 ease-in-out transform hover:text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        From my first day of school to now, I’ve committed myself to not only understanding the world around me but also to making an impact through innovative projects and academic pursuits. This section highlights my journey of continuous learning, where I've combined my passion for technology, science, and creativity to create solutions that are both meaningful and transformative.
      </motion.p>

      <motion.p 
        className="mt-6 sm:mt-8 text-xl sm:text-2xl font-mono text-champagne_pink-500 opacity-85 tracking-wide leading-relaxed max-w-4xl mx-auto transition-all duration-500 ease-in-out transform hover:text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Whether through my academic achievements, collaborative projects, or hands-on experience in programming, 3D modeling, and scientific exploration, I have strived to push the boundaries of what I know and share that knowledge with others. I believe in the power of learning to drive change, and I am excited to bring this mindset into my future endeavors.


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