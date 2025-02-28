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
      if (effectiveType === "2g" || effectiveType === "3g" || saveData) setIsSlow(true);
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
          medium: "Blender, Adobe Illustrator",
          date: "2023"
        },
        {
          src: ship,
          title: "Nebular Vessel: Beacon of Life",
          description:
            "A visionary sci‑fi creation rendered in Blender, where art meets cosmic aspiration. The spaceship’s transparent, glass-like hull houses a series of delicate glass containers, each cradling a luminous core that symbolizes the spark of life. This radiant element is portrayed as the essence of human hope—a beacon destined to ignite new worlds. The interplay of reflective surfaces and ethereal light creates an atmosphere of wonder and possibility, embodying the belief that humanity will one day venture into the unknown, carrying the seeds of life across the cosmos. This piece not only celebrates technical mastery and innovative design but also encapsulates a profound narrative of exploration, renewal, and the infinite potential of life beyond Earth.",
          medium: "Blender",
          date: "2023"
        }
      ],
      illustration: [
        {
          src: kingdom,
          title: "Abyssal Dominion",
          description:
            "In the shadowy depths where the ocean conceals forgotten legends, Abyssal Dominion emerges as a surreal kingdom shrouded in mystery. This illustration invites viewers into an underworld where ethereal blues and haunting pinks converge to reveal a realm of lost majesty. Amid the silent sway of submerged ruins and the ghostly luminescence of hidden treasures, the artwork tells a story of decay interwoven with regal splendor. Every brushstroke hints at ancient secrets and the enigmatic power of a kingdom that thrives beneath the crushing weight of the deep ocean. These ideas were inspired by themes found in modern reinterpretations of mythic underwater worlds, blending the allure of the unknown with a narrative of regality and mystery.",
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
            "Inspired by the timeless allure of the Kadam flower—a cherished symbol in Bengali culture—this digital creation celebrates nature’s ephemeral poetry amid the monsoon. In this work, soft luminescence meets the rhythmic pulse of rain. The Kadam bloom unfurls gracefully as if in whispered dialogue with the monsoon’s gentle cascade. Rich, luminous hues mingle with delicate misty textures, evoking a serene dreamscape where tradition and modern digital technique coexist. Every petal and droplet hints at the fleeting beauty of life—a visual hymn of renewal and nostalgic longing for rain-soaked afternoons. The piece invites viewers to pause, reflect, and lose themselves in a moment of natural wonder and cultural reverie.",
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
          medium: "Adobe Photoshop",
          date: "2021"
        },
        {
          src: independence,
          title: "Crimson Echoes of Sacrifice",
          description:
            "A dynamic tribute honoring the blood and sacrifice of countless Bangalees who paved the path to freedom. Bold splashes of red and green evoke the national spirit, while powerful imagery and dramatic textures capture the relentless courage and resilience of a people united in their quest for independence. This artwork stands as a heartfelt homage to the enduring legacy of sacrifice and valor that continues to inspire.",
          medium: "Adobe Illustrator",
          date: "2021"
        }
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
          start: "top 85%",
          end: "bottom 15%",
          scrub: 1.5
        },
        opacity: 1,
        y: 0,
        ease: "power4.out"
      });

      gsap.utils.toArray(".artwork-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "bottom 10%",
              scrub: 1,
              toggleActions: "play none none reverse"
            }
          }
        );
      });
      if (!isMobile) {
        gsap.to(".artwork-card", {
          scrollTrigger: {
            trigger: ".artwork-gallery",
            start: "top center",
            end: "bottom center",
            scrub: 2,
            onUpdate: (self) => {
              const progress = self.progress;
              const scale = 1 - progress * 0.2;
              const y = progress * 200;
              const x = progress * 50;
              const opacity = 1 - progress * 0.3;
              gsap.to(".artwork-card", {
                scale,
                y,
                x,
                opacity,
                rotateX: progress * 10,
                rotateY: progress * 10,
                ease: "power3.out"
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
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const renderTabs = useCallback(
    () =>
      tabs.map((tab) => (
        <motion.button
          key={tab}
          onClick={() => handleTabChange(tab)}
          className={`text-base sm:text-lg md:text-xl font-semibold font-heading transition-all duration-500 transform hover:text-[#FFC857] hover:scale-110 ${
            activeTab === tab
              ? "text-[#FFC857] text-lg sm:text-xl md:text-2xl font-extrabold"
              : "text-[#cfbaf0]"
          }`}
          whileHover={{ scale: 1.15, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </motion.button>
      )),
    [tabs, activeTab, handleTabChange]
  );

  const renderArtworks = useCallback(
    () =>
      loading ? (
        <div className="w-full h-[280px] sm:h-[350px] md:h-[400px] bg-[#34344F] rounded-xl animate-pulse"></div>
      ) : (
        artworks[activeTab].map((artwork, index) => (
          <motion.div
            key={index}
            className="artwork-card relative overflow-hidden transition-all duration-600 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:rotate-2 rounded-2xl shadow-lg cursor-pointer"
            whileHover={{ scale: 1.08, rotate: 3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedArtwork(artwork)}
          >
            <motion.img
              src={artwork.src}
              alt={artwork.title}
              className="object-cover w-full h-[280px] sm:h-[350px] md:h-[400px] rounded-2xl shadow-md transition-all duration-800 ease-in-out"
              loading="lazy"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.12, duration: 0.8 }}
            />
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-end p-4 sm:p-6 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 transition-opacity duration-400"
              whileHover={{ opacity: 0.9 }}
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white font-heading">
                {artwork.title}
              </h3>
              <p className="mt-1 text-xs sm:text-sm md:text-base text-gray-300">
                Medium: {artwork.medium}
              </p>
              <p className="mt-1 text-xs sm:text-sm md:text-base text-gray-300">
                Date: {artwork.date}
              </p>
            </motion.div>
          </motion.div>
        ))
      ),
    [artworks, activeTab, loading]
  );

  return (
    <section
      id="artworks"
      className="w-full py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[#F5F8CC] via-[#F9F5F0] to-[#F1C0E8]"
    >
      <div className="container px-4 sm:px-6 md:px-10 lg:px-16 mx-auto text-center">
        <motion.h2
          className=" mt-4 sm:mt-6 md:mt-8 font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#2A1B3D] transition-all duration-600 ease-out hover:text-[#A06CD5] hover:scale-105"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          Art in Pixels
        </motion.h2>
        <p className="mt-4 sm:mt-6 md:mt-8 text-base sm:text-lg md:text-xl lg:text-2xl opacity-80 text-[#2A1B3D] tracking-wide leading-relaxed font-description">
          Step into the world of digital artistry, where technology and creativity blend to form innovative works that push boundaries. Each piece is crafted using advanced tools to evoke emotions and bring new perspectives to life.
        </p>
        <div className="flex justify-center mt-6 sm:mt-8 md:mt-10 mb-10 sm:mb-12 md:mb-16 space-x-6 sm:space-x-8 md:space-x-10">
          {renderTabs()}
        </div>
        <motion.div className="artwork-gallery grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {renderArtworks()}
        </motion.div>
      </div>
      {selectedArtwork && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4 sm:p-6 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedArtwork(null)}
        >
          <motion.div
            className="relative bg-gradient-to-br from-[#F5F8CC] to-[#F9F5F0] p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl shadow-2xl w-full max-w-[90vw] sm:max-w-[85vw] md:max-w-[75vw] lg:max-w-[65vw] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.85, y: isMobile ? 30 : 0 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, y: isMobile ? 30 : 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            drag={isMobile ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(event, info) => {
              if (info.offset.y > 200) {
                setSelectedArtwork(null);
              }
            }}
          >
            <motion.button
              className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 text-3xl sm:text-4xl text-[#A06CD5] hover:text-[#FFC857] hover:scale-110 transition-all duration-300 focus:outline-none"
              onClick={() => setSelectedArtwork(null)}
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </motion.button>
            <img
              src={selectedArtwork.src}
              alt={selectedArtwork.title}
              className="w-full h-auto rounded-xl shadow-lg max-h-[35vh] sm:max-h-[45vh] object-contain"
            />
            <h3 className="mt-3 sm:mt-4 md:mt-5 text-xl sm:text-2xl md:text-3xl font-bold text-[#2A1B3D] text-center font-heading">
              {selectedArtwork.title}
            </h3>
            <p className="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-[#2A1B3D] text-center leading-relaxed font-description">
              {selectedArtwork.description}
            </p>
            {selectedArtwork.medium && (
              <p className="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-[#2A1B3D] text-center leading-relaxed font-description">
                Medium: {selectedArtwork.medium}
              </p>
            )}
            <p className="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-[#2A1B3D] text-center leading-relaxed font-description">
              {selectedArtwork.date}
            </p>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
});

export default Artworks;