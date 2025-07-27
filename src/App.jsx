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

// Error Boundary to catch 3D scene errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error in 3D scene:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'lemonchiffon', textAlign: 'center', paddingTop: '20px' }}>
          Oops! Something went wrong with the 3D scene.
          <br />
          You can refresh the screen to reload the model...
        </div>
      );
    }
    return this.props.children;
  }
}

// Framer Motion variants
const sidebarVariants = {
  open: { width: "250px", opacity: 1, transition: { type: "tween", ease: "easeOut", duration: 1 } },
  closed: { width: "0", opacity: 0, transition: { type: "tween", ease: "easeIn", duration: 1 } },
};

const navItemVariants = {
  open: { x: 0, opacity: 1, scale: 1, transition: { type: "tween", ease: "easeOut", delay: 0.9, duration: 0.7 } },
  closed: { x: -20, opacity: 0, scale: 0.95, transition: { type: "tween", ease: "easeInOut", duration: 0.7 } },
};

// Toggle Button
const ToggleButton = ({ isOpen, setIsOpen }) => (
  <motion.div className="flex items-center justify-center w-12 h-12 m-3">
    <motion.button
      onClick={() => setIsOpen(!isOpen)}
      className="w-12 h-12 border-2 rounded-full shadow-lg cursor-pointer bg-gradient-to-r from-dark_teal to-deep_indigo border-lemon_chiffon"
      whileHover={{ scale: 1.15, rotateZ: isOpen ? -10 : 10 }}
      whileTap={{ scale: 0.95 }}
      animate={{ rotate: isOpen ? 360 : 0, rotateY: isOpen ? 180 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.span
        className="text-lg font-cta text-light"
        animate={{ rotateY: isOpen ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {isOpen ? "✖" : "☰"}
      </motion.span>
    </motion.button>
  </motion.div>
);

// Navbar Component
const NavbarComponent = ({ page }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const navLinks = {
    home: [
      { to: "/my-works", name: "My Works" },
      { to: "/my-story", name: "My Story" },
    ],
    myWorks: [
      { id: "websites", name: "STEM Projects" },
      { id: "artworks", name: "Artworks" },
      { id: "research", name: "Research" },
      { id: "organization", name: "Volunteering" },
      { to: "/", name: "← Back to Home" },
      { to: "/my-story", name: "My Story" },
    ],
    myStory: [
      { id: "about", name: "About Me" },
      { id: "achievements", name: "Achievements" },
      { id: "skills", name: "Skillset" },
      { id: "gallery", name: "Gallery" },
      { id: "testimonials", name: "Appreciations" },
      { to: "/", name: "← Back to Home" },
      { to: "/my-works", name: "My Works" },
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
        className="absolute left-0 flex flex-col p-5 border-2 shadow-xl bg-deep_indigo bg-opacity-80 backdrop-blur-lg rounded-lg w-40 sm:w-60"
      >
        <motion.ul className="p-0 m-0 list-none">
          {navLinks[page].map((link) => (
            <motion.li
              key={link.id || link.to}
              className="my-4"
              onClick={() => link.id && scrollToSection(link.id)}
              variants={navItemVariants}
              whileHover={{ scale: 1.05, x: 5, transition: { duration: 0.3, ease: "easeOut" } }}
              whileTap={{ scale: 0.95 }}
            >
              {link.to ? (
                <Link to={link.to} className="text-base font-heading tracking-wide uppercase text-mauve-500 hover:text-lemon_chiffon">
                  {link.name}
                </Link>
              ) : (
                <button
                  onClick={() => scrollToSection(link.id)}
                  className="text-base font-heading tracking-wide uppercase text-mauve-500 hover:text-lemon_chiffon"
                >
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

// Home Page
const HomePage = () => (
  <div className="bg-deep_indigo text-deep_indigo min-h-screen font-description overflow-hidden">
    <NavbarComponent page="home" />
    <div className="absolute top-0 left-0 w-full h-full">
      <ErrorBoundary>
        <ParticleScene className="min-h-screen overflow-hidden -z-10" />
      </ErrorBoundary>
    </div>
    <main className="min-h-screen overflow-hidden">
      <Hero id="hero" />
    </main>
    <Suspense fallback={<Loader />}>
      <Footer />
    </Suspense>
  </div>
);

// My Works Page
const MyWorksPage = () => (
  <div className="bg-deep_indigo text-deep_indigo min-h-screen font-description overflow-hidden">
    <NavbarComponent page="myWorks" />
    <main className="min-h-screen overflow-hidden">
      <Websites id="websites" className= " z-100 "/>
      
      <Research id="research" className= " -z-100 "/>
      <Art id="artworks" />
      <Organization id="organization" className="bg-lemon_chiffon" />
    </main>
    <Suspense fallback={<Loader />}>
      <Footer />
    </Suspense>
  </div>
);

// My Story Page
const MyStoryPage = () => (
  <div className="bg-deep_indigo text-deep_indigo min-h-screen font-description overflow-hidden">
    <NavbarComponent page="myStory" />
    <main className="min-h-screen overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full">
      <ErrorBoundary>
        <ParticleScene className="min-h-screen overflow-hidden -z-10" />
      </ErrorBoundary>
    </div>
      <AboutMe id="about" />
      <Achievements id="achievements" />
      <Skills id= "skill"/>
      <Gallery id="gallery" />
      <Testimonials id="testimonials" />
    </main>
    <Suspense fallback={<Loader />}>
      <Footer />
    </Suspense>
  </div>
);

// App Component
const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => setTimeout(() => setIsLoaded(true), 1500);
    if (document.readyState === "complete") handleLoad();
    else window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  if (!isLoaded) return <Loader1 />;

  return (
    <Router basename="/portfolio-bushra/">
      <Suspense fallback={<Loader1 />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-works" element={<MyWorksPage />} />
          <Route path="/my-story" element={<MyStoryPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;