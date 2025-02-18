"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lottie from "react-lottie";
import AntiSmoking from "../assets/EmpowerEd/antismoking.jpg";
import EcoFriendly from "../assets/EmpowerEd/ecofriendly.jpg";
import Health from "../assets/EmpowerEd/mental health.png";
import logo from "../assets/EmpowerEd/logo.png";
import color from "../assets/animation/arrow.json";
import { SiC, SiCplusplus, SiPython } from "react-icons/si";
import { FaTrophy } from "react-icons/fa";

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
  const [isMobile, setIsMobile] = useState(false);
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
  const counterSectionRef = useRef(null);
  const counters = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    if (!isMobile) {
      const totalScrollWidth = groupRef.current.scrollWidth;
      const viewportWidth = containerRef.current.clientWidth;
      const scrollDistance = totalScrollWidth - viewportWidth;
      
      gsap.to(groupRef.current, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=" + scrollDistance,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });
    }
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 2, ease: "power3.out", delay: 0.5 }
    );
    gsap.to({ val: 0 }, {
      val: 11,
      duration: 2,
      ease: "power1.out",
      scrollTrigger: {
        trigger: counterSectionRef.current,
        start: "top center",
      },
      onUpdate: function() {
        pythonCounterRef.current.innerText = Math.floor(this.targets()[0].val);
      },
    });
    

    const counterValues = [11, 226, 100, 3130];
    counters.current.forEach((counter, index) => {
      gsap.to(counter, {
        textContent: counterValues[index],
        duration: 2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: counterSectionRef.current,
          start: "top center",
          toggleActions: "play none none reverse",
        },
        snap: { textContent: 1 }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  const lottieOptions = {
    animationData: color,
    loop: true,
    autoplay: true,
  };

  return (
    <article id="organization" className="w-full bg-lemon_chiffon">
      <header className="relative h-auto flex flex-col justify-center items-center bg-gradient-to-r from-electric_blue to-aquamarine overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-50 bg-gradient-to-r from-electric_blue to-deep_indigo animate-gradient-move"></div>
        <div className="relative z-10 w-full max-w-screen-xl text-center">
          <img
            src={logo}
            alt="EmpowerEd Logo"
            className="w-40 sm:w-48 md:w-64 lg:w-80 h-auto mx-auto mb-6 drop-shadow-2xl animate-spin-slow"
          />
          <motion.h2
            ref={headingRef}
            className="empowered-heading font-heading text-3xl sm:text-4xl lg:text-6xl font-semibold leading-tight tracking-tight text-dark_teal drop-shadow-2xl"
          >
            Founder of EmpowerEd
          </motion.h2>
          <p className="max-w-3xl mx-auto font-description text-base sm:text-lg lg:text-xl leading-relaxed text-dark_teal">
            EmpowerEd is a non-profit organization with a mission to make education accessible to everyone, everywhere. We believe that every student deserves the same starting line, and we’re here to make that happen—at no cost to you!
          </p>
          <div className="flex justify-center">
            <Lottie
              options={lottieOptions}
              height={300}
              width={300}
              className="w-50 h-50 sm:w-40 sm:h-40 lg:w-96 lg:h-96"
            />
          </div>
        </div>
        <div className="absolute bottom-10 flex flex-row gap-5 items-center z-20">
          <IconButton href="https://bushraabir.github.io/empowereducation/">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-lemon_chiffon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 010 5.656l-5.656 5.656a4 4 0 01-5.656-5.656l1.414-1.414" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.172 13.828a4 4 0 010-5.656L13.828 4.586a4 4 0 015.656 5.656l-1.414 1.414" />
            </svg>
          </IconButton>
          <IconButton href="https://www.facebook.com/profile.php?id=61569631168287">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-lemon_chiffon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24H12.82v-9.294H9.692V11.01h3.128V8.413c0-3.1 1.893-4.788 4.66-4.788 1.325 0 2.464.099 2.794.143v3.24h-1.918c-1.504 0-1.794.715-1.794 1.763v2.313h3.587l-.467 3.696h-3.12V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
            </svg>
          </IconButton>
          <IconButton href="https://wa.me/8801912641197">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-lemon_chiffon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.52 3.48A11.955 11.955 0 0012.02 0C5.383 0 0 5.383 0 12.02c0 2.126.558 4.22 1.617 6.092L0 24l5.978-1.597A11.93 11.93 0 0012.02 24c6.636 0 12.02-5.383 12.02-12.02 0-3.206-1.26-6.197-3.52-8.52zM12.02 21.64c-2.315 0-4.482-.632-6.337-1.826l-.454-.274-3.547.948.95-3.48-.295-.47A9.945 9.945 0 012.38 12.02C2.38 6.924 6.924 2.38 12.02 2.38s9.64 4.544 9.64 9.64-4.544 9.64-9.64 9.64z" />
            </svg>
          </IconButton>
        </div>
      </header>

      <section className="img-group-container relative " ref={containerRef}>
        <div className="sticky top-0 overflow-hidden  h-auto w-full">
          <ul className={`flex ${isMobile ? "flex-col" : "flex-row mt-20"}`} ref={groupRef}>
            {items.map((item, index) => (
              <li key={index} className={`${isMobile ? "w-full h-auto py-20  " : "w-full h-[100vh] "} flex-none  flex-col items-center justify-center bg-lemon_chiffon`}>
                <motion.div 
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-[280px] sm:w-[350px] h-[350px] sm:h-[450px] object-cover rounded-xl shadow-lg hover:scale-105 transition-transform ease-out duration-300 "
                  />
                  <h3 className="text-[30px] sm:text-[50px] font-heading font-semibold tracking-tight leading-[1.2] mt-6 text-dark_teal">
                    {item.title}
                  </h3>
                  <h6 className="text-[14px] sm:text-[18px] font-description font-medium tracking-tight leading-[1.5] text-dark_teal mt-4">
                    {item.subtitle}
                  </h6>
                  <p className="text-[12px] sm:text-[14px] font-description font-light tracking-tight leading-[1.6] text-dark_teal max-w-[90%] sm:max-w-[80%] text-center mx-auto mt-4">
                    {item.description}
                  </p>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section ref={counterSectionRef} className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-lemon_chiffon via-tea_rose to-deep_indigo">
        <motion.h2 
          className="text-3xl sm:text-6xl font-heading font-semibold text-deep_indigo text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          I solved various coding problems in URI
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl px-4">
          {[['Python', SiPython, 11], ['C++', SiCplusplus, 226], ['C', SiC, 100]].map(([lang, Icon, value], index) => (
            <motion.div
              key={lang}
              className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, type: "spring" }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon className="text-4xl text-dark_teal" />
                <span ref={el => counters.current[index] = el} className="text-5xl font-bold text-dark_teal">0</span>
              </div>
              <a
                href={`https://github.com/Bushraabir/uri_beecrowd_${lang.toLowerCase()}`}
                className="text-lg text-electric_blue underline hover:text-dark_teal transition-colors"
              >
                Solved {value} Problems in {lang}
              </a>
            </motion.div>
          ))}

          <motion.div
            className="flex flex-col items-center p-6 bg-dark_teal/80 backdrop-blur-lg rounded-2xl shadow-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <FaTrophy className="text-4xl text-lemon_chiffon" />
              <span ref={el => counters.current[3] = el} className="text-5xl font-bold text-lemon_chiffon">0</span>
            </div>
            <span className="text-lg text-lemon_chiffon">
              Ranking: 3130 (Top 1%)
            </span>
          </motion.div>
        </div>
      </section>
    </article>
  );
}