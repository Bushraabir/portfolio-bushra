import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import profileImage from "../assets/Bushra.png";

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
        <section className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 bg-transparent" style={{ pointerEvents: "none", fontFamily: "Montserrat, sans-serif" }}>
            <div className="relative flex flex-col items-center text-center lg:flex-row lg:text-left lg:justify-between lg:w-3/4">
                <div className="flex flex-col items-center text-left lg:items-start">
                    <motion.p
                        className="mt-4 text-lg sm:text-xl md:text-2xl text-glow text-lemon_chiffon"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                    >
                        This is my world.
                    </motion.p>
                    <motion.h1
                        className="text-4xl font-bold text-left text-transparent sm:text-5xl md:text-6xl bg-gradient-to-r from-champagne_pink to-pink_lavender bg-clip-text"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                        <br />Living Stars✨<br />
                    </motion.h1>
                    <motion.p
                        className="mt-4 text-lg sm:text-xl md:text-2xl text-glow text-mauve"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                    >
                        Every time I look up at the sky and wonder,<br/>
                        How massive is the universe? <br/>How many intelligent lives are there?<br/>
                        Is there any intelligent being named <strong>Bushra Khandoker</strong>?<br/> I wonder...
                    </motion.p>
                </div>
                
                <motion.div ref={profileRef} className="lg:mt-0 lg:ml-12 sm:-mt-10 md:-mt-12">
                    <img
                        src={profileImage}
                        alt="Bushra Khandoker"
                        className="transition-transform duration-300 transform shadow-2xl hover:scale-105 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
                        loading="lazy"
                        style={{ objectFit: "cover", clipPath: "polygon(50% 0%, 90% 15%, 100% 50%, 90% 85%, 50% 100%, 10% 85%, 0% 50%, 10% 15%)" }}
                    />
                </motion.div>
            </div>
            
            <motion.button
                ref={buttonRef}
                className="relative px-6 py-2 mt-6 text-lg font-semibold text-white transition-all transform border-4 border-lemon_chiffon rounded-xl bg-gradient-to-r from-non_photo_blue to-pink_lavender hover:bg-transparent hover:border-non_photo_blue hover:scale-110 focus:outline-none focus:ring-4 focus:ring-non_photo_blue"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                style={{ pointerEvents: "auto" }}
            >
                <motion.div className="flex items-center">
                    <i className="mr-2 fas fa-arrow-right"></i>
                    Explore my planet
                </motion.div>
            </motion.button>
            
            <motion.div ref={scrollRef} className="absolute flex justify-center w-full bottom-4">
                <div className="w-8 h-8 border-2 border-white rounded-full animate-bounce"></div>
            </motion.div>
            <motion.div
    className="absolute px-4 text-center text-white bottom-16 md:bottom-4"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    style={{ pointerEvents: "none" }}
  >
    <p className="-mt-20 text-sm sm:text-md text-glow text-jordy_blue">
      ✨Our universe is similar to a bubble, and it is expanding like one as well. Want to see how a bubble is created and expands? <br/>Simply tap on the screen, and you will see🎮
    </p>
  </motion.div>
    
  <motion.div
    ref={scrollRef}
    className="absolute flex justify-center w-full bottom-4"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    style={{ pointerEvents: "none" }}
  >
    <div className="w-8 h-8 border-2 border-white rounded-full animate-bounce"></div>
  </motion.div>
</section>
    );
};

export default Hero;
