# Portfolio of Bushra Khandoker

> A dynamic, interactive, and visually stunning portfolio website showcasing my STEM projects, artistic work, achievements, and more.

---

## Table of Contents

1. [Overview](#overview)
2. [Demo](#demo)
3. [Features](#features)
4. [Built With](#built-with)
5. [Getting Started](#getting-started)

   * [Prerequisites](#prerequisites)
   * [Installation](#installation)
   * [Available Scripts](#available-scripts)
6. [Project Structure](#project-structure)
7. [Section Breakdown](#section-breakdown)
8. [Contributing](#contributing)
9. [License](#license)
10. [Contact](#contact)

---

## Overview

This repository contains the source code for my personal portfolio website built with React and modern web technologies. It demonstrates my expertise in frontend development, 3D visualization, animations, and project showcases.

## Demo

> **Live Site:** [https://bushraabir.github.io/portfolio-bushra/](https://bushraabir.github.io/portfolio-bushra/)

## Features

* **Smooth Scroll Animations** powered by Framer Motion & GSAP
* **Particle & 3D Backgrounds** with `tsparticles` & `@react-three/fiber`
* **Lazy Loading** for performance optimizations
* **Vertical Timeline** showcasing academic and STEM achievements
* **Gallery & Carousel** components for projects and initiatives
* **Responsive Design** with Tailwind CSS and custom media queries
* **Lottie Animations** for engaging motion graphics
* **Countup & Typewriter Effects** for interactive stats and titles
* **AOS** scroll animations for additional flair

## Built With

* [React](https://reactjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Framer Motion](https://www.framer.com/motion/)
* [GSAP & ScrollTrigger](https://greensock.com/)
* [react-three-fiber](https://github.com/pmndrs/react-three-fiber)
* [tsparticles](https://github.com/matteobruni/tsparticles)
* [AOS](https://michalsnik.github.io/aos/)
* [react-vertical-timeline-component](https://github.com/stephane-monnot/react-vertical-timeline)
* [react-lazy-load-image-component](https://github.com/Aljullu/react-lazy-load-image-component)
* [Typewriter Effect](https://github.com/tameemsafi/typewriterjs)
* [CountUp.js](https://github.com/inorganik/CountUp.js)

## Getting Started

### Prerequisites

* Node.js v14+
* npm or yarn

### Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/Bushraabir/portfolio.git
   cd portfolio
   ```
2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```
3. **Run locally**

   ```bash
   npm start
   # or
   yarn start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view in the browser.

### Available Scripts

| Command         | Description                               |
| --------------- | ----------------------------------------- |
| `npm start`     | Runs the app in development mode.         |
| `npm run build` | Builds the app for production.            |
| `npm test`      | Launches the test runner (if configured). |

## Project Structure

```
src/
├── assets/        # Images, Lottie JSON, 3D models
├── components/    # Reusable UI components, ErrorBoundary, Loader
├── sections/      # Page sections (Hero, Websites, AboutMe, Achievements, etc.)
├── App.jsx        # Entry point with React Router
├── index.css      # Global styles & Tailwind imports
└── index.js       # React DOM render
```

## Section Breakdown

* **Home:** Hero intro with particle/3D background and toggleable sidebar navigation
* **Websites:** Showcase of personal & collaborative STEM web projects
* **Research & Art:** Highlights of research work and creative portfolios
* **Organization:** Gallery of non-profit initiatives with carousel & Lottie
* **About Me:** Interactive narrative with custom particle background
* **Achievements:** Vertical timeline of academic, leadership, and STEM honors
* **Skills & Gallery:** Skillset list and image gallery
* **Testimonials:** Appreciations & endorsements
* **Footer:** Contact links and social profiles

## Contributing

Contributions are welcome! If you'd like to improve or add features, please open an issue or submit a pull request.


## Contact

* **Name:** Bushra Khandoker
* **Email:** [bushrakhandoker2@gmail.com](mailto:bushrakhandoker2@gmail.com)
* **GitHub:** [@Bushraabir](https://github.com/Bushraabir)

---

*Thank you for visiting my portfolio!*
