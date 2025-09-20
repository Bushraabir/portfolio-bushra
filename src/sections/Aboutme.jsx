import React, { useEffect, useState, useRef, useCallback } from "react";


const About = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  /**
   * Enhanced device detection with tablet support
   */
  const checkDeviceType = useCallback(() => {
    const width = window.innerWidth;
    const isMobileDevice = width < 768 || 
      /Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTabletDevice = width >= 768 && width <= 1024;
    
    setIsMobile(isMobileDevice);
    setIsTablet(isTabletDevice);
  }, []);

  useEffect(() => {
    checkDeviceType();
    const resizeHandler = () => {
      requestAnimationFrame(checkDeviceType);
    };
    
    window.addEventListener("resize", resizeHandler, { passive: true });
    return () => window.removeEventListener("resize", resizeHandler);
  }, [checkDeviceType]);

  /**
   * Progressive animation system with staggered reveals
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stagger animations for better visual flow
          setTimeout(() => setAnimationStage(1), 200);
          setTimeout(() => setAnimationStage(2), 600);
          setTimeout(() => setAnimationStage(3), 1000);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "100px 0px -50px 0px",
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /**
   * Enhanced smooth scrolling with easing
   */
  const handleExploreClick = useCallback(() => {
    const element = document.getElementById("achievements");
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - 80;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, []);

  /**
   * Progressive enhancement for navigation
   */
  const handleWorksClick = useCallback(() => {
    // Add loading state for better UX
    const button = event.target.closest('button');
    if (button) {
      button.style.opacity = '0.7';
      button.style.transform = 'scale(0.95)';
    }
    
    setTimeout(() => {
      window.location.href = "/my-works";
    }, 150);
  }, []);

  /**
   * Enhanced button interaction with haptic feedback simulation
   */
  const createButtonHandler = useCallback((scale, rotation = 0) => (e) => {
    const button = e.currentTarget;
    button.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
    button.style.transition = 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)';
    
    // Simulate haptic feedback on mobile
    if (isMobile && navigator.vibrate) {
      navigator.vibrate(10);
    }
  }, [isMobile]);

  const handleButtonPress = createButtonHandler(0.95, -1);
  const handleButtonRelease = createButtonHandler(1, 0);

  /**
   * Enhanced content with better storytelling structure
   */
  const aboutContent = {
    introduction: "I'm Bushra, and for me, imagination is never enough—I need to see it come alive. Late at night, I'll often find myself with a sketch in one hand and a laptop in front of me, chasing an idea line by line in code until it finally moves, breathes, or responds on the screen.",
    
    passion: "I love to draw, solve problems, and code in C, C++, and Python. But what excites me most is watching creativity and logic collide. Whether I'm shaping 3D frontend designs or building something like Relivia—an app I created to help people manage anxiety and panic attacks—every project tells a story of discovery.",
    
    leadership: "My passion extends beyond personal projects. As founder and vice president of Empowered, I've learned that the most meaningful work happens when you step outside your own code and into your community. Launching initiatives and helping others grow has shown me that true impact isn't just about what I create—it's about what we build together.",
    
    philosophy: "Challenges don't scare me—they energize me. Every debugging session, every design problem, every community event sharpens my curiosity and pushes me further. That sense of adventure, whether in technology or in empowering others, is what drives me forward into uncharted territory."
  };

  /**
   * Responsive design system
   */
  const getResponsiveClasses = () => ({
    container: isMobile 
      ? "w-full max-w-sm mx-auto p-5 rounded-2xl"
      : isTablet
        ? "w-full max-w-2xl mx-auto p-6 rounded-3xl"
        : "w-full max-w-4xl mx-auto p-8 lg:p-10 rounded-3xl",
    
    heading: isMobile
      ? "text-3xl sm:text-4xl mb-6"
      : isTablet
        ? "text-4xl sm:text-5xl mb-8"
        : "text-5xl lg:text-6xl mb-10",
    
    text: isMobile
      ? "text-sm leading-relaxed mb-5"
      : isTablet
        ? "text-base leading-relaxed mb-6"
        : "text-lg leading-relaxed mb-8",
    
    button: isMobile
      ? "px-6 py-3 text-sm rounded-2xl w-full"
      : isTablet
        ? "px-7 py-3 text-base rounded-2xl"
        : "px-8 py-4 text-lg rounded-3xl",
    
    buttonContainer: isMobile
      ? "flex flex-col gap-4 mt-8"
      : "flex flex-row gap-6 mt-10 justify-center"
  });

  const classes = getResponsiveClasses();

  return (
    <>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Bushra",
            "jobTitle": "Software Developer & Community Leader",
            "description": "Passionate developer specializing in C, C++, Python, and 3D frontend design. Founder of Empowered community initiative.",
            "knowsAbout": ["Software Development", "Community Leadership", "Anxiety Management Apps", "3D Design"],
            "memberOf": {
              "@type": "Organization",
              "name": "Empowered"
            }
          })
        }}
      />

      <section
        ref={sectionRef}
        id="about"
        aria-labelledby="about-heading"
        role="main"
        className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 lg:py-20"
        style={{
          background: "transparent",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(40px)",
          transition: "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        }}
      >
        {/* Enhanced background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-1/4 -left-32 w-64 h-64 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(163,196,243,0.4) 0%, transparent 70%)",
              filter: "blur(4px)",
              animation: isVisible ? "float 8s ease-in-out infinite" : "none"
            }}
          />
          <div 
            className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-15"
            style={{
              background: "radial-gradient(circle, rgba(152,245,225,0.3) 0%, transparent 70%)",
              filter: "blur(6px)",
              animation: isVisible ? "float 10s ease-in-out infinite reverse" : "none"
            }}
          />
        </div>

        {/* Main content */}
        <article 
          ref={contentRef}
          className="relative z-10 w-full max-w-6xl px-4"
          style={{
            transform: animationStage >= 1 ? "rotateY(0deg) scale(1)" : "rotateY(3deg) scale(0.98)",
            transition: "transform 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
          }}
        >
          <div
            className={`${classes.container} relative`}
            style={{
              background: isMobile
                ? "linear-gradient(145deg, rgba(42, 27, 61, 0.65) 0%, rgba(152, 245, 225, 0.25) 100%)"
                : "linear-gradient(135deg, rgba(42, 27, 61, 0.6) 0%, rgba(163, 196, 243, 0.2) 50%, rgba(152, 245, 225, 0.3) 100%)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(198, 159, 178, 0.3)",
              boxShadow: `
                0 20px 40px rgba(42, 27, 61, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                0 0 0 1px rgba(152, 245, 225, 0.1)
              `,
              transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              transform: isVisible ? "translateZ(0)" : "translateZ(0) rotateX(5deg)"
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = "translateZ(0) scale(1.02)";
                e.currentTarget.style.boxShadow = `
                  0 30px 60px rgba(42, 27, 61, 0.5),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  0 0 0 1px rgba(152, 245, 225, 0.3),
                  0 0 40px rgba(152, 245, 225, 0.2)
                `;
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = "translateZ(0) scale(1)";
                e.currentTarget.style.boxShadow = `
                  0 20px 40px rgba(42, 27, 61, 0.4),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1),
                  0 0 0 1px rgba(152, 245, 225, 0.1)
                `;
              }
            }}
          >
            {/* Header Section */}
            <header className="mb-8 lg:mb-12">
              <h1
                id="about-heading"
                className={`font-extrabold font-heading bg-gradient-to-r from-jordy_blue via-aquamarine to-champagne_pink bg-clip-text text-transparent tracking-tight leading-tight text-center ${classes.heading}`}
                style={{
                  opacity: animationStage >= 1 ? 1 : 0,
                  transform: animationStage >= 1 ? "translateY(0) rotateX(0deg)" : "translateY(30px) rotateX(8deg)",
                  transition: "all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.2s",
                  textShadow: "0 4px 20px rgba(163, 196, 243, 0.3)"
                }}
              >
                About Me
              </h1>
              
              {/* Decorative line */}
              <div 
                className="mx-auto mt-4 h-1 bg-gradient-to-r from-transparent via-aquamarine to-transparent rounded-full"
                style={{
                  width: animationStage >= 1 ? (isMobile ? "60px" : "80px") : "0px",
                  transition: "width 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.4s"
                }}
              />
            </header>

            {/* Content Paragraphs */}
            <div className="space-y-6 lg:space-y-8">
              {Object.entries(aboutContent).map(([key, text], index) => (
                <p
                  key={key}
                  className={`font-description text-champagne_pink tracking-wide ${classes.text}`}
                  style={{
                    opacity: animationStage >= 2 ? 1 : 0,
                    transform: animationStage >= 2 ? "translateY(0) rotateX(0deg)" : "translateY(25px) rotateX(3deg)",
                    transition: `all 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${0.4 + index * 0.15}s`
                  }}
                >
                  {text}
                </p>
              ))}
            </div>

            {/* Enhanced CTA Section */}
            <div
              className={classes.buttonContainer}
              style={{
                opacity: animationStage >= 3 ? 1 : 0,
                transform: animationStage >= 3 ? "translateY(0) scale(1)" : "translateY(30px) scale(0.9)",
                transition: "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) 1.2s"
              }}
            >
              {[
                {
                  text: "Explore My Universe",
                  handler: handleExploreClick,
                  ariaLabel: "Navigate to achievements section to explore my projects and accomplishments",
                  icon: "🚀"
                },
                {
                  text: "View My Works",
                  handler: handleWorksClick,
                  ariaLabel: "Navigate to portfolio page to see my complete project collection",
                  icon: "💼"
                }
              ].map((button, index) => (
                <button
                  key={button.text}
                  type="button"
                  className={`${classes.button} group relative overflow-hidden font-bold font-cta text-gray-900 transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-aquamarine/50 focus:ring-offset-2 focus:ring-offset-transparent`}
                  onClick={button.handler}
                  onMouseDown={handleButtonPress}
                  onMouseUp={handleButtonRelease}
                  onMouseLeave={handleButtonRelease}
                  onTouchStart={handleButtonPress}
                  onTouchEnd={handleButtonRelease}
                  aria-label={button.ariaLabel}
                  style={{
                    background: "linear-gradient(135deg, rgba(163, 196, 243, 0.9) 0%, rgba(152, 245, 225, 0.9) 100%)",
                    boxShadow: "0 10px 25px rgba(163, 196, 243, 0.4)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)"
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.target.style.background = "linear-gradient(135deg, rgba(152, 245, 225, 0.9) 0%, rgba(163, 196, 243, 0.9) 100%)";
                      e.target.style.boxShadow = "0 15px 35px rgba(152, 245, 225, 0.5)";
                      e.target.style.transform = "translateY(-2px) scale(1.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "linear-gradient(135deg, rgba(163, 196, 243, 0.9) 0%, rgba(152, 245, 225, 0.9) 100%)";
                    e.target.style.boxShadow = "0 10px 25px rgba(163, 196, 243, 0.4)";
                    e.target.style.transform = "translateY(0) scale(1)";
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-4">
                    <span className="hidden sm:inline">{button.icon}</span>
                    {button.text}
                  </span>
                  
                  {/* Button shine effect */}
                  <div 
                    className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:animate-pulse"
                    style={{
                      left: "-100%",
                      transition: "left 0.6s ease-in-out",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </article>

        {/* Enhanced CSS animations */}
        <style jsx>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            33% {
              transform: translateY(-15px) rotate(1deg);
            }
            66% {
              transform: translateY(-5px) rotate(-0.5deg);
            }
          }

          @keyframes shimmer {
            0% {
              left: -100%;
            }
            100% {
              left: 100%;
            }
          }

          .group:hover .animate-pulse {
            left: 100%;
          }

          /* Smooth scrolling enhancement */
          html {
            scroll-behavior: smooth;
          }

          /* Hide scrollbars while maintaining functionality */
          ::-webkit-scrollbar {
            display: none;
          }
          
          * {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          /* Enhanced font rendering */
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }

          /* Focus enhancement for accessibility */
          button:focus-visible {
            outline: 3px solid rgba(152, 245, 225, 0.8);
            outline-offset: 3px;
            box-shadow: 0 0 0 6px rgba(152, 245, 225, 0.2);
          }

          /* Mobile optimizations */
          @media (max-width: 768px) {
            .font-heading {
              font-size: clamp(1.75rem, 8vw, 2.5rem);
              line-height: 1.2;
            }
            
            .font-description {
              font-size: clamp(0.875rem, 4vw, 1.125rem);
              line-height: 1.6;
            }

            button {
              min-height: 48px; /* Accessibility requirement for touch targets */
            }
          }

          /* Reduced motion support */
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }

          /* High contrast mode support */
          @media (prefers-contrast: high) {
            button {
              border: 2px solid currentColor;
            }
          }

          /* GPU acceleration */
          .transform {
            transform: translateZ(0);
            will-change: transform;
            backface-visibility: hidden;
          }
        `}</style>
      </section>
    </>
  );
};

export default About;