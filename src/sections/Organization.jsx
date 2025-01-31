"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { animate, scroll } from "motion";
import AntiSmoking from "../assets/EmpowerEd/antismoking.jpg";
import EcoFriendly from "../assets/EmpowerEd/ecofriendly.jpg";
import Health from "../assets/EmpowerEd/mental health.png";
import logo from "../assets/EmpowerEd/logo.png";
import gsap from "gsap";
import color from "../assets/animation/arrow.json";
import Lottie from "react-lottie";

export default function OrganizationGallery() {
  const items = [
    { img: AntiSmoking, 
      title: "Anti Smoking Campgain" ,
      subtitle : "🚭 Smoking Ages You Faster! 🚭" ,
      description :"Smoking speeds up the aging process, causing wrinkles, dull skin, and premature aging. Quit today to look and feel younger!",
      
     },
    { 
      img: EcoFriendly,
      title: "Eco-Friendly Canpgain",
      subtitle : "Mycorrhizal fungi: The unseen warriors of our planet 🌍" ,
      description :"Mycorrhizal fungi make partnerships with about 90 of all plant species. They form complex networks underground. Plants feed them carbon in the form of sugars and fats, and in return, the fungi forage in the soil and provide nitrogen and phosphorus. The fungi track the flows of the nutrients inside the networks to understand how fungi make decisions, where and when to trade their nutrients. They enact sophisticated trade strategies like holding on to resources until they get a better price or moving resources into a place where demand is higher. It's an underground economy that has been around for hundreds of millions of years."
    },
    { img: Health, 
      title: "Mental Well Being",
      subtitle : "Water can keep you well" ,
      description :"Feeling stressed? 😟 Anxious? 😰 Depressed? 😞 Sometimes, all you need is a glass of water. 💧 Stay hydrated, refresh your mind, and keep going! 💪✨ ",
    
    },
  ];

  const containerRef = useRef(null);
  const groupRef = useRef(null);

  useEffect(() => {
    if (groupRef.current && containerRef.current) {
      const itemCount = items.length;

      // Using motion to animate horizontal scroll
      scroll(
        animate(groupRef.current, {
          transform: ["none", `translateX(-${itemCount - 1}00vw)`],
        }),
        { target: containerRef.current }
      );

      // GSAP animation for Empowered heading
      gsap.fromTo(
        ".empowered-heading",
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 2, ease: "power3.out", delay: 0.5 }
      );
    }
  }, [items.length]);

  return (
    <article id="gallery" className="w-full">
      <header className="relative h-[90vh] flex justify-center items-center bg-gradient-to-r from-electric_blue to-aquamarine overflow-hidden">
        <div className="absolute inset-0 opacity-50 bg-gradient-to-r from-electric_blue to-deep_indigo animate-gradient-move"></div>
        
        <div className="relative z-10 px-6 text-center">
          <img
            src={logo}
            alt="EmpowerEd Logo"
            className="h-auto mx-auto mb-6 w-80 drop-shadow-2xl animate-spin-slow"
          />
          
          <motion.h2
            className="font-serif text-6xl font-semibold leading-tight tracking-tight empowered-heading text-dark_teal drop-shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          >
            Empowered Education
          </motion.h2>
          
          <p className="max-w-2xl mx-auto mt-4 font-sans text-lg leading-relaxed text-dark_teal">
            EmpowerEd is a non-profit organization with a mission to make education accessible to everyone, everywhere. We believe that every student deserves the same starting line, and we’re here to make that happen—at no cost to you!
          </p>

          <div >
            <Lottie 
              options={{
                animationData: color,
                loop: true,
                autoplay: true, // loop the animation
              }}
              height={400} // adjust as necessary
              width={400} // adjust as necessary
            />
          </div>
        </div>
      </header>

      <section className="img-group-container h-[500vh] relative -left-10" ref={containerRef}>
        <div className="sticky top-0 overflow-hidden h-[100vh] w-[155vw]">
          <ul className="flex" ref={groupRef}>
            {items.map((item, index) => (
              <li
                key={index}
                className="flex w-[100vw] h-[100vh] flex-none flex-col items-center justify-center bg-lemon_chiffon transition-all ease-out duration-300"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-[350px] h-[450px] object-cover rounded-xl shadow-lg hover:scale-105 transition-transform ease-out duration-300"
                />
                <h3 className="text-[80px] font-serif font-semibold tracking-tight leading-[1.2] relative bottom-[30px] text-dark_teal opacity-90 hover:opacity-100 transition-all duration-300 ease-out transform hover:scale-105 hover:translate-y-[-8px]">
                  {item.title}
                </h3>
                          
                <h6 className="text-[22px] font-serif font-medium tracking-tight leading-[1.5] text-dark_teal opacity-80 hover:opacity-100 transition-all duration-300 ease-out transform hover:scale-105 hover:translate-y-[-4px]">
                  {item.subtitle}
                </h6>
                          
                <p className="text-[16px] font-serif font-light tracking-tight leading-[1.6] text-dark_teal opacity-80 hover:opacity-100 transition-all duration-300 ease-out transform hover:scale-105 hover:translate-y-[-3px] max-w-[80%] text-center mx-auto">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>


      <section className="h-[70vh] flex justify-center items-center bg-lemon_chiffon">
        <div className="text-center">
          <p className="max-w-3xl mx-auto text-lg font-semibold text-dark_teal">
            Empowered Ed is more than an initiative—it’s a spark in the dark, a bridge where knowledge meets innovation. Co-founded by me and Muzahidul Islam Abir, it transforms rigid learning into an adventure, where students don’t just memorize but discover, create, and conquer. Through interactive tools and mentorship, we turn confusion into clarity, fear into confidence, and learners into trailblazers. This isn’t just education; it’s the dawn of a new era in learning.
          </p>

          <motion.a
            href="https://bushraabir.github.io/empowereducation/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 mt-8 text-lg font-bold text-white transition-all duration-300 rounded-lg bg-electric_blue hover:bg-aquamarine"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.a>
        </div>
      </section>


    </article>
  );
}
