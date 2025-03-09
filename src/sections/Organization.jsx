"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lottie from "react-lottie-player";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import AntiSmoking from "../assets/EmpowerEd/antismoking.jpg";
import EcoFriendly from "../assets/EmpowerEd/ecofriendly.jpg";
import Health from "../assets/EmpowerEd/mental health.png";
import logo from "../assets/EmpowerEd/logo.png";
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
  const containerRef = useRef(null);
  const groupRef = useRef(null);
  const counterSectionRef = useRef(null);
  const triggers = useRef([]);

  const items = useMemo(
    () => [
      {
        img: AntiSmoking,
        title: "Anti-Smoking Campaign",
        subtitle: "🚭 Championing Healthier Lives 🚭",
        description:
          "Led by EmpowerEd, this initiative educates communities on smoking’s aging effects, inspiring countless individuals to quit and embrace vitality.",
      },
      {
        img: EcoFriendly,
        title: "Eco-Friendly Campaign",
        subtitle: "🌍 Sustaining Our Planet’s Future 🌍",
        description:
          "Organized through EmpowerEd, this campaign promotes mycorrhizal fungi’s role in ecosystems, fostering sustainable practices for global well-being.",
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

  const codeString = `
  int findFirstOccurrence(const std::vector<int>& arr, int target) {
    int start = 0, end = arr.size() - 1;
    int result = -1;
    
    while (start <= end) {
        int mid = start + (end - start) / 2;
        
        if (arr[mid] == target) {
            result = mid;
            end = mid - 1;
        } 
        else if (arr[mid] < target) {
            start = mid + 1;
        } 
        else {
            end = mid - 1;
        }
    }
    return result;
}`;

  const title = ["Founder of EmpowerEd", "Vice President of EmpowerEd", "STEM Innovation Advisor at EmpowerEd"];

  const imageVariants = {
    rest: { scale: 1, y: 0, boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)" },
    hover: { scale: 1.05, y: -10, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)", borderColor: "#90dbf4" },
    tap: { scale: 0.95 },
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const updateMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      ScrollTrigger.refresh();
    };
    updateMobile();
    window.addEventListener("resize", updateMobile);

    if (!isMobile && groupRef.current && containerRef.current) {
      const totalScrollWidth = groupRef.current.scrollWidth;
      const viewportWidth = containerRef.current.clientWidth;
      const scrollDistance = totalScrollWidth - viewportWidth;

      const tween = gsap.to(groupRef.current, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${scrollDistance}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
      triggers.current.push(tween.scrollTrigger);

      const listItems = groupRef.current.querySelectorAll("li");
      const st2 = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${scrollDistance}`,
        scrub: true,
        onUpdate: (self) => {
          const viewportWidth = window.innerWidth;
          const maxDistance = viewportWidth / 2;
          listItems.forEach((item) => {
            const rect = item.getBoundingClientRect();
            const itemCenter = rect.left + rect.width / 2;
            const viewportCenter = viewportWidth / 2;
            const distance = Math.abs(itemCenter - viewportCenter);
            const progress = Math.max(0, 1 - distance / maxDistance);
            gsap.set(item, {
              scale: 0.8 + 0.2 * progress,
              opacity: progress,
            });
          });
        },
      });
      triggers.current.push(st2);
    }

    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      triggers.current.forEach(trigger => trigger.kill());
      triggers.current = [];
      window.removeEventListener("resize", updateMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  const particlesInit = async (engine) => {
    await loadFull(engine);
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
              animate={{ rotate: 360, scale: [1, 1.05, 1] }}
              transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
            />
          </motion.div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-6xl font-semibold text-dark_teal drop-shadow-2xl">
            <Typewriter
              options={{
                strings: title,
                autoStart: true,
                loop: true,
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
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.8 }}
            className="flex justify-center"
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
          transition={{ type: "spring", stiffness: 100, damping: 10, delay: 1 }}
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

      <section className="img-group-container relative" ref={containerRef}>
        <div className="sticky top-0 overflow-hidden h-auto w-full">
          <ul className={`flex ${isMobile ? "flex-col snap-y snap-mandatory h-screen overflow-y-scroll" : "flex-row mt-20"}`} ref={groupRef}>
            {items.map((item, index) => (
              <li
                key={index}
                className={`${isMobile ? "w-full h-screen snap-start flex items-center justify-center py-10" : "w-full h-[100vh]"} flex-none`}
                onClick={() => setSelectedItem(item)}
              >
                <motion.div
                  className="flex flex-col items-center cursor-pointer p-6"
                  variants={imageVariants}
                  initial={isMobile ? "hidden" : "rest"}
                  whileInView={isMobile ? "visible" : undefined}
                  transition={isMobile ? { duration: 0.5 } : undefined}
                  viewport={isMobile ? { once: false, amount: 0.5 } : undefined}
                  whileHover={!isMobile ? "hover" : undefined}
                  whileTap="tap"
                >
                  <img src={item.img} alt={item.title} loading="lazy" className="w-[280px] sm:w-[350px] h-[350px] sm:h-[450px] object-cover rounded-xl border border-mauve-500" />
                  <h3 className="text-4xl sm:text-6xl font-heading font-semibold text-deep_indigo -mt-10">{item.title}</h3>
                  <h6 className="text-lg sm:text-xl font-subheading font-medium text-dark_teal mt-2">{item.subtitle}</h6>
                  <p className="text-sm sm:text-base font-description font-light text-dark_teal max-w-[90%] sm:max-w-[70%] text-center mt-4">{item.description}</p>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {selectedItem && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            className="bg-lemon_chiffon p-8 rounded-xl max-w-2xl w-full mx-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedItem.img} alt={selectedItem.title} className="w-full h-64 object-cover rounded-xl mb-4" />
            <h3 className="text-3xl font-heading font-semibold text-deep_indigo">{selectedItem.title}</h3>
            <h6 className="text-xl font-subheading font-medium text-dark_teal mt-2">{selectedItem.subtitle}</h6>
            <p className="text-base font-description font-light text-dark_teal mt-4">{selectedItem.description}</p>
            <button
              className="mt-6 px-4 py-2 bg-electric_blue text-lemon_chiffon rounded-full"
              onClick={() => setSelectedItem(null)}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}

      <section
        ref={counterSectionRef}
        className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-champagne_pink via-tea_rose to-deep_indigo py-24"
      >
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-deep_indigo text-center mb-16"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          viewport={{ once: true }}
        >
          Coding Problems Solved on URI
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 w-full max-w-7xl px-6">
          {[
            ["Python", SiPython, 11],
            ["C++", SiCplusplus, 226],
            ["C", SiC, 100],
            ["Ranking", FaTrophy, 3130],
          ].map(([lang, Icon, value], index) => (
            <motion.div
              key={lang}
              className="flex flex-col items-center p-8 bg-lemon_chiffon/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-champagne_pink-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  initial={{ scale: 1 }}
                  whileInView={{ scale: [1, 1.2, 1], transition: { duration: 0.5, repeat: 2, repeatType: "reverse" } }}
                  viewport={{ once: true }}
                >
                  <Icon className={`text-5xl ${lang === "Ranking" ? "text-jordy_blue" : "text-jordy_blue"}`} />
                </motion.div>
                <CountUp
                  start={0}
                  end={value}
                  duration={2.5}
                  className={`text-6xl font-bold ${lang === "Ranking" ? "text-jordy_blue" : "text-electric_blue"}`}
                />
              </div>
              {lang !== "Ranking" ? (
                <a
                  href={`https://github.com/Bushraabir/uri_beecrowd_${lang.toLowerCase()}`}
                  className="text-lg text-non_photo_blue font-cta font-medium hover:text-lemon_chiffon transition-colors"
                >
                  Solved {value} in {lang}
                </a>
              ) : (
                <span className="text-lg text-jordy_blue font-cta font-medium">
                  Top 1% (3130)
                </span>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 p-10 bg-lemon_chiffon/20 backdrop-blur-xl rounded-3xl shadow-3xl max-w-5xl mx-auto border border-champagne_pink-500"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-heading font-extrabold text-deep_indigo mb-6">
            DSA Practice
          </h3>
          <p className="text-lg md:text-xl font-description text-dark_teal mb-6">
            My DSA repository showcases optimized algorithms and practical solutions to enhance my computer science skills.
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
            className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-electric_blue to-aquamarine text-lemon_chiffon font-cta font-semibold rounded-full mt-6 relative overflow-hidden"
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(142, 236, 245, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-champagne_pink/20"
              animate={{ x: ["-100%", "300%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.2, boxShadow: "0 0 15px rgba(251, 248, 204, 0.5)" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FaArrowUp size={24} />
        </motion.button>
      )}
    </article>
  );
}