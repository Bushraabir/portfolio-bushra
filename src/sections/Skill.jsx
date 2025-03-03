import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Splitting from "splitting";
import "splitting/dist/splitting.css";
import { motion, AnimatePresence } from "framer-motion";
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
  GiPencil,
  GiRock,
} from "react-icons/gi";
import skill from "../assets/skill.png";
import { GiftColor } from "@fluentui/react-icons";

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
      { name: "Acrylic Painting", icon: <GiftColor /> },
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
      { name: "Communication", icon: <FaComments /> },
    ],
  },
];

const categories = ["All", ...skillsData.map((s) => s.category)];

const categoryIcons = {
  STEM: <GiAtomicSlashes />,
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
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    if (isFlipped) {
      tl.to(innerRef.current, {
        duration: 0.6,
        rotationY: 180,
        scale: 1.05,
        ease: "power3.out",
      }).then(() => {
        const items = innerRef.current.querySelectorAll(".skill-item");
        gsap.fromTo(
          items,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "power3.out",
          }
        );
      });
    } else {
      const items = innerRef.current.querySelectorAll(".skill-item");
      tl.to(items, {
        opacity: 0,
        y: -20,
        stagger: 0.05,
        duration: 0.3,
      }).to(
        innerRef.current,
        {
          duration: 0.6,
          rotationY: 0,
          scale: 1,
          ease: "power3.out",
        },
        "-=0.3"
      );
    }
  }, [isFlipped]);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <motion.div
      className={`flip-card ${isFlipped ? "flipped" : ""}`}
      initial={{ opacity: 0, y: 50, rotateY: 10 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      exit={{ opacity: 0, y: -50, rotateY: -10 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      onClick={isMobile ? handleFlip : undefined}
      onMouseEnter={isMobile ? undefined : () => setIsFlipped(true)}
      onMouseLeave={isMobile ? undefined : () => setIsFlipped(false)}
    >
      <div className="glow"></div>
      <div className="flip-card-inner" ref={innerRef}>
        <div className="flip-card-front">
          <div className="category-icon">
            {categoryIcons[skillCategory.category]}
          </div>
          <p className="category-name">{skillCategory.category}</p>
        </div>
        <div className="flip-card-back">
          <div className="card-items">
            {skillCategory.items.map((item, idx) => (
              <motion.div
                key={idx}
                className="card-item-inner skill-item"
                whileHover={{ scale: 1.3, rotate: 3 }}
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
    activeCategory === "All"
      ? skillsData
      : skillsData.filter((s) => s.category === activeCategory);
  const bgImageUrl = skill;

  useEffect(() => {
    Splitting();
    const chars = document.querySelectorAll(".split-text .char");
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from(chars, {
      duration: 1,
      y: 50,
      rotateX: 90,
      stagger: 0.05,
    })
      .to(
        chars,
        {
          duration: 0.8,
          y: -10,
          rotateX: -10,
          scale: 1.1,
          ease: "back.out(1.7)",
          stagger: { each: 0.05 },
        },
        "-=0.5"
      )
      .to(chars, {
        duration: 0.8,
        y: 0,
        rotateX: 0,
        scale: 1,
        ease: "elastic.out(1, 0.3)",
        stagger: { each: 0.05 },
      });
  }, []);

  useEffect(() => {
    const container = sectionRef.current;
    const magnifier = container.querySelector(".section-magnifying-glass");
    magnifier.style.background = `url(${bgImageUrl}) no-repeat center center`;
    let naturalWidth = 0,
      naturalHeight = 0;
    const img = new Image();
    img.src = bgImageUrl;
    img.onload = () => {
      naturalWidth = img.naturalWidth;
      naturalHeight = img.naturalHeight;
    };
    const zoom = 2.5;
    const updateMagnifier = (x, y, rect) => {
      const mgWidth = magnifier.offsetWidth;
      const mgHeight = magnifier.offsetHeight;
      const bgWidth = naturalWidth ? naturalWidth * zoom : rect.width * zoom;
      const bgHeight = naturalHeight
        ? naturalHeight * zoom
        : rect.height * zoom;
      magnifier.style.backgroundSize = `${bgWidth}px ${bgHeight}px`;
      const ratioX = x / rect.width;
      const ratioY = y / rect.height;
      const bgPosX = -(ratioX * bgWidth - mgWidth / 2);
      const bgPosY = -(ratioY * bgHeight - mgHeight / 2);
      gsap.to(magnifier, {
        duration: 0.3,
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
          opacity: 1,
          ease: "power3.out",
        });
        updateMagnifier(x, y, rect);
      } else {
        gsap.to(magnifier, {
          duration: 0.3,
          opacity: 0,
          ease: "power3.out",
        });
      }
    };
    const handleLeave = () => {
      gsap.to(magnifier, {
        duration: 0.3,
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
        :root {
          --primary-color: #fbf8cc;
          --secondary-color: #fde4cf;
          --accent-color: #2a1b3d;
          --dark-teal: #1d3557;
          --border-color: rgba(255, 255, 255, 0.3);
          --overlay-bg: rgba(0, 0, 0, 0.6);
        }
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        html, body {
          width: 100%;
          height: 100%;
          font-family: 'Playfair Display', serif;
          background-color: var(--accent-color);
        }
        .skill-section {
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, rgba(29,53,87,0.9), rgba(29,53,87,0.7)), url(${bgImageUrl}) center/cover no-repeat;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 3rem 2rem;
          overflow: hidden;
          color: var(--secondary-color);
        }
        .section-magnifying-glass {
          position: absolute;
          height: 240px;
          width: 240px;
          border-radius: 50%;
          opacity: 0;
          pointer-events: none;
          box-shadow: 0 0 30px rgba(0,0,0,0.7);
          border: 2px solid var(--primary-color);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .content {
          position: relative;
          z-index: 2;
          text-align: center;
          width: 100%;
          max-width: 1200px;
        }
        .content h1 {
          font-size: 3.5rem;
          margin-bottom: 2rem;
          color: var(--primary-color);
          text-shadow: 2px 2px 6px rgba(0,0,0,0.5);
        }
        @media (max-width: 768px) {
          .content h1 {
            font-size: 2.5rem;
          }
        }
        @media (max-width: 480px) {
          .content h1 {
            font-size: 2rem;
          }
        }
        .btn-group {
          margin-bottom: 2rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
        }
        .btn-group button {
          padding: 0.6rem 1.2rem;
          border-radius: 9999px;
          font-size: 1rem;
          font-weight: 600;
          border: 2px solid var(--primary-color);
          background: transparent;
          color: var(--primary-color);
          cursor: pointer;
          transition: background 0.3s, color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .btn-group button.active,
        .btn-group button:hover {
          background: var(--primary-color);
          color: var(--accent-color);
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        @media (max-width: 768px) {
          .btn-group button {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }
        }
        @media (max-width: 480px) {
          .btn-group button {
            padding: 0.4rem 0.8rem;
            font-size: 0.8rem;
          }
        }
        .grid {
          display: grid;
          gap: 2rem;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          width: 100%;
          margin: 2rem auto 0;
        }
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
        }
        @media (max-width: 480px) {
          .grid {
            grid-template-columns: repeat(1, 1fr);
            gap: 1rem;
          }
        }
        .flip-card {
          perspective: 1500px;
          width: 100%;
          max-width: 280px;
          height: 320px;
          margin: 0 auto;
          cursor: pointer;
          position: relative;
        }
        @media (max-width: 768px) {
          .flip-card {
            max-width: 100%;
            height: 300px;
          }
        }
        @media (max-width: 480px) {
          .flip-card {
            max-width: 100%;
            height: 350px;
          }
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 1.5rem;
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }
        .flip-card-front {
          background: linear-gradient(135deg, var(--overlay-bg), rgba(0,0,0,0.15));
          border: 2px solid var(--border-color);
        }
        .flip-card-back {
          background: linear-gradient(135deg, rgba(0,0,0,0.25), rgba(0,0,0,0.1));
          border: 2px solid var(--border-color);
          transform: rotateY(180deg);
          overflow: auto;
        }
        .category-icon {
          font-size: 3rem;
          animation: pulse 3s infinite ease-in-out;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .category-name {
          font-size: 1.2rem;
          color: var(--primary-color);
          text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
          margin-top: 0.5rem;
        }
        .glow {
          position: absolute;
          top: -20px;
          left: -20px;
          right: -20px;
          bottom: -20px;
          background: radial-gradient(circle, rgba(255,255,255,0.15), transparent);
          opacity: 0;
          transition: opacity 0.5s;
          z-index: -1;
        }
        .flip-card.flipped .glow {
          opacity: 1;
        }
        .card-items {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
        }
        .card-item-inner {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(5px);
          border-radius: 0.75rem;
          padding: 0.8rem;
          text-align: center;
          color: var(--accent-color);
          font-family: 'Source Code Pro', monospace;
          width: calc(50% - 0.5rem);
          transition: transform 0.3s, background 0.3s;
        }
        @media (max-width: 768px) {
          .flip-card-back .card-items {
            flex-direction: column;
            gap: 0.5rem;
          }
          .flip-card-back .card-item-inner {
            width: 100%;
            padding: 0.5rem;
            box-sizing: border-box;
          }
          .flip-card-back .card-item-inner p {
            font-size: 0.9rem;
          }
          .flip-card-back .card-item-inner .icon {
            font-size: 1.2rem;
          }
        }
        .card-item-inner .icon {
          display: block;
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--accent-color);
        }
        .card-item-inner p {
          font-size: 0.8rem;
        }
        @media (max-width: 768px) {
          .skill-section {
            padding: 2rem 1rem;
          }
        }
        @media (max-width: 480px) {
          .skill-section {
            padding: 1.5rem 0.5rem;
          }
        }
      `}</style>
      <div ref={sectionRef} className="skill-section">
        <div className="section-magnifying-glass"></div>
        <div className="content">
          <h1 className="split-text" data-splitting>
            My Skill Set
          </h1>
          <div className="btn-group">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={activeCategory === cat ? "active" : ""}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid">
            <AnimatePresence>
              {filteredSkills.map((skill) => (
                <SkillCard key={skill.category} skillCategory={skill} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skill;