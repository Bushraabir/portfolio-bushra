import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { debounce } from "lodash";
import AOS from "aos";
import "aos/dist/aos.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import Bushra from "../assets/Bushra.png";
import schrodinger_cat from "../assets/articles/schrodinger_cat.webp";
import Photons from "../assets/articles/Photons.webp";
import Neutrino from "../assets/articles/Neutrino.webp";
import Time_Dialation from "../assets/articles/Time_Dialation.webp";
import Universe from "../assets/articles/Universe.webp";
import Past from "../assets/articles/past.webp";
import Light from "../assets/articles/Light.webp";
import Expanding from "../assets/articles/Expanding.webp";
import Universe_1 from "../assets/articles/Universe_1.webp";
import Quantum from "../assets/articles/Quantum.webp";
import Material from "../assets/articles/Material.webp";

const Research = () => {
  const [filter, setFilter] = useState("books");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlePage, setArticlePage] = useState(1);
  const itemsPerPage = 3;
  const isMobile = useRef(window.innerWidth <= 768);

  const books = [
    {
      title: "The Architecture of Future",
      year: 2023,
      img: Bushra,
      tags: ["Architecture", "Future"],
      description:
        "Explore the future of architecture with cutting-edge designs and innovations.",
    },
    {
      title: "Code & Creativity",
      year: 2024,
      img: Bushra,
      tags: ["Programming", "Creativity"],
      description:
        "A deep dive into the world of creative coding and its impact on technology.",
    },
    {
      title: "Design Thinking in Practice",
      year: 2022,
      img: Bushra,
      tags: ["Design", "Innovation"],
      description:
        "A practical guide on implementing design thinking to solve real-world problems.",
    },
  ];

  const articles = [
    {
      title:
        "Understanding Schrödinger’s Cat and Quantum Superposition",
      platform: "Medium",
      link: "https://medium.com/@bb3708627/understanding-schr%C3%B6dingers-cat-and-quantum-superposition-8a174eecc114",
      tags: [
        "Quantum Mechanics",
        "Schrodingers Cat",
        "Superposition",
        "Quantum Interpretations",
        "Philosophy",
      ],
      img: Neutrino,
      description:
        "As someone who used to research quantum physics, it always annoys me when Schrödinger’s cat is brought up in pop culture. It’s often interpreted completely wrong. Typically, the interpretation suggests that you may or may not have murdered the cat, and because the box is closed and you don’t know what happened, both things must have happened simultaneously. People liken it to receiving a letter from your dream university — until you open it, you don’t know if you’re accepted or rejected, so both outcomes exist at the same time. This is fundamentally incorrect.",
    },
    {
      title:
        "A Journey Through Photons, Electrons, and the Fate of the Universe",
      platform: "Medium",
      link: "https://medium.com/@bb3708627/a-journey-through-photons-electrons-and-the-fate-of-the-universe-e822b631417e",
      tags: [
        "Cosmic Physics",
        "Quantum Mechanics",
        "Expanding Universe",
        "Light And Photons",
        "Black Hole and Galaxies",
      ],
      img: Photons,
      description:
        "One of the most enduring ideas in cosmology is that all things — stars, galaxies, and even black holes — eventually come to an end. Over unimaginably long time spans, every source of light may fade, and every structure may decay into a uniform “heat death” state. Yet some entities seem exempt from an inevitable death. One such candidate is the photon, the quantum of electromagnetic radiation. According to our current best theories, photons can persist indefinitely, never truly “dying” under normal circumstances. However, establishing whether photons live forever, transform into other particles, or ultimately fade to nothing brings us to the forefront of both cosmology and quantum physics. Exploring these concepts also sheds light on other fundamental particles — like electrons, protons, and neutrinos — and examines how the fabric of spacetime itself continually shifts the energy of light across billions of years.",
    },
    {
      title:
        "The Hunt for Proton Decay and the Birth of Neutrino Astronomy",
      platform: "Medium",
      link: "https://medium.com/@bb3708627/the-hunt-for-proton-decay-and-the-birth-of-neutrino-astronomy-3b13cf8e9bc2",
      tags: [
        "Neutrino Astronomy",
        "Proton Decay Exploration",
        "Particle Physics",
        "Cosmic Phenomena",
        "Grand Unified Theories",
      ],
      img: schrodinger_cat,
      description:
        "In alpha and gamma decays, the laws of energy and momentum conservation always matched perfectly. In beta decay, however, physicists noticed an apparent loss of both energy and momentum — until Wolfgang Pauli hypothesized the existence of a ghostly particle that balanced the books: the neutrino. Because neutrinos interact only weakly with matter, Pauli famously worried they would be “undetectable.” Yet, by 1956, antineutrinos were experimentally confirmed near nuclear reactors.",
    },
    {
      title: "Time Dilation and the Early Universe",
      platform: "Medium",
      link: "https://medium.com/@bb3708627/time-dilation-and-the-early-universe-7b3d133f3882",
      tags: [
        "Time Dilation",
        "Cosmic Expansion",
        "Space Exploration",
        "General Relativity",
      ],
      img: Time_Dialation,
      description:
        "Time measurement in relativity depends on how observers and clocks move in relation to one another. In special relativity, two observers in relative motion each perceive the other’s clock as running slower. However, general relativity refines this further by including the effects of gravity and cosmic expansion. When we look out into space, distant galaxies are not simply moving away at high speed through space; rather, the very fabric of space between us and those galaxies is stretching. This expansion both shifts light toward longer (redder) wavelengths and also dilates the apparent passage of time.",
    },
    {
      title: "Looking into the Shadows of the Universe",
      platform: "Medium",
      link: "https://medium.com/@bb3708627/looking-into-the-shadows-of-the-universe-65f324eb8a72",
      tags: ["Astronomy", "Dark Matter", "Dark Energy", "Universe"],
      img: Universe,
      description:
        "Modern astronomy has revealed a staggering fact: the familiar matter we see — stars, planets, nebulae — comprises only about 5% of the total energy content of the cosmos. The rest is shrouded in mystery, split between an invisible “Dark Matter” and an even more enigmatic “Dark Energy.” Although these two components remain undetected in a direct sense, their gravitational and cosmological effects strongly imply that they exist. How did we discover these invisible entities? Why do they matter? And how do they shape both the universe’s evolution and our place within it?",
    },
    {
      title: "Looking at Past",
      platform: "Medium",
      link: "https://medium.com/@bb3708627/looking-at-past-ab44d4bf5694",
      tags: ["Looking at past", "James Webb Telescope"],
      img: Past,
      description:
        "Astronomy offers us a remarkable window into the distant past. When we look at faint galaxies and other celestial objects through powerful telescopes, we see them as they once were, not as they currently are. This concept often surprises people: how can we see galaxies “as they were billions of years ago” if we live in the present? Yet the finite speed of light, the expansion of the universe, and the nature of spacetime itself all combine to produce this time-travel-like view. Recent developments — such as images from the James Webb Space Telescope (JWST) — highlight our ability to glimpse the cosmos at earlier stages of its evolution.",
    },
    {
      title: "The Nature of Light and Its Cosmic Speed Limit",
      platform: "Medium",
      link: "https://medium.com/@bb3708627/the-nature-of-light-and-its-cosmic-speed-limit-b0abf21b801f",
      tags: ["Speed of Light", "Physics"],
      img: Light,
      description:
        "Light is one of the universe’s most fascinating and fundamental phenomena. In a vacuum, it travels at approximately 299,792 kilometers per second (about 186,000 miles per second), a speed often designated by the symbol c. Since Einstein’s theory of special relativity was published in 1905, this speed has been recognized not just as a characteristic of photons (light particles) but also as a cosmic “speed limit.” However, it is crucial to distinguish between “nothing can travel faster than light in a vacuum” and “nothing at all can exceed the speed of light under any circumstances.” While massive objects — like spaceships, people, or subatomic particles with nonzero rest mass — cannot surpass this limit in a vacuum, there exist intriguing scenarios in which certain effects can appear, or even literally move, faster than light. Yet these scenarios do not undermine relativity’s fundamental rules about causality and the impossibility of massive objects achieving faster-than-light travel in a vacuum.",
    },
    {
      title: "The Expanding Universe: From Discovery to Future Fates",
      platform: "Medium",
      link: "https://medium.com/@bb3708627/the-expanding-universe-from-discovery-to-future-fates-4e5dfc4d08b6",
      tags: [
        "Cosmic Expansion",
        "Dark Energy",
        "Big Bang Theory",
        "Hubble Constant",
        "Astrophysics",
      ],
      img: Expanding,
      description:
        "For millennia, humanity saw the cosmos as eternal and unchanging. Yet, in the early 20th century, a revolutionary discovery emerged: the universe is expanding. Over the years, cosmologists have pieced together evidence of this expansion, explored its origins in the Big Bang, and investigated its mysterious drivers — particularly dark energy. In modern cosmology, we speak not just of galaxies moving through space but of space itself stretching, carrying galaxies apart. This document summarizes how we learned about the universe’s expansion, what drives it, and the potential ultimate fates of the cosmos.",
    },
    {
      title: "The Universe: From Birth to Possible End",
      platform: "Medium",
      link: "https://medium.com/@bb3708627/the-universe-from-birth-to-possible-end-209f2478013e",
      tags: ["Cosmology", "Big Bang", "Dark Energy", "Theoretical Astrophysics"],
      img: Universe_1,
      description:
        "From our vantage point on Earth, we see an immense cosmos filled with stars, galaxies, and mysterious forces. Modern astrophysics tells us our universe emerged from an extremely hot, dense state about 13.8 billion years ago and has been expanding ever since. Yet, just as it had a beginning, the universe may also have an ultimate fate. Will it keep expanding forever, or might it collapse or even “rip” apart? This overview explores how we arrived at our present cosmic understanding and the scientific scenarios for how everything could end.",
    },
    {
      title:
        "The Quantum Vacuum: From Zero-Point Fluctuations to Cosmological Implications",
      platform: "Medium",
      link: "https://medium.com/@bb3708627/the-quantum-vacuum-from-zero-point-fluctuations-to-cosmological-implications-4fa7f27141bd",
      tags: [
        "Quantum Physics",
        "Zero Point Energy",
        "Cosmology",
        "Quantum Field Theory",
        "Dark Energy",
      ],
      img: Quantum,
      description:
        "In quantum physics, what we traditionally call “empty space” or “vacuum” is far from empty. Instead, it is a dynamic field teeming with fleeting particles, fields, and fluctuations. This rich structure of “nothingness” emerges from the principles of quantum field theory (QFT), which describes the universe in terms of interacting fields rather than just point-like particles. Central to modern physics is the realization that every known force and particle can be understood as an excitation of an underlying field. Even in its lowest energy configuration — the so-called “vacuum state” — every quantum field experiences fluctuations. This lowest energy state is often referred to as having zero-point energy.",
    },
    {
      title:
        "Material Ejection from a Black Hole: A Cosmic Paradox",
      platform: "Medium",
      link: "https://medium.com/@bb3708627/material-ejection-from-a-black-hole-a-cosmic-paradox-a366fc16ff54",
      tags: [
        "Black Holes",
        "Astrophysics",
        "Relativistic Jets",
        "Cosmic Phenomena",
        "Space Exploration",
      ],
      img: Material,
      description:
        "Black holes are famously known as cosmic objects from which nothing, not even light, can escape. Yet, recent observations challenge this notion, showing material being ejected from the vicinity of black holes at near-light speeds. In 2018 and 2019, NASA’s Chandra X-ray Observatory and Harvard-Smithsonian Center for Astrophysics captured such phenomena in the system MAXI J1820+070, located about 10,000 light-years from Earth. This paradox sparks curiosity and further questions about black hole behavior.",
    },
  ];

  const handleSearch = debounce((value) => {
    setDebouncedSearch(value);
    setCurrentPage(1);
    setArticlePage(1);
  }, 500);

  const filteredData = (filter === "books" ? books : articles).filter((item) =>
    item.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (filter === "books" ? currentPage - 1 : articlePage - 1) * itemsPerPage,
    (filter === "books" ? currentPage : articlePage) * itemsPerPage
  );

  const changePage = (direction, type) => {
    if (type === "books") {
      setCurrentPage((prevPage) => prevPage + direction);
    } else if (type === "articles") {
      setArticlePage((prevPage) => prevPage + direction);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
    setArticlePage(1);
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div
      id="research"
      className="w-full px-4 sm:px-8 md:px-16 py-12 sm:py-24 mx-auto bg-lemon_chiffon text-deep_indigo"
    >
      <div className="mb-12 text-center" data-aos="fade-up">
        <h1 className="text-4xl sm:text-5xl font-serif text-gradient mb-6 leading-tight tracking-wide">
          My Research & Publications
        </h1>
        <p className="max-w-4xl mx-auto text-lg sm:text-xl">
        Delve into my research, where I challenge conventional boundaries in technology, design, and innovation. My work aims to unlock transformative insights in fields like Computer Science, Engineering Physics, and Astrophysics, driving forward-thinking solutions for real-world problems
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-6 mb-12 lg:flex-row">
        <div className="flex items-center p-4 space-x-4 sm:space-x-6 shadow-xl bg-champagne_pink rounded-2xl">
          <motion.button
            className={`px-6 py-3 sm:px-8 sm:py-4 font-medium rounded-lg text-base sm:text-xl transition-all duration-300 ${
              filter === "books"
                ? "bg-gradient-to-r from-electric_blue to-aquamarine text-white shadow-xl"
                : "bg-tea_rose text-deep_indigo hover:bg-pink_lavender"
            }`}
            onClick={() => handleFilterChange("books")}
            whileHover={{ scale: 1.05 }}
          >
            Books
          </motion.button>
          <motion.button
            className={`px-6 py-3 sm:px-8 sm:py-4 font-medium rounded-lg text-base sm:text-xl transition-all duration-300 ${
              filter === "articles"
                ? "bg-gradient-to-r from-electric_blue to-aquamarine text-white shadow-xl"
                : "bg-tea_rose text-deep_indigo hover:bg-pink_lavender"
            }`}
            onClick={() => handleFilterChange("articles")}
            whileHover={{ scale: 1.05 }}
          >
            Articles
          </motion.button>
        </div>

        <motion.input
          type="text"
          placeholder="Search..."
          className="w-full max-w-xl px-4 sm:px-8 py-3 border-2 border-deep_indigo bg-champagne_pink rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent1 focus:ring-opacity-50 placeholder:text-deep_indigo"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearch(e.target.value);
          }}
          whileFocus={{ scale: 1.02 }}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {paginatedData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden shadow-2xl bg-champagne_pink rounded-3xl group hover:shadow-3xl hover:scale-105 transition-transform"
              data-aos="fade-up"
            >
              {filter === "books" ? (
                <>
                  <div className="relative h-72">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="object-cover w-full h-full rounded-t-xl transition-transform duration-300 group-hover:scale-110"
                      loading="lazy" 
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-3xl font-serif text-accent1 mb-4">{item.title}</h3>
                    <p className="text-lg text-deep_indigo mb-4">Published: {item.year}</p>
                    <p className="text-deep_indigo text-lg">{item.description}</p>
                  </div>
                </>
              ) : (
                <div className="relative p-4 sm:p-8 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <LazyLoadImage
                    src={item.img}
                    alt={item.title}
                    effect="blur"
                    className="w-24 sm:w-36 h-24 sm:h-36 object-cover shadow-2xl rounded-full border-4 sm:border-8 border-deep_indigo transition-transform duration-300 group-hover:scale-110 z-20"
                    style={{
                      clipPath:
                        "polygon(10% 0%, 80% 5%, 95% 40%, 70% 75%, 30% 90%, 5% 60%, 10% 20%)",
                    }}
                  />
                  <div className="relative z-20 mt-4 sm:mt-6">
                    <h3 className="text-xl sm:text-2xl font-serif text-accent1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-base sm:text-lg text-deep_indigo">
                      Platform:{" "}
                      <span className="font-semibold text-accent2">
                        {item.platform}
                      </span>
                    </p>
                    <p className="text-sm sm:text-base text-deep_indigo mt-2">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex gap-1 sm:gap-2 flex-wrap mt-4 z-20">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs sm:text-sm text-deep_indigo bg-white bg-opacity-80 rounded-full shadow-lg transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center mt-4 text-base sm:text-lg text-accent1 font-semibold group hover:text-deep_indigo transition-all duration-300"
                  >
                    <span className="mr-2">Read More</span>
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-1 transition-transform duration-300"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
        <p className="text-base sm:text-xl font-semibold text-deep_indigo">
          Page {filter === "books" ? currentPage : articlePage} of{" "}
          {Math.ceil(filteredData.length / itemsPerPage)}
        </p>
        <div className="flex gap-4">
          {((filter === "books" && currentPage > 1) ||
            (filter === "articles" && articlePage > 1)) && (
            <motion.button
              onClick={() => changePage(-1, filter)}
              className="px-4 sm:px-6 py-2 sm:py-3 text-white bg-gradient-to-r from-electric_blue to-aquamarine rounded-lg shadow-md hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
            >
              Previous
            </motion.button>
          )}
          {((filter === "books" &&
            currentPage * itemsPerPage < filteredData.length) ||
            (filter === "articles" &&
              articlePage * itemsPerPage < filteredData.length)) && (
            <motion.button
              onClick={() => changePage(1, filter)}
              className="px-4 sm:px-6 py-2 sm:py-3 text-white bg-gradient-to-r from-electric_blue to-aquamarine rounded-lg shadow-md hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
            >
              Next
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Research;
