import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Lottie from "react-lottie";
import animationData from "../assets/animation/myself.json";

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
    description: "On 29th January 2023 HonourableRespected Minister of State, Public Administration, Mr. Farhad Hossain, MP visited Military Collegiate School Khulna",
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
    src: house_champion,
    description: "We have navigated challenges together, fostering greater unity and driving our collective success.",
  },
  {
    src: interhouse_drill_compitition,
    description: "I brommed the new intake batches to be trained as the cadets and perform the novices drill and finally we are the champion.",
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
    src: painting,
    description: "Explored creativity through art, earning recognition in competitions.",
  },
  {
    src: HSC,
    description: "Achieved 91% in HSC exams, contributing to the outstanding performance of the 'Ineffable 7th' batch.",
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
    <div className="mt-15 banner">
      <div className="slider" style={{ "--quantity": images.length }}>
        {images.map((image, index) => (
          <div
            className="item"
            key={index}
            style={{ "--position": index + 1 }}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            <img src={image.src} alt={image.description} />
            <div className="image-description">{image.description}</div>
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

        <div className="author">
          <h2>Stories Captured</h2>
          <p>
            <b>Adventures of my life</b>
          </p>
          <p>Explore moments that define my journey and shape my dreams!</p>
        </div>

        <div className="model">
          <Lottie
            options={{
              animationData,
              loop: true,
              autoplay: true,
            }}
            height={900}
            width={800}
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
