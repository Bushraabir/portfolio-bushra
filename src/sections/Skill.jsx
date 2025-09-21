/* ------------------------------------------------------------------ */
/*  Skill.jsx  –  static background, same flip-cards, same UX          */
/* ------------------------------------------------------------------ */
import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Splitting from "splitting";
import { motion, AnimatePresence } from "framer-motion";
import { Tilt } from "react-tilt";
import {
  FaPython, FaReact, FaBlender, FaGuitar, FaSwimmer, FaCalculator,
  FaLightbulb, FaUsers, FaStar, FaChalkboardTeacher, FaProjectDiagram,
  FaPaintBrush, FaBrain, FaPen, FaChartBar,
} from "react-icons/fa";
import {
  SiCplusplus, SiAdobeillustrator, SiThreedotjs, SiHtml5, SiCss3,
  SiVite, SiGreensock, SiFramer, SiKrita, SiGnu, SiFreecad, SiOpenscad,
  SiJavascript,
} from "react-icons/si";
import { DiPhotoshop } from "react-icons/di";
import {
  GiSkateboard, GiPaintBrush as GiPaintBrushIcon, GiCrafting,
  GiAtomicSlashes, GiPencil, GiRock,
} from "react-icons/gi";

/* ----------  data  ------------------------------------------------ */
const skillsData = [
  {
    category: "STEM",
    items: [
      { name: "Physics", icon: <GiAtomicSlashes /> },
      { name: "Mathematics", icon: <FaCalculator /> },
    ],
  },
  {
    category: "Programming",
    items: [
      { name: "C", icon: <SiCplusplus /> },
      { name: "C++", icon: <SiCplusplus /> },
      { name: "Python", icon: <FaPython /> },
    ],
  },
  {
    category: "Web Development",
    items: [
      { name: "React.js", icon: <FaReact /> },
      { name: "Three.js", icon: <SiThreedotjs /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "HTML", icon: <SiHtml5 /> },
      { name: "CSS", icon: <SiCss3 /> },
      { name: "GSAP", icon: <SiGreensock /> },
      { name: "Framer Motion", icon: <SiFramer /> },
      { name: "Vite", icon: <SiVite /> },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Microsoft Excel", icon: <FaChartBar /> },
      { name: "PowerPoint", icon: <FaProjectDiagram /> },
      { name: "Microsoft Word", icon: <FaPen /> },
    ],
  },
  {
    category: "Engineering Tools",
    items: [
      { name: "GNU Octave", icon: <SiGnu /> },
      { name: "FreeCAD", icon: <SiFreecad /> },
      { name: "OpenSCAD", icon: <SiOpenscad /> },
    ],
  },
  {
    category: "3D Modeling & Design",
    items: [
      { name: "Blender", icon: <FaBlender /> },
      { name: "Illustrator", icon: <SiAdobeillustrator /> },
      { name: "Photoshop", icon: <DiPhotoshop /> },
      { name: "Krita", icon: <SiKrita /> },
    ],
  },
  {
    category: "Art & Craft",
    items: [
      { name: "Acrylic Painting", icon: <FaPaintBrush /> },
      { name: "Sketching", icon: <GiPencil /> },
      { name: "Sculpting", icon: <GiRock /> },
      { name: "Crafting", icon: <GiCrafting /> },
    ],
  },
  {
    category: "Other Interests",
    items: [
      { name: "Guitar", icon: <FaGuitar /> },
      { name: "Skating", icon: <GiSkateboard /> },
      { name: "Swimming", icon: <FaSwimmer /> },
    ],
  },
  {
    category: "Soft Skills",
    items: [
      { name: "Problem Solving", icon: <FaLightbulb /> },
      { name: "Teamwork", icon: <FaUsers /> },
      { name: "Leadership", icon: <FaStar /> },
      { name: "Team Management", icon: <FaUsers /> },
      { name: "Mentoring", icon: <FaChalkboardTeacher /> },
    ],
  },
];

const categories = ["All", ...skillsData.map((s) => s.category)];

const categoryIcons = {
  STEM: <GiAtomicSlashes />,
  Programming: <SiCplusplus />,
  "Web Development": <FaReact />,
  Tools: <SiVite />,
  "Engineering Tools": <SiFreecad />,
  "3D Modeling & Design": <SiAdobeillustrator />,
  "Art & Craft": <GiPaintBrushIcon />,
  "Other Interests": <FaGuitar />,
  "Soft Skills": <FaUsers />,
};

/* ------------------------------------------------------------------ */
/*  SkillCard – unchanged flip behaviour                              */
/* ------------------------------------------------------------------ */
const SkillCard = ({ skillCategory }) => {
  const innerRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(hover: none)").matches);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    if (isFlipped) {
      tl.to(innerRef.current, {
        duration: 0.8,
        rotationY: 180,
        scale: 1.1,
        ease: "elastic.out(1, 0.5)",
      }).to(
        innerRef.current.querySelectorAll(".skill-item"),
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.4"
      );
    } else {
      tl.to(innerRef.current.querySelectorAll(".skill-item"), {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.4,
      }).to(
        innerRef.current,
        { duration: 0.8, rotationY: 0, scale: 1, ease: "elastic.out(1, 0.5)" },
        "-=0.3"
      );
    }
  }, [isFlipped]);

  return (
    <Tilt className="Tilt w-full" options={{ max: 15, scale: 1.05, speed: 400 }}>
      <motion.div
        className={`flip-card ${isFlipped ? "flipped" : ""} w-full h-[450px] sm:h-[500px] relative`}
        initial={{ opacity: 0, y: 50, rotateY: 10 }}
        animate={{ opacity: 1, y: 0, rotateY: 0 }}
        exit={{ opacity: 0, y: -50, rotateY: -10 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        onClick={isMobile ? () => setIsFlipped((v) => !v) : undefined}
        onMouseEnter={isMobile ? undefined : () => setIsFlipped(true)}
        onMouseLeave={isMobile ? undefined : () => setIsFlipped(false)}
      >
        <div className="glow absolute inset-[-20px] bg-radial-gradient from-white/20 to-transparent rounded-xl opacity-0 transition-opacity duration-500" />
        <div className="flip-card-inner relative w-full h-full transform-style-preserve-3d transition-transform duration-700 ease-in-out" ref={innerRef}>
          {/* FRONT */}
          <div className="flip-card-front absolute w-full h-full backface-hidden flex flex-col justify-center items-center p-6 bg-gradient-to-br from-gray-900/80 to-black/50 border-2 border-white/20 rounded-xl shadow-lg">
            <div className="category-icon text-5xl sm:text-6xl animate-pulse text-primary">{categoryIcons[skillCategory.category]}</div>
            <p className="category-name mt-4 text-xl sm:text-2xl font-subheading text-lemon-chiffon text-shadow">{skillCategory.category}</p>
          </div>
          {/* BACK */}
          <div className="flip-card-back absolute w-full h-full backface-hidden flex justify-center items-center p-4 bg-gradient-to-br from-black/70 to-gray-900/50 border-2 border-white/20 rounded-xl shadow-lg overflow-y-auto transform-rotate-y-180">
            <div className="card-items grid grid-cols-2 gap-2 w-full">
              {skillCategory.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="card-item-inner skill-item flex items-center gap-2 p-3 bg-white/10 backdrop-blur-md rounded-lg shadow-inner text-white transition-all duration-300 hover:bg-primary/20"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="icon text-xl">{item.icon}</span>
                  <p className="text-sm sm:text-base font-description">{item.name}</p>
                  <span className="tooltip absolute bottom-full mb-2 w-max bg-black/80 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">{item.name} details...</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
};

/* ------------------------------------------------------------------ */
/*  Main component – static background, no magnifier                  */
/* ------------------------------------------------------------------ */
const Skill = () => {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => setCurrentPage(1), [activeCategory]);

  useEffect(() => {
    Splitting();
    const chars = document.querySelectorAll(".split-text .char");
    gsap.from(chars, { duration: 1.2, opacity: 0, y: 30, stagger: 0.06, ease: "power3.out", delay: 0.3 });
  }, []);

  const filteredSkills = activeCategory === "All" ? skillsData : skillsData.filter((s) => s.category === activeCategory);
  const skillsPerPage = isMobile ? 4 : filteredSkills.length;
  const totalPages = Math.ceil(filteredSkills.length / skillsPerPage);
  const currentSkills = filteredSkills.slice((currentPage - 1) * skillsPerPage, currentPage * skillsPerPage);

  return (
    <>
      {/* ----------  CSS  ---------- */}
      <style>{`
        :root{
          --primary:#fbf8cc;
          --secondary:#fde4cf;
          --accent:#2a1b3d;
          --dark-teal:#1d3557;
          --border:rgba(255,255,255,.3);
          --glass:rgba(255,255,255,.1);
        }
        .skill-section{
          position:relative;
          min-height:100vh;
          background:linear-gradient(135deg,rgba(29,53,87,.9),rgba(29,53,87,.6)),
                     url(/assets/skill.png) center/cover fixed no-repeat;
          display:flex;
          flex-direction:column;
          align-items:center;
          padding:4rem 2rem;
          overflow:hidden;
          color:var(--secondary);
        }
        @media (prefers-reduced-motion:reduce){
          *{animation:none!important;transition:none!important;}
        }
        .content{position:relative;z-index:2;text-align:center;width:100%;max-width:1400px}
        .content h1{font-size:4.5rem;margin-bottom:2.5rem;color:var(--primary);text-shadow:3px 3px 8px rgba(0,0,0,.6);font-family:'Rubik',sans-serif}
        @media (max-width:1024px){.content h1{font-size:3.5rem}}
        @media (max-width:768px){.content h1{font-size:2.8rem}}
        @media (max-width:480px){.content h1{font-size:2.2rem}}
        .sticky-header{position:sticky;top:1rem;z-index:10;background:var(--glass);backdrop-filter:blur(10px);padding:1rem;border-radius:15px;box-shadow:0 4px 15px rgba(0,0,0,.3);margin-bottom:2rem}
        .btn-group{display:flex;flex-wrap:wrap;justify-content:center;gap:1rem}
        .btn-group button{padding:.7rem 1.5rem;border-radius:9999px;font-size:1.1rem;font-weight:600;border:2px solid var(--primary);background:transparent;color:var(--primary);cursor:pointer;transition:all .4s ease}
        .btn-group button.active,.btn-group button:hover{background:linear-gradient(135deg,var(--primary),#e0d07a);color:var(--accent);transform:translateY(-4px) scale(1.1);box-shadow:0 6px 15px rgba(0,0,0,.3)}
        @media (max-width:768px){.btn-group button{padding:.6rem 1.2rem;font-size:1rem}}
        @media (max-width:480px){.btn-group button{padding:.5rem 1rem;font-size:.9rem}}
        .masonry-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:2.5rem;width:100%;margin:3rem auto 0;justify-items:center}
        @media (max-width:768px){.masonry-grid{grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:1.5rem}}
        @media (max-width:480px){.masonry-grid{grid-template-columns:1fr;gap:1rem}}
        .flip-card{perspective:2000px;width:100%;max-width:400px;height:500px;cursor:pointer;position:relative}
        .Tilt{transform-style:preserve-3d}
        .flip-card-inner{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .8s cubic-bezier(.23,1,.32,1)}
        .flip-card-front,.flip-card-back{position:absolute;width:100%;height:100%;backface-visibility:hidden;border-radius:1.5rem;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:2rem;background:var(--glass);backdrop-filter:blur(10px);border:2px solid var(--border);box-shadow:0 10px 30px rgba(0,0,0,.4)}
        .flip-card-front{background:linear-gradient(135deg,rgba(0,0,0,.6),rgba(0,0,0,.2))}
        .flip-card-back{background:linear-gradient(135deg,rgba(0,0,0,.3),rgba(0,0,0,.15));transform:rotateY(180deg);overflow-y:auto;padding:1.5rem}
        .category-icon{font-size:5rem;color:var(--primary);animation:pulse 2.5s infinite ease-in-out}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
        .category-name{font-size:1.8rem;color:var(--primary);text-shadow:2px 2px 5px rgba(0,0,0,.6);margin-top:1rem;font-family:'Rubik',sans-serif}
        .glow{position:absolute;inset:-25px;background:radial-gradient(circle,rgba(255,255,255,.25),transparent 70%);opacity:0;transition:opacity .6s ease;border-radius:1.5rem}
        .flip-card.flipped .glow{opacity:1}
        .card-items{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:1rem;width:100%}
        .card-item-inner{display:flex;align-items:center;gap:.5rem;padding:1rem;background:rgba(255,255,255,.05);backdrop-filter:blur(5px);border-radius:10px;text-align:center;color:var(--primary);font-family:'Source Code Pro',monospace;transition:all .4s ease}
        .card-item-inner .icon{font-size:1.8rem;color:var(--primary)}
        .card-item-inner p{font-size:1rem;margin:0}
        .tooltip{position:absolute;bottom:100%;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.8);color:white;padding:.5rem 1rem;border-radius:5px;font-size:.9rem;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .3s ease}
        .card-item-inner:hover .tooltip{opacity:1}
        @media (max-width:768px){.flip-card{height:400px}.flip-card-back .card-items{grid-template-columns:1fr}.card-item-inner{padding:.8rem}.card-item-inner .icon{font-size:1.5rem}.card-item-inner p{font-size:.9rem}}
        @media (max-width:480px){.skill-section{padding:2rem 1rem}.flip-card{height:350px}.category-icon{font-size:4rem}.category-name{font-size:1.5rem}}
        .pagination{display:flex;justify-content:center;align-items:center;margin-top:3rem;gap:1.5rem}
        .pagination button{padding:.7rem 1.5rem;border-radius:9999px;background:linear-gradient(135deg,var(--primary),#e0d07a);color:var(--accent);border:none;cursor:pointer;transition:all .4s ease;font-family:'Rubik',sans-serif}
        .pagination button:disabled{background:rgba(255,255,255,.2);cursor:not-allowed;opacity:.6}
        .pagination button:not(:disabled):hover{background:var(--secondary);transform:translateY(-3px) scale(1.05);box-shadow:0 5px 15px rgba(0,0,0,.3)}
        .pagination span{font-size:1.2rem;color:var(--primary);font-family:'Rubik',sans-serif}
        .progress-bar{width:100px;height:10px;background:rgba(255,255,255,.2);border-radius:5px;overflow:hidden}
        .progress{height:100%;background:var(--primary);transition:width .4s ease;border-radius:5px}
      `}</style>

      <section
        ref={sectionRef}
        className="skill-section"
        aria-label="Skills Section"
      >
        <div className="content">
          <h1 className="split-text font-heading text-5xl sm:text-6xl md:text-7xl" aria-live="polite">
            My Skill Set
          </h1>

          <div className="sticky-header">
            <div className="btn-group" role="tablist">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  className={`font-cta ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  aria-controls={`tabpanel-${cat}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="masonry-grid">
            <AnimatePresence>
              {currentSkills.map((skill) => (
                <SkillCard key={skill.category} skillCategory={skill} />
              ))}
            </AnimatePresence>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${(currentPage / totalPages) * 100}%` }}
                />
              </div>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Skill;