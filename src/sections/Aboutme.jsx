import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
    useEffect(() => {
        AOS.init({ duration: 800, once: false });
    }, []);

    return (
        <motion.section
          id="about"
          className="relative flex flex-col items-center justify-center min-h-screen p-8 mt-16 pointer-events-none select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          style={{ backgroundColor: 'transparent' }}
        >
          <div className="absolute inset-0 z-0 pointer-events-none" />
          <motion.div
            className="relative z-10 flex flex-col items-end w-full max-w-5xl text-dark_teal ml-auto mr-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <motion.div
              className="w-full max-w-lg p-10 rounded-3xl shadow-2xl backdrop-blur-lg bg-deep_indigo/80 md:w-2/3 lg:w-1/2"
              data-aos="fade-up"
              data-aos-delay="100"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                maxHeight: '85vh',
                overflowY: 'auto',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <motion.h2
                className="mb-10 font-heading text-6xl font-extrabold text-lemon_chiffon tracking-tight leading-snug"
                data-aos="fade-left"
              >
                My Planet
              </motion.h2>
              <motion.p
                className="mb-10 font-description text-2xl text-champagne_pink leading-relaxed tracking-wider"
                data-aos="fade-right"
              >
                Am I on a spaceship as big as a planet, and could it be called Earth? Theoretically, yes.
              </motion.p>
              <motion.p
                className="mb-10 font-description text-xl text-tea_rose leading-relaxed tracking-wide"
                data-aos="zoom-in"
              >
                My duty is to maintain my spaceship&apos;s computer program and keep it running smoothly. I love these systems. I have worked with Python, C, and C++ to create complex, interactive simulations.
              </motion.p>
              <motion.p
                className="mb-10 font-description text-xl text-pink_lavender leading-relaxed tracking-wide"
                data-aos="flip-up"
              >
                But knowing this isn&apos;t enough. I need to explore other parts of my satellite and connect with experts who can guide me in my endless pursuit of knowledge.
              </motion.p>
              <motion.p
                className="font-description text-xl text-mauve leading-relaxed tracking-wide"
                data-aos="fade-up"
              >
                Art has been one of humanity&apos;s first creations—it's a natural language. I, too, am a binary sculptor, carrying the essence of Homo sapiens.
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.section>

    );
};

export default About;
