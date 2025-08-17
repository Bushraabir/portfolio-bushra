import React, { useState, useEffect, useRef, useCallback, memo, lazy, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FaCheck, FaChevronDown, FaTrophy, FaAward, FaStar } from "react-icons/fa";
import Background from "../components/Background.jsx";

// Lazy loaded 3D components

const Crystal = lazy(() => import("../assets/3d_model/Crystal.jsx"));
const Star = lazy(() => import("../components/Stars"));
// Instead of importing entire GSAP
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const achievements = [
  {
    title: "Academic Excellence & Scholarships",
    description: "Consistently achieved top ranks, scholarships, and accolades throughout my education.",
    icon: FaTrophy,
    color: "from-yellow-400 to-orange-500",
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
    icon: FaAward,
    color: "from-blue-400 to-indigo-600",
    points: [
      "Junior Prefect — Appointed as the Junior Prefect of Bir Protik Dr. Captain Sitara Begum House (2021)",
      "House Prefect — Led 92 cadets as the House Prefect of Bir Protik Dr. Captain Sitara Begum House (2022-2023)",
      "Class Prefect - Nominated as the Class Prefect to represent the class for consistently 5 years (2017-2021)",
      "Under my leadership, the house won the Overall Championship in the 2023 Annual Athletics based on discipline, academics, and teamwork",
      "Best Cadet Award (2017) — Recognized for outstanding discipline, academics, and co-curricular excellence"
    ]
  },
  {
    title: "STEM Competitions & Olympiads",
    description: "Excelled in national Olympiads and science fairs, pushing my intellectual boundaries.",
    icon: FaStar,
    color: "from-purple-400 to-pink-500",
    points: [
      "International Youth Math Challenge (IYMC) — Qualification Round Winner (2024)",
      "Bangladesh Math Olympiad — Regional Winner, National Round Participant (2020)",
      "Bangladesh Physics Olympiad (BdPhO) — 1st place in the regional round (Jessore), National Round Participant (2023)",
      "Interhouse Astro Olympiad — 3rd place (2022)",
      "Developed Gusto, a specialized virtual assistant designed for various activities at Bir Protik Dr. Captain Sitara Begum House (CSBH), featuring advanced face recognition and data analysis capabilities. Recognized as the Best Project at the Interhouse Science Fair Competition, MCSK (2022).",
      "Interhouse Astrophysics Olympiad — 1st place in the junior group (2019)",
      "Biggan Uthsob (National) — Regional Winner, National Round Participant with a project on Biodegradable Polythene (2019)"
    ]
  },
  {
    title: "Writing & Communication Excellence",
    description: "Earned multiple awards in essay competitions, showcasing strong analytical and expressive skills.",
    icon: FaAward,
    color: "from-green-400 to-teal-500",
    points: [
      "1st place — MCSK Essay Writing Competition (2017)",
      "2nd place — Interhouse Essay Writing Competition (2020)",
      "1st place — International Mother Language Day Essay Competition (2019)",
      "1st place — Essay Writing Competition on Independence Day of Bangladesh (2022)",
      "Best Writing Award — InterHouse Wall Magazine Competition (2017)"
    ]
  },
  {
    title: "Creative & Artistic Achievements",
    description: "My artistic skills, in both traditional and digital media, have been recognized in national and institutional competitions.",
    icon: FaStar,
    color: "from-pink-400 to-rose-500",
    points: [
      "3rd place — Bangla Vision Painting Competition (2013)",
      "1st place — Bissho Shishu o Jubo Theater Dibosh Painting Competition (2019, 2022)",
      "1st place — National Mourning Day Painting Competition (2019)",
      "3rd place — 7th March Historical Speech Painting Competition (2022)",
      "Best Artist — Interhouse Painting Competition (2018)"
    ]
  },
  {
    title: "Innovation & Scientific Research",
    description: "Led projects combining science and technology to provide real-world solutions.",
    icon: FaTrophy,
    color: "from-cyan-400 to-blue-500",
    points: [
      "Team Leader — InterHouse Science Fair (Senior Group), Developed 'Gusto,' a virtual assistant with Face Recognition, awarded Best Project (2022)",
      "Team Leader - Easy Water Purification and Supply, awarded Best Project (2019)",
      "Biggan Uthsob (National) — Biodegradable Polythene - Regional Winner, National Round Participant (2019)"
    ]
  },
  {
    title: "Public Speaking & Debate",
    description: "Improved communication skills through speaking competitions.",
    icon: FaAward,
    color: "from-indigo-400 to-purple-500",
    points: [
      "Soujonno Pouroshkar — 7th March Extempore Speech Competition (2022)",
      "Runners-up — Debate Competition (2016)"
    ]
  },
  {
    title: "Non-Profit & Community Engagement",
    description: "Engaged in a diverse range of non-profit and community initiatives, including founding and holding leadership roles at EmpowerEd, a non-profit dedicated to enhancing educational opportunities, as well as providing design and digital expertise to support local businesses and creative platforms.",
    icon: FaStar,
    color: "from-emerald-400 to-teal-600",
    points: [
      "Founded EmpowerEd, a non-profit focused on educational opportunities.",
      "Served as Vice President, shaping strategy and leadership at EmpowerEd.",
      "STEM Innovation Advisor at EmpowerEd.",
      "Led fundraising to support EmpowerEd's mission-driven initiatives.",
      "Feather Clothing Brand: Assisted in transitioning a physical clothing brand to online during lockdown by creating logos and digital marketing content.",
      "Eyes on Talent: Served as Vice Graphic Designer for an online talent platform, designing posters and cover photos to inspire creativity during the pandemic."
    ]
  },
  {
    title: "Mentorship & Teaching Experience",
    description: "Mentored students, helped them academically.",
    icon: FaAward,
    color: "from-amber-400 to-orange-500",
    points: [
      "Provided tuition to 3 students for 2 months, improving their Physics and Mathematics.",
      "Created interactive PDFs and notes.",
      "Implemented adaptive teaching techniques to enhance student learning"
    ]
  },
  {
    title: "Technical Expertise & Digital Skills",
    description: "Strong technical foundation in programming, design, and 3D visualization to create solutions.",
    icon: FaTrophy,
    color: "from-violet-400 to-purple-600",
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

// Error Boundary for 3D models
class WebGLErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError = () => ({ hasError: true });
  componentDidCatch(error) {
    console.error("WebGL error:", error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 rounded-full text-white shadow-lg">
          <FaTrophy className="text-2xl" />
        </div>
      );
    }
    return this.props.children;
  }
}
// Optimized 3D Model Component
const AnimatedModel = memo(({ achievement }) => {
  const [isLowQuality, setIsLowQuality] = useState(false);

  useEffect(() => {
    const checkQuality = () => {
      setIsLowQuality(
        window.innerWidth < 768 ||
        (navigator.deviceMemory && navigator.deviceMemory < 4) ||
        (navigator.connection && (
          navigator.connection.downlink < 2.5 ||
          navigator.connection.effectiveType?.includes("2g")
        ))
      );
    };
    checkQuality();
  }, []);
  if (isLowQuality) {
    const IconComponent = achievement.icon;
    return (
      <div className={`w-16 h-16 flex items-center justify-center bg-gradient-to-br ${achievement.color} rounded-full text-white shadow-lg transform hover:scale-105 transition-transform duration-300`}>
        <IconComponent className="text-2xl" />
      </div>
    );
  }
  return (
    <WebGLErrorBoundary>
      <div className="relative w-24 h-24">
        <Canvas
          className="absolute top-[-145px] left-[-150px] z-10"
          style={{ width: isLowQuality ? 350 : 400, height: isLowQuality ? 350 : 400 }}
          gl={{
            antialias: false,
            powerPreference: "low-power",
            alpha: true
          }}
          dpr={1}
          camera={{ position: [0, 0, 5], fov: 45 }}
        >
          <ambientLight intensity={1.5} color="#a3c4f3" />
          <spotLight
            position={[5, 10, 5]}
            angle={0.5}
            penumbra={0.8}
            intensity={15}
            color="#f1c0e8"
          />
          <Suspense fallback={null}>
            <Crystal />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1}
            enableDamping
            dampingFactor={0.1}
          />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}, (prevProps, nextProps) => prevProps.achievement.title === nextProps.achievement.title);
//  List Animations
const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};
const itemVariants = {
  hidden: { opacity: 0, x: -20, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};
//  Achievement Card
const AchievementCard = memo(({ achievement, isMobile, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, margin: "-100px" });
  const toggleCard = useCallback(() => setIsExpanded(prev => !prev), []);
  // GSAP animations for card entrance
  useEffect(() => {
    if (!cardRef.current || !isInView) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: index * 0.1
        }
      );
    }, cardRef);
    return () => ctx.revert();
  }, [isInView, index]);
  return (
    <VerticalTimelineElement
      ref={cardRef}
      className="achievement-card group"
      contentStyle={{
        background: "rgba(15,23,42,0.6)",
        backdropFilter: "blur(1px)",
        borderRadius: "1.5rem",
        padding: isMobile ? "1.5rem" : "2rem",
        border: "1px solid rgba(148, 163, 184, 0.1)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        position: "relative",
        overflow: "hidden"
      }}
      contentArrowStyle={{
        borderRight: `7px solid rgba(${achievement.color.includes('yellow') ? '251, 191, 36' : '148, 163, 184'}, 0.3)`
      }}
      iconStyle={{
        background: 'transparent',
        border: 'none',
        boxShadow: 'none'
      }}
      icon={<AnimatedModel achievement={achievement} />}
    >
     
      <motion.div
        className="cursor-pointer relative z-10"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        onClick={toggleCard}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && toggleCard()}
        aria-expanded={isExpanded}
      >
        <div className="flex items-start justify-between mb-4">
          <h3 className={`
            font-heading font-bold bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent
            ${isMobile ? "text-xl" : "text-2xl lg:text-3xl"}
            tracking-tight leading-tight flex-1 pr-4
          `}>
            {achievement.title}
          </h3>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex-shrink-0"
          >
            <FaChevronDown className={`${isMobile ? "text-lg" : "text-xl"} text-pink_lavender/70 group-hover:text-pink_lavender transition-colors duration-200`} />
          </motion.div>
        </div>
       
        <p className={`
          font-description tracking-wide text-champagne_pink/80 leading-relaxed
          ${isMobile ? "text-sm" : "text-base lg:text-lg"}
          group-hover:text-champagne_pink transition-colors duration-300
        `}>
          {achievement.description}
        </p>
      </motion.div>
     
      <motion.div
elder
        layout
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
          marginTop: isExpanded ? 20 : 0
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
          opacity: { duration: 0.3 }
        }}
        className="overflow-hidden relative z-10"
      >
        <motion.ul
          variants={listVariants}
          initial="hidden"
          animate={isExpanded ? "visible" : "hidden"}
          className="space-y-3"
        >
          {achievement.points.map((point, pointIndex) => (
            <motion.li
              key={pointIndex}
              variants={itemVariants}
              className={`flex items-start space-x-3 font-description text-champagne_pink/90 ${isMobile ? "text-xs" : "text-sm lg:text-base"} leading-relaxed`}
            >
              <div className={`flex items-center justify-center w-5 h-5 mt-0.5 text-white rounded-full bg-gradient-to-r ${achievement.color} shadow-md flex-shrink-0`}>
                <FaCheck className="text-xs" />
              </div>
              <span className="tracking-wide">{point}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </VerticalTimelineElement>
  );
}, (prevProps, nextProps) =>
  prevProps.achievement.title === nextProps.achievement.title &&
  prevProps.isMobile === nextProps.isMobile &&
  prevProps.index === nextProps.index
);
// Optimized Stars Component with performance controls
const OptimizedStars = memo(({ cursorPosition }) => {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Disable stars on low-end devices
    const isLowEnd = window.innerWidth < 768 ||
      (navigator.deviceMemory && navigator.deviceMemory < 4);
    setShouldRender(!isLowEnd);
  }, []);

  if (!shouldRender) return null;

  return (
    <Suspense fallback={null}>
      <Star cursorPosition={cursorPosition} />
    </Suspense>
  );
});
const Achievements = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const timelineRef = useRef(null);
  const resizeTimeout = useRef();
  // Optimized resize handler
  useEffect(() => {
    const handleResize = () => {
      clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 150);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout.current);
    };
  }, []);
  // Optimized mouse tracking with throttling
  useEffect(() => {
    let rafId;
    const handleMouseMove = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
        rafId = null;
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);
  // Enhanced scroll animations
  useEffect(() => {
    if (!isLoaded) return;
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(titleRef.current.children,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
      // Timeline reveal animation
      if (timelineRef.current) {
        gsap.fromTo(timelineRef.current,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [isLoaded]);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  if (!isLoaded) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-deep_indigo via-purple-900 to-pink_lavender">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="animate-spin w-12 h-12 border-4 border-jordy_blue border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-champagne_pink text-lg font-description">Loading achievements...</p>
        </motion.div>
      </section>
    );
  }
  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="relative min-h-screen bg-gradient-to-b from-deep_indigo via-purple-900 to-pink_lavender overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(236,72,153,0.1),transparent_50%)]" />
      <Background />
      <OptimizedStars cursorPosition={cursorPosition} />
     
      <motion.div
        className="relative z-10 container mx-auto px-4 py-16 lg:py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16 lg:mb-20">
          <motion.h2
            className={`
              font-heading font-extrabold bg-gradient-to-r from-jordy_blue via-aquamarine to-tea_rose bg-clip-text text-transparent
              ${isMobile ? "text-4xl mb-6" : "text-5xl lg:text-6xl mb-8"}
              tracking-tight leading-tight
            `}
            style={{ backgroundSize: "200% 200%" }}
          >
            Accomplishments
          </motion.h2>
         
          <motion.div
            className="w-24 h-1.5 bg-gradient-to-r from-tea_rose via-jordy_blue to-aquamarine rounded-full mx-auto mb-6 lg:mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
         
          <motion.p
            className={`
              font-description text-champagne_pink/90 tracking-wide leading-relaxed max-w-3xl mx-auto
              ${isMobile ? "text-sm px-4" : "text-base lg:text-lg px-6"}
            `}
          >
            My curiosity has driven my journey from school to now, fueling my exploration of purpose and interests while sparking continuous personal growth. Each step shapes my path forward.
          </motion.p>
        </div>
        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          <VerticalTimeline
            lineColor="rgba(163, 196, 243, 0.2)"
            className="before:bg-gradient-to-b before:from-jordy_blue/30 before:to-pink_lavender/30"
          >
            {achievements.map((achievement, index) => (
              <AchievementCard
                key={`${achievement.title}-${index}`}
                achievement={achievement}
                isMobile={isMobile}
                index={index}
              />
            ))}
          </VerticalTimeline>
        </div>
       
        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-pink_lavender to-transparent pointer-events-none" />
      </motion.div>
    </section>
  );
};
export default memo(Achievements);