import { useState, useEffect, useMemo, useCallback } from "react";
import { debounce } from "lodash";
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
import BlackHole from "../assets/ResearchPaper/BlackHole.png";
import MCU from "../assets/ResearchPaper/MCU.png";

const books = [
  {
    title: "Terraforming Our Future: The Evolution of Space Exploration, Technology, and Multiplanetary Civilization",
    year: "(Currently writing)",
    img: Bushra,
    tags: ["Architecture", "Future"],
    description: "Explore the potential future of human civilization, space exploration, colonization, the path to a Type 7 civilization, and the politics of space."
  },
  {
    title: "The Physics Odyssey: Understanding the Forces of Nature",
    year: "(Currently writing)",
    img: Bushra,
    tags: ["Programming", "Creativity"],
    description: "This work delves into the fundamental forces—gravity, electromagnetism, and nuclear forces—shaping the universe."
  },
  {
    title: "Introduction to Aerospace Engineering: Principles and Practices",
    year: "(Currently writing)",
    img: Bushra,
    tags: ["Design", "Innovation"],
    description: "Delve into the fundamentals of aerospace engineering, covering key principles, design concepts, and applications."
  },
  {
    title: "Atomic Energy and Engineering: A Beginner’s Guide to Nuclear Engineering",
    year: "(Currently writing)",
    img: Bushra,
    tags: ["Design", "Innovation"],
    description: "This guide provides an accessible introduction to the world of nuclear engineering."
  }
];

const articles = [
  {
    title: "Understanding Schrödinger’s Cat and Quantum Superposition",
    platform: "Medium",
    link: "https://medium.com/@bb3708627/understanding-schr%C3%B6dingers-cat-and-quantum-superposition-8a174eecc114",
    tags: ["Quantum Mechanics", "Schrodingers Cat", "Superposition", "Quantum Interpretations", "Philosophy"],
    img: Neutrino,
    description: "As someone who used to research quantum physics, it always annoys me when Schrödinger’s cat is brought up in pop culture."
  },
  {
    title: "A Journey Through Photons, Electrons, and the Fate of the Universe",
    platform: "Medium",
    link: "https://medium.com/@bb3708627/a-journey-through-photons-electrons-and-the-fate-of-the-universe-e822b631417e",
    tags: ["Cosmic Physics", "Quantum Mechanics", "Expanding Universe", "Light And Photons", "Black Hole and Galaxies"],
    img: Photons,
    description: "One of the most enduring ideas in cosmology is that all things — stars, galaxies, and even black holes — eventually come to an end."
  },
  {
    title: "The Hunt for Proton Decay and the Birth of Neutrino Astronomy",
    platform: "Medium",
    link: "https://medium.com/@bb3708627/the-hunt-for-proton-decay-and-the-birth-of-neutrino-astronomy-3b13cf8e9bc2",
    tags: ["Neutrino Astronomy", "Proton Decay Exploration", "Particle Physics", "Cosmic Phenomena", "Grand Unified Theories"],
    img: schrodinger_cat,
    description: "In alpha and gamma decays, the laws of energy and momentum conservation always matched perfectly."
  },
  {
    title: "Time Dilation and the Early Universe",
    platform: "Medium",
    link: "https://medium.com/@bb3708627/time-dilation-and-the-early-universe-7b3d133f3882",
    tags: ["Time Dilation", "Cosmic Expansion", "Space Exploration", "General Relativity"],
    img: Time_Dialation,
    description: "Time measurement in relativity depends on how observers and clocks move in relation to one another."
  },
  {
    title: "Looking into the Shadows of the Universe",
    platform: "Medium",
    link: "https://medium.com/@bb3708627/looking-into-the-shadows-of-the-universe-65f324eb8a72",
    tags: ["Astronomy", "Dark Matter", "Dark Energy", "Universe"],
    img: Universe,
    description: "Modern astronomy has revealed a staggering fact: the familiar matter we see — stars, planets, nebulae — comprises only about 5% of the total energy content of the cosmos."
  },
  {
    title: "Looking at Past",
    platform: "Medium",
    link: "https://medium.com/@bb3708627/looking-at-past-ab44d4bf5694",
    tags: ["Looking at past", "James Webb Telescope"],
    img: Past,
    description: "Astronomy offers us a remarkable window into the distant past."
  },
  {
    title: "The Nature of Light and Its Cosmic Speed Limit",
    platform: "Medium",
    link: "https://medium.com/@bb3708627/the-nature-of-light-and-its-cosmic-speed-limit-b0abf21b801f",
    tags: ["Speed of Light", "Physics"],
    img: Light,
    description: "Light is one of the universe’s most fascinating and fundamental phenomena."
  },
  {
    title: "The Expanding Universe: From Discovery to Future Fates",
    platform: "Medium",
    link: "https://medium.com/@bb3708627/the-expanding-universe-from-discovery-to-future-fates-4e5dfc4d08b6",
    tags: ["Cosmic Expansion", "Dark Energy", "Big Bang Theory", "Hubble Constant", "Astrophysics"],
    img: Expanding,
    description: "For millennia, humanity saw the cosmos as eternal and unchanging."
  },
  {
    title: "The Universe: From Birth to Possible End",
    platform: "Medium",
    link: "https://medium.com/@bb3708627/the-universe-from-birth-to-possible-end-209f2478013e",
    tags: ["Cosmology", "Big Bang", "Dark Energy", "Theoretical Astrophysics"],
    img: Universe_1,
    description: "From our vantage point on Earth, we see an immense cosmos filled with stars, galaxies, and mysterious forces."
  },
  {
    title: "The Quantum Vacuum: From Zero-Point Fluctuations to Cosmological Implications",
    platform: "Medium",
    link: "https://medium.com/@bb3708627/the-quantum-vacuum-from-zero-point-fluctuations-to-cosmological-implications-4fa7f27141bd",
    tags: ["Quantum Physics", "Zero Point Energy", "Cosmology", "Quantum Field Theory", "Dark Energy"],
    img: Quantum,
    description: "In quantum physics, what we traditionally call “empty space” or “vacuum” is far from empty."
  },
  {
    title: "Material Ejection from a Black Hole: A Cosmic Paradox",
    platform: "Medium",
    link: "https://medium.com/@bb3708627/material-ejection-from-a-black-hole-a-cosmic-paradox-a366fc16ff54",
    tags: ["Black Holes", "Astrophysics", "Relativistic Jets", "Cosmic Phenomena", "Space Exploration"],
    img: Material,
    description: "Black holes are famously known as cosmic objects from which nothing, not even light, can escape."
  }
];

const researchPapers = [
  {
    title: "Design, Fabrication, and Characterization of a Low-Voltage, High-Density Homemade Integrated Circuit",
    year: "(Currently writing)",
    img: MCU,
    tags: ["Architecture", "Future"],
    description: "This paper explores the design, fabrication, and characterization of a low-voltage, high-density integrated circuit."
  },
  {
    title: "Black Hole Singularity: A Possible Solution",
    year: "(Currently writing)",
    img: BlackHole,
    tags: ["Programming", "Creativity"],
    description: "This paper explores a potential solution to the black hole singularity problem."
  }
];

const Research = () => {
  const [filter, setFilter] = useState("books");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState({ books: 1, articles: 1, research: 1 });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showFilters, setShowFilters] = useState(!isMobile);

  const itemsPerPage = 3;

  const handleResize = useCallback(() => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    if (!mobile) setShowFilters(true);
  }, []);

  useEffect(() => {
    const debouncedResize = debounce(handleResize, 250);
    window.addEventListener("resize", debouncedResize);
    return () => window.removeEventListener("resize", debouncedResize);
  }, [handleResize]);

  const handleSearch = useCallback(debounce((value) => {
    setPage(prev => ({ ...prev, [filter]: 1 }));
  }, 300), [filter]);

  const filteredData = useMemo(() => {
    const data = filter === "books" ? books : filter === "articles" ? articles : researchPapers;
    return data.filter(item => 
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [filter, search]);

  const paginatedData = useMemo(() => {
    const start = (page[filter] - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filter, page, filteredData]);

  const changePage = useCallback((direction) => {
    setPage(prev => {
      const newPage = prev[filter] + direction;
      if (newPage < 1 || newPage > Math.ceil(filteredData.length / itemsPerPage)) return prev;
      return { ...prev, [filter]: newPage };
    });
  }, [filter, filteredData]);

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
    setPage(prev => ({ ...prev, [newFilter]: 1 }));
  }, []);

  const totalPages = useMemo(() => 
    Math.ceil(filteredData.length / itemsPerPage)
  , [filteredData.length]);

  const ToggleButton = ({ children, active, onClick }) => (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 ${active ? "bg-gradient-to-r from-cyan-400 to-teal-400 text-white shadow-lg shadow-cyan-400/50" : "bg-champagne_pink text-deep_indigo hover:bg-tea_rose hover:text-deep_indigo"}`}
    >
      {children}
    </button>
  );

  const ResearchItem = ({ item }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {filter === "books" || filter === "research" ? (
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <LazyLoadImage
              src={item.img}
              alt={item.title}
              effect="blur"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 md:w-2/3">
            <h3 className="text-2xl font-heading font-bold mb-2 text-deep_indigo">{item.title}</h3>
            <p className="text-gray-600 mb-4">{item.year}</p>
            <p className="text-lg text-gray-700">{item.description}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 flex justify-center items-center p-6">
            <LazyLoadImage
              src={item.img}
              alt={item.title}
              effect="blur"
              className="w-32 h-32 rounded-full border-4 border-tea_rose"
            />
          </div>
          <div className="p-6 md:w-3/4">
            <h3 className="text-2xl font-heading font-bold mb-2 text-deep_indigo">{item.title}</h3>
            <p className="text-gray-600 mb-2">Platform: {item.platform}</p>
            <p className="text-lg text-gray-700 mb-4">{item.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-sm bg-mauve text-white rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-400 to-teal-400 text-white rounded-full transition-all duration-300 hover:from-teal-400 hover:to-cyan-400 hover:shadow-lg"
            >
              Read More
            </a>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div id="research" className="bg-gradient-to-br from-lemon_chiffon to-pink_lavender text-deep_indigo min-h-screen">
      <div className="max-w-7xl mx-auto p-8 flex flex-col md:flex-row">
        {isMobile && (
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="mb-4 px-6 py-3 bg-gradient-to-r from-cyan-400 to-teal-400 text-white rounded-full transition-all duration-300 hover:from-teal-400 hover:to-cyan-400"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        )}
        {(!isMobile || showFilters) && (
          <aside className="md:w-1/4 mb-8 md:mb-0 md:mr-8">
            <h2 className="text-3xl font-heading font-bold mb-6 text-deep_indigo">Filters</h2>
            <div className="flex flex-col space-y-4">
              <ToggleButton active={filter === "books"} onClick={() => handleFilterChange("books")}>
                Books
              </ToggleButton>
              <ToggleButton active={filter === "articles"} onClick={() => handleFilterChange("articles")}>
                Articles
              </ToggleButton>
              <ToggleButton active={filter === "research"} onClick={() => handleFilterChange("research")}>
                Research Paper
              </ToggleButton>
            </div>
            <div className="relative mt-8">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  handleSearch(e.target.value);
                }}
                className="w-full px-4 py-3 pl-10 border-2 border-tea_rose rounded-full focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-deep_indigo">🔍</span>
            </div>
          </aside>
        )}
        <main className="md:w-3/4">
          <header className="mb-10">
            <h1 className="text-5xl font-heading font-extrabold mb-4 text-deep_indigo">My Research & Publications</h1>
            <p className="text-xl leading-relaxed text-gray-700">
              I've explored a range of engineering fields and advanced scientific topics, including nuclear, aerospace, astronautical, and electronics engineering, along with in-depth work on astronomy, astrophysics, and quantum mechanics.
            </p>
          </header>
          <section className="space-y-8">
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <ResearchItem key={`${filter}-${index}`} item={item} />
              ))
            ) : (
              <p className="text-center text-xl text-gray-600">No items found for the current filter and search.</p>
            )}
          </section>
          <div className="flex justify-between items-center mt-10">
            <p className="text-xl font-semibold text-deep_indigo">
              Page {page[filter]} of {totalPages}
            </p>
            <div className="space-x-4">
              {page[filter] > 1 && (
                <button
                  onClick={() => changePage(-1)}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-teal-400 text-white rounded-full transition-all duration-300 hover:from-teal-400 hover:to-cyan-400"
                >
                  ← Previous
                </button>
              )}
              {page[filter] < totalPages && (
                <button
                  onClick={() => changePage(1)}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-teal-400 text-white rounded-full transition-all duration-300 hover:from-teal-400 hover:to-cyan-400"
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Research;