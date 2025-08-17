import React, { useState, useEffect, useMemo, useCallback } from "react";
import Lottie from "react-lottie";
import loaderAnimation from "../assets/animation/loader1.json";

/**
 * Loader1 Component
 *
 * A fullscreen animated loader with:
 * - Lottie background animation
 * - Typing text effect with blinking cursor
 * - Cycles through multiple text messages while loading
 *
 * Usage:
 * <Loader1 />
 *
 * NOTE: Replace simulated loading logic with your actual
 * data fetching / async operations in the parent component.
 */

// Array of texts that will be shown one by one
const LOADING_TEXTS = [
  "Setting up the environment... 🚀",
  "Fetching my latest projects... 🔍", 
  "Almost there, setting things up... ⚡",
  "Turning on the lights! ✨",
];

const Loader1 = () => {
  const [displayedText, setDisplayedText] = useState(""); // Current typing text
  const [textIndex, setTextIndex] = useState(0); // Index of current text in LOADING_TEXTS
  const [isLoading, setIsLoading] = useState(true); // Loader active state

  /**
   * Lottie animation options (memoized for performance)
   */
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

  /**
   * Typing effect using requestAnimationFrame
   *
   * Cycles through LOADING_TEXTS one by one.
   */
  const animateText = useCallback(() => {
    let currentIndex = 0;
    let rafId;

    const updateText = () => {
      const currentFullText = LOADING_TEXTS[textIndex];

      if (currentIndex < currentFullText.length) {
        setDisplayedText(currentFullText.slice(0, currentIndex + 1));
        currentIndex++;
        rafId = requestAnimationFrame(updateText);
      } else {
        // Pause before moving to the next text
        setTimeout(() => {
          setTextIndex((prev) => (prev + 1) % LOADING_TEXTS.length);
          setDisplayedText("");
        }, 1200);
      }
    };

    rafId = requestAnimationFrame(updateText);

    return () => cancelAnimationFrame(rafId);
  }, [textIndex]);

  /**
   * Simulate loading completion (replace with real async logic)
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000); // Loader will run for 10 seconds (adjust as needed)

    return () => clearTimeout(timer);
  }, []);

  /**
   * Start typing animation when loading starts or textIndex changes
   */
  useEffect(() => {
    if (isLoading) {
      const cleanup = animateText();
      return cleanup;
    }
  }, [animateText, isLoading, textIndex]);

  // When loading is finished, do not render loader
  if (!isLoading) return null;

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 to-teal-900">
      {/* Background Lottie Animation */}
      <div className="absolute inset-0 z-10">
        <Lottie
          options={lottieOptions}
          height="100%"
          width="100%"
          isStopped={!isLoading}
        />
      </div>

      {/* Typing Text with Blinking Cursor */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6 text-center">
        <h1
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-description text-yellow-200"
          style={{ fontSize: "clamp(1.25rem, 5vw, 2.5rem)" }}
        >
          {displayedText}
          <span className="inline-block animate-blink">|</span>
        </h1>
      </div>

      {/* Inline CSS for blinking effect */}
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
