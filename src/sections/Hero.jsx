"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import profileImage from "../assets/Bushra.png";

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const scrollRef = useRef(null);
  const profileRef = useRef(null);
  const buttonRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animations
  useEffect(() => {
    gsap.fromTo(
      scrollRef.current,
      { opacity: 0, y: isMobile ? 20 : 50 },
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
  }, [isMobile]);

  // Classes
  const textParagraphClass = isMobile
    ? "text-base text-center text-glow text-lemon_chiffon font-description tracking-wider leading-relaxed"
    : "text-lg sm:text-xl md:text-2xl text-glow text-lemon_chiffon font-description tracking-wider leading-relaxed";

  const headingClass = isMobile
    ? "mt-3 text-3xl text-center font-heading text-transparent bg-gradient-to-r from-champagne_pink to-pink_lavender bg-clip-text leading-tight tracking-tight"
    : " text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading text-transparent bg-gradient-to-r from-champagne_pink to-pink_lavender bg-clip-text leading-tight tracking-tight";

  const subheadingClass = isMobile
    ? "text-sm text-center text-glow text-champagne_pink font-subheading tracking-wide"
    : " text-lg text-left sm:text-2xl md:text-2xl text-glow text-champagne_pink font-subheading tracking-wide";

  const profileImgClass = isMobile
    ? "w-32 h-32 mx-auto transition-transform duration-300 transform shadow-2xl"
    : "w-24 sm:w-72 md:w-[250px] lg:w-[450px] object-contain shadow-2xl transition-transform duration-300 transform border-2 border-dark_teal";

  const descriptionClass = isMobile
    ? "text-sm text-center text-glow text-lemon_chiffon tracking-wide leading-relaxed"
    : "text-sm sm:text-md text-glow text-center text-lemon_chiffon tracking-wide leading-relaxed";

  const buttonBaseClass = isMobile
    ? "relative px-4 py-2 text-base font-semibold text-white tracking-wider rounded-full backdrop-blur-lg bg-gradient-to-r border-1 overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2"
    : "relative px-6 py-2 text-lg font-semibold text-white tracking-wider rounded-full backdrop-blur-lg bg-gradient-to-r border-2 overflow-hidden transition-all duration-300 focus:outline-none focus:ring-4";

  const buttonWorksClass = `${buttonBaseClass} from-dark_teal/40 to-blue-600/40 border-lemon_chiffon hover:border-mauve focus:ring-dark_teal`;
  const buttonStoryClass = `${buttonBaseClass} from-mauve/40 to-purple-600/40 border-lemon_chiffon hover:border-dark_teal  focus:ring-mauve`;

  // Ripple effect for buttons
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
    <main
      ref={scrollRef}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen overflow-y-auto bg-transparent px-4"
      role="main"
    >
      {/* HERO HEADER */}
      <header
        className="relative flex flex-col items-center lg:flex-row lg:items-start lg:justify-between lg:w-3/4 xl:w-2/3"
        role="banner"
      >
        <article
          className="pointer-events-none flex flex-col items-center lg:items-start mb-6 lg:mb-0 text-center lg:text-left"
          itemScope
          itemType="https://schema.org/Person"
        >
          <motion.p
            className={textParagraphClass}
            initial={{ opacity: 0, y: isMobile ? 20 : 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          >
            Reality is programmable beauty.
          </motion.p>

          <motion.h1
            className={headingClass}
            itemProp="name"
            initial={{ opacity: 0, y: isMobile ? 20 : 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            Bushra Khandoker ✨
          </motion.h1>

          <motion.h2
            className={subheadingClass}
            itemProp="jobTitle"
            initial={{ opacity: 0, y: isMobile ? 20 : 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          >
            Every algorithm starts with a question.
          </motion.h2>

          <motion.p
            className={subheadingClass}
            itemProp="description"
            initial={{ opacity: 0, y: isMobile ? 20 : 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.2, delay: 0.6, ease: "easeOut" }}
          >
            I explore the intersection of computation, art, and physics, 
            building solutions that transform cosmic mysteries 
            into tangible, beautiful experiences.
          </motion.p>
        </article>

        {/* PROFILE IMAGE */}
        <motion.figure className="flex justify-center lg:ml-12" ref={profileRef}>
          <img
            src={profileImage}
            alt="Portrait of Bushra Khandoker, a dreamer and an explorer"
            title="Bushra Khandoker - A dreamer and an explorer"
            className={profileImgClass}
            loading="lazy"
            decoding="async"
            style={{
              objectFit: "cover",
              borderRadius: "100px",  // Slightly rounded corners for a modern touch
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",  // Subtle shadow for a more realistic feel
              paddingRight: "20px",  // Space at the bottom for the Polaroid effect
              marginRight: "20px",  // Add space below the image to emphasize the Polaroid look
              backgroundColor: "rgba(253, 228, 207, 0.8)",  // White background around the image for the Polaroid feel
            }}
            itemProp="image"
          />

          <figcaption className="sr-only">Bushra Khandoker Profile Image</figcaption>
        </motion.figure>
      </header>

      {/* NAVIGATION BUTTONS */}
      <nav
        ref={buttonRef}
        className="flex flex-row flex-wrap justify-center gap-4 font-cta mt-6"
        aria-label="Primary Navigation"
      >
        <Link to="/my-story" aria-label="Read Bushra Khandoker's personal story">
          <motion.button
            className={buttonStoryClass}
            onClick={(e) => createRipple(e, e.currentTarget)}
            style={{ pointerEvents: "auto" }}
            title="Explore Bushra's Story"
          >
            My Story
          </motion.button>
        </Link>

        <Link to="/my-works" aria-label="Explore Bushra Khandoker's projects and works">
          <motion.button
            className={buttonWorksClass}
            onClick={(e) => createRipple(e, e.currentTarget)}
            style={{ pointerEvents: "auto" }}
            title="View Bushra's Works"
          >
            My Works
          </motion.button>
        </Link>

      </nav>

      {/* DESCRIPTION SECTION */}
      <motion.section
        className="mt-6 px-4 text-center text-lemon_chiffon pointer-events-none"
        initial={{ opacity: 0, y: isMobile ? 20 : 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <p className={descriptionClass}>
          ✨ Our universe is similar to a bubble, and it is expanding like one as
          well. Want to see how a bubble is created and expands? <br />
          Simply tap on the screen, and you will see 🎮
        </p>
      </motion.section>
    </main>
  );
};

export default Hero;
