"use client";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Lottie from "react-lottie-player";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Tilt from "react-parallax-tilt";
import AntiSmoking from "../assets/EmpowerEd/antismoking.jpg";
import EcoFriendly from "../assets/EmpowerEd/ecofriendly.jpg";
import Health from "../assets/EmpowerEd/mental health.png";
import logo from "../assets/EmpowerEd/logo.png";
import rank from "../assets/EmpowerEd/rank.png";
import color from "../assets/animation/arrow.json";
import { SiC, SiCplusplus, SiPython } from "react-icons/si";
import { FaTrophy, FaArrowUp } from "react-icons/fa";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import Typewriter from "typewriter-effect";
import CountUp from "react-countup";

function IconButton({ href, children, label }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2, backgroundColor: "rgba(251, 248, 204, 0.3)", boxShadow: "0 0 15px rgba(251, 248, 204, 0.5)" }}
      whileTap={{ scale: 0.95 }}
      className="inline-block p-3 rounded-full text-lemon_chiffon transition-all duration-300"
      aria-label={label}
    >
      {children}
    </motion.a>
  );
}

export default function OrganizationGallery() {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const sliderRef = useRef(null);
  const counterSectionRef = useRef(null);

  const galleryItems = useMemo(
    () => [
      {
        img: AntiSmoking,
        title: "Anti-Smoking Campaign",
        subtitle: "🚭 Championing Healthier Lives 🚭",
        description:
          "Led by EmpowerEd, this initiative educates communities on smoking's aging effects, inspiring countless individuals to quit and embrace vitality.",
      },
      {
        img: EcoFriendly,
        title: "Eco-Friendly Campaign",
        subtitle: "🌍 Sustaining Our Planet's Future 🌍",
        description:
          "Organized through EmpowerEd, this campaign promotes mycorrhizal fungi's role in ecosystems, fostering sustainable practices for global well-being.",
      },
      {
        img: Health,
        title: "Mental Well-Being Initiative",
        subtitle: "💧 Nurturing Minds, One Step at a Time 💧",
        description:
          "Spearheaded by EmpowerEd, this effort advocates hydration as a simple yet powerful tool to combat stress, anxiety, and depression.",
      },
    ],
    []
  );

  const codingItems = [
    { lang: "Python", icon: SiPython, value: 24, link: "https://github.com/Bushraabir/uri_beecrowd_python" },
    { lang: "C++", icon: SiCplusplus, value: 229, link: "https://github.com/Bushraabir/uri_beecrowd_cpp" },
    { lang: "C", icon: SiC, value: 114, link: "https://github.com/Bushraabir/uri_beecrowd_c" },
    { lang: "Ranking", icon: FaTrophy, value: 2088, link: "https://judge.beecrowd.com/en/profile/1071447", isRanking: true },
  ];

  const lottieOptions = useMemo(
    () => ({
      loop: true,
      autoplay: true,
      animationData: color,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    }),
    []
  );

  const codeString = `#include <iostream>
#include <vector>
using namespace std;

// Function to insert an element at its correct position in a sorted subarray
void insertIntoSorted(vector<int>& arr, int n) {
    int key = arr[n];
    int j = n - 1;

    // Move elements greater than key one position ahead
    while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
    }
    arr[j + 1] = key;
}

// Recursive Insertion Sort Function
void recursiveInsertionSort(vector<int>& arr, int n) {
    // Base case: If array has one or zero elements, it's sorted
    if (n <= 0) return;

    // Recursively sort first n-1 elements
    recursiveInsertionSort(arr, n - 1);

    // Insert nth element into sorted subarray
    insertIntoSorted(arr, n);
}

int main() {
    vector<int> arr = {12, 11, 13, 5, 6};

    cout << "Original array:\n";
    for (int val : arr) {
        cout << val << " ";
    }
    cout << "\n\n";

    recursiveInsertionSort(arr, arr.size() - 1);

    cout << "Sorted array using Recursive Insertion Sort:\n";
    for (int val : arr) {
        cout << val << " ";
    }
    cout << endl;

    return 0;
}


/*   
Recursive Insertion Sort is a variation of the classic insertion sort algorithm  
where the sorting is performed using recursion instead of iteration.

Working Principle:
- Recursively sort the first n-1 elements.
- Insert the nth element into its correct position in the sorted part.

Time Complexity:
    - Best Case (Already Sorted): O(N)
    - Average Case: O(N^2)
    - Worst Case (Reversely Sorted): O(N^2)

Space Complexity:
    - O(N) due to recursion stack

Stable Sort: Yes
Adaptive: Yes
*/

`;

  const title = ["Founder of EmpowerEd", "Vice President of EmpowerEd", "STEM Innovation Advisor at EmpowerEd"];

  const imageVariants = {
    rest: { scale: 1, y: 0, boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)" },
    hover: { scale: 1.05, y: -10, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)", borderColor: "#90dbf4" },
    tap: { scale: 0.95 },
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut", delay: i * 0.2 },
    }),
    hover: { scale: 1.08, rotate: 1.5, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.25)", transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const updateMobile = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    updateMobile();
    window.addEventListener("resize", updateMobile);

    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", updateMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [updateMobile]);

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    arrows: false,
    appendDots: (dots) => (
      <div className="mt-6">
        <ul className="flex justify-center gap-3">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <button
        className="w-3 h-3 rounded-full bg-dark_teal/50 hover:bg-dark_teal transition-all duration-300"
        aria-label={`Go to slide ${i + 1}`}
      />
    ),
  };

  return (
    <article id="organization" className="w-full bg-lemon_chiffon relative overflow-hidden">
      <header className="relative h-screen flex flex-col justify-center items-center bg-gradient-to-r from-electric_blue to-aquamarine px-4 sm:px-6 lg:px-8">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: { value: "transparent" },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: { enable: true, mode: "push" },
                onHover: { enable: true, mode: "repulse" },
                resize: true,
              },
              modes: {
                push: { quantity: 4 },
                repulse: { distance: 200, duration: 0.4 },
              },
            },
            particles: {
              color: { value: "#ffffff" },
              links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.5, width: 1 },
              collisions: { enable: true },
              move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: false,
                speed: 2,
                straight: false,
              },
              number: { density: { enable: true, area: 800 }, value: isMobile ? 40 : 80 },
              opacity: { value: 0.75 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 5 } },
            },
            detectRetina: true,
          }}
        />
        <div className="relative z-10 w-full max-w-screen-xl text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            <motion.img
              src={logo}
              alt="EmpowerEd Logo"
              className="w-40 sm:w-48 md:w-64 lg:w-80 h-auto mx-auto mb-6 drop-shadow-2xl"
              animate={{ rotate: 360 }}
              transition={{ 
                rotate: { 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "linear" 
                } 
              }}
            />
          </motion.div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-6xl font-semibold text-dark_teal drop-shadow-2xl">
            <Typewriter
              options={{
                strings: title,
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.5 }}
            className="max-w-3xl mx-auto font-description text-base sm:text-lg lg:text-xl text-dark_teal mt-4"
          >
            As the founder of EmpowerEd, I lead a non-profit dedicated to democratizing education, empowering communities, and driving societal change through impactful volunteering initiatives—at no cost to those we serve.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.8 }}
            className="max-w-3xl mx-auto font-description text-base sm:text-lg lg:text-xl text-dark_teal mt-4"
          >
            I organized and led the team by assigning tasks, giving instructions, and deciding what each member would do. I also came up with ideas for different contests and worked closely with my team to successfully organize events like the Idea Hub Contest, Tree Planting Campaign, and Anti-Smoking Campaign.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 12, delay: 1.2 }}
            className="flex justify-center mb-24"
          >
            <Lottie
              loop
              play
              animationData={color}
              className="w-40 h-40 sm:w-30 sm:h-30 lg:w-26 lg:h-26"
            />
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-10 flex gap-6 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 10, delay: 1.5 }}
        >
          <IconButton href="https://bushraabir.github.io/empowereducation/" label="EmpowerEd Website">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 010 5.656l-5.656 5.656a4 4 0 01-5.656-5.656l1.414-1.414" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.172 13.828a4 4 0 010-5.656L13.828 4.586a4 4 0 015.656 5.656l-1.414 1.414" />
            </svg>
          </IconButton>
          <IconButton href="https://www.facebook.com/profile.php?id=61569631168287" label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24H12.82v-9.294H9.692V11.01h3.128V8.413c0-3.1 1.893-4.788 4.66-4.788 1.325 0 2.464.099 2.794.143v3.24h-1.918c-1.504 0-1.794.715-1.794 1.763v2.313h3.587l-.467 3.696h-3.12V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
            </svg>
          </IconButton>
          <IconButton href="https://wa.me/8801912641197" label="WhatsApp">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.52 3.48A11.955 11.955 0 0012.02 0C5.383 0 0 5.383 0 12.02c0 2.126.558 4.22 1.617 6.092L0 24l5.978-1.597A11.93 11.93 0 0012.02 24c6.636 0 12.02-5.383 12.02-12.02 0-3.206-1.26-6.197-3.52-8.52zM12.02 21.64c-2.315 0-4.482-.632-6.337-1.826l-.454-.274-3.547.948.95-3.48-.295-.47A9.945 9.945 0 012.38 12.02C2.38 6.924 6.924 2.38 12.02 2.38s9.64 4.544 9.64 9.64-4.544 9.64-9.64 9.64z" />
            </svg>
          </IconButton>
        </motion.div>
      </header>

      <section className="img-group-container relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-lemon_chiffon/5 to-champagne_pink/10 overflow-hidden">
        <Particles
          id="gallery-particles"
          init={particlesInit}
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 60,
            particles: {
              color: { value: "#90dbf4" },
              links: { enable: false },
              move: {
                direction: "top",
                enable: true,
                outModes: { default: "out" },
                speed: 1.5,
                random: true,
              },
              number: { density: { enable: true, area: 1200 }, value: isMobile ? 20 : 40 },
              opacity: { value: { min: 0.3, max: 0.6 } },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,
          }}
          className="absolute inset-0 z-0"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-deep_indigo text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Our Impactful Initiatives
          </motion.h2>
          {isMobile ? (
            <Slider ref={sliderRef} {...sliderSettings}>
              {galleryItems.map((item, index) => (
                <div key={index} className="px-3 focus:outline-none">
                  <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} perspective={1000} scale={1.03} transitionSpeed={500} glareEnable={true} glareMaxOpacity={0.15}>
                    <motion.div
                      className="relative flex flex-col items-center p-6 bg-lemon_chiffon/95 backdrop-blur-md rounded-2xl shadow-xl border border-gradient-to-r from-electric_blue to-aquamarine"
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      whileHover="hover"
                      whileTap="tap"
                      custom={index}
                      viewport={{ once: false, amount: 0.3 }}
                      onClick={() => setSelectedItem(item)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && setSelectedItem(item)}
                      aria-label={`View details for ${item.title}`}
                    >
                      <div className="relative group overflow-hidden rounded-xl">
                        <motion.img
                          src={item.img}
                          alt={item.title}
                          loading="lazy"
                          className="w-full max-w-[300px] h-[320px] object-cover rounded-xl border border-mauve-500"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark_teal/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-heading font-semibold text-deep_indigo mt-4">{item.title}</h3>
                      <h6 className="text-base sm:text-lg font-subheading font-medium text-dark_teal mt-2">{item.subtitle}</h6>
                      <p className="text-sm sm:text-base font-description font-light text-dark_teal max-w-[85%] text-center mt-3">{item.description}</p>
                      <motion.button
                        className="mt-4 px-5 py-2 bg-gradient-to-r from-electric_blue to-aquamarine text-lemon_chiffon rounded-full font-cta font-medium"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 12px rgba(142, 236, 245, 0.6)" }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Learn more about ${item.title}`}
                      >
                        Learn More
                      </motion.button>
                    </motion.div>
                  </Tilt>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <AnimatePresence>
                {galleryItems.map((item, index) => (
                  <Tilt key={index} tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} scale={1.03} transitionSpeed={500} glareEnable={true} glareMaxOpacity={0.15}>
                    <motion.div
                      className="relative flex flex-col items-center p-6 bg-lemon_chiffon/95 backdrop-blur-md rounded-2xl shadow-xl border border-gradient-to-r from-electric_blue to-aquamarine"
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      whileHover="hover"
                      whileTap="tap"
                      custom={index}
                      viewport={{ once: false, amount: 0.3 }}
                      onClick={() => setSelectedItem(item)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && setSelectedItem(item)}
                      aria-label={`View details for ${item.title}`}
                    >
                      <div className="relative group overflow-hidden rounded-xl">
                        <motion.img
                          src={item.img}
                          alt={item.title}
                          loading="lazy"
                          className="w-full max-w-[360px] h-[400px] object-cover rounded-xl border border-mauve-500"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark_teal/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-heading font-semibold text-deep_indigo mt-4">{item.title}</h3>
                      <h6 className="text-base sm:text-lg font-subheading font-medium text-dark_teal mt-2">{item.subtitle}</h6>
                      <p className="text-sm sm:text-base font-description font-light text-dark_teal max-w-[85%] text-center mt-3">{item.description}</p>
                      <motion.button
                        className="mt-4 px-5 py-2 bg-gradient-to-r from-electric_blue to-aquamarine text-lemon_chiffon rounded-full font-cta font-medium"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 12px rgba(142, 236, 245, 0.6)" }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Learn more about ${item.title}`}
                      >
                        Learn More
                      </motion.button>
                    </motion.div>
                  </Tilt>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {selectedItem && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            className="bg-lemon_chiffon p-6 sm:p-8 rounded-xl max-w-2xl w-full mx-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedItem.img} 
              alt={selectedItem.title} 
              className="w-full h-64 object-cover rounded-xl mb-4"
            />
            <h3 className="text-2xl font-heading font-semibold text-deep_indigo">{selectedItem.title}</h3>
            <h6 className="text-xl font-subheading font-medium text-dark_teal mt-2">{selectedItem.subtitle}</h6>
            <p className="text-base font-description font-light text-dark_teal mt-4">{selectedItem.description}</p>
            <motion.button
              className="mt-6 px-4 py-2 bg-electric_blue text-lemon_chiffon rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedItem(null)}
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      <section
        ref={counterSectionRef}
        className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-champagne_pink via-tea_rose to-deep_indigo py-16 sm:py-24"
      >
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-deep_indigo text-center">
            Coding Problems Solved on URI
          </h2>
        </motion.div>
        
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.img
            src={rank}
            alt="URI Rank"
            className="w-[100vw] h-auto sm:w-[70vw] max-w-[500px] mt-4 sm:mt-0 sm:ml-4 
                       border-4 border-gray-300 rounded-lg shadow-lg"
            initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
            whileInView={{ 
              scale: 1, 
              rotate: 0, 
              opacity: 1,
              transition: { 
                duration: 0.8, 
                ease: "easeOut" 
              } 
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 w-full max-w-[90%] sm:max-w-[85%] lg:max-w-6xl px-4 sm:px-6">
          {codingItems.map((item, index) => (
            <motion.div
              key={item.lang}
              className="flex flex-col items-center p-6 sm:p-8 bg-lemon_chiffon/30 backdrop-blur-md rounded-2xl shadow-xl border border-champagne_pink-600"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.8, 
                  delay: index * 0.2 
                } 
              }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <motion.div
                  initial={{ scale: 1 }}
                  whileInView={{ 
                    scale: [1, 1.2, 1], 
                    transition: { 
                      duration: 0.5, 
                      repeat: 2, 
                      repeatType: "reverse" 
                    } 
                  }}
                  viewport={{ once: true }}
                >
                  <item.icon className="text-4xl sm:text-5xl text-jordy_blue" />
                </motion.div>
                <CountUp
                  start={0}
                  end={item.value}
                  duration={2.5}
                  className={`text-5xl sm:text-6xl font-bold ${item.isRanking ? "text-jordy_blue" : "text-electric_blue"}`}
                />
              </div>
              <motion.a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg text-dark_teal font-cta font-medium hover:text-lemon_chiffon transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.isRanking ? "View Profile" : `Solved ${item.value} in ${item.lang}`}
              </motion.a>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="mt-20 p-6 sm:p-10 bg-lemon_chiffon/20 backdrop-blur-xl rounded-3xl shadow-3xl max-w-5xl mx-auto border border-champagne_pink-500"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 1,
              delay: 0.3
            } 
          }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <h3 className="text-3xl md:text-4xl font-heading font-extrabold text-deep_indigo mb-6">
            Data Structure and Algorithm Practice
          </h3>
          <p className="text-lg md:text-xl font-description text-dark_teal mb-6">
            Currently, I am learning Data Structures and Algorithms from various
            online resources and practicing in C++. Together with Muzahidul Islam Abir, 
            we are creating a repository where we practice different algorithms and problems, 
            which further enhances our understanding. Here is a demo of our repository:
          </p>
          <div className="w-full max-w-[100vw] mx-auto p-2">
            <SyntaxHighlighter
              language="cpp"
              style={dark}
              showLineNumbers={true}
              codeTagProps={{ style: { whiteSpace: "pre-wrap" } }}
              className="w-full max-h-[400px] sm:max-h-[300px] overflow-auto rounded-xl border border-mauve-500 p-2 text-sm sm:text-base"
            >
              {codeString}
            </SyntaxHighlighter>
          </div>
          <motion.a
            href="https://github.com/Bushraabir/DSA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-electric_blue to-aquamarine text-deep_indigo font-cta font-semibold rounded-full mt-6 relative overflow-hidden"
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(142, 236, 245, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-champagne_pink/20"
              animate={{ 
                x: ["-100%", "300%"],
                transition: { 
                  repeat: Infinity, 
                  duration: 1.5, 
                  ease: "linear" 
                } 
              }}
            />
            Explore Repository
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="ml-1"
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </section>

      {showTopBtn && (
        <motion.button
          className="fixed bottom-10 right-10 bg-deep_indigo text-lemon_chiffon p-4 rounded-full shadow-2xl z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { 
              type: "spring", 
              stiffness: 200 
            } 
          }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ 
            scale: 1.2, 
            boxShadow: "0 0 15px rgba(251, 248, 204, 0.5)" 
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          <FaArrowUp size={24} />
        </motion.button>
      )}
    </article>
  );
}