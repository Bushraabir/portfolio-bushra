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
      title:
        "Terraforming Our Future: The Evolution of Space Exploration, Technology, and Multiplanetary Civilization",
      year: "(Currently writing)",
      img: Bushra,
      tags: ["Architecture", "Future"],
      description:
        "Explore the potential future of human civilization, space exploration, colonization, the path to a Type 7 civilization, and the politics of space.",
    },
    {
      title: "The Physics Odyssey: Understanding the Forces of Nature",
      year: "(Currently writing)",
      img: Bushra,
      tags: ["Programming", "Creativity"],
      description:
        "This work delves into the fundamental forces—gravity, electromagnetism, and nuclear forces—shaping the universe. It aims to simplify complex physics concepts, offering a clear understanding of the forces that govern everything from our planet to the cosmos",
    },
    {
      title: "Introduction to Aerospace Engineering: Principles and Practices",
      year: "(Currently writing)",
      img: Bushra,
      tags: ["Design", "Innovation"],
      description:
        "Delve into the fundamentals of aerospace engineering, covering key principles, design concepts, and applications. This exploration highlights the complexities of flight mechanics, propulsion systems, materials, and structural design, providing a comprehensive overview of the field. As technology advances, aerospace engineers play a crucial role in shaping the future of air and space travel, from cutting-edge aircraft to interplanetary missions. Explore the evolving landscape of this dynamic field, its impact on industries, and its contributions to global advancements in transportation and exploration.",
    },
    {
      title: "Atomic Energy and Engineering: A Beginner’s Guide to Nuclear Engineering",
      year: "(Currently writing)",
      img: Bushra,
      tags: ["Design", "Innovation"],
      description:
        "This guide provides an accessible introduction to the world of nuclear engineering, focusing on the science behind atomic energy and its practical applications. From the fundamentals of nuclear physics to the design and operation of nuclear reactors, this exploration covers the key principles that drive the industry. Learn about the processes of fission, radiation, and safety protocols, as well as the challenges and benefits of harnessing atomic energy for power generation. As the world seeks sustainable energy solutions, nuclear engineering stands at the forefront, promising to shape the future of clean and efficient energy systems.",
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

  const research = [
    {
      title:
        "Design, Fabrication, and Characterization of a Low-Voltage, High-Density Homemade Integrated Circuit",
      year: "(Currently writing)",
      img: MCU,
      tags: ["Architecture", "Future"],
      description:
        "This paper explores the design, fabrication, and characterization of a low-voltage, high-density integrated circuit, focusing on performance optimization and practical applications in modern electronics.",
    },
    {
      title: "Black Hole Singularity: A Possible Solution",
      year: "(Currently writing)",
      img: BlackHole,
      tags: ["Programming", "Creativity"],
      description:
        "This paper explores a potential solution to the black hole singularity problem, proposing that black holes are 4D objects. Everything that falls into a black hole is absorbed into this 4D space and vaporized by Hawking radiation. From our 3D perspective, the singularity appears infinite, but if black holes were 3D objects, they would appear infinite to a 2D observer. This analogy suggests that the singularity might not be infinite, but a result of our limited perspective.",
    },
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
      const data = filter === "books" ? books : filter === "articles" ? articles : research;
      return data.filter(item => 
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }, [filter, search]);
  
    const paginatedData = useMemo(() => {
      const start = (page[filter] - 1) * itemsPerPage;
      return filteredData.slice(start, start + itemsPerPage);
    }, [filter, page, filteredData]);
  
    const changePage = useCallback((direction) => {
      setPage(prev => ({ ...prev, [filter]: Math.max(1, prev[filter] + direction) }));
    }, [filter]);
  
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
        className={`px-4 py-2 rounded transition-colors duration-300 ${
          active ? "bg-gradient-to-r from-electric_blue to-aquamarine text-white" 
          : "bg-tea_rose text-deep_indigo hover:bg-pink_lavender"
        }`}
      >
        {children}
      </button>
    );
  
    const ResearchItem = ({ item }) => (
      <div className="bg-champagne_pink rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row transition-shadow duration-300 hover:shadow-2xl">
        {filter === "books" || filter === "research" ? (
          <>
            <div className="md:w-1/3">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-8 md:w-2/3 flex flex-col justify-center">
              <h3 className="text-3xl font-bold mb-3">{item.title}</h3>
              <p className="mb-4">{item.year}</p>
              <p className="text-lg">{item.description}</p>
            </div>
          </>
        ) : (
          <div className="flex flex-col md:flex-row w-full">
            <div className="md:w-1/3 flex justify-center items-center p-6">
              <LazyLoadImage
                src={item.img}
                alt={item.title}
                effect="blur"
                className="w-32 h-32 rounded-full border-4 border-deep_indigo"
              />
            </div>
            <div className="p-8 md:w-2/3 flex flex-col justify-center">
              <h3 className="text-3xl font-bold mb-3">{item.title}</h3>
              <p className="mb-2 text-lg">Platform: {item.platform}</p>
              <p className="mb-4 text-lg">{item.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs bg-white bg-opacity-80 rounded-full shadow font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-6 py-2 bg-gradient-to-r from-electric_blue to-aquamarine text-white rounded transition-colors duration-300 hover:bg-pink_lavender"
              >
                Read More
              </a>
            </div>
          </div>
        )}
      </div>
    );
  
    return (
      <div className="bg-lemon_chiffon text-deep_indigo min-h-screen">
        <div className="max-w-7xl mx-auto p-8 flex flex-col md:flex-row">
          {isMobile && (
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="mb-4 px-4 py-2 bg-gradient-to-r from-electric_blue to-aquamarine text-white rounded transition-colors duration-300 hover:bg-pink_lavender"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          )}
  
          {(!isMobile || showFilters) && (
            <aside className="md:w-1/4 mb-8 md:mb-0 md:mr-8">
              <h2 className="text-3xl font-bold mb-6">Filters</h2>
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
              <div className="mt-8">
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  className="w-full px-4 py-2 border-2 border-deep_indigo rounded focus:outline-none focus:ring-2 focus:ring-accent1"
                />
              </div>
            </aside>
          )}
  
          <main className="md:w-3/4">
            <header className="mb-10">
              <h1 className="text-5xl font-extrabold mb-4">My Research & Publications</h1>
              <p className="text-xl leading-relaxed">
                I've explored a range of engineering fields and advanced scientific topics. 
                This includes nuclear, aerospace, astronautical, and electronics engineering, 
                along with in-depth work on astronomy, astrophysics, and quantum mechanics.
              </p>
            </header>
  
            <section className="space-y-8">
              {paginatedData.map((item, index) => (
                <ResearchItem key={`${filter}-${index}`} item={item} />
              ))}
            </section>
  
            <div className="flex justify-between items-center mt-10">
              <p className="text-xl font-semibold">
                Page {page[filter]} of {totalPages}
              </p>
              <div className="space-x-4">
                {page[filter] > 1 && (
                  <button
                    onClick={() => changePage(-1)}
                    className="px-6 py-2 bg-gradient-to-r from-electric_blue to-aquamarine text-white rounded transition-colors duration-300 hover:bg-pink_lavender"
                  >
                    Previous
                  </button>
                )}
                {page[filter] < totalPages && (
                  <button
                    onClick={() => changePage(1)}
                    className="px-6 py-2 bg-gradient-to-r from-electric_blue to-aquamarine text-white rounded transition-colors duration-300 hover:bg-pink_lavender"
                  >
                    Next
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