"use client";
import { useEffect, useRef, useState } from 'react';

const Star = ({ cursorPosition }) => {
  const particlesRef = useRef([]);
  const dotRef = useRef([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize component
    const initializeComponent = () => {
      // Add CSS animations if not already added
      if (!document.getElementById('star-animations')) {
        const style = document.createElement('style');
        style.id = 'star-animations';
        style.innerHTML = `
          @keyframes twinkle {
            0% {
              transform: scale(1) rotate(0deg);
              opacity: 0.6;
            }
            50% {
              transform: scale(1.3) rotate(30deg);
              opacity: 1;
            }
            100% {
              transform: scale(1) rotate(0deg);
              opacity: 0.6;
            }
          }

          @keyframes moveParticle {
            0% {
              transform: translate(0, 0) scale(1);
            }
            100% {
              transform: translate(var(--burst-x), var(--burst-y)) scale(0.9); 
            }
          }

          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 0.4;
            }
            50% {
              transform: scale(1.5);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 0.4;
            }
          }

          @keyframes starBurst {
            0% {
              transform: scale(0) rotate(0deg);
              opacity: 0;
            }
            50% {
              transform: scale(1.2) rotate(180deg);
              opacity: 1;
            }
            100% {
              transform: scale(0.8) rotate(360deg);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(style);
      }
      setIsInitialized(true);
    };

    initializeComponent();

    return () => {
      // Cleanup particles
      particlesRef.current.forEach(particle => particle.parentNode?.removeChild(particle));
      dotRef.current.forEach(dot => dot.parentNode?.removeChild(dot));
      particlesRef.current = [];
      dotRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (!isInitialized || !cursorPosition) return;

    // Function to generate star particles
    const generateStarParticles = () => {
      const size = Math.random() * 6 + 8;
      const animationDuration = Math.random() * 6 + 6;
      const delay = Math.random() * 1 + 1.5;
      const color = `rgba(255, 255, 255, 0.8)`;
      const borderColor = `hsl(${Math.random() * 360}, 50%, 85%)`;
      const rotationAngle = Math.random() * 360;

      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background-color: ${color};
        clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        border: 0.8px solid ${borderColor};
        box-shadow: 0 0 ${size / 1.5}px ${size / 2}px ${borderColor}, 0 0 ${size}px 3px rgba(255, 255, 255, 0.4);
        left: ${cursorPosition.x - size / 2 + Math.random() * 120 - 60}px;
        top: ${cursorPosition.y - size / 2 + Math.random() * 120 - 60}px;
        opacity: 1;
        transition: all ${animationDuration}s ease-out;
        transform: rotate(${rotationAngle}deg);
        animation: twinkle ${animationDuration}s infinite ${delay}s, moveParticle ${animationDuration * 2}s ease-out;
        pointer-events: none;
        z-index: 1000;
      `;

      document.body.appendChild(particle);
      particlesRef.current.push(particle);

      setTimeout(() => {
        particle.style.opacity = '0';
        setTimeout(() => particle.remove(), animationDuration * 1000);
      }, animationDuration * 1000);
    };

    // Function to generate dot particles
    const generateDotParticles = () => {
      const size = Math.random() * 2 + 1;
      const animationDuration = Math.random() * 3 + 4;
      const delay = Math.random() * 0.5 + 1;
      const color = `rgba(255, 255, 255, 0.5)`;
      const borderColor = `hsl(${Math.random() * 360}, 100%, 80%)`;

      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background-color: ${color};
        border: 0.5px solid ${borderColor};
        left: ${cursorPosition.x - size / 2 + Math.random() * 120 - 60}px;
        top: ${cursorPosition.y - size / 2 + Math.random() * 120 - 60}px;
        opacity: 1;
        animation: pulse ${animationDuration}s infinite ${delay}s;
        pointer-events: none;
        z-index: 999;
      `;

      document.body.appendChild(particle);
      dotRef.current.push(particle);

      setTimeout(() => {
        particle.style.opacity = '0';
        setTimeout(() => particle.remove(), animationDuration * 1000);
      }, animationDuration * 1000);
    };

    // Function to generate burst effect
    const generateBurstEffect = () => {
      for (let i = 0; i < 8; i++) {
        const angle = (i * 45) * (Math.PI / 180);
        const distance = Math.random() * 60 + 30;
        const size = Math.random() * 4 + 2;
        const color = `hsl(${Math.random() * 360}, 70%, 70%)`;

        const burst = document.createElement('div');
        burst.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background-color: ${color};
          border-radius: 50%;
          left: ${cursorPosition.x - size / 2}px;
          top: ${cursorPosition.y - size / 2}px;
          opacity: 1;
          animation: starBurst 0.8s ease-out forwards;
          pointer-events: none;
          z-index: 1001;
          transform-origin: center;
        `;
        
        burst.style.setProperty('--burst-x', `${Math.cos(angle) * distance}px`);
        burst.style.setProperty('--burst-y', `${Math.sin(angle) * distance}px`);

        document.body.appendChild(burst);

        setTimeout(() => burst.remove(), 800);
      }
    };

    // Trigger effects
    const generateEffects = () => {
      for (let i = 0; i < 3; i++) generateStarParticles();
      for (let i = 0; i < 10; i++) generateDotParticles();
      if (Math.random() < 0.3) generateBurstEffect();
    };

    generateEffects();

  }, [cursorPosition, isInitialized]);

  return null;
};

export default Star;
