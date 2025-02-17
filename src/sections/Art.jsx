import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

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
import glass from "../assets/PencilSketch/7.jpg";
import still from "../assets/PencilSketch/8.jpg";
import still_1 from "../assets/PencilSketch/9.jpg";
import interior from "../assets/PencilSketch/10.jpg";
import perspective from "../assets/PencilSketch/11.jpg";
import nature_1 from "../assets/PencilSketch/12.jpg";
import architecture from "../assets/PencilSketch/13.jpg";
import daffodils from "../assets/PencilSketch/14.jpg";
import life from "../assets/PencilSketch/15.jpg";
import tulip from "../assets/PencilSketch/17.jpg";
import composition from "../assets/PencilSketch/18.jpg";
import lyrics from "../assets/PencilSketch/19.jpg";
import captive from "../assets/PencilSketch/21.png";

import line from "../assets/crafts/1.jpg";
import line_1 from "../assets/crafts/3.jpg";
import dot from "../assets/crafts/4.jpg";
import emotion from "../assets/crafts/5.jpg";
import brain from "../assets/crafts/6.jpg";
import notebook from "../assets/crafts/7.jpg";
import penholder from "../assets/crafts/8.jpg";
import penholder_1 from "../assets/crafts/9.jpg";
import chess_1 from "../assets/crafts/10.jpg";

gsap.registerPlugin(ScrollTrigger);

const tabs = [
  { id: "sketch", title: "Sketch", description: "Detailed and intricate pencil sketches." },
  { id: "acrylic", title: "Acrylic", description: "Explore vibrant and textured acrylic art pieces." },
  { id: "watercolor", title: "Watercolor", description: "Soft, flowing, and colorful watercolor creations." },
  { id: "crafts and models", title: "Crafts & Models", description: "Handmade crafts and intricate models." }
];

const artworksData = {
  acrylic: [
    {
      src: Imagination,
      description:
        "This acrylic canvas bursts with vibrant hues that echo the endless spectrum of creative thought. At its heart, a boldly rendered peacock feather unfurls like a mystical quill, symbolizing how writing and drawing can capture the fantastical realms of our imagination. The feather’s shimmering, prismatic colors serve as a visual ode to the power of artistic expression—a reminder that our inner visions are as radiant and multifaceted as the natural beauty of the peacock. Each brushstroke creates a dynamic interplay of light and pigment, inviting the viewer to journey into a world where creativity knows no bounds and every idea blossoms into a vibrant masterpiece.",
      title: "Iridescent Plume: Unfolding the Tapestry of Imagination",
      date: "2020"
    },
    {
      src: Fight,
      description:
        "This evocative acrylic canvas weaves a narrative of time’s passage and the ceaseless struggle inherent in human existence. The composition melds the weight of ancient history with the raw, enduring spirit of humanity facing tough times. Weathered, somber hues and layered textures evoke faded memories and bygone eras, while dynamic bursts of light hint at hope emerging from adversity. Every brushstroke seems to echo the countless battles fought and won—a visual testament to perseverance and the unyielding will to overcome. The painting invites viewers to reflect on our shared past and the timeless resilience that propels us forward, even in the face of life's greatest challenges.",
      title: "Echoes of Resilience",
      date: "2019"
    },
    {
      src: Nature,
      description:
        "'Winter's Veiled Whispers' is an evocative acrylic canvas painting that transports the viewer into a realm of ethereal mystery. A delicate mist shrouds a silent, ancient forest, where gnarled trees emerge as ghostly silhouettes against a subdued, wintry palette. Soft gradations of light and shadow interplay with the diffuse haze, suggesting the fleeting secrets of nature hidden beneath the frost. The work invites quiet contemplation, as if nature herself is whispering forgotten tales of endurance and solitude, leaving an indelible impression of winter’s enigmatic beauty.This title and description draw inspiration from contemporary discussions and artistic approaches to winter landscapes, where elements like mist and silence evoke a sense of mystery and introspection",
      title: "Winter's Veiled Whispers",
      date: "2023"
    },
    {
      src: Boston,
      description:
        "Boston Reverie: Beacon of Resilience- is an acrylic canvas painting that embodies the spirit and legacy of Boston. The artist uses bold, luminous strokes to evoke both the historical grandeur and modern energy of the city. Ethereal washes of deep blue and radiant gold mimic the shimmering waters of the Charles River and the glowing skyline, while subtle hints of brick red and slate capture the texture of historic architecture. The interplay of light and shadow not only reflects Boston’s dynamic urban rhythm but also suggests its enduring resilience—a city where revolutionary history meets contemporary innovation. This work invites viewers into a meditative reverie, evoking a sense of nostalgia and hope as the city emerges as a timeless beacon of progress and heritage.",
      title: "Boston Reverie: Beacon of Resilience",
      date: "2021"
    },
    {
      src: Bridge,
      description:
        "This acrylic canvas painting presents a gracefully arched bridge that extends over a quiet stream, leading into a lush, inviting forest. The bridge is rendered in soft, harmonious hues that capture the gentle interplay of light and shadow, symbolizing a passage from the turmoil of everyday life into a realm of calm and renewal. It serves as a powerful metaphor—a 'bridge to peace'—evoking the nurturing spirit of Mother Nature. As you follow the bridge’s gentle curve, you are invited to step into the forest’s protective sanctuary, where the tranquil whisper of leaves and the serene ambience of nature promise solace and healing. The work resonates with themes of hope and transformation, offering viewers a quiet moment of reflection and a reminder of nature’s timeless, restorative embrace.",
      title: "Gateway to Nature's Embrace",
      date: "2024"
    },
    {
      src: BlueMosque,
      description:
        " This acrylic painting captures the timeless beauty of the Blue Mosque, bathed in the soft glow of the setting sun. The towering minarets reach towards the heavens, mirrored gracefully in the tranquil waters below. Delicate brushstrokes bring depth to the sky, where drifting clouds add to the dreamlike atmosphere. The interplay of blues and golden hues evokes a sense of peace and reverence, inviting the viewer to pause and admire the harmony of architecture and nature.",
      title: "Reflections of Serenity",
      date: "2020"
    },
    {
      src: Bloody,
      description:
        "In this evocative acrylic canvas, a lone flower hovers gracefully above a still body of water, its delicate petals infused with a deep, crimson hue that calls to mind the essence of blood. The composition captures a poignant duality—where the fragile beauty of the bloom contrasts with the underlying symbolism of sacrifice and life’s impermanence. The calm, reflective surface below mirrors not only the flower’s form but also hints at the hidden depths of pain and renewal. This work invites the viewer to meditate on the interplay between life and loss, where every scarlet stroke tells a story of both vulnerability and resilient grace.",
      title: "Sanguine Bloom: Reflection of Sacrifice",
      date: "2018"
    },
    {
      src: Vase,
      description:
        "This acrylic canvas painting blossoms with the radiant promise of human potential, rendered through the evocative form of a flower. At first glance, its vibrant petals—delicately unfurling in a dynamic interplay of light and color—suggest the tender emergence of a new self. Yet, woven into each stroke is an abstract echo of the human spirit: fragile yet resolute, constantly evolving and reaching toward the infinite. The painting invites viewers to contemplate that every individual, much like this blooming flower, carries within a seed of transformative possibility. Subtle gradations of hue and the interplay of luminous highlights with soft shadows evoke both the transient beauty of life and the enduring capacity for growth and renewal. In its very essence, Floral Genesis: The Unfolding of Self celebrates the journey from potential to realization—a poetic testament to the perennial nature of hope and the transformative power of self-discovery",
      title: "Floral Genesis: The Unfolding of Self",
      date: "2017"
    },
    {
      src: Sunset,
      description:
        "This acrylic canvas is a visual meditation on transformation. At first glance, the deep, muted hues evoke a lingering twilight—a symbolic night where life’s darker moments seem to prevail. Yet, as the eye travels across the scene, gentle streaks of luminous color emerge, gradually overpowering the somber tones. The interplay of shadow and light suggests that no darkness is permanent; rather, it is the quiet prelude to an inevitable awakening. With fluid brushstrokes that capture both stillness and the promise of motion, the painting invites viewers to reflect on the resilience of nature—and by extension, the human spirit—reminding us that even in our most challenging hours, dawn is always on the horizon.",
      title: " Eternal Dawn: When Shadows Surrender",
      date: "2024"
    }
  ],
  watercolor: [
    {
      src: China,
      description:
        "This delicate watercolor captures the timeless beauty of Chinese history through the lens of its iconic architecture. The painting gracefully portrays the elegant curves and intricate details of ancient buildings, their sweeping roofs and ornate carvings rendered in soft, ethereal washes of ink and subtle color. The interplay of light and shadow evokes the gentle rhythm of history and nature, while hints of traditional symbolism whisper stories of dynastic glory and cultural wisdom. “Celestial Harmony” invites viewers to step into a serene world where history, art, and architecture merge, offering a contemplative glimpse into the enduring legacy of China's imperial past.",
      title: "Celestial Harmony: Reflections of Imperial Splendor",
      date: "2024"
    },
    {
      src: flower1,
      description:
        "In this captivating watercolor, gentle washes of warm yellow and lush green evoke a serene garden at the break of dawn. Fine, deliberate brushstrokes bring to life the delicate textures of leaves and petals, while spontaneous splashes in the background add a playful, ephemeral quality. The painting creates a harmonious interplay between precision and fluidity, inviting viewers to lose themselves in the quiet, refreshing beauty of nature—a true celebration of life’s soft, yet vibrant rhythm.",
      title: "Verdant Reverie",
      date: "2022"
    },
    {
      src: lamp,
      description:
        "'Illuminated Reverie' is a meditative watercolor nocturne that transforms a familiar urban scene into a luminous dreamscape. The painting captures the soft glow of street lamps rendered with intricate detail, their warm light contrasting beautifully against an abstract, fluid background of cool, expressive washes. The interplay of light and shadow invites the viewer to linger in a quiet moment of modern mystery—where each lamp seems to whisper stories of urban solitude and fleeting enchantment. The work, both contemplative and dynamic, transforms the ordinary into a poetic celebration of twilight’s ephemeral magic.",
      title: "Illuminated Reverie",
      date: "2024"
    },
    {
      src: flower3,
      description:
        "'Crimson Reverie' is an evocative celebration of nature’s passion rendered in watercolor. The vibrant roses, awash in a dynamic fusion of red, orange, and yellow, burst forth with life and intensity. In contrast, cool blues and greens in the background create a serene oasis that perfectly balances the fiery blooms. The artist’s fluid brushstrokes and delicate layering capture the ephemeral quality of each petal, inviting the viewer to experience a moment of poetic tranquility and contemplative beauty in a garden of radiant emotion.",
      title: "Crimson Reverie",
      date: "2020"
    },
    {
      src: magic,
      description:
        "“Bottled Celestial Reverie” captures a moment where the infinite magic of the night sky is lovingly confined within the fragile walls of a glass bottle. In this watercolor masterpiece, a delicate hot air balloon drifts among twinkling stars and soft, ethereal hues, its journey suspended in time. The bottle itself becomes a metaphor—a tiny vessel holding the boundless spirit of adventure and the fleeting beauty of life. It reminds us that even the smallest container can cradle an entire universe of dreams and wonder, inviting the viewer to reflect on the magic of preserving life’s most enchanting moments.",
      title: "Bottled Celestial Reverie",
      date: "2020"
    },
    {
      src: sunsetWater,
      description:
        "Embers of Dusk is a masterful watercolor that captures the fleeting magic of twilight. Warm hues of orange, yellow, and pink blend seamlessly into a radiant sky, evoking the gentle glow of a setting sun. The shimmering water below reflects this burst of color, adding depth and a tranquil sense of motion. In the foreground, dark silhouettes provide a striking contrast, grounding the luminous scene and inviting quiet introspection. This painting celebrates the ephemeral dance of light and shadow at dusk, offering viewers a moment of serene contemplation and the beauty of nature’s ever-changing palette",
      title: "Embers of Dusk",
      date: "2020"
    }
  ],
  sketch: [
    {
      src: lion,
      description:
        "This pencil sketch captures the majestic lion in a moment of contemplative power. The artist’s precise, delicate strokes reveal the subtle interplay of light and shadow that brings the creature’s regal mane and penetrating gaze to life. Each line is imbued with a sense of both raw strength and quiet introspection, inviting the viewer to linger on the noble expression and the inherent dignity of nature’s sovereign. 'Sovereign Silence' is an evocative meditation on the balance between ferocity and calm—a timeless portrait of a king at rest.",
      title: "Sovereign Silence",
      date: "2024"
    },
    {
      src: nature,
      description:
        "Whispers of Growth is an elegant pencil sketch on canvas that captures nature’s quiet dialogue with time. Intricately detailed leaves gently stretch upward, symbolizing resilience and the tender emergence of life. The artist’s delicate shading and nuanced textures create a soft interplay of light and shadow, lending the work a serene, almost ethereal quality. Against a subtle, textured background, the finely rendered foliage speaks of both transient beauty and enduring strength, inviting the viewer to pause and reflect on nature’s silent, graceful evolution.",
      title: "Whispers of Growth",
      date: "2023"
    },
    {
      src: captive,
      description:
        "In this evocative pencil sketch, a solitary foot is ensnared by unyielding chains and pressed against a massive, oppressive orb. The intricate interplay of shading and fine lines captures not only the physical restraint but also the emotional burden of confinement. The heavy ball serves as a potent symbol—representing the relentless force of fate or societal pressure—while the bound foot embodies vulnerability and defiant perseverance. Together, these elements invite the viewer to reflect on themes of oppression, the cost of restraint, and the enduring resilience of the human spirit in the face of overwhelming adversity.",
      title: "Bound Under the Weight of Fate",
      date: "2025"
    },
    {
      src: hand,
      description:
        "This pencil sketch exquisitely captures a moment of intimate connection as two hands gently interlace. Every delicate line and nuanced shade brings out the natural curvature of the fingers, symbolizing both vulnerability and strength. The interlocked fingers evoke a universal language of unity and support—an enduring embrace that speaks of shared understanding and quiet resilience. The drawing invites viewers to pause and reflect on the beauty of human connection, where a simple gesture becomes a powerful testament to love and solidarity.",
      title: "Interlocked Heartbeats",
      date: "2024"
    },
    {
      src: still,
      description:
        "In this evocative pencil sketch, everyday objects transform into a quiet visual sonnet. A humble jar and a scattering of spoons emerge through a delicate interplay of light and shadow, each rendered with subtle precision. The balanced composition and soft gradations invite the viewer to pause and reflect on the understated beauty of the moment—where the ordinary whispers its timeless story, and simplicity resonates with profound serenity.",
      title: "Serenade of Shadows",
      date: "2024"
    },
    {
      src: still_1,
      description:
        "In this evocative pencil sketch, everyday objects emerge as poetic echoes of quiet beauty. The still life drawing transforms mundane items into a contemplative tableau through delicate pencil strokes and refined shading. A subtle play of light and shadow reveals intricate textures and forms, inviting the viewer to pause and appreciate the silent narrative woven by ordinary elements. Each mark speaks to a moment of stillness, capturing the serene interplay between simplicity and depth.",
      title: " Whispers of the Ordinary: A Still Life Drawing",
      date: "2024"
    },
    {
      src: architecture,
      description:
        "This pencil sketch captures the solemn majesty of time-worn columns that echo stories of ancient architecture. With each delicate line and subtle gradation of shading, the drawing transforms the rigid structure into a living narrative of history and memory. The interplay of light and shadow highlights the textured surfaces and intricate details, inviting the viewer to contemplate the silent dialogue between past and present. As a carefully rendered pencil sketch, the work not only demonstrates technical finesse but also evokes a reflective, almost meditative, mood that transcends the mere depiction of stone.",
      title: "Eternal Columns: Whispers of Time",
      date: "2024"
    },
    {
      src: daffodils,
      description:
        "In 'Ephemeral Whispers', delicate graphite strokes capture the quiet dialogue between light and shadow. The still life, composed of everyday objects rendered with careful precision, transforms the mundane into a poetic scene of fleeting beauty. Each subtle line and soft tonal transition invites the viewer into a serene contemplation of impermanence and the gentle interplay of textures, evoking a sense of nostalgia and introspection.",
      title: "Ephemeral Whispers",
      date: "2024"
    },
    {
      src: life,
      description:
        "In Sparrow’s Solace, a tender pencil sketch captures a fleeting moment of resilience amid life’s inherent fragility. A small bird—its delicate form rendered in subtle, meticulous strokes—perches on an aged tap, fixated on a single droplet poised to fall. This simple yet evocative image serves as a powerful metaphor: the droplet, a vital yet transient drop of water, mirrors our own unquenchable thirst for meaning and sustenance in the face of impermanence. The interplay between deep, contemplative shading and gentle highlights imbues the work with both melancholy and hope, inviting the viewer to reflect on how even the smallest gestures of life can carry profound significance.",
      title: "Sparrow’s Solace",
      date: "2024"
    },
    {
      src: rope,
      description:
        "Ties That Bind is a captivating pencil sketch that eloquently captures the essence of human connection. Every intricately rendered line and shadow plays a vital role in conveying the strength and subtle complexity of relationships. The intertwined forms, reminiscent of a delicately knotted rope, symbolize both the resilience and the vulnerability inherent in our bonds. With its refined shading and meticulous detail, the artwork invites viewers to reflect on the profound ways in which our lives are interwoven, celebrating the unseen threads that unite us all.",
      title: "Ties That Bind",
      date: "2019"
    },
    {
      src: flower,
      description:
        "This exquisite pen sketch captures the essence of nature’s fluid beauty with its gracefully curved, intertwined leaves. The artist’s deft use of fine lines and subtle shading creates a delicate interplay between light and shadow, evoking both the fragility and strength of the natural world. Each sinuous contour is rendered with a precision that speaks to traditional botanical illustration, yet the work pulses with a poetic, almost dreamlike quality. “Sinuous Reverie” invites the viewer to pause and appreciate the quiet elegance and intricate rhythm of life as expressed through the dynamic forms of its singular botanical subject.",
      title: "Sinuous Reverier",
      date: "2021"
    },
    {
      src: chess,
      description:
        "In this evocative pencil sketch, the quiet intensity of the chessboard comes to life through masterful shading and precise line work. Each chess piece is rendered with a delicate balance of light and shadow that transforms them into silent sentinels of a timeless battle. The subtle gradations not only emphasize the three-dimensional form but also hint at the strategic interplay and unspoken tension that defines the game. “Quiet Stratagem” invites the viewer to pause, contemplate, and appreciate the refined elegance and intellectual depth inherent in every move, making it a visual ode to the art of chess.",
      title: "Quiet Stratagem",
      date: "2020"
    },
    {
      src: tulip,
      description:
        "A delicate yet striking pencil sketch capturing the quiet elegance of a tulip in its early bloom. The soft gradients and precise shading breathe life into the petals, while the carefully rendered leaves add depth and movement. The monochrome palette enhances the timeless beauty of nature, evoking a sense of serenity and quiet admiration. This piece is a testament to the artist's skill in translating organic grace onto paper, turning a simple flower into a poetic visual symphony.",
      title: "Ethereal Bloom",
      date: "2024"
    },
    {
      src: interior,
      description:
        "'Luminescence in Stillness' is a contemplative pencil sketch that transforms a modest interior scene into a quiet meditation on light and space. In this work, a solitary desk lamp casts a soft, diffused glow onto a humble table and an unoccupied chair, each rendered with deliberate, delicate strokes. The careful gradation of tones and the subtle interplay of shadows evoke both intimacy and timelessness, inviting the viewer to pause and savor the everyday beauty hidden in ordinary objects. The composition’s minimalist elegance and refined textures celebrate the fleeting moments of calm and introspection that arise in our daily surroundings.",
      title: "Luminescence in Stillness",
      date: "2023"
    }
  ],
  "crafts and models": [
    {
      src: line_1,
      description:
        "This artwork represents a transformative journey from nature’s organic patterns to structured resonance. Beginning with a dot composition inspired by a traced image, the piece evolves through layers of interpretation—first into a rhythmic line composition and then into a three-dimensional resonance structure. The delicate balance between negative space, depth, and materiality breathes life into the abstracted form. Through meticulous placement of bamboo sticks in a cork sheet, the artwork captures the tension between order and randomness, precision and spontaneity, echoing the fluidity of nature within a structured framework.",
      title: "Echoes of Line",
      date: "2024"
    },
    {
      src: dot,
      description:
        "Inspired by nature’s intricate patterns, this artwork embarks on a transformative journey from observation to abstraction. Beginning with a traced image, the composition evolves into a delicate arrangement of dots, capturing the organic essence of the source. Through meticulous craftsmanship, bamboo sticks emerge from a cork sheet, shaping a dynamic 3D representation of negative space. The interplay of absence and presence invites the viewer to explore the unseen, where light and shadow redefine the perception of depth and structure. This piece stands as a testament to the harmony between natural inspiration and geometric precision.",
      title: "Void and Form: A Dialogue in Dots",
      date: "2024"
    },
    {
      src: emotion,
      description:
        "'Incarnate Anxiety' is a dynamic, abstract manifestation that transforms the ephemeral weight of inner turmoil into a striking tangible form. The work’s fragmented planes and interlocking contours create a visual symphony of tension and restless energy. Jagged lines and overlapping surfaces seem to pulse with an inner rhythm—a subtle, almost imperceptible heartbeat that echoes the relentless barrage of anxious thoughts. Shadows and stark contrasts interweave with delicate, almost translucent layers, inviting the viewer to trace the elusive boundaries between chaos and order. Each element, though disjointed at first glance, converges to form a coherent narrative of vulnerability and strength, offering a visceral representation of anxiety rendered in physical space. The piece compels us to confront the paradoxical beauty found in moments of emotional disarray, ultimately reminding us that even the most intangible of feelings can be given form and presence.",
      title: "Incarnate Anxiety",
      date: "2024"
    },
    {
      src: brain,
      description:
        "'The Watchful Gaze' is a raw and evocative clay sculpture that delves into the deep psychological struggle of social anxiety and self-perception. The central brain-like mass, intricately textured with organic folds, symbolizes the overactive mind—anxiously constructing the illusion that every movement, every thought, is under scrutiny. Surrounding this core, hovering orbs with hollowed-out centers evoke an eerie sense of omnipresence—silent spectators looming, watching, and waiting. The twisted, rope-like strands tethering them to the mind represent the inescapable cycle of self-doubt and hyper-awareness, pulling the psyche deeper into its own web of fear. As the brain seeks refuge, trying to bury itself within the clay, it reflects the universal impulse to retreat, to disappear from judgmental eyes. This piece powerfully captures the weight of imagined perceptions and the burden of an anxious mind.",
      title: " The Watchful Gaze",
      date: "2024"
    },
    {
      src: penholder,
      description:
        "'Ephemeral Reverie' is a delicate testament to the transient beauty of handmade art. Crafted from humble tissue and adhesive, this vase transcends its modest materials, embodying a quiet elegance and vulnerability. Its subtle textures and graceful contours evoke the fleeting nature of a blossom in mid-bloom, inviting viewers to pause and reflect on the impermanence of life. Every careful fold and layered detail speaks to an artful balance between fragility and resilience, turning the everyday into a poignant narrative of transformation and delicate strength.",
      title: "Ephemeral Reverie",
      date: "2022"
    },
    {
      src: chess_1,
      description:
        "In 'Terra’s Gambit: A Symphony in Clay,' every chess piece becomes a poetic embodiment of the earth’s enduring spirit and artistic ingenuity. Hand-molded from raw clay, each piece carries a tactile narrative—an interplay of robust form and delicate finesse reminiscent of nature’s own balance. The set invites its beholder to consider the timeless dance between strategy and spontaneity, where every move echoes the ancient whispers of the earth and the subtle cadence of artistic expression.This title and description aim to celebrate both the elemental material and the thoughtful craftsmanship that transforms everyday clay into an arena of creative contest.",
      title: "Terra’s Gambit: A Symphony in Clay",
      date: "2025"
    }
  ]
};

const Art = () => {
  const [activeTab, setActiveTab] = useState("sketch");
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const containerRef = useRef(null);
  const modalRef = useRef(null);
  const touchStartY = useRef(0);
  const touchCurrentY = useRef(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%"
        }
      }
    );
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  const closeDetails = useCallback(() => setSelectedArtwork(null), []);
  const currentArtworks = useMemo(() => {
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    return artworksData[activeTab]?.slice(indexOfFirst, indexOfLast) || [];
  }, [activeTab, currentPage]);
  const totalPages = useMemo(
    () => Math.ceil((artworksData[activeTab]?.length || 0) / itemsPerPage),
    [activeTab]
  );
  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1);
    artworksData[tabId].forEach((art) => {
      const img = new Image();
      img.src = art.src;
    });
  }, []);
  const artworkHover = useCallback((e) => {
    const art = e.target.closest(".artwork");
    gsap.to(art, { scale: 1.1, rotation: 5, duration: 0.3, ease: "power2.out" });
  }, []);
  const artworkHoverOut = useCallback((e) => {
    const art = e.target.closest(".artwork");
    gsap.to(art, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.out" });
  }, []);
  const openModal = useCallback((art) => {
    setSelectedArtwork(art);
    gsap.fromTo(
      ".modal-content",
      { opacity: 0, scale: 0.8, y: -50 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }
    );
  }, []);
  const closeModal = useCallback(() => {
    gsap.to(".modal-content", {
      opacity: 0,
      scale: 0.8,
      y: 50,
      duration: 0.3,
      ease: "back.in(1.7)",
      onComplete: () => setSelectedArtwork(null)
    });
  }, []);
  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);
  const handleTouchMove = useCallback((e) => {
    touchCurrentY.current = e.touches[0].clientY;
    const deltaY = touchCurrentY.current - touchStartY.current;
    if (deltaY > 0) gsap.to(modalRef.current, { y: deltaY, duration: 0.1 });
  }, []);
  const handleTouchEnd = useCallback(() => {
    const deltaY = touchCurrentY.current - touchStartY.current;
    if (deltaY > 150) closeModal();
    else gsap.to(modalRef.current, { y: 0, duration: 0.3, ease: "back.out(1.7)" });
  }, [closeModal]);
  useEffect(() => {
    gsap.fromTo(
      ".artwork",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".artwork",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);
  const paginate = useCallback((pageNumber) => setCurrentPage(pageNumber), []);
  return (
    <section className="relative bg-gradient-to-b from-[#1D3557] via-[#2A1B3D] to-[#F5F8CC] p-8 sm:p-12 md:p-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1D3557] via-[#2A1B3D] to-[#F5F8CC] opacity-70 backdrop-blur-[10px] shadow-2xl"></div>
      <div className="container relative z-10 px-4 sm:px-6 lg:px-20 mx-auto" ref={containerRef}>
        <div className="mb-12 sm:mb-20 text-center">
          <h1 className="text-5xl sm:text-7xl font-heading font-extrabold text-[#F5F8CC] tracking-widest drop-shadow-xl">
            Exquisite Artistry
          </h1>
          <p className="mt-4 sm:mt-6 text-lg sm:text-2xl text-[#F1C0E8] font-description opacity-90">
            A curated collection of artworks, meticulously crafted to inspire and engage through emotion and creativity.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-12 sm:mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-2 px-6 sm:py-3 sm:px-10 text-base sm:text-xl font-heading rounded-full border-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md hover:border-[#F5F8CC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F5F8CC] ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[#F5F8CC] to-[#FDE4CF] text-[#2A1B3D] border-[#F5F8CC]"
                  : "bg-transparent text-[#F5F8CC] border-[#F5F8CC]"
              }`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="text-center text-[#F5F8CC] mb-8 sm:mb-16 text-base sm:text-xl font-description">
          {tabs.find((tab) => tab.id === activeTab)?.description}
        </div>
        <div className="grid grid-cols-1 gap-8 sm:gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {currentArtworks.map((art, index) => (
            <div
              key={index}
              className="artwork group"
              onClick={() => openModal(art)}
              onMouseEnter={artworkHover}
              onMouseLeave={artworkHoverOut}
            >
              <Tilt options={{ max: 15, scale: 1.02, speed: 900 }} className="relative w-full h-[300px] sm:h-[400px] bg-transparent backdrop-blur-lg bg-opacity-30 p-4 sm:p-8 rounded-3xl shadow-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:opacity-90">
                <LazyLoadImage
                  src={art.src}
                  alt={art.description}
                  className="object-cover w-full h-full transition-all duration-500 transform rounded-xl group-hover:scale-110 group-hover:rotate-3"
                  loading="lazy"
                  placeholderSrc={art.placeholderSrc}
                />
                <div className="absolute text-white bottom-3 left-3 sm:bottom-5 sm:left-5">
                  <h3 className="text-lg sm:text-2xl font-heading font-semibold">{art.title}</h3>
                  <p className="text-sm sm:text-lg font-description">{art.date}</p>
                </div>
              </Tilt>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8 sm:mt-16">
          <div className="flex items-center gap-4 sm:gap-6">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => paginate(idx + 1)}
                className={`text-sm sm:text-lg font-medium font-description px-3 sm:px-4 py-1 sm:py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-[#F5F8CC] hover:text-[#2A1B3D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F5F8CC] ${
                  currentPage === idx + 1 ? "bg-[#F5F8CC] text-[#2A1B3D]" : "bg-transparent text-[#F5F8CC]"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
        {selectedArtwork && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            onClick={closeModal}
          >
            <div
              ref={modalRef}
              className="bg-gradient-to-r from-lemon_chiffon to-tea_rose p-4 sm:p-6 md:p-12 rounded-3xl relative w-full sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-7/12 max-h-[90vh] overflow-auto shadow-3xl transform transition-all duration-500 ease-in-out animate-fade-in opacity-90"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <button
                className="absolute top-4 sm:top-6 right-4 sm:right-6 font-heading text-3xl sm:text-xl font-extrabold transition-all duration-300 ease-in-out transform text-deep_indigo hover:text-electric_blue hover:scale-110 focus:outline-none"
                onClick={closeModal}
              >
                &times;
              </button>
              <LazyLoadImage
                src={selectedArtwork.src}
                alt={selectedArtwork.description}
                className="object-contain w-full h-full max-h-[40vh] mb-4 sm:mb-8 rounded-xl border-4 border-transparent"
                loading="lazy"
                placeholderSrc={selectedArtwork.placeholderSrc}
              />
              <div className="mt-4 sm:mt-6 text-center">
                <h2 className="font-heading text-2xl sm:text-2xl font-extrabold text-deep_indigo mb-2 sm:mb-3 tracking-wide transition-colors duration-300 ease-in-out">
                  {selectedArtwork.title}
                </h2>
                <p className="max-w-md sm:max-w-4xl px-2 sm:px-4 mx-auto mb-4 sm:mb-6 text-base sm:text-xl font-medium font-description leading-relaxed text-deep_indigo opacity-90">
                  {selectedArtwork.description}
                </p>
                <p className="text-sm sm:text-lg font-medium font-description text-[#A7A6B0] uppercase tracking-widest">
                  {selectedArtwork.date}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default React.memo(Art);
