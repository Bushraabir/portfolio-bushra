import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
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
  const isMobile = window.innerWidth <= 768;
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
    gsap.from(".section-header", {
      scrollTrigger: {
        trigger: ".section-header",
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
      opacity: 0,
      y: 40,
      ease: "power3.out",
    });
    if (!isMobile) {
      gsap.utils.toArray(".artwork-card").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0, scale: 1, zIndex: 1 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            zIndex: 10,
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              toggleActions: "play none none reverse",
            },
          }
        );
      });
      gsap.to(".artwork-card", {
        scrollTrigger: {
          trigger: ".artwork-gallery",
          start: "top center",
          end: "bottom center",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const scale = 1 - progress * 0.3;
            const y = progress * 300;
            const x = progress * 80;
            const opacity = 1 - progress * 0.4;
            gsap.to(".artwork-card", {
              scale,
              y,
              x,
              opacity,
              rotateX: progress * 20,
              rotateY: progress * 20,
              ease: "power2.out",
            });
          },
        },
      });
    }
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);
  return (
    <section id="artworks" className="w-full py-16 bg-gradient-to-br from-lemon_chiffon via-champagne_pink to-tea_rose">
      <div className="container px-6 mx-auto text-center lg:px-20">
      <motion.h2
        className="mt-5 font-heading text-6xl sm:text-6xl md:text-7xl font-extrabold relative z-20 text-deep_indigo-500 transition-all duration-500 ease-out before:content-[attr(data-content)] before:absolute before:inset-0 before:text-transparent before:border-deep_indigo-500 before:-webkit-text-stroke-[2px] hover:text-non_photo_blue-500 hover:scale-110"
        data-content="Art in Pixels"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        Art in Pixels
      </motion.h2>

        <p className="mt-8 text-xl opacity-80 text-deep_indigo tracking-wide leading-relaxed animate-slide-up font-description">
          Step into the world of digital artistry, where technology and creativity blend to form innovative works that push boundaries. Each piece is crafted using advanced tools to evoke emotions and bring new perspectives to life.
        </p>
        <div className="flex justify-center mt-10 mb-12 space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-lg font-semibold font-heading transition-all duration-300 transform hover:text-[#FFC857] hover:scale-105 ${
                activeTab === tab ? "text-[#FFC857] text-xl font-extrabold" : "text-[#cfbaf0]"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <motion.div className="grid grid-cols-1 gap-12 artwork-gallery sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            <div className="w-full h-[300px] bg-[#34344F] rounded-lg animate-pulse"></div>
          ) : (
            artworks[activeTab].map((artwork, index) => (
              <motion.div
                key={index}
                className="artwork-card relative overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-110 hover:shadow-2xl hover:rotate-3 rounded-xl shadow-xl cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedArtwork(artwork)}
              >
                <motion.img
                  src={artwork.src}
                  alt={artwork.title}
                  className="object-cover w-full h-[350px] rounded-xl shadow-md transition-all duration-700 ease-in-out"
                  loading="lazy"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-80 transition-opacity">
                  <h3 className="text-xl font-semibold text-white font-heading">{artwork.title}</h3>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
      {selectedArtwork && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedArtwork(null)}
        >
          <motion.div
            className="relative p-8 bg-[#1B1B34] rounded-3xl shadow-2xl max-w-3xl mx-auto"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <button
              className="absolute top-6 right-6 text-4xl text-[#FFC857] hover:text-[#FF6F3C] font-cta"
              onClick={() => setSelectedArtwork(null)}
            >
              ×
            </button>
            <motion.img
              src={selectedArtwork.src}
              alt={selectedArtwork.title}
              className="w-full h-auto rounded-xl shadow-xl transition-all duration-500"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
            />
            <h3 className="mt-6 text-2xl font-bold text-[#FFC857] text-center font-heading">
              {selectedArtwork.title}
            </h3>
            <p className="mt-4 text-lg text-[#F9F5F0] text-center leading-relaxed font-description">
              {selectedArtwork.description}
            </p>
            <button
              className="mt-8 px-8 py-3 text-white bg-[#007C8A] rounded-xl hover:bg-[#1A1A1A] block mx-auto text-lg transition-all duration-300 font-cta"
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
