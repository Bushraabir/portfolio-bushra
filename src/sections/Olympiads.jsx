import React, { useEffect, useRef, useState } from "react";
import { FaBrain, FaTrophy, FaCode } from "react-icons/fa";

const Olympiad = () => {
  const scrollContainerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false); // Track hover state
  const [scrollingEnabled, setScrollingEnabled] = useState(true); // Track if scrolling is enabled

  useEffect(() => {
    // Advanced Scroll with smooth inertia effect
    let scrollSpeed = 40;
    let scrollInterval;
    const scrollContainer = scrollContainerRef.current;

    const smoothScroll = () => {
      if (scrollContainer && scrollingEnabled) {
        let scrollPosition = scrollContainer.scrollLeft;
        let maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        
        // Add inertia for more dynamic and natural scroll
        scrollPosition += scrollSpeed;
        if (scrollPosition >= maxScroll || scrollPosition <= 0) {
          scrollSpeed = -scrollSpeed; // Reverse scroll direction for inertia effect
        }

        scrollContainer.scrollLeft = scrollPosition;
      }
    };

    if (scrollingEnabled) {
      // Loop the scroll continuously with advanced smoothness
      scrollInterval = setInterval(smoothScroll, 10);
    }

    return () => clearInterval(scrollInterval); // Cleanup interval
  }, [scrollingEnabled]);

  
  const competitions = [
    {
      title: "Regional Physics Olympiad",
      description:
        "Achieved 1st place in the Regional Physics Olympiad in 2017, showcasing expertise in problem-solving and critical thinking.",
      year: 2017,
      icon: <FaBrain className="text-4xl text-teal-600" />,
    },
    {
      title: "Inter-House Debate Competition",
      description:
        "Awarded Best Speaker in the Inter-House Debate Competition for persuasive speaking and structured arguments.",
      year: 2018,
      icon: <FaTrophy className="text-4xl text-orange-500" />,
    },
    {
      title: "Mathematics Olympiad",
      description:
        "Secured top rankings in the National Mathematics Olympiad, demonstrating analytical and mathematical skills.",
      year: 2019,
      icon: <FaBrain className="text-4xl text-teal-600" />,
    },
    {
      title: "Coding Hackathon",
      description:
        "Participated in a 48-hour coding hackathon, developing innovative solutions to real-world problems.",
      year: 2021,
      icon: <FaCode className="text-4xl text-purple-600" />,
    },
    {
      title: "National Science Fair",
      description:
        "Presented a science project that earned recognition for creativity and technical innovation.",
      year: 2020,
      icon: <FaTrophy className="text-4xl text-orange-500" />,
    },
    {
      title: "Regional Physics Olympiad",
      description:
        "Achieved 1st place in the Regional Physics Olympiad in 2017, showcasing expertise in problem-solving and critical thinking.",
      year: 2017,
      icon: <FaBrain className="text-4xl text-teal-600" />,
    },
    {
      title: "Inter-House Debate Competition",
      description:
        "Awarded Best Speaker in the Inter-House Debate Competition for persuasive speaking and structured arguments.",
      year: 2018,
      icon: <FaTrophy className="text-4xl text-orange-500" />,
    },
    {
      title: "Mathematics Olympiad",
      description:
        "Secured top rankings in the National Mathematics Olympiad, demonstrating analytical and mathematical skills.",
      year: 2019,
      icon: <FaBrain className="text-4xl text-teal-600" />,
    },
    {
      title: "Coding Hackathon",
      description:
        "Participated in a 48-hour coding hackathon, developing innovative solutions to real-world problems.",
      year: 2021,
      icon: <FaCode className="text-4xl text-purple-600" />,
    },
    {
      title: "National Science Fair",
      description:
        "Presented a science project that earned recognition for creativity and technical innovation.",
      year: 2020,
      icon: <FaTrophy className="text-4xl text-orange-500" />,
    },
    {
      title: "Regional Physics Olympiad",
      description:
        "Achieved 1st place in the Regional Physics Olympiad in 2017, showcasing expertise in problem-solving and critical thinking.",
      year: 2017,
      icon: <FaBrain className="text-4xl text-teal-600" />,
    },
    {
      title: "Inter-House Debate Competition",
      description:
        "Awarded Best Speaker in the Inter-House Debate Competition for persuasive speaking and structured arguments.",
      year: 2018,
      icon: <FaTrophy className="text-4xl text-orange-500" />,
    },
    {
      title: "Mathematics Olympiad",
      description:
        "Secured top rankings in the National Mathematics Olympiad, demonstrating analytical and mathematical skills.",
      year: 2019,
      icon: <FaBrain className="text-4xl text-teal-600" />,
    },
    {
      title: "Coding Hackathon",
      description:
        "Participated in a 48-hour coding hackathon, developing innovative solutions to real-world problems.",
      year: 2021,
      icon: <FaCode className="text-4xl text-purple-600" />,
    },
    {
      title: "National Science Fair",
      description:
        "Presented a science project that earned recognition for creativity and technical innovation.",
      year: 2020,
      icon: <FaTrophy className="text-4xl text-orange-500" />,
    },
    {
      title: "Regional Physics Olympiad",
      description:
        "Achieved 1st place in the Regional Physics Olympiad in 2017, showcasing expertise in problem-solving and critical thinking.",
      year: 2017,
      icon: <FaBrain className="text-4xl text-teal-600" />,
    },
    {
      title: "Inter-House Debate Competition",
      description:
        "Awarded Best Speaker in the Inter-House Debate Competition for persuasive speaking and structured arguments.",
      year: 2018,
      icon: <FaTrophy className="text-4xl text-orange-500" />,
    },
    {
      title: "Mathematics Olympiad",
      description:
        "Secured top rankings in the National Mathematics Olympiad, demonstrating analytical and mathematical skills.",
      year: 2019,
      icon: <FaBrain className="text-4xl text-teal-600" />,
    },
    {
      title: "Coding Hackathon",
      description:
        "Participated in a 48-hour coding hackathon, developing innovative solutions to real-world problems.",
      year: 2021,
      icon: <FaCode className="text-4xl text-purple-600" />,
    },
    {
      title: "National Science Fair",
      description:
        "Presented a science project that earned recognition for creativity and technical innovation.",
      year: 2020,
      icon: <FaTrophy className="text-4xl text-orange-500" />,
    },
  ];
  
  const Card = ({ competition }) => (
    <div
      className="relative p-6 mt-40 transition-all duration-700 bg-gray-800 shadow-lg rounded-2xl hover:scale-105 hover:shadow-teal-500/50 group"
      onMouseEnter={() => {
        setIsHovered(true); // Stop scrolling and enlarge card on hover
        setScrollingEnabled(false); // Disable scrolling
      }}
      onMouseLeave={() => {
        setIsHovered(false); // Reset card size and resume scrolling
        setScrollingEnabled(true); // Enable scrolling again
      }}
    >
  {/* Icon */}
  <div className="absolute top-0 z-50 flex items-center justify-center w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg bg-gradient-to-br from-gray-700 to-gray-600 left-1/2 group-hover:bg-gradient-to-br group-hover:from-teal-500 group-hover:to-teal-400 mt-7">
    {competition.icon}
  </div>

  {/* Card Content */}
  <div className="flex flex-col justify-between h-full p-6 space-y-4 transition-all duration-500 border shadow-lg backdrop-blur-lg bg-white/30 border-white/20 rounded-2xl hover:shadow-2xl">
    <h2 className="mt-10 text-xl font-bold text-teal-300 transition-all duration-500 group-hover:text-teal-500">
      {competition.title}
    </h2>
    <p className="text-sm text-gray-200">{competition.description}</p>
    <div className="flex items-center justify-between mt-auto">
      <span className="text-sm font-medium text-gray-700">
        Year: {competition.year}
      </span>
    </div>
  </div>
</div>
  );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-gray-900 to-black">
      {/* Title */}
      <h1 className="mb-8 text-4xl font-extrabold text-center text-teal-400 md:text-5xl">
        My Olympiad Achievements
      </h1>

      {/* Scrollable Section */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-8 overflow-x-auto scrollbar-hide"
        style={{
          scrollBehavior: "smooth", // Smooth scrolling
        }}
      >
        {competitions.length > 0 ? (
          competitions.map((comp, index) => (
            <div key={index} className="inline-block px-4">
              <Card competition={comp} />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <h2 className="text-xl font-bold text-gray-300">
              No Competitions Found
            </h2>
            <p className="text-gray-500">
              Try adding some achievements to showcase!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Olympiad;