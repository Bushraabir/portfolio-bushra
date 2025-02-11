import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import profileImage from "../assets/Bushra.png";
import resumePDF from "../assets/resume/Bushra.png";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const scrollRef = useRef(null);
    const profileRef = useRef(null);
    const buttonRef = useRef(null);

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

    return (
      <section
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12 pb-32 bg-transparent sm:px-12 md:px-16 lg:px-20 xl:px-32"
      style={{ pointerEvents: 'none' }}
    >
      <div className="relative flex flex-col items-center text-center lg:flex-row lg:text-left lg:justify-between lg:w-3/4 xl:w-2/3">
        {/* Text Content */}
        <div className="flex flex-col items-center lg:items-start">
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-glow text-lemon_chiffon font-description tracking-wider leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
          >
            This is my world.
          </motion.p>
          <motion.h1
            className="overflow-visible text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading text-transparent bg-gradient-to-r from-champagne_pink to-pink_lavender bg-clip-text leading-tight tracking-tight"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            <br />
            Living Stars✨
            <br />
          </motion.h1>
          <motion.p
            className="text-lg sm:text-2xl md:text-2xl text-glow text-mauve font-subheading tracking-wide leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
          >
            Every time I look up at the sky and wonder,
            <br />
            How massive is the universe? <br />
            How many intelligent lives are there?
            <br />
            Is there any intelligent being named <strong>Bushra Khandoker</strong>?
            <br /> I wonder...
          </motion.p>
        </div>

        <motion.div className="lg:ml-12 mt-8 lg:mt-0 flex justify-center">
          <img
            src={profileImage}
            alt="Bushra Khandoker"
            className="transition-transform duration-300 transform shadow-2xl hover:scale-105 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
            loading="lazy"
            style={{
              objectFit: 'cover',
              clipPath:
                'polygon(50% 0%, 90% 15%, 100% 50%, 90% 85%, 50% 100%, 10% 85%, 0% 50%, 10% 15%)'
            }}
          />
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-8 font-cta" style={{ pointerEvents: 'auto' }}>
        <motion.button
          className="relative px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-base sm:text-lg md:text-xl font-semibold text-white tracking-wider transition-all transform border-4 border-lemon_chiffon rounded-2xl bg-gradient-to-r from-non_photo_blue to-pink_lavender hover:bg-transparent hover:border-non_photo_blue hover:scale-110 focus:outline-none focus:ring-4 focus:ring-non_photo_blue"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          Explore my planet
        </motion.button>
        <motion.a
          href={resumePDF}
          download="Bushra_Khandoker_Resume.pdf"
          className="relative px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-base sm:text-lg md:text-xl font-semibold text-white tracking-wider transition-all transform border-4 border-lemon_chiffon rounded-2xl bg-gradient-to-r from-jordy_blue to-mauve hover:bg-transparent hover:border-jordy_blue hover:scale-110 focus:outline-none focus:ring-4 focus:ring-jordy_blue"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Download CV
        </motion.a>
      </div>


      <motion.div className="absolute flex justify-center w-full bottom-2 md:bottom-4">
        <div className="w-8 h-8 border-2 border-white rounded-full animate-bounce"></div>
      </motion.div>


      <motion.div
        className="absolute px-4 text-center text-white bottom-9 sm:bottom-6 md:bottom-9"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ pointerEvents: 'none' }}
      >
        <p className="text-sm sm:text-md text-glow text-jordy_blue tracking-wide leading-relaxed">
          ✨Our universe is similar to a bubble, and it is expanding like one as well.
          Want to see how a bubble is created and expands?
          <br />
          Simply tap on the screen, and you will see🎮
        </p>
      </motion.div>
    </section>



    );
};

export default Hero;