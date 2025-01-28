import React, { useEffect, useRef, useState } from "react";
import { FaBrain, FaTrophy, FaCode } from "react-icons/fa";

const Olympiad = () => {
  const scrollContainerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false); // Track hover state
  const [scrollingEnabled, setScrollingEnabled] = useState(true); // Track if scrolling is enabled

  useEffect(() => {
    // Advanced Scroll with smooth inertia effect
    let scrollSpeed = 30;
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
      scrollInterval = setInterval(smoothScroll, 5);
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
  ];

  const Card = ({ competition }) => (
    <div
      className="relative p-6 mt-20 transition-all duration-700 shadow-xl bg-dark rounded-2xl hover:scale-105 hover:shadow-accent1/50"
      onMouseEnter={() => setScrollingEnabled(false)}
      onMouseLeave={() => setScrollingEnabled(true)}
    >
      {/* Icon Container */}
      <div className="absolute top-0 z-10 flex items-center justify-center w-16 h-16 transition-opacity duration-300 transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg opacity-100 bg-gradient-to-br from-primaryLight to-primary left-1/2 group-hover:from-accent1 group-hover:to-accent1Light">
        {competition.icon}
      </div>

      {/* Card Content */}
      <div className="flex flex-col justify-between h-full p-6 space-y-4 border shadow-lg bg-primaryDark/70 border-primaryLight/40 rounded-2xl">
        <h2 className="mt-10 text-xl font-bold text-secondaryLight group-hover:text-secondary">
          {competition.title}
        </h2>
        <p className="text-sm text-neutral">{competition.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm font-medium text-primaryLight">Year: {competition.year}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-dark to-primaryDark">
      <h1 className="mb-8 text-4xl font-extrabold text-center text-accent1 md:text-5xl">
        My Olympiad Achievements
      </h1>

      <div
        ref={scrollContainerRef}
        className="flex space-x-8 overflow-x-auto scrollbar-hide"
        style={{
          scrollBehavior: "smooth",
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
            <h2 className="text-xl font-bold text-primaryLight">No Competitions Found</h2>
            <p className="text-neutral">Try adding some achievements to showcase!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Olympiad;
