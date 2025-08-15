import React, { useEffect, useState, useRef } from "react";

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Define a premium color palette inspired by cosmic elegance: soft pastels with metallic sheen
    const colors = [
      "#fbf8cc", // lemon_chiffon (soft gold)
      "#fde4cf", // champagne_pink (rose gold)
      "#a3c4f3", // jordy_blue (sapphire blue)
      "#90dbf4", // non_photo_blue (celestial cyan)
      "#8eecf5", // electric_blue (iridescent turquoise)
      "#98f5e1", // aquamarine (emerald glow)
    ];

    // Create three layers of particles for enhanced parallax with varying depth
    const particleLayers = [
      { count: 80, sizeRange: [3, 6], speed: 0.2, glow: 25, rotationSpeed: 0.001 }, // Deep background layer (slow, subtle)
      { count: 60, sizeRange: [4, 8], speed: 0.4, glow: 30, rotationSpeed: 0.002 }, // Midground layer (moderate, elegant)
      { count: 40, sizeRange: [5, 12], speed: 0.6, glow: 55, rotationSpeed: 0.003 }, // Foreground layer (faster, prominent)
    ];

    // Initialize particles as star-like polygons
    particlesRef.current = particleLayers.flatMap(layer =>
      Array.from({ length: layer.count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (layer.sizeRange[1] - layer.sizeRange[0]) + layer.sizeRange[0],
        speedX: (Math.random() * layer.speed - layer.speed / 2),
        speedY: (Math.random() * layer.speed - layer.speed / 2),
        color: colors[Math.floor(Math.random() * colors.length)],
        glow: layer.glow,
        opacity: Math.random() * 0.5 + 0.5,
        layer: layer,
        pulsePhase: Math.random() * Math.PI * 2, // For pulsating effect
        rotation: Math.random() * Math.PI * 2, // Initial rotation angle
        rotationSpeed: layer.rotationSpeed * (Math.random() > 0.5 ? 1 : -1), // Gentle rotation
        trail: [], // For advanced trail effect (store last positions)
        noiseOffsetX: Math.random() * 6000, // For Perlin-like noise simulation
        noiseOffsetY: Math.random() * 500, // high frequency noise for organic movement
      }))
    );

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Simple noise function simulation for organic movement (advanced, non-linear paths)
    const noise = (x, y) => {
      const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
      return n - Math.floor(n); // Fractional part for [0,1)
    };

    // Function to draw a 5-pointed star (elegant shape instead of circle)
    const drawStar = (ctx, x, y, size, rotation, color, opacity, glow) => {
      ctx.save();
      ctx.shadowBlur = glow;
      ctx.shadowColor = color;
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      const spikes = 5;
      const outerRadius = size;
      const innerRadius = size / 2.5; // For pointed stars
      let rot = Math.PI / spikes;
      ctx.moveTo(0, -outerRadius);
      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(Math.cos(rot) * outerRadius, Math.sin(rot) * outerRadius);
        rot += Math.PI / spikes;
        ctx.lineTo(Math.cos(rot) * innerRadius, Math.sin(rot) * innerRadius);
        rot += Math.PI / spikes;
      }
      ctx.lineTo(0, -outerRadius);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      ctx.fill();
      ctx.restore();
    };

    // Function to draw elegant curved connections (bezier curves for premium feel)
    const drawCurvedConnection = (ctx, p1, p2) => {
      const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y);
      if (distance < 180) { // Slightly increased range for more connections
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        const midX = (p1.x + p2.x) / 2 + (Math.random() - 0.5) * 50; // Add randomness for curve
        const midY = (p1.y + p2.y) / 2 + (Math.random() - 0.5) * 50;
        ctx.quadraticCurveTo(midX, midY, p2.x, p2.y);
        const gradientLine = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        gradientLine.addColorStop(0, `${p1.color}60`); // Softer alpha for elegance
        gradientLine.addColorStop(1, `${p2.color}60`);
        ctx.strokeStyle = gradientLine;
        ctx.lineWidth = 1.5 * (1 - distance / 180); // Thicker closer lines
        ctx.globalAlpha = 0.5 * (1 - distance / 180);
        ctx.stroke();
        ctx.restore();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw premium radial gradient background with multi-stop for depth
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 1.5
      );
      gradient.addColorStop(0, "rgba(42, 27, 61, 0.4)"); // deep_indigo core
      gradient.addColorStop(0.5, "rgba(152, 245, 225, 0.2)"); // aquamarine mid
      gradient.addColorStop(1, "rgba(241, 192, 232, 0.1)"); // pink_lavender edge
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, i) => {
        // Advanced pulsating with easing
        const pulse = 0.7 + Math.sin(Date.now() * 0.0015 + particle.pulsePhase) * 0.3;
        particle.opacity = Math.max(0.3, Math.min(1, pulse * particle.opacity));

        // Mouse interaction with smooth attraction/repulsion
        const dx = mousePos.current.x - particle.x;
        const dy = mousePos.current.y - particle.y;
        const distanceToMouse = Math.hypot(dx, dy);
        const force = distanceToMouse < 300 ? (300 - distanceToMouse) / 300 * 5 : 0; // Attract if far, repel if close
        const angle = Math.atan2(dy, dx);
        particle.speedX += Math.cos(angle) * force * particle.layer.speed * 0.01;
        particle.speedY += Math.sin(angle) * force * particle.layer.speed * 0.01;

        // Organic movement using simulated noise
        const noiseValX = noise(particle.noiseOffsetX, particle.noiseOffsetY) * 2 - 1;
        const noiseValY = noise(particle.noiseOffsetY, particle.noiseOffsetX) * 2 - 1;
        particle.speedX += noiseValX * 0.1 * particle.layer.speed;
        particle.speedY += noiseValY * 0.1 * particle.layer.speed;
        particle.noiseOffsetX += 0.001;
        particle.noiseOffsetY += 0.001;

        // Dampen speed for smooth drifting
        particle.speedX *= 0.98;
        particle.speedY *= 0.98;

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Boundary checks with elastic bounce
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -0.95;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -0.95;

        // Update rotatione
        particle.rotation += particle.rotationSpeed;

        // Draw trail for  motion blur effect 
        particle.trail.push({ x: particle.x, y: particle.y });
        if (particle.trail.length > 5) particle.trail.shift(); // Keep short trail
        particle.trail.forEach((pos, idx) => {
          ctx.save();
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, particle.size * 0.2 * (1 - idx / 5), 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = particle.opacity * (1 - idx / 5) * 0.3;
          ctx.fill();
          ctx.restore();
        });

        // Draw the star particle
        drawStar(ctx, particle.x, particle.y, particle.size * pulse, particle.rotation, particle.color, particle.opacity, particle.glow);

        // Draw curved connections to other particles in the same layer
        particlesRef.current.forEach((otherParticle, j) => {
          if (i < j && particle.layer === otherParticle.layer) { // Avoid double-drawing
            drawCurvedConnection(ctx, particle, otherParticle);
          }
        });
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Performance check for low-end devices
    const isLowEnd = window.innerWidth < 768 || (navigator.deviceMemory && navigator.deviceMemory < 4);
    if (!isLowEnd) {
      animate();
    } else {
      // Fallback: static stars with no animations
      particlesRef.current.forEach(particle => {
        drawStar(ctx, particle.x, particle.y, particle.size, particle.rotation, particle.color, particle.opacity, particle.glow);
      });
    }

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-auto"
      style={{ top: 0 }}
    />
  );
};

const About = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleExploreClick = () => {
    const element = document.getElementById("achievements");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerClass = isMobile
    ? "w-full max-w-md p-4 rounded-3xl shadow-3xl backdrop-blur-xl bg-deep_indigo/40"
    : "w-full max-w-4xl p-8 rounded-3xl shadow-3xl backdrop-blur-xl bg-deep_indigo/40";

  const h2Class = isMobile
    ? "mb-6 text-4xl font-heading font-extrabold bg-gradient-to-r from-jordy_blue to-aquamarine bg-clip-text text-transparent tracking-tight leading-snug"
    : "mb-10 text-6xl font-heading font-extrabold bg-gradient-to-r from-jordy_blue to-aquamarine bg-clip-text text-transparent tracking-tight leading-snug";

  const pClass = isMobile
    ? "mb-6 text-sm font-description text-champagne_pink leading-relaxed tracking-wider"
    : "mb-8 text-lg font-description text-champagne_pink leading-relaxed tracking-wider";

  const buttonClass = isMobile
    ? "mt-6 px-6 py-2.5 text-sm font-cta font-bold text-lemon_chiffon bg-gradient-to-r from-jordy_blue to-aquamarine rounded-3xl shadow-2xl backdrop-blur-sm transition-all hover:bg-gradient-to-l hover:shadow-[0_0_20px_rgba(163,196,243,0.8)] focus:outline-none focus:ring-4 focus:ring-aquamarine/50 active:scale-95"
    : "mt-8 px-8 py-3 text-lg font-cta font-bold text-lemon_chiffon bg-gradient-to-r from-jordy_blue to-aquamarine rounded-3xl shadow-2xl backdrop-blur-sm transition-all hover:bg-gradient-to-l hover:shadow-[0_0_20px_rgba(163,196,243,0.8)] focus:outline-none focus:ring-4 focus:ring-aquamarine/50 active:scale-95";

  const sectionPadding = isMobile ? "p-4 mt-0" : "p-8 mt-0";

  return (
    <div
      ref={sectionRef}
      id="about"
      className={`relative flex flex-col items-center justify-center min-h-screen ${sectionPadding} bg-gradient-to-b from-deep_indigo/80 via-dark_teal/50 to-transparent overflow-hidden`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(50px)",
        transition: "opacity 1.2s ease-out, transform 1.2s ease-out",
      }}
    >
      <ParticleBackground />
      <div className="relative z-10 w-full max-w-5xl">
        <div
          className={`${containerClass} border border-mauve/30 hover:border-aquamarine/50 transition-all duration-600 hover:shadow-[0_0_50px_rgba(152,245,225,0.5)] transform hover:scale-[1.02] perspective-1000`}
          style={{
            background: "linear-gradient(45deg, rgba(42, 27, 61, 0.5), rgba(152, 245, 225, 0.3))",
            transform: isVisible ? "rotateY(0deg) scale(1)" : "rotateY(10deg) scale(0.95)",
            transition: "transform 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 1.2s ease-out",
            opacity: isVisible ? 1 : 0,
            animation: isVisible ? "slide-up 1.2s ease-out" : "none",
          }}
        >
          <h2
            className={h2Class}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0) rotateX(0deg)" : "translateY(60px) rotateX(10deg)",
              transition: "all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.2s",
            }}
          >
            My Planet
          </h2>
          {[
            "Am I on a spaceship as big as a planet, and could it be called Earth? Theoretically, yes.",
            "My duty is to maintain my spaceship's computer program and keep it running smoothly. I love these systems. I have worked with Python, C, and C++ to create complex, interactive simulations.",
            "But knowing this isn't enough. I need to explore other parts of my satellite and connect with experts who can guide me in my endless pursuit of knowledge.",
            "Art has been one of humanity's first creations—it's a natural language. I, too, am a binary sculptor, carrying the essence of Homo sapiens.",
          ].map((text, index) => (
            <p
              key={index}
              className={pClass}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0) rotateX(0deg)" : "translateY(60px) rotateX(10deg)",
                transition: `all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${0.3 + index * 0.1}s`,
              }}
            >
              {text}
            </p>
          ))}
          <button
            className={buttonClass}
            onClick={handleExploreClick}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0) scale(1)" : "translateY(60px) scale(0.8)",
              transition: "all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.8s",
            }}
            onMouseDown={(e) => {
              e.target.style.transform = "scale(0.95) rotate(-1deg)";
            }}
            onMouseUp={(e) => {
              e.target.style.transform = "scale(1) rotate(0deg)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1) rotate(0deg)";
            }}
            aria-label="Explore more about my achievements"
          >
            Explore My Universe
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(100px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        ::-webkit-scrollbar {
          display: none;
        }
        * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
    </div>
  );
};

export default About;