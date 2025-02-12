"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lottie from "react-lottie";

import AntiSmoking from "../assets/EmpowerEd/antismoking.jpg";
import EcoFriendly from "../assets/EmpowerEd/ecofriendly.jpg";
import Health from "../assets/EmpowerEd/mental health.png";
import logo from "../assets/EmpowerEd/logo.png";
import color from "../assets/animation/arrow.json";

function IconButton({ href, children }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block"
    >
      {children}
    </motion.a>
  );
}

export default function OrganizationGallery() {
  const items = [
    {
      img: AntiSmoking,
      title: "Anti Smoking Campaign",
      subtitle: "🚭 Smoking Ages You Faster! 🚭",
      description:
        "Smoking speeds up the aging process, causing wrinkles, dull skin, and premature aging. Quit today to look and feel younger!",
    },
    {
      img: EcoFriendly,
      title: "Eco-Friendly Campaign",
      subtitle: "Mycorrhizal fungi: The unseen warriors of our planet 🌍",
      description:
        "Mycorrhizal fungi make partnerships with about 90% of all plant species. They form complex networks underground. Plants feed them carbon in the form of sugars and fats, and in return, the fungi forage in the soil and provide nitrogen and phosphorus. It's an underground economy that's been around for millions of years.",
    },
    {
      img: Health,
      title: "Mental Well Being",
      subtitle: "Water can keep you well",
      description:
        "Feeling stressed? 😟 Anxious? 😰 Depressed? 😞 Sometimes, all you need is a glass of water. 💧 Stay hydrated, refresh your mind, and keep going! 💪✨",
    },
  ];

  const containerRef = useRef(null);
  const groupRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    

    const totalScrollWidth = groupRef.current.scrollWidth;
    const viewportWidth = containerRef.current.clientWidth;
    const scrollDistance = totalScrollWidth - viewportWidth;


    gsap.to(groupRef.current, {
      x: -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${scrollDistance}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 2, ease: "power3.out", delay: 0.5 }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <article id="organization" className="w-full bg-lemon_chiffon">
      <header className="relative h-[90vh] flex justify-center items-center bg-gradient-to-r from-electric_blue to-aquamarine overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-50 bg-gradient-to-r from-electric_blue to-deep_indigo animate-gradient-move"></div>
        <div className="relative z-10 w-full max-w-screen-xl text-center">
          <img
            src={logo}
            alt="EmpowerEd Logo"
            className="w-48 h-auto mx-auto mb-6 sm:w-64 lg:w-80 drop-shadow-2xl animate-spin-slow"
          />
          <motion.h2
            ref={headingRef}
            className="empowered-heading font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-6xl sm:leading-tight lg:leading-snug text-dark_teal drop-shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          >
            Empowered Education
          </motion.h2>
          <p className="max-w-3xl mx-auto mt-4 font-description text-lg leading-relaxed sm:text-xl lg:text-2xl text-dark_teal">
            EmpowerEd is a non-profit organization founded by Muzahidul Islam Abir,
            Bushra Khandoker, and others. It focuses on providing education,
            scholarships, and skill-building opportunities to empower individuals.
            The organization aims to create accessible learning platforms, support
            academic growth, and foster research initiatives, helping people achieve
            their educational and professional goals.
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
      <section
        className="img-group-container h-[100vh] relative"
        ref={containerRef}
      >
        <div className="sticky top-0 overflow-hidden h-[100vh] w-full">
          <ul className="flex" ref={groupRef}>
            {items.map((item, index) => (
              <li
                key={index}
                className="flex w-full h-[100vh] flex-none flex-col items-center justify-center bg-lemon_chiffon transition-all ease-out duration-300"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-[280px] sm:w-[350px] h-[350px] sm:h-[450px] object-cover rounded-xl shadow-lg hover:scale-105 transition-transform ease-out duration-300"
                />
                <h3 className="text-[30px] sm:text-[50px] font-heading font-semibold tracking-tight leading-[1.2] relative bottom-[20px] sm:bottom-[30px] text-dark_teal opacity-90 hover:opacity-100 transition-all duration-300 ease-out transform hover:scale-105 hover:translate-y-[-8px]">
                  {item.title}
                </h3>
                <h6 className="text-[14px] sm:text-[18px] font-description font-medium tracking-tight leading-[1.5] text-dark_teal opacity-80 hover:opacity-100 transition-all duration-300 ease-out transform hover:scale-105 hover:translate-y-[-4px]">
                  {item.subtitle}
                </h6>
                <p className="text-[12px] sm:text-[14px] font-description font-light tracking-tight leading-[1.6] text-dark_teal opacity-80 hover:opacity-100 transition-all duration-300 ease-out transform hover:scale-105 hover:translate-y-[-3px] max-w-[90%] sm:max-w-[80%] text-center mx-auto">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="h-[70vh] flex justify-center items-center bg-gradient-to-b from-lemon_chiffon via-tea_rose to-deep_indigo -mt-100">
        <div className="px-6 text-center sm:px-12">
          <p className="max-w-3xl mx-auto text-lg font-description font-semibold sm:text-xl text-dark_teal">
            Empowered Ed is more than an initiative—it’s a spark in the dark, a bridge where
            knowledge meets innovation. Co-founded by me and Muzahidul Islam Abir, it transforms
            rigid learning into an adventure, where students don’t just memorize but discover,
            create, and conquer. Through interactive tools and mentorship, we turn confusion into
            clarity, fear into confidence, and learners into trailblazers. This isn’t just education;
            it’s the dawn of a new era in learning.
          </p>
          <div className="flex flex-row gap-4 items-center">
            <IconButton href="https://bushraabir.github.io/empowereducation/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-lemon_chiffon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13.828 10.172a4 4 0 010 5.656L10.172 19.414a4 4 0 01-5.656-5.656l1.414-1.414" />
                <path d="M10.172 13.828a4 4 0 010-5.656L13.828 4.586a4 4 0 015.656 5.656l-1.414 1.414" />
              </svg>
            </IconButton>
            <IconButton href="https://www.facebook.com/profile.php?id=61569631168287">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-10 h-10 text-lemon_chiffon"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24H12.82v-9.294H9.692V11.01h3.128V8.413c0-3.1 1.893-4.788 4.66-4.788 1.325 0 2.464.099 2.794.143v3.24h-1.918c-1.504 0-1.794.715-1.794 1.763v2.313h3.587l-.467 3.696h-3.12V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
              </svg>
            </IconButton>
          </div>
        </div>
      </section>
    </article>
  );
}
