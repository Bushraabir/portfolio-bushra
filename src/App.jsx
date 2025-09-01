import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "./components/Loader";
import Loader1 from "./components/Loader1";

const ParticleScene = React.lazy(() => import("./components/Particle"));
const Hero = React.lazy(() => import("./sections/Hero"));
const Websites = React.lazy(() => import("./sections/Websites"));
const Research = React.lazy(() => import("./sections/Research"));
const Art = React.lazy(() => import("./sections/Art"));
const Organization = React.lazy(() => import("./sections/Organization"));
const AboutMe = React.lazy(() => import("./sections/Aboutme"));
const Achievements = React.lazy(() => import("./sections/Achievements"));
const Testimonials = React.lazy(() => import("./sections/Testimonials"));
const Footer = React.lazy(() => import("./sections/Footer"));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message || "Unknown error occurred" };
  }

  componentDidCatch(error, info) {
    console.error("Error in component:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-deep_indigo">
          <div className="text-center p-8 rounded-lg bg-gradient-to-br from-dark_teal/20 to-deep_indigo/20 backdrop-blur-lg border border-lemon_chiffon/30">
            <div className="text-lemon_chiffon text-xl mb-4">⚠️ Something went wrong</div>
            <div className="text-white/70 mb-4">{this.state.errorMessage}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-gradient-to-r from-dark_teal to-deep_indigo text-lemon_chiffon rounded-lg hover:scale-105 transition-transform duration-300 border border-lemon_chiffon/50"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const LoadingContext = React.createContext({
  isLoading: true,
  setLoading: () => {},
  loadingProgress: 0,
  setLoadingProgress: () => {}
});

const LoadingProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, loadingProgress, setLoadingProgress }}>
      {children}
    </LoadingContext.Provider>
  );
};

const useLoading = () => React.useContext(LoadingContext);

const SectionWrapper = ({ children, fallback = <Loader /> }) => (
  <Suspense fallback={fallback}>
    <ErrorBoundary>{children}</ErrorBoundary>
  </Suspense>
);

const sidebarVariants = {
  open: { 
    x: 0, 
    opacity: 1, 
    visibility: "visible",
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30, 
      duration: 0.6,
      staggerChildren: 0.1,
      delayChildren: 0.2
    } 
  },
  closed: { 
    x: "-100%", 
    opacity: 0, 
    visibility: "hidden",
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 40, 
      duration: 0.4,
      staggerChildren: 0.05,
      staggerDirection: -1
    } 
  }
};

const navItemVariants = {
  open: { 
    x: 0, 
    opacity: 1, 
    scale: 1, 
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 25,
      duration: 0.4
    } 
  },
  closed: { 
    x: -30, 
    opacity: 0, 
    scale: 0.9, 
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 30, 
      duration: 0.3 
    } 
  }
};

const overlayVariants = {
  open: { 
    opacity: 1, 
    visibility: "visible",
    transition: { duration: 0.3 } 
  },
  closed: { 
    opacity: 0, 
    visibility: "hidden",
    transition: { duration: 0.3, delay: 0.2 } 
  }
};

const ToggleButton = ({ isOpen, setIsOpen }) => (
  <motion.div className="fixed top-6 left-6 z-[60] p-2">
    <motion.button
      onClick={() => setIsOpen(!isOpen)}
      className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-lemon_chiffon/20 shadow-2xl cursor-pointer overflow-visible group"
      whileHover={{ 
        scale: 1.1, 
        rotate: isOpen ? -5 : 5,
        boxShadow: "0 0 30px rgba(255, 248, 220, 0.3), 0 0 60px rgba(255, 248, 220, 0.1)"
      }}
      whileTap={{ scale: 0.95 }}
      animate={{ 
        rotate: isOpen ? 0 : 0,
        borderColor: isOpen ? "#F26B38" : "#FFF8DC"
      }}
      transition={{ duration: 0.4, ease: "easeInOut", type: "spring", stiffness: 200 }}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
      style={{ transformOrigin: "center center" }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-lemon_chiffon/10 via-dark_teal/10 to-transparent rounded-xl"
        animate={{ 
          opacity: isOpen ? 0.8 : 0.3, 
          scale: isOpen ? 1.2 : 1,
          rotate: isOpen ? 180 : 0
        }}
        transition={{ duration: 0.4 }}
      />
      
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <motion.div className="relative w-8 h-8 flex items-center justify-center">
          <motion.span
            className="absolute block h-0.5 w-6 bg-lemon_chiffon rounded-full transform origin-center"
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 0 : -8,
              scaleX: isOpen ? 1 : 1
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute block h-0.5 w-6 bg-lemon_chiffon rounded-full transform origin-center"
            animate={{
              opacity: isOpen ? 0 : 1,
              scaleX: isOpen ? 0 : 1
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute block h-0.5 w-6 bg-lemon_chiffon rounded-full transform origin-center"
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? 0 : 8,
              scaleX: isOpen ? 1 : 1
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-0 bg-lemon_chiffon/20 rounded-xl"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 0, opacity: [0, 1, 0] }}
        transition={{ duration: 0.9 }}
      />
    </motion.button>
  </motion.div>
);

const NavbarComponent = ({ page }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    try {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ 
          behavior: "smooth", 
          block: "start", 
          inline: "nearest" 
        });
      } else {
        console.warn(`Element with id "${id}" not found`);
      }
    } catch (error) {
      console.error("Error scrolling to section:", error);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && 
          !event.target.closest(".navbar-container") && 
          !event.target.closest("[data-navbar-toggle]") &&
          !event.target.closest(".navbar-overlay")) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const navLinks = {
    home: [
      { to: "/my-works", name: "My Works", icon: "🚀", description: "Explore my projects" },
      { to: "/my-story", name: "My Story", icon: "📖", description: "Learn about my journey" }
    ],
    myWorks: [
      { id: "websites", name: "STEM Projects", icon: "🔬", description: "Scientific endeavors" },
      { id: "artworks", name: "Artworks", icon: "🎨", description: "Creative expressions" },
      { id: "research", name: "Research", icon: "📚", description: "Academic work" },
      { id: "organization", name: "Volunteering", icon: "🤝", description: "Community service" },
      { to: "/", name: "← Back to Home", icon: "🏠", description: "Return home" },
      { to: "/my-story", name: "My Story", icon: "📖", description: "Personal journey" }
    ],
    myStory: [
      { id: "about", name: "About Me", icon: "👋", description: "Get to know me" },
      { id: "achievements", name: "Achievements", icon: "🏆", description: "My accomplishments" },
      { id: "testimonials", name: "Appreciations", icon: "💙", description: "Kind words" },
      { to: "/", name: "← Back to Home", icon: "🏠", description: "Return home" },
      { to: "/my-works", name: "My Works", icon: "🚀", description: "View projects" }
    ]
  };

  return (
    <>
      <div data-navbar-toggle="true">
        <ToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      
      <motion.div
        className="navbar-overlay fixed inset-0 bg-black/60 backdrop-blur-sm z-[45]"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={overlayVariants}
        onClick={() => setIsOpen(false)}
        style={{ 
          pointerEvents: isOpen ? "auto" : "none",
          userSelect: "none"
        }}
      />

      <motion.nav
        className="navbar-container fixed top-0 left-0 h-full w-80 z-[50] flex flex-col"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="relative h-full w-full bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl border-r border-lemon_chiffon/20 shadow-2xl">
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{ 
              background: isOpen ? 
                "radial-gradient(circle at 20% 50%, rgba(255, 248, 220, 0.1) 0%, transparent 50%), linear-gradient(135deg, rgba(0, 206, 209, 0.1) 0%, rgba(72, 61, 139, 0.1) 100%)" :
                "transparent"
            }}
            transition={{ duration: 0.8 }}
            aria-hidden="true"
          />

          <motion.div 
            className="p-6 pt-20 border-b border-lemon_chiffon/10"
            variants={navItemVariants}
          >
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.h2 
                className="mt-6 text-2xl font-bold bg-gradient-to-r from-lemon_chiffon via-white to-lemon_chiffon bg-clip-text text-transparent mb-2"
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Bushra's Portfolio
              </motion.h2>
              <motion.div 
                className="w-16 h-0.5 bg-gradient-to-r from-transparent via-lemon_chiffon to-transparent mx-auto"
                animate={{ scaleX: isOpen ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                aria-hidden="true"
              />
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex-1 overflow-y-auto px-4 py-6"
            variants={navItemVariants}
          >
            <motion.ul className="space-y-3" variants={navItemVariants}>
              {navLinks[page]?.map((link, index) => (
                <motion.li
                  key={`${link.id || link.to}-${index}`}
                  variants={navItemVariants}
                  custom={index}
                  whileHover={{ 
                    scale: 1.02, 
                    x: 8,
                    transition: { duration: 0.2, ease: "easeOut" } 
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.to ? (
                    <Link 
                      to={link.to} 
                      className="group flex items-center gap-4 px-4 py-3 font-medium text-slate-300 hover:text-lemon_chiffon transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-lemon_chiffon/10 hover:to-dark_teal/10 border border-transparent hover:border-lemon_chiffon/20 backdrop-blur-sm"
                      onClick={() => setIsOpen(false)}
                      aria-label={`Navigate to ${link.name}`}
                    >
                      <motion.span 
                        className="text-xl flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-slate-700/50 to-slate-800/50 group-hover:from-lemon_chiffon/20 group-hover:to-dark_teal/20 transition-all duration-300"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        {link.icon}
                      </motion.span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm uppercase tracking-wider">
                          {link.name}
                        </div>
                        {link.description && (
                          <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300 mt-0.5">
                            {link.description}
                          </div>
                        )}
                      </div>
                      <motion.span
                        className="text-slate-400 group-hover:text-lemon_chiffon transition-colors duration-300"
                        animate={{ x: 0 }}
                        whileHover={{ x: 4 }}
                      >
                        →
                      </motion.span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="group w-full flex items-center gap-4 px-4 py-3 text-base font-medium text-slate-300 hover:text-lemon_chiffon transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-lemon_chiffon/10 hover:to-dark_teal/10 border border-transparent hover:border-lemon_chiffon/20 backdrop-blur-sm text-left"
                      aria-label={`Scroll to ${link.name} section`}
                    >
                      <motion.span 
                        className="text-xl flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-slate-700/50 to-slate-800/50 group-hover:from-lemon_chiffon/20 group-hover:to-dark_teal/20 transition-all duration-300"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        {link.icon}
                      </motion.span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm uppercase tracking-wider">
                          {link.name}
                        </div>
                        {link.description && (
                          <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300 mt-0.5">
                            {link.description}
                          </div>
                        )}
                      </div>
                      <motion.span
                        className="text-slate-400 group-hover:text-lemon_chiffon transition-colors duration-300"
                        animate={{ x: 0 }}
                        whileHover={{ x: 4 }}
                      >
                        →
                      </motion.span>
                    </button>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <div 
            className="absolute right-0 top-0 h-full w-0.5 bg-gradient-to-b from-transparent via-lemon_chiffon/30 to-transparent" 
            aria-hidden="true"
          />
        </div>
      </motion.nav>
    </>
  );
};

const HomePage = () => {
  const { isLoading } = useLoading();
  
  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.body.style.height = 'auto';
    document.documentElement.style.height = 'auto';
    document.body.style.position = 'relative';
    
    document.body.classList.remove('overflow-hidden');
    document.documentElement.classList.remove('overflow-hidden');
    
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <div className="bg-deep_indigo min-h-screen font-description">
      <Helmet>
        <title>Home | Bushra's Portfolio</title>
        <meta name="description" content="Welcome to Bushra's portfolio showcasing projects, research, and creative works." />
        <meta name="keywords" content="Bushra, Portfolio, Web Development, Research, Art, STEM, Volunteering" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="/" />
        <meta property="og:title" content="Home | Bushra's Portfolio" />
        <meta property="og:description" content="Welcome to Bushra's portfolio showcasing projects, research, and creative works." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home | Bushra's Portfolio" />
        <meta name="twitter:description" content="Welcome to Bushra's portfolio showcasing projects, research, and creative works." />
      </Helmet>
      
      <NavbarComponent page="home" />
      
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <ErrorBoundary>
          <SectionWrapper fallback={<Loader1 />}>
            <ParticleScene />
          </SectionWrapper>
        </ErrorBoundary>
      </div>
      
      <main className="relative z-10" style={{ pointerEvents: 'auto' }}>
        <div id="hero">
          <SectionWrapper>
            <Hero />
          </SectionWrapper>
        </div>
      </main>
      
      <footer className="relative z-10">
        <SectionWrapper>
          <Footer />
        </SectionWrapper>
      </footer>
    </div>
  );
};

const MyWorksPage = () => {
  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.body.style.height = 'auto';
    document.documentElement.style.height = 'auto';
    document.body.style.position = 'relative';
    
    document.body.classList.remove('overflow-hidden');
    document.documentElement.classList.remove('overflow-hidden');
    
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <div className="bg-deep_indigo min-h-screen font-description">
      <Helmet>
        <title>My Works | Bushra's Portfolio</title>
        <meta name="description" content="Explore Bushra's STEM projects, artworks, research, and volunteering initiatives." />
        <meta name="keywords" content="STEM, Art, Research, Volunteering, Projects, Bushra" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="/my-works" />
        <meta property="og:title" content="My Works | Bushra's Portfolio" />
        <meta property="og:description" content="Explore Bushra's STEM projects, artworks, research, and volunteering initiatives." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/my-works" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="My Works | Bushra's Portfolio" />
        <meta name="twitter:description" content="Explore Bushra's STEM projects, artworks, research, and volunteering initiatives." />
      </Helmet>
      
      <NavbarComponent page="myWorks" />
      
      <main className="min-h-screen relative z-10">
        <section id="websites">
          <SectionWrapper><Websites /></SectionWrapper>
        </section>
        <section id="research">
          <SectionWrapper><Research /></SectionWrapper>
        </section>
        <section id="artworks">
          <SectionWrapper><Art /></SectionWrapper>
        </section>
        <section id="organization">
          <SectionWrapper><Organization /></SectionWrapper>
        </section>
      </main>
      
      <footer className="relative z-10">
        <SectionWrapper><Footer /></SectionWrapper>
      </footer>
    </div>
  );
};

const MyStoryPage = () => {
  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.body.style.height = 'auto';
    document.documentElement.style.height = 'auto';
    document.body.style.position = 'relative';
    
    document.body.classList.remove('overflow-hidden');
    document.documentElement.classList.remove('overflow-hidden');
    
    const timer = setTimeout(() => {
      const aboutElement = document.getElementById('about');
      if (aboutElement) {
        aboutElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 500);
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <div className="bg-deep_indigo min-h-screen font-description">
      <Helmet>
        <title>My Story | Bushra's Portfolio</title>
        <meta name="description" content="Discover Bushra's personal story, achievements, skills, gallery, and appreciations." />
        <meta name="keywords" content="About, Achievements, Skills, Gallery, Testimonials, Bushra" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="/my-story" />
        <meta property="og:title" content="My Story | Bushra's Portfolio" />
        <meta property="og:description" content="Discover Bushra's personal story, achievements, skills, gallery, and appreciations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/my-story" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="My Story | Bushra's Portfolio" />
        <meta name="twitter:description" content="Discover Bushra's personal story, achievements, skills, gallery, and appreciations." />
      </Helmet>
      
      <NavbarComponent page="myStory" />
      
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <ErrorBoundary>
          <SectionWrapper fallback={<Loader1 />}>
            <ParticleScene />
          </SectionWrapper>
        </ErrorBoundary>
      </div>
      
      <main className="min-h-screen relative z-10">
        <section id="about">
          <SectionWrapper><AboutMe /></SectionWrapper>
        </section>
        <section id="achievements">
          <SectionWrapper><Achievements /></SectionWrapper>
        </section>
        <section id="testimonials">
          <SectionWrapper><Testimonials /></SectionWrapper>
        </section>
      </main>
      
      <footer className="relative z-10">
        <SectionWrapper><Footer /></SectionWrapper>
      </footer>
    </div>
  );
};

const App = () => {
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const setScrollStyles = () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      document.body.style.height = 'auto';
      document.documentElement.style.height = 'auto';
      document.body.style.webkitOverflowScrolling = 'touch';
      document.body.style.position = 'relative';
      
      document.body.classList.remove('overflow-hidden', 'h-screen', 'max-h-screen');
      document.documentElement.classList.remove('overflow-hidden', 'h-screen', 'max-h-screen');
      
      document.documentElement.style.scrollbarWidth = 'thin';
      document.documentElement.style.scrollbarColor = '#90dbf4 #1a1a1a';
    };
    
    setScrollStyles();
    
    const preventScrollHiding = () => {
      setScrollStyles();
    };
    
    window.addEventListener('resize', preventScrollHiding);
    window.addEventListener('orientationchange', preventScrollHiding);
    window.addEventListener('DOMContentLoaded', preventScrollHiding);
    
    const scrollInterval = setInterval(preventScrollHiding, 2000);
    const delayedSetup = setTimeout(preventScrollHiding, 1000);
    
    return () => {
      window.removeEventListener('resize', preventScrollHiding);
      window.removeEventListener('orientationchange', preventScrollHiding);
      window.removeEventListener('DOMContentLoaded', preventScrollHiding);
      clearInterval(scrollInterval);
      clearTimeout(delayedSetup);
    };
  }, []);

  useEffect(() => {
    let progressInterval;
    
    const simulateLoading = () => {
      let currentProgress = 0;
      progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          currentProgress = prev;
          if (currentProgress >= 90) { 
            clearInterval(progressInterval); 
            return 90; 
          }
          const increment = currentProgress < 50 ? Math.random() * 15 : Math.random() * 5;
          return Math.min(currentProgress + increment, 90);
        });
      }, 200);
    };
    
    const handleAppLoad = () => {
      setLoadingProgress(100);
      setTimeout(() => setIsAppLoaded(true), 800);
    };
    
    simulateLoading();
    
    if (document.readyState === "complete") {
      handleAppLoad();
    } else {
      window.addEventListener("load", handleAppLoad);
    }
    
    return () => {
      clearInterval(progressInterval);
      window.removeEventListener("load", handleAppLoad);
    };
  }, []);

  if (!isAppLoaded) {
    return <Loader1 progress={loadingProgress} />;
  }

  return (
    <HelmetProvider>
      <LoadingProvider>
        <Router>
          <ErrorBoundary>
            <style jsx global>{`
              html, body {
                overflow-x: hidden !important;
                overflow-y: auto !important;
                height: auto !important;
                max-height: none !important;
                position: relative !important;
                scroll-behavior: smooth;
              }
              
              .scroll-container {
                overflow: visible !important;
                height: auto !important;
              }
              
              * {
                box-sizing: border-box;
              }
              
              .pointer-events-none {
                pointer-events: none !important;
              }
              
              .pointer-events-auto {
                pointer-events: auto !important;
              }
              
              @media (prefers-reduced-motion: no-preference) {
                html {
                  scroll-behavior: smooth;
                }
              }
              
              ::-webkit-scrollbar {
                width: 8px;
              }
              
              ::-webkit-scrollbar-track {
                background: rgba(42, 27, 61, 0.3);
              }
              
              ::-webkit-scrollbar-thumb {
                background: linear-gradient(to bottom, #98f5e1, #a3c4f3);
                border-radius: 4px;
              }
              
              ::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(to bottom, #a3c4f3, #98f5e1);
              }
              
              .navbar-container, .navbar-overlay, [data-navbar-toggle] {
                user-select: none;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
              }
              
              @media (hover: none) and (pointer: coarse) {
                button, a {
                  -webkit-tap-highlight-color: transparent;
                }
              }
            `}</style>
            
            <div className="scroll-container">
              <Suspense fallback={<Loader1 progress={50} />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/my-works" element={<MyWorksPage />} />
                  <Route path="/my-story" element={<MyStoryPage />} />
                  <Route path="*" element={
                    <div className="min-h-screen bg-deep_indigo flex items-center justify-center">
                      <Helmet>
                        <title>404 - Page Not Found | Bushra's Portfolio</title>
                        <meta name="description" content="The requested page could not be found." />
                        <meta name="robots" content="noindex, nofollow" />
                      </Helmet>
                      <div className="text-center p-8">
                        <h1 className="text-4xl font-bold text-lemon_chiffon mb-4">404 - Page Not Found</h1>
                        <p className="text-slate-300 mb-6">The page you're looking for doesn't exist.</p>
                        <Link 
                          to="/" 
                          className="px-6 py-3 bg-gradient-to-r from-jordy_blue to-aquamarine text-deep_indigo rounded-lg font-bold hover:scale-105 transition-transform duration-300"
                        >
                          Back to Home
                        </Link>
                      </div>
                    </div>
                  } />
                </Routes>
              </Suspense>
            </div>
          </ErrorBoundary>
        </Router>
      </LoadingProvider>
    </HelmetProvider>
  );
};

export default App;