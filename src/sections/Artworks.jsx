import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Importing artworks
import kingdom from "../assets/illustration/1.jpg";
import warrior from "../assets/illustration/2.jpg";
import ship from "../assets/modeling/space_ship.png";

gsap.registerPlugin(ScrollTrigger);

const Artworks = () => {
  const [activeTab, setActiveTab] = useState("illustration");
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  const tabs = ["illustration", "modeling"];
  
  const artworks = {
    illustration: [
      { src: kingdom, title: "Kingdom", description: "Acrylic painting depicting a mystical kingdom." },
      { src: warrior, title: "Warrior", description: "A fierce warrior painted with acrylics." },
    ],
    modeling: [
      { src: ship, title: "Space Ship", description: "3D model of a futuristic space ship." },
    ],
  };

  useEffect(() => {
    gsap.to(".artwork-gallery", {
      scrollTrigger: {
        trigger: ".artwork-gallery",
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
      opacity: 1,
      y: 0,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
<section className="w-full py-16 bg-gradient-to-br from-[#2a1b3d] via-[#1d3557] to-[#16263e]">
  <div className="container px-6 mx-auto text-center lg:px-20">
    {/* Header Section */}
    <h2 className="text-4xl font-extrabold text-[#FFC857] font-serif">
      Artworks
    </h2>
    <p className="mt-4 text-lg text-[#F5F7FA] opacity-80">
      Explore my collection of artistic creations across various mediums.
    </p>

    {/* Tabs Section */}
    <div className="flex justify-center my-8 space-x-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`text-lg font-semibold transition-colors duration-300 hover:text-[#FFC857] ${
            activeTab === tab ? "text-[#FFC857]" : "text-[#cfbaf0]"
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>

    {/* Artwork Gallery Section */}
    <motion.div
      className="grid grid-cols-1 gap-6 artwork-gallery sm:grid-cols-2 md:grid-cols-3"
    >
      {loading ? (
        <div className="w-full h-[300px] bg-[#34344F] rounded-lg animate-pulse"></div>
      ) : (
        artworks[activeTab].map((artwork, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden transition-all duration-500 rounded-lg shadow-xl cursor-pointer hover:scale-105 hover:shadow-2xl"
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedArtwork(artwork)}
          >
            <img
              src={artwork.src}
              alt={artwork.title}
              className="object-cover w-full h-[300px] rounded-lg"
              loading="lazy"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-end p-4 bg-gradient-to-t from-black via-transparent to-transparent">
              <h3 className="text-lg font-bold text-white">{artwork.title}</h3>
            </div>
          </motion.div>
        ))
      )}
    </motion.div>
  </div>

  {/* Artwork Modal Section */}
  {selectedArtwork && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSelectedArtwork(null)}
    >
      <motion.div
        className="relative p-6 bg-[#1B1B34] rounded-lg shadow-lg max-w-2xl mx-auto"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.4 }}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-3xl text-[#FFC857] hover:text-[#FF6F3C]"
          onClick={() => setSelectedArtwork(null)}
        >
          ×
        </button>

        {/* Artwork Image and Details */}
        <img
          src={selectedArtwork.src}
          alt={selectedArtwork.title}
          className="w-full h-auto rounded-lg"
        />
        <h3 className="mt-4 text-xl font-bold text-[#FFC857] text-center">
          {selectedArtwork.title}
        </h3>
        <p className="mt-2 text-lg text-[#F9F5F0] text-center">
          {selectedArtwork.description}
        </p>

        {/* Close Modal Button */}
        <button
          className="mt-6 px-4 py-2 text-white bg-[#007C8A] rounded-md hover:bg-[#1A1A1A] block mx-auto"
          onClick={() => setSelectedArtwork(null)}
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  )}
</section>


  );
};

export default Artworks;
