import React, { useState, useEffect, useRef, useCallback, memo, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FaCheck, FaChevronDown } from "react-icons/fa";
const Ball = lazy(() => import("../assets/3d_model/Ball"));
const Crystal = lazy(() => import("../assets/3d_model/Crystal.jsx"));
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
      "Class Prefect - Nominated as the Class Prefect to represent the class for cosistenty 5 years (2017-2021) ",
      "Under my leadership, the house won the Overall Championship in the 2023 Annual Athletics based on discipline, academics, and teamwork",
      "Best Cadet Award (2017) – Recognized for outstanding discipline, academics, and co-curricular excellence"
    ]
  },
  {
    title: "STEM Competitions & Olympiads",
    description: "Excelled in national Olympiads and science fairs, pushing my intellectual boundaries.",
    points: [
      "International Youth Math Challenge (IYMC) – Qualification Round Winner (2024)",
      "Bangladesh Math Olympiad – Regional Winner, National Round Participant (2020)",
      "Bangladesh Physics Olympiad (BdPhO) – 1st place in the regional round (Jessore), National Round Participant (2023)",
      "Interhouse Astro Olympiad – 3rd place (2022)",
      "Developed Gusto, a specialized virtual assistant designed for various activities at Bir Protik Dr. Captain Sitara Begum House (CSBH), featuring advanced face recognition and data analysis capabilities. Recognized as the Best Project at the Interhouse Science Fair Competition, MCSK (2022).",
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
    title: "Non-Profit & Community Engagement",
    description: "Engaged in a diverse range of non-profit and community initiatives, including founding and holding leadership roles at EmpowerEd, a non-profit dedicated to enhancing educational opportunities, as well as providing design and digital expertise to support local businesses and creative platforms.",
    points: [
      "Founded EmpowerEd, a non-profit focused on educational opportunities.",
      "Served as Vice President, shaping strategy and leadership at EmpowerEd.",
      "STEM Innovation Advisor at EmpowerEd.",
      "Led fundraising to support EmpowerEd’s mission-driven initiatives.",
      "Feather Clothing Brand: Assisted in transitioning a physical clothing brand to online during lockdown by creating logos and digital marketing content.",
      "Eyes on Talent: Served as Vice Graphic Designer for an online talent platform, designing posters and cover photos to inspire creativity during the pandemic."
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
  componentDidCatch(error) { console.error("WebGL error:", error); }
  render() {
    return this.state.hasError ? (
      <div className="w-[200px] h-[200px] flex items-center justify-center bg-black text-white">WebGL Unavailable</div>
    ) : this.props.children;
  }
}

const LoadingFallback = () => (
  <mesh>
    <boxGeometry args={[0.5, 0.5, 0.5]} />
    <meshStandardMaterial color="#444" />
  </mesh>
);

const AnimatedModel = memo(() => {
  const isLowQuality = typeof window !== "undefined" && (
    window.innerWidth < 768 || 
    (navigator.deviceMemory && navigator.deviceMemory < 4) || 
    (navigator.connection && (navigator.connection.downlink < 2.5 || navigator.connection.effectiveType?.includes("2g")))
  );

  return (
    <WebGLErrorBoundary>
      <Canvas
        className="absolute top-[-145px] left-[-150px] z-10"
        style={{ width: isLowQuality ? 350 : 400, height: isLowQuality ? 350 : 400 }}
        gl={{ antialias: !isLowQuality, powerPreference: isLowQuality ? "low-power" : "high-performance" }}
        dpr={isLowQuality ? 1 : 1.5}
      >
        <ambientLight intensity={2} color="#a3c4f3" />
        <spotLight position={[10, 15, 5]} angle={0.7} penumbra={0.9} intensity={20} color="#f1c0e8" />
        <Suspense fallback={<LoadingFallback />}>
          <Crystal />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
          enableDamping={false}
        />
      </Canvas>
    </WebGLErrorBoundary>
  );
}, () => true); 

const listVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 }
};

const AchievementCard = memo(({ achievement, isMobile }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);
  const headingRef = useRef(null);

  const toggleCard = useCallback(() => setIsExpanded(p => !p), []);

  useEffect(() => {
    if (!headingRef.current || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
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
        background: "rgba(20,20,40,0.5)",
        backdropFilter: "blur(1px)",
        borderRadius: "1rem",
        padding: isMobile ? "0.8rem" : "1.5rem",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
      }}
      contentArrowStyle={{ borderRight: "6px solid rgba(241, 192, 232, 0.5)" }}
      icon={<AnimatedModel />}
    >
      <motion.div
        className="cursor-pointer will-change-transform"
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
        onClick={toggleCard}
        role="button"
        aria-expanded={isExpanded}
      >
        <h3 ref={headingRef} className={`
          font-heading font-bold bg-gradient-to-r from-champagne_pink to-electric_blue bg-clip-text
          ${isMobile ? "text-xl tracking-tight" : "text-2xl sm:text-3xl tracking-tight"}
          text-transparent
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
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          className="mt-2 inline-block"
        >
          <FaChevronDown className="text-xl text-pink_lavender" />
        </motion.div>
      </motion.div>
      <motion.div
        layout
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="overflow-hidden mt-3"
      >
        <motion.ul
          variants={listVariants}
          initial="hidden"
          animate={isExpanded ? "visible" : "hidden"}
          className="space-y-2"
        >
          {achievement.points.map((point, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              className={`flex items-start space-x-2 font-serif text-champagne_pink ${isMobile ? "text-xs" : "text-sm sm:text-base"}`}
            >
              <div className="flex items-center justify-center w-5 h-5 text-white rounded-full bg-gradient-to-r from-tea_rose to-pink_lavender shadow-sm">
                <FaCheck className="text-sm" />
              </div>
              <span className="tracking-wide">{point}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </VerticalTimelineElement>
  );
}, (prev, next) => prev.achievement === next.achievement && prev.isMobile === next.isMobile);

const Achievements = () => {
  const [cursorPosition, setCursorPosition] = useState(null);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 600);
  const [deviceQuality, setDeviceQuality] = useState("high");
  const resizeTimeout = useRef();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkPerformance = () => {
      clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(() => {
        const mobile = window.innerWidth < 600;
        let quality = "high";
        if (mobile || (navigator.deviceMemory && navigator.deviceMemory < 4) || 
            (navigator.connection && (navigator.connection.downlink < 2.5 || navigator.connection.effectiveType?.includes("2g")))) {
          quality = "low";
        }
        setIsMobile(mobile);
        setDeviceQuality(quality);
      }, 100);
    };

    checkPerformance();
    window.addEventListener("resize", checkPerformance);
    return () => window.removeEventListener("resize", checkPerformance);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (e) => {
      requestAnimationFrame(() => setCursorPosition({ x: e.clientX, y: e.clientY }));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const cards = gsap.utils.toArray(".achievement-card");
    cards.forEach(card => {
      gsap.fromTo(card, 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section
      id="achievements"
      className={`
        bg-gradient-to-b from-deep_indigo via-electric_blue to-pink_lavender
       `}
    >
      <motion.div
        className="text-center relative overflow-visible"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className={`
            font-heading font-extrabold bg-gradient-to-r from-jordy_blue to-tea_rose bg-clip-text text-transparent
            ${isMobile ? "text-3xl mt-4" : "text-5xl sm:text-6xl mt-6"}
          `}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          Accomplishments
        </motion.h2>
        <motion.div
          className="mt-6 h-1 bg-gradient-to-r from-tea_rose to-jordy_blue rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ width: "5rem", margin: "0 auto" }}
        />
        <motion.p
          className={`
            font-serif text-champagne_pink tracking-wide max-w-2xl mx-auto mb-10
            ${isMobile ? "text-xs mt-3" : "text-base sm:text-lg mt-6"}
          `}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          My curiosity has driven my journey from school to now, fueling my exploration of purpose and interests while sparking continuous personal growth. Each step shapes my path forward.
        </motion.p>
      </motion.div>

      <Star cursorPosition={cursorPosition} />
      <div className="mt-40">
      <VerticalTimeline lineColor="rgba(241, 192, 232, 0.0)" className="mt-10">
        {achievements.map((achievement, index) => (
          <AchievementCard
            key={index}
            achievement={achievement}
            isMobile={isMobile}
          />
        ))}
      </VerticalTimeline>
      </div>
    </section>
  );
};

export default memo(Achievements);
