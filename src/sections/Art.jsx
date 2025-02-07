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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;



  const tabs = [
    { id: "acrylic", title: "Acrylic", description: "Explore vibrant and textured acrylic art pieces." },
    { id: "watercolor", title: "Watercolor", description: "Soft, flowing, and colorful watercolor creations." },
    { id: "pencil sketch", title: "Pencil Sketch", description: "Detailed and intricate pencil sketches." },
    { id: "crafts and models", title: "Crafts & Models", description: "Handmade crafts and intricate models." },
  ];

  const artworks = {
    acrylic: [
      { src: Imagination, description: "Acrylic painting 2", title: "Imagination", date: "2020" },
      { src: Fight, description: "Acrylic painting 2", title: "Survival", date: "2019" },
      { src: Nature, description: "Acrylic painting 1", title: "The Mist", date: "2023" },
      { src: Boston, description: "Acrylic painting 1", title: "Boston City", date: "2021" },
      { src: Bridge, description: "Acrylic painting 2", title: " The  bridge", date: "2024" },
      { src: BlueMosque, description: "Acrylic painting 2", title: "Blue Mosue", date: "2020" },
      { src: Bloody, description: "Acrylic painting 3", title: "Bloody", date: "2018" },
      { src: Vase, description: "Acrylic painting 3", title: "Splash of flowers", date: "2017" },     
      { src: Sunset, description: "Acrylic painting 3", title: "The Beginning", date: "2024" },
    ],
    watercolor: [
      { src: China, description: "Acrylic painting 1", title: "The Chinese Architecture", date: "2024" },
      { src: flower1, description: "Acrylic painting 2", title: "frangipani", date: "2022" },
      { src: flower3, description: "Acrylic painting 1", title: "Roses", date: "2020" },
      { src: lamp, description: "Acrylic painting 2", title: "Enlighten", date: "2024" },
      { src: magic, description: "Acrylic painting 3", title: "The Magic of Life", date: "2020" },
      { src: sunset, description: "Acrylic painting 2", title: "Ocean Breeze", date: "2020" },
      
 
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
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const closeDetails = () => setSelectedArtwork(null);

  const indexOfLastArtwork = currentPage * itemsPerPage;
  const indexOfFirstArtwork = indexOfLastArtwork - itemsPerPage;
  const currentArtworks = artworks[activeTab]?.slice(indexOfFirstArtwork, indexOfLastArtwork);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(artworks[activeTab]?.length / itemsPerPage);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1);
    preloadImages(artworks[tabId]);
  };

  const preloadImages = (artworkList) => {
    artworkList.forEach((artwork) => {
      const img = new Image();
      img.src = artwork.src; // Preload image
    });
  };

  const artworkHover = (e) => {
    const artwork = e.target.closest(".artwork");
    gsap.to(artwork, {
      scale: 1.1,
      rotation: 5,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const artworkHoverOut = (e) => {
    const artwork = e.target.closest(".artwork");
    gsap.to(artwork, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const openModal = (artwork) => {
    setSelectedArtwork(artwork);
    gsap.fromTo(
      ".modal-content",
      { opacity: 0, scale: 0.8, y: -50 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }
    );
  };

  const closeModal = () => {
    gsap.to(".modal-content", {
      opacity: 0,
      scale: 0.8,
      y: 50,
      duration: 0.3,
      ease: "back.in(1.7)",
      onComplete: () => setSelectedArtwork(null),
    });
  };

  useEffect(() => {
    gsap.fromTo(
      ".artwork",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".artwork",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-[#1D3557] via-[#2A1B3D] to-[#F5F8CC] p-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1D3557] via-[#2A1B3D] to-[#F5F8CC] opacity-70 backdrop-blur-[10px] shadow-2xl"></div>

      <div className="container relative z-10 px-6 mx-auto lg:px-20" ref={containerRef}>
      {/* Title */}
      <div className="mb-20 text-center">
        <h1 className="text-7xl font-serif font-extrabold text-[#F5F8CC] tracking-widest drop-shadow-xl">
          Exquisite Artistry
        </h1>
        <p className="mt-6 text-2xl text-[#F1C0E8] font-sans opacity-90">
          A curated collection of artworks, meticulously crafted to inspire and engage through emotion and creativity.
        </p>
      </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-3 px-10 text-xl font-semibold rounded-full border-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md hover:border-[#F5F8CC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F5F8CC] ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[#F5F8CC] to-[#FDE4CF] text-[#2A1B3D] border-[#F5F8CC]"
                  : "bg-transparent text-[#F5F8CC] border-[#F5F8CC]"
              }`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Description for Active Tab */}
        <div className="text-center text-[#F5F8CC] mb-16 text-xl font-serif">
          {tabs.find((tab) => tab.id === activeTab)?.description}
        </div>

        {/* Artwork Grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {currentArtworks.map((artwork, index) => (
            <div
              key={index}
              className="artwork group"
              onClick={() => openModal(artwork)}
              onMouseEnter={artworkHover}
              onMouseLeave={artworkHoverOut}
            >
              <Tilt
                options={{ max: 15, scale: 1.02, speed: 900 }}
                className="relative w-full h-[400px] bg-transparent backdrop-blur-lg bg-opacity-30 p-8 rounded-3xl shadow-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:opacity-90"
              >
                <LazyLoadImage
                  src={artwork.src}
                  alt={artwork.description}
                  className="object-cover w-full h-full transition-all duration-500 transform rounded-xl group-hover:scale-110 group-hover:rotate-3"
                  loading="lazy"
                  placeholderSrc={artwork.placeholderSrc} // LQIP (Low Quality Image Placeholder)
                />
                <div className="absolute text-white bottom-5 left-5">
                  <h3 className="text-3xl font-semibold">{artwork.title}</h3>
                  <p className="text-lg">{artwork.date}</p>
                </div>
              </Tilt>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-16">
          <div className="flex items-center gap-6">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`text-lg font-medium px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-[#F5F8CC] hover:text-[#2A1B3D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F5F8CC] ${
                  currentPage === index + 1 ? "bg-[#F5F8CC] text-[#2A1B3D]" : "bg-transparent text-[#F5F8CC]"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Modal (Artwork Details) */}
        {selectedArtwork && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
            onClick={closeModal} 
          >
            <div
              className="modal-content bg-gradient-to-r from-lemon_chiffon to-tea_rose p-6 md:p-12 rounded-3xl relative w-full md:w-10/12 lg:w-8/12 xl:w-7/12 max-h-[90vh] overflow-auto shadow-3xl transform transition-all duration-500 ease-in-out animate-fade-in opacity-90"
              onClick={(e) => e.stopPropagation()} 
            >
              {/* Close Button */}
              <button
                className="absolute font-serif text-4xl font-semibold transition-all duration-300 ease-in-out transform top-6 right-6 text-deep_indigo hover:text-electric_blue"
                onClick={closeModal} 
              >
                &times;
              </button>

              {/* Artwork Image */}
              <LazyLoadImage
                src={selectedArtwork.src}
                alt={selectedArtwork.description}
                className="object-contain w-full h-full max-h-[80vh] mb-8 rounded-xl border-4 border-transparent transition-all duration-500 hover:scale-105 hover:rotate-3 hover:shadow-2xl hover:border-[#F5F8CC] hover:border-8 hover:ring-4 hover:ring-[#FFC857] hover:ring-opacity-30 animate-slide-up"
                loading="lazy"
                placeholderSrc={selectedArtwork.placeholderSrc}
              />



              {/* Artwork Title and Description */}
              <div className="mt-6 text-center">
                {/* Title */}
                <h2 className="font-serif text-4xl font-extrabold text-[#2A1B3D] mb-3 tracking-wide hover:text-non_photo_blue transition-all duration-300 ease-in-out">
                  {selectedArtwork.title}
                </h2>
                      
                {/* Description */}
                <p className="max-w-4xl px-4 mx-auto mb-6 text-xl font-medium leading-relaxed text-non_photo_blue opacity-90">
                  {selectedArtwork.description}
                </p>
                      
                {/* Date */}
                <p className="text-lg text-[#A7A6B0] font-semibold uppercase tracking-widest">
                  {selectedArtwork.date}
                </p>
              </div>

            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Art;