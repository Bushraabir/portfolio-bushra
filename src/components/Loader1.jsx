import React, { useState, useEffect, useMemo, useCallback } from "react";
import Lottie from "react-lottie";
import loaderAnimation from "../assets/animation/loader1.json";

const FULL_TEXT = "Fetching my latest projects... 🔍";

const Loader1 = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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

  // Simulate loading completion (replace with real loading logic in a parent component)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Simulate 3-second loading

    return () => clearTimeout(timer);
  }, []);

  // Start typing animation when component mounts
  useEffect(() => {
    if (isLoading) {
      const cleanup = animateText();
      return cleanup;
    }
  }, [animateText, isLoading]);

  // Return null when loading is complete
  if (!isLoading) {
    return null;
  }

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 to-teal-900">
      <div className="absolute inset-0 z-10">
        <Lottie options={lottieOptions} height="100%" width="100%" isStopped={!isLoading} />
      </div>
      <div className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6 text-center">
        <h1
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-200"
          style={{ fontSize: "clamp(1.25rem, 5vw, 2.5rem)" }}
        >
          {displayedText}
          <span className="inline-block animate-blink">|</span>
        </h1>
      </div>
      <style jsx>{`
        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 0.8s step-end infinite;
        }
      `}</style>
    </div>
  );
};

export default Loader1;