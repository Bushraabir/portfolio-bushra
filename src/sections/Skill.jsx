import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Splitting from "splitting";
import "splitting/dist/splitting.css";
// Removed AOS and Framer Motion imports because they were used solely for animations
import { FaPython, FaReact, FaBlender, FaGuitar, FaSwimmer } from "react-icons/fa";
import { SiCplusplus, SiTensorflow, SiFirebase, SiAdobeillustrator, SiThreedotjs } from "react-icons/si";
import { DiPhotoshop } from "react-icons/di";
import { GiSkateboard, GiArtificialIntelligence, GiPaintBrush } from "react-icons/gi";
import skill from "../assets/skill.jpg";

const skillsData = [
  {
    category: "Programming",
    items: [
      { name: "C", icon: <SiCplusplus /> },
      { name: "C++", icon: <SiCplusplus /> },
      { name: "Python", icon: <FaPython /> },
      { name: "Machine Learning", icon: <SiTensorflow /> },
      { name: "NLP", icon: <GiArtificialIntelligence /> }
    ]
  },
  {
    category: "Web Development",
    items: [
      { name: "React.js", icon: <FaReact /> },
      { name: "Three.js", icon: <SiThreedotjs /> },
      { name: "Firebase", icon: <SiFirebase /> }
    ]
  },
  {
    category: "3D & Design",
    items: [
      { name: "Blender", icon: <FaBlender /> },
      { name: "Illustrator", icon: <SiAdobeillustrator /> },
      { name: "Photoshop", icon: <DiPhotoshop /> }
    ]
  },
  {
    category: "Art & Craft",
    items: [
      { name: "Acrylic Painting", icon: <GiPaintBrush /> },
      { name: "Sketching", icon: <GiPaintBrush /> },
      { name: "Sculpting", icon: <GiPaintBrush /> }
    ]
  },
  {
    category: "Other Interests",
    items: [
      { name: "Guitar", icon: <FaGuitar /> },
      { name: "Skating", icon: <GiSkateboard /> },
      { name: "Swimming", icon: <FaSwimmer /> }
    ]
  }
];

const categories = ["All", ...skillsData.map((s) => s.category)];

const AnimatedCard = () => {
  const cardRef = useRef(null);

  // Initialize Splitting for static text (this no longer triggers an animation)
  useEffect(() => {
    Splitting({ whitespace: true });
  }, []);

  // Removed all GSAP timeline and mousemove-based magnifier animations.
  // The card now renders static content.
  return (
    <div ref={cardRef} className="animated-card relative">
      <div className="text relative z-10" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
        <h1 className="split-text text-4xl font-serif text-lemon_chiffon" data-splitting>
          You can't go wrong
          <br />
          with the right shoes
        </h1>
      </div>
      <div className="try-it text-2xl">🔎</div>
      <div className="magnifying-glass absolute" style={{ opacity: 1, transition: "none" }}></div>
    </div>
  );
};

const SkillCard = ({ skillCategory }) => (
  <div className="card-item">
    <h3>{skillCategory.category}</h3>
    <div className="items">
      {skillCategory.items.map((item, idx) => (
        <div key={idx} className="item">
          <span>{item.icon}</span>
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  </div>
);

const Skill = () => {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredSkills = activeCategory === "All" ? skillsData : skillsData.filter((s) => s.category === activeCategory);
  const bgImageUrl = skill;

  // Removed GSAP/AOS entrance animations for the card items.
  // The following effect is retained only for the background magnifier on the container.
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
    const zoom = 2;
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      if (mx >= 0 && my >= 0 && mx <= rect.width && my <= rect.height) {
        magnifier.style.opacity = 1;
      } else {
        magnifier.style.opacity = 0;
      }
      if (parseFloat(window.getComputedStyle(magnifier).opacity) > 0) {
        const mgWidth = magnifier.offsetWidth;
        const mgHeight = magnifier.offsetHeight;
        const bgWidth = naturalWidth ? naturalWidth * zoom : rect.width * zoom;
        const bgHeight = naturalHeight ? naturalHeight * zoom : rect.height * zoom;
        magnifier.style.backgroundSize = `${bgWidth}px ${bgHeight}px`;
        const ratioX = mx / rect.width;
        const ratioY = my / rect.height;
        const bgPosX = -(ratioX * bgWidth) + mgWidth / 2;
        const bgPosY = -(ratioY * bgHeight) + mgHeight / 2;
        magnifier.style.left = `${mx - mgWidth / 2}px`;
        magnifier.style.top = `${my - mgHeight / 2}px`;
        magnifier.style.backgroundPosition = `${bgPosX}px ${bgPosY}px`;
      }
    };
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", () => {
      magnifier.style.opacity = 0;
    });
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [bgImageUrl]);

  return (
    <>
      <style>{`
        .skill-section {
          position: relative;
          min-height: 100vh;
          background: url(${bgImageUrl}) center/cover no-repeat;
          font-family: 'Playfair Display', serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 3rem;
          overflow: hidden;
          color: #fbf8cc;
        }
        .skill-section .section-magnifying-glass {
          position: absolute;
          height: 220px;
          width: 220px;
          border-radius: 50%;
          opacity: 0;
          pointer-events: none;
          transition: none;
        }
        .skill-section .content {
          position: relative;
          z-index: 1;
          text-align: center;
        }
        .skill-section h2 {
          font-size: 3rem;
          margin-bottom: 2rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
        }
        .skill-section .split-text .char {
          font-size: calc(1.2rem + 1vw);
          font-weight: 400;
          line-height: 1.5;
          color: #fbf8cc;
          transform: none;
          opacity: 1;
        }
        .skill-section .btn-group button {
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
          border: 1px solid #fbf8cc;
          transition: none;
          margin: 0.5rem;
          background: transparent;
          color: #fbf8cc;
          cursor: pointer;
        }
        .skill-section .btn-group button.active,
        .skill-section .btn-group button:hover {
          background: #fbf8cc;
          color: #2a1b3d;
          box-shadow: none;
        }
        .skill-section .grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          width: 100%;
          max-width: 1200px;
          margin-top: 2rem;
        }
        .skill-section .card-item {
          background: rgba(251,248,204,0.2);
          backdrop-filter: blur(1px);
          border-radius: 1rem;
          padding: 1.5rem;
          border: 1px solid #2a1b3d;
          transition: none;
          cursor: pointer;
          color: #2a1b3d;
        }
        .skill-section .card-item:hover {
          transform: none;
        }
        .skill-section .card-item h3 {
          font-size: 1.25rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 1rem;
          border-bottom: 1px solid #2a1b3d;
          padding-bottom: 0.5rem;
          color: #2a1b3d;
        }
        .skill-section .card-item .items {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .skill-section .card-item .item {
          background: rgba(251,248,204,0.5);
          border-radius: 0.5rem;
          padding: 0.75rem;
          text-align: center;
          transition: none;
          color: #2a1b3d;
        }
        .skill-section .card-item .item:hover {
          transform: none;
        }
        .skill-section .card-item .item span {
          display: block;
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: #2a1b3d;
        }
        .skill-section .card-item .item p {
          font-size: 0.875rem;
          color: #2a1b3d;
        }
      `}</style>
      <div ref={sectionRef} className="skill-section">
        <div className="section-magnifying-glass"></div>
        <div className="content">
          <h2 className="split-text" data-splitting>
            My Skill Set
          </h2>
          <div className="btn-group">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={activeCategory === cat ? "active" : ""}
              >
                {cat}
              </button>
            ))}
          </div>
          <AnimatedCard />
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
