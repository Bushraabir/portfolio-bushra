import React from "react";
import Hero from "./sections/Hero";
import Websites from "./sections/Websites.jsx";

import Artworks from "./sections/Artworks";

import Research from "./sections/Research";
import Organization from "./sections/Organization";
import Olympiads from "./sections/Olympiads.jsx";
import Achievements from "./sections/Achievements";
import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";
import AboutMe from "./sections/Aboutme.jsx";
import ParticleScene from "./components/Particle.jsx";
import { motion } from "framer-motion";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Gallery from "./sections/Gallery.jsx";
import DigitalArt from "./sections/DigitalArt.jsx";



const navLinks = [
  
  { name: "My Odyssey", id: "hero" },
  { name: "The climb", id: "achievements" },
  { name: "Code Canvas", id: "websites" },
  { name: "Imaginary Pixels", id: "digital" },
  { name: "Strokers of legacy", id: "artworks" },
  { name: "Knowledge Repository", id: "research" },
  { name: "Empowered Network", id: "organization" },
  { name: "Olympiads", id: "olympiads" },
  { name: "In their words", id: "testimonials" },
];

// Animation variants for the sidebar
const sidebarVariants = {
  open: {
    width: "320px",
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 30,
      damping: 15,
      staggerChildren: 0.1,
    },
  },
  closed: {
    width: "0",
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 30,
      damping: 15,
      staggerChildren: 0.05,
    },
  },
};

// Animation variants for nav links
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

// Toggle button with smoother animations
function ToggleButton({ isOpen, setIsOpen }) {
  return (
    <motion.div style={toggleButtonContainer}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={toggleButton}
        whileHover={{
          scale: 1.15,
          rotateZ: isOpen ? -15 : 15,
        }}
        whileTap={{
          scale: 0.9,
        }}
        animate={{
          rotate: isOpen ? 360 : 0,
          rotateY: isOpen ? 180 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.8, 0.25, 1],
        }}
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
}

function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

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
                  color: "#ff7eb3",
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
}

/* Styles */
const toggleButtonContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 70,
  height: 70,
  margin: "20px",
  perspective: "1000px", // Add perspective for 3D effect
};

const toggleButton = {
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  background: "linear-gradient(145deg, #ff7eb3, #ff758c)",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.4)",
  transition: "all 0.3s ease",
  transformStyle: "preserve-3d", // Enables 3D transformation
};

const buttonFace = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#ffffff",
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
  background: "linear-gradient(145deg, #1f1f1f, #292929)",
  borderRadius: "20px",
  boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  width: "80vw", // Adjust width based on viewport width
  maxWidth: "250px", // Limit the max width for larger screens
  minWidth: "200px", // Ensure it doesn't become too small
  padding: "20px",
  transition: "all 0.3s ease-in-out", // Smooth animations for resizing
};

const navList = {
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  padding: "10px",
  margin: 0,
};

const navItem = {
  marginBottom: "15px",
  padding: "15px 20px",
  borderRadius: "10px",
  background: "linear-gradient(145deg, #252525, #303030)",
  cursor: "pointer",
};

const linkStyle = {
  textDecoration: "none",
  color: "#f0f0f0",
  fontSize: "18px",
  fontWeight: "bold",
};

const App = () => {
  return (
    <div className="bg-dark text-light scroll-smooth">
      {/* Navbar */}
      <NavbarComponent />
      <div className="absolute top-0 left-0 w-full h-full">
        <ParticleScene />
      </div>
      {/* Main Content */}
      <main className="min-h-screen">
        {/* Sections */}
        <section id="hero">
          <Hero />
        </section>
        <section id="about">
          <AboutMe />
        </section>
        <section id="achievements" className="w-full px-0">
          <Achievements />
        </section>
        <section id="gallery" >
        
        <Gallery />
      
        </section>
        <section id="websites" >
          <Websites />
        </section>

        <section id="digital" >
          <DigitalArt />
        </section>
        <section id="artworks" >
          <Artworks />
        </section>

        <section id="research" className="px-4 bg-light text-dark sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
          <Research />
        </section>
        <section id="organization" className="px-4 bg-gray-800 text-light sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
          <Organization />
        </section>
        <section id="olympiads" className="px-4 bg-light text-dark sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
          <Olympiads />
        </section>

        <section id="testimonials">
          <Testimonials />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
