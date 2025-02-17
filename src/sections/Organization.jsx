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
  const pythonCounterRef = useRef(null);
  const cppCounterRef = useRef(null);
  const cCounterRef = useRef(null);
  const rankingCounterRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.innerWidth > 768) {
      const totalScrollWidth = groupRef.current.scrollWidth;
      const viewportWidth = containerRef.current.clientWidth;
      const scrollDistance = totalScrollWidth - viewportWidth;
      gsap.to(groupRef.current, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => "+=" + scrollDistance,
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
    gsap.to({ val: 0 }, {
      val: 226,
      duration: 2,
      ease: "power1.out",
      delay: 0.2,
      scrollTrigger: {
        trigger: counterSectionRef.current,
        start: "top center",
      },
      onUpdate: function() {
        cppCounterRef.current.innerText = Math.floor(this.targets()[0].val);
      },
    });
    gsap.to({ val: 0 }, {
      val: 100,
      duration: 2,
      ease: "power1.out",
      delay: 0.4,
      scrollTrigger: {
        trigger: counterSectionRef.current,
        start: "top center",
      },
      onUpdate: function() {
        cCounterRef.current.innerText = Math.floor(this.targets()[0].val);
      },
    });
    gsap.to({ val: 0 }, {
      val: 3130,
      duration: 2,
      ease: "power1.out",
      delay: 0.6,
      scrollTrigger: {
        trigger: counterSectionRef.current,
        start: "top center",
      },
      onUpdate: function() {
        rankingCounterRef.current.innerText = Math.floor(this.targets()[0].val);
      },
    });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

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
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          >
            Founder of EmpowerEd
          </motion.h2>
          <p className="max-w-3xl mx-auto  font-description text-base sm:text-lg lg:text-xl leading-relaxed text-dark_teal">
            EmpowerEd is a non-profit organization with a mission to make education accessible to everyone, everywhere. We believe that every student deserves the same starting line, and we’re here to make that happen—at no cost to you!
          </p>
          <div className="flex justify-center ">
            <Lottie
              options={lottieOptions}
              height={300}
              width={300}
              className="w-50 h-50 sm:w-40 sm:h-40 lg:w-96 lg:h-96"
            />
          </div>
        </div>
        <div className="absolute bottom-10 flex flex-row gap-5 items-center z-20">
          <IconButton
            href="https://bushraabir.github.io/empowereducation/"
            ariaLabel="Visit our website"
            className="hover:scale-110 transition-transform duration-300"
          >
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
          <IconButton
            href="https://www.facebook.com/profile.php?id=61569631168287"
            ariaLabel="Follow us on Facebook"
            className="hover:scale-110 transition-transform duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-10 h-10 text-lemon_chiffon"
              viewBox="0 0 24 24"
            >
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24H12.82v-9.294H9.692V11.01h3.128V8.413c0-3.1 1.893-4.788 4.66-4.788 1.325 0 2.464.099 2.794.143v3.24h-1.918c-1.504 0-1.794.715-1.794 1.763v2.313h3.587l-.467 3.696h-3.12V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
            </svg>
          </IconButton>
          <IconButton
            href="https://wa.me/8801912641197"
            ariaLabel="Chat with us on WhatsApp"
            className="hover:scale-110 transition-transform duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-10 h-10 text-lemon_chiffon"
              viewBox="0 0 24 24"
            >
              <path d="M20.52 3.48A11.955 11.955 0 0012.02 0C5.383 0 0 5.383 0 12.02c0 2.126.558 4.22 1.617 6.092L0 24l5.978-1.597A11.93 11.93 0 0012.02 24c6.636 0 12.02-5.383 12.02-12.02 0-3.206-1.26-6.197-3.52-8.52zM12.02 21.64c-2.315 0-4.482-.632-6.337-1.826l-.454-.274-3.547.948.95-3.48-.295-.47A9.945 9.945 0 012.38 12.02C2.38 6.924 6.924 2.38 12.02 2.38s9.64 4.544 9.64 9.64-4.544 9.64-9.64 9.64z" />
            </svg>
          </IconButton>
        </div>
      </header>
      <section className="img-group-container  relative" ref={containerRef}>
        <div className="sticky top-0 overflow-hidden h-auto w-full">
          <ul className="flex flex-col md:flex-row" ref={groupRef}>
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
      </section>      <section
        ref={counterSectionRef}
        className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-lemon_chiffon via-tea_rose to-deep_indigo"
          initial={{ filter: "blur(40px)", scale: 1.1 }}
          animate={{ filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <motion.h2
          className="relative z-10 text-3xl sm:text-6xl font-heading font-semibold text-deep_indigo text-center mb-4"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", type: "spring", stiffness: 120 }}
          viewport={{ once: true }}
        >
          I solved various coding problems in URI
        </motion.h2>
        <motion.a
          href="https://judge.beecrowd.com/en/problems/index/1"
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 text-lg sm:text-xl text-electric_blue underline mb-8"
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut", type: "spring", stiffness: 120 }}
          whileTap={{ scale: 0.95 }}
          viewport={{ once: true }}
        >
          Visit URI Judge
        </motion.a>
        <motion.div
          className="relative z-10 flex flex-col sm:flex-row gap-10 flex-wrap justify-center"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
          }}
          viewport={{ once: true }}
        >

          <motion.div
            className="flex flex-col items-center"
            variants={{
              hidden: { y: 50, opacity: 0 },
              visible: { y: 0, opacity: 1 }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-2">
              <SiPython className="text-3xl text-dark_teal" />
              <span ref={pythonCounterRef} className="text-5xl sm:text-7xl font-bold text-dark_teal">
                0
              </span>
            </div>
            <motion.a
              href="https://github.com/Bushraabir/uri_beecrowd_python"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg sm:text-xl font-description text-electric_blue underline mt-1"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Solved 11 Problems in Python
            </motion.a>
          </motion.div>

          <motion.div
            className="flex flex-col items-center"
            variants={{
              hidden: { y: 50, opacity: 0 },
              visible: { y: 0, opacity: 1 }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-2">
              <SiCplusplus className="text-3xl text-dark_teal" />
              <span ref={cppCounterRef} className="text-5xl sm:text-7xl font-bold text-dark_teal">
                0
              </span>
            </div>
            <motion.a
              href="https://github.com/Bushraabir/uri_beecrowd_cpp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg sm:text-xl font-description text-electric_blue underline mt-1 "
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Solved 226 Problems in C++
            </motion.a>
          </motion.div>

          <motion.div
            className="flex flex-col items-center"
            variants={{
              hidden: { y: 50, opacity: 0 },
              visible: { y: 0, opacity: 1 }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-2">
              <SiC className="text-3xl text-dark_teal" />
              <span ref={cCounterRef} className="text-5xl sm:text-7xl font-bold text-dark_teal">
                0
              </span>
            </div>
            <motion.a
              href="https://github.com/Bushraabir/uri_beecrowd_c"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg sm:text-xl font-description text-electric_blue underline mt-1 "
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Solved 100 Problems in C
            </motion.a>
          </motion.div>

          <motion.div
            className="flex flex-col items-center"
            variants={{
              hidden: { y: 50, opacity: 0 },
              visible: { y: 0, opacity: 1 }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-2">
              <FaTrophy className="text-3xl text-lemon_chiffon" />
              <span ref={rankingCounterRef} className="text-5xl sm:text-7xl font-bold text-lemon_chiffon-500">
                0
              </span>
            </div>
            <span className="text-lg sm:text-xl text-description text-lemon_chiffon-500 mt-2">
              Ranking: 3130 (Top 1%)
            </span>
          </motion.div>
        </motion.div>
      </section>
          

    </article>
  );
}
