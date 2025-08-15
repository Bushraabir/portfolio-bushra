import React, { useEffect, useState, useRef, useCallback } from "react";
import Background from "../components/Background";

const About = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Optimized mobile detection
  const checkMobile = useCallback(() => {
    const mobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobile(mobile);
  }, []);

  // Mobile detection effect
  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]);

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.2,
        rootMargin: "50px"
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Smooth scroll function
  const handleExploreClick = useCallback(() => {
    const element = document.getElementById("achievements");
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }
  }, []);

  // Button interaction handlers
  const handleMouseDown = useCallback((e) => {
    e.target.style.transform = "scale(0.95) rotate(-1deg)";
  }, []);

  const handleMouseUp = useCallback((e) => {
    e.target.style.transform = "scale(1) rotate(0deg)";
  }, []);

  const handleMouseLeave = useCallback((e) => {
    e.target.style.transform = "scale(1) rotate(0deg)";
  }, []);

  // Content data
  const paragraphContent = [
    "Am I on a spaceship as big as a planet, and could it be called Earth? Theoretically, yes.",
    "My duty is to maintain my spaceship's computer program and keep it running smoothly. I love these systems. I have worked with Python, C, and C++ to create complex, interactive simulations.",
    "But knowing this isn't enough. I need to explore other parts of my satellite and connect with experts who can guide me in my endless pursuit of knowledge.",
    "Art has been one of humanity's first creations—it's a natural language. I, too, am a binary sculptor, carrying the essence of Homo sapiens.",
  ];

  // Dynamic styles based on device
  const styles = {
    section: {
      padding: isMobile ? "1rem" : "2rem",
      minHeight: "100vh"
    },
    container: isMobile 
      ? "w-full max-w-lg mx-auto p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl backdrop-blur-xl bg-deep_indigo/40"
      : "w-full max-w-4xl mx-auto p-6 sm:p-8 lg:p-10 rounded-3xl shadow-3xl backdrop-blur-xl bg-deep_indigo/40",
    
    heading: isMobile
      ? "mb-4 sm:mb-6 text-3xl sm:text-4xl font-heading font-extrabold bg-gradient-to-r from-jordy_blue to-aquamarine bg-clip-text text-transparent tracking-tight leading-tight"
      : "mb-6 sm:mb-8 lg:mb-10 text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold bg-gradient-to-r from-jordy_blue to-aquamarine bg-clip-text text-transparent tracking-tight leading-tight",
    
    paragraph: isMobile
      ? "mb-4 sm:mb-5 text-sm sm:text-base font-description text-champagne_pink leading-relaxed tracking-wide"
      : "mb-5 sm:mb-6 lg:mb-8 text-base sm:text-lg lg:text-xl font-description text-champagne_pink leading-relaxed tracking-wide",
    
    button: isMobile
      ? "mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-cta font-bold text-lemon_chiffon bg-gradient-to-r from-jordy_blue to-aquamarine rounded-2xl sm:rounded-3xl shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-gradient-to-l hover:shadow-[0_0_20px_rgba(163,196,243,0.8)] focus:outline-none focus:ring-4 focus:ring-aquamarine/50 active:scale-95"
      : "mt-6 sm:mt-8 px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg font-cta font-bold text-lemon_chiffon bg-gradient-to-r from-jordy_blue to-aquamarine rounded-3xl shadow-2xl backdrop-blur-sm transition-all duration-300 hover:bg-gradient-to-l hover:shadow-[0_0_25px_rgba(163,196,243,0.8)] focus:outline-none focus:ring-4 focus:ring-aquamarine/50 active:scale-95"
  };

  return (
    <div
      ref={sectionRef}
      id="about"
      className="relative flex flex-col items-center justify-center bg-gradient-to-b from-deep_indigo/80 via-dark_teal/50 to-transparent overflow-hidden"
      style={{
        ...styles.section,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {/* Background Component */}
      <Background />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl">
        <div
          className={`${styles.container} border border-mauve/30 hover:border-aquamarine/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(152,245,225,0.4)] transform hover:scale-[1.01]`}
          style={{
            background: isMobile
              ? "linear-gradient(135deg, rgba(42, 27, 61, 0.6), rgba(152, 245, 225, 0.25))"
              : "linear-gradient(45deg, rgba(42, 27, 61, 0.5), rgba(152, 245, 225, 0.3))",
            transform: isVisible
              ? "rotateY(0deg) scale(1)"
              : "rotateY(5deg) scale(0.98)",
            transition: "transform 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 1.2s ease-out",
            opacity: isVisible ? 1 : 0,
          }}
        >
          {/* Main Heading */}
          <h2
            className={styles.heading}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? "translateY(0) rotateX(0deg)"
                : "translateY(40px) rotateX(8deg)",
              transition: "all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.2s",
            }}
          >
            My Planet
          </h2>

          {/* Content Paragraphs */}
          {paragraphContent.map((text, index) => (
            <p
              key={index}
              className={styles.paragraph}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? "translateY(0) rotateX(0deg)"
                  : "translateY(30px) rotateX(5deg)",
                transition: `all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${
                  0.3 + index * 0.1
                }s`,
              }}
            >
              {text}
            </p>
          ))}

          {/* Call to Action Button */}
          <button
            className={styles.button}
            onClick={handleExploreClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? "translateY(0) scale(1)"
                : "translateY(40px) scale(0.9)",
              transition: "all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.7s",
            }}
            aria-label="Explore more about my achievements"
          >
            <span className="relative z-10">
              Explore My Universe
            </span>
          </button>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(60px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }

        .floating {
          animation: float 6s ease-in-out infinite;
        }

        /* Smooth scrolling for all browsers */
        html {
          scroll-behavior: smooth;
        }

        /* Hide scrollbars */
        ::-webkit-scrollbar {
          display: none;
        }
        
        * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        /* Enhanced focus states for accessibility */
        button:focus-visible {
          outline: 2px solid rgba(152, 245, 225, 0.8);
          outline-offset: 2px;
        }

        /* Responsive text scaling */
        @media (max-width: 480px) {
          .font-heading {
            font-size: clamp(1.5rem, 8vw, 2rem);
          }
          .font-description {
            font-size: clamp(0.875rem, 4vw, 1rem);
          }
        }

        /* Performance optimizations */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* GPU acceleration for animations */
        .transform {
          transform: translateZ(0);
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default About;