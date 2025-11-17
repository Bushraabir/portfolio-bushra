"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  // Device detection
  const checkDeviceType = useCallback(() => {
    const width = window.innerWidth;
    setIsMobile(width < 768);
    setIsTablet(width >= 768 && width <= 1024);
  }, []);

  useEffect(() => {
    checkDeviceType();
    const resizeHandler = () => requestAnimationFrame(checkDeviceType);
    window.addEventListener("resize", resizeHandler, { passive: true });
    return () => window.removeEventListener("resize", resizeHandler);
  }, [checkDeviceType]);

  // Intersection Observer for staggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setAnimationStage(1), 200);
          setTimeout(() => setAnimationStage(2), 600);
          setTimeout(() => setAnimationStage(3), 1000);
        }
      },
      { threshold: 0.15, rootMargin: "100px 0px -50px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleExploreClick = useCallback(() => {
    const el = document.getElementById("achievements");
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  const handleWorksClick = useCallback((event) => {
    event.preventDefault();
    const btn = event.target.closest("button");
    if (btn) {
      btn.style.opacity = "0.7";
      btn.style.transform = "scale(0.95)";
    }
    setTimeout(() => {
      navigate("/my-works");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 150);
  }, [navigate]);

  // Ripple effect (same as Hero)
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

  const aboutContent = {
    introduction:
      "I'm Bushra, and for me, imagination is never enough—I need to see it come alive. Late at night, I'll often find myself with a sketch in one hand and a laptop in front of me, chasing an idea line by line in code until it finally moves, breathes, or responds on the screen.",
    passion:
      "I love to draw, solve problems, and code in C, C++, and Python. But what excites me most is watching creativity and logic collide. Whether I'm shaping 3D frontend designs or building something like Relivia—an app I created to help people manage anxiety and panic attacks—every project tells a story of discovery.",
    leadership:
      "My passion extends beyond personal projects. As founder and vice president of Empowered, I've learned that the most meaningful work happens when you step outside your own code and into your community. Launching initiatives and helping others grow has shown me that true impact isn't just about what I create—it's about what we build together.",
    philosophy:
      "Challenges don't scare me—they energize me. Every debugging session, every design problem, every community event sharpens my curiosity and pushes me further. That sense of adventure, whether in technology or in empowering others, is what drives me forward into uncharted territory.",
  };

  const classes = {
    container: isMobile
      ? "w-full max-w-sm mx-auto p-5 rounded-2xl"
      : isTablet
      ? "w-full max-w-2xl mx-auto p-6 rounded-3xl"
      : "w-full max-w-4xl mx-auto p-8 lg:p-10 rounded-3xl",
    heading: isMobile
      ? "text-3xl sm:text-4xl mb-6"
      : isTablet
      ? "text-4xl sm:text-5xl mb-8"
      : "text-5xl lg:text-6xl mb-10",
    text: isMobile
      ? "text-sm leading-relaxed mb-5"
      : isTablet
      ? "text-base leading-relaxed mb-6"
      : "text-lg leading-relaxed mb-8",
    buttonContainer: isMobile
      ? "flex flex-col gap-4 mt-8"
      : "flex flex-row gap-6 mt-10 justify-center",
  };

  // Button base styles matching Hero
  const buttonBaseClass = isMobile
    ? "relative px-4 py-2 text-base font-semibold text-white tracking-wider rounded-full backdrop-blur-lg bg-gradient-to-r border-1 overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2"
    : "relative px-6 py-2 text-lg font-semibold text-white tracking-wider rounded-full backdrop-blur-lg bg-gradient-to-r border-2 overflow-hidden transition-all duration-300 focus:outline-none focus:ring-4";

  const buttonExploreClass = `${buttonBaseClass} from-jordy_blue/40 to-aquamarine/40 border-lemon_chiffon hover:border-mauve focus:ring-dark_teal`;
  const buttonWorksClass = `${buttonBaseClass} from-aquamarine/40 to-jordy_blue/40 border-lemon_chiffon hover:border-dark_teal focus:ring-mauve`;

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 lg:py-20 bg-transparent"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full opacity-20 bg-jordy_blue blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-15 bg-aquamarine blur-3xl animate-float-reverse"></div>
      </div>

      {/* Content */}
      <article
        ref={contentRef}
        className="relative z-10 w-full max-w-6xl px-4 transform transition-transform duration-1000"
      >
        <div
          className={`${classes.container} backdrop-blur-xl border border-white/10 shadow-2xl`}
        >
          {/* Header */}
          <header className="mb-8 lg:mb-12 text-center">
            <h1
              id="about-heading"
              className={`font-extrabold font-heading bg-clip-text text-transparent bg-gradient-to-r from-jordy_blue via-aquamarine to-champagne_pink ${classes.heading}`}
            >
              About Me
            </h1>
            <div className="mx-auto mt-4 h-1 w-20 bg-gradient-to-r from-transparent via-aquamarine to-transparent rounded-full"></div>
          </header>

          {/* Paragraphs */}
          <div className="space-y-6 lg:space-y-8 text-champagne_pink font-description">
            {Object.values(aboutContent).map((text, idx) => (
              <p key={idx} className={classes.text}>
                {text}
              </p>
            ))}
          </div>

          {/* Buttons */}
          <div className={classes.buttonContainer}>
            <motion.button
              className={buttonExploreClass}
              onClick={handleExploreClick}
              onMouseDown={(e) => createRipple(e, e.currentTarget)}
              onTouchStart={(e) => createRipple(e, e.currentTarget)}
            >
              🚀 Explore My Universe
            </motion.button>

            <motion.button
              className={buttonWorksClass}
              onClick={handleWorksClick}
              onMouseDown={(e) => createRipple(e, e.currentTarget)}
              onTouchStart={(e) => createRipple(e, e.currentTarget)}
            >
              💼 View My Works
            </motion.button>
          </div>
        </div>
      </article>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 10s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default About;