import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Bushra from "../assets/Bushra.png"; 



//illustration
import kingdom_1 from "../assets/sIllustration/kingdom_1.jpg";
import Bloody from "../assets/src/assets/Illustration/Warrior.jpg";
import Boston from "../assets/Acrylic/Boston_city.jpg";


gsap.registerPlugin(ScrollTrigger);

const Artworks = () => {
  const [activeTab, setActiveTab] = useState("illustration");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [galleryHeight, setGalleryHeight] = useState(0); 

  const tabs = ["illustration", "Modeling"];

  const artworks = {
    illustration: [
      { src: kingdom_1, description: "Acrylic painting 1" },
      { src: Bushra, description: "Acrylic painting 2" },
      { src: Bushra, description: "Acrylic painting 3" },
      { src: Bushra, description: "Acrylic painting 4" },
      { src: Bushra, description: "Acrylic painting 5" },
      { src: Bushra, description: "Acrylic painting 6" },
    ],
    Modeling: [
      { src: Bushra, description: "Watercolor painting 1" },
      { src: Bushra, description: "Watercolor painting 2" },
      { src: Bushra, description: "Watercolor painting 3" },
    ],

  };

  // Set up GSAP ScrollTrigger for animations when gallery appears in view
  useEffect(() => {
    gsap.to(".artwork-gallery", {
      scrollTrigger: {
        trigger: ".artwork-gallery",
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      opacity: 1,
      duration: 1,
      y: 0,
      ease: "power3.out",
    });

    gsap.from(".artwork-item", {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".artwork-gallery",
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
    });
  }, []);

  // Simulate image loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); 
    return () => clearTimeout(timer);
  }, []);

  // Handle image clicks to open modal
  const handleImageClick = (artwork) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArtwork(null);
  };

  // Next/Previous buttons inside modal
  const handleNext = () => {
    const currentIndex = artworks[activeTab].indexOf(selectedArtwork);
    const nextIndex = (currentIndex + 1) % artworks[activeTab].length;
    setSelectedArtwork(artworks[activeTab][nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = artworks[activeTab].indexOf(selectedArtwork);
    const prevIndex = (currentIndex - 1 + artworks[activeTab].length) % artworks[activeTab].length;
    setSelectedArtwork(artworks[activeTab][prevIndex]);
  };

  // Lazy load images when they come into the viewport
  const masonryLayout = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "16px",
    gridAutoRows: "minmax(250px, auto)",
  };

  return (
<section className="w-full py-16 bg-gradient-to-br from-[#0B132B] via-[#1C273B] to-[#2F3A58]">
  <div className="container px-6 mx-auto lg:px-20">
    <div className="mb-8 text-center">
      <h2 className="text-4xl font-['Playfair Display'] font-bold text-[#FFC857]">Artworks</h2>
      <p className="mt-4 text-lg text-[#F5F7FA]">
        Explore my collection of artistic creations across various mediums.
      </p>
    </div>

    {/* Tabs */}
    <div className="flex justify-center mb-12 space-x-8">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`text-xl font-['Roboto'] font-semibold ${
            activeTab === tab ? "text-[#FFC857]" : "text-[#ADA7C9]"
          } transition-colors duration-300 hover:text-[#FFC857]`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>

    {/* Content */}
    <motion.div
      className="artwork-gallery"
      style={masonryLayout}
      initial={{ opacity: 0 }}
      animate={{ opacity: loading ? 0 : 1 }} 
      exit={{ opacity: 0 }}
    >
      {/* Show skeleton loaders when images are loading */}
      {loading ? (
        <div className="w-full h-[300px] bg-[#34344F] rounded-lg animate-pulse"></div>
      ) : (
        artworks[activeTab].map((artwork, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden transition-all duration-500 transform rounded-lg shadow-lg cursor-pointer artwork-item hover:scale-105 hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => handleImageClick(artwork)}
            loading="lazy"
          >
            <img
              src={artwork.src}
              alt={artwork.description}
              className="object-cover w-full h-[300px] rounded-lg"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 bg-gradient-to-t from-black via-transparent to-transparent hover:bg-gradient-to-b hover:from-black hover:via-transparent hover:to-black">
              <p className="px-4 text-lg text-white transition-opacity duration-300 opacity-0 hover:opacity-100">
                {artwork.description}
              </p>
            </div>
          </motion.div>
        ))
      )}
    </motion.div>

    {/* Modal for full view */}
    {isModalOpen && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#0F3460] via-[#16213E] to-[#1A1A1A] bg-opacity-90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={handleCloseModal}
      >
        <motion.div
          className="relative max-w-3xl p-8 mx-auto rounded-lg shadow-lg cursor-default modal-content bg-gradient-to-r from-[#007C8A] via-[#34344F] to-[#1B1B34]"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <button
            className="absolute text-3xl font-bold text-[#FFC857] top-4 right-4 hover:text-[#FF6F3C]"
            onClick={handleCloseModal}
          >
            ×
          </button>

          <motion.img
            src={selectedArtwork.src}
            alt={selectedArtwork.description}
            className="w-full h-auto rounded-lg shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          />
          <motion.p
            className="mt-4 text-xl text-center text-[#F9F5F0]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          >
            {selectedArtwork.description}
          </motion.p>

            {/* Next and Previous buttons */}
            <motion.div
              className="absolute flex justify-between w-full px-4 space-x-4 transform -translate-x-1/2 bottom-4 left-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={handlePrev}
                className="p-2 bg-[#FF6F3C] rounded-full text-white hover:bg-[#FFC857]"
              >
                Prev
              </button>
              <button
                onClick={handleNext}
                className="p-2 bg-[#FF6F3C] rounded-full text-white hover:bg-[#FFC857]"
              >
                Next
              </button>
            </motion.div>
                
            {/* Go Back Button */}
            <motion.button
              className="px-4 py-2 mt-6 text-lg text-white transition-colors bg-[#007C8A] rounded-md hover:bg-[#1A1A1A] block mx-auto"
              onClick={handleCloseModal}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            >
              Go Back
            </motion.button>

        </motion.div>
      </motion.div>
    )}
  </div>
</section>

  );
};

export default Artworks;
