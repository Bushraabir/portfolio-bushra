import React, { useState, useEffect, useMemo } from "react";
import Lottie from "react-lottie";
import loaderAnimation from "../assets/animation/loader1.json";

const fullText = "wait a sec let me create the world for You! 😊";

const Loader1 = () => {
  const [displayedText, setDisplayedText] = useState("");

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

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex++;
      setDisplayedText(fullText.slice(0, currentIndex));
      if (currentIndex >= fullText.length) {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen bg-gradient-to-br from-deep_indigo to-dark_teal flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-10">
        <Lottie options={lottieOptions} height="100%" width="100%" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-20 text-center p-4">
        <h2 className="text-lemon_chiffon text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold front-description">
          {displayedText}
          <span className="inline-block blinking-cursor">|</span>
        </h2>
      </div>
      <style jsx>{`
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
        .blinking-cursor {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default Loader1;