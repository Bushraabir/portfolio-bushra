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
    <section id="empowered-ed" className="py-20 text-light bg-gradient-to-r from-primaryLight to-primaryDark">
      <div className="px-8 mx-auto max-w-7xl lg:px-16">
        {/* Section Header */}
        <div className="space-y-6 text-center">
          <h2 className="text-5xl font-extrabold leading-tight tracking-tight text-secondary">
            Empowered Ed
          </h2>
          <p className="text-xl text-neutral">
          EmpowerEd fosters creativity and innovation, transforming challenges into opportunities.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="p-12 mt-12 shadow-2xl bg-light rounded-2xl" data-aos="fade-up">
          <h3 className="text-3xl font-semibold text-secondary">
            Our Mission
          </h3>
          <p className="mt-6 text-lg text-dark">
          EmpowerEd is a non-profit organization with a mission to make education accessible to everyone, everywhere. We believe that every student deserves the same starting line, and we’re here to make that happen—at no cost to you!
          </p>
        </div>

        {/* Achievements */}
        <div className="mt-12 text-center">
          <h3 className="text-3xl font-semibold text-secondary">Key Achievements</h3>
          <div className="grid gap-8 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {achievements.map((item, index) => (
              <div
                key={index}
                className="flex items-center p-6 space-x-4 transition-all duration-300 transform shadow-xl bg-light rounded-2xl hover:scale-105"
                data-aos="fade-up"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent1">
                  <i className="text-xl text-light fas fa-check"></i>
                </div>
                <p className="text-lg text-dark">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Programs */}
        <div className="mt-16">
          <h3 className="mb-10 text-3xl font-semibold text-secondary">
            Programs & Events
          </h3>
          <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, index) => (
              <div
                key={index}
                className="relative overflow-hidden transition-all duration-500 transform shadow-xl bg-light rounded-3xl hover:scale-105 hover:shadow-2xl"
                data-aos="flip-left"
              >
                <img
                  src={program.img}
                  alt={program.title}
                  className="object-cover w-full transition-transform duration-500 transform h-72 rounded-t-3xl hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-opacity-10 bg-dark rounded-b-3xl">
                  <h4 className="text-2xl font-bold text-light">{program.title}</h4>
                  <p className="mt-4 text-lg text-light">{program.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Website Button */}
        <div className="mt-12 text-center">
          <a
            href="https://bushraabir.github.io/empowereducation/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 text-lg font-bold transition-all duration-300 transform rounded-full shadow-xl text-light bg-accent2 hover:scale-105 hover:bg-accent2Dark"
          >
            Visit Our Website
          </a>
        </div>
      </div>
    </section>
  );
};

export default Organization;