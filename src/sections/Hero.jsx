import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import profileImage from "../assets/Bushra.png";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const scrollRef = useRef(null);
    const profileRef = useRef(null);

    useEffect(() => {
        // Animate the scroll indicator
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

        // GSAP animation for profile image when page loads
        gsap.fromTo(
            profileRef.current,
            { opacity: 0, scale: 0.8, rotation: 20 }, // Initial state
            {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 1.5,
                ease: "power3.out", // Easing function
            }
        );
    }, []);

    return (
        <section
            className="relative flex flex-col items-center justify-center min-h-screen p-6"
            style={{
                backgroundColor: "transparent",
                zIndex: 1,
                pointerEvents: "none", // Ensure background remains interactive
            }}
        >
            {/* Text and Profile Image */}
            <div
                className="relative flex flex-col items-center text-center lg:flex-row lg:text-left lg:justify-between lg:w-3/4"
                style={{ pointerEvents: "none" }}
            >
                {/* Main Text */}
                <div className="flex flex-col items-center text-left lg:items-start">
                <motion.p
    className="mt-4 text-lg sm:text-xl md:text-2xl text-glow"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
>
Welcome to My Odyssey
</motion.p>
                <motion.h1
    className="text-4xl font-bold text-left text-transparent sm:text-5xl md:text-6xl bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1.5, ease: "easeOut" }}
>
    
    <br />I'm Bushra Khandoker<br/>
</motion.h1>
<motion.p
    className="mt-4 text-lg sm:text-xl md:text-2xl text-glow"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
>
    A visionary creator on a journey to blend technology with creativity. <br />
    Fueled by curiosity and a passion for innovation, <br />
    I'm shaping the future with bold ideas and creative solutions.
</motion.p>
                    <motion.button
                        className="px-8 py-3 mt-6 text-white hero-btn hero-btn:hover focus:outline-none"
                        style={{ pointerEvents: "auto" }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                            document
                                .getElementById("about")
                                ?.scrollIntoView({ behavior: "smooth" })
                        }
                    >
                        Unfold More
                    </motion.button>
                </div>

                {/* Profile Image */}
                <motion.div
                    ref={profileRef}
                    className="mt-8 lg:mt-0 lg:ml-12"
                    style={{ pointerEvents: "none" }}
                >
                    <img
                        src={profileImage}
                        alt="Bushra Khandoker"
                        className="transition-transform duration-300 transform shadow-lg hover:scale-102"
                        style={{
                            width: "clamp(520px, 20vw, 520px)", // Default size
                            height: "clamp(520px, 20vw, 520px)", // Default size
                            objectFit: "cover",
                            clipPath: "polygon(50% 0%, 90% 15%, 100% 50%, 90% 85%, 50% 100%, 10% 85%, 0% 50%, 10% 15%)", // Soft, angular, professional shape
                            boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.15)", // Soft, refined shadow
                        }}
                        className="lg:w-[400px] lg:h-[400px]" // Larger size on large screens
                    />
                </motion.div>
            </div>

            {/* Instruction */}
            <motion.div
                className="absolute text-center text-white bottom-16"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{ pointerEvents: "none" }}
            >
                <p className="text-sm sm:text-md text-glow">
                    ✨ Psst! Did you know you can play with the floating balls? Give it a try! 🎮
                </p>
            </motion.div>

            {/* Scroll Indicator */}
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
