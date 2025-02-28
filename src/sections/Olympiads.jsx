import React, { useEffect, useRef, useState, memo } from "react";
import { FaBrain, FaTrophy, FaMicrophone, FaMedal, FaAward, FaBuilding, FaFlask, FaMoon, FaPalette, FaPen, FaCrown, FaStar, FaPaintBrush, FaCalculator, FaGlobe } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";

const competitions = [
  { title: "Bangladesh Physics Olympiad (Regional Round)", description: "Achieved 1st place in the regional round from Jessore and participated in the national round of the Bangladesh Physics Olympiad in 2023.", year: 2023, icon: <FaBrain className="text-5xl text-accent1" /> },
  { title: "Essay Writing Competition on Bissho Shishu O Jubo Theater Dibosh", description: "Won 1st place in the Essay Writing Competition on Bissho Shishu O Jubo Theater Dibosh in 2023.", year: 2023, icon: <FaTrophy className="text-5xl text-accent2" /> },
  { title: "General Grade Scholarship", description: "Awarded the General Grade Scholarship in 2023 for academic excellence.", year: 2023, icon: <FaAward className="text-5xl text-accent1" /> },
  { title: "BUET Department of Architecture Ranking", description: "Ranked 31st in the Department of Architecture at BUET in 2023.", year: 2023, icon: <FaBuilding className="text-5xl text-accent2Dark" /> },
  { title: "Inter-House Science Fair Competition (Team Leader)", description: "Led the senior group of Bir Protik Dr. Captain Sitara Begum House in the Inter-House Science Fair Competition in 2022. The team created a project named 'Gusto' with a special Face Recognition feature, which won Best Project.", year: 2022, icon: <FaFlask className="text-5xl text-accent2" /> },
  { title: "Interhouse Astro Olympiad", description: "Secured 3rd place in the Interhouse Astro Olympiad in 2022.", year: 2022, icon: <FaMoon className="text-5xl text-accent1" /> },
  { title: "Painting Competition (7th March Historical Speech)", description: "Won 3rd place in the Painting Competition based on the 7th March Historical Speech in 2022.", year: 2022, icon: <FaPalette className="text-5xl text-accent2" /> },
  { title: "Essay Writing Competition (Independence Day of Bangladesh)", description: "Won 1st place in the Essay Writing Competition on Independence Day of Bangladesh in 2022.", year: 2022, icon: <FaPen className="text-5xl text-accent1" /> },
  { title: "House Prefect", description: "Served as the House Prefect of Bir Protik Dr. Captain Sitara Begum House in 2022, leading a house of 92 cadets and helping them win the overall championship in the annual athletics of 2023.", year: 2022, icon: <FaCrown className="text-5xl text-accent2" /> },
  { title: "Talentpool Scholarship", description: "Awarded the Talentpool Scholarship in 2021.", year: 2021, icon: <FaAward className="text-5xl text-accent2Dark" /> },
  { title: "Junior Prefect", description: "Served as Junior Prefect of Bir Protik Dr. Captain Sitara Begum House in 2021, leading the house.", year: 2021, icon: <FaStar className="text-5xl text-accent1Light" /> },
  { title: "Inter-House Painting Competition", description: "Secured 2nd place in the Inter-House Painting Competition in 2020.", year: 2020, icon: <FaPaintBrush className="text-5xl text-accent2" /> },
  { title: "Inter-House Essay Writing Competition", description: "Won 2nd place in the Inter-House Essay Writing Competition in 2020.", year: 2020, icon: <FaPen className="text-5xl text-accent1" /> },
  { title: "Bangladesh Math Olympiad (Regional Winner)", description: "Achieved Regional Winner in the Bangladesh Math Olympiad in 2020 and participated in the national round.", year: 2020, icon: <FaCalculator className="text-5xl text-accent1" /> },
  { title: "Inter-House Science Fair Competition (Team Leader)", description: "Led the team in the Inter-House Science Fair Competition in 2019, creating a project on easy water purification and supply, which became the Best Project.", year: 2019, icon: <FaFlask className="text-5xl text-accent2" /> },
  { title: "Inter-House AstroPhysics Olympiad", description: "Won 1st place in the Junior Group of the Inter-House AstroPhysics Olympiad in 2019.", year: 2019, icon: <FaMoon className="text-5xl text-accent2" /> },
  { title: "Biggan Uthsob (National)", description: "Won the Regional Round of Biggan Uthsob in 2019 and participated in the National Round with a project on biodegradable polythene.", year: 2019, icon: <FaGlobe className="text-5xl text-accent2Dark" /> },
  { title: "International Mother Language Day Essay Writing Competition", description: "Won 1st place in the International Mother Language Day Essay Writing Competition in 2019.", year: 2019, icon: <FaPen className="text-5xl text-accent1Light" /> },
  { title: "Painting Competition (National Mourning Day)", description: "Won 1st place in the Painting Competition based on National Mourning Day in 2019.", year: 2019, icon: <FaPalette className="text-5xl text-accent2" /> },
  { title: "Painting Competition (Bissho Shishu O Jubo Theater Dibosh)", description: "Achieved 2nd place in the Painting Competition on Bissho Shishu O Jubo Theater Dibosh in 2019.", year: 2019, icon: <FaPalette className="text-5xl text-accent2" /> },
  { title: "Inter-House Painting Competition", description: "Won Best Artist in the Inter-House Painting Competition in 2018, drawing 'Freedom' with charcoal.", year: 2018, icon: <FaPaintBrush className="text-5xl text-accent1" /> },
  { title: "Talentpool Scholarship", description: "Awarded the Talentpool Scholarship for Junior School Certificate Examination (JSC) from Jessore board.", year: 2018, icon: <FaAward className="text-5xl text-accent2" /> },
  { title: "Best Cadet Award", description: "Awarded Best Cadet based on overall performance in discipline, academics, and extracurricular activities in 2017.", year: 2017, icon: <FaMedal className="text-5xl text-accent1" /> },
  { title: "Essay Writing Competition (MCSK)", description: "Won 1st place in the Essay Writing Competition at MCSK in 2017.", year: 2017, icon: <FaPen className="text-5xl text-accent2" /> },
  { title: "Painting Competition (National Mourning Day)", description: "Achieved 3rd place in the Painting Competition on National Mourning Day in 2017.", year: 2017, icon: <FaPalette className="text-5xl text-accent1" /> },
  { title: "Debate Competition (Class 6 vs Class 7)", description: "Secured Runner-Up in the Debate Competition between Class 6 and Class 7 in 2016.", year: 2016, icon: <FaMicrophone className="text-5xl text-accent2" /> },
  { title: "Bangla Vision Painting Competition", description: "Won 3rd place in the Bangla Vision Painting Competition in 2013.", year: 2013, icon: <FaPalette className="text-5xl text-accent2Dark" /> }
];

const Card = memo(({ competition }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const cardRef = useRef(null);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, rotateX: 0 });
    }
  }, [controls, inView]);

  useEffect(() => {
    const card = cardRef.current;
    gsap.to(card, {
      scale: 1,
      rotation: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
      paused: true,
      onStart: () => card.classList.add("hover:scale-105")
    }).pause();

    card.addEventListener("mouseenter", () => gsap.to(card, { scale: 1.05, rotation: 2, duration: 0.5, ease: "elastic.out(1, 0.3)" }));
    card.addEventListener("mouseleave", () => gsap.to(card, { scale: 1, rotation: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" }));

    return () => {
      card.removeEventListener("mouseenter", () => {});
      card.removeEventListener("mouseleave", () => {});
    };
  }, []);

  return (
    <motion.div
      ref={ref => { cardRef.current = ref; ref(ref); }}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={controls}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-[300px] sm:w-[350px] md:w-[400px] relative p-6 mt-20 transition-all duration-700 transform bg-gradient-to-br from-primaryLight to-primaryDark rounded-3xl group"
    >
      <div className="absolute top-0 z-10 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 transition-all duration-500 transform scale-110 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-xl bg-gradient-to-br from-accent1 to-accent2Dark group-hover:from-accent2Light group-hover:to-accent2 group-hover:scale-125 group-hover:rotate-12">
        {competition.icon}
      </div>
      <div className="flex flex-col justify-between h-full p-4 sm:p-6 space-y-4 border-2 shadow-xl border-jordy_blue border-primaryLight/30 bg-primaryDark/80 rounded-3xl group-hover:border-accent2Light group-hover:shadow-2xl">
        <h2 className="text-xl sm:text-2xl font-semibold transition-transform duration-300 text-jordy_blue group-hover:text-accent2 group-hover:translate-x-2 group-hover:translate-y-2">
          {competition.title}
        </h2>
        <p className="text-sm transition-colors duration-300 text-deep_indigo-700 group-hover:text-deep_indigo-900">
          {competition.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm font-medium text-deep_indigo">
            Year: {competition.year}
          </span>
          <div className="w-8 sm:w-10 h-2 rounded-full bg-accent2Dark overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              className="h-full bg-accent1"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const Olympiad = () => {
  const scrollContainerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollingEnabled, setScrollingEnabled] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let scrollSpeed = 30;
    let scrollInterval;
    const scrollContainer = scrollContainerRef.current;

    const smoothScroll = () => {
      if (scrollContainer && scrollingEnabled && !isHovered) {
        let scrollPosition = scrollContainer.scrollLeft;
        let maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        scrollPosition += scrollSpeed;

        if (scrollPosition >= maxScroll || scrollPosition <= 0) {
          scrollSpeed = -scrollSpeed;
        }

        scrollContainer.scrollLeft = scrollPosition;
      }
    };

    if (scrollingEnabled && !isMobile) {
      scrollInterval = setInterval(smoothScroll, 5);
    }

    return () => clearInterval(scrollInterval);
  }, [scrollingEnabled, isHovered, isMobile]);

  const handleTouchStart = (e) => {
    if (isMobile) setScrollingEnabled(false);
  };

  const handleTouchEnd = () => {
    if (isMobile) setScrollingEnabled(true);
  };

  useEffect(() => {
    gsap.to(".parallax-bg", {
      y: "20%",
      ease: "none",
      scrollTrigger: {
        trigger: ".olympiad-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }, []);

  return (
    <section className="relative min-h-screen p-4 sm:p-8 bg-gradient-to-b from-lemon_chiffon via-tea_rose to-deep_indigo olympiad-section">
      <div className="absolute inset-0 bg-gradient-to-br from-acquamarine/20 to-jordy_blue/20 opacity-50 parallax-bg" />
      <h1 className="mb-8 sm:mb-12 text-4xl sm:text-5xl md:text-6xl font-extrabold text-center text-transparent border-b-4 bg-clip-text bg-gradient-to-r from-acquamarine via-jordy_blue to-tea_rose border-jordy_blue">
        My Notable Achievements
      </h1>
      <div
        ref={scrollContainerRef}
        className="flex space-x-6 sm:space-x-12 overflow-x-auto transition-transform duration-1000 ease-in-out snap-x snap-mandatory scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {competitions.length > 0 ? (
          competitions.map((comp, index) => (
            <div key={index} className="inline-block px-4 sm:px-6 snap-center">
              <Card competition={comp} />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20">
            <h2 className="text-lg sm:text-xl font-bold text-primaryLight">No Competitions Found</h2>
            <p className="text-neutral">Try adding some achievements to showcase!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Olympiad;