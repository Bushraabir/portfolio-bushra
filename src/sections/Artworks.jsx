import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import kingdom from "../assets/illustration/1.jpg";
import warrior from "../assets/illustration/2.jpg";
import logo from "../assets/illustration/3.png";
import birth from "../assets/illustration/4.png";
import independence from "../assets/illustration/5.png";
import can from "../assets/modeling/can.png";
import ship from "../assets/modeling/space_ship.png";
import buet from "../assets/illustration/buet.jpg";
import laran from "../assets/illustration/kodom.jpg";

gsap.registerPlugin(ScrollTrigger);

const useNetworkStatus = () => {
  const [isSlow, setIsSlow] = useState(false);
  useEffect(() => {
    if (navigator.connection) {
      const { effectiveType, saveData } = navigator.connection;
      if (effectiveType === "2g" || saveData) setIsSlow(true);
    }
  }, []);
  return isSlow;
};

const Artworks = React.memo(() => {
  const [activeTab, setActiveTab] = useState("modeling");
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useMemo(() => window.innerWidth <= 768, []);
  const isSlowConnection = useNetworkStatus();
  const tabs = useMemo(() => ["modeling", "illustration"], []);

  const artworks = useMemo(
    () => ({
      modeling: [
        {
          src: can,
          title: "A Digital Rhapsody",
          description:
            "A visionary exploration that fuses the precision of digital rendering with the soul of handcrafted narrative. Developed in Blender and enriched by meticulously crafted labels in Illustrator, the artwork presents a harmonious still life where industrial elements—weathered cans, rustic wooden blocks, and textured stone—are bathed in soft, ambient light. The overlaid annotations serve as poetic whispers, inviting the viewer to unravel hidden layers of meaning and engage in a dialogue between form and sentiment. This piece is a celebration of the convergence between modern technology and traditional artistic expression, offering a dynamic interplay of structure and spontaneity that captures the ephemeral essence of creative thought.",
          medium: "Blender,Adobe Illustrator",
          date: "2023"
        },
        {
          src: ship,
          title: "Nebular Vessel: Beacon of Life",
          description:
            " a visionary sci‑fi creation rendered in Blender, where art meets cosmic aspiration. The spaceship’s transparent, glass-like hull houses a series of delicate glass containers, each cradling a luminous core that symbolizes the spark of life. This radiant element is portrayed as the essence of human hope—a beacon destined to ignite new worlds. The interplay of reflective surfaces and ethereal light creates an atmosphere of wonder and possibility, embodying the belief that humanity will one day venture into the unknown, carrying the seeds of life across the cosmos. This piece not only celebrates technical mastery and innovative design but also encapsulates a profound narrative of exploration, renewal, and the infinite potential of life beyond Earth.",
          medium: "Blender",
          date: "2023"
        }
      ],
      illustration: [
        {
          src: kingdom,
          title: "Abyssal Dominion",
          description:
            "In the shadowy depths where the ocean conceals forgotten legends, Abyssal Dominion emerges as a surreal kingdom shrouded in mystery. This illustration invites viewers into an underworld where ethereal blues and haunting pinks converge to reveal a realm of lost majesty. Amid the silent sway of submerged ruins and the ghostly luminescence of hidden treasures, the artwork tells a story of decay interwoven with regal splendor. Every brushstroke hints at ancient secrets and the enigmatic power of a kingdom that thrives beneath the crushing weight of the deep ocean.These ideas were inspired by themes found in modern reinterpretations of mythic underwater worlds, blending the allure of the unknown with a narrative of regality and mystery .",
          medium: "Photoshop, Illustrator",
          date: "2023"
        },
        {
          src: warrior,
          title: "Crimson Valor: The Spirit of Liberation",
          description:
            "This Adobe Illustrator artwork stands as a vivid tribute to the bravery of Bengali freedom fighters during the Liberation War. By reimagining the Bangladesh flag as a resolute, character-like emblem armed with a rifle, the piece powerfully blends modern digital aesthetics with profound national symbolism. The bold incorporation of the nation's map within a red circle further evokes an enduring spirit of sacrifice and unity, celebrating a pivotal moment in history.",
          medium: "Adobe Illustrator",
          date: "2023"
        },
        {
          src: buet,
          title: "Serenity In Structure",
          description:
            "This Adobe Illustrator artwork beautifully captures the iconic BUET Architecture Building and the serene bench in front of it. The organic, free-flowing frame blends nature with structural elements, reflecting the harmony between design and environment. The textured rocks, lush greenery, and modern facade create a visual balance, symbolizing the fusion of tradition and innovation in architectural education. The stylized approach adds an artistic depth, making this piece not just a depiction but a tribute to BUET’s architectural legacy.",
          medium: "Adobe Illustrator",
          date: "2023"
        },
        {
          src: laran,
          title: "Monsoon Whisper: The Kadam Bloom",
          description:
            "Inspired by the timeless allure of the Kadam flower—a cherished symbol in Bengali culture—this digital creation celebrates nature’s ephemeral poetry amid the monsoon.In this work, soft luminescence meets the rhythmic pulse of rain. The Kadam bloom unfurls gracefully as if in whispered dialogue with the monsoon’s gentle cascade. Rich, luminous hues mingle with delicate misty textures, evoking a serene dreamscape where tradition and modern digital technique coexist. Every petal and droplet hints at the fleeting beauty of life—a visual hymn of renewal and nostalgic longing for rain-soaked afternoons. The piece invites viewers to pause, reflect, and lose themselves in a moment of natural wonder and cultural reverie",
          medium: "Digital",
          date: "2022"
        },
        {
          src: logo,
          title: "Symphony of Imagination",
          description:
            "A vibrant fusion of creativity and self-expression, this is the official logo for the 'Eyes on Talent' Facebook page and group. It seamlessly intertwines the fluid brushstrokes of painting, the captivating lens of photography, and the melodic curves of music. Designed to embody the spirit of a community where students and individuals of all ages showcase their talents and creativity, this logo invites everyone to join a celebration of artistic exploration and innovation.",
          medium: "Adobe Photoshop",
          date: "2021"
        },
        {
          src: birth,
          title: "Eternal Flame of Independence",
          description:
            "A heartfelt tribute crafted to celebrate the birthday of the Father of the Nation, Bangabandhu Sheikh Mujibur Rahman. This piece merges a dignified portrait with a mosaic of smaller images, symbolizing the collective memory and unity he ignited in Bangladesh. Warm hues and overlapping visuals highlight his enduring legacy, capturing the spirit of resilience, liberation, and hope that continues to guide the nation forward.",
          medium: "Adobe phoptoshop",
          date: "2021"
        },
        {
          src: independence,
          title: "Crimson Echoes of Sacrifice",
          description:
            "A dynamic tribute honoring the blood and sacrifice of countless Bangalees who paved the path to freedom. Bold splashes of red and green evoke the national spirit, while powerful imagery and dramatic textures capture the relentless courage and resilience of a people united in their quest for independence. This artwork stands as a heartfelt homage to the enduring legacy of sacrifice and valor that continues to inspire.",
          medium: "Adobe Illustrator",
          date: "2021"
        },
      ]
    }),
    []
  );

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setSelectedArtwork(null);
  }, []);

  useEffect(() => {
    if (!isSlowConnection) {
      gsap.to(".artwork-gallery", {
        scrollTrigger: {
          trigger: ".artwork-gallery",
          start: "top 80%",
          end: "bottom 20%",
          scrub: true
        },
        opacity: 1,
        y: 0,
        ease: "power3.out"
      });
      gsap.from(".section-header", {
        scrollTrigger: {
          trigger: ".section-header",
          start: "top 80%",
          end: "bottom 20%",
          scrub: true
        },
        opacity: 0,
        y: 40,
        ease: "power3.out"
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
                toggleActions: "play none none reverse"
              }
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
                ease: "power2.out"
              });
            }
          }
        });
      }
    } else {
      document.querySelectorAll(".artwork-gallery").forEach((el) => {
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
      });
    }
  }, [isMobile, isSlowConnection]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const renderTabs = useCallback(
    () =>
      tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabChange(tab)}
          className={`text-lg font-semibold font-heading transition-all duration-300 transform hover:text-[#FFC857] hover:scale-105 ${
            activeTab === tab
              ? "text-[#FFC857] text-xl font-extrabold"
              : "text-[#cfbaf0]"
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      )),
    [tabs, activeTab, handleTabChange]
  );

  const renderArtworks = useCallback(
    () =>
      loading ? (
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
              <h3 className="text-xl font-semibold text-white font-heading">
                {artwork.title}
              </h3>
              <p className="mt-2 text-sm text-gray-300">
                Medium: {artwork.medium}
              </p>
              <p className="mt-1 text-sm text-gray-300">
                Date: {artwork.date}
              </p>
            </div>
          </motion.div>
        ))
      ),
    [artworks, activeTab, loading]
  );

  return (
    <section
      id="artworks"
      className="w-full py-16 bg-gradient-to-br from-lemon_chiffon via-champagne_pink to-tea_rose"
    >
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
          {renderTabs()}
        </div>
        <motion.div className="grid grid-cols-1 gap-12 artwork-gallery sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {renderArtworks()}
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
            className={`relative bg-[#1B1B34] ${
              isMobile
                ? "w-full h-full p-4 overflow-y-auto"
                : "p-8 rounded-3xl shadow-2xl max-w-3xl mx-auto"
            }`}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, y: isMobile ? 20 : 0 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: isMobile ? 20 : 0 }}
            transition={{ duration: 0.5 }}
            drag={isMobile ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(event, info) => {
              if (info.offset.y > 150) {
                setSelectedArtwork(null);
              }
            }}
          >
            <motion.button
              className="absolute top-6 right-6 text-4xl text-[#FFC857] hover:text-[#FF6F3C] font-cta focus:outline-none"
              onClick={() => setSelectedArtwork(null)}
            
            
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              ×
            </motion.button>
            <img
              src={selectedArtwork.src}
              alt={selectedArtwork.title}
              className={`w-full h-auto rounded-xl shadow-xl ${
                isMobile ? "max-h-[40vh] object-contain" : ""
              }`}
            />
            <h3 className="mt-3 text-2xl font-bold text-[#FFC857] text-center font-heading">
              {selectedArtwork.title}
            </h3>
            <p className="mt-1 text-xl text-[#F9F5F0] text-center leading-relaxed font-description">
              {selectedArtwork.description}
            </p>
            {selectedArtwork.medium && (
              <p className="mt-1 text-xl text-[#F9F5F0] text-center leading-relaxed font-description">
                Medium: {selectedArtwork.medium}
              </p>
            )}
            <p className="mt-1 text-xl text-[#F9F5F0] text-center leading-relaxed font-description">
              {selectedArtwork.date}
            </p>
          </motion.div>
        </motion.div>
      )}


    </section>
  );
});

export default Artworks;
