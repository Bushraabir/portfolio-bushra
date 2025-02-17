import React, { useState, useEffect, Suspense, memo, useRef, useCallback, lazy } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FaCheck, FaChevronDown } from "react-icons/fa";
const Ball = lazy(() => import("../assets/3d_model/Ball"));
import Star from "../components/Stars";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
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
      "GPA 5.00 in Primary Education Completion Examination (PECE) (2015)"
    ]
  },
  {
    title: "Leadership & Team Management",
    description: "Led teams with discipline, integrity, and vision, promoting excellence in academics and extracurriculars.",
    points: [
      "Junior Prefect – Appointed as the Junior Prefect of Bir Protik Dr. Captain Sitara Begum House (2021)",
      "House Prefect – Led 92 cadets as the House Prefect of Bir Protik Dr. Captain Sitara Begum House (2022-2023)",
      "Under my leadership, the house won the Overall Championship in the 2023 Annual Athletics based on discipline, academics, and teamwork",
      "Best Cadet Award (2017) – Recognized for outstanding discipline, academics, and co-curricular excellence"
    ]
  },
  {
    title: "STEM Competitions & Olympiads",
    description: "Excelled in national Olympiads and science fairs, pushing my intellectual boundaries.",
    points: [
      "Bangladesh Math Olympiad – Regional Winner, National Round Participant (2020)",
      "Bangladesh Physics Olympiad (BdPhO) – 1st place in the regional round (Jessore), National Round Participant (2023)",
      "Interhouse Astro Olympiad – 3rd place (2022)",
      "Interhouse Astrophysics Olympiad – 1st place in the junior group (2019)",
      "Biggan Uthsob (National) – Regional Winner, National Round Participant with a project on Biodegradable Polythene (2019)"
    ]
  },
  {
    title: "Writing & Communication Excellence",
    description: "Earned multiple awards in essay competitions, showcasing strong analytical and expressive skills.",
    points: [
      "1st place – MCSK Essay Writing Competition (2017)",
      "2nd place – Interhouse Essay Writing Competition (2020)",
      "1st place – International Mother Language Day Essay Competition (2019)",
      "1st place – Essay Writing Competition on Independence Day of Bangladesh (2022)",
      "Best Writing Award – InterHouse Wall Magazine Competition (2017)"
    ]
  },
  {
    title: "Creative & Artistic Achievements",
    description: "My artistic skills, in both traditional and digital media, have been recognized in national and institutional competitions.",
    points: [
      "3rd place – Bangla Vision Painting Competition (2013)",
      "1st place – Bissho Shishu o Jubo Theater Dibosh Painting Competition (2019, 2022)",
      "1st place – National Mourning Day Painting Competition (2019)",
      "3rd place – 7th March Historical Speech Painting Competition (2022)",
      "Best Artist – Interhouse Painting Competition (2018)"
    ]
  },
  {
    title: "Innovation & Scientific Research",
    description: "Led projects combining science and technology to provide real-world solutions.",
    points: [
      "Team Leader – InterHouse Science Fair (Senior Group), Developed 'Gusto,' a virtual assistant with Face Recognition, awarded Best Project (2022)",
      "Team Leader - Easy Water Purification and Supply, awarded Best Project (2019)",
      "Biggan Uthsob (National) – Biodegradable Polythene - Regional Winner, National Round Participant (2019)"
    ]
  },
  {
    title: "Public Speaking & Debate",
    description: "Improved communication skills through speaking competitions.",
    points: [
      "Soujonno Pouroshkar – 7th March Extempore Speech Competition (2022)",
      "Runners-up – Debate Competition (2016)"
    ]
  },
  {
    title: "NPO Volunteering",
    description: "Volunteered with EmpowerEd, supporting its mission to provide education and opportunities.",
    points: [
      "Founded EmpowerEd, a non-profit organization.",
      "Vice President of EmpowerEd.",
      "STEM Innovation Advisor at EmpowerEd.",
      "Fundraising Coordinator at EmpowerEd."
    ]
  },
  {
    title: "Mentorship & Teaching Experience",
    description: "Mentored students, helped them academically.",
    points: [
      "Provided tuition to 3 students for 2 months, improving their Physics and Mathematics.",
      "Created interactive PDFs and notes.",
      "Implemented adaptive teaching techniques to enhance student learning"
    ]
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
      "Graphic Design and Digital Art : Adobe Illustrator, Photoshop, Krita "
    ]
  }
];

class WebGLErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError = () => ({ hasError: true });
  componentDidCatch(error) {
    console.error("WebGL error:", error);
  }
  render() {
    return this.state.hasError ? (
      <div className="w-[350px] h-[350px] flex items-center justify-center bg-black text-white">
        WebGL Unavailable
      </div>
    ) : this.props.children;
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
      className="absolute top-[-149px] left-[-145px] z-10" 
      style={{ width: 350, height: 350 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={3} color="#a3c4f3" />
      <spotLight position={[15, 25, 10]} angle={0.7} penumbra={0.9} intensity={40} color="#f1c0e8" />
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
        enableDamping={false}
      />
    </Canvas>
  </WebGLErrorBoundary>
));

const AchievementCard = memo(({ achievement, isMobile }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const headingRef = useRef(null);
  const cardRef = useRef(null);

  const toggleCard = useCallback(() => setIsExpanded(p => !p), []);

  useEffect(() => {
    if (!headingRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <VerticalTimelineElement
      ref={cardRef}
      className="achievement-card"
      contentStyle={{
        background: "rgba(20,20,40,0.7)",
        backdropFilter: "blur(1px)",
        borderRadius: "1.5rem",
        padding: isMobile ? "1rem" : "2rem",
        border: "2px solid rgba(255,255,255,0.3)"
      }}
      contentArrowStyle={{ borderRight: "8px solid rgba(20,20,40,0.1)" }}
      icon={<AnimatedModel />}
    >
      <motion.div 
        onClick={toggleCard} 
        role="button" 
        aria-expanded={isExpanded}
        className="cursor-pointer"
        initial={false}
        animate={{ transition: { duration: 0.3 } }}
      >
        <h3 ref={headingRef} className={`
          font-heading font-bold bg-gradient-to-r from-lemon_chiffon to-pink_lavender bg-clip-text
          ${isMobile ? 
            "text-2xl tracking-tight" : 
            "text-3xl sm:text-4xl tracking-tight"}
          text-transparent transition-transform hover:scale-105 hover:text-white
        `}>
          {achievement.title}
        </h3>
        
        <p className={`
          mt-4 font-serif tracking-wide text-champagne_pink opacity-90 transition-colors
          ${isMobile ? "text-sm" : "text-base sm:text-lg"}
          hover:text-white
        `}>
          {achievement.description}
        </p>

        <motion.div 
          animate={{ rotate: isExpanded ? 0 : 180 }} 
          className="mt-3 inline-block"
        >
          <FaChevronDown className="text-2xl text-pink_lavender hover:text-white" />
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isExpanded ? "auto" : 0, 
          opacity: isExpanded ? 1 : 0 
        }}
        className="overflow-hidden mt-4"
      >
        <ul className="space-y-3">
          {achievement.points.map((point, index) => (
            <motion.li 
              key={index}
              className={`flex items-start space-x-3 font-serif text-champagne_pink opacity-90 ${
                isMobile ? "text-sm" : "text-base sm:text-lg"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center justify-center w-6 h-6 text-white rounded-full bg-gradient-to-r from-tea_rose to-pink_lavender shadow-md">
                <FaCheck className="text-lg" />
              </div>
              <span className="tracking-wide">{point}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </VerticalTimelineElement>
  );
}, (prev, next) => 
  prev.achievement === next.achievement && 
  prev.isMobile === next.isMobile
);

const Achievements = () => {
  const [cursorPosition, setCursorPosition] = useState(null);
  const isMobile = useRef(typeof window !== "undefined" ? window.innerWidth < 600 : false);
  const resizeTimeout = useRef();

  useEffect(() => {
    const handleResize = () => {
      clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(() => {
        isMobile.current = window.innerWidth < 600;
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      requestAnimationFrame(() => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    gsap.utils.toArray(".achievement-card").forEach(card => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 90%",
        onEnter: () => gsap.to(card, { opacity: 1, y: 0, duration: 0.8 }),
        onLeaveBack: () => gsap.to(card, { opacity: 0, y: 50, duration: 0.3 })
      });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section 
      id="achievements"
      className={`
        bg-gradient-to-b from-deep_indigo via-mauve to-pink_lavender backdrop-blur-lg
        ${isMobile.current ? "p-4 mt-8" : "p-8 mt-16 md:p-12 lg:p-16"}
      `}
    >
      <motion.div 
        className="mb-16 text-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.h2
          className={`
            font-heading font-extrabold text-transparent relative z-20 
            before:content-[attr(data-content)] before:absolute before:inset-0 
            before:text-transparent before:[-webkit-text-stroke:1px_white]
            ${isMobile.current ? "text-4xl mt-5" : "text-5xl sm:text-6xl md:text-7xl lg:text-8xl mt-5"}
          `}
          data-content="Accomplishments"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 0.9 }}
          transition={{ duration: 0.8 }}
        >
          Accomplishments
        </motion.h2>

        <motion.p
          className={`
            font-serif text-champagne_pink tracking-wide max-w-3xl mx-auto
            ${isMobile.current ? "text-sm mt-4" : "text-base sm:text-lg md:text-xl mt-8"}
          `}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
           From the first day of school until now, everything I've done has been driven by my curiosity. This curiosity has not only allowed me to explore my purpose and interests but has also been the catalyst for my continuous personal development. Each step has been a part of a greater journey toward growth.
        </motion.p>
      </motion.div>

      <Star cursorPosition={cursorPosition} />
      
      <VerticalTimeline lineColor="rgba(255,255,255,0.2)">
        {achievements.map((achievement, index) => (
          <AchievementCard 
            key={index} 
            achievement={achievement} 
            isMobile={isMobile.current} 
          />
        ))}
      </VerticalTimeline>
    </section>
  );
};

export default React.memo(Achievements);