import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";


import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Optional, adds a blur effect while loading




//acrylic

import BlueMosque from "../assets/acrylic/1.jpg"; 
import Nature from "../assets/acrylic/2.jpg"; 
import Bloody from "../assets/acrylic/3.jpg"; 
import Boston from "../assets/acrylic/4.jpg";
import Fight from "../assets/acrylic/5.jpg"; 
import Imagination from "../assets/acrylic/6.jpg"; 
import Vase from "../assets/acrylic/7.jpg"; 
import Bridge from "../assets/acrylic/8.jpg";
import Sunset from "../assets/acrylic/9.jpg";




//water color
import China from "../assets/WaterColor/1.jpg";
import flower1 from "../assets/WaterColor/2.jpg";
import lamp from "../assets/WaterColor/4.jpg";
import flower3 from "../assets/WaterColor/5.jpg";
import sunset from "../assets/WaterColor/6.jpg";
import magic from "../assets/WaterColor/9.jpg";

//pencil sketch
import nature from "../assets/PencilSketch/1.jpg";
import rope from "../assets/PencilSketch/2.jpg";
import flower from "../assets/PencilSketch/3.jpg";
import chess from "../assets/PencilSketch/4.jpg";
import lion from "../assets/PencilSketch/5.jpg";
import hand from "../assets/PencilSketch/6.jpg";
import glass from "../assets/PencilSketch/7.jpg";
import still from "../assets/PencilSketch/8.jpg";
import still_1 from "../assets/PencilSketch/9.jpg";
import interior from "../assets/PencilSketch/10.jpg";
import perspective from "../assets/PencilSketch/11.jpg";
import nature_1 from "../assets/PencilSketch/12.jpg";
import architecture from "../assets/PencilSketch/13.jpg";
import daffodils from "../assets/PencilSketch/14.jpg";
import life from "../assets/PencilSketch/15.jpg";
import tulip from "../assets/PencilSketch/17.jpg";
import composition from "../assets/PencilSketch/18.jpg";
import lyrics from "../assets/PencilSketch/19.jpg";


//crafts
import line from "../assets/crafts/1.jpg";
import line_1 from "../assets/crafts/3.jpg";
import dot from "../assets/crafts/4.jpg";
import emotion from "../assets/crafts/5.jpg";
import brain from "../assets/crafts/6.jpg";
import notebook from "../assets/crafts/7.jpg";
import penholder from "../assets/crafts/8.jpg";
import penholder_1 from "../assets/crafts/9.jpg";
import chess_1 from "../assets/crafts/10.jpg";






gsap.registerPlugin(ScrollTrigger);






const Art = () => {
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
      { src: Nature, description: "Acrylic painting 1", title: "Sunset Glory", date: "2022" },
      { src: BlueMosque, description: "Acrylic painting 2", title: "Ocean Breeze", date: "2021" },
      { src: Bloody, description: "Acrylic painting 3", title: "Mountain Escape", date: "2020" },
      { src: Boston, description: "Acrylic painting 1", title: "Sunset Glory", date: "2022" },
      { src: Fight, description: "Acrylic painting 2", title: "Ocean Breeze", date: "2021" },
      { src: Imagination, description: "Acrylic painting 2", title: "Ocean Breeze", date: "2021" },
      { src: Vase, description: "Acrylic painting 3", title: "Mountain Escape", date: "2020" },
      { src: Bridge, description: "Acrylic painting 2", title: "Ocean Breeze", date: "2021" },
      { src: Sunset, description: "Acrylic painting 3", title: "Mountain Escape", date: "2020" },
    ],
    watercolor: [
      { src: China, description: "Acrylic painting 1", title: "Sunset Glory", date: "2022" },
      { src: flower1, description: "Acrylic painting 2", title: "Ocean Breeze", date: "2021" },
      { src: flower3, description: "Acrylic painting 1", title: "Sunset Glory", date: "2022" },
      { src: lamp, description: "Acrylic painting 2", title: "Ocean Breeze", date: "2021" },
      { src: sunset, description: "Acrylic painting 2", title: "Ocean Breeze", date: "2021" },
      { src: magic, description: "Acrylic painting 3", title: "Mountain Escape", date: "2020" },
 
    ],
    "pencil sketch": [
      { src: nature, description: "Pencil sketch 1", title: "The Thinker", date: "2019" },
      { src: rope, description: "Pencil sketch 2", title: "Quiet Reflection", date: "2020" },
      { src: flower, description: "Pencil sketch 1", title: "The Thinker", date: "2019" },
      { src: chess, description: "Pencil sketch 2", title: "Quiet Reflection", date: "2020" },
      { src: lion, description: "Pencil sketch 1", title: "The Thinker", date: "2019" },
      { src: hand, description: "Pencil sketch 2", title: "Quiet Reflection", date: "2020" },
      { src: glass, description: "Pencil sketch 1", title: "The Thinker", date: "2019" },
      { src: still, description: "Pencil sketch 2", title: "Quiet Reflection", date: "2020" },
      { src: still_1, description: "Pencil sketch 2", title: "Quiet Reflection", date: "2020" },
      { src: interior, description: "Pencil sketch 2", title: "Quiet Reflection", date: "2020" },
      { src: perspective, description: "Pencil sketch 2", title: "Quiet Reflection", date: "2020" },
      { src: nature_1, description: "Pencil sketch 2", title: "Quiet Reflection", date: "2020" },
      { src: architecture, description: "Pencil sketch 2", title: "Quiet Reflection", date: "2020" },
      { src: daffodils, description: "Pencil sketch 2", title: "Quiet Reflection", date: "2020" },
      { src: life, description: "Pencil sketch 2", title: "Quiet Reflection", date: "2020" },
      { src: tulip, description: "Pencil sketch 2", title: "Quiet Reflection", date: "2020" },
      { src: composition, description: "Pencil sketch 2", title: "Quiet Reflection", date: "2020" },
      { src: lyrics, description: "Pencil sketch 2", title: "Quiet Reflection", date: "2020" },
    ],
    "crafts and models": [
      { src: line, description: "Craft model 1", title: "Miniature House", date: "2021" },
      { src: line_1, description: "Craft model 2", title: "Handcrafted Vase", date: "2022" },
      { src: dot, description: "Craft model 2", title: "Handcrafted Vase", date: "2022" },
      { src: emotion, description: "Craft model 2", title: "Handcrafted Vase", date: "2022" },
      { src: brain, description: "Craft model 2", title: "Handcrafted Vase", date: "2022" },
      { src: notebook, description: "Craft model 2", title: "Handcrafted Vase", date: "2022" },
      { src: penholder, description: "Craft model 2", title: "Handcrafted Vase", date: "2022" },
      { src: chess_1, description: "Craft model 2", title: "Handcrafted Vase", date: "2022" },
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
<section className="relative bg-gradient-to-b from-[#1D3557] via-[#2A1B3D] to-[#F5F8CC] p-16 overflow-hidden">
  {/* Background Gradient with Glassmorphism Effect */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#1D3557] via-[#2A1B3D] to-[#F5F8CC] opacity-70 backdrop-blur-[10px] shadow-2xl"></div>

  <div className="container relative z-10 px-6 mx-auto lg:px-20" ref={containerRef}>
    {/* Header Section */}
    <motion.div
      className="mb-20 text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
    >
      <h1 className="text-7xl font-serif font-extrabold text-[#F5F8CC] tracking-widest drop-shadow-xl">
        Exquisite Artworks
      </h1>
      <p className="mt-6 text-2xl text-[#F1C0E8] font-sans opacity-90">
        A collection of masterful pieces—designed to evoke emotion and captivate the senses.
      </p>
    </motion.div>

    {/* Tab Selection */}
    <div className="flex flex-wrap justify-center gap-8 mb-16">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          className={`py-3 px-10 text-xl font-semibold rounded-full border-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md hover:border-[#F5F8CC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F5F8CC] ${
            activeTab === tab.id
              ? "bg-gradient-to-r from-[#F5F8CC] to-[#FDE4CF] text-[#2A1B3D] border-[#F5F8CC]"
              : "bg-transparent text-[#F5F8CC] border-[#F5F8CC]"
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.title}
        </motion.button>
      ))}
    </div>

    {/* Tab Description */}
    <motion.div
      className="text-center text-[#F5F8CC] mb-16 text-xl font-serif"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {tabs.find((tab) => tab.id === activeTab)?.description}
    </motion.div>

    {/* Artworks Grid */}
    <motion.div
      className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.5 } },
      }}
    >
      {artworks[activeTab].map((artwork, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
          onClick={() => setSelectedArtwork(artwork)}
          className="cursor-pointer group"
        >
          <Tilt
            options={{ max: 15, scale: 1.02, speed: 900 }}
            className="relative w-full h-[500px] bg-transparent backdrop-blur-lg bg-opacity-30 p-8 rounded-3xl shadow-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:opacity-90"
          >
            <LazyLoadImage
              src={artwork.src}
              alt={artwork.description}
              className="object-cover w-full h-full transition-all duration-500 transform rounded-xl group-hover:scale-110 group-hover:rotate-3"
              loading="lazy"
            />
            <div className="absolute text-white bottom-5 left-5">
              <h3 className="text-3xl font-semibold">{artwork.title}</h3>
              <p className="text-lg">{artwork.date}</p>
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
        transition={{ duration: 0.6 }}
      >
        <div className="w-12 h-12 border-t-4 border-[#F5F8CC] border-solid rounded-full animate-spin"></div>
      </motion.div>
    )}

    {/* Modal for Artwork Details */}
    {selectedArtwork && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {/* Glassmorphism Backdrop */}
        <motion.div
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#2A1B3D] to-[#F5F8CC] backdrop-blur-3xl opacity-70"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />

        {/* Modal Content with Border */}
        <motion.div
          className="relative bg-gradient-to-br from-[#2A1B3D] to-[#F5F8CC] backdrop-blur-lg bg-opacity-80 p-6 sm:p-10 lg:p-20 rounded-3xl shadow-2xl w-[90%] sm:w-3/4 lg:w-2/4 max-w-3xl min-h-screen sm:h-[90vh] border-8 border-[#F5F8CC]"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 250, damping: 40 }}
        >
          {/* Close Button */}
          <button
            onClick={closeDetails}
            className="absolute top-6 right-6 bg-[#FDE4CF] text-deep_indigo p-4 rounded-full shadow-2xl hover:scale-125 transition-all transform hover:rotate-45"
          >
            ✕
          </button>

          {/* Artwork Title */}
          <motion.h2
            className="text-5xl sm:text-6xl font-serif text-[#F5F8CC] font-extrabold text-center mb-12 sm:mb-14"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {selectedArtwork.title}
          </motion.h2>

          {/* Artwork Image */}
          <motion.div
            className="relative overflow-hidden group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <LazyLoadImage
              src={selectedArtwork.src}
              alt={selectedArtwork.description}
              className="object-cover w-full h-full transition-transform duration-500 rounded-xl group-hover:scale-110 group-hover:rotate-3"
            />
          </motion.div>

          {/* Artwork Description */}
          <motion.div
            className="mt-8 space-y-6 text-center sm:mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <p className="text-lg sm:text-xl text-[#F1C0E8] font-sans leading-relaxed">
              {selectedArtwork.description}
            </p>
            <p className="text-md text-[#F5F8CC]">
              Created: {selectedArtwork.date}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    )}
  </div>
</section>

  );
};

export default Art;