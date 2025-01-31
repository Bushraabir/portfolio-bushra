import React, { useState, useEffect, Suspense , useRef} from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "./components/Loader";


// Color Palette (for styling)
const colors = {
  richTeal: "#007C8A",
  burntOrange: "#FF6F3C",
  deepCharcoal: "#1A1A1A",
  creamWhite: "#F9F5F0",
  gold: "#FFC857",
  lavenderGray: "#ADA7C9",
  accent1: "#FF6F3C", // burnt orange
  accent2: "#ADA7C9", // lavender gray
  primaryDark: "#0D233A", // dark blue
  primary: "#507C7F", // teal
  accent1Light: "#FF9C6A",
  accent1Dark: "#D35E3A",
  light: "#F9F5F0", // cream white for text
};

// Font styles
const fonts = {
  headings: "'Playfair Display', serif",
  body: "'Roboto', sans-serif",
};

// Lazy-loaded components
const Hero = React.lazy(() => import("./sections/Hero"));
const Websites = React.lazy(() => import("./sections/Websites"));
const Artworks = React.lazy(() => import("./sections/Artworks"));
const Research = React.lazy(() => import("./sections/Research"));
const Organization = React.lazy(() => import("./sections/Organization"));
const Olympiads = React.lazy(() => import("./sections/Olympiads"));
const Achievements = React.lazy(() => import("./sections/Achievements"));
const Testimonials = React.lazy(() => import("./sections/Testimonials"));
const Footer = React.lazy(() => import("./sections/Footer"));
const AboutMe = React.lazy(() => import("./sections/Aboutme"));
const ParticleScene = React.lazy(() => import("./components/Particle"));
const Gallery = React.lazy(() => import("./sections/Gallery"));
const Art = React.lazy(() => import("./sections/Art"));

// Animation Variants for Sidebar
const sidebarVariants = {
  open: {
    width: "320px",
    opacity: 1,
    transition: { type: "spring", stiffness: 30, damping: 15, staggerChildren: 0.1 },
  },
  closed: {
    width: "0",
    opacity: 0,
    transition: { type: "spring", stiffness: 30, damping: 15, staggerChildren: 0.05 },
  },
};

// Animation Variants for Nav Links
const navItemVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 50 },
  },
  closed: {
    x: -20,
    opacity: 0,
    transition: { type: "spring", stiffness: 50 },
  },
};

// Toggle Button with smoother animations
const ToggleButton = ({ isOpen, setIsOpen }) => {
  return (
    <motion.div style={toggleButtonContainer}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={toggleButton}
        whileHover={{ scale: 1.15, rotateZ: isOpen ? -15 : 15 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 360 : 0, rotateY: isOpen ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
      >
        <motion.span
          style={buttonFace}
          animate={{ rotateY: isOpen ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {isOpen ? "✖" : "☰"}
        </motion.span>
      </motion.button>
    </motion.div>
  );
};

const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { id: "hero", name: "Hero" },
    { id: "about", name: "About Me" },
    { id: "achievements", name: "Achievements" },
    { id: "gallery", name: "Gallery" },
    { id: "websites", name: "Websites" },
    { id: "digital", name: "Digital Art" },
    { id: "artworks", name: "Artworks" },
    { id: "research", name: "Research" },
    { id: "organization", name: "Organization" },
    { id: "olympiads", name: "Olympiads" },
    { id: "testimonials", name: "Testimonials" },
  ];

  return (
    <div style={navbarContainer}>
      <ToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <motion.nav
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        style={{
          ...navbar,
          pointerEvents: isOpen ? "auto" : "none", 
        }}
      >
        <motion.ul style={navList}>
          {navLinks.map((link) => (
            <motion.li
              key={link.id}
              style={navItem}
              onClick={() => {
                scrollToSection(link.id);
                setIsOpen(false);
              }}
              variants={navItemVariants}
            >
              <motion.a
                href={`#${link.id}`}
                style={linkStyle}
                whileHover={{
                  scale: 1.1,
                  color: colors.burntOrange,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                {link.name}
              </motion.a>
            </motion.li>
          ))}
        </motion.ul>
      </motion.nav>
    </div>
  );
};




const App = () => {


const [isLoaded, setIsLoaded] = useState(false);
const observer = useRef();

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setIsLoaded(true);
    }, { threshold: 0.1 });
    return () => observer.current?.disconnect();
  }, []);
  

  return (
    <div className="bg-dark text-light scroll-smooth" style={{ fontFamily: fonts.body }}>
          <NavbarComponent />
          <div className="absolute top-0 left-0 w-full h-full">
          <Suspense fallback={isLoaded ? null : <Loader />}>
              <ParticleScene />
            </Suspense>
          </div>
          <main className="min-h-screen">

          <Suspense fallback={isLoaded ? null : <Loader />}>
          <Hero  id="hero"/>
          <AboutMe id="about"/>
          <Achievements />
          <Gallery  id="gallery"  className="h-[120vh]"/>
          <Websites id="websites"/>
          <Artworks id="artworks" />
          <Art id="digital" />
          <Research id="research"/>
          <Organization  id="organization"/>
          <Olympiads  id="olympiads"/>
          <Testimonials  id="testimonials"/>
          <Footer />
        </Suspense>
            </main>

    </div>
  );
};

export default App;

// Styles
const toggleButtonContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "70px",
  height: "70px",
  margin: "20px",
};

const toggleButton = {
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  background: "linear-gradient(145deg, #2a1b3d 0%, #6e3f6b 35%, #fde4cf 75%, #f0c4b4 100%)",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.4)",
  transition: "all 0.3s ease",
  transformStyle: "preserve-3d",
  "&:hover": {
    boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.5)", 
  },
  zIndex :99999 ,
};

const buttonFace = {
  fontSize: "24px",
  fontWeight: "bold",
  color: colors.light, 
  transformOrigin: "center",
};

const navbarContainer = {
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 9999,
};

const navbar = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",

  borderRadius: "20px",
  boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.3)",
  position: "fixed",
  top: "60px",
  left: "0",
  padding: "1rem",
  height: "57vh",
  width: "150px", // You can adjust the width based on your layout needs
  backdropFilter: "blur(20px)", // Adds the blur effect
  backgroundColor: "rgba(255, 255, 255, 0.1)", // Adds transparency to the background
  border: "1px solid rgba(255, 255, 255, 0.2)", // Optional: subtle border to enhance the glass effect
};



const navList = {
  listStyleType: "none",
  padding: "0",
  margin: "0",
};

const navItem = {
  marginTop: "20px",
  marginBottom: "20px",
};

const linkStyle = {
  textDecoration: "none",
  color: colors.creamWhite,
  fontFamily: fonts.headings,
  fontSize: "20px",
  fontWeight: "700",
  textTransform: "uppercase",
  letterSpacing: "2px",
};
