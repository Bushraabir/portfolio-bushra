import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Splitting from "splitting";
import "splitting/dist/splitting.css";
import { motion } from "framer-motion";
import {
  FaPython,
  FaReact,
  FaBlender,
  FaGuitar,
  FaSwimmer,
  FaCalculator,
  FaLightbulb,
  FaUsers,
  FaStar,
  FaComments,
} from "react-icons/fa";
import {
  SiCplusplus,
  SiFirebase,
  SiAdobeillustrator,
  SiThreedotjs,
  SiHtml5,
  SiCss3,
  SiVite,
  SiGreensock,
  SiFramer,
  SiKrita,
} from "react-icons/si";
import { DiPhotoshop } from "react-icons/di";
import {
  GiSkateboard,
  GiPaintBrush,
  GiCrafting,
  GiAtomicSlashes,
} from "react-icons/gi";
import skill from "../assets/skill.png";

const skillsData = [
  {
    category: "Physics & Mathematics",
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
    category: "Frontend",
    items: [
      { name: "React.js", icon: <FaReact /> },
      { name: "Three.js", icon: <SiThreedotjs /> },
      { name: "GSAP", icon: <SiGreensock /> },
      { name: "Framer Motion", icon: <SiFramer /> },
    ],
  },
  {
    category: "HTML & CSS",
    items: [
      { name: "HTML", icon: <SiHtml5 /> },
      { name: "CSS", icon: <SiCss3 /> },
    ],
  },
  {
    category: "Backend",
    items: [{ name: "Firebase", icon: <SiFirebase /> }],
  },
  {
    category: "Tools",
    items: [{ name: "Vite", icon: <SiVite /> }],
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
      { name: "Acrylic Painting", icon: <GiPaintBrush /> },
      { name: "Sketching", icon: <GiPaintBrush /> },
      { name: "Sculpting", icon: <GiPaintBrush /> },
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
      { name: "Communication", icon: <FaComments /> },
    ],
  },
];

const categories = ["All", ...skillsData.map((s) => s.category)];

const categoryIcons = {
  "Physics & Mathematics": <GiAtomicSlashes />,
  Programming: <SiCplusplus />,
  Frontend: <FaReact />,
  "HTML & CSS": <SiHtml5 />,
  Backend: <SiFirebase />,
  Tools: <SiVite />,
  "3D Modeling & Design": <FaBlender />,
  "Art & Craft": <GiPaintBrush />,
  "Other Interests": <FaGuitar />,
  "Soft Skills": <FaUsers />,
};

const SkillCard = ({ skillCategory }) => {
  const innerRef = useRef(null);
  const frontRef = useRef(null);
  useEffect(() => {
    if (frontRef.current) {
      Splitting({ target: frontRef.current, by: "chars" });
      const chars = frontRef.current.querySelectorAll(".char");
      gsap.from(chars, {
        duration: 0.8,
        opacity: 0,
        y: 30,
        ease: "power4.out",
        stagger: 0.05,
      });
    }
  }, []);
  const handleMouseEnter = () => {
    gsap.to(innerRef.current, {
      duration: 0.6,
      rotationY: 180,
      scale: 1.05,
      ease: "power3.out",
    });
  };
  const handleMouseLeave = () => {
    gsap.to(innerRef.current, {
      duration: 0.6,
      rotationY: 0,
      scale: 1,
      ease: "power3.out",
    });
  };
  return (
    <motion.div
      className="flip-card"
      initial={{ opacity: 0, y: 50, rotateY: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
    >
      <div className="flip-card-inner" ref={innerRef}>
        <div className="flip-card-front" ref={frontRef}>
          <div className="category-icon">{categoryIcons[skillCategory.category]}</div>
        </div>
        <div className="flip-card-back">
          <div className="card-items">
            {skillCategory.items.map((item, idx) => (
              <motion.div
                key={idx}
                className="card-item-inner"
                whileHover={{ scale: 1.1, rotate: 3 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <span className="icon">{item.icon}</span>
                <p>{item.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Skill = () => {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredSkills =
    activeCategory === "All" ? skillsData : skillsData.filter((s) => s.category === activeCategory);
  const bgImageUrl = skill;
  useEffect(() => {
    const container = sectionRef.current;
    const magnifier = container.querySelector(".section-magnifying-glass");
    magnifier.style.background = `url(${bgImageUrl}) no-repeat`;
    let naturalWidth = 0,
      naturalHeight = 0;
    const img = new Image();
    img.src = bgImageUrl;
    img.onload = () => {
      naturalWidth = img.naturalWidth;
      naturalHeight = img.naturalHeight;
    };
    const zoom = 3.5;
    const updateMagnifier = (x, y, rect) => {
      const mgWidth = magnifier.offsetWidth;
      const mgHeight = magnifier.offsetHeight;
      const bgWidth = naturalWidth ? naturalWidth * zoom : rect.width * zoom;
      const bgHeight = naturalHeight ? naturalHeight * zoom : rect.height * zoom;
      magnifier.style.backgroundSize = `${bgWidth}px ${bgHeight}px`;
      const ratioX = x / rect.width;
      const ratioY = y / rect.height;
      const bgPosX = -(ratioX * bgWidth) + mgWidth / 2;
      const bgPosY = -(ratioY * bgHeight) + mgHeight / 2;
      gsap.to(magnifier, {
        duration: 0.3,
        overwrite: "auto",
        left: `${x - mgWidth / 2}px`,
        top: `${y - mgHeight / 2}px`,
        backgroundPosition: `${bgPosX}px ${bgPosY}px`,
        ease: "power3.out",
      });
    };
    const handleMove = (e) => {
      let x, y;
      const rect = container.getBoundingClientRect();
      if (e.type === "pointermove") {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      } else if (e.type === "touchmove") {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      }
      if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
        gsap.to(magnifier, {
          duration: 0.3,
          overwrite: "auto",
          opacity: 1,
          ease: "power3.out",
        });
        updateMagnifier(x, y, rect);
      } else {
        gsap.to(magnifier, {
          duration: 0.3,
          overwrite: "auto",
          opacity: 0,
          ease: "power3.out",
        });
      }
    };
    const handleLeave = () => {
      gsap.to(magnifier, {
        duration: 0.3,
        overwrite: "auto",
        opacity: 0,
        ease: "power3.out",
      });
    };

    container.addEventListener("pointermove", handleMove);
    container.addEventListener("pointerleave", handleLeave);
    container.addEventListener("touchmove", handleMove);
    container.addEventListener("touchend", handleLeave);
    return () => {
      container.removeEventListener("pointermove", handleMove);
      container.removeEventListener("pointerleave", handleLeave);
      container.removeEventListener("touchmove", handleMove);
      container.removeEventListener("touchend", handleLeave);
    };
  }, [bgImageUrl]);
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { width: 100%; height: 100%; }
        .skill-section { position: relative; min-height: 100vh; background: url(${bgImageUrl}) center/cover no-repeat; font-family: 'Playfair Display', serif; display: flex; flex-direction: column; align-items: center; padding: 2rem; overflow: hidden; color: var(--secondary-color); }
        .section-magnifying-glass { position: absolute; height: 220px; width: 220px; border-radius: 50%; opacity: 0; pointer-events: none; box-shadow: 0 0 15px rgba(0,0,0,0.5); }
        .content { position: relative; z-index: 2; text-align: center; width: 100%; padding: 1rem; }
        .content h1 { font-size: 3rem; margin-bottom: 2rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.4); }
        .btn-group { margin-bottom: 2rem; display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; }
        .btn-group button { padding: 0.5rem 1rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 500; border: 1px solid #fbf8cc; background: transparent; color: #fbf8cc; cursor: pointer; transition: background 0.3s, color 0.3s; }
        .btn-group button.active, .btn-group button:hover { background: #fbf8cc; color: #2a1b3d; }
        .grid { display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); width: 100%; max-width: 1200px; margin: 2rem auto 0 auto; }
        .flip-card { perspective: 1500px; width: 100%; max-width: 250px; height: 300px; margin: 1rem auto; position: relative; cursor: pointer; }
        .flip-card-inner { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1); }
        .flip-card-front, .flip-card-back { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 1rem; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 1rem; }
        .flip-card-front { background: linear-gradient(135deg, var(--overlay-bg), rgba(255,255,255,0.05)); backdrop-filter: blur(10px); border: 2px solid var(--border-color); box-shadow: 0 8px 20px rgba(0,0,0,0.2); }
        .flip-card-back { background: linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.05)); backdrop-filter: blur(10px); border: 2px solid var(--border-color); box-shadow: 0 8px 20px rgba(0,0,0,0.2); transform: rotateY(180deg); overflow: hidden; }
        .category-icon { font-size: 3rem; margin-bottom: 0.5rem; color: var(--primary-color); transition: transform 0.3s ease; }
        .flip-card:hover .category-icon { transform: scale(1.1); }
        .card-items { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; padding: 0.5rem; width: 100%; height: 100%; justify-items: center; align-items: center; }
        .card-item-inner { background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(5px); border-radius: 0.5rem; padding: 0.75rem; text-align: center; color: #2a1b3d; font-family: 'Source Code Pro', monospace; width: 100%; box-sizing: border-box; }
        .card-item-inner .icon { display: block; font-size: 2rem; margin-bottom: 0.5rem; color: #2a1b3d; }
        .card-item-inner p { font-size: 0.875rem; color: #2a1b3d; }
        @media (max-width: 1024px) { .content h1 { font-size: 2.5rem; } .grid { gap: 1.5rem; } }
        @media (max-width: 768px) { .content h1 { font-size: 2rem; } .btn-group button { font-size: 0.8rem; padding: 0.4rem 0.8rem; } .flip-card { max-width: 200px; height: 250px; } .category-icon { font-size: 2.5rem; } .card-item-inner .icon { font-size: 1.75rem; } }
        @media (max-width: 480px) { .content h1 { font-size: 1.75rem; } .btn-group button { font-size: 0.75rem; padding: 0.3rem 0.6rem; } .grid { gap: 1rem; } .flip-card { max-width: 180px; height: 220px; } }
      `}</style>
      <div ref={sectionRef} className="skill-section">
        <div className="section-magnifying-glass"></div>
        <div className="content">
          <h1 className="split-text" data-splitting>My Skill Set</h1>
          <div className="btn-group">
            {categories.map((cat, idx) => (
              <button key={idx} className={activeCategory === cat ? "active" : ""} onClick={() => setActiveCategory(cat)}>
                {cat}
              </button>
            ))}
          </div>
          <div className="grid">
            {filteredSkills.map((skill, idx) => (
              <SkillCard key={idx} skillCategory={skill} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Skill;
