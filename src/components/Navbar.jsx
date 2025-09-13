import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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

const ToggleButton = ({ isOpen, setIsOpen }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div className="fixed top-3 sm:top-4 md:top-6 left-3 sm:left-4 md:left-6 z-[60] p-1 sm:p-2">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative ${isMobile ? 'w-12 h-12' : 'w-12 h-12 sm:w-14 sm:h-14'} rounded-xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-lemon_chiffon/20 shadow-2xl cursor-pointer overflow-visible group touch-manipulation`}
        whileHover={{ 
          scale: isMobile ? 1.05 : 1.1, 
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
        style={{ 
          transformOrigin: "center center",
          WebkitTapHighlightColor: "transparent"
        }}
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
          <motion.div className={`relative ${isMobile ? 'w-6 h-6' : 'w-7 h-7 sm:w-8 sm:h-8'} flex items-center justify-center`}>
            <motion.span
              className={`absolute block ${isMobile ? 'h-0.5 w-5' : 'h-0.5 w-5 sm:w-6'} bg-lemon_chiffon rounded-full transform origin-center`}
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 0 : (isMobile ? -6 : -8),
                scaleX: isOpen ? 1 : 1
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            <motion.span
              className={`absolute block ${isMobile ? 'h-0.5 w-5' : 'h-0.5 w-5 sm:w-6'} bg-lemon_chiffon rounded-full transform origin-center`}
              animate={{
                opacity: isOpen ? 0 : 1,
                scaleX: isOpen ? 0 : 1
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            />
            <motion.span
              className={`absolute block ${isMobile ? 'h-0.5 w-5' : 'h-0.5 w-5 sm:w-6'} bg-lemon_chiffon rounded-full transform origin-center`}
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? 0 : (isMobile ? 6 : 8),
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
};

const NavbarComponent = ({ page }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
  const isSmallMobile = windowSize.width < 480;

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
      document.addEventListener("touchstart", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
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

  // Prevent body scroll when navbar is open on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isOpen, isMobile]);

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

  // Dynamic sizing based on device
  const getNavbarWidth = () => {
    if (isSmallMobile) return 'w-full max-w-sm';
    if (isMobile) return 'w-full max-w-md';
    if (isTablet) return 'w-72';
    return 'w-300';
  };

  const getNavbarHeight = () => {
    if (isMobile) return 'h-full';
    return 'h-full';
  };

  const getNavbarPosition = () => {
    if (isMobile) return 'inset-x-0 top-0';
    return 'top-0 left-0';
  };

  const getPadding = () => {
    if (isSmallMobile) return 'p-4 pt-16';
    if (isMobile) return 'p-5 pt-18';
    return 'p-6 pt-20';
  };

  const getTextSizes = () => {
    if (isSmallMobile) return {
      title: 'text-xl',
      navText: 'text-sm',
      description: 'text-xs',
      icon: 'text-lg'
    };
    if (isMobile) return {
      title: 'text-xl',
      navText: 'text-sm',
      description: 'text-xs',
      icon: 'text-xl'
    };
    return {
      title: 'text-2xl',
      navText: 'text-base',
      description: 'text-xs',
      icon: 'text-xl'
    };
  };

  const sizes = getTextSizes();

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
          userSelect: "none",
          WebkitTapHighlightColor: "transparent"
        }}
      />

      <motion.nav
        className={`navbar-container fixed ${getNavbarPosition()} ${getNavbarHeight()} ${getNavbarWidth()} z-[50] flex flex-col`}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        style={{ 
          pointerEvents: isOpen ? "auto" : "none",
          WebkitTapHighlightColor: "transparent"
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="relative h-full w-full bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl border-r border-lemon_chiffon/20 shadow-2xl">
          {/* Enhanced mobile backdrop */}
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

          {/* Header section with responsive sizing */}
          <motion.div 
            className={`${getPadding()} border-b border-lemon_chiffon/10`}
            variants={navItemVariants}
          >
            <motion.div 
              className="text-center"
              whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.h2 
                className={`${sizes.title} font-bold bg-gradient-to-r from-lemon_chiffon via-white to-lemon_chiffon bg-clip-text text-transparent mb-2 ${isMobile ? 'mt-2' : 'mt-6'}`}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Bushra's Portfolio
              </motion.h2>
              <motion.div 
                className={`${isMobile ? 'w-12 h-0.5' : 'w-16 h-0.5'} bg-gradient-to-r from-transparent via-lemon_chiffon to-transparent mx-auto`}
                animate={{ scaleX: isOpen ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                aria-hidden="true"
              />
            </motion.div>
          </motion.div>

          {/* Navigation links with enhanced mobile styling */}
          <motion.div 
            className={`flex-1 overflow-y-auto ${isMobile ? 'px-3 py-4' : 'px-4 py-6'} scrollbar-thin scrollbar-thumb-lemon_chiffon/30 scrollbar-track-transparent`}
            variants={navItemVariants}
          >
            <motion.ul className={`space-y-${isMobile ? '2' : '3'}`} variants={navItemVariants}>
              {navLinks[page]?.map((link, index) => (
                <motion.li
                  key={`${link.id || link.to}-${index}`}
                  variants={navItemVariants}
                  custom={index}
                  whileHover={{ 
                    scale: isMobile ? 1.01 : 1.02, 
                    x: isMobile ? 4 : 8,
                    transition: { duration: 0.2, ease: "easeOut" } 
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.to ? (
                    <Link 
                      to={link.to} 
                      className={`group flex items-center gap-${isMobile ? '3' : '4'} ${isMobile ? 'px-3 py-2.5' : 'px-4 py-3'} font-medium text-slate-300 hover:text-lemon_chiffon transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-lemon_chiffon/10 hover:to-dark_teal/10 border border-transparent hover:border-lemon_chiffon/20 backdrop-blur-sm active:scale-95 touch-manipulation`}
                      onClick={() => setIsOpen(false)}
                      aria-label={`Navigate to ${link.name}`}
                      style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                      <motion.span 
                        className={`${sizes.icon} flex-shrink-0 ${isMobile ? 'w-7 h-7' : 'w-8 h-8'} flex items-center justify-center rounded-lg bg-gradient-to-br from-slate-700/50 to-slate-800/50 group-hover:from-lemon_chiffon/20 group-hover:to-dark_teal/20 transition-all duration-300`}
                        whileHover={{ rotate: isMobile ? 5 : 10, scale: isMobile ? 1.05 : 1.1 }}
                      >
                        {link.icon}
                      </motion.span>
                      <div className="flex-1 min-w-0">
                        <div className={`font-semibold ${sizes.navText} uppercase tracking-wider truncate`}>
                          {link.name}
                        </div>
                        {link.description && !isSmallMobile && (
                          <div className={`${sizes.description} text-slate-400 group-hover:text-slate-300 transition-colors duration-300 mt-0.5 truncate`}>
                            {link.description}
                          </div>
                        )}
                      </div>
                      <motion.span
                        className={`text-slate-400 group-hover:text-lemon_chiffon transition-colors duration-300 ${isMobile ? 'text-sm' : 'text-base'}`}
                        animate={{ x: 0 }}
                        whileHover={{ x: isMobile ? 2 : 4 }}
                      >
                        →
                      </motion.span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className={`group w-full flex items-center gap-${isMobile ? '3' : '4'} ${isMobile ? 'px-3 py-2.5' : 'px-4 py-3'} ${sizes.navText} font-medium text-slate-300 hover:text-lemon_chiffon transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-lemon_chiffon/10 hover:to-dark_teal/10 border border-transparent hover:border-lemon_chiffon/20 backdrop-blur-sm text-left active:scale-95 touch-manipulation`}
                      aria-label={`Scroll to ${link.name} section`}
                      style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                      <motion.span 
                        className={`${sizes.icon} flex-shrink-0 ${isMobile ? 'w-7 h-7' : 'w-8 h-8'} flex items-center justify-center rounded-lg bg-gradient-to-br from-slate-700/50 to-slate-800/50 group-hover:from-lemon_chiffon/20 group-hover:to-dark_teal/20 transition-all duration-300`}
                        whileHover={{ rotate: isMobile ? 5 : 10, scale: isMobile ? 1.05 : 1.1 }}
                      >
                        {link.icon}
                      </motion.span>
                      <div className="flex-1 min-w-0">
                        <div className={`font-semibold ${sizes.navText} uppercase tracking-wider truncate`}>
                          {link.name}
                        </div>
                        {link.description && !isSmallMobile && (
                          <div className={`${sizes.description} text-slate-400 group-hover:text-slate-300 transition-colors duration-300 mt-0.5 truncate`}>
                            {link.description}
                          </div>
                        )}
                      </div>
                      <motion.span
                        className={`text-slate-400 group-hover:text-lemon_chiffon transition-colors duration-300 ${isMobile ? 'text-sm' : 'text-base'}`}
                        animate={{ x: 0 }}
                        whileHover={{ x: isMobile ? 2 : 4 }}
                      >
                        →
                      </motion.span>
                    </button>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Decorative border - enhanced for mobile */}
          <div 
            className={`absolute ${isMobile ? 'bottom-0 left-0 w-full h-0.5' : 'right-0 top-0 h-full w-0.5'} bg-gradient-to-${isMobile ? 'r' : 'b'} from-transparent via-lemon_chiffon/30 to-transparent`} 
            aria-hidden="true"
          />
        </div>
      </motion.nav>
    </>
  );
};

export default NavbarComponent;