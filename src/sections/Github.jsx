"use client";
import { useEffect, useRef, useState, useCallback, memo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rank from "../assets/EmpowerEd/rank.png";
import { SiC, SiCplusplus, SiPython } from "react-icons/si";
import { FaTrophy, FaArrowUp, FaGithub, FaCode, FaChartLine } from "react-icons/fa";
import CountUp from "react-countup";

/**
 * Learning & Problem Solving Journey Component
 * 
 * A comprehensive showcase of coding achievements, problem-solving journey,
 * and algorithmic learning progress. Features dynamic statistics, interactive
 * elements, and syntax highlighting for code demonstrations.
 * 
 * Features:
 * - Interactive statistics counters with smooth animations
 * - Responsive design optimized for all devices
 * - Accessibility-first approach with ARIA labels and keyboard navigation
 * - SEO-optimized with semantic HTML and meta information
 * - Performance optimized with React.memo and useCallback
 * - Syntax highlighting for code examples
 * - Smooth scroll animations and micro-interactions
 * 
 * Technical Implementation:
 * - React hooks for state management and effects
 * - Framer Motion for premium animations and transitions
 * - Intersection Observer for scroll-triggered animations
 * - React CountUp for animated statistics
 * - React Icons for consistent iconography
 * - Syntax highlighting with Prism
 * 
 * @component
 * @example
 * <GithubSection />
 */

// Animated Counter Component
const AnimatedCounter = memo(({ value, duration = 2.5, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  
  return (
    <div ref={ref}>
      {isInView && (
        <CountUp
          start={0}
          end={value}
          duration={duration}
          className={className}
        />
      )}
    </div>
  );
});

AnimatedCounter.displayName = 'AnimatedCounter';

// Scroll to Top Button Component
const ScrollToTopButton = memo(({ showTopBtn }) => (
  <AnimatePresence>
    {showTopBtn && (
      <motion.button
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-gradient-to-r from-electric_blue to-aquamarine text-deep_indigo p-3 sm:p-4 rounded-full shadow-2xl z-50 border border-white/20 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          scale: 1,
          transition: { 
            type: "spring", 
            stiffness: 200 
          } 
        }}
        exit={{ 
          opacity: 0, 
          y: 20, 
          scale: 0.8,
          transition: { duration: 0.3 }
        }}
        whileHover={{ 
          scale: 1.1, 
          boxShadow: "0 8px 25px rgba(142, 236, 245, 0.4)",
          rotate: -5
        }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top of page"
        title="Back to top"
      >
        <FaArrowUp size={20} className="sm:text-2xl" />
      </motion.button>
    )}
  </AnimatePresence>
));

ScrollToTopButton.displayName = 'ScrollToTopButton';

// Coding Achievement Card Component
const CodingCard = memo(({ item, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-15%" });

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.8, 
          delay: index * 0.15,
          type: "spring",
          stiffness: 100
        } 
      } : {}}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      whileHover={{ 
        y: -8,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
    >
      <div className="relative flex flex-col items-center p-6 sm:p-8 bg-gradient-to-br from-lemon_chiffon/30 via-lemon_chiffon/20 to-transparent backdrop-blur-md rounded-2xl shadow-xl border border-champagne_pink-600/50 hover:border-champagne_pink-400/70 transition-all duration-500 overflow-hidden">
        
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-jordy_blue/5 via-electric_blue/5 to-aquamarine/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
        
        {/* Icon and Counter Container */}
        <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
          <motion.div
            className="relative"
            initial={{ scale: 1 }}
            animate={isInView ? { 
              scale: [1, 1.15, 1], 
              transition: { 
                duration: 0.6, 
                repeat: 1, 
                repeatType: "reverse",
                delay: index * 0.15 + 0.5
              } 
            } : {}}
            whileHover={{ 
              scale: 1.1,
              rotate: 5,
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            {/* Icon Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-jordy_blue/20 to-electric_blue/20 rounded-full blur-md scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <item.icon className="relative text-4xl sm:text-5xl lg:text-6xl text-jordy_blue group-hover:text-electric_blue transition-colors duration-300" />
          </motion.div>
          
          {/* Counter Display */}
          <div className="text-center">
            <div className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${item.isRanking ? "text-jordy_blue" : "text-electric_blue"} group-hover:scale-110 transition-transform duration-300`}>
              <AnimatedCounter 
                value={item.value} 
                duration={2.5}
                className="font-heading"
              />
            </div>
            {item.isRanking && (
              <motion.div 
                className="text-sm text-champagne_pink font-medium mt-1"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.15 + 1 }}
              >
                Global Ranking
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Link/Description */}
        <motion.a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 text-center text-sm sm:text-base lg:text-lg text-dark_teal font-cta font-medium hover:text-lemon_chiffon transition-all duration-300 px-4 py-2 rounded-xl hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={item.isRanking ? `View ${item.lang} profile` : `View ${item.value} solved problems in ${item.lang}`}
        >
          {item.isRanking ? "View Profile" : `Solved ${item.value} in ${item.lang}`}
          <motion.span
            className="inline-block ml-2"
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            →
          </motion.span>
        </motion.a>
        
        {/* Decorative Elements */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-br from-jordy_blue to-electric_blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-2 left-2 w-1 h-1 bg-gradient-to-br from-aquamarine to-champagne_pink rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
    </motion.div>
  );
});

CodingCard.displayName = 'CodingCard';

// Main Component
export default function GithubSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const counterSectionRef = useRef(null);
  const heroRef = useRef(null);
  const codeRef = useRef(null);

  // Coding achievements data
  const codingItems = [
    { 
      lang: "Python", 
      icon: SiPython, 
      value: 24, 
      link: "https://github.com/Bushraabir/uri_beecrowd_python" 
    },
    { 
      lang: "C++", 
      icon: SiCplusplus, 
      value: 229, 
      link: "https://github.com/Bushraabir/uri_beecrowd_cpp" 
    },
    { 
      lang: "C", 
      icon: SiC, 
      value: 114, 
      link: "https://github.com/Bushraabir/uri_beecrowd_c" 
    },
    { 
      lang: "Ranking", 
      icon: FaTrophy, 
      value: 2088, 
      link: "https://judge.beecrowd.com/en/profile/1071447", 
      isRanking: true 
    },
  ];

  // Code example for algorithm demonstration
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

    cout << "Original array:\\n";
    for (int val : arr) {
        cout << val << " ";
    }
    cout << "\\n\\n";

    recursiveInsertionSort(arr, arr.size() - 1);

    cout << "Sorted array using Recursive Insertion Sort:\\n";
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
*/`;

  // Responsive and scroll handling
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

  return (
    <article 
      id="github" 
      className="w-full bg-transparent relative overflow-hidden"
      role="main"
      aria-labelledby="github-title"
    >
      {/* SEO and Accessibility Meta Information */}
      <div className="sr-only">
        <h1 id="github-title">Coding Journey and Problem Solving Achievements</h1>
        <p>Explore my programming journey featuring 300+ solved problems across Python, C++, and C. Discover algorithmic learning, data structures practice, and collaborative development on GitHub.</p>
      </div>

      {/* Main Content Section */}
      <section
        ref={counterSectionRef}
        className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-transparent py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
        aria-label="Coding achievements and statistics"
      >
        {/* Hero Section */}
        <div ref={heroRef} className="text-center max-w-6xl mx-auto mb-16 sm:mb-20">
          
          {/* Main Title */}
          <motion.div
            className="mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 15,
              duration: 1
            }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold text-lemon_chiffon-700 leading-tight mb-4">
              Learning, Solving, Growing
            </h2>
            
            {/* Decorative Line */}
            <motion.div
              className="w-16 sm:w-24 lg:w-32 h-1 bg-gradient-to-r from-jordy_blue via-electric_blue to-aquamarine rounded-full mx-auto mt-6"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* Description Paragraph */}
          <motion.div
            className="mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 15,
              delay: 0.3
            }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          >
            <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-description text-mauve leading-relaxed max-w-5xl mx-auto px-4">
              I've always been fascinated by solving problems, whether on URI, LeetCode, or through projects on GitHub. 
              Each challenge pushes me to <span className="text-jordy_blue font-semibold">think differently</span>, 
              <span className="text-electric_blue font-semibold"> experiment</span>, and 
              <span className="text-aquamarine font-semibold"> learn deeply</span>. 
              This journey isn't just about coding—it's about <span className="text-champagne_pink font-semibold">curiosity</span>, 
              <span className="text-lemon_chiffon font-semibold"> creativity</span>, and building solutions that excite me and inspire others.
            </p>
          </motion.div>

          {/* Achievement Badge Image */}
          <motion.div
            className="mb-12 sm:mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 15, 
              delay: 0.2 
            }}
            viewport={{ once: true }}
          >
            <div className="relative inline-block">
              <motion.img
                src={rank}
                alt="URI Judge ranking achievement showing problem solving progress and global position"
                className="w-full max-w-[90vw] sm:max-w-[70vw] lg:max-w-[600px] h-auto mx-auto rounded-2xl shadow-2xl border-4 border-gradient-to-r from-jordy_blue via-electric_blue to-aquamarine"
                initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
                whileInView={{ 
                  scale: 1, 
                  rotate: 0, 
                  opacity: 1,
                  transition: { 
                    duration: 1, 
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 100
                  } 
                }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: 1,
                  transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.95 }}
                viewport={{ once: true }}
                loading="lazy"
              />
              
              {/* Image Overlay Badge */}
              <motion.div
                className="absolute -top-4 -right-4 bg-gradient-to-r from-electric_blue to-aquamarine text-deep_indigo px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { delay: 1, type: "spring", stiffness: 200 }
                }}
                viewport={{ once: true }}
              >
                Rank #2088
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 w-full max-w-7xl px-4 sm:px-6 mb-20">
          {codingItems.map((item, index) => (
            <CodingCard key={item.lang} item={item} index={index} />
          ))}
        </div>
        
        {/* Algorithm Learning Section */}
        <motion.div
          ref={codeRef}
          className="w-full max-w-6xl mx-auto px-4 sm:px-6"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 1,
              delay: 0.2,
              type: "spring",
              stiffness: 80
            } 
          }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <div className="relative p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-lemon_chiffon/20 via-lemon_chiffon/10 to-transparent backdrop-blur-xl rounded-3xl shadow-2xl border border-champagne_pink-500/50 hover:border-champagne_pink-400/70 transition-all duration-500">
            
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-champagne_pink mb-4 sm:mb-6">
                Data Structure & Algorithm Practice
              </h3>
              
              <div className="flex justify-center gap-4 mb-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-jordy_blue/20 rounded-full">
                  <FaCode className="text-jordy_blue" />
                  <span className="text-sm font-medium text-jordy_blue">Algorithms</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-electric_blue/20 rounded-full">
                  <FaChartLine className="text-electric_blue" />
                  <span className="text-sm font-medium text-electric_blue">Problem Solving</span>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <motion.p 
              className="text-base sm:text-lg md:text-xl font-description text-non_photo_blue mb-8 sm:mb-10 leading-relaxed text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              Currently, I am learning Data Structures and Algorithms from various online resources and practicing in C++. 
              Together with <span className="text-aquamarine font-semibold">Muzahidul Islam Abir</span>, we are creating a repository 
              where we practice different algorithms and problems, which further enhances our understanding. 
              Here is a demo of our collaborative learning:
            </motion.p>
            
            {/* Code Block Container */}
            <motion.div 
              className="relative mb-8 sm:mb-10"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Code Header */}
              <div className="flex items-center justify-between bg-gray-800 px-4 py-3 rounded-t-xl border-b border-gray-600">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-300 text-sm font-mono">recursive_insertion_sort.cpp</span>
                </div>
                <div className="text-gray-400 text-xs">C++</div>
              </div>
              
              {/* Syntax Highlighted Code */}
              <div className="relative overflow-hidden rounded-b-xl">
                <SyntaxHighlighter
                  language="cpp"
                  style={dark}
                  showLineNumbers={true}
                  lineNumberStyle={{ color: '#6B7280', fontSize: '12px' }}
                  codeTagProps={{ 
                    style: { 
                      whiteSpace: "pre-wrap",
                      fontFamily: 'JetBrains Mono, Monaco, Consolas, monospace'
                    } 
                  }}
                  className="!bg-gray-900 !m-0 text-sm sm:text-base max-h-[400px] sm:max-h-[500px] overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
                  customStyle={{
                    padding: '1.5rem',
                    margin: 0,
                    borderRadius: '0 0 0.75rem 0.75rem'
                  }}
                >
                  {codeString}
                </SyntaxHighlighter>
              </div>
            </motion.div>
            
            {/* Repository Link Button */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="https://github.com/Bushraabir/DSA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-electric_blue via-aquamarine to-jordy_blue text-deep_indigo font-cta font-bold text-base sm:text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 30px rgba(142, 236, 245, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                aria-label="Explore Data Structures and Algorithms repository on GitHub"
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  animate={{ 
                    x: ["-100%", "300%"],
                    transition: { 
                      repeat: Infinity, 
                      duration: 2, 
                      ease: "linear" 
                    } 
                  }}
                />
                <FaGithub className="text-xl" />
                <span>Explore Repository</span>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>
            
            {/* Decorative Background Elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-jordy_blue/10 to-electric_blue/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-aquamarine/10 to-champagne_pink/10 rounded-full blur-xl"></div>
          </div>
        </motion.div>
      </section>


    </article>
  );
}