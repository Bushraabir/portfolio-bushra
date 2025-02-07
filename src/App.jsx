import React, { useState, useEffect, Suspense, useRef } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "./components/Loader";

// Lazy-loaded components with dynamic imports
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
const Skill = React.lazy(() => import("./sections/Skill"));

const sidebarVariants = {
  open: { width: "250px", opacity: 1, transition: { type: "tween", ease: "easeOut", duration: 1 } },
  closed: { width: "0", opacity: 0, transition: { type: "tween", ease: "easeIn", duration: 1 } },
};

const navItemVariants = {
  open: { x: 0, opacity: 1, scale: 1, transition: { type: "tween", ease: "easeOut", delay: 0.9, duration: 0.7 } },
  closed: { x: -20, opacity: 0, scale: 0.95, transition: { type: "tween", ease: "easeInOut", duration: 0.7 } },
};

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
        className="text-lg font-bold text-light"
        animate={{ rotateY: isOpen ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {isOpen ? "✖" : "☰"}
      </motion.span>
    </motion.button>
  </motion.div>
);

const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { id: "about", name: "About Me" },
    { id: "achievements", name: "Achievements" },
    { id: "websites", name: "Websites" },
    { id: "artworks", name: "Artworks" },
    { id: "research", name: "Research" },
    { id: "organization", name: "Organization" },
    { id: "testimonials", name: "Testimonials" },
  ];

  return (
    <div className="fixed top-0 left-0 z-50">
      <ToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <motion.nav
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="absolute left-0 flex flex-col p-5 border-2 shadow-xl bg-deep_indigo bg-opacity-80 backdrop-blur-lg rounded-lg w-40 sm:w-60"
      >
        <motion.ul className="p-0 m-0 list-none">
          {navLinks.map((link) => (
            <motion.li
              key={link.id}
              className="my-4"
              onClick={() => {
                scrollToSection(link.id);
                setIsOpen(false);
              }}
              variants={navItemVariants}
              whileHover={{ scale: 1.05, x: 5, transition: { duration: 0.3, ease: "easeOut" } }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.a
                href={`#${link.id}`}
                className="text-base font-semibold tracking-wide uppercase text-mauve-500 hover:text-lemon_chiffon"
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

  const handleLoad = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (!isLoaded) return <Loader />;

  return (
    <div className="bg-deep_indigo text-light min-h-screen">
      <NavbarComponent />
      <div className="absolute top-0 left-0 w-full h-full">
        <Suspense fallback={<Loader />}>
          <ParticleScene />
        </Suspense>
      </div>
      <main className="min-h-screen">
        <Suspense fallback={<Loader />}>
          <Hero id="hero" />
          <AboutMe id="about" />
          <Achievements />
          <Skill />
          <Gallery id="gallery" className="h-[120vh]" />
          <Websites id="websites" />
          <Artworks id="artworks" />
          <Art id="digital" />
          <Research id="research" />
          <Organization id="organization" className="bg-lemon_chiffon" />
          <Testimonials id="testimonials" />
          <Footer />
        </Suspense>
      </main>
    </div>
  );
};

export default App;
