import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { debounce } from "lodash";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// Import all article images
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

/**
 * Enhanced Icon Components with smooth animations
 */
const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg className={`${className} transition-all duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ExternalLinkIcon = ({ className = "w-4 h-4" }) => (
  <svg className={`${className} transition-all duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const CalendarIcon = ({ className = "w-4 h-4" }) => (
  <svg className={`${className} transition-all duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = ({ className = "w-4 h-4" }) => (
  <svg className={`${className} transition-all duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const FilterIcon = ({ className = "w-5 h-5" }) => (
  <svg className={`${className} transition-all duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
  </svg>
);

const SparkleIcon = ({ className = "w-5 h-5" }) => (
  <svg className={`${className} transition-all duration-300`} fill="currentColor" viewBox="0 0 24 24">
    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
  </svg>
);

const ChevronLeftIcon = ({ className = "w-5 h-5" }) => (
  <svg className={`${className} transition-all duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = ({ className = "w-5 h-5" }) => (
  <svg className={`${className} transition-all duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const TrendingIcon = ({ className = "w-5 h-5" }) => (
  <svg className={`${className} transition-all duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const StarIcon = ({ className = "w-4 h-4", filled = false }) => (
  <svg className={`${className} transition-all duration-300`} fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

/**
 * Enhanced Articles data structure
 */
const articles = [
  {
    id: "schrodinger-cat",
    title: "Understanding Schrödinger's Cat and Quantum Superposition",
    platform: "Medium",
    link: "https://medium.com/@bb3708627/understanding-schr%C3%B6dingers-cat-and-quantum-superposition-8a174eecc114",
    tags: ["Quantum Mechanics", "Schrodingers Cat", "Superposition", "Quantum Interpretations", "Philosophy"],
    img: Neutrino,
    category: "Quantum Physics",
    readTime: "8 min read",
    publishDate: "2024-01-15",
    featured: true,

    description: "As someone who used to research quantum physics, it always annoys me when Schrödinger's cat is brought up in pop culture. It's often interpreted completely wrong. Typically, the interpretation suggests that you may or may not have murdered the cat, and because the box is closed and you don't know what happened, both things must have happened simultaneously."
  },
  {
    id: "photons-journey",
    title: "A Journey Through Photons, Electrons, and the Fate of the Universe",
    platform: "Medium",
    link: "https://medium.com/@bb3708627/a-journey-through-photons-electrons-and-the-fate-of-the-universe-e822b631417e",
    tags: ["Cosmic Physics", "Quantum Mechanics", "Expanding Universe", "Light And Photons", "Black Hole and Galaxies"],
    img: Photons,
    category: "Cosmology",
    readTime: "12 min read",
    publishDate: "2024-02-10",
    featured: true,

    description: "One of the most enduring ideas in cosmology is that all things — stars, galaxies, and even black holes — eventually come to an end. Over unimaginably long time spans, every source of light may fade, and every structure may decay into a uniform heat death state."
  },
  {
    id: "neutrino-astronomy",
    title: "The Hunt for Proton Decay and the Birth of Neutrino Astronomy",
    platform: "Medium",
    link: "https://medium.com/@bb3708627/the-hunt-for-proton-decay-and-the-birth-of-neutrino-astronomy-3b13cf8e9bc2",
    tags: ["Neutrino Astronomy", "Proton Decay Exploration", "Particle Physics", "Cosmic Phenomena", "Grand Unified Theories"],
    img: schrodinger_cat,
    category: "Particle Physics",
    readTime: "10 min read",
    publishDate: "2024-03-05",
    featured: false,

    description: "At the dawn of the 20th century, physicists categorized three main types of radioactive decay: Alpha decay, Beta decay, and Gamma decay. In beta decay, however, physicists noticed an apparent loss of both energy and momentum until Wolfgang Pauli hypothesized the existence of a ghostly particle."
  },
  {
    id: "time-dilation",
    title: "Time Dilation and the Early Universe",
    platform: "Medium",
    link: "https://medium.com/@bb3708627/time-dilation-and-the-early-universe-7b3d133f3882",
    tags: ["Time Dilation", "Cosmic Expansion", "Space Exploration", "General Relativity"],
    img: Time_Dialation,
    category: "Relativity",
    readTime: "9 min read",
    publishDate: "2024-04-12",
    featured: false,

    description: "Time measurement in relativity depends on how observers and clocks move in relation to one another. In special relativity, two observers in relative motion each perceive the other's clock as running slower."
  },
  {
    id: "universe-shadows",
    title: "Looking into the Shadows of the Universe",
    platform: "Medium",
    link: "https://medium.com/@bb3708627/looking-into-the-shadows-of-the-universe-65f324eb8a72",
    tags: ["Astronomy", "Dark Matter", "Dark Energy", "Universe"],
    img: Universe,
    category: "Dark Universe",
    readTime: "11 min read",
    publishDate: "2024-05-18",
    featured: true,

    description: "Modern astronomy has revealed a staggering fact: the familiar matter we see — stars, planets, nebulae — comprises only about 5% of the total energy content of the cosmos. The rest is shrouded in mystery, split between an invisible Dark Matter and an even more enigmatic Dark Energy."
  },
  {
    id: "looking-past",
    title: "Looking at Past",
    platform: "Medium",
    link: "https://medium.com/@bb3708627/looking-at-past-ab44d4bf5694",
    tags: ["Looking at past", "James Webb Telescope"],
    img: Past,
    category: "Observational Astronomy",
    readTime: "7 min read",
    publishDate: "2024-06-22",
    featured: false,

    description: "Astronomy offers us a remarkable window into the distant past. When we look at faint galaxies and other celestial objects through powerful telescopes, we see them as they once were, not as they currently are."
  },
  {
    id: "nature-of-light",
    title: "The Nature of Light and Its Cosmic Speed Limit",
    platform: "Medium",
    link: "https://medium.com/@bb3708627/the-nature-of-light-and-its-cosmic-speed-limit-b0abf21b801f",
    tags: ["Speed of Light", "Physics"],
    img: Light,
    category: "Fundamental Physics",
    readTime: "8 min read",
    publishDate: "2024-07-08",
    featured: false,

    description: "Recent developments such as images from the James Webb Space Telescope highlight our ability to glimpse the cosmos at earlier stages of its evolution. However, it is crucial to distinguish between various speed limits in physics."
  },
  {
    id: "expanding-universe",
    title: "The Expanding Universe: From Discovery to Future Fates",
    platform: "Medium",
    link: "https://medium.com/@bb3708627/the-expanding-universe-from-discovery-to-future-fates-4e5dfc4d08b6",
    tags: ["Cosmic Expansion", "Dark Energy", "Big Bang Theory", "Hubble Constant", "Astrophysics"],
    img: Expanding,
    category: "Cosmology",
    readTime: "13 min read",
    publishDate: "2024-08-14",
    featured: true,

    description: "For millennia, humanity saw the cosmos as eternal and unchanging. Yet, in the early 20th century, a revolutionary discovery emerged: the universe is expanding. Over the years, cosmologists have pieced together evidence of this expansion."
  },
  {
    id: "universe-birth-end",
    title: "The Universe: From Birth to Possible End",
    platform: "Medium",
    link: "https://medium.com/@bb3708627/the-universe-from-birth-to-possible-end-209f2478013e",
    tags: ["Cosmology", "Big Bang", "Dark Energy", "Theoretical Astrophysics"],
    img: Universe_1,
    category: "Theoretical Physics",
    readTime: "14 min read",
    publishDate: "2024-09-03",
    featured: false,


    description: "From our vantage point on Earth, we see an immense cosmos filled with stars, galaxies, and mysterious forces. Modern astrophysics tells us our universe emerged from an extremely hot, dense state about 13.8 billion years ago."
  },
  {
    id: "quantum-vacuum",
    title: "The Quantum Vacuum: From Zero-Point Fluctuations to Cosmological Implications",
    platform: "Medium",
    link: "https://medium.com/@bb3708627/the-quantum-vacuum-from-zero-point-fluctuations-to-cosmological-implications-4fa7f27141bd",
    tags: ["Quantum Physics", "Zero Point Energy", "Cosmology", "Quantum Field Theory", "Dark Energy"],
    img: Quantum,
    category: "Quantum Field Theory",
    readTime: "12 min read",
    publishDate: "2024-10-15",
    featured: false,

    description: "In quantum physics, what we traditionally call empty space or vacuum is far from empty. Instead, it is a dynamic field teeming with fleeting particles, fields, and fluctuations."
  },
  {
    id: "black-hole-material",
    title: "Material Ejection from a Black Hole: A Cosmic Paradox",
    platform: "Medium",
    link: "https://medium.com/@bb3708627/material-ejection-from-a-black-hole-a-cosmic-paradox-a366fc16ff54",
    tags: ["Black Holes", "Astrophysics", "Relativistic Jets", "Cosmic Phenomena", "Space Exploration"],
    img: Material,
    category: "Black Hole Physics",
    readTime: "9 min read",
    publishDate: "2024-11-20",
    featured: true,

    description: "Black holes are famously known as cosmic objects from which nothing, not even light, can escape. Yet, recent observations challenge this notion, showing material being ejected from the vicinity of black holes at near-light speeds."
  }
];

/**
 * Get unique categories from articles
 */
const categories = [...new Set(articles.map(article => article.category))];

/**
 * Premium Scientific Research Showcase with Enhanced Glassmorphism
 */
const PremiumResearchShowcase = () => {
  // Core state management
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;
  
  // UI state
  const [searchInput, setSearchInput] = useState("");
  const [hoveredArticle, setHoveredArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Enhanced debounced search handler
  const debouncedSearch = useCallback(
    debounce((term) => {
      setIsLoading(true);
      setTimeout(() => {
        setSearchTerm(term);
        setCurrentPage(1);
        setIsLoading(false);
      }, 200);
    }, 300),
    []
  );

  // Handle search input change with immediate debouncing
  useEffect(() => {
    debouncedSearch(searchInput);
  }, [searchInput, debouncedSearch]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
  };

  // Clear search
  const clearSearch = () => {
    setSearchInput("");
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Enhanced filter and sort articles
  const filteredAndSortedArticles = useMemo(() => {
    let filtered = articles.filter(article => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || 
        article.title.toLowerCase().includes(searchLower) ||
        article.description.toLowerCase().includes(searchLower) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        article.category.toLowerCase().includes(searchLower);
      
      const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
 
      return matchesSearch && matchesCategory ;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.publishDate) - new Date(a.publishDate);
        case "oldest":
          return new Date(a.publishDate) - new Date(b.publishDate);
        case "readTime":
          return parseInt(a.readTime) - parseInt(b.readTime);
        case "alphabetical":
          return a.title.localeCompare(b.title);
        case "featured":
          return b.featured - a.featured;

        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory,  sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedArticles.length / articlesPerPage);
  const currentPageArticles = filteredAndSortedArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  // Page navigation
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Check if article is new (within 60 days)
  const isNew = (publishDate) => {
    const articleDate = new Date(publishDate);
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
    return articleDate > sixtyDaysAgo;
  };



  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSearchInput("");
    setSelectedCategory("All");
    setSortBy("newest");
    setCurrentPage(1);
  };

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">

            
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 tracking-tight leading-none">
              <span className="block bg-gradient-to-r from-lemon_chiffon-500 via-non_photo_blue-500 to-deep_indigo-700 bg-clip-text text-transparent mb-3">
                Discover the
              </span>
              <span className="block bg-gradient-to-r from-jordy_blue-500 via-mauve-500 via-pink_lavender-500 to-aquamarine-500 bg-clip-text text-transparent relative animate-gradient-move bg-[length:200%_200%]">
                Universe's Secrets
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-gradient-to-r from-jordy_blue-500 to-mauve-500 rounded-full animate-pulse" />
              </span>
            </h1>
            
            <p className="font-description text-lg sm:text-xl text-lemon_chiffon-500 max-w-3xl mx-auto leading-relaxed mb-8">
              Journey through cutting-edge research articles exploring quantum mechanics, cosmology, 
              and the fundamental mysteries that shape our understanding of reality.
            </p>

            {/* Enhanced Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              <div className="text-center group cursor-pointer">
                <div className="text-3xl font-bold bg-gradient-to-r from-jordy_blue-500 to-mauve-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 font-heading">
                  {articles.length}+
                </div>
                <div className="font-description text-deep_indigo-500 font-medium mt-1">Research Articles</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-3xl font-bold bg-gradient-to-r from-mauve-500 to-pink_lavender-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 font-heading">
                  {categories.length}+
                </div>
                <div className="font-description text-deep_indigo-500 font-medium mt-1">Categories</div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8" >
        <div className="max-w-7xl mx-auto ">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Panel - Search & Filters */}
            <div className="lg:col-span-1">
              <div className="bg-transparent  rounded-3xl p-6  sticky top-4  overflow-y-auto">
                <h2 className="font-heading py-6 text-2xl font-bold bg-gradient-to-r from-jordy_blue-500 to-mauve-500 bg-clip-text text-transparent mb-6">
                  Explore Research
                </h2>
                
                {/* Search Bar */}
                <div className="relative mb-6 group">
                  <input
                    type="text"
                    placeholder="Search quantum mechanics, cosmology..."
                    value={searchInput}
                    onChange={handleSearchChange}
                    className="w-full px-4 py-4 bg-white/80 border-2 border-white/60 rounded-2xl focus:outline-none focus:border-jordy_blue-500 focus:ring-4 focus:ring-jordy_blue-500/20 transition-all duration-300 text-deep_indigo-500 placeholder-deep_indigo-500/70 font-description font-medium shadow-xl backdrop-blur-2xl pr-12"
                  />
                  <SearchIcon className="absolute right-9 -z-20 top-1/2 transform -translate-y-1/2 text-pink_lavender-500/70 pointer-events-none opacity-45" />
                  {searchInput && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-12 top-1/2 transform -translate-y-1/2 text-deep_indigo-500/70 hover:text-deep_indigo-500 transition-colors duration-200 p-1"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-subheading font-semibold text-deep_indigo-500 mb-3">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-white/70 border-2 border-white/60 rounded-2xl focus:outline-none focus:border-jordy_blue-500 focus:ring-3 focus:ring-jordy_blue-500/20 transition-all duration-300 text-deep_indigo-500 font-description font-medium shadow-lg backdrop-blur-2xl appearance-none cursor-pointer"
                  >
                    <option value="All">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>


                {/* Sort Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-subheading font-semibold text-lemon_chiffon-500 mb-3">
                    Sort Articles
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 bg-white/70 border-2 border-white/60 rounded-2xl focus:outline-none focus:border-pink_lavender-500 focus:ring-3 focus:ring-pink_lavender-500/20 transition-all duration-300 text-deep_indigo-500 font-description font-medium shadow-lg backdrop-blur-2xl appearance-none cursor-pointer"
                  >
                    <option value="newest">Latest First</option>
                    <option value="oldest">Oldest First</option>
                   
                   
                    <option value="readTime">Quick Reads</option>
                    <option value="alphabetical">A-Z</option>
                    <option value="featured">Featured</option>
                  </select>
                </div>

                {/* Quick Actions */}
                <div className="mb-6">
                  <label className="block text-sm font-subheading font-semibold text-lemon_chiffon-500 mb-3">
                    Quick Actions
                  </label>
                  <div className="space-y-3">
                    <button
                      onClick={() => {setSortBy("featured"); setSelectedCategory("All");}}
                      className="w-full px-4 py-3 bg-gradient-to-r from-lemon_chiffon-500/30 to-champagne_pink-500/30 text-deep_indigo-500 rounded-2xl text-sm font-cta hover:from-lemon_chiffon-500/50 hover:to-champagne_pink-500/50 transition-all duration-300 flex items-center gap-3 backdrop-blur-xl border border-white/40"
                    >
                      <StarIcon className="w-4 h-4" filled />
                      Featured Articles
                    </button>
                    <button
                      onClick={() => {setSortBy("newest"); setCurrentPage(1);}}
                      className="w-full px-4 py-3 bg-gradient-to-r from-aquamarine-500/30 to-electric_blue-500/30 text-deep_indigo-500 rounded-2xl text-sm font-cta hover:from-aquamarine-500/50 hover:to-electric_blue-500/50 transition-all duration-300 flex items-center gap-3 backdrop-blur-xl border border-white/40"
                    >
                      <SparkleIcon className="w-4 h-4" />
                      Latest Research
                    </button>
                  </div>
                </div>

                {/* Results Counter */}
                <div className="flex items-center gap-3 mb-4">
                  {isLoading ? (
                    <div className="animate-spin w-5 h-5 border-2 border-jordy_blue-500 border-t-transparent rounded-full" />
                  ) : (
                    <div className="w-2.5 h-2.5 bg-aquamarine-500 rounded-full animate-pulse" />
                  )}
                  <p className="font-description text-champagne_pink-500 font-medium">
                    <span className="font-bold text-champagne_pink-700">{filteredAndSortedArticles.length}</span> 
                    {filteredAndSortedArticles.length === 1 ? ' article' : ' articles'}
                  </p>
                </div>

                {/* Clear Filters */}
                {(searchTerm || selectedCategory !== "All"  || sortBy !== "newest") && (
                  <button
                    onClick={clearFilters}
                    className="w-full px-4 py-3 text-jordy_blue-500 hover:text-jordy_blue-700 font-cta transition-all duration-300 hover:bg-white/50 rounded-2xl flex items-center justify-center gap-2 border-2 border-transparent hover:border-jordy_blue-500/30 backdrop-blur-xl"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>

            {/* Right Panel - Articles List */}
            <div className="lg:col-span-2">
              <div className="bg-transparent backdrop-blur-3xl rounded-3xl shadow-3xl border border-white/40  flex flex-col" >
                {filteredAndSortedArticles.length > 0 ? (
                  <>
                    {/* Articles List */}
                    <div className="flex-1 overflow-y-auto p-6">
                      <div className="space-y-6">
                        {currentPageArticles.map((article, index) => (
                          <article
                            key={article.id}
                            className="group bg-white/10 backdrop-blur-2xl rounded-2xl overflow-hidden shadow-xl border border-white/50 hover:border-white/70 transition-all duration-500 hover:shadow-2xl flex"

                          >
                            {/* Article Image */}
                            <div className="w-40  flex-shrink-0 relative overflow-hidden">
                              <LazyLoadImage
                                src={article.img}
                                alt={article.title}
                                effect="blur"
                                className="w-full h-full object-cover transition-transform "
                                wrapperClassName="w-full h-full"
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-deep_indigo-500/20" />
                              
                              {/* Badges */}
                              <div className="absolute top-2 left-2 flex flex-col gap-1">
                                {isNew(article.publishDate) && (
                                  <span className="px-2 py-1 bg-gradient-to-r from-aquamarine-500 to-electric_blue-500 text-white rounded-full text-xs font-bold">
                                    NEW
                                  </span>
                                )}
                                {article.featured && (
                                  <span className="px-2 py-1 bg-gradient-to-r from-lemon_chiffon-500 to-champagne_pink-500 text-deep_indigo-700 rounded-full text-xs font-bold flex items-center gap-1">
                                    <StarIcon className="w-3 h-3" filled />
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Article Content */}
                            <div className="flex-1 p-5 flex flex-col">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">

                                  <span className="px-3 py-1 bg-gradient-to-r from-jordy_blue-500/20 to-mauve-500/20 text-jordy_blue-500 rounded-full text-xs font-cta border border-jordy_blue-500/30">
                                    {article.category}
                                  </span>
                                </div>

                              </div>

                              <h3 className="font-heading text-3xl text-lemon_chiffon-700 mb-3 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-jordy_blue-500 group-hover:to-mauve-500 group-hover:bg-clip-text transition-all duration-300 line-clamp-2">
                                {article.title}
                              </h3>

                              <p className="font-description text-lemon_chiffon-500 mb-4 leading-relaxed text-sm line-clamp-2 flex-grow">
                                {article.description}
                              </p>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-champagne_pink-500 text-xs font-description">
                                  <div className="flex items-center gap-1">
                                    <CalendarIcon className="w-3 h-3" />
                                    <span>{formatDate(article.publishDate)}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <ClockIcon className="w-3 h-3" />
                                    <span>{article.readTime}</span>
                                  </div>
                                  
                                </div>

                                <a
                                  href={article.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group/button inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-jordy_blue-500 to-mauve-500 text-white rounded-xl font-cta text-sm transition-all duration-300 hover:shadow-lg hover:shadow-jordy_blue-500/30 transform hover:scale-105 relative overflow-hidden border border-white/30"
                                >
                                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" />
                                  <span className="relative z-10">Read</span>
                                  <ExternalLinkIcon className="w-4 h-4 relative z-10" />
                                </a>
                              </div>
                            </div>

                            {hoveredArticle === article.id && (
                              <div className="absolute inset-0 bg-gradient-to-r from-jordy_blue-500/5 to-mauve-500/5 rounded-2xl pointer-events-none" />
                            )}
                          </article>
                        ))}
                      </div>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="p-6 border-t border-white/30">
                        <div className="flex items-center justify-center">
                          <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-4 shadow-lg border border-white/50 flex items-center gap-3">
                            {/* Previous Button */}
                            <button
                              onClick={goToPreviousPage}
                              disabled={currentPage === 1}
                              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-cta transition-all duration-300 ${
                                currentPage === 1
                                  ? 'bg-white/20 text-deep_indigo-500/50 cursor-not-allowed'
                                  : 'bg-gradient-to-r from-deep_indigo-500 to-dark_teal-500 text-white hover:shadow-lg transform hover:scale-105'
                              }`}
                            >
                              <ChevronLeftIcon className="w-4 h-4" />
                              <span>Prev</span>
                            </button>

                            {/* Page Numbers */}
                            <div className="flex items-center gap-2">
                              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                  pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                  pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                  pageNum = totalPages - 4 + i;
                                } else {
                                  pageNum = currentPage - 2 + i;
                                }
                                
                                const isCurrentPage = pageNum === currentPage;
                                
                                return (
                                  <button
                                    key={pageNum}
                                    onClick={() => goToPage(pageNum)}
                                    className={`w-10 h-10 rounded-xl font-bold transition-all duration-300 ${
                                      isCurrentPage
                                        ? 'bg-gradient-to-r from-jordy_blue-500 to-mauve-500 text-white shadow-lg transform scale-110'
                                        : 'bg-white/60 text-deep_indigo-500 hover:bg-gradient-to-r hover:from-jordy_blue-500/20 hover:to-mauve-500/20 hover:text-jordy_blue-500 transform hover:scale-105'
                                    }`}
                                  >
                                    {pageNum}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Next Button */}
                            <button
                              onClick={goToNextPage}
                              disabled={currentPage === totalPages}
                              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-cta transition-all duration-300 ${
                                currentPage === totalPages
                                  ? 'bg-white/20 text-deep_indigo-500/50 cursor-not-allowed'
                                  : 'bg-gradient-to-r from-deep_indigo-500 to-dark_teal-500 text-white hover:shadow-lg transform hover:scale-105'
                              }`}
                            >
                              <span>Next</span>
                              <ChevronRightIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="text-center mt-4">
                          <span className="text-sm text-champagne_pink-500 font-description">
                            Page {currentPage} of {totalPages} • {filteredAndSortedArticles.length} articles
                          </span>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  /* No Results */
                  <div className="flex-1 flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto bg-gradient-to-br from-jordy_blue-500/20 to-mauve-500/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-xl border border-white/40">
                        <SearchIcon className="w-12 h-12 text-jordy_blue-500" />
                      </div>
                      <h3 className="font-heading text-2xl bg-gradient-to-r from-deep_indigo-700 to-deep_indigo-500 bg-clip-text text-transparent mb-4">
                        No Articles Found
                      </h3>
                      <p className="font-description text-deep_indigo-500 mb-6 leading-relaxed">
                        Try adjusting your search criteria or explore different categories.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                          onClick={clearFilters}
                          className="px-6 py-3 bg-gradient-to-r from-jordy_blue-500 to-mauve-500 text-white rounded-2xl font-cta transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                        >
                          Reset Filters
                        </button>
                        <button
                          onClick={() => {setSearchInput("quantum"); setSearchTerm("quantum");}}
                          className="px-6 py-3 bg-white/60 border border-white/60 text-deep_indigo-500 rounded-2xl font-cta transition-all duration-300 hover:bg-white/80"
                        >
                          Try "Quantum"
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default PremiumResearchShowcase;