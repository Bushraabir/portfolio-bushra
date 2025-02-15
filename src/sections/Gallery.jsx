import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

const images = [
  {
    src: science_fair1,
    description:
      "Led a team to present innovative tech projects, showcasing innovativeness, leadership, and technical expertise and it became the best project in the science fair"
  },
  {
    src: atheletics,
    description:
      "Won Overall Championship as House Prefect, exemplifying leadership, teamwork, and dedication."
  },
  {
    src: house,
    description:
      "On 29th January 2023 Honourable Respected Minister of State, Public Administration, Mr. Farhad Hossain, MP visited Military Collegiate School Khulna"
  },
  {
    src: children,
    description:
      "Passionate about spreading smiles, especially among deprived children, with acts of compassion and care."
  },
  {
    src: house_champion_2,
    description:
      "Led my house of 92 cadets to championship through unity, growth, and excellence in academics, sports, and culture."
  },
  {
    src: house_champion_3,
    description:
      "The trophies reflect our collective discipline, growth, and unyielding dedication as a united house."
  },
  {
    src: prefectship,
    description:
      "Served as Junior House Prefect, driving unity, discipline, and growth among house members."
  },
  {
    src: oath,
    description:
      "I promise to lead with integrity and serve others responsibly after being entrusted with great responsibility."
  },
  {
    src: cadetship,
    description:
      "Earned distinction for completing 6 transformative years of cadetship, marked by discipline and leadership."
  },
  {
    src: physics_olympiad,
    description:
      "Secured 1st place in the regional round of the Bangladesh Physics Olympiad and proudly represented my region in the national round, fueled by a deep passion for physics."
  }
];

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      const sliderWidth = sliderRef.current.scrollWidth;
      const containerWidth = sliderRef.current.offsetWidth;
      setDragConstraints({ left: containerWidth - sliderWidth, right: 0 });
    }
  }, [sliderRef, images]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let mm = gsap.matchMedia();
    mm.add("(min-width: 769px)", () => {
      gsap.utils.toArray(".row").forEach((row, index) => {
        const cardLeft = row.querySelector(".card-left");
        const cardRight = row.querySelector(".card-right");
        gsap.fromTo(
          cardLeft,
          { x: 0, y: 0, rotation: 0 },
          {
            x: [-800, -900, -400][index % 3],
            rotation: [-30, -20, -35][index % 3],
            scrollTrigger: {
              trigger: ".main",
              start: "top 80%",
              end: "150% bottom",
              scrub: true,
              onUpdate: (self) => {
                const progress = self.progress;
                gsap.set(cardLeft, {
                  x: progress * [-800, -900, -400][index % 3],
                  y: progress * [100, -150, -400][index % 3],
                  rotation: progress * [-30, -20, -35][index % 3]
                });
              }
            }
          }
        );
        gsap.fromTo(
          cardRight,
          { x: 0, y: 0, rotation: 0 },
          {
            x: [800, 900, 400][index % 3],
            rotation: [30, 20, 35][index % 3],
            scrollTrigger: {
              trigger: ".main",
              start: "top 80%",
              end: "150% bottom",
              scrub: true,
              onUpdate: (self) => {
                const progress = self.progress;
                gsap.set(cardRight, {
                  x: progress * [800, 900, 400][index % 3],
                  y: progress * [100, -150, -400][index % 3],
                  rotation: progress * [30, 20, 35][index % 3]
                });
              }
            }
          }
        );
      });
    });
    mm.add("(max-width: 768px)", () => {
      gsap.utils.toArray(".row").forEach((row, index) => {
        const cardLeft = row.querySelector(".card-left");
        const cardRight = row.querySelector(".card-right");
        gsap.fromTo(
          cardLeft,
          { x: 0, y: 0, rotation: 0 },
          {
            x: [-1500, -1500, -500][index % 3],
            rotation: [-45, -40, -50][index % 3],
            scrollTrigger: {
              trigger: ".main",
              start: "top 80%",
              end: "150% bottom",
              scrub: true,
              onUpdate: (self) => {
                const progress = self.progress;
                gsap.set(cardLeft, {
                  x: progress * [-1500, -1500, -500][index % 3],
                  y: progress * [200, -300, -700][index % 3],
                  rotation: progress * [-45, -40, -50][index % 3]
                });
              }
            }
          }
        );
        gsap.fromTo(
          cardRight,
          { x: 0, y: 0, rotation: 0 },
          {
            x: [1500, 1500, 500][index % 3],
            rotation: [45, 40, 50][index % 3],
            scrollTrigger: {
              trigger: ".main",
              start: "top 80%",
              end: "150% bottom",
              scrub: true,
              onUpdate: (self) => {
                const progress = self.progress;
                gsap.set(cardRight, {
                  x: progress * [1500, 1500, 500][index % 3],
                  y: progress * [200, -300, -700][index % 3],
                  rotation: progress * [45, 40, 50][index % 3]
                });
              }
            }
          }
        );
      });
    });
    return () => mm.revert();
  }, []);

  const handleHover = (e, show = true) => {
    const descriptionElement = e.currentTarget.querySelector(".image-description");
    const imgElement = e.currentTarget.querySelector("img");
    gsap.to(descriptionElement, {
      opacity: show ? 1 : 0,
      y: show ? 0 : 20,
      duration: 0.7,
      ease: "power3.out"
    });
    gsap.to(imgElement, {
      scale: show ? 1.1 : 1,
      filter: show ? "blur(5px)" : "blur(0)",
      duration: 0.5
    });
  };

  const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const rows = chunkArray(images, 2);

  return (
    <>
      <style>{`
.banner {
  width: 100%;
  height: 150vh;
  text-align: center;
  overflow: visible;
  position: relative;
}
.banner .slider {
  position: absolute;
  width: 200px;
  height: 150px;
  top: 10%;
  left: calc(50% - 150px);
  z-index: 2;
}
.banner .slider .item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.row {
  display: flex;
  justify-content: center;
  gap: 1px;
  margin-bottom: 1px;
}
.row .item {
  position: relative;
  transform: none;
}
.row .item img {
  width: 100%;
  height: auto;
  max-width: none;
}
.image-description {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-family: 'Jura', sans-serif;
  font-size: 0.8em;
  color: #2a1b3d;
  opacity: 0;
  pointer-events: none;
  background: rgba(173, 167, 201, 0.7);
  padding: 10px;
  border-radius: 8px;
  border: 2px solid #E6B800;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.image-description:hover {
  opacity: 1;
  color: #E6B800;
  background: rgba(90, 4, 71, 0.1);
}
.banner .content {
  margin-top: 200px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(1500px, 100vw);
  padding-bottom: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
}
.banner .content h1 {
  margin-top: 200px;
  font-family: 'Playfair Display', serif;
  font-size: 15em;
  line-height: 1;
  color: ##fde4cf;
  position: relative;
  letter-spacing: -0.05em;
}
.banner .content h1::after {
  position: absolute;
  inset: 0;
  content: attr(data-content);
  z-index: 2;
  -webkit-text-stroke: 2px #2a1b3d;
  color: transparent;
}

.banner .content h2 {
  font-size: 3.5rem;
  font-weight: bold;
  color: #f1c0e8;
  margin-bottom: 10px;
  letter-spacing: 0.05em;
  text-shadow: 2px 2px 5px rgba(223, 206, 206, 0.3);
  text-align: right;
  font-family: 'Cormorant Garamond', serif;
}
.banner .content p {
  text-align: right;
  font-family: 'Jura', sans-serif;
  font-size: 1rem;
  font-weight: bold;
  color: #a3c4f3;
  margin-bottom: 10px;
  letter-spacing: 0.05em;
  text-shadow: 2px 2px 5px rgba(223, 206, 206, 0.3);
}
.banner .content .model {
  width: 100%;
  height: 75vh;
  position: absolute;
  bottom: 0;
  left: 0;
  background-size: auto 130%;
  background-repeat: no-repeat;
  background-position: top center;
  z-index: 1;
}
@media screen and (max-width: 1023px) {
  .banner .slider {
    width: 240px;
    height: 280px;
    left: calc(50% - 120px);
  }
  .banner .content h1 {
    font-size: 10em;
  }
}
@media screen and (max-width: 767px) {
  .banner .slider {
    width: 220px;
    height: 260px;
    left: calc(50% - 110px);
    animation: autoRun 40s ease-in-out infinite;
  }
  .banner .content h1 {
    font-size: 5em;
    text-align: center;
  }
  .banner .content h2 {
    font-size: 2.5rem;
    text-align: center;
  }
}
      `}</style>
      <div className="relative py-16 banner  bg-lemon_chiffon h-[200vh] main">
        <div className="font-sans text-lg text-right text-center text-dark_teal">
          <h2 className="mb-2 font-heading text-6xl text-pink_lavender">Stories Captured</h2>
          <p className="text-xl font-description  text-deep_indigo">Adventures of my life</p>
          <p className="mt-2 text-lg text-subheading text-deep_indigo">
            Explore moments that define my journey and shape my dreams!
          </p>
        </div>
        <motion.div
          ref={sliderRef}
          drag="x"
          dragConstraints={dragConstraints}
          className="slider rounded-3xl"
          style={{ "--quantity": images.length }}
        >
          {rows.map((row, index) => (
            <div className="row" key={index}>
              <div
                className="card card-left border-2 shadow-lg item border-lemon_chiffon rounded-xl"
                onMouseEnter={(e) => handleHover(e, true)}
                onMouseLeave={(e) => handleHover(e, false)}
              >
                <img src={row[0].src} alt={row[0].description} />
                <div className="image-description bg-lavender-gray text-deep_indigo">
                  {row[0].description}
                </div>
              </div>
              <div
                className="card card-right border-2 shadow-lg item border-lemon_chiffon rounded-xl"
                onMouseEnter={(e) => handleHover(e, true)}
                onMouseLeave={(e) => handleHover(e, false)}
              >
                <img src={row[1].src} alt={row[1].description} />
                <div className="image-description bg-lavender-gray text-golden-yellow">
                  {row[1].description}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        <div className="content">
          <motion.h1
            data-content="In Frame"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            In Frame
          </motion.h1>
          <div className="model">
            <Lottie
              options={{ animationData, loop: true, autoplay: true }}
              height={800}
              width="80%"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
