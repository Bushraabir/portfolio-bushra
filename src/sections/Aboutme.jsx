import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import Tilt from "react-parallax-tilt";
import { LazyLoadComponent } from "react-lazy-load-image-component";

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const particleCount = 100;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 5 + 1,
      speedX: Math.random() * 1 - 0.5,
      speedY: Math.random() * 1 - 0.5,
      color: `hsl(${Math.random() * 60 + 300}, 80%, 70%)`,
      glow: Math.random() * 0.6 + 0.4,
    }));

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((particle, i) => {
        const dx = mousePos.current.x - particle.x;
        const dy = mousePos.current.y - particle.y;
        const distanceToMouse = Math.hypot(dx, dy);
        const force = distanceToMouse < 200 ? -200 / (distanceToMouse + 1) : 0;
        particle.speedX += (dx * force) / 8000;
        particle.speedY += (dy * force) / 8000;

        particle.x += particle.speedX * 0.9;
        particle.y += particle.speedY * 0.9;
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -0.85;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -0.85;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;
        ctx.fill();

        particlesRef.current.forEach((otherParticle, j) => {
          if (i !== j) {
            const distance = Math.hypot(particle.x - otherParticle.x, particle.y - otherParticle.y);
            if (distance < 150) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(241, 192, 232, ${1 - distance / 150})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        });
      });
      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" style={{ top: 0 }} />;
};

const About = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -120]), { stiffness: 120, damping: 22 });
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.85, 1]), { stiffness: 150, damping: 20 });
  const rotateX = useTransform(scrollYProgress, [0, 1], [8, -8]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.5, 1]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    AOS.init({ duration: isMobile ? 600 : 1000, once: false, mirror: true });
  }, [isMobile]);

  const sectionPadding = useMemo(() => (isMobile ? "p-4 mt-0" : "p-8 mt-0"), [isMobile]);
  const containerClass = useMemo(
    () =>
      isMobile
        ? "w-full max-w-md p-4 rounded-2xl shadow-2xl backdrop-blur-xl bg-indigo-900/40"
        : "w-full max-w-3xl p-8 rounded-3xl shadow-2xl backdrop-blur-xl bg-indigo-900/40",
    [isMobile]
  );
  const h2Class = useMemo(
    () =>
      isMobile
        ? "mb-6 font-heading text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent tracking-tight leading-snug"
        : "mb-10 font-heading text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent tracking-tight leading-snug",
    [isMobile]
  );
  const pClass = useMemo(
    () =>
      isMobile
        ? "mb-6 font-description text-sm md:text-base text-pink-100 leading-relaxed tracking-wider"
        : "mb-8 font-description text-lg text-pink-100 leading-relaxed tracking-wider",
    [isMobile]
  );
const buttonClass = useMemo(
  () =>
    isMobile
      ? "mt-6 px-4 py-2 text-sm font-cta text-deep_indigo bg-gradient-to-r from-jordy_blue via-electric_blue to-aquamarine rounded-xl transition-all duration-300 hover:bg-gradient-to-l hover:from-aquamarine hover:via-electric_blue hover:to-jordy_blue hover:shadow-2xl hover:scale-105 active:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-pink_lavender focus:ring-opacity-70 animate-pulse"
      : "mt-8 px-6 py-3 text-lg font-cta text-deep_indigo bg-gradient-to-r from-jordy_blue via-electric_blue to-aquamarine rounded-xl transition-all duration-300 hover:bg-gradient-to-l hover:from-aquamarine hover:via-electric_blue hover:to-jordy_blue hover:shadow-2xl hover:scale-105 active:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-pink_lavender focus:ring-opacity-70 animate-pulse",
  [isMobile]
);
  const sectionTransition = { duration: isMobile ? 0.7 : 1.2, ease: [0.68, -0.55, 0.265, 1.55] };
  const containerTransition = { duration: isMobile ? 0.6 : 0.9, ease: "anticipate" };
  const textVariants = {
    hidden: { opacity: 0, y: 60, rotateX: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.68, -0.55, 0.265, 1.55],
        type: "spring",
        bounce: 0.5
      } 
    },
  };

  const handleExploreClick = () => {
    const element = document.getElementById("achievements");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      className={`relative flex flex-col items-center justify-center h-screen ${sectionPadding} bg-gradient-to-b from-indigo-950/50 to-transparent`}
      initial={{ opacity: 0, y: 150 }}
      animate={{ opacity: 1, y: 0 }}
      transition={sectionTransition}
    >
      <LazyLoadComponent>
        <ParticleBackground />
      </LazyLoadComponent>
      <motion.div
        className="relative z-10 w-full max-w-5xl"
        style={{ y, scale, rotateX, opacity }}
        initial={{ y: 120, scale: 0.85, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={containerTransition}
      >
        <Tilt
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          perspective={1200}
          scale={1.01}
          transitionSpeed={800}
          className="w-full touch-pan-y"
        >
          <motion.div
            className={`${containerClass} border border-transparent hover:border-blue-500/50 transition-all duration-600 hover:shadow-[0_0_50px_rgba(163,196,243,0.8)]`}
            initial={{ scale: 0.9, opacity: 0, rotateY: 15 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100, damping: 12 }}
            style={{
              background: "linear-gradient(45deg, rgba(42, 27, 61, 0.4), rgba(207, 186, 240, 0.4))",
              borderRadius: "1.5rem",
              overflowY: "auto",
              maxHeight: "90vh",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <motion.h2
              className={h2Class}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              data-aos="zoom-in-up"
              data-aos-delay="100"
            >
              My Planet
            </motion.h2>
            <motion.p
              className={pClass}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Am I on a spaceship as big as a planet, and could it be called Earth? Theoretically, yes.
            </motion.p>
            <motion.p
              className={pClass}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              My duty is to maintain my spaceship's computer program and keep it running smoothly. I love
              these systems. I have worked with Python, C, and C++ to create complex, interactive
              simulations.
            </motion.p>
            <motion.p
              className={pClass}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              But knowing this isn't enough. I need to explore other parts of my satellite and connect with
              experts who can guide me in my endless pursuit of knowledge.
            </motion.p>
            <motion.p
              className={pClass}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              Art has been one of humanity's first creations—it's a natural language. I, too, am a binary
              sculptor, carrying the essence of Homo sapiens.
            </motion.p>
            <motion.button
              className={buttonClass}
              style={{ scale }}
              whileTap={{ scale: 0.9, rotate: -3 }}
              onClick={handleExploreClick}
              data-aos="zoom-in"
              data-aos-delay="600"
            >
              Explore More
            </motion.button>
          </motion.div>
        </Tilt>
      </motion.div>
      <style jsx>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.section>
  );
};

export default About;