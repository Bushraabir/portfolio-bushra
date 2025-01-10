import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    useEffect(() => {
        // GSAP animations for scroll-triggered effects
        gsap.fromTo(
            "#about h2",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: "#about",
                    start: "top center",
                },
            }
        );

        gsap.fromTo(
            "#about p",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: "#about",
                    start: "top center",
                },
            }
        );
    }, []);

    return (
        <motion.section
            id="about"
            className="relative flex flex-col items-center justify-between min-h-screen p-4 mt-16 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
                backgroundColor: "transparent",
                pointerEvents: "none", // Ensure the section allows interactions
            }}
        >
            {/* 3D Model Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    pointerEvents: "none", // Ensure interactions with the 3D background
                }}
            >
                {/* Placeholder for 3D Model */}

                {/* Replace this with actual 3D model rendering */}
            </div>

            {/* Content Section */}
            <div
                className="relative z-10 flex flex-col items-end w-full md:w-auto text-balance"
                style={{
                    pointerEvents: "none", // Ensure the content container doesn't block the 3D model
                }}
            >
                {/* Floating Writing Card */}
                <motion.div
                    className="p-6 text-center shadow-lg text-whiterounded-lg md:w-1/3 bg-opacity-40 md:text-left"
                    style={{
                        backdropFilter: "blur(5px)",
                        maxHeight: "90vh",
                        overflowY: "auto",
                        zIndex: 10,
                    }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="mb-4 text-2xl font-bold sm:text-3xl">My Odyssey</h2>
                    <p className="mb-4 text-base sm:text-lg">
                        I’m Bushra Khandoker, a passionate creator navigating the realms of computer science and technology. My journey is driven by an insatiable curiosity and an unwavering commitment to learning. From crafting code in Python and C++ to exploring the world of 3D simulations and ethical hacking, I thrive on pushing boundaries and mastering new skills.
                    </p>
                    <p className="mb-4 text-base sm:text-lg">
                        Currently, I’m preparing to embark on an academic journey, applying for undergraduate scholarships to immerse myself in world-class education. My ambition is to blend creativity with technology, solving complex challenges and creating innovative solutions that leave a meaningful impact on the world.
                    </p>
                    <p className="mb-4 text-base sm:text-lg">
                        Outside of the digital world, I embrace my creative spirit through sketching and exploring artistic compositions. I believe in balancing analytical precision with imaginative expression, which fuels my passion for both technology and the arts.
                    </p>
                    <p className="text-base sm:text-lg">
                        Feel free to explore my portfolio and see how my journey unfolds through my projects, skills, and passions.
                    </p>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default About;
