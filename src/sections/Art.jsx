import React, { useState, useEffect, useRef, useCallback, useMemo, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper/modules";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

// Lazy load Tilt component for better performance
const Tilt = lazy(() => import("react-parallax-tilt"));

// Import artwork images (keeping original paths unchanged)
import BlueMosque from "../assets/acrylic/1.jpg";
import Nature from "../assets/acrylic/2.jpg";
import Bloody from "../assets/acrylic/3.jpg";
import Boston from "../assets/acrylic/4.jpg";
import Fight from "../assets/acrylic/5.jpg";
import Imagination from "../assets/acrylic/6.jpg";
import Vase from "../assets/acrylic/7.jpg";
import Bridge from "../assets/acrylic/8.jpg";
import Sunset from "../assets/acrylic/9.jpg";
import China from "../assets/WaterColor/1.jpg";
import flower1 from "../assets/WaterColor/2.jpg";
import lamp from "../assets/WaterColor/4.jpg";
import flower3 from "../assets/WaterColor/5.jpg";
import sunsetWater from "../assets/WaterColor/6.jpg";
import magic from "../assets/WaterColor/9.jpg";
import nature from "../assets/PencilSketch/1.jpg";
import rope from "../assets/PencilSketch/2.jpg";
import flower from "../assets/PencilSketch/3.jpg";
import chess from "../assets/PencilSketch/4.jpg";
import lion from "../assets/PencilSketch/5.jpg";
import hand from "../assets/PencilSketch/6.jpg";
import still from "../assets/PencilSketch/8.jpg";
import still_1 from "../assets/PencilSketch/9.jpg";
import interior from "../assets/PencilSketch/10.jpg";
import architecture from "../assets/PencilSketch/13.jpg";
import daffodils from "../assets/PencilSketch/14.jpg";
import life from "../assets/PencilSketch/15.jpg";
import tulip from "../assets/PencilSketch/17.jpg";
import captive from "../assets/PencilSketch/21.png";
import line_1 from "../assets/crafts/3.jpg";
import dot from "../assets/crafts/4.jpg";
import emotion from "../assets/crafts/5.jpg";
import brain from "../assets/crafts/6.jpg";
import penholder from "../assets/crafts/8.jpg";
import chess_1 from "../assets/crafts/10.jpg";
import kingdom from "../assets/illustration/1.jpg";
import warrior from "../assets/illustration/2.jpg";
import logo from "../assets/illustration/3.png";
import birth from "../assets/illustration/4.png";
import independence from "../assets/illustration/5.png";
import can from "../assets/modeling/can.png";
import ship from "../assets/modeling/space_ship.png";
import buet from "../assets/illustration/buet.jpg";
import laran from "../assets/illustration/kodom.jpg";

/**
 * Art Portfolio Section Component
 * 
 * A comprehensive art portfolio showcase featuring multiple mediums including
 * sketches, acrylic paintings, watercolors, crafts, 3D models, and illustrations.
 * 
 * Features:
 * - Responsive design with mobile-first approach
 * - Accessible keyboard navigation and ARIA support
 * - SEO optimized with structured data
 * - Lazy loading for optimal performance
 * - Smooth animations and transitions
 * - Modal gallery with navigation
 * - Touch and gesture support
 * 
 * @component
 * @example
 * <ArtPortfolio />
 */

// Tab configuration for different art categories
const TABS = [
  { 
    id: "sketch", 
    title: "Sketch", 
    description: "Detailed and intricate pencil sketches showcasing technical skill and artistic vision.",
    keywords: "pencil art, sketching, drawings, graphite art"
  },
  { 
    id: "acrylic", 
    title: "Acrylic", 
    description: "Vibrant and textured acrylic art pieces with bold colors and dynamic compositions.",
    keywords: "acrylic painting, canvas art, colorful paintings"
  },
  { 
    id: "watercolor", 
    title: "Watercolor", 
    description: "Soft, flowing watercolor creations with delicate transparency and luminous effects.",
    keywords: "watercolor painting, aquarelle, transparent art"
  },
  { 
    id: "crafts and models", 
    title: "Crafts & Models", 
    description: "Handmade crafts and three-dimensional models showcasing sculptural creativity.",
    keywords: "handmade crafts, sculpture, 3D art, mixed media"
  },
  { 
    id: "modeling", 
    title: "3D Modeling", 
    description: "Digital three-dimensional models and renders created with modern software.",
    keywords: "3D modeling, digital art, Blender, computer graphics"
  },
  { 
    id: "illustration", 
    title: "Illustration", 
    description: "Creative digital and traditional illustrations with storytelling elements.",
    keywords: "illustration, digital art, graphic design, visual storytelling"
  },
];

// Color themes for each tab category
const TAB_COLORS = {
  sketch: { from: "#1d3557", to: "#a3c4f3", accent: "#457b9d" },
  acrylic: { from: "#2a1b3d", to: "#cfbaf0", accent: "#9d4edd" },
  watercolor: { from: "#f1c0e8", to: "#ffcfd2", accent: "#f72585" },
  "crafts and models": { from: "#fde4cf", to: "#fbf8cc", accent: "#f77f00" },
  modeling: { from: "#1d3557", to: "#90dbf4", accent: "#0077b6" },
  illustration: { from: "#2a1b3d", to: "#f1c0e8", accent: "#c77dff" },
};

// Artwork data organized by category
const ARTWORKS_DATA = {
  acrylic: [
    {
      src: Imagination,
      description: "This acrylic canvas bursts with vibrant hues that echo the endless spectrum of creative thought. At its heart, a boldly rendered peacock feather unfurls like a mystical quill, symbolizing how writing and drawing can capture the fantastical realms of our imagination.",
      title: "Iridescent Plume: Unfolding the Tapestry of Imagination",
      date: "2020",
      medium: "Acrylic on Canvas",
      dimensions: "24x18 inches",
      keywords: "peacock feather, imagination, vibrant colors, symbolism"
    },
    {
      src: Fight,
      description: "This evocative acrylic canvas weaves a narrative of time's passage and the ceaseless struggle inherent in human existence. The composition melds the weight of ancient history with the raw, enduring spirit of humanity facing tough times.",
      title: "Echoes of Resilience",
      date: "2019",
      medium: "Acrylic on Canvas",
      dimensions: "20x16 inches",
      keywords: "resilience, struggle, history, perseverance"
    },
    {
      src: Nature,
      description: "Winter's Veiled Whispers is an evocative acrylic canvas painting that transports the viewer into a realm of ethereal mystery. A delicate mist shrouds a silent, ancient forest, where gnarled trees emerge as ghostly silhouettes.",
      title: "Winter's Veiled Whispers",
      date: "2023",
      medium: "Acrylic on Canvas",
      dimensions: "22x16 inches",
      keywords: "winter landscape, mist, forest, ethereal"
    },
    {
      src: Boston,
      description: "Boston Reverie: Beacon of Resilience is an acrylic canvas painting that embodies the spirit and legacy of Boston. The artist uses bold, luminous strokes to evoke both the historical grandeur and modern energy of the city.",
      title: "Boston Reverie: Beacon of Resilience",
      date: "2021",
      medium: "Acrylic on Canvas",
      dimensions: "18x24 inches",
      keywords: "Boston, cityscape, resilience, urban art"
    },
    {
      src: Bridge,
      description: "This acrylic canvas painting presents a gracefully arched bridge that extends over a quiet stream, leading into a lush, inviting forest. The bridge serves as a powerful metaphor—a 'bridge to peace'—evoking the nurturing spirit of Mother Nature.",
      title: "Gateway to Nature's Embrace",
      date: "2024",
      medium: "Acrylic on Canvas",
      dimensions: "20x16 inches",
      keywords: "bridge, nature, peace, metaphor, landscape"
    },
    {
      src: BlueMosque,
      description: "This acrylic painting captures the timeless beauty of the Blue Mosque, bathed in the soft glow of the setting sun. The towering minarets reach towards the heavens, mirrored gracefully in the tranquil waters below.",
      title: "Reflections of Serenity",
      date: "2020",
      medium: "Acrylic on Canvas",
      dimensions: "24x18 inches",
      keywords: "Blue Mosque, architecture, reflection, serenity"
    },
    {
      src: Bloody,
      description: "In this evocative acrylic canvas, a lone flower hovers gracefully above a still body of water, its delicate petals infused with a deep, crimson hue that calls to mind the essence of blood.",
      title: "Sanguine Bloom: Reflection of Sacrifice",
      date: "2018",
      medium: "Acrylic on Canvas",
      dimensions: "16x20 inches",
      keywords: "flower, sacrifice, crimson, symbolism"
    },
    {
      src: Vase,
      description: "This acrylic canvas painting blossoms with the radiant promise of human potential, rendered through the evocative form of a flower. The painting invites viewers to contemplate that every individual carries within a seed of transformative possibility.",
      title: "Floral Genesis: The Unfolding of Self",
      date: "2017",
      medium: "Acrylic on Canvas",
      dimensions: "18x22 inches",
      keywords: "flower, potential, transformation, self-discovery"
    },
    {
      src: Sunset,
      description: "This acrylic canvas is a visual meditation on transformation. The deep, muted hues evoke a lingering twilight, yet gentle streaks of luminous color emerge, gradually overpowering the somber tones.",
      title: "Eternal Dawn: When Shadows Surrender",
      date: "2024",
      medium: "Acrylic on Canvas",
      dimensions: "24x20 inches",
      keywords: "sunset, transformation, dawn, hope"
    }
  ],
  watercolor: [
    {
      src: China,
      description: "This delicate watercolor captures the timeless beauty of Chinese history through the lens of its iconic architecture. The painting gracefully portrays the elegant curves and intricate details of ancient buildings.",
      title: "Celestial Harmony: Reflections of Imperial Splendor",
      date: "2024",
      medium: "Watercolor on Paper",
      dimensions: "14x20 inches",
      keywords: "Chinese architecture, imperial, harmony, cultural art"
    },
    {
      src: flower1,
      description: "In this captivating watercolor, gentle washes of warm yellow and lush green evoke a serene garden at the break of dawn. Fine, deliberate brushstrokes bring to life the delicate textures of leaves and petals.",
      title: "Verdant Reverie",
      date: "2022",
      medium: "Watercolor on Paper",
      dimensions: "12x16 inches",
      keywords: "garden, dawn, yellow flowers, nature"
    },
    {
      src: lamp,
      description: "Illuminated Reverie is a meditative watercolor nocturne that transforms a familiar urban scene into a luminous dreamscape. The painting captures the soft glow of street lamps rendered with intricate detail.",
      title: "Illuminated Reverie",
      date: "2024",
      medium: "Watercolor on Paper",
      dimensions: "16x12 inches",
      keywords: "street lamps, urban, nocturne, light"
    },
    {
      src: flower3,
      description: "Crimson Reverie is an evocative celebration of nature's passion rendered in watercolor. The vibrant roses, awash in a dynamic fusion of red, orange, and yellow, burst forth with life and intensity.",
      title: "Crimson Reverie",
      date: "2020",
      medium: "Watercolor on Paper",
      dimensions: "14x18 inches",
      keywords: "roses, crimson, passion, vibrant colors"
    },
    {
      src: magic,
      description: "Bottled Celestial Reverie captures a moment where the infinite magic of the night sky is lovingly confined within the fragile walls of a glass bottle. A delicate hot air balloon drifts among twinkling stars.",
      title: "Bottled Celestial Reverie",
      date: "2020",
      medium: "Watercolor on Paper",
      dimensions: "10x14 inches",
      keywords: "bottle, stars, balloon, dreams, magic"
    },
    {
      src: sunsetWater,
      description: "Embers of Dusk is a masterful watercolor that captures the fleeting magic of twilight. Warm hues of orange, yellow, and pink blend seamlessly into a radiant sky, evoking the gentle glow of a setting sun.",
      title: "Embers of Dusk",
      date: "2020",
      medium: "Watercolor on Paper",
      dimensions: "16x20 inches",
      keywords: "dusk, sunset, twilight, warm colors"
    }
  ],
  sketch: [
    {
      src: lion,
      description: "The lion's mane flows like a river of darkness, each strand meticulously rendered to create a tapestry of movement and texture. His eyes burn with ancient intensity, captured in this powerful graphite study.",
      title: "Roar of the Wild King",
      date: "2024",
      medium: "Graphite on Paper",
      dimensions: "18x24 inches",
      keywords: "lion, wildlife, graphite, portrait, strength"
    },
    {
      src: nature,
      description: "The plant stands as a silent sentinel against the textured backdrop, its leaves reaching outward like delicate fingers grasping for light. Each vein tells a story of survival and growth.",
      title: "Veins of Life in Monochrome",
      date: "2023",
      medium: "Pencil on Paper",
      dimensions: "12x16 inches",
      keywords: "plant study, botanical, growth, monochrome"
    },
    {
      src: captive,
      description: "In this evocative pencil sketch, a solitary foot is ensnared by unyielding chains and pressed against a massive, oppressive orb, representing themes of oppression and resilience.",
      title: "Bound Under the Weight of Fate",
      date: "2025",
      medium: "Pencil on Paper",
      dimensions: "14x18 inches",
      keywords: "symbolism, oppression, chains, fate, struggle"
    },
    {
      src: hand,
      description: "This evocative pencil sketch transcends mere representation, becoming a profound meditation on human connection. The delicate interlacing of fingers serves as a visual metaphor for relationships.",
      title: "Interlocked Heartbeats",
      date: "2024",
      medium: "Pencil on Paper",
      dimensions: "16x12 inches",
      keywords: "hands, connection, relationship, human touch"
    },
    {
      src: still,
      description: "In this evocative pencil sketch, everyday objects transform into a quiet visual sonnet. A humble jar and scattering of spoons emerge through delicate interplay of light and shadow.",
      title: "Serenade of Shadows",
      date: "2024",
      medium: "Pencil on Paper",
      dimensions: "12x16 inches",
      keywords: "still life, shadows, everyday objects, contemplative"
    },
    {
      src: still_1,
      description: "In this evocative pencil sketch, everyday objects emerge as poetic echoes of quiet beauty. The still life drawing transforms mundane items into a contemplative tableau.",
      title: "Whispers of the Ordinary: A Still Life Drawing",
      date: "2024",
      medium: "Pencil on Paper",
      dimensions: "14x18 inches",
      keywords: "still life, ordinary objects, contemplation, beauty"
    },
    {
      src: architecture,
      description: "This pencil sketch captures the solemn majesty of time-worn columns that echo stories of ancient architecture. Each delicate line transforms rigid structure into living narrative.",
      title: "Eternal Columns: Whispers of Time",
      date: "2024",
      medium: "Pencil on Paper",
      dimensions: "18x24 inches",
      keywords: "architecture, columns, history, ancient, structure"
    },
    {
      src: daffodils,
      description: "In Ephemeral Whispers, delicate graphite strokes capture the quiet dialogue between light and shadow in this contemplative still life composition.",
      title: "Ephemeral Whispers",
      date: "2024",
      medium: "Graphite on Paper",
      dimensions: "16x20 inches",
      keywords: "still life, ephemeral, whispers, delicate"
    },
    {
      src: life,
      description: "In Sparrow's Solace, a tender pencil sketch captures a fleeting moment of resilience. A small bird perches on an aged tap, fixated on a single droplet, symbolizing hope and perseverance.",
      title: "Sparrow's Solace",
      date: "2024",
      medium: "Pencil on Paper",
      dimensions: "12x16 inches",
      keywords: "sparrow, hope, water drop, resilience, nature"
    },
    {
      src: rope,
      description: "Ties That Bind is a captivating pencil sketch that captures the essence of human connection through intricately rendered intertwined forms, symbolizing relationship strength.",
      title: "Ties That Bind",
      date: "2019",
      medium: "Pencil on Paper",
      dimensions: "16x12 inches",
      keywords: "connection, ties, relationships, strength, unity"
    },
    {
      src: flower,
      description: "This exquisite pen sketch captures nature's fluid beauty with gracefully curved, intertwined leaves. The artist's deft use of fine lines creates delicate interplay between light and shadow.",
      title: "Sinuous Reverie",
      date: "2021",
      medium: "Pen on Paper",
      dimensions: "10x14 inches",
      keywords: "botanical, leaves, curves, nature, elegance"
    },
    {
      src: chess,
      description: "In this evocative pencil sketch, the quiet intensity of the chessboard comes to life through masterful shading and precise line work, transforming pieces into silent sentinels.",
      title: "Quiet Stratagem",
      date: "2020",
      medium: "Pencil on Paper",
      dimensions: "16x20 inches",
      keywords: "chess, strategy, game, intellectual, contemplation"
    },
    {
      src: tulip,
      description: "A delicate yet striking pencil sketch capturing the quiet elegance of a tulip in its early bloom. Soft gradients and precise shading breathe life into the petals.",
      title: "Ethereal Bloom",
      date: "2024",
      medium: "Pencil on Paper",
      dimensions: "12x16 inches",
      keywords: "tulip, bloom, elegance, spring, delicate"
    },
    {
      src: interior,
      description: "Luminescence in Stillness is a contemplative pencil sketch that transforms a modest interior scene into a quiet meditation on light and space.",
      title: "Luminescence in Stillness",
      date: "2023",
      medium: "Pencil on Paper",
      dimensions: "14x18 inches",
      keywords: "interior, lamp, stillness, contemplation, light"
    }
  ],
  "crafts and models": [
    {
      src: line_1,
      description: "This artwork represents a transformative journey from nature's organic patterns to structured resonance, created through meticulous placement of bamboo sticks in a cork sheet.",
      title: "Echoes of Line",
      date: "2024",
      medium: "Bamboo and Cork",
      dimensions: "12x12x3 inches",
      keywords: "sculpture, bamboo, organic patterns, transformation"
    },
    {
      src: dot,
      description: "Inspired by nature's intricate patterns, this artwork embarks on a transformative journey from observation to abstraction through dynamic 3D representation.",
      title: "Void and Form: A Dialogue in Dots",
      date: "2024",
      medium: "Mixed Media",
      dimensions: "10x10x4 inches",
      keywords: "abstract, dots, negative space, nature-inspired"
    },
    {
      src: emotion,
      description: "Incarnate Anxiety is a dynamic, abstract manifestation that transforms the ephemeral weight of inner turmoil into a striking tangible form through fragmented planes.",
      title: "Incarnate Anxiety",
      date: "2024",
      medium: "Mixed Media Sculpture",
      dimensions: "8x8x6 inches",
      keywords: "anxiety, emotion, abstract sculpture, psychological"
    },
    {
      src: brain,
      description: "The Watchful Gaze is a raw and evocative clay sculpture exploring themes of social anxiety and self-perception through organic, brain-like forms.",
      title: "The Watchful Gaze",
      date: "2024",
      medium: "Clay Sculpture",
      dimensions: "6x8x6 inches",
      keywords: "clay, brain, anxiety, psychology, sculpture"
    },
    {
      src: penholder,
      description: "Ephemeral Reverie is a delicate testament to transient beauty, crafted from humble tissue and adhesive, transcending its modest materials with quiet elegance.",
      title: "Ephemeral Reverie",
      date: "2022",
      medium: "Paper and Adhesive",
      dimensions: "5x3x3 inches",
      keywords: "paper craft, delicate, ephemeral, handmade"
    },
    {
      src: chess_1,
      description: "In Terra's Gambit, every chess piece becomes a poetic embodiment of earth's enduring spirit, hand-molded from raw clay with tactile narrative.",
      title: "Terra's Gambit: A Symphony in Clay",
      date: "2025",
      medium: "Clay Chess Set",
      dimensions: "Various sizes",
      keywords: "chess, clay, handmade, earth, strategy"
    }
  ],
  modeling: [
    {
      src: can,
      title: "A Digital Rhapsody",
      description: "A visionary exploration fusing digital rendering precision with handcrafted narrative, developed in Blender and enriched with meticulously crafted labels in Illustrator.",
      medium: "Blender, Adobe Illustrator",
      date: "2023",
      dimensions: "Digital Render",
      keywords: "3D modeling, Blender, digital art, still life"
    },
    {
      src: ship,
      title: "Nebular Vessel: Beacon of Life",
      description: "A visionary sci-fi creation rendered in Blender, where art meets cosmic aspiration. The spaceship's transparent hull houses luminous cores symbolizing the spark of life.",
      medium: "Blender 3D",
      date: "2023",
      dimensions: "Digital Render",
      keywords: "spaceship, sci-fi, 3D render, futuristic, hope"
    }
  ],
  illustration: [
    {
      src: kingdom,
      title: "Abyssal Dominion",
      description: "In shadowy ocean depths, this surreal underwater kingdom emerges through ethereal blues and haunting pinks, revealing a realm of lost majesty and ancient secrets.",
      medium: "Photoshop, Illustrator",
      date: "2023",
      dimensions: "Digital Illustration",
      keywords: "underwater, kingdom, surreal, mysterious, digital art"
    },
    {
      src: warrior,
      title: "Crimson Valor: The Spirit of Liberation",
      description: "This Adobe Illustrator artwork stands as a vivid tribute to Bengali freedom fighters, reimagining the Bangladesh flag as a resolute character-like emblem.",
      medium: "Adobe Illustrator",
      date: "2023",
      dimensions: "Digital Illustration",
      keywords: "Bangladesh, freedom fighter, patriotic, flag, liberation"
    },
    {
      src: buet,
      title: "Serenity In Structure",
      description: "This artwork beautifully captures the iconic BUET Architecture Building, blending organic frames with structural elements to reflect harmony between design and environment.",
      medium: "Adobe Illustrator",
      date: "2023",
      dimensions: "Digital Illustration",
      keywords: "BUET, architecture, education, building, design"
    },
    {
      src: laran,
      title: "Monsoon Whisper: The Kadam Bloom",
      description: "Inspired by the timeless Kadam flower in Bengali culture, this digital creation celebrates nature's ephemeral poetry amid the monsoon's gentle embrace.",
      medium: "Digital Art",
      date: "2022",
      dimensions: "Digital Illustration",
      keywords: "Kadam flower, monsoon, Bengali culture, nature, digital"
    },
    {
      src: logo,
      title: "Symphony of Imagination",
      description: "The official logo for 'Eyes on Talent' Facebook page, seamlessly intertwining painting brushstrokes, photography lens, and melodic curves of music.",
      medium: "Adobe Photoshop",
      date: "2021",
      dimensions: "Digital Logo",
      keywords: "logo design, creativity, talent, community, art"
    },
    {
      src: birth,
      title: "Eternal Flame of Independence",
      description: "A heartfelt tribute celebrating Bangabandhu Sheikh Mujibur Rahman's birthday, merging dignified portrait with mosaic of smaller images symbolizing collective memory.",
      medium: "Adobe Photoshop",
      date: "2021",
      dimensions: "Digital Illustration",
      keywords: "Bangabandhu, independence, Bangladesh, leader, tribute"
    },
    {
      src: independence,
      title: "Crimson Echoes of Sacrifice",
      description: "A dynamic tribute honoring the blood and sacrifice of Bangalees who paved the path to freedom, with bold splashes of red and green evoking national spirit.",
      medium: "Adobe Illustrator",
      date: "2021",
      dimensions: "Digital Illustration",
      keywords: "sacrifice, freedom, Bangladesh, independence, patriotic"
    }
  ],
};

// Animation variants for smooth transitions
const ANIMATION_VARIANTS = {
  overlay: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        when: "beforeChildren", 
        staggerChildren: 0.1,
        duration: 0.3
      } 
    },
    exit: { 
      opacity: 0, 
      transition: { 
        staggerChildren: 0.05, 
        staggerDirection: -1,
        duration: 0.2
      } 
    },
  },
  modal: {
    hidden: { scale: 0.8, opacity: 0, y: 20 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25 
      } 
    },
    exit: { 
      scale: 0.8, 
      opacity: 0, 
      y: 20, 
      transition: { duration: 0.2 } 
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.3 } 
    },
  },
  tab: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: "easeOut" } 
    },
  },
  content: {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
    exit: { 
      opacity: 0, 
      x: 50, 
      transition: { duration: 0.3 } 
    },
  },
};

/**
 * Loading component for Suspense fallback
 */
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-4" aria-label="Loading">
    <div className="w-8 h-8 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
  </div>
);

/**
 * Error Boundary Component
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Art Portfolio Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-4">We apologize for the inconvenience. Please try refreshing the page.</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Custom hook for keyboard navigation
 */
const useKeyboardNavigation = (isOpen, onClose, onNext, onPrev) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          e.preventDefault();
          onNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          onPrev();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);
};

/**
 * Custom hook for focus management
 */
const useFocusManagement = (isOpen, closeButtonRef) => {
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('aria-hidden', 'true');
    } else {
      document.body.style.overflow = '';
      document.body.removeAttribute('aria-hidden');
    }

    return () => {
      document.body.style.overflow = '';
      document.body.removeAttribute('aria-hidden');
    };
  }, [isOpen]);
};

/**
 * SEO and Structured Data Component
 */
const ArtworkStructuredData = ({ artwork, category }) => {
  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    "name": artwork.title,
    "description": artwork.description,
    "dateCreated": artwork.date,
    "artMedium": artwork.medium,
    "artform": category,
    "creator": {
      "@type": "Person",
      "name": "Artist Name" // Replace with actual artist name
    },
    "image": artwork.src,
    "keywords": artwork.keywords
  }), [artwork, category]);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [structuredData]);

  return null;
};

/**
 * Artwork Card Component with enhanced accessibility
 */
const ArtworkCard = React.memo(({ artwork, onClick, index, totalItems }) => {
  const cardRef = useRef(null);

  const handleClick = useCallback(() => {
    onClick(artwork);
  }, [artwork, onClick]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  return (
    <motion.div
      ref={cardRef}
      className="group relative h-[300px] sm:h-[350px] md:h-[400px] rounded-2xl cursor-pointer border-3 border-white shadow-lg overflow-hidden bg-white/10 backdrop-blur-sm hover:shadow-2xl transition-all duration-300"
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
      }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View artwork ${artwork.title}, ${index + 1} of ${totalItems}`}
      aria-describedby={`artwork-desc-${index}`}
    >
      <Suspense fallback={<LoadingSpinner />}>
        <Tilt 
          tiltMaxAngleX={5} 
          tiltMaxAngleY={5} 
          perspective={2000}
          transitionSpeed={1500}
          className="w-full h-full"
        >
          <div className="relative w-full h-full">
            <LazyLoadImage
              src={artwork.src}
              alt={`${artwork.title} - ${artwork.medium}, created in ${artwork.date}`}
              className="object-cover w-full h-full rounded-2xl transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              effect="blur"
              placeholderSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDI9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmM2Y0ZjYiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNlNWU3ZWIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNncmFkaWVudCkiLz48L3N2Zz4="
              onError={(e) => {
                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNmM2Y0ZjYiLz48dGV4dCB4PSIyMDAiIHk9IjE1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2ExYWEiPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+";
              }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-lg sm:text-xl font-bold mb-1 line-clamp-2">
                {artwork.title}
              </h3>
              <p className="text-sm opacity-90 mb-2">
                {artwork.medium} • {artwork.date}
              </p>
              <p 
                id={`artwork-desc-${index}`}
                className="text-xs opacity-80 line-clamp-2 leading-relaxed"
              >
                {artwork.description}
              </p>
            </div>

            {/* Focus indicator */}
            <div className="absolute inset-0 rounded-2xl ring-4 ring-blue-500 ring-opacity-0 group-focus:ring-opacity-50 transition-all duration-200" />
          </div>
        </Tilt>
      </Suspense>
    </motion.div>
  );
});

ArtworkCard.displayName = 'ArtworkCard';

/**
 * Modal Navigation Button Component
 */
const ModalNavButton = React.memo(({ direction, onClick, ariaLabel }) => (
  <motion.button
    onClick={onClick}
    className={`absolute top-1/2 transform -translate-y-1/2 ${
      direction === 'prev' ? 'left-4' : 'right-4'
    } w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center text-2xl backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500 z-50`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    aria-label={ariaLabel}
    variants={ANIMATION_VARIANTS.item}
  >
    {direction === 'prev' ? '←' : '→'}
  </motion.button>
));

ModalNavButton.displayName = 'ModalNavButton';

/**
 * Main Art Portfolio Component
 */
const ArtPortfolio = () => {
  // State management
  const [activeTab, setActiveTab] = useState("sketch");
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Refs
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const sectionRef = useRef(null);

  // Memoized values
  const currentArtworks = useMemo(() => ARTWORKS_DATA[activeTab], [activeTab]);
  const currentColors = useMemo(() => TAB_COLORS[activeTab], [activeTab]);
  const currentTab = useMemo(() => TABS.find(tab => tab.id === activeTab), [activeTab]);

  // Event handlers
  const handleTabChange = useCallback((tabId) => {
    if (tabId === activeTab) return;
    
    setIsLoading(true);
    setActiveTab(tabId);
    setSelectedArtwork(null);
    
    // Simulate loading for smooth transition
    setTimeout(() => setIsLoading(false), 300);
  }, [activeTab]);

  const openModal = useCallback((artwork) => {
    setSelectedArtwork(artwork);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedArtwork(null);
  }, []);

  const handleNext = useCallback(() => {
    if (!selectedArtwork) return;
    
    const currentIndex = currentArtworks.findIndex(art => art.src === selectedArtwork.src);
    const nextIndex = (currentIndex + 1) % currentArtworks.length;
    setSelectedArtwork(currentArtworks[nextIndex]);
  }, [currentArtworks, selectedArtwork]);

  const handlePrev = useCallback(() => {
    if (!selectedArtwork) return;
    
    const currentIndex = currentArtworks.findIndex(art => art.src === selectedArtwork.src);
    const prevIndex = (currentIndex - 1 + currentArtworks.length) % currentArtworks.length;
    setSelectedArtwork(currentArtworks[prevIndex]);
  }, [currentArtworks, selectedArtwork]);

  // Custom hooks
  useKeyboardNavigation(!!selectedArtwork, closeModal, handleNext, handlePrev);
  useFocusManagement(!!selectedArtwork, closeButtonRef);

  // SEO meta tags update
  useEffect(() => {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        `Explore ${currentTab?.title.toLowerCase()} artworks featuring ${currentTab?.description.toLowerCase()}`
      );
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && currentTab?.keywords) {
      metaKeywords.setAttribute('content', currentTab.keywords);
    }
  }, [currentTab]);

  return (
    <ErrorBoundary>
      <section 
        id="artworks" 
        ref={sectionRef}
        className="relative min-h-screen overflow-hidden"
        aria-labelledby="art-portfolio-heading"
        role="main"
      >
        {/* Dynamic Background */}
        <motion.div
          className="absolute inset-0 opacity-60"
          animate={{ 
            background: `linear-gradient(135deg, ${currentColors.from} 0%, ${currentColors.to} 100%)` 
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        
        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, ${currentColors.accent}40 0%, transparent 50%), radial-gradient(circle at 75% 75%, ${currentColors.accent}30 0%, transparent 50%)`,
            backgroundSize: '200px 200px'
          }} />
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 xl:px-12 mx-auto py-12 sm:py-16 lg:py-20">
          {/* Header Section */}
          <motion.header
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-12 sm:mb-16 lg:mb-20 text-center"
          >
            <h1 
              id="art-portfolio-heading"
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-wide drop-shadow-2xl mb-4 sm:mb-6"
            >
              Exquisite Artistry
            </h1>
            <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed font-medium">
              A curated collection of artworks across multiple mediums, showcasing creativity, 
              technical skill, and artistic vision through {TABS.length} distinct categories.
            </p>
            
            {/* Link to full art portfolio */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <a
                href="https://art-portfolio-rust.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 hover:border-white rounded-full font-semibold transition-all duration-300 backdrop-blur-sm"
              >
                <span>View Full Art Gallery</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </motion.div>
          </motion.header>

          {/* Navigation Tabs */}
          <nav 
            className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 mb-12 sm:mb-16 lg:mb-20" 
            role="tablist"
            aria-label="Artwork categories"
          >
            {TABS.map((tab, index) => (
              <motion.button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                aria-describedby={`tab-desc-${tab.id}`}
                onClick={() => handleTabChange(tab.id)}
                disabled={isLoading}
                className={`relative py-3 px-6 sm:py-4 sm:px-8 text-sm sm:text-base lg:text-lg font-semibold rounded-full overflow-hidden transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-white/50 disabled:opacity-50 ${
                  activeTab === tab.id
                    ? "text-white shadow-xl border-2 border-white/30"
                    : "bg-white/10 text-white border-2 border-white/50 hover:border-white hover:bg-white/20 backdrop-blur-sm"
                }`}
                style={{
                  background: activeTab === tab.id
                    ? `linear-gradient(135deg, ${TAB_COLORS[tab.id].from}, ${TAB_COLORS[tab.id].to})`
                    : undefined,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={ANIMATION_VARIANTS.tab}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                <span className="relative z-10">{tab.title}</span>
                <span 
                  id={`tab-desc-${tab.id}`} 
                  className="sr-only"
                >
                  {tab.description}
                </span>
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Main Content Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              id={`panel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeTab}`}
              className="relative"
              variants={ANIMATION_VARIANTS.content}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Category Description */}
              <motion.div 
                className="text-center mb-8 sm:mb-12"
                variants={ANIMATION_VARIANTS.item}
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  {currentTab?.title} Collection
                </h2>
                <p className="max-w-2xl mx-auto text-white/80 text-base sm:text-lg leading-relaxed">
                  {currentTab?.description}
                </p>
              </motion.div>

              {/* Loading State */}
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <LoadingSpinner />
                </div>
              ) : (
                /* Artwork Gallery */
                <Swiper
                  modules={[Navigation, EffectCoverflow, Autoplay]}
                  effect="coverflow"
                  grabCursor
                  centeredSlides
                  slidesPerView={1}
                  spaceBetween={20}
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 20,
                    depth: 400,
                    modifier: 1,
                    slideShadows: false,
                  }}
                  navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  }}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: true,
                    pauseOnMouseEnter: true,
                  }}
                  breakpoints={{
                    640: { 
                      slidesPerView: 2,
                      spaceBetween: 20 
                    },
                    768: { 
                      slidesPerView: 2.5,
                      spaceBetween: 30 
                    },
                    1024: { 
                      slidesPerView: 3,
                      spaceBetween: 30 
                    },
                    1280: { 
                      slidesPerView: 3.5,
                      spaceBetween: 40 
                    },
                  }}
                  className="pb-12"
                >
                  {currentArtworks.map((artwork, index) => (
                    <SwiperSlide key={`${artwork.src}-${index}`}>
                      <ArtworkCard
                        artwork={artwork}
                        onClick={openModal}
                        index={index}
                        totalItems={currentArtworks.length}
                      />
                    </SwiperSlide>
                  ))}
                  
                  {/* Custom Navigation Buttons */}
                  <div className="swiper-button-prev !text-white !w-12 !h-12 !bg-black/30 !rounded-full hover:!bg-black/50 !backdrop-blur-sm !transition-all !duration-300 after:!text-lg after:!font-bold" />
                  <div className="swiper-button-next !text-white !w-12 !h-12 !bg-black/30 !rounded-full hover:!bg-black/50 !backdrop-blur-sm !transition-all !duration-300 after:!text-lg after:!font-bold" />
                </Swiper>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Modal for Artwork Details */}
        <AnimatePresence>
          {selectedArtwork && (
            <>
              <ArtworkStructuredData artwork={selectedArtwork} category={activeTab} />
              
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                variants={ANIMATION_VARIANTS.overlay}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={closeModal}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
              >
                {/* Modal Content */}
                <motion.div
                  ref={modalRef}
                  className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl"
                  variants={ANIMATION_VARIANTS.modal}
                  onClick={(e) => e.stopPropagation()}
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 0 }}
                  onDragEnd={(e, { offset, velocity }) => {
                    if (offset.y > 150 || velocity.y > 500) closeModal();
                  }}
                >
                  {/* Close Button */}
                  <motion.button
                    ref={closeButtonRef}
                    className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center text-2xl hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-gray-500 z-60"
                    onClick={closeModal}
                    aria-label="Close modal"
                    variants={ANIMATION_VARIANTS.item}
                  >
                    ×
                  </motion.button>

                  <div className="p-6 sm:p-8 lg:p-12">
                    {/* Image Section */}
                    <motion.div 
                      className="mb-8"
                      variants={ANIMATION_VARIANTS.item}
                    >
                      <div className="relative">
                        <LazyLoadImage
                          src={selectedArtwork.src}
                          alt={`${selectedArtwork.title} - ${selectedArtwork.medium}, created in ${selectedArtwork.date}`}
                          className="object-contain w-full h-auto max-h-[50vh] rounded-2xl border-4 border-gray-200 shadow-lg"
                          loading="lazy"
                          effect="blur"
                        />
                      </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div 
                      className="text-center space-y-6"
                      variants={ANIMATION_VARIANTS.item}
                    >
                      <div>
                        <h2 
                          id="modal-title"
                          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-wide"
                        >
                          {selectedArtwork.title}
                        </h2>
                        
                        <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base text-gray-600 mb-6">
                          <span className="bg-gray-100 px-3 py-1 rounded-full">
                            {selectedArtwork.medium}
                          </span>
                          <span className="bg-gray-100 px-3 py-1 rounded-full">
                            {selectedArtwork.date}
                          </span>
                          {selectedArtwork.dimensions && (
                            <span className="bg-gray-100 px-3 py-1 rounded-full">
                              {selectedArtwork.dimensions}
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        <p 
                          id="modal-description"
                          className="max-w-3xl mx-auto text-base sm:text-lg leading-relaxed text-gray-700 font-medium"
                        >
                          {selectedArtwork.description}
                        </p>
                      </div>

                      {selectedArtwork.keywords && (
                        <div className="pt-4">
                          <p className="text-sm text-gray-500 mb-2">Keywords:</p>
                          <div className="flex flex-wrap justify-center gap-2">
                            {selectedArtwork.keywords.split(', ').map((keyword, index) => (
                              <span 
                                key={index}
                                className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-200"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Navigation Buttons */}
                <ModalNavButton 
                  direction="prev"
                  onClick={handlePrev}
                  ariaLabel="Previous artwork"
                />
                <ModalNavButton 
                  direction="next"
                  onClick={handleNext}
                  ariaLabel="Next artwork"
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </section>
    </ErrorBoundary>
  );
};

export default React.memo(ArtPortfolio);