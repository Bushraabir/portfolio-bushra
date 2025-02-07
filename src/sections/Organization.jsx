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
      title: "Anti Smoking Campaign",
      subtitle: "🚭 Smoking Ages You Faster! 🚭",
      description: "Smoking speeds up the aging process, causing wrinkles, dull skin, and premature aging. Quit today to look and feel younger!",
    },
    { 
      img: EcoFriendly,
      title: "Eco-Friendly Campaign",
      subtitle: "Mycorrhizal fungi: The unseen warriors of our planet 🌍",
      description: "Mycorrhizal fungi make partnerships with about 90% of all plant species. They form complex networks underground. Plants feed them carbon in the form of sugars and fats, and in return, the fungi forage in the soil and provide nitrogen and phosphorus. It's an underground economy that's been around for millions of years."
    },
    { 
      img: Health, 
      title: "Mental Well Being",
      subtitle: "Water can keep you well",
      description: "Feeling stressed? 😟 Anxious? 😰 Depressed? 😞 Sometimes, all you need is a glass of water. 💧 Stay hydrated, refresh your mind, and keep going! 💪✨",
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
    <article id="organization" className="w-full bg-lemon_chiffon">
      {/* Hero Section */}
      <header className="relative h-[90vh] flex justify-center items-center bg-gradient-to-r from-electric_blue to-aquamarine overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-50 bg-gradient-to-r from-electric_blue to-deep_indigo animate-gradient-move"></div>
        
        <div className="relative z-10 w-full max-w-screen-xl text-center">
          <img
            src={logo}
            alt="EmpowerEd Logo"
            className="w-48 h-auto mx-auto mb-6 sm:w-64 lg:w-80 drop-shadow-2xl animate-spin-slow"
          />
          
          <motion.h2
            className="font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-6xl sm:leading-tight lg:leading-snug text-dark_teal drop-shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          >
            Empowered Education
          </motion.h2>
          
          <p className="max-w-3xl mx-auto mt-4 font-sans text-lg leading-relaxed sm:text-xl lg:text-2xl text-dark_teal">
          EmpowerEd is a non-profit organization founded by Muzahidul Islam Abir, Bushra Khandoker, and others. It focuses on providing education, scholarships, and skill-building opportunities to empower individuals. The organization aims to create accessible learning platforms, support academic growth, and foster research initiatives, helping people achieve their educational and professional goals.
          </p>
        
          <div className="mt-6">
            <Lottie 
              options={{
                animationData: color,
                loop: true,
                autoplay: true,
              }}
              height={300}
              width={300}
              className="sm:h-400 sm:w-400 lg:h-400 lg:w-400"
            />
          </div>
        </div>
      </header>
                 

      <section className="img-group-container h-[500vh] relative " ref={containerRef}>
      <div className="sticky top-0 overflow-hidden h-[100vh] w-full sm:w-full">

         <ul className="flex" ref={groupRef}>
           {items.map((item, index) => (
             <li
               key={index}
               className="flex w-full sm:w-[100vw] h-[100vh] flex-none flex-col items-center justify-center bg-lemon_chiffon transition-all ease-out duration-300"
             >
               <img
                 src={item.img}
                 alt={item.title}
                 className="w-[280px] sm:w-[350px] h-[350px] sm:h-[450px] object-cover rounded-xl shadow-lg hover:scale-105 transition-transform ease-out duration-300"
               />
               <h3 className="text-[30px] sm:text-[50px] font-serif font-semibold tracking-tight leading-[1.2] relative bottom-[20px] sm:bottom-[30px] text-dark_teal opacity-90 hover:opacity-100 transition-all duration-300 ease-out transform hover:scale-105 hover:translate-y-[-8px]">
                 {item.title}
               </h3>
                         
               <h6 className="text-[14px] sm:text-[18px] font-serif font-medium tracking-tight leading-[1.5] text-dark_teal opacity-80 hover:opacity-100 transition-all duration-300 ease-out transform hover:scale-105 hover:translate-y-[-4px]">
                 {item.subtitle}
               </h6>
                         
               <p className="text-[12px] sm:text-[14px] font-serif font-light tracking-tight leading-[1.6] text-dark_teal opacity-80 hover:opacity-100 transition-all duration-300 ease-out transform hover:scale-105 hover:translate-y-[-3px] max-w-[90%] sm:max-w-[80%] text-center mx-auto">
                 {item.description}
               </p>
             </li>
           ))}
         </ul>
       </div>
      </section>


      {/* Final Section */}
      <section className="h-[70vh] flex justify-center items-center bg-gradient-to-b from-lemon_chiffon via-tea_rose to-deep_indigo">
        <div className="px-6 text-center sm:px-12">
          <p className="max-w-3xl mx-auto text-lg font-semibold sm:text-xl text-dark_teal">
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
