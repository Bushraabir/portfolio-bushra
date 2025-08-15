"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import profileImage from "../assets/Bushra.png";
import resumePDF from "../assets/resume/Bushra.pdf";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const scrollRef = useRef(null);
  const profileRef = useRef(null);
  const buttonRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      scrollRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: scrollRef.current,
          start: "top bottom",
          end: "center center",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      profileRef.current,
      { opacity: 0, scale: 0.8, rotation: 20 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.5,
        ease: "power3.out",
      }
    );
  }, []);

  const textParagraphClass = isMobile
    ? "text-sm text-glow text-lemon_chiffon font-description tracking-wider leading-relaxed text-left"
    : "text-lg sm:text-xl md:text-2xl text-glow text-lemon_chiffon font-description tracking-wider leading-relaxed text-left";

  const headingClass = isMobile
    ? "text-4xl font-heading text-transparent bg-gradient-to-r from-champagne_pink to-pink_lavender bg-clip-text leading-tight tracking-tight text-left"
    : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading text-transparent bg-gradient-to-r from-champagne_pink to-pink_lavender bg-clip-text leading-tight tracking-tight text-left";

  const subheadingClass = isMobile
    ? "text-sm text-glow text-mauve font-subheading text-left"
    : "text-lg sm:text-2xl md:text-2xl text-glow text-mauve font-subheading tracking-wide text-left";

  const profileImgClass = isMobile
    ? "w-40 h-40 transition-transform duration-300 transform shadow-2xl hover:scale-105"
    : "w-11 h-11 sm:w-40 sm:h-40 md:w-60 md:h-60 lg:w-96 lg:h-96 transition-transform duration-300 transform shadow-2xl hover:scale-105";

  const descriptionClass = isMobile
    ? "text-xs text-center text-glow text-lemon_chiffon tracking-wide leading-relaxed"
    : "text-glow text-center text-lemon_chiffon tracking-wide leading-relaxed text-sm sm:text-md";

  const buttonBaseClass = isMobile
    ? "relative px-1 py-2 text-sm font-semibold text-white tracking-wider rounded-full backdrop-blur-lg bg-gradient-to-r border-2 overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2"
    : "relative px-6 py-3 text-lg font-semibold text-white tracking-wider rounded-full backdrop-blur-lg bg-gradient-to-r border-4 overflow-hidden transition-all duration-300 focus:outline-none focus:ring-4";

  const buttonWorksClass = `${buttonBaseClass} from-dark_teal/40 to-blue-600/40 border-lemon_chiffon hover:border-dark_teal focus:ring-dark_teal`;
  const buttonStoryClass = `${buttonBaseClass} from-mauve/40 to-purple-600/40 border-lemon_chiffon hover:border-mauve focus:ring-mauve`;
  const buttonCVClass = `${buttonBaseClass} from-jordy_blue/40 to-purple-500/40 border-lemon_chiffon hover:border-jordy_blue focus:ring-jordy_blue`;

  const createRipple = (e, button) => {
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.style.position = "absolute";
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.background = "rgba(255, 255, 255, 0.3)";
    ripple.style.borderRadius = "50%";
    ripple.style.pointerEvents = "none";
    ripple.style.transform = "scale(0)";
    ripple.style.opacity = "1";
    ripple.style.transition = "transform 0.6s ease-out, opacity 0.6s ease-out";

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.style.transform = "scale(2)";
      ripple.style.opacity = "0";
    }, 0);

    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <section
      ref={scrollRef}
      className="relative z-10 flex flex-col items-center justify-center h-screen overflow-y-auto bg-transparent"
      style={{ pointerEvents: "none" }}
    >
      <div className="relative flex flex-col items-start text-left lg:flex-row lg:text-left lg:justify-between lg:w-3/4 xl:w-2/3">
        <div className="flex flex-col items-start lg:items-start">
          <motion.p
            className={textParagraphClass}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          >
            Reality is programmable beauty.
          </motion.p>
          <motion.h1
            className={headingClass}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            Bushra Khandoker✨
          </motion.h1>
          <motion.p
            className={subheadingClass}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          >
            Every algorithm starts with a question. <br />
            I explore the intersection of physics, art, and computation, building solutions that transform cosmic mysteries <br />
            into tangible, beautiful experiences.
          </motion.p>
        </div>
        <motion.div className="lg:ml-12 flex justify-start" ref={profileRef}>
          <img
            src={profileImage}
            alt="Bushra Khandoker"
            className={profileImgClass}
            loading="lazy"
            style={{
              objectFit: "cover",
              clipPath:
                "polygon(50% 0%, 90% 15%, 100% 50%, 90% 85%, 50% 100%, 10% 85%, 0% 50%, 10% 15%)",
            }}
          />
        </motion.div>
      </div>

      <div
        ref={buttonRef}
        className="flex flex-row gap-2 font-cta mt-4"
        style={{ pointerEvents: "auto" }}
      >
        <Link to="/my-story">
          <motion.button
            className={buttonStoryClass}
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 20px 5px rgba(200, 100, 255, 0.6)",
              rotate: -2,
              transition: { duration: 0.3 },
            }}
            whileTap={{
              scale: 0.9,
              rotate: 10,
              boxShadow: "0px 0px 10px 2px rgba(200, 100, 255, 0.3)",
            }}
            animate={{
              y: [0, -12, 0],
              rotate: [0, -1, 1, 0],
              transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
            }}
            onClick={(e) => createRipple(e, e.currentTarget)}
          >
            My Story
          </motion.button>
        </Link>

        <Link to="/my-works">
          <motion.button
            className={buttonWorksClass}
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 20px 5px rgba(0, 255, 255, 0.6)",
              rotate: 2,
              transition: { duration: 0.3 },
            }}
            whileTap={{
              scale: 0.9,
              rotate: -10,
              boxShadow: "0px 0px 10px 2px rgba(0, 255, 255, 0.3)",
            }}
            animate={{
              y: [0, -12, 0],
              rotate: [0, 1, -1, 0],
              transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
            }}
            onClick={(e) => createRipple(e, e.currentTarget)}
          >
            My Works
          </motion.button>
        </Link>

        <motion.a
          href={resumePDF}
          download="Bushra_Khandoker_Resume.pdf"
          className={buttonCVClass}
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 20px 5px rgba(255, 0, 255, 0.6)",
            rotate: -2,
            transition: { duration: 0.3 },
          }}
          whileTap={{
            scale: 0.9,
            rotate: 10,
            boxShadow: "0px 0px 10px 2px rgba(255, 0, 255, 0.3)",
          }}
          animate={{
            y: [0, -12, 0],
            rotate: [0, -1, 1, 0],
            transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
          }}
          onClick={(e) => createRipple(e, e.currentTarget)}
        >
          Launch My Universe Map
        </motion.a>
      </div>

      {isMobile ? (
        <motion.div
          className="px-4 text-left text-white mt-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ pointerEvents: "none" }}
        >
          <p className={descriptionClass}>
            ✨Our universe is similar to a bubble, and it is expanding like one as well.
            Want to see how a bubble is created and expands?
            <br />
            Simply tap on the screen, and you will see🎮
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="absolute px-4  text-lemon_chiffon bottom-9 sm:bottom-6 md:bottom-9"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ pointerEvents: "none" }}
        >
          <p className={descriptionClass}>
            ✨Our universe is similar to a bubble, and it is expanding like one as well.
            Want to see how a bubble is created and expands?
            <br />
            Simply tap on the screen, and you will see🎮
          </p>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
