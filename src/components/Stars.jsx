import { useEffect, useRef } from 'react';

const Star = ({ cursorPosition }) => {
  const particlesRef = useRef([]);
  const dotRef = useRef([]);

  useEffect(() => {
    if (cursorPosition) {
      const generateStarParticles = () => {
        const size = Math.random() * 6 + 8;
        const animationDuration = Math.random() * 6 + 6;
        const delay = Math.random() * 1 + 1.5;
        const color = `rgba(255, 255, 255, 0.8)`;
        const borderColor = `hsl(${Math.random() * 360}, 50%, 85%)`;
        const rotationAngle = Math.random() * 360;

        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = color;
        particle.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
        particle.style.border = `0.8px solid ${borderColor}`;
        particle.style.boxShadow = `0 0 ${size / 1.5}px ${size / 2}px ${borderColor}, 0 0 ${size}px 3px rgba(255, 255, 255, 0.4)`;
        particle.style.left = `${cursorPosition.x - size / 2 + Math.random() * 120 - 60}px`;
        particle.style.top = `${cursorPosition.y - size / 2 + Math.random() * 120 - 60}px`;
        particle.style.opacity = '1';
        particle.style.transition = `all ${animationDuration}s ease-out`;
        particle.style.transform = `rotate(${rotationAngle}deg)`;
        particle.style.animation = `twinkle ${animationDuration}s infinite ${delay}s, moveParticle ${animationDuration * 2}s ease-out`;

        document.body.appendChild(particle);
        particlesRef.current.push(particle);

        setTimeout(() => {
          particle.style.opacity = '0';
          setTimeout(() => {
            document.body.removeChild(particle);
            particlesRef.current = particlesRef.current.filter(p => p !== particle);
          }, 1000);
        }, 1000);
      };

      const generateDotParticles = () => {
        const size = Math.random() * 1 + 1;
        const animationDuration = Math.random() * 3 + 4;
        const delay = Math.random() * 0.5 + 1;
        const color = `rgba(255, 255, 255, 0.5)`;
        const borderColor = `hsl(${Math.random() * 360}, 100%, 80%)`;

        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = color;
        particle.style.border = `0.5px solid ${borderColor}`;
        particle.style.left = `${cursorPosition.x - size / 2 + Math.random() * 120 - 60}px`;
        particle.style.top = `${cursorPosition.y - size / 2 + Math.random() * 120 - 60}px`;
        particle.style.opacity = '1';
        particle.style.animation = `pulse ${animationDuration}s infinite ${delay}s`;

        document.body.appendChild(particle);
        dotRef.current.push(particle);

        setTimeout(() => {
          particle.style.opacity = '0';
          setTimeout(() => {
            document.body.removeChild(particle);
            dotRef.current = dotRef.current.filter(p => p !== particle);
          }, 500);
        }, 1500);
      };

      for (let i = 0; i < 3; i++) {
        generateStarParticles();
      }
      for (let i = 0; i < 10; i++) {
        generateDotParticles();
      }
    }
  }, [cursorPosition]);

  return null;
};

const style = document.createElement('style');
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
      transform: translate(var(--move-x), var(--move-y)) scale(0.9); 
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
`;

document.head.appendChild(style);

export default Star;
