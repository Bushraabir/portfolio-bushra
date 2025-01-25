import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import PlaceholderImage from "../assets/Bushra.png"; // Replace with actual assets

gsap.registerPlugin(ScrollTrigger);

const DigitalArt = () => {
  const [activeTab, setActiveTab] = useState("acrylic");
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const tabs = [
    { id: "acrylic", title: "Acrylic", description: "Explore vibrant and textured acrylic art pieces." },
    { id: "watercolor", title: "Watercolor", description: "Soft, flowing, and colorful watercolor creations." },
    { id: "pencil sketch", title: "Pencil Sketch", description: "Detailed and intricate pencil sketches." },
    { id: "crafts and models", title: "Crafts & Models", description: "Handmade crafts and intricate models." },
  ];

  const artworks = {
    acrylic: [
      { src: PlaceholderImage, description: "Acrylic painting 1", title: "Sunset Glory", date: "2022" },
      { src: PlaceholderImage, description: "Acrylic painting 2", title: "Ocean Breeze", date: "2021" },
      { src: PlaceholderImage, description: "Acrylic painting 3", title: "Mountain Escape", date: "2020" },
      { src: PlaceholderImage, description: "Acrylic painting 1", title: "Sunset Glory", date: "2022" },
      { src: PlaceholderImage, description: "Acrylic painting 2", title: "Ocean Breeze", date: "2021" },
      { src: PlaceholderImage, description: "Acrylic painting 3", title: "Mountain Escape", date: "2020" },
    ],
    watercolor: [
      { src: PlaceholderImage, description: "Watercolor painting 1", title: "Spring Bloom", date: "2023" },
      { src: PlaceholderImage, description: "Watercolor painting 2", title: "Autumn Hues", date: "2022" },
    ],
    "pencil sketch": [
      { src: PlaceholderImage, description: "Pencil sketch 1", title: "The Thinker", date: "2019" },
      { src: PlaceholderImage, description: "Pencil sketch 2", title: "Quiet Reflection", date: "2020" },
    ],
    "crafts and models": [
      { src: PlaceholderImage, description: "Craft model 1", title: "Miniature House", date: "2021" },
      { src: PlaceholderImage, description: "Craft model 2", title: "Handcrafted Vase", date: "2022" },
    ],
  };

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500); // Simulate a loading state for images
    return () => clearTimeout(timer);
  }, []);

  const closeDetails = () => setSelectedArtwork(null);

  return (
    <section className="relative w-full py-16 bg-gradient-to-r from-[#007C8A] via-[#1A1A1A] to-[#475569]">
      {/* Background Enhancement */}
<div className="absolute inset-0 bg-gradient-to-r from-[#007C8A] via-[#1A1A1A] to-[#FFC857] opacity-80 backdrop-blur-xl bg-opacity-60 border-4 border-[#FFC857] shadow-2xl animate-fadeIn transform-gpu">
  <div className="absolute inset-0 bg-gradient-to-b from-[#007C8A] via-[#ADA7C9] to-[#1A1A1A] opacity-70 backdrop-blur-sm animate-slideUp transform-gpu"></div>
  <div className="absolute inset-0 bg-gradient-to-tr from-[#FFC857] via-[#FF6F3C] to-[#F9F5F0] opacity-50 backdrop-blur-lg animate-shimmer transform-gpu"></div>
</div>


      <div className="container relative z-10 px-6 mx-auto lg:px-20" ref={containerRef}>
        {/* Header Section */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h1 className="text-5xl font-playfair-display font-bold text-[#FFC857] drop-shadow-lg tracking-widest">
            Digital Art & Creations
          </h1>
          <p className="mt-6 text-lg text-[#F9F5F0] font-roboto tracking-wide leading-relaxed opacity-80">
            A curated collection of diverse artistic styles, from vibrant acrylics to refined pencil sketches and delicate watercolor pieces.
          </p>
        </motion.div>

{/* Tab Navigation with Smooth Transitions */}
<div className="flex flex-wrap justify-center gap-6 mb-12">
  {tabs.map((tab) => (
    <motion.button
      key={tab.id}
      className={`py-4 px-12 text-xl font-semibold rounded-full transition-all duration-500 transform ease-in-out hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFC857] ${
        activeTab === tab.id
          ? "bg-gradient-to-r from-[#FFC857] to-[#FF6F3C] text-[#1A1A1A] border-2 border-transparent"
          : "bg-transparent text-[#FFC857] border-2 border-[#FFC857] hover:bg-gradient-to-r hover:from-[#FF6F3C] hover:to-[#FFC857] hover:text-[#1A1A1A]"
      }`}
      onClick={() => setActiveTab(tab.id)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.98 }}
    >
      {tab.title}
    </motion.button>
  ))}
</div>



        {/* Tab Description */}
        <motion.div
          className="text-center text-[#FFC857] mb-12 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {tabs.find((tab) => tab.id === activeTab)?.description}
        </motion.div>

        {/* Artwork Gallery with Glassmorphism and Advanced Hover Effects */}
        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.4 } },
          }}
        >
          {artworks[activeTab].map((artwork, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              onClick={() => setSelectedArtwork(artwork)}
              className="cursor-pointer"
            >
              <Tilt
                options={{ max: 30, scale: 1.05, speed: 500 }}
                className="relative w-full h-[400px] bg-transparent backdrop-blur-sm bg-opacity-40 p-5 rounded-xl shadow-2xl transition-transform transform hover:scale-105 hover:shadow-2xl"
              >
                <motion.img
                  src={artwork.src}
                  alt={artwork.description}
                  className="object-cover w-full h-full transition-transform duration-300 transform rounded-lg group-hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  loading="lazy" // Lazy loading image
                />
                <div className="absolute text-white bottom-5 left-5">
                  <h3 className="text-2xl font-semibold">{artwork.title}</h3>
                  <p className="text-sm">{artwork.date}</p>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>

        {/* Loading Spinner */}
        {isLoading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 border-t-4 border-[#FFC857] rounded-full animate-spin"></div>
          </motion.div>
        )}
{/* Artwork Modal with Advanced Glassmorphism and Luxury Effects */}
{selectedArtwork && (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center h-screen bg-black bg-opacity-70 h-fit"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1, ease: "easeInOut" }}
  >
    {/* Backdrop with Layered Glassmorphism, Dynamic Blur, and Pulsing Effects */}
    <motion.div
      className="absolute inset-0 w-full h-screen bg-gradient-to-br from-[#007C8A] via-[#1A1A1A] to-[#FFC857] backdrop-blur-2xl opacity-70 animate-pulse"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 0.8, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />

<motion.div
  className="relative bg-gradient-to-br from-[#007C8A] to-[#FFC857] backdrop-blur-lg bg-opacity-80 p-14 rounded-3xl w-[100%] h-fit sm:w-4/5 lg:w-2/4 shadow-3xl border-8 border-[#FFC857] animate-fadeIn overflow-auto mx-auto my-10"
  initial={{ y: 100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  exit={{ y: 100, opacity: 0 }}
  transition={{ type: "spring", stiffness: 200, damping: 35 }}
  style={{ transformStyle: "preserve-3d" }}  // 3D effect
>
  <button
    onClick={closeDetails}
    className="absolute top-6 right-6 bg-[#FF6F3C] text-white p-4 rounded-full shadow-xl hover:scale-110 transition-all transform hover:rotate-45"
  >
    ✕
  </button>

  {/* Title with Subtle Glow, Drop Shadow, and Motion Effects */}
  <motion.h2
    className="text-5xl font-playfair-display text-[#FFC857] font-bold text-center mb-10 drop-shadow-2xl text-shadow-lg"
    initial={{ opacity: 0, y: -40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.2 }}
  >
    {selectedArtwork.title}
  </motion.h2>

  {/* Parallax Image with Hover and Transition Effects */}
  <motion.div
    className="relative overflow-hidden shadow-3xl rounded-xl group"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.3 }}
  >
    <img
      src={selectedArtwork.src}
      alt={selectedArtwork.description}
      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2"
    />
  </motion.div>

  {/* Description and Date with Advanced Animations */}
  <motion.div
    className="mt-10 space-y-5 text-center"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.4 }}
  >
    <p className="text-lg text-[#F9F5F0] font-roboto leading-relaxed drop-shadow-lg">
      {selectedArtwork.description}
    </p>
    <p className="text-sm text-[#FFC857]">
      Created: {selectedArtwork.date}
    </p>
  </motion.div>
</motion.div>

      {/* Glowing Border with Dynamic Animation */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-[#FFC857] rounded-full opacity-0 animate-glow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.9 }}
      />

      {/* Soft Floating Particles Animation (Optional) */}
{/* Soft Floating Particles Animation (Advanced) */}
<motion.div
  className="absolute inset-0 pointer-events-none"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "reverse" }}
>
  {/* Multiple Randomly Positioned Particles */}
  {[...Array(10)].map((_, index) => (
    <motion.div
      key={index}
      className="absolute rounded-full bg-[#FFC857] opacity-70 animate-particle"
      style={{
        width: `${Math.random() * 10 + 5}px`, 
        height: `${Math.random() * 10 + 5}px`, 
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 4 + 3}s`,
        animationDelay: `${Math.random() * 5}s`,
      }}
      animate={{
        x: Math.random() * 200 - 100, 
        y: Math.random() * 200 - 100, 
        rotate: Math.random() * 360,
      }}
      transition={{
        repeat: Infinity,
        repeatType: 'loop',
        duration: Math.random() * 5 + 4, 
      }}
    />
  ))}
</motion.div>

    </motion.div>
 
)}



      </div>
    </section>
  );
};

export default DigitalArt;
