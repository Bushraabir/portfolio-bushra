import React, { useEffect } from "react";
import Bushra from "../assets/Bushra.png"; 
import { useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Organization = () => {
  const achievements = [
    "Empowered over 500 individuals through workshops and webinars.",
    "Organized skill-development programs in design, programming, and innovation.",
    "Launched community projects focused on education and empowerment.",
  ];

  const programs = [
    {
      title: "Creative Design Bootcamp",
      description: "A hands-on workshop on Adobe Illustrator, Photoshop, and 3D modeling.",
      img: Bushra,
    },
    {
      title: "Python for Beginners",
      description: "An introductory programming course empowering young learners.",
      img: Bushra,
    },
    {
      title: "AI and ML Hackathon",
      description: "Collaborative problem-solving event focusing on AI and machine learning.",
      img: Bushra,
    },
  ];

  // Initialize AOS animation library
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section id="empowered-ed" className="py-20 text-white bg-gradient-to-r from-[#007C8A] to-[#1A1A1A]">
      <div className="px-8 mx-auto max-w-7xl lg:px-16">
        {/* Section Header */}
        <div className="space-y-6 text-center">
          <h2 className="text-5xl font-extrabold leading-tight tracking-tight text-white">
            Empowered Ed
          </h2>
          <p className="text-xl text-white opacity-80">
            Empowering individuals through education, innovation, and creativity.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="p-12 mt-12 bg-[#F9F5F0] rounded-lg shadow-xl bg-opacity-20 backdrop-blur-lg" data-aos="fade-up">
          <h3 className="text-3xl font-semibold text-[#FFC857]">
            Our Mission
          </h3>
          <p className="mt-6 text-lg text-[#1A1A1A] opacity-90">
            Empowered Ed is a platform dedicated to fostering a community of growth, 
            learning, and innovation. Through skill-building programs and educational 
            initiatives, we aim to uplift and empower individuals to turn their 
            creative ideas into impactful realities.
          </p>
        </div>

        {/* Achievements */}
        <div className="mt-12 text-center">
          <h3 className="text-3xl font-semibold text-[#FFC857]">Key Achievements</h3>
          <div className="grid gap-8 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {achievements.map((item, index) => (
              <div
                key={index}
                className="flex items-center p-6 space-x-4 transition-all duration-300 transform bg-[#F9F5F0] shadow-xl bg-opacity-20 backdrop-blur-lg rounded-xl hover:scale-105"
                data-aos="fade-up"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-[#007C8A] rounded-full">
                  <i className="text-xl text-white fas fa-check"></i>
                </div>
                <p className="text-lg text-[#1A1A1A]">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Programs */}
        <div className="mt-16">
          <h3 className="mb-10 text-3xl font-semibold text-[#FFC857]">
            Programs & Events
          </h3>
          <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, index) => (
              <div
                key={index}
                className="relative overflow-hidden transition-all duration-500 transform bg-[#F9F5F0] shadow-xl rounded-3xl hover:scale-105 hover:shadow-2xl"
                data-aos="flip-left"
              >
                <img
                  src={program.img}
                  alt={program.title}
                  className="object-cover w-full transition-transform duration-500 transform h-72 rounded-t-3xl hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-[#1A1A1A] bg-opacity-50 rounded-b-3xl">
                  <h4 className="text-2xl font-bold text-white">{program.title}</h4>
                  <p className="mt-4 text-lg text-white">{program.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Organization;
