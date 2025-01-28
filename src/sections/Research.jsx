import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Bushra from "../assets/Bushra.png";
import { debounce } from "lodash";

const Research = () => {
  const [filter, setFilter] = useState("books");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const books = [
    {
      title: "The Architecture of Future",
      year: 2023,
      img: Bushra,
      tags: ["Architecture", "Future"],
      description: "Explore the future of architecture with cutting-edge designs and innovations.",
    },
    {
      title: "Code & Creativity",
      year: 2024,
      img: Bushra,
      tags: ["Programming", "Creativity"],
      description: "A deep dive into the world of creative coding and its impact on technology.",
    },
    {
      title: "Design Thinking in Practice",
      year: 2022,
      img: Bushra,
      tags: ["Design", "Innovation"],
      description: "A practical guide on implementing design thinking to solve real-world problems.",
    },
  ];

  const articles = [
    {
      title: "AI in Design",
      platform: "Medium",
      link: "https://medium.com/ai-design",
      tags: ["AI", "Design"],
      img: Bushra,
      description: "How artificial intelligence is revolutionizing the design industry.",
    },
    {
      title: "Blender for Architects",
      platform: "Medium",
      link: "https://medium.com/blender-arch",
      tags: ["3D Modeling", "Architecture"],
      img: Bushra,
      description: "A guide for architects on using Blender for 3D modeling and visualization.",
    },
    {
      title: "Creative Coding",
      platform: "Dev.to",
      link: "https://dev.to/creative-coding",
      tags: ["Programming", "Creativity"],
      img: Bushra,
      description: "Unlock the creative potential of coding to create interactive art and projects.",
    },
  ];

  const handleSearch = debounce((value) => {
    setDebouncedSearch(value);
    setCurrentPage(1);
  }, 500);

  const filteredData = (filter === "books" ? books : articles).filter((item) =>
    item.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (direction) => {
    setCurrentPage((prevPage) => prevPage + direction);
  };

  return (
    <div className="px-8 py-16 mx-auto max-w-7xl bg-dark text-light">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 font-serif text-5xl text-gradient gradient">
          My Research & Publications
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-neutral">
          Discover my books and articles on technology, design, and innovation.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col items-center justify-center gap-6 mb-12 lg:flex-row">
        <div className="flex items-center p-2 shadow-xl bg-primaryDark rounded-2xl">
          <button
            className={`px-6 py-3 font-medium rounded-lg transition-all duration-300 text-lg ${
              filter === "books"
                ? "bg-accent1 text-white shadow-lg"
                : "bg-primaryLight text-neutral hover:bg-accent1Light"
            }`}
            onClick={() => setFilter("books")}
          >
            Books
          </button>
          <button
            className={`px-6 py-3 font-medium rounded-lg transition-all duration-300 text-lg ${
              filter === "articles"
                ? "bg-accent1 text-white shadow-lg"
                : "bg-primaryLight text-neutral hover:bg-accent1Light"
            }`}
            onClick={() => setFilter("articles")}
          >
            Articles
          </button>
        </div>

        <input
          type="text"
          placeholder="Search..."
          className="w-full max-w-lg px-4 py-3 border shadow bg-primaryDark border-neutral rounded-xl focus:outline-none focus:ring-2 focus:ring-accent1 text-light"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearch(e.target.value);
          }}
        />
      </div>

      {/* Content Display */}
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {paginatedData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden transition-transform shadow-xl bg-primaryDark rounded-3xl group hover:shadow-2xl hover:scale-105"
            >
              {filter === "books" ? (
                <>
                  <div className="relative h-56">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 font-serif text-xl text-accent1">
                      {item.title}
                    </h3>
                    <p className="mb-4 text-sm text-neutral">
                      Published: {item.year}
                    </p>
                    <p className="mb-4 text-neutral">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-sm rounded-full text-accent1 bg-accent1Light"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-16 h-16 rounded-full"
                    />
                    <h3 className="ml-4 font-serif text-xl text-accent1">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mb-4 text-sm text-neutral">
                    Platform: {item.platform}
                  </p>
                  <p className="mb-4 text-neutral">{item.description}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent1 hover:underline"
                  >
                    Read Article →
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>


    </div>
  );
};

export default Research;
