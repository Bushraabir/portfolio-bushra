import React, { useEffect, useRef, useState } from "react";
import { FaBrain, FaTrophy, FaCode } from "react-icons/fa";

const Olympiad = () => {
  const scrollContainerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false); 
  const [scrollingEnabled, setScrollingEnabled] = useState(true); 

  useEffect(() => {
    let scrollSpeed = 30;
    let scrollInterval;
    const scrollContainer = scrollContainerRef.current;

    const smoothScroll = () => {
      if (scrollContainer && scrollingEnabled) {
        let scrollPosition = scrollContainer.scrollLeft;
        let maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        scrollPosition += scrollSpeed;

        if (scrollPosition >= maxScroll || scrollPosition <= 0) {
          scrollSpeed = -scrollSpeed;
        }

        scrollContainer.scrollLeft = scrollPosition;
      }
    };

    if (scrollingEnabled) {
      scrollInterval = setInterval(smoothScroll, 5);
    }

    return () => clearInterval(scrollInterval);
  }, [scrollingEnabled]);

  const competitions = [
    {
      title: "Regional Physics Olympiad",
      description:
        "Achieved 1st place in the Regional Physics Olympiad in 2017, showcasing expertise in problem-solving and critical thinking.",
      year: 2017,
      icon: <FaBrain className="text-5xl text-accent1" />,
    },
    {
      title: "Inter-House Debate Competition",
      description:
        "Awarded Best Speaker in the Inter-House Debate Competition for persuasive speaking and structured arguments.",
      year: 2018,
      icon: <FaTrophy className="text-5xl text-accent2" />,
    },
    {
      title: "Mathematics Olympiad",
      description:
        "Secured top rankings in the National Mathematics Olympiad, demonstrating analytical and mathematical skills.",
      year: 2019,
      icon: <FaBrain className="text-5xl text-accent1" />,
    },
    {
      title: "Coding Hackathon",
      description:
        "Participated in a 48-hour coding hackathon, developing innovative solutions to real-world problems.",
      year: 2021,
      icon: <FaCode className="text-5xl text-accent2Dark" />,
    },
    {
      title: "National Science Fair",
      description:
        "Presented a science project that earned recognition for creativity and technical innovation.",
      year: 2020,
      icon: <FaTrophy className="text-5xl text-accent1Light" />,
    },

    {
      title: "Regional Physics Olympiad",
      description:
        "Achieved 1st place in the Regional Physics Olympiad in 2017, showcasing expertise in problem-solving and critical thinking.",
      year: 2017,
      icon: <FaBrain className="text-5xl text-accent1" />,
    },
    {
      title: "Inter-House Debate Competition",
      description:
        "Awarded Best Speaker in the Inter-House Debate Competition for persuasive speaking and structured arguments.",
      year: 2018,
      icon: <FaTrophy className="text-5xl text-accent2" />,
    },
    {
      title: "Mathematics Olympiad",
      description:
        "Secured top rankings in the National Mathematics Olympiad, demonstrating analytical and mathematical skills.",
      year: 2019,
      icon: <FaBrain className="text-5xl text-accent1" />,
    },
    {
      title: "Coding Hackathon",
      description:
        "Participated in a 48-hour coding hackathon, developing innovative solutions to real-world problems.",
      year: 2021,
      icon: <FaCode className="text-5xl text-accent2Dark" />,
    },
    {
      title: "National Science Fair",
      description:
        "Presented a science project that earned recognition for creativity and technical innovation.",
      year: 2020,
      icon: <FaTrophy className="text-5xl text-accent1Light" />,
    },
  ];

  const Card = ({ competition }) => (
    <div
      className="relative p-8 mt-20 transition-all duration-700 transform hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-primaryLight to-primaryDark rounded-3xl hover:bg-gradient-to-tl group"
      onMouseEnter={() => setScrollingEnabled(false)}
      onMouseLeave={() => setScrollingEnabled(true)}
    >
      <div className="absolute top-0 z-10 flex items-center justify-center w-20 h-20 transition-opacity duration-300 transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-xl opacity-100 bg-gradient-to-br from-accent1 to-accent2Dark group-hover:from-accent2Light group-hover:to-accent2">
        {competition.icon}
      </div>

      <div className="flex flex-col justify-between h-full p-6 space-y-4 border-2 shadow-xl border-jordy_blue border-primaryLight/30 bg-primaryDark/80 rounded-3xl group-hover:border-accent2Light">
        <h2 className="text-2xl font-semibold text-jordy_blue group-hover:text-accent2">
          {competition.title}
        </h2>
        <p className="text-sm text-deep_indigo-700">{competition.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm font-medium text-deep_indigo">Year: {competition.year}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative min-h-screen p-8 bg-gradient-to-b from-lemon_chiffon via-tea_rose to-deep_indigo">
      {/* Overlay with Blur Effect for Premium Look */}
     

      <h1 className="mb-12 text-5xl font-extrabold text-center text-transparent border-b-4 bg-clip-text bg-gradient-to-r from-acquamarine via-jordy_blue to-tea_rose md:text-6xl border-jordy_blue ">
         My Olympiad Achievements
      </h1>


      <div
        ref={scrollContainerRef}
        className="flex space-x-12 overflow-x-auto transition-transform duration-1000 ease-in-out scrollbar-hide"
        style={{
          scrollBehavior: "smooth",
        }}
      >
        {competitions.length > 0 ? (
          competitions.map((comp, index) => (
            <div key={index} className="inline-block px-6">
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
    </section>
  );
};

export default Olympiad;
