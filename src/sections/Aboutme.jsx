import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const About = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Set the default duration for animations
            once: true, // Make sure the animation happens only once
        });
    }, []);

    return (
        <motion.section
            id="about"
            className="relative flex flex-col items-end justify-center min-h-screen p-6 mt-16 md:p-8"
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
                className="relative z-10 flex flex-col items-end w-full max-w-4xl text-neutral"
                style={{
                    pointerEvents: "none", // Ensure the content container doesn't block the 3D model
                }}
            >
                {/* Floating Writing Card with AOS animations */}
                <motion.div
                    className="w-full p-6 text-center text-white bg-opacity-100 rounded-lg shadow-2xl md:w-3/4 lg:w-1/2"
                    data-aos="fade-up" // Fade up animation for the content card
                    data-aos-delay="100"
                    style={{
                        backdropFilter: "blur(1px)",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        maxHeight: "90vh",
                        overflowY: "auto",
                        zIndex: 10,
                    }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2
                        className="mb-4 font-serif text-2xl font-bold sm:text-3xl text-gradient"
                        data-aos="fade-left" // Fade left for the heading
                    >
                        My Odyssey
                    </h2>
                    <p
                        className="mb-4 font-sans text-base sm:text-lg text-accent2Light"
                        data-aos="fade-right" // Fade right for paragraphs
                    >
                        I’m Bushra Khandoker, a passionate creator navigating the realms of computer science and technology. My journey is driven by an insatiable curiosity and an unwavering commitment to learning. From crafting code in Python and C++ to exploring the world of 3D simulations and ethical hacking, I thrive on pushing boundaries and mastering new skills.
                    </p>
                    <p
                        className="mb-4 font-sans text-base sm:text-lg text-accent2Light"
                        data-aos="zoom-in" // Zoom-in effect for this paragraph
                    >
                        Currently, I’m preparing to embark on an academic journey, applying for undergraduate scholarships to immerse myself in world-class education. My ambition is to blend creativity with technology, solving complex challenges and creating innovative solutions that leave a meaningful impact on the world.
                    </p>
                    <p
                        className="mb-4 font-sans text-base sm:text-lg text-accent2Light"
                        data-aos="flip-up" // Flip up effect for this paragraph
                    >
                        Outside of the digital world, I embrace my creative spirit through sketching and exploring artistic compositions. I believe in balancing analytical precision with imaginative expression, which fuels my passion for both technology and the arts.
                    </p>
                    <p
                        className="font-sans text-base sm:text-lg text-accent2Light"
                        data-aos="fade-up" // Fade-up effect for the final paragraph
                    >
                        Feel free to explore my portfolio and see how my journey unfolds through my projects, skills, and passions.
                    </p>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default About;
