import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Splitting from "splitting";
import "splitting/dist/splitting.css";
import { FaPython, FaReact, FaBlender, FaGuitar, FaSwimmer } from "react-icons/fa";
import { SiCplusplus, SiTensorflow, SiFirebase, SiAdobeillustrator, SiThreedotjs } from "react-icons/si";
import { DiPhotoshop } from "react-icons/di";
import { GiSkateboard, GiArtificialIntelligence, GiPaintBrush } from "react-icons/gi";
import skill from "../assets/skill.jpg";

// -----------------------------------------------------------------------------
// Data for skills and category list
// -----------------------------------------------------------------------------
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

const categories = ["All", ...skillsData.map((skill) => skill.category)];

// -----------------------------------------------------------------------------
// AnimatedCard Component
// -----------------------------------------------------------------------------
const AnimatedCard = () => {
  const cardRef = useRef(null);

  // Animate text and card using Splitting and GSAP
  useEffect(() => {
    Splitting({ whitespace: true });
    const tl = gsap.timeline({});
    tl.to(".skill-section .animated-card .split-text .char", {
      x: 0,
      opacity: 1,
      duration: 1,
      delay: 0.5,
      stagger: { amount: 1.5, from: "start" }
    })
      .to(
        ".skill-section .animated-card",
        {
          clipPath: "circle(25rem at 82% 82%)",
          scale: 1,
          duration: 4,
          ease: "expo.inOut"
        },
        "-=1"
      )
      .to(".skill-section .animated-card .try-it", {
        scale: 1,
        duration: 0.5,
        ease: "back.out(4)"
      })
      .to(
        ".skill-section .animated-card .try-it",
        {
          rotate: 15,
          transformOrigin: "bottom left",
          duration: 0.5,
          repeat: 5,
          yoyo: true,
          ease: "none"
        },
        "+=1"
      );
  }, []);

  // Set up the magnifier effect on the card using the image’s natural dimensions
  useEffect(() => {
    const card = cardRef.current;
    const magnifier = card.querySelector(".magnifying-glass");
    const bgImageUrl = skill;
    magnifier.style.background = `url(${bgImageUrl}) no-repeat`;

    // Preload image to obtain natural dimensions
    let naturalWidth = 0,
      naturalHeight = 0;
    const img = new Image();
    img.src = bgImageUrl;
    img.onload = () => {
      naturalWidth = img.naturalWidth;
      naturalHeight = img.naturalHeight;
    };

    const zoom = 2; // Adjust zoom factor as desired

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      // Show the magnifier when inside the card area
      if (mx >= 0 && my >= 0 && mx <= rect.width && my <= rect.height) {
        gsap.to(magnifier, { opacity: 1, duration: 0.1 });
      } else {
        gsap.to(magnifier, { opacity: 0, duration: 0.1 });
      }

      if (parseFloat(window.getComputedStyle(magnifier).opacity) > 0) {
        const mgWidth = magnifier.offsetWidth;
        const mgHeight = magnifier.offsetHeight;
        const bgWidth = naturalWidth ? naturalWidth * zoom : rect.width * zoom;
        const bgHeight = naturalHeight ? naturalHeight * zoom : rect.height * zoom;
        magnifier.style.backgroundSize = `${bgWidth}px ${bgHeight}px`;

        // Calculate background position so the magnified portion centers at the cursor
        const ratioX = mx / rect.width;
        const ratioY = my / rect.height;
        const bgPosX = -(ratioX * bgWidth) + mgWidth / 2;
        const bgPosY = -(ratioY * bgHeight) + mgHeight / 2;

        gsap.to(magnifier, {
          left: mx - mgWidth / 2,
          top: my - mgHeight / 2,
          backgroundPosition: `${bgPosX}px ${bgPosY}px`,
          duration: 0.1,
          ease: "power1.out"
        });
      }
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", () => {
      gsap.to(magnifier, { opacity: 0, duration: 0.1 });
    });
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div ref={cardRef} className="animated-card relative">
      <div
        className="text relative z-10"
        style={{
          textShadow: "2px 2px 4px rgba(0,0,0,0.8)"
        }}
      >
        <h1 className="split-text text-4xl font-serif text-lemon_chiffon" data-splitting>
          You can't go wrong
          <br />
          with the right shoes
        </h1>
      </div>
      <div className="try-it text-2xl">🔎</div>
      <div
        className="magnifying-glass absolute"
        style={{ opacity: 0, transition: "opacity 0.1s" }}
      ></div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// SkillCard Component
// -----------------------------------------------------------------------------
const SkillCard = ({ skillCategory }) => (
  <motion.div whileHover={{ scale: 1.05 }} className="card-item">
    <h3>{skillCategory.category}</h3>
    <div className="items">
      {skillCategory.items.map((item, idx) => (
        <motion.div whileHover={{ scale: 1.1 }} key={idx} className="item">
          <span>{item.icon}</span>
          <p>{item.name}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

// -----------------------------------------------------------------------------
// Main Skill Component
// -----------------------------------------------------------------------------
const Skill = () => {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredSkills =
    activeCategory === "All"
      ? skillsData
      : skillsData.filter((skill) => skill.category === activeCategory);
  const bgImageUrl = skill;

  // Set up the section-level magnifier effect using natural image dimensions
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

    const zoom = 2; // Adjust zoom factor as desired

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      if (mx >= 0 && my >= 0 && mx <= rect.width && my <= rect.height) {
        gsap.to(magnifier, { opacity: 1, duration: 0.1 });
      } else {
        gsap.to(magnifier, { opacity: 0, duration: 0.1 });
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

        gsap.to(magnifier, {
          left: mx - mgWidth / 2,
          top: my - mgHeight / 2,
          backgroundPosition: `${bgPosX}px ${bgPosY}px`,
          duration: 0.1,
          ease: "power1.out"
        });
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", () => {
      gsap.to(magnifier, { opacity: 0, duration: 0.1 });
    });
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [bgImageUrl]);

  // Animate split text for the section heading
  useEffect(() => {
    Splitting({ whitespace: true });
    const tl = gsap.timeline({});
    tl.to(".skill-section .split-text .char", {
      x: 0,
      opacity: 1,
      duration: 1,
      delay: 0.5,
      stagger: { amount: 1.5, from: "start" }
    });
  }, []);

  return (
    <>
      <style>{`
        /* Using the custom Tailwind theme colors and fonts */
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
          color: #fbf8cc; /* lemon_chiffon */
        }
        .skill-section .section-magnifying-glass {
          position: absolute;
          height: 220px;
          width: 220px;
          border-radius: 50%;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.1s;
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
          transform: translate(4rem, 0);
          opacity: 0;
        }
        .skill-section .btn-group button {
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
          border: 1px solid #fbf8cc;
          transition: all 0.3s;
          margin: 0.5rem;
          background: transparent;
          color: #fbf8cc;
          cursor: pointer;
        }
        .skill-section .btn-group button.active,
        .skill-section .btn-group button:hover {
          background: #fbf8cc;
          color: #2a1b3d; /* deep_indigo */
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
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
          background: rgba(251,248,204,0.1); /* lemon_chiffon at 10% opacity */
          backdrop-filter: blur(10px);
          border-radius: 1rem;
          padding: 1.5rem;
          border: 1px solid #2a1b3d;
          transition: transform 0.3s;
          cursor: pointer;
        }
        .skill-section .card-item:hover {
          transform: scale(1.05);
        }
        .skill-section .card-item h3 {
          font-size: 1.25rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 1rem;
          border-bottom: 1px solid #fbf8cc;
          padding-bottom: 0.5rem;
        }
        .skill-section .card-item .items {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .skill-section .card-item .item {
          background: rgba(251,248,204,0.2);
          border-radius: 0.5rem;
          padding: 0.75rem;
          text-align: center;
          transition: transform 0.3s;
        }
        .skill-section .card-item .item:hover {
          transform: scale(1.1);
        }
        .skill-section .card-item .item span {
          display: block;
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: #fbf8cc;
        }
        .skill-section .card-item .item p {
          font-size: 0.875rem;
          color: #fbf8cc;
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
