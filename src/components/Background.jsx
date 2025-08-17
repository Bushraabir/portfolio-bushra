import React, { useEffect, useRef } from "react";

const Background = () => {
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

    // Define  color palette inspired by cosmic theme: soft pastels with metallic sheen
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

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

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
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 1.5
      );
      gradient.addColorStop(0, "rgba(42, 27, 61, 0.4)"); // deep_indigo core
      gradient.addColorStop(0.5, "rgba(152, 245, 225, 0.2)"); // aquamarine mid
      gradient.addColorStop(1, "rgba(241, 192, 232, 0.1)"); // pink_lavender edge

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Group particles by layer for optimized connection drawing
      const particlesByLayer = particleLayers.map(() => []);
      particlesRef.current.forEach(particle => {
        particlesByLayer[particleLayers.indexOf(particle.layer)].push(particle);
      });

      particlesRef.current.forEach((particle, i) => {
        // Advanced pulsating with easing
        const pulse = 0.7 + Math.sin(Date.now() * 0.0015 + particle.pulsePhase) * 0.3;
        particle.opacity = Math.max(0.3, Math.min(1, pulse * particle.opacity));

        // Mouse/touch interaction with smooth attraction/repulsion
        const dx = mousePos.current.x - particle.x;
        const dy = mousePos.current.y - particle.y;
        const distanceToMouse = Math.hypot(dx, dy);
        const force = distanceToMouse < 300 ? (300 - distanceToMouse) / 300 * 5 : 0;

        // Attract if far, repel if close
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

        // Update rotation
        particle.rotation += particle.rotationSpeed;

        // Draw trail for motion blur effect
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
      });

      // Draw connections after particles to optimize layering (connections behind particles if needed, but here after updates)
      particlesByLayer.forEach(layerParticles => {
        for (let i = 0; i < layerParticles.length; i++) {
          for (let j = i + 1; j < layerParticles.length; j++) {
            drawCurvedConnection(ctx, layerParticles[i], layerParticles[j]);
          }
        }
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default Background;