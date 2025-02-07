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
            className="relative flex flex-col items-center justify-center min-h-screen p-4 mt-16 pointer-events-none select-none md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ backgroundColor: "transparent" }}
        >
            <div className="absolute inset-0 z-0 pointer-events-none" />

            <motion.div
                className="relative z-10 flex flex-col items-end w-full max-w-5xl text-dark_teal"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <motion.div
                    className="w-full max-w-lg p-5 rounded-lg shadow-xl pointer-events-auto backdrop-blur-md bg-deep_indigo/80 md:w-2/3 lg:w-1/2"
                    data-aos="fade-up"
                    data-aos-delay="100"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{ maxHeight: "85vh", overflowY: "auto", backdropFilter: "blur(1px)", border: "1px solid rgba(255, 255, 255, 0.3)" }}
                >
                    <motion.h2
                        className="mb-4 font-serif text-2xl font-bold sm:text-3xl text-lemon_chiffon"
                        data-aos="fade-left"
                    >
                        My Planet
                    </motion.h2>
                    <motion.p
                        className="mb-4 font-sans text-base sm:text-lg text-champagne_pink"
                        data-aos="fade-right"
                    >
                        Am I on a spaceship as big as a planet, and could it be called Earth? Theoretically, yes.
                    </motion.p>
                    <motion.p
                        className="mb-4 font-sans text-base sm:text-lg text-tea_rose"
                        data-aos="zoom-in"
                    >
                        My duty is to maintain my spaceship's computer program and keep it runnable. I love these computer systems.
                        I have done various things using Python, C and C++. I love to visualize, so I create 3D simulations.
                    </motion.p>
                    <motion.p
                        className="mb-4 font-sans text-base sm:text-lg text-pink_lavender"
                        data-aos="flip-up"
                    >
                        But knowing this is not enough. I have to reach other parts of my satellite and connect with knowledgeable people
                        who will teach me more about the things I desire to learn.
                    </motion.p>
                    <motion.p
                        className="font-sans text-base sm:text-lg text-mauve"
                        data-aos="fade-up"
                    >
                        Art is one of the first things humans have done since their existence—it's a natural language. I am no exception.
                        I am actually a binary sculptor with the genes of Homo sapiens.
                    </motion.p>
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default About;
