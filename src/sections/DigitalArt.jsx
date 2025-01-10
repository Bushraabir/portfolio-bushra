import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Bushra from "../assets/Bushra.png"; // Placeholder image for demo purposes.

const DigitalArt = () => {
  const [activeTab, setActiveTab] = useState("acrylic");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const tabs = ["acrylic", "watercolor", "pencil sketch", "crafts and models"];

  const artworks = {
    acrylic: [
      { src: Bushra, description: "Acrylic painting 1" },
      { src: Bushra, description: "Acrylic painting 2" },
      { src: Bushra, description: "Acrylic painting 3" },
    ],
    watercolor: [
      { src: Bushra, description: "Watercolor painting 1" },
      { src: Bushra, description: "Watercolor painting 2" },
    ],
    "pencil sketch": [
      { src: Bushra, description: "Pencil sketch 1" },
      { src: Bushra, description: "Pencil sketch 2" },
    ],
    "crafts and models": [
      { src: Bushra, description: "Craft model 1" },
      { src: Bushra, description: "Craft model 2" },
    ],
  };

  useEffect(() => {
    gsap.from(".artwork-gallery", {
      duration: 1.5,
      opacity: 0,
      y: 30,
      ease: "power3.out",
    });
  }, []);

  const handleImageClick = (artwork) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArtwork(null);
  };

  return (
    <section className="w-full min-h-screen py-20 bg-dark">
      <div className="container px-6 mx-auto lg:px-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl font-bold lg:text-5xl text-gold">
            My Digital Art Gallery
          </h1>
          <p className="mt-4 text-lg text-secondary">
            A curated selection of my artistic creations across various styles
            and techniques.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12 space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-lg font-sans font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? "bg-gold text-dark rounded-full shadow-xl"
                  : "text-secondary hover:text-light hover:bg-accent rounded-full"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Artwork Gallery */}
        <motion.div
          className="grid gap-6 artwork-gallery md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {artworks[activeTab].map((artwork, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-2xl cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleImageClick(artwork)}
            >
              <img
                src={artwork.src}
                alt={artwork.description}
                className="w-full h-[250px] object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-gradient-to-t from-dark via-transparent to-transparent group-hover:opacity-90">
                <p className="px-4 text-lg font-medium text-light">
                  {artwork.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal */}
        {isModalOpen && selectedArtwork && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="relative w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-2xl font-bold text-[#344055] hover:text-[#676FA3]"
                onClick={handleCloseModal}
              >
                &times;
              </button>
              <img
                src={selectedArtwork.src}
                alt={selectedArtwork.description}
                className="w-full h-auto rounded-lg"
              />
              <p className="mt-4 text-center text-[#676FA3] text-lg">
                {selectedArtwork.description}
              </p>
              <button
                className="mt-6 px-6 py-2 bg-[#676FA3] text-white rounded-full hover:bg-[#4B5A8A] transition-colors"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default DigitalArt;
