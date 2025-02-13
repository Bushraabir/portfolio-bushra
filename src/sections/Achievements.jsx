import React, { useState, useEffect, Suspense, memo } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FaCheck, FaChevronDown } from "react-icons/fa";
import Ball from "../assets/3d_model/Ball";
import Star from "../components/Stars";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    title: "Academic Excellence & Scholarships",
    description: "Consistently achieved top ranks, scholarships, and accolades throughout my education.",
    points: [
      "31st in the Bangladesh University of Engineering and Technology (BUET) Architecture admission test (2023)",
      "Upazilla Bitthik Sresto Shikkharti recognition (2024)",
      "GPA 5.00 in Higher Secondary Certificate (HSC) (2023)",
      "General Grade Scholarship in HSC (2023)",
      "GPA 5.00 in Secondary School Certificate (SSC) (2021)",
      "Talent Pool Scholarship in SSC (2021)",
      "GPA 5.00 in Junior School Certificate (JSC) (2018)",
      "Talent Pool Scholarship in JSC (2018)",
      "GPA 5.00 in Primary Education Completion Examination (PECE) (2015)",
    ],
  },
  {
    title: "Leadership & Team Management",
    description: "Led teams with discipline, integrity, and vision, promoting excellence in academics and extracurriculars.",
    points: [
      "Junior Prefect – Appointed as the Junior Prefect of Bir Protik Dr. Captain Sitara Begum House (2021)",
      "House Prefect – Led 92 cadets as the House Prefect of Bir Protik Dr. Captain Sitara Begum House (2022-2023)",
      "Under my leadership, the house won the Overall Championship in the 2023 Annual Athletics based on discipline, academics, and teamwork",
      "Best Cadet Award (2017) – Recognized for outstanding discipline, academics, and co-curricular excellence",
    ],
  },
  {
    title: "STEM Competitions & Olympiads",
    description: "Excelled in national Olympiads and science fairs, pushing my intellectual boundaries.",
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
    description: "Earned multiple awards in essay competitions, showcasing strong analytical and expressive skills.",
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
    description: "My artistic skills, in both traditional and digital media, have been recognized in national and institutional competitions.",
    points: [
      "3rd place – Bangla Vision Painting Competition (2013)",
      "1st place – Bissho Shishu o Jubo Theater Dibosh Painting Competition (2019, 2022)",
      "1st place – National Mourning Day Painting Competition (2019)",
      "3rd place – 7th March Historical Speech Painting Competition (2022)",
      "Best Artist – Interhouse Painting Competition (2018)",
    ],
  },
  {
    title: "Innovation & Scientific Research",
    description: "Led projects combining science and technology to provide real-world solutions.",
    points: [
      "Team Leader – InterHouse Science Fair (Senior Group), Developed 'Gusto,' a virtual assistant with Face Recognition, awarded Best Project (2022)",
      "Team Leader - Easy Water Purification and Supply, awarded Best Project (2019)",
      "Biggan Uthsob (National) – Biodegradable Polythene - Regional Winner, National Round Participant (2019)",
    ],
  },
  {
    title: "Public Speaking & Debate",
    description: "Improved communication skills through speaking competitions.",
    points: [
      "Soujonno Pouroshkar – 7th March Extempore Speech Competition (2022)",
      "Runners-up – Debate Competition (2016)",
    ],
  },
  {
    title: "NPO Volunteering",
    description: "Volunteered with EmpowerEd, supporting its mission to provide education and opportunities.",
    points: [
      "Founded EmpowerEd, a non-profit organization.",
      "Vice President of EmpowerEd.",
      "STEM Innovation Advisor at EmpowerEd.",
      "Fundraising Coordinator at EmpowerEd."
    ],
  },
  {
    title: "Mentorship & Teaching Experience",
    description: "Mentored students, helped them academically.",
    points: [
      "Provided tuition to 3 students for 2 months, improving their Physics and Mathematics.",
      "Created interactive PDFs and notes.",
      "Implemented adaptive teaching techniques to enhance student learning",
    ],
  },
  {
    title: "Technical Expertise & Digital Skills",
    description: "Strong technical foundation in programming, design, and 3D visualization to create solutions.",
    points: [
      "Programming languages : C, C++, Python",
      "Passionate about Machine Learning and Artificial Intelligence with Python",
      "Frontend web development : HTML, CSS, JavaScript, React, Vite, Three.js, Tailwind CSS",
      "Backend experience with Firebase",
      "Web animation using GSAP and Framer Motion",
      "3D physics simulations using blender",
      "3D modeling and rendering using Blender",
      "Graphic Design and Digital Art : Adobe Illustrator, Photoshop, Krita ",
    ],
  },
];


class WebGLErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("WebGL error caught:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            width: 350,
            height: 350,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#000",
            color: "#fff",
          }}
        >
          WebGL Error
        </div>
      );
    }
    return this.props.children;
  }
}

const LoadingFallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#444" />
  </mesh>
);

const AnimatedModel = memo(() => (
  <WebGLErrorBoundary>
    <Canvas
      style={{
        width: 350,
        height: 350,
        position: "absolute",
        top: "-149px",
        left: "-145px",
        zIndex: 10,
      }}
    >
      <ambientLight intensity={3} color="#a3c4f3" />
      <spotLight position={[15, 25, 10]} angle={0.7} penumbra={0.9} intensity={40} color="#f1c0e8" castShadow />
      <directionalLight position={[-10, 20, -10]} intensity={6} color="#ffcfd2" />
      <pointLight position={[0, 5, 10]} intensity={30} color="#fde4cf" decay={2} />
      <Suspense fallback={<LoadingFallback />}>
        <Ball />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.2} />
    </Canvas>
  </WebGLErrorBoundary>
));

const AchievementCard = ({ achievement, isMobile }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleCard = () => setIsExpanded((prev) => !prev);
  useEffect(() => {
    gsap.fromTo(
      ".achievement-heading",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".achievement-heading", start: "top 90%" },
      }
    );
  }, []);
  const titleClass = isMobile
    ? "achievement-heading text-2xl font-heading font-bold text-transparent bg-gradient-to-r from-lemon_chiffon to-pink_lavender bg-clip-text tracking-tight transition-transform transform hover:scale-105 hover:text-white"
    : "achievement-heading text-3xl sm:text-4xl font-heading font-bold text-transparent bg-gradient-to-r from-lemon_chiffon to-pink_lavender bg-clip-text tracking-tight transition-transform transform hover:scale-105 hover:text-white";
  const descriptionClass = isMobile
    ? "mt-4 text-sm leading-relaxed tracking-wide text-champagne_pink opacity-90 font-serif transition-colors duration-300 hover:text-white"
    : "mt-4 text-base sm:text-lg leading-relaxed tracking-wide text-champagne_pink opacity-90 font-serif transition-colors duration-300 hover:text-white";
  const pointClass = isMobile
    ? "flex items-start space-x-3 text-sm text-champagne_pink opacity-90 font-serif"
    : "flex items-start space-x-3 text-base sm:text-lg text-champagne_pink opacity-90 font-serif";
  return (
    <VerticalTimelineElement
      className="achievement-card"
      contentStyle={{
        background: "rgba(20,20,40,0.7)",
        backdropFilter: "blur(1px)",
        borderRadius: "1.5rem",
        padding: isMobile ? "1rem" : "2rem",
        border: "2px solid rgba(255,255,255,0.3)",
      }}
      contentArrowStyle={{ borderRight: "8px solid rgba(20,20,40,0.1)" }}
      icon={<AnimatedModel />}
    >
      <motion.div onClick={toggleCard} role="button" aria-expanded={isExpanded} className="cursor-pointer">
        <h3 className={titleClass}>{achievement.title}</h3>
        <p className={descriptionClass}>{achievement.description}</p>
        <motion.div
          animate={{ rotate: isExpanded ? 0 : 180 }}
          transition={{ duration: 0.3 }}
          className="mt-3 inline-block transform transition-transform duration-300 ease-in-out"
        >
          <FaChevronDown className="text-2xl text-pink_lavender hover:text-white" />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={isExpanded ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="overflow-hidden mt-4"
      >
        <ul className="space-y-3">
          {achievement.points.map((point, index) => (
            <motion.li
              key={index}
              className={pointClass}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex items-center justify-center w-6 h-6 text-white border-2 border-transparent rounded-full bg-gradient-to-r from-tea_rose to-pink_lavender shadow-md">
                <FaCheck className="text-lg" />
              </div>
              <span className="tracking-wide">{point}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </VerticalTimelineElement>
  );
};

const Achievements = () => {
  const [cursorPosition, setCursorPosition] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const updateCursor = (event) => setCursorPosition({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);
  useEffect(() => {
    gsap.fromTo(
      ".achievement-card",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: ".achievement-card", start: "top 80%" } }
    );
  }, []);
  const sectionClass = isMobile
    ? "p-4 mt-8 space-y-8 bg-gradient-to-b from-deep_indigo via-mauve to-pink_lavender bg-opacity-90 backdrop-blur-lg rounded-t-2xl"
    : "p-8 mt-16 space-y-12 shadow-2xl md:p-12 lg:p-16 bg-gradient-to-b from-deep_indigo via-mauve to-pink_lavender bg-opacity-90 backdrop-blur-lg rounded-t-3xl";
  const headerClass = isMobile
    ? "mt-5 text-4xl font-heading font-extrabold text-transparent relative z-20 before:content-[attr(data-content)] before:absolute before:inset-0 before:text-transparent before:[-webkit-text-stroke:1px_white] transition-all duration-1000 ease-out transform hover:scale-105 hover:text-white"
    : "mt-5 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-heading font-extrabold text-transparent relative z-20 before:content-[attr(data-content)] before:absolute before:inset-0 before:text-transparent before:[-webkit-text-stroke:1px_white] transition-all duration-1000 ease-out transform hover:scale-105 hover:text-white";
  const paraClass = isMobile
    ? "mt-4 text-sm font-serif text-champagne_pink opacity-90 tracking-wide leading-relaxed max-w-3xl mx-auto transition-all duration-500 ease-in-out transform hover:text-white"
    : "mt-8 sm:mt-10 text-base sm:text-lg md:text-xl font-serif text-champagne_pink opacity-90 tracking-wide leading-relaxed max-w-3xl mx-auto transition-all duration-500 ease-in-out transform hover:text-white";
  const paraClass2 = isMobile
    ? "mt-3 text-sm font-serif text-champagne_pink opacity-85 tracking-wide leading-relaxed max-w-3xl mx-auto transition-all duration-500 ease-in-out transform hover:text-white"
    : "mt-6 sm:mt-8 text-base sm:text-lg md:text-xl font-serif text-champagne_pink opacity-85 tracking-wide leading-relaxed max-w-3xl mx-auto transition-all duration-500 ease-in-out transform hover:text-white";
  return (
    <section id="achievements" className={sectionClass}>
      <motion.div className="mb-16 text-center relative overflow-hidden">
        <motion.h2
          className={headerClass}
          data-content="Accomplishments"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Accomplishments
        </motion.h2>
        <motion.p
          className={paraClass}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          From the first day of school until now, everything I've done has been driven by my curiosity. This curiosity has not only allowed me to explore my purpose and interests but has also been the catalyst for my continuous personal development. Each step has been a part of a greater journey toward growth.
        </motion.p>
        <motion.p
          className={paraClass2}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Whether through academic achievements, collaborative projects, or hands-on experience, I push the boundaries of knowledge and share that expertise with others.
        </motion.p>
      </motion.div>
      <Star cursorPosition={cursorPosition} />
      <VerticalTimeline lineColor="rgba(255,255,255,0.2)">
        {achievements.map((achievement, index) => (
          <AchievementCard key={index} achievement={achievement} isMobile={isMobile} />
        ))}
      </VerticalTimeline>
    </section>
  );
};

export default Achievements;
