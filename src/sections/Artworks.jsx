import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Bushra from "../assets/Bushra.png";

const Artworks = () => {
  const [activeTab, setActiveTab] = useState("acrylic");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const tabs = ["acrylic", "watercolor", "pencil sketch", "crafts and models"];

  const artworks = {
    acrylic: [
      { src: Bushra, description: "Acrylic painting 1" },
      { src: Bushra, description: "Acrylic painting 2" },
      { src: Bushra, description: "Acrylic painting 3" },
      { src: Bushra, description: "Acrylic painting 4" },
      { src: Bushra, description: "Acrylic painting 5" },
      { src: Bushra, description: "Acrylic painting 6" },
    ],
    watercolor: [
      { src: Bushra, description: "Watercolor painting 1" },
      { src: Bushra, description: "Watercolor painting 2" },
      { src: Bushra, description: "Watercolor painting 3" },
    ],
    "pencil sketch": [
      { src: Bushra, description: "Pencil sketch 1" },
      { src: Bushra, description: "Pencil sketch 2" },
      { src: Bushra, description: "Pencil sketch 3" },
    ],
    "crafts and models": [
      { src: Bushra, description: "Craft model 1" },
      { src: Bushra, description: "Craft model 2" },
    ],
  };

  const hoverEffect = {
    scale: 1.1,
    opacity: 1,
    transition: { duration: 0.3 },
  };

  const masonryLayout = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "16px",
  };

  const handleImageClick = (artwork) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArtwork(null);
  };

  useEffect(() => {
    gsap.from(".artwork-gallery", {
      duration: 1,
      opacity: 0,
      y: 50,
      ease: "power3.out",
    });
  }, []);

  const Modal = ({ isModalOpen, selectedArtwork, handleCloseModal }) => {
    return (
      isModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#0f0f1e] via-[#1a1a3d] to-[#26264b] bg-opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleCloseModal}
        >
          <motion.div
            className="relative max-w-3xl p-8 mx-auto rounded-lg shadow-lg cursor-default modal-content bg-gradient-to-r from-[#4a47a3] via-[#34344f] to-[#1b1b34]"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <button
              className="absolute text-3xl font-bold text-[#e94560] transition-colors top-4 right-4 hover:text-[#f77a96]"
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
              className="mt-4 text-xl text-center text-[#a2d2ff]"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            >
              {selectedArtwork.description}
            </motion.p>
            <motion.button
              className="px-4 py-2 mt-6 text-lg text-white transition-colors bg-[#4a47a3] rounded-md hover:bg-[#5b57b7]"
              onClick={handleCloseModal}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            >
              Go Back
            </motion.button>
          </motion.div>
        </motion.div>
      )
    );
  };

  return (
    <section className="w-full py-16 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      <div className="container px-6 mx-auto lg:px-20">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-[#e94560]">Artworks</h2>
          <p className="mt-4 text-lg text-[#a2d2ff]">
            Explore my collection of artistic creations across various mediums.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12 space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xl font-semibold ${
                activeTab === tab ? "text-[#e94560]" : "text-[#a2d2ff]"
              } transition-colors duration-300`}
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
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {artworks[activeTab].map((artwork, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
              whileHover={hoverEffect}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              onClick={() => handleImageClick(artwork)}
            >
              <img
                src={artwork.src}
                alt={artwork.description}
                className="object-cover w-full h-[300px] rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 bg-gradient-to-t from-black via-transparent to-transparent hover:bg-gradient-to-b hover:from-black hover:via-transparent hover:to-black">
                <p className="px-4 text-lg text-white transition-opacity duration-300 opacity-0 hover:opacity-100">
                  {artwork.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal for full view */}
        <Modal
          isModalOpen={isModalOpen}
          selectedArtwork={selectedArtwork}
          handleCloseModal={handleCloseModal}
        />
      </div>
    </section>
  );
};

export default Artworks;
