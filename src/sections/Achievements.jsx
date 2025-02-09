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

// -------------------------------------------------------------------
// (3) Define a fallback component for Suspense (while loading Ball)
// -------------------------------------------------------------------
const LoadingFallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#444" />
  </mesh>
);

// -------------------------------------------------------------------
// (4) Create the AnimatedModel component that renders the 3D model
//      wrapped by our WebGL error boundary.
// -------------------------------------------------------------------
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
      <spotLight
        position={[15, 25, 10]}
        angle={0.7}
        penumbra={0.9}
        intensity={40}
        color="#f1c0e8"
        castShadow
      />
      <directionalLight position={[-10, 20, -10]} intensity={6} color="#ffcfd2" />
      <pointLight position={[0, 5, 10]} intensity={30} color="#fde4cf" decay={2} />
      <Suspense fallback={<LoadingFallback />}>
        <Ball />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.2}
      />
    </Canvas>
  </WebGLErrorBoundary>
));

// -------------------------------------------------------------------
// (5) Define the AchievementCard component that uses AnimatedModel
//     as its icon and provides expandable details.
// -------------------------------------------------------------------
const AchievementCard = ({ achievement }) => {
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
        scrollTrigger: {
          trigger: ".achievement-heading",
          start: "top 90%",
        },
      }
    );
  }, []);

  return (
    <VerticalTimelineElement
      className="achievement-card"
      contentStyle={{
        background: "rgba(20,20,40,0.7)",
        backdropFilter: "blur(1px)",
        borderRadius: "1.5rem",
        padding: "2rem",
        border: "2px solid rgba(255,255,255,0.3)",
      }}
      contentArrowStyle={{
        borderRight: "8px solid rgba(20,20,40,0.1)",
      }}
      icon={<AnimatedModel />}
    >
      <motion.div
        onClick={toggleCard}
        role="button"
        aria-expanded={isExpanded}
        className="cursor-pointer"
      >
        <h3 className="achievement-heading text-3xl sm:text-4xl font-heading font-bold text-transparent bg-gradient-to-r from-lemon_chiffon to-pink_lavender bg-clip-text tracking-tight transition-transform transform hover:scale-105 hover:text-white">
          {achievement.title}
        </h3>
        <p className="mt-4 text-base sm:text-lg leading-relaxed tracking-wide text-champagne_pink opacity-90 font-serif transition-colors duration-300 hover:text-white">
          {achievement.description}
        </p>
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
        animate={
          isExpanded ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="overflow-hidden mt-4"
      >
        <ul className="space-y-3">
          {achievement.points.map((point, index) => (
            <motion.li
              key={index}
              className="flex items-start space-x-3 text-base sm:text-lg text-champagne_pink opacity-90 font-serif"
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

  // Track mouse position (for the Stars component, if needed)
  const handleMouseMove = (event) =>
    setCursorPosition({ x: event.clientX, y: event.clientY });

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".achievement-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".achievement-card",
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      id="achievements"
      className="p-8 mt-16 space-y-12 shadow-2xl md:p-12 lg:p-16 bg-gradient-to-b from-deep_indigo via-mauve to-pink_lavender bg-opacity-90 backdrop-blur-lg rounded-t-3xl"
    >
      <motion.div className="mb-16 text-center relative overflow-hidden">
        <motion.h2
          className="mt-5 text-5xl sm:text-6xl md:text-7xl font-heading font-extrabold text-transparent relative z-20 before:content-[attr(data-content)] before:absolute before:inset-0 before:text-transparent before:text-stroke transition-all duration-1000 ease-out transform hover:scale-105 hover:text-white"
          data-content="Accomplishments"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Accomplishments
        </motion.h2>
        <motion.p
          className="mt-8 sm:mt-10 text-base sm:text-lg md:text-xl font-serif text-champagne_pink opacity-90 tracking-wide leading-relaxed max-w-3xl mx-auto transition-all duration-500 ease-in-out transform hover:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          From my first day of school to now, I've committed to understanding the world and making an impact through innovative projects and academic pursuits. My journey merges a passion for technology, science, and creativity into meaningful solutions.
        </motion.p>
        <motion.p
          className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl font-serif text-champagne_pink opacity-85 tracking-wide leading-relaxed max-w-3xl mx-auto transition-all duration-500 ease-in-out transform hover:text-white"
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
          <AchievementCard key={index} achievement={achievement} />
        ))}
      </VerticalTimeline>
    </section>
  );
};

export default Achievements;