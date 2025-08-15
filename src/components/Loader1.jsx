import React, { useState, useEffect, useMemo, useCallback } from "react";
import Lottie from "react-lottie";
import loaderAnimation from "../assets/animation/loader1.json";

const FULL_TEXT = "Fetching my latest projects... 🔍";

const Loader1 = () => {
  const [displayedText, setDisplayedText] = useState("");

  // Memoized Lottie options
  const lottieOptions = useMemo(
    () => ({
      animationData: loaderAnimation,
      loop: true,
      autoplay: true,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    }),
    []
  );

  // Typing effect using requestAnimationFrame
  const animateText = useCallback(() => {
    let currentIndex = 0;
    let rafId;

    const updateText = () => {
      if (currentIndex < FULL_TEXT.length) {
        setDisplayedText(FULL_TEXT.slice(0, currentIndex + 1));
        currentIndex++;
        rafId = requestAnimationFrame(updateText);
      }
    };

    rafId = requestAnimationFrame(updateText);

    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(animateText, [animateText]);

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 to-teal-900">
      <div className="absolute inset-0 z-10">
        <Lottie options={lottieOptions} height="100%" width="100%" />
      </div>
      <div className="absolute inset-0 z-20 flex items-center justify-center p-4 text-center">
        <h className="text-xl font-bold text-yellow-200 sm:text-2xl md:text-3xl lg:text-4xl">
          {displayedText}
          <span className="inline-block animate-blink">|</span>
        </h>
      </div>
    </div>
  );
};

export default Loader1;