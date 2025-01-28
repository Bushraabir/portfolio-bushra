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
    { title: "The Architecture of Future", year: 2023, img: Bushra, tags: ["Architecture", "Future"], description: "Explore the future of architecture with cutting-edge designs and innovations." },
    { title: "Code & Creativity", year: 2024, img: Bushra, tags: ["Programming", "Creativity"], description: "A deep dive into the world of creative coding and its impact on technology." },
    { title: "Design Thinking in Practice", year: 2022, img: Bushra, tags: ["Design", "Innovation"], description: "A practical guide on implementing design thinking to solve real-world problems." },
    // Add more books here...
  ];

  const articles = [
    { 
      title: "AI in Design", 
      platform: "Medium", 
      link: "https://medium.com/ai-design", 
      tags: ["AI", "Design"], 
      img: Bushra, 
      description: "How artificial intelligence is revolutionizing the design industry."
    },
    { 
      title: "Blender for Architects", 
      platform: "Medium", 
      link: "https://medium.com/blender-arch", 
      tags: ["3D Modeling", "Architecture"], 
      img: Bushra, 
      description: "A guide for architects on using Blender for 3D modeling and visualization."
    },
    { 
      title: "Creative Coding", 
      platform: "Dev.to", 
      link: "https://dev.to/creative-coding", 
      tags: ["Programming", "Creativity"], 
      img: Bushra, 
      description: "Unlock the creative potential of coding to create interactive art and projects."
    },
    // Add more articles here...
  ];

  const handleSearch = debounce((value) => {
    setDebouncedSearch(value);
    setCurrentPage(1); // Reset page when search query changes
  }, 500);

  const filteredData = (filter === "books" ? books : articles).filter((item) =>
    item.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const changePage = (direction) => {
    setCurrentPage((prevPage) => prevPage + direction);
  };

  return (
    <div className="px-6 py-16 mx-auto max-w-7xl">
      {/* Hero Section */}
      <div className="flex flex-col items-center mb-12 text-center lg:mb-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-800 lg:text-6xl">
          My Research & Publications
        </h1>
        <p className="mt-4 text-lg text-gray-600 lg:text-xl">
          Explore my books and articles on technology, design, and more.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col items-center mt-12 space-y-4 lg:space-y-0 lg:space-x-8 lg:flex-row">
        <div className="flex items-center px-4 py-2 space-x-4 bg-white shadow-lg rounded-xl">
          <button
            className={`px-6 py-3 font-medium text-lg rounded-lg transition-all duration-300 ${
              filter === "books"
                ? "bg-blue-600 text-white shadow-md transform scale-105"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => setFilter("books")}
          >
            Books
          </button>
          <button
            className={`px-6 py-3 font-medium text-lg rounded-lg transition-all duration-300 ${
              filter === "articles"
                ? "bg-blue-600 text-white shadow-md transform scale-105"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => setFilter("articles")}
          >
            Articles
          </button>
        </div>

        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-3 text-lg bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearch(e.target.value);
          }}
        />
      </div>

      {/* Content Display */}
      <div className="flex flex-wrap justify-center gap-10 mt-16">
        <AnimatePresence>
          {paginatedData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col max-w-xs overflow-hidden transition-all duration-500 bg-white shadow-lg rounded-xl group hover:shadow-2xl hover:scale-105"
            >
              {filter === "books" ? (
                <>
                  <div className="relative h-56 overflow-hidden rounded-t-xl">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col p-6">
                    <h3 className="text-2xl font-semibold text-gray-800 transition-colors group-hover:text-blue-600">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-gray-500">Published: {item.year}</p>
                    <p className="mt-4 text-gray-600">{item.description}</p>
                    <div className="mt-2 space-x-2">
                      {item.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="inline-block px-3 py-1 text-sm text-blue-600 transition-colors duration-300 bg-blue-100 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="object-cover w-16 h-16 rounded-full"
                    />
                    <h3 className="ml-4 text-2xl font-semibold text-gray-800 transition-colors group-hover:text-blue-600">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-gray-500">Platform: {item.platform}</p>
                  <p className="mt-4 text-gray-600">{item.description}</p>
                  <div className="mt-2 space-x-2">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-block px-3 py-1 text-sm text-blue-600 transition-colors duration-300 bg-blue-100 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-blue-600 transition-all hover:underline group-hover:text-blue-800"
                  >
                    Read Article →
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => changePage(-1)}
          disabled={currentPage === 1}
          className="px-6 py-2 text-gray-700 transition-all duration-300 bg-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-400"
        >
          Previous
        </button>
        <span className="px-6 py-2 text-lg text-gray-800">
          {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
        </span>
        <button
          onClick={() => changePage(1)}
          disabled={currentPage * itemsPerPage >= filteredData.length}
          className="px-6 py-2 text-gray-700 transition-all duration-300 bg-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Research;
