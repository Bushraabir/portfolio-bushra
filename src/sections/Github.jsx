"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rank from "../assets/EmpowerEd/rank.png";
import { SiC, SiCplusplus, SiPython } from "react-icons/si";
import { FaTrophy, FaArrowUp } from "react-icons/fa";
import { loadFull } from "tsparticles";
import { Particles } from "react-tsparticles";
import CountUp from "react-countup";

export default function GithubSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const counterSectionRef = useRef(null);

  const codingItems = [
    { lang: "Python", icon: SiPython, value: 24, link: "https://github.com/Bushraabir/uri_beecrowd_python" },
    { lang: "C++", icon: SiCplusplus, value: 229, link: "https://github.com/Bushraabir/uri_beecrowd_cpp" },
    { lang: "C", icon: SiC, value: 114, link: "https://github.com/Bushraabir/uri_beecrowd_c" },
    { lang: "Ranking", icon: FaTrophy, value: 2088, link: "https://judge.beecrowd.com/en/profile/1071447", isRanking: true },
  ];

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

  return (
    <article id="github" className=" w-full bg-transparent relative overflow-hidden">
      <section
        ref={counterSectionRef}
        className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-transparent py-16 sm:py-24"
      >
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-lemon_chiffon-700 text-center">
            Coding Problems Solved on URI
          </h2>
        </motion.div>
        
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.img
            src={rank}
            alt="URI Rank"
            className="w-[100vw] h-auto sm:w-[70vw] max-w-[700px] mt-4 sm:mt-0 sm:ml-4 
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
          <h3 className="text-3xl md:text-4xl font-heading font-extrabold text-champagne_pink mb-6">
            Data Structure and Algorithm Practice
          </h3>
          <p className="text-lg md:text-xl font-description text-non_photo_blue mb-6">
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