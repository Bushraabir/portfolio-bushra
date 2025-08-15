import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "./components/Loader";
import Loader1 from "./components/Loader1";

// Lazy-load sections and components
const ParticleScene = React.lazy(() => import("./components/Particle"));
const Hero = React.lazy(() => import("./sections/Hero"));
const Websites = React.lazy(() => import("./sections/Websites"));
const Research = React.lazy(() => import("./sections/Research"));
const Art = React.lazy(() => import("./sections/Art"));
const Organization = React.lazy(() => import("./sections/Organization"));
const AboutMe = React.lazy(() => import("./sections/Aboutme"));
const Achievements = React.lazy(() => import("./sections/Achievements"));
const Gallery = React.lazy(() => import("./sections/Gallery"));
const Testimonials = React.lazy(() => import("./sections/Testimonials"));
const Skills = React.lazy(() => import("./sections/skill"));
const Footer = React.lazy(() => import("./sections/Footer"));

//  Error Boundary for  error handling
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message || 'Unknown error occurred' };
  }

  componentDidCatch(error, info) {
    console.error('Error in component:', error, info);
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

// Loading context to manage global loading states
const LoadingContext = React.createContext({
  isLoading: true,
  setLoading: () => {},
  loadingProgress: 0,
  setLoadingProgress: () => {}
});

// Loading provider component
const LoadingProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, loadingProgress, setLoadingProgress }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Custom hook for loading context
const useLoading = () => React.useContext(LoadingContext);

// Enhanced loading wrapper for sections
const SectionWrapper = ({ children, fallback = <Loader /> }) => (
  <Suspense fallback={fallback}>
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  </Suspense>
);

// Framer Motion variants
const sidebarVariants = {
  open: { 
    width: "250px", 
    opacity: 1, 
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30,
      duration: 0.6 
    } 
  },
  closed: { 
    width: "0", 
    opacity: 0, 
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 40,
      duration: 0.4 
    } 
  },
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
      delay: 0.1,
      staggerChildren: 0.1 
    } 
  },
  closed: { 
    x: -20, 
    opacity: 0, 
    scale: 0.95, 
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 30,
      duration: 0.3 
    } 
  },
};

// Enhanced Toggle Button with better animations
const ToggleButton = ({ isOpen, setIsOpen }) => (
  <motion.div className="flex items-center justify-center w-12 h-12 m-3">
    <motion.button
      onClick={() => setIsOpen(!isOpen)}
      className="w-12 h-12 border-2 rounded-full shadow-lg cursor-pointer bg-gradient-to-r from-dark_teal to-deep_indigo border-lemon_chiffon relative overflow-hidden"
      whileHover={{ 
        scale: 1.15, 
        rotateZ: isOpen ? -10 : 10,
        boxShadow: "0 0 20px rgba(255, 248, 220, 0.5)"
      }}
      whileTap={{ scale: 0.95 }}
      animate={{ 
        rotate: isOpen ? 180 : 0,
        borderColor: isOpen ? "#F26B38" : "#FFF8DC"
      }}
      transition={{ 
        duration: 0.5, 
        ease: "easeInOut",
        type: "spring",
        stiffness: 300
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-lemon_chiffon/20 to-transparent"
        animate={{ 
          opacity: isOpen ? 1 : 0,
          scale: isOpen ? 1.2 : 0.8
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="text-lg font-bold text-lemon_chiffon relative z-10"
        animate={{ 
          rotateY: isOpen ? 180 : 0,
          color: isOpen ? "#F26B38" : "#FFF8DC"
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {isOpen ? "✖" : "☰"}
      </motion.span>
    </motion.button>
  </motion.div>
);

// Enhanced Navbar Component with better UX
const NavbarComponent = ({ page }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }
    setIsOpen(false);
  };

  // Close navbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('nav') && !event.target.closest('button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close navbar on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const navLinks = {
    home: [
      { to: "/my-works", name: "My Works", icon: "🚀" },
      { to: "/my-story", name: "My Story", icon: "📖" },
    ],
    myWorks: [
      { id: "websites", name: "STEM Projects", icon: "🔬" },
      { id: "artworks", name: "Artworks", icon: "🎨" },
      { id: "research", name: "Research", icon: "📚" },
      { id: "organization", name: "Volunteering", icon: "🤝" },
      { to: "/", name: "← Back to Home", icon: "🏠" },
      { to: "/my-story", name: "My Story", icon: "📖" },
    ],
    myStory: [
      { id: "about", name: "About Me", icon: "👋" },
      { id: "achievements", name: "Achievements", icon: "🏆" },
      { id: "skills", name: "Skillset", icon: "⚡" },
      { id: "gallery", name: "Gallery", icon: "📸" },
      { id: "testimonials", name: "Appreciations", icon: "💝" },
      { to: "/", name: "← Back to Home", icon: "🏠" },
      { to: "/my-works", name: "My Works", icon: "🚀" },
    ],
  };

  return (
    <div className="fixed top-0 left-0 z-50">
      <ToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <motion.nav
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
        className="absolute left-0 flex flex-col p-6 border-2 shadow-2xl bg-deep_indigo/90 backdrop-blur-xl rounded-xl border-lemon_chiffon/30 w-64 max-h-screen overflow-y-auto"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-lemon_chiffon/5 to-transparent rounded-xl"
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.ul 
          className="p-0 m-0 list-none relative z-10"
          variants={navItemVariants}
        >
          {navLinks[page].map((link, index) => (
            <motion.li
              key={link.id || link.to}
              className="my-3"
              variants={navItemVariants}
              custom={index}
              whileHover={{ 
                scale: 1.05, 
                x: 8,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.95 }}
            >
              {link.to ? (
                <Link 
                  to={link.to} 
                  className="flex items-center gap-3 px-3 py-2 text-base font-semibold tracking-wide uppercase text-mauve-500 hover:text-lemon_chiffon transition-colors duration-300 rounded-lg hover:bg-lemon_chiffon/10"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-lg">{link.icon}</span>
                  {link.name}
                </Link>
              ) : (
                <button
                  onClick={() => scrollToSection(link.id)}
                  className="flex items-center gap-3 px-3 py-2 text-base font-semibold tracking-wide uppercase text-mauve-500 hover:text-lemon_chiffon transition-colors duration-300 rounded-lg hover:bg-lemon_chiffon/10 w-full text-left"
                >
                  <span className="text-lg">{link.icon}</span>
                  {link.name}
                </button>
              )}
            </motion.li>
          ))}
        </motion.ul>
      </motion.nav>
    </div>
  );
};

// Enhanced Home Page with better loading
const HomePage = () => {
  const { isLoading } = useLoading();

  return (
    <div className="bg-deep_indigo text-deep_indigo min-h-screen font-description overflow-hidden">
      <NavbarComponent page="home" />
      <div className="absolute top-0 left-0 w-full h-full">
        <ErrorBoundary>
          <SectionWrapper fallback={<Loader1 />}>
            <ParticleScene className="min-h-screen overflow-hidden -z-10" />
          </SectionWrapper>
        </ErrorBoundary>
      </div>
      <main className="min-h-screen overflow-hidden relative z-10 pointer-events-none">

          <Hero id="hero" />

      </main>
      <SectionWrapper>
        <Footer />
      </SectionWrapper>
    </div>
  );
};

//  My Works Page
const MyWorksPage = () => (
  <div className="bg-deep_indigo text-deep_indigo min-h-screen font-description overflow-hidden">
    <NavbarComponent page="myWorks" />
    <main className="min-h-screen overflow-hidden">
      <SectionWrapper>
        <Websites id="websites" className="z-100" />
      </SectionWrapper>
      <SectionWrapper>
        <Research id="research" className="-z-100" />
      </SectionWrapper>
      <SectionWrapper>
        <Art id="artworks" />
      </SectionWrapper>
      <SectionWrapper>
        <Organization id="organization" className="bg-lemon_chiffon" />
      </SectionWrapper>
    </main>
    <SectionWrapper>
      <Footer />
    </SectionWrapper>
  </div>
);

// Enhanced My Story Page
const MyStoryPage = () => (
  <div className="bg-deep_indigo text-deep_indigo min-h-screen font-description overflow-hidden">
    <NavbarComponent page="myStory" />
    <main className="min-h-screen overflow-hidden">
      <SectionWrapper>
        <AboutMe id="about" className="overflow-hidden" />
      </SectionWrapper>
      <SectionWrapper>
        <Achievements id="achievements" className="overflow-hidden" />
      </SectionWrapper>

      <SectionWrapper>
        <Testimonials id="testimonials" className="overflow-hidden" />
      </SectionWrapper>
    </main>
    <SectionWrapper>
      <Footer />
    </SectionWrapper>
  </div>
);

// Main App Component with enhanced loading logic
const App = () => {
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    let progressInterval;
    
    const simulateLoading = () => {
      progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 10;
        });
      }, 200);
    };

    const handleAppLoad = () => {
      // Simulate final loading steps
      setLoadingProgress(100);
      
      setTimeout(() => {
        setIsAppLoaded(true);
      }, 800);
    };

    simulateLoading();

    // Check if everything is ready
    const checkReadiness = () => {
      if (document.readyState === "complete") {
        handleAppLoad();
      } else {
        window.addEventListener("load", handleAppLoad);
      }
    };

    const readyTimer = setTimeout(checkReadiness, 100);

    return () => {
      clearTimeout(readyTimer);
      clearInterval(progressInterval);
      window.removeEventListener("load", handleAppLoad);
    };
  }, []);

  if (!isAppLoaded) {
    return <Loader1 progress={loadingProgress} />;
  }

  return (
    <LoadingProvider>
      <Router basename="/portfolio-bushra/">
        <ErrorBoundary>
          <Suspense fallback={<Loader1 progress={50} />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/my-works" element={<MyWorksPage />} />
              <Route path="/my-story" element={<MyStoryPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </LoadingProvider>
  );
};

export default App;