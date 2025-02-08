import React, { useEffect, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import { gsap } from "gsap";
import loaderAnimation from "../assets/animation/loader.json";

const Loader = () => {
  const shapeRefs = useRef([]);

  
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

  const lottieOptions = {
    animationData: loaderAnimation,
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const particleColors = [
    "linear-gradient(145deg, #fbf8cc, #fefef5)", 
    "linear-gradient(145deg, #fde4cf, #fff9f5)", 
    "linear-gradient(145deg, #ffcfd2, #fff6f6)", 
    "linear-gradient(145deg, #f1c0e8, #fcf2fa)", 
    "linear-gradient(145deg, #a3c4f3, #edf3fd)", 
    "linear-gradient(145deg, #90dbf4, #e9f8fd)", 
    "linear-gradient(145deg, #98f5e1, #ebfdf9)", 
    "linear-gradient(145deg, #2a1b3d, #1d142b)", 
  ];

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-deep_indigo to-dark_teal">

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

      <Lottie options={lottieOptions} height={350} width={350} className="z-20" />


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
