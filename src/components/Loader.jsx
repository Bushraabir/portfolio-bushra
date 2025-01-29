import React, { useEffect, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import { gsap } from "gsap";
import loaderAnimation from "../assets/animation/loader.json";

const Loader = () => {
  const shapeRefs = useRef([]);

  // GSAP's advanced particle animation with random movement, scaling, and rotation
  const glideMotion = (element) => {
    if (!element) return;
  
    const randomX = Math.random() * 500 - 250;
    const randomY = Math.random() * 500 - 250;
    const randomScale = Math.random() * 0.5 + 0.8;
    const randomRotation = Math.random() * 360;
    const randomDuration = Math.random() * 10 + 15; 
    const randomDelay = Math.random() * 5;
  
    gsap.to(element, {
      x: randomX,
      y: randomY,
      scale: randomScale,
      rotation: randomRotation,
      duration: randomDuration,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      delay: randomDelay,
    });
  };
  

  useLayoutEffect(() => {
    shapeRefs.current.forEach((el) => glideMotion(el));
  }, []);

  // Lottie animation options
  const lottieOptions = {
    animationData: loaderAnimation,
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const particleColors = [
    "linear-gradient(145deg, #007C8A, #FFC857)", // Teal to Gold
    "linear-gradient(145deg, #FF6F3C, #ADA7C9)", // Burnt Orange to Lavender
    "linear-gradient(145deg, #00A7D0, #F79D7D)", // Bright Turquoise to Soft Coral
    "linear-gradient(145deg, #4FC7E2, #E6B800)", // Light Turquoise to Golden Yellow
    "linear-gradient(145deg, #F2D966, #F26B38)", // Light Yellow to Soft Coral
    "linear-gradient(145deg, #1C273B, #00A7D0)", // Dark Blue to Turquoise
  ];

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-primary to-primaryLight">
      {/* Particle animation in the background */}
      <motion.div
        className="absolute top-0 left-0 z-10 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(10)].map((_, index) => (
          <motion.div
            ref={(el) => (shapeRefs.current[index] = el)}
            key={index}
            className="absolute shape"
            style={{
              width: `${Math.random() * 60 + 40}px`,
              height: `${Math.random() * 60 + 40}px`,
              background: particleColors[index % particleColors.length],
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 80}%`,
              borderRadius: "50%",
              boxShadow: `0 0 ${Math.random() * 15 + 10}px rgba(0, 0, 0, 0.3)`,
              filter: `blur(${Math.random() * 3 + 1}px)`,
              opacity: Math.random() * 0.5 + 0.4,
            }}
          />
        ))}
      </motion.div>

      {/* Lottie animation in the foreground */}
      <Lottie options={lottieOptions} height={350} width={350} className="z-20" />

      {/* Animated message below Lottie */}
      <motion.div
        className="absolute z-30 text-xl text-center text-white bottom-20 sm:text-2xl md:text-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 1 }}
      >
        <p>Hey... wait a sec...</p>
      </motion.div>
    </div>
  );
};

export default Loader;
