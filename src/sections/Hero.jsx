import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import profileImage from "../assets/Bushra.png";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const scrollRef = useRef(null);
    const profileRef = useRef(null);
    const buttonRef = useRef(null);

    const [particles, setParticles] = useState([]);

    const handleMouseEnter = (e) => {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const xPos = buttonRect.left + buttonRect.width / 2;
        const yPos = buttonRect.top + buttonRect.height / 2;

        const particlesArray = [];
        for (let i = 0; i < 30; i++) {
            particlesArray.push({
                x: xPos,
                y: yPos,
                key: Math.random(),
            });
        }

        setParticles(particlesArray);
    };

    const handleMouseLeave = () => {
        setParticles([]);
    };

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
                className="mt-4 text-lg sm:text-xl md:text-2xl text-glow text-secondaryLight"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
              >
                This is my world.
              </motion.p>
              <motion.h1
                className="text-4xl font-bold text-left text-transparent sm:text-5xl md:text-6xl bg-gradient-to-r from-secondaryLight to-accent1 bg-clip-text sm:-mt-10 md:-mt-12"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <br />Living Stars✨<br />
              </motion.h1>
              <motion.p
                className="mt-4 text-lg sm:text-xl md:text-2xl text-glow text-accent2Light"
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
            
            <motion.div
              ref={profileRef}
              className="lg:mt-0 lg:ml-12 sm:-mt-10 md:-mt-12"
              style={{ pointerEvents: "none" }}
            >
              <img
                src={profileImage}
                alt="Bushra Khandoker"
                className="transition-transform duration-300 transform shadow-2xl hover:scale-105 lg:w-[400px] lg:h-[400px] sm:w-[350px] sm:h-[350px] xs:w-[300px] xs:h-[300px] max-w-full h-auto"
                loading="lazy"
                style={{
                  width: "clamp(520px, 20vw, 520px)",
                  height: "clamp(520px, 20vw, 520px)",
                  objectFit: "cover",
                  clipPath: "polygon(50% 0%, 90% 15%, 100% 50%, 90% 85%, 50% 100%, 10% 85%, 0% 50%, 10% 15%)",
                  boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.15)",
                }}
              />
            </motion.div>
          </div>
            
          <motion.button
            ref={buttonRef}
            className="relative px-8 py-3 mt-6 text-lg font-semibold text-white transition-all duration-500 transform border-2 border-transparent rounded-xl bg-gradient-to-r from-accent2 to-accent2Light hover:bg-transparent hover:border-accent2 hover:text-white hover:scale-110 hover:rotate-6 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-accent2 focus:ring-opacity-50"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
              transition: { type: "spring", stiffness: 200, damping: 25 },
            }}
            whileTap={{
              scale: 0.95,
              transition: { type: "spring", stiffness: 200, damping: 25 },
            }}
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ pointerEvents: "auto" }}
          >
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <i className="mr-2 fas fa-arrow-right"></i>
              Explore my planet
              
            </motion.div>
        
            <span className="absolute bottom-0 left-0 w-full h-1 transition-transform origin-left scale-x-0 bg-accent2 group-hover:scale-x-100"></span>
        
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-50">
              {particles.map((particle) => (
                <motion.div
                  key={particle.key}
                  className="absolute w-2 h-2 rounded-full bg-accent2"
                  style={{
                    left: `${particle.x - buttonRef.current.offsetLeft - 10}px`,
                    top: `${particle.y - buttonRef.current.offsetTop - 5}px`,
                  }}
                  animate={{
                    x: [0, Math.random() * 300 - 150],
                    y: [0, Math.random() * 300 - 150],
                    opacity: [1, 0],
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                    duration: 9.5,
                    repeat: 20,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          </motion.button>
            
          <motion.div
            className="absolute px-4 text-center text-white bottom-16 md:bottom-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ pointerEvents: "none" }}
          >
            <p className="-mt-20 text-sm sm:text-md text-glow text-accent2Light">
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
