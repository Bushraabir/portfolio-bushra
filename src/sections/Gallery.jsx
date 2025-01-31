import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Lottie from "react-lottie";
import animationData from "../assets/animation/myself.json";
import color from "../assets/animation/gradient.json";



import atheletics from "../assets/gallery/2022_atheletics.jpg";
import house_champion from "../assets/gallery/2022_house_champion.jpg";
import house_champion_2 from "../assets/gallery/2022_house_compitition_2.jpeg";
import house_champion_3 from "../assets/gallery/2022_house_compitition_3.jpg";
import oath from "../assets/gallery/2022_oath.jpg";
import interhouse_drill_compitition from "../assets/gallery/2023_interhouse_drill_compitition.jpg";
import house from "../assets/gallery/house.jpg";
import prefectship from "../assets/gallery/prefectship.png";
import cadetship from "../assets/gallery/2023_cadetship.jpg";
import painting from "../assets/gallery/2022_painting_compitition.jpg";
import HSC from "../assets/gallery/2023_HSC.jpg";
import physics_olympiad from "../assets/gallery/2023_physics_olympiad.jpg";
import science_fair1 from "../assets/gallery/science_fair.jpg";
import children from "../assets/gallery/2022_children.jpg";

import "./gallery.css";

const images = [
  {
    src: science_fair1,
    description: "Led a team to present innovative tech projects, showcasing innovativeness, leadership, and technical expertise and it became the best project in the science fair"
  },
  {
    src: atheletics,
    description: "Won Overall Championship as House Prefect, exemplifying leadership, teamwork, and dedication.",
  },
  {
    src: house,
    description: "On 29th January 2023 Honourable Respected Minister of State, Public Administration, Mr. Farhad Hossain, MP visited Military Collegiate School Khulna",
  },
  {
    src: children,
    description: "Passionate about spreading smiles, especially among deprived children, with acts of compassion and care.",
  },
  {
    src: house_champion_2,
    description: "Led my house of 92 cadets to championship through unity, growth, and excellence in academics, sports, and culture.",
  },
  {
    src: house_champion_3,
    description: "The trophies reflect our collective discipline, growth, and unyielding dedication as a united house.",
  },

  {
    src: prefectship,
    description: "Served as Junior House Prefect, driving unity, discipline, and growth among house members.",
  },
  {
    src: oath,
    description: "I promise to lead with integrity and serve others responsibly after being entrusted with great responsibility.",
  },


  {
    src: cadetship,
    description: "Earned distinction for completing 6 transformative years of cadetship, marked by discipline and leadership.",
  },
  {
    src: physics_olympiad,
    description: "Secured 1st place in the regional round of the Bangladesh Physics Olympiad and proudly represented my region in the national round, fueled by a deep passion for physics.",
  },
];

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Increased the interval for slower box translation
    return () => clearInterval(interval);
  }, []);

  const handleHover = (e, show = true) => {
    const descriptionElement = e.currentTarget.querySelector(".image-description");
    const imgElement = e.currentTarget.querySelector("img");

    if (descriptionElement) {
      gsap.to(descriptionElement, {
        opacity: show ? 1 : 0,
        y: show ? 0 : 20,
        duration: 0.7, // Slowed down transition for better effect
        ease: "power3.out",
      });
    }

    // Apply blur effect on the image when hovered
    if (imgElement) {
      gsap.to(imgElement, {
        scale: show ? 1.1 : 1, // Enlarge on hover
        filter: show ? "blur(5px)" : "blur(0)", // Blur effect on hover
        duration: 0.5,
      });
    }
  };

  return (
<div className="relative py-16 overflow-hidden banner bg-lemon_chiffon h-[100vh]">


  {/* Other content */}
  <div className="absolute inset-0 shadow-lg bg-gradient-to-b from-lemon_chiffon via-light_gold to-soft_peach opacity-90 backdrop-blur-md z-5"></div>
  <div className="absolute inset-0 bg-radial-gradient(closest-corner, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.25)) opacity-20 mix-blend-overlay z-5"></div>

        
      <div className=" slider rounded-3xl" style={{ "--quantity": images.length }}>
        {images.map((image, index) => (
          <div
            className="border-2 shadow-lg item border-lemon_chiffon rounded-xl"
            key={index}
            style={{ "--position": index + 1 }}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            <img src={image.src} alt={image.description} />
            <div className="image-description bg-lavender-gray text-golden-yellow">{image.description}</div>
          </div>
        ))}
      </div>

      <div className="content">
        <motion.h1
          data-content="In Frame"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          In Frame
        </motion.h1>

        <div className="font-sans text-lg text-right author text-dark_teal">
          <h2 className="mb-2 font-serif text-4xl">Stories Captured</h2>
          <p className="text-xl font-bold">Adventures of my life</p>
          <p className="mt-2 text-lg">Explore moments that define my journey and shape my dreams!</p>
        </div>


        <div className="model">
          <Lottie
            options={{
              animationData,
              loop: true,
              autoplay: true,
            }}
            height={800}
            width="80%"
          />
        </div>

      </div>
    </div>
  );
};

export default Gallery;

