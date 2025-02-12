import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
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
    AOS.init({ duration: isMobile ? 500 : 800, once: false });
  }, [isMobile]);

  const sectionPadding = isMobile ? "p-4 mt-8" : "p-8 mt-16";
  const containerClass = isMobile
    ? "w-full max-w-md p-4 rounded-2xl shadow-2xl backdrop-blur-lg bg-deep_indigo/80"
    : "w-full max-w-lg p-10 rounded-3xl shadow-2xl backdrop-blur-lg bg-deep_indigo/80 md:w-2/3 lg:w-1/2";
  const h2Class = isMobile
    ? "mb-6 font-heading text-3xl font-extrabold text-lemon_chiffon tracking-tight leading-snug"
    : "mb-10 font-heading text-6xl font-extrabold text-lemon_chiffon tracking-tight leading-snug";
  const p1Class = isMobile
    ? "mb-6 font-description text-lg text-champagne_pink leading-relaxed tracking-wider"
    : "mb-10 font-description text-2xl text-champagne_pink leading-relaxed tracking-wider";
  const p2Class = isMobile
    ? "mb-6 font-description text-xxs text-tea_rose leading-relaxed tracking-wide"
    : "mb-10 font-description text-xl text-tea_rose leading-relaxed tracking-wide";
  const p3Class = isMobile
    ? "mb-6 font-description text-xxs text-pink_lavender leading-relaxed tracking-wide"
    : "mb-10 font-description text-xl text-pink_lavender leading-relaxed tracking-wide";
  const p4Class = isMobile
    ? "font-description text-xxs text-mauve leading-relaxed tracking-wide"
    : "font-description text-xl text-mauve leading-relaxed tracking-wide";

  const sectionTransition = isMobile
    ? { duration: 0.6, ease: "easeOut" }
    : { duration: 1, ease: "easeInOut" };
  const innerTransition = isMobile
    ? { duration: 0.6, ease: "easeOut" }
    : { duration: 1, ease: "easeOut" };
  const containerTransition = isMobile
    ? { duration: 0.4, delay: 0.2 }
    : { duration: 0.6, delay: 0.3 };

  return (
    <motion.section
      id="about"
      className={`relative flex flex-col items-center justify-center min-h-screen ${sectionPadding} pointer-events-none select-none`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={sectionTransition}
      style={{ backgroundColor: "transparent" }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none" />
      <motion.div
        className="relative z-10 flex flex-col items-end w-full max-w-5xl text-dark_teal ml-auto mr-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={innerTransition}
      >
        <motion.div
          className={containerClass}
          data-aos="fade-up"
          data-aos-delay="100"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={containerTransition}
          style={{
            maxHeight: "85vh",
            overflowY: "auto",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <motion.h2 className={h2Class} data-aos="fade-left">
            My Planet
          </motion.h2>
          <motion.p className={p1Class} data-aos="fade-right">
            Am I on a spaceship as big as a planet, and could it be called Earth? Theoretically, yes.
          </motion.p>
          <motion.p className={p2Class} data-aos="zoom-in">
            My duty is to maintain my spaceship&apos;s computer program and keep it running smoothly. I love these systems. I have worked with Python, C, and C++ to create complex, interactive simulations.
          </motion.p>
          <motion.p className={p3Class} data-aos="flip-up">
            But knowing this isn&apos;t enough. I need to explore other parts of my satellite and connect with experts who can guide me in my endless pursuit of knowledge.
          </motion.p>
          <motion.p className={p4Class} data-aos="fade-up">
            Art has been one of humanity&apos;s first creations—it's a natural language. I, too, am a binary sculptor, carrying the essence of Homo sapiens.
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default About;
