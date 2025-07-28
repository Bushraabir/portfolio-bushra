import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import animationData from "../assets/animation/myself.json";
import atheletics from "../assets/gallery/2022_atheletics.jpg";
import house_champion_2 from "../assets/gallery/2022_house_compitition_2.jpeg";
import house_champion_3 from "../assets/gallery/2022_house_compitition_3.jpg";
import oath from "../assets/gallery/2022_oath.jpg";
import house from "../assets/gallery/house.jpg";
import prefectship from "../assets/gallery/prefectship.png";
import cadetship from "../assets/gallery/2023_cadetship.jpg";
import physics_olympiad from "../assets/gallery/2023_physics_olympiad.jpg";
import science_fair1 from "../assets/gallery/science_fair.jpg";
import children from "../assets/gallery/2022_children.jpg";

const images = [
  {
    src: science_fair1,
    description:
      "Led a team to present innovative tech projects, showcasing innovativeness, leadership, and technical expertise and it became the best project in the science fair",
  },
  {
    src: atheletics,
    description:
      "Won Overall Championship as House Prefect, exemplifying leadership, teamwork, and dedication.",
  },
  {
    src: house,
    description:
      "On 29th January 2023 Honourable Respected Minister of State, Public Administration, Mr. Farhad Hossain, MP visited Military Collegiate School Khulna",
  },
  {
    src: children,
    description:
      "Passionate about spreading smiles, especially among deprived children, with acts of compassion and care.",
  },
  {
    src: house_champion_2,
    description:
      "Led my house of 92 cadets to championship through unity, growth, and excellence in academics, sports, and culture.",
  },
  {
    src: house_champion_3,
    description:
      "The trophies reflect our collective discipline, growth, and unyielding dedication as a united house.",
  },
  {
    src: prefectship,
    description:
      "Served as Junior House Prefect, driving unity, discipline, and growth among house members.",
  },
  {
    src: oath,
    description:
      "I promise to lead with integrity and serve others responsibly after being entrusted with great responsibility.",
  },
  {
    src: cadetship,
    description:
      "Earned distinction for completing 6 transformative years of cadetship, marked by discipline and leadership.",
  },
  {
    src: physics_olympiad,
    description:
      "Secured 1st place in the regional round of the Bangladesh Physics Olympiad and proudly represented my region in the national round, fueled by a deep passion for physics.",
  },
];

const Gallery = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleHover = (e, show) => {
    const descriptionElement = e.currentTarget.querySelector(".image-description");
    const imgElement = e.currentTarget.querySelector("img");
    if (descriptionElement && imgElement) {
      descriptionElement.style.opacity = show ? 1 : 0;
      descriptionElement.style.transform = show ? "translateY(0)" : "translateY(20px)";
      imgElement.style.transform = show ? "scale(1.1)" : "scale(1)";
      imgElement.style.filter = show ? "blur(5px)" : "blur(0)";
    }
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          background: linear-gradient(135deg, #90dbf4 0%, #e9f8fd 50%, #90dbf4 100%);
        }
        .banner {
          width: 100%;
          height: 100vh;
          text-align: center;
          overflow: hidden;
          position: relative;
        }
        .banner::before {
          position: absolute;
          width: min(1400px, 90vw);
          top: 10%;
          left: 50%;
          height: 90%;
          transform: translateX(-50%);
          content: '';
          background-image: url(/images/bg.png);
          background-size: 100%;
          background-repeat: no-repeat;
          background-position: top center;
          pointer-events: none;
          z-index: 0;
        }
        .banner .slider {
          position: absolute;
          width: 180px;
          height: 220px;
          top: 10%;
          left: calc(50% - 100px);
          transform-style: preserve-3d;
          transform: perspective(1000px);
          animation: autoRun 60s linear infinite;
          z-index: 2;
        }
        @keyframes autoRun {
          from {
            transform: perspective(1000px) rotateX(-16deg) rotateY(0deg);
          }
          to {
            transform: perspective(1000px) rotateX(-16deg) rotateY(360deg);
          }
        }
        .banner .slider .item {
          position: absolute;
          inset: 0;
          transform: 
            rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg))
            translateZ(550px);
        }
        .banner .slider .item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
        }
        .banner .slider .item .image-description {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          font-family: 'Poppins', sans-serif;
          font-size: 0.9em;
          color: #2a1b3d;
          opacity: 0;
          pointer-events: none;
          background: rgba(173, 167, 201, 0.7);
          padding: 20px;
          border-radius: 8px;
          border: 2px solid #E6B800;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .banner .slider .item:hover .image-description {
          opacity: 1;
          color: #E6B800;
          background: rgba(90, 4, 71, 0.1);
        }
        .banner .content {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(1400px, 100vw);
          padding-bottom: 100px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          z-index: 1;
        }
        .banner .content h1 {
          font-family: 'ICA Rubrik', sans-serif;
          font-size: 16em;
          line-height: 1em;
          color: #25283B;
          position: relative;
        }
        .banner .content h1::after {
          position: absolute;
          inset: 0;
          content: attr(data-content);
          z-index: 2;
          -webkit-text-stroke: 2px #d2d2d2;
          color: transparent;
        }
        .banner .content .author {
          font-family: 'Poppins', sans-serif;
          text-align: right;
          max-width: 200px;
        }
        .banner .content h2 {
          font-size: 3em;
          color: #f1c0e8;
          margin-bottom: 10px;
        }
        .banner .content p {
          font-size: 1rem;
          font-weight: bold;
          color: #a3c4f3;
          margin-bottom: 10px;
        }
        .banner .content .model {
          width: 100%;
          height: 75vh;
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 1;
        }
        .mobile-carousel {
          display: flex;
          overflow-x: auto;
          gap: 15px;
          padding: 10px;
          max-width: 100%;
          margin: 0 auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .mobile-carousel::-webkit-scrollbar {
          display: none;
        }
        .mobile-carousel .card {
          flex: 0 0 280px;
          position: relative;
          scroll-snap-align: center;
        }
        .mobile-carousel .card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 8px;
        }
        .mobile-carousel .card .image-description {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          font-family: 'Poppins', sans-serif;
          font-size: 0.8em;
          color: #2a1b3d;
          opacity: 0;
          pointer-events: none;
          background: rgba(173, 167, 201, 0.7);
          padding: 15px;
          border-radius: 8px;
          border: 2px solid #E6B800;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          transition: opacity 0.6s ease, transform 0.3s ease;
        }
        .mobile-carousel .card:hover .image-description,
        .mobile-carousel .card:active .image-description {
          opacity: 1;
          color: #E6B800;
          background: rgba(90, 4, 71, 0.1);
        }
        @media screen and (max-width: 1023px) {
          .banner .slider {
            width: 160px;
            height: 200px;
            left: calc(50% - 80px);
          }
          .banner .slider .item {
            transform: 
              rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg))
              translateZ(300px);
          }
          .banner .content h1 {
            text-align: center;
            width: 100%;
            text-shadow: 0 10px 20px #000;
            font-size: 7em;
          }
          .banner .content .author {
            color: #fff;
            padding: 20px;
            text-shadow: 0 10px 20px #000;
            max-width: unset;
            width: 100%;
            text-align: center;
          }
        }
        @media screen and (max-width: 767px) {
          .banner .slider {
            display: none;
          }
          .banner .content h1 {
            font-size: 4em;
          }
          .banner .content h2 {
            font-size: 2rem;
          }
          .banner .content p {
            text-align: center;
            font-size: 0.9rem;
          }
          .banner .content .model {
            height: 50vh;
          }
          .banner .content .model > div {
            width: 100% !important;
            height: 100% !important;
          }
        }
      `}</style>
      <div className="banner">
        {isMobile ? (
          <div className="mobile-carousel">
            {images.map((img, index) => (
              <div
                className="card"
                key={index}
                onMouseEnter={(e) => handleHover(e, true)}
                onMouseLeave={(e) => handleHover(e, false)}
                onTouchStart={(e) => handleHover(e, true)}
                onTouchEnd={(e) => handleHover(e, false)}
              >
                <LazyLoadImage
                  src={img.src}
                  alt={img.description}
                  effect="blur"
                  width="100%"
                  height="200px"
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                />
                <div className="image-description">{img.description}</div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="slider"
            style={{ "--quantity": images.length }}
            animate={{ rotateY: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            {images.map((img, index) => (
              <div
                className="item"
                style={{ "--position": index + 1 }}
                key={index}
                onMouseEnter={(e) => handleHover(e, true)}
                onMouseLeave={(e) => handleHover(e, false)}
              >
                <LazyLoadImage
                  src={img.src}
                  alt={img.description}
                  effect="blur"
                  width="100%"
                  height="100%"
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                />
                <div className="image-description">{img.description}</div>
              </div>
            ))}
          </motion.div>
        )}
        <div className="content z-5">
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
          <div className="model -z-50">
            <Lottie options={{ animationData, loop: true, autoplay: true }} height="60%" width="60%" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;