import React, { useState, useEffect, Suspense, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "./components/Loader";
import Loader1 from "./components/Loader1";
import NavbarComponent from "./components/Navbar";

const ParticleScene = React.lazy(() => import("./components/Particle"));
const Hero = React.lazy(() => import("./sections/Hero"));
const Websites = React.lazy(() => import("./sections/Websites"));
const Research = React.lazy(() => import("./sections/Research"));
const Art = React.lazy(() => import("./sections/Art"));
const Github = React.lazy(() => import("./sections/Github"));

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
        <div className="fixed inset-0 flex items-center justify-center bg-deep_indigo p-4">
          <div className="text-center p-4 sm:p-8 rounded-lg bg-gradient-to-br from-dark_teal/20 to-deep_indigo/20 backdrop-blur-lg border border-lemon_chiffon/30 max-w-md w-full">
            <div className="text-lemon_chiffon text-lg sm:text-xl mb-4">⚠️ Something went wrong</div>
            <div className="text-white/70 mb-4 text-sm sm:text-base">{this.state.errorMessage}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-gradient-to-r from-dark_teal to-deep_indigo text-lemon_chiffon rounded-lg hover:scale-105 transition-transform duration-300 border border-lemon_chiffon/50 text-sm sm:text-base"
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

const ParticleContext = React.createContext({
  particleComponent: null,
  setParticleComponent: () => {}
});

const LoadingProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [particleComponent, setParticleComponent] = useState(null);
  
  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, loadingProgress, setLoadingProgress }}>
      <ParticleContext.Provider value={{ particleComponent, setParticleComponent }}>
        {children}
      </ParticleContext.Provider>
    </LoadingContext.Provider>
  );
};

const useLoading = () => React.useContext(LoadingContext);
const useParticle = () => React.useContext(ParticleContext);

const SectionWrapper = ({ children, fallback = <Loader /> }) => (
  <Suspense fallback={fallback}>
    <ErrorBoundary>{children}</ErrorBoundary>
  </Suspense>
);

// Global Particle Background Component
const GlobalParticleBackground = () => {
  const { particleComponent, setParticleComponent } = useParticle();
  const particleRef = useRef(null);

  useEffect(() => {
    // Only create the particle component once
    if (!particleComponent) {
      const loadParticles = async () => {
        try {
          const ParticleScene = await import("./components/Particle");
          setParticleComponent(
            <div ref={particleRef} className="fixed top-0 left-0 w-full h-full z-0">
              <ErrorBoundary>
                <ParticleScene.default />
              </ErrorBoundary>
            </div>
          );
        } catch (error) {
          console.error("Failed to load particles:", error);
        }
      };
      loadParticles();
    }
  }, [particleComponent, setParticleComponent]);

  return particleComponent;
};

// Page Layout Wrapper
const PageLayout = ({ children, title, description, keywords, canonicalUrl, ogUrl }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

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
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={ogUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      
      {/* Global particle background - only rendered once */}
      <GlobalParticleBackground />
      
      {children}
    </div>
  );
};

const HomePage = () => {
  return (
    <PageLayout
      title="Home | Bushra's Portfolio"
      description="Welcome to Bushra's portfolio showcasing projects, research, and creative works."
      keywords="Bushra, Portfolio, Web Development, Research, Art, STEM, Volunteering"
      canonicalUrl="/"
      ogUrl="/"
    >
      <NavbarComponent page="home" />
      
      <main className="relative z-10 pointer-events-none">
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
    </PageLayout>
  );
};

const MyWorksPage = () => {
  return (
    <PageLayout
      title="My Works | Bushra's Portfolio"
      description="Explore Bushra's STEM projects, artworks, research, and volunteering initiatives."
      keywords="STEM, Art, Research, Volunteering, Projects, Bushra"
      canonicalUrl="/my-works"
      ogUrl="/my-works"
    >
      <NavbarComponent page="myWorks" />
      
      <main className="min-h-screen relative z-10">
        <section id="websites">
          <SectionWrapper><Websites /></SectionWrapper>
        </section>
        <section id="github">
          <SectionWrapper><Github /></SectionWrapper>
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
    </PageLayout>
  );
};

const MyStoryPage = () => {
  useEffect(() => {
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
    };
  }, []);

  return (
    <PageLayout
      title="My Story | Bushra's Portfolio"
      description="Discover Bushra's personal story, achievements, skills, gallery, and appreciations."
      keywords="About, Achievements, Skills, Gallery, Testimonials, Bushra"
      canonicalUrl="/my-story"
      ogUrl="/my-story"
    >
      <NavbarComponent page="myStory" />
      
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
    </PageLayout>
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
                -webkit-overflow-scrolling: touch;
              }
              
              .scroll-container {
                overflow: visible !important;
                height: auto !important;
              }
              
              * {
                box-sizing: border-box;
              }
              

              @media (prefers-reduced-motion: no-preference) {
                html {
                  scroll-behavior: smooth;
                }
              }
              
              /* Enhanced scrollbar styling for all devices */
              ::-webkit-scrollbar {
                width: 6px;
              }
              
              ::-webkit-scrollbar-track {
                background: rgba(42, 27, 61, 0.3);
              }
              
              ::-webkit-scrollbar-thumb {
                background: linear-gradient(to bottom, #98f5e1, #a3c4f3);
                border-radius: 3px;
              }
              
              ::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(to bottom, #a3c4f3, #98f5e1);
              }
              
              /* Mobile scrollbar styling */
              @media (max-width: 768px) {
                ::-webkit-scrollbar {
                  width: 4px;
                }
                
                ::-webkit-scrollbar-thumb {
                  border-radius: 2px;
                }
              }
              
              /* Touch-friendly improvements */
              .navbar-container, .navbar-overlay, [data-navbar-toggle] {
                user-select: none;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                -webkit-tap-highlight-color: transparent;
              }
              
              /* Mobile-specific enhancements */
              @media (hover: none) and (pointer: coarse) {
                button, a {
                  -webkit-tap-highlight-color: transparent;
                  touch-action: manipulation;
                }
                
                .group:active {
                  transform: scale(0.98);
                }
                
                .navbar-container {
                  -webkit-transform: translateZ(0);
                  transform: translateZ(0);
                  -webkit-backface-visibility: hidden;
                  backface-visibility: hidden;
                }
              }
              
              /* Prevent zoom on input focus for iOS */
              @media screen and (max-width: 768px) {
                input, select, textarea {
                  font-size: 16px !important;
                }
              }
              
              /* Enhanced mobile navbar animations */
              @media (max-width: 767px) {
                .navbar-container {
                  border-radius: 0 !important;
                  border-right: none !important;
                  border-bottom: 1px solid rgba(255, 248, 220, 0.2) !important;
                }
                
                .navbar-container > div {
                  border-radius: 0 !important;
                }
              }
              
              /* Tablet-specific adjustments */
              @media (min-width: 768px) and (max-width: 1023px) {
                .navbar-container {
                  border-radius: 0 12px 12px 0 !important;
                }
              }
              
              /* Safe area adjustments for mobile devices with notches */
              @supports (padding: max(0px)) {
                @media (max-width: 767px) {
                  .navbar-container {
                    padding-top: max(env(safe-area-inset-top), 0px);
                    padding-left: max(env(safe-area-inset-left), 0px);
                    padding-right: max(env(safe-area-inset-right), 0px);
                  }
                  
                  [data-navbar-toggle] {
                    top: max(env(safe-area-inset-top), 12px);
                    left: max(env(safe-area-inset-left), 12px);
                  }
                }
              }
              
              /* Smooth animations for all interactions */
              .navbar-container * {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              }
              
              /* Focus styles for accessibility */
              button:focus-visible, a:focus-visible {
                outline: 2px solid rgba(255, 248, 220, 0.7);
                outline-offset: 2px;
                border-radius: 8px;
              }
              
              /* Enhanced hover states for larger screens */
              @media (hover: hover) and (pointer: fine) {
                .group:hover {
                  transform: translateX(8px) scale(1.02);
                }
              }
              
              /* Performance optimizations */
              .navbar-container {
                will-change: transform;
                contain: layout style paint;
              }
              
              .navbar-overlay {
                will-change: opacity;
                contain: layout style paint;
              }
            `}</style>
            
            <div className="scroll-container">
              <Suspense fallback={<Loader1 progress={50} />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/my-works" element={<MyWorksPage />} />
                  <Route path="/my-story" element={<MyStoryPage />} />
                  <Route path="*" element={
                    <div className="min-h-screen bg-deep_indigo flex items-center justify-center p-4">
                      <Helmet>
                        <title>404 - Page Not Found | Bushra's Portfolio</title>
                        <meta name="description" content="The requested page could not be found." />
                        <meta name="robots" content="noindex, nofollow" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
                      </Helmet>
                      <div className="text-center p-4 sm:p-8 max-w-md w-full">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-lemon_chiffon mb-4">404 - Page Not Found</h1>
                        <p className="text-slate-300 mb-6 text-sm sm:text-base">The page you're looking for doesn't exist.</p>
                        <Link 
                          to="/" 
                          className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-jordy_blue to-aquamarine text-deep_indigo rounded-lg font-bold hover:scale-105 active:scale-95 transition-transform duration-300 text-sm sm:text-base touch-manipulation"
                          style={{ WebkitTapHighlightColor: "transparent" }}
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