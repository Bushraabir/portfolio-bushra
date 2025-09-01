import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, useInView } from "framer-motion";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaCheck, FaChevronDown, FaTrophy, FaAward, FaStar } from "react-icons/fa";

const achievements = [
  {
    title: "Academic Excellence & Scholarships",
    description: "Consistently achieved top ranks, scholarships, and accolades throughout my education.",
    icon: FaTrophy,
    color: "from-aquamarine to-jordy_blue", // Cosmic colors
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
    color: "from-pink_lavender to-aquamarine", // Cosmic colors
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
    color: "from-jordy_blue to-electric_blue", // Cosmic colors
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
    color: "from-pink_lavender to-mauve", // Cosmic colors
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
    color: "from-aquamarine to-pink_lavender", // Cosmic colors
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
    color: "from-pink_lavender to-electric_blue", // Cosmic colors
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
    color: "from-lemon_chiffon to-tea_rose", // Cosmic colors
    points: [
      "Soujonno Pouroshkar — 7th March Extempore Speech Competition (2022)",
      "Runners-up — Debate Competition (2016)"
    ]
  },
  {
    title: "Non-Profit & Community Engagement",
    description: "Engaged in a diverse range of non-profit and community initiatives, including founding and holding leadership roles at EmpowerEd, a non-profit dedicated to enhancing educational opportunities, as well as providing design and digital expertise to support local businesses and creative platforms.",
    icon: FaStar,
    color: "from-jordy_blue to-lemon_chiffon", // Cosmic colors
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
    color: "from-aquamarine to-tea_rose", // Cosmic colors
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
    color: "from-tea_rose to-lemon_chiffon", // Cosmic colors
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

/**
 * Animated Icon Component - replaces 3D model
 */
const AnimatedIcon = memo(({ achievement }) => {
  const IconComponent = achievement.icon;
  
  return (
    <motion.div
      className={`w-16 h-16 flex items-center justify-center bg-gradient-to-br ${achievement.color} rounded-full text-white shadow-lg relative overflow-hidden`}
      whileHover={{ 
        scale: 1.1,
        rotate: [0, -10, 10, -10, 0],
        transition: { 
          scale: { duration: 0.2 },
          rotate: { duration: 0.6 }
        }
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 15,
        delay: 0.1
      }}
      aria-hidden
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      {/* Icon with pulse animation */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative z-10"
      >
        <IconComponent className="text-2xl" />
      </motion.div>
      
      {/* Sparkle effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
        animate={{ 
          x: [-100, 100],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </motion.div>
  );
}, (prevProps, nextProps) => prevProps.achievement.title === nextProps.achievement.title);

/**
 * List animation variants
 */
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

/**
 * AchievementCard with animated icon instead of 3D model
 */
const AchievementCard = memo(({ achievement, isMobile, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, margin: "-50px" });
  const toggleCard = useCallback(() => setIsExpanded(prev => !prev), []);
  const panelId = `achievement-panel-${index}`;

  return (
    <VerticalTimelineElement
      ref={cardRef}
      className="achievement-card group"
      contentStyle={{
        background: "rgba(15,23,42,0.4)",
        backdropFilter: "blur(12px)",
        borderRadius: "1.5rem",
        padding: isMobile ? "1.5rem" : "2rem",
        border: "1px solid rgba(148, 163, 184, 0.4)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        position: "relative",
        zIndex: 1,
      }}
      contentArrowStyle={{
        borderRight: `7px solid rgba(${achievement.color.includes('yellow') ? '251, 191, 36' : '148, 163, 184'}, 0.3)`
      }}
      iconStyle={{
        background: 'transparent',
        border: 'none',
        boxShadow: 'none'
      }}
      icon={<AnimatedIcon achievement={achievement} />}
      aria-label={`${achievement.title} card`}
    >
      {/* Toggle header */}
      <motion.div
        className="cursor-pointer relative z-10"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        onClick={toggleCard}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), toggleCard())}
        aria-expanded={isExpanded}
        aria-controls={panelId}
      >
        <div className="flex items-start justify-between mb-4">
          <h3 className={
            `font-bold bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent ${isMobile ? "text-xl" : "text-2xl lg:text-3xl"} tracking-tight leading-tight flex-1 pr-4`
          }>
            {achievement.title}
          </h3>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex-shrink-0"
            aria-hidden
          >
            <FaChevronDown className={`${isMobile ? "text-lg" : "text-xl"} text-slate-400 group-hover:text-slate-300 transition-colors duration-200`} />
          </motion.div>
        </div>

        <p className={
          `tracking-wide text-slate-300 leading-relaxed ${isMobile ? "text-sm" : "text-base lg:text-lg"} group-hover:text-white transition-colors duration-300`
        }>
          {achievement.description}
        </p>
      </motion.div>

      {/* Expandable content */}
      <motion.div
        layout="position"
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
        className="relative z-10 overflow-hidden"
        id={panelId}
        role="region"
        aria-label={`${achievement.title} details`}
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
              className={`flex items-start space-x-3 text-slate-200 ${isMobile ? "text-xs" : "text-sm lg:text-base"} leading-relaxed`}
            >
              <div className={`flex items-center justify-center w-5 h-5 mt-0.5 text-white rounded-full bg-gradient-to-r ${achievement.color} shadow-md flex-shrink-0`} aria-hidden>
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

/**
 * Achievements Section with 3D model removed
 */
const Achievements = () => {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const resizeTimeout = useRef();

  // Ensure viewport meta tag is properly set
  useEffect(() => {
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0';
      document.head.appendChild(meta);
    } else if (viewportMeta.content.includes('user-scalable=no')) {
      viewportMeta.content = 'width=device-width, initial-scale=1.0';
    }
  }, []);

  // Ensure body overflow is not hidden
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    
    return () => {
      if (originalOverflow) {
        document.body.style.overflow = originalOverflow;
      }
    };
  }, []);

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

  // Simple title animation only (no conflicting animations)
  useEffect(() => {
    if (!titleRef.current) return;
    
    // Simple fade-in animation for title
    const titleElements = titleRef.current.children;
    Array.from(titleElements).forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(50px)';
      
      setTimeout(() => {
        element.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 200);
    });
  }, []);

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Accomplishments",
    "itemListElement": achievements.map((a, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "CreativeWork",
        "name": a.title,
        "description": a.description
      }
    }))
  };

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="relative min-h-[200vh] bg-transparent"
      role="region"
      aria-labelledby="achievements-heading"
    >
      {/* SEO & Metadata */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      {/* Skip link for accessibility */}
      <a href="#achievements-timeline" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-white focus:text-black focus:px-3 focus:py-2 focus:rounded-lg focus:z-50">
        Skip to achievements timeline
      </a>

      <motion.div
        className="relative z-10 container mx-auto px-4 py-16 lg:py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16 lg:mb-20">
          <motion.h2
            id="achievements-heading"
            className={
              `font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent ${isMobile ? "text-4xl mb-6" : "text-5xl lg:text-6xl mb-8"} tracking-tight leading-tight`
            }
            style={{ backgroundSize: "200% 200%" }}
          >
            Accomplishments
          </motion.h2>

          <motion.div
            className="w-24 h-1.5 bg-gradient-to-r from-teal-400 via-blue-400 to-cyan-400 rounded-full mx-auto mb-6 lg:mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            aria-hidden
          />

          <motion.p
            className={
              `text-slate-300 tracking-wide leading-relaxed max-w-3xl mx-auto ${isMobile ? "text-sm px-4" : "text-base lg:text-lg px-6"}`
            }
          >
            My curiosity has driven my journey from school to now, fueling my exploration of purpose and interests while sparking continuous personal growth. Each step shapes my path forward.
          </motion.p>
        </div>

        {/* Timeline wrapper with Framer Motion */}
        <motion.div
          className="relative min-h-screen"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <nav aria-label="Achievements timeline navigation">
            <VerticalTimeline
              lineColor="rgba(163, 196, 243, 0.6)"
              className="before:bg-gradient-to-b before:from-blue-400/30 before:to-purple-400/30"
              id="achievements-timeline"
              style={{ contain: 'none' }}
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
          </nav>
        </motion.div>

        
      </motion.div>
{/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none w-[100vw]" aria-hidden />
      {/* Global styles */}
      <style jsx global>{`
        /* Enable scrollbars */
        html, body {
          overflow-x: hidden;
          overflow-y: auto;
        }
        
        /* Ensure timeline line is visible */
        .vertical-timeline::before {
          background: linear-gradient(to bottom, rgba(163, 196, 243, 0.1), rgba(139, 92, 246, 0.1)) !important;
          width: 4px !important;
        }
        
        /* Fix Safari backdrop-filter issues */
        .achievement-card .vertical-timeline-element-content {
          position: relative;
          z-index: 1;
          -webkit-backdrop-filter: blur(12px);
          backdrop-filter: blur(12px);
        }
        
        /* Override react-vertical-timeline CSS contain property */
        .vertical-timeline {
          contain: none !important;
        }
        
        /* Ensure timeline elements are properly positioned */
        .vertical-timeline-element {
          position: relative;
        }
        
        /* Fix for mobile scrolling issues */
        @media (max-width: 768px) {
          body {
            -webkit-overflow-scrolling: touch;
          }
        }
        
        /* Remove any conflicting styles that might hide content */
        .vertical-timeline-element-content {
          visibility: visible !important;
          opacity: 1 !important;
        }
        
        /* Fix timeline icon positioning */
        .vertical-timeline-element-icon {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
      `}</style>
    </section>
  );
};

export default memo(Achievements);