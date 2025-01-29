import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "./components/Loader"; // Importing the loader


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
          pointerEvents: isOpen ? "auto" : "none", // Disable interactions when closed
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
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(loadingInterval); // Clear interval when loading is complete
          setLoading(false); // Set loading to false after loading finishes
          return 100;
        }
        return prevProgress + 10; // Increment loading progress
      });
    }, 700); // Update loading progress every 700ms

    return () => clearInterval(loadingInterval); // Cleanup on unmount
  }, []);

  return (
    <div className="bg-dark text-light scroll-smooth" style={{ fontFamily: fonts.body }}>
      {loading ? (
        <Loader progress={loadingProgress} />
      ) : (
        <>
          <NavbarComponent />
          <div className="absolute top-0 left-0 w-full h-full">
            <Suspense fallback={<div>Loading...</div>}>
              <ParticleScene />
            </Suspense>
          </div>
          <main className="min-h-screen">
            <section id="hero">
              <Suspense fallback={<div>Loading...</div>}>
                <Hero />
              </Suspense>
            </section>
            <section id="about">
              <Suspense fallback={<div>Loading...</div>}>
                <AboutMe />
              </Suspense>
            </section>
            <section id="achievements">
              <Suspense fallback={<div>Loading...</div>}>
                <Achievements />
              </Suspense>
            </section>
            <section id="gallery">
              <Suspense fallback={<div>Loading...</div>}>
                <Gallery />
              </Suspense>
            </section>
            <section id="websites">
              <Suspense fallback={<div>Loading...</div>}>
                <Websites />
              </Suspense>
            </section>
            <section id="artworks">
              <Suspense fallback={<div>Loading...</div>}>
                <Artworks />
              </Suspense>
            </section>
            <section id="digital">
              <Suspense fallback={<div>Loading...</div>}>
                <Art />
              </Suspense>
            </section>

            <section id="research">
              <Suspense fallback={<div>Loading...</div>}>
                <Research />
              </Suspense>
            </section>
            <section id="organization">
              <Suspense fallback={<div>Loading...</div>}>
                <Organization />
              </Suspense>
            </section>
            <section id="olympiads">
              <Suspense fallback={<div>Loading...</div>}>
                <Olympiads />
              </Suspense>
            </section>
            <section id="testimonials">
              <Suspense fallback={<div>Loading...</div>}>
                <Testimonials />
              </Suspense>
            </section>
          </main>
          <Suspense fallback={<div>Loading...</div>}>
            <Footer />
          </Suspense>
        </>
      )}
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
  background: `linear-gradient(145deg, ${colors.accent2}, ${colors.primaryDark})`, // Dark Blue and Lavender Gray
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.4)",
  transition: "all 0.3s ease",
  transformStyle: "preserve-3d", // Enables 3D transformation
  "&:hover": {
    boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.5)", // Hover effect for more interactivity
  },
};

const buttonFace = {
  fontSize: "24px",
  fontWeight: "bold",
  color: colors.light, // Using light color from the palette
  transformOrigin: "center", // Make the rotation happen from the center
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
  background: `linear-gradient(145deg, ${colors.primaryDark}, ${colors.primary})`, // Using Slate Blue tones
  borderRadius: "20px",
  boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.3)",
  position: "fixed",
  top: "60px",
  left: "0",
  padding: "1rem",
  height: "100vh",
  width: "0",
};

const navList = {
  listStyleType: "none",
  padding: "0",
  margin: "0",
};

const navItem = {
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
