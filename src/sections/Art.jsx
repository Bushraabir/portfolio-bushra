import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Tilt from "react-parallax-tilt";

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

const tabs = [
  { id: "sketch", title: "Sketch", description: "Detailed and intricate pencil sketches." },
  { id: "acrylic", title: "Acrylic", description: "Vibrant and textured acrylic art pieces." },
  { id: "watercolor", title: "Watercolor", description: "Soft, flowing watercolor creations." },
  { id: "crafts and models", title: "Crafts & Models", description: "Handmade crafts and models." },
  { id: "modeling", title: "Modeling", description: "Digital and physical models." },
  { id: "illustration", title: "Illustration", description: "Creative illustrations." },
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
        "'Winter's Veiled Whispers' is an evocative acrylic canvas painting that transports the viewer into a realm of ethereal mystery. A delicate mist shrouds a silent, ancient forest, where gnarled trees emerge as ghostly silhouettes against a subdued, wintry palette. Soft gradations of light and shadow interplay with the diffuse haze, suggesting the fleeting secrets of nature hidden beneath the frost. The work invites quiet contemplation, as if nature herself is whispering forgotten tales of endurance and solitude, leaving an indelible impression of winter’s enigmatic beauty.",
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
        "This acrylic painting captures the timeless beauty of the Blue Mosque, bathed in the soft glow of the setting sun. The towering minarets reach towards the heavens, mirrored gracefully in the tranquil waters below. Delicate brushstrokes bring depth to the sky, where drifting clouds add to the dreamlike atmosphere. The interplay of blues and golden hues evokes a sense of peace and reverence, inviting the viewer to pause and admire the harmony of architecture and nature.",
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
        "This acrylic canvas painting blossoms with the radiant promise of human potential, rendered through the evocative form of a flower. At first glance, its vibrant petals—delicately unfurling in a dynamic interplay of light and color—suggest the tender emergence of a new self. Yet, woven into each stroke is an abstract echo of the human spirit: fragile yet resolute, constantly evolving and reaching toward the infinite. The painting invites viewers to contemplate that every individual, much like this blooming flower, carries within a seed of transformative possibility. Subtle gradations of hue and the interplay of luminous highlights with soft shadows evoke both the transient beauty of life and the enduring capacity for growth and renewal.",
      title: "Floral Genesis: The Unfolding of Self",
      date: "2017"
    },
    {
      src: Sunset,
      description:
        "This acrylic canvas is a visual meditation on transformation. At first glance, the deep, muted hues evoke a lingering twilight—a symbolic night where life’s darker moments seem to prevail. Yet, as the eye travels across the scene, gentle streaks of luminous color emerge, gradually overpowering the somber tones. The interplay of shadow and light suggests that no darkness is permanent; rather, it is the quiet prelude to an inevitable awakening. With fluid brushstrokes that capture both stillness and the promise of motion, the painting invites viewers to reflect on the resilience of nature—and by extension, the human spirit—reminding us that even in our most challenging hours, dawn is always on the horizon.",
      title: "Eternal Dawn: When Shadows Surrender",
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
      title: "Whispers of the Ordinary: A Still Life Drawing",
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
      title: "Sinuous Reverie",
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
        "'Incarnate Anxiety' is a dynamic, abstract manifestation that transforms the ephemeral weight of inner turmoil into a striking tangible form. The work’s fragmented planes and interlocking contours create a visual symphony of tension and restless energy. Jagged lines and overlapping surfaces seem to pulse with an inner rhythm—a subtle, almost imperceptible heartbeat that echoes the relentless barrage of anxious thoughts. Shadows and stark contrasts interweave with delicate, almost translucent layers, inviting the viewer to trace the elusive boundaries between chaos and order. Each element, though disjointed at first glance, converges to form a coherent narrative of vulnerability and strength, offering a visceral representation of anxiety rendered in physical space.",
      title: "Incarnate Anxiety",
      date: "2024"
    },
    {
      src: brain,
      description:
        "'The Watchful Gaze' is a raw and evocative clay sculpture that delves into the deep psychological struggle of social anxiety and self-perception. The central brain-like mass, intricately textured with organic folds, symbolizes the overactive mind—anxiously constructing the illusion that every movement, every thought, is under scrutiny. Surrounding this core, hovering orbs with hollowed-out centers evoke an eerie sense of omnipresence—silent spectators looming, watching, and waiting. The twisted, rope-like strands tethering them to the mind represent the inescapable cycle of self-doubt and hyper-awareness, pulling the psyche deeper into its own web of fear.",
      title: "The Watchful Gaze",
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
        "In 'Terra’s Gambit: A Symphony in Clay,' every chess piece becomes a poetic embodiment of the earth’s enduring spirit and artistic ingenuity. Hand-molded from raw clay, each piece carries a tactile narrative—an interplay of robust form and delicate finesse reminiscent of nature’s own balance. The set invites its beholder to consider the timeless dance between strategy and spontaneity, where every move echoes the ancient whispers of the earth and the subtle cadence of artistic expression.",
      title: "Terra’s Gambit: A Symphony in Clay",
      date: "2025"
    }
  
  
  ],
  modeling: [
        {
          src: can,
          title: "A Digital Rhapsody",
          description:
            "A visionary exploration that fuses the precision of digital rendering with the soul of handcrafted narrative. Developed in Blender and enriched by meticulously crafted labels in Illustrator, the artwork presents a harmonious still life where industrial elements—weathered cans, rustic wooden blocks, and textured stone—are bathed in soft, ambient light. The overlaid annotations serve as poetic whispers, inviting the viewer to unravel hidden layers of meaning and engage in a dialogue between form and sentiment. This piece is a celebration of the convergence between modern technology and traditional artistic expression, offering a dynamic interplay of structure and spontaneity that captures the ephemeral essence of creative thought.",
          medium: "Blender, Adobe Illustrator",
          date: "2023"
        },
        {
          src: ship,
          title: "Nebular Vessel: Beacon of Life",
          description:
            "A visionary sci‑fi creation rendered in Blender, where art meets cosmic aspiration. The spaceship’s transparent, glass-like hull houses a series of delicate glass containers, each cradling a luminous core that symbolizes the spark of life. This radiant element is portrayed as the essence of human hope—a beacon destined to ignite new worlds. The interplay of reflective surfaces and ethereal light creates an atmosphere of wonder and possibility, embodying the belief that humanity will one day venture into the unknown, carrying the seeds of life across the cosmos. This piece not only celebrates technical mastery and innovative design but also encapsulates a profound narrative of exploration, renewal, and the infinite potential of life beyond Earth.",
          medium: "Blender",
          date: "2023"
        }
  ],
  illustration: [
        {
          src: kingdom,
          title: "Abyssal Dominion",
          description:
            "In the shadowy depths where the ocean conceals forgotten legends, Abyssal Dominion emerges as a surreal kingdom shrouded in mystery. This illustration invites viewers into an underworld where ethereal blues and haunting pinks converge to reveal a realm of lost majesty. Amid the silent sway of submerged ruins and the ghostly luminescence of hidden treasures, the artwork tells a story of decay interwoven with regal splendor. Every brushstroke hints at ancient secrets and the enigmatic power of a kingdom that thrives beneath the crushing weight of the deep ocean. These ideas were inspired by themes found in modern reinterpretations of mythic underwater worlds, blending the allure of the unknown with a narrative of regality and mystery.",
          medium: "Photoshop, Illustrator",
          date: "2023"
        },
        {
          src: warrior,
          title: "Crimson Valor: The Spirit of Liberation",
          description:
            "This Adobe Illustrator artwork stands as a vivid tribute to the bravery of Bengali freedom fighters during the Liberation War. By reimagining the Bangladesh flag as a resolute, character-like emblem armed with a rifle, the piece powerfully blends modern digital aesthetics with profound national symbolism. The bold incorporation of the nation's map within a red circle further evokes an enduring spirit of sacrifice and unity, celebrating a pivotal moment in history.",
          medium: "Adobe Illustrator",
          date: "2023"
        },
        {
          src: buet,
          title: "Serenity In Structure",
          description:
            "This Adobe Illustrator artwork beautifully captures the iconic BUET Architecture Building and the serene bench in front of it. The organic, free-flowing frame blends nature with structural elements, reflecting the harmony between design and environment. The textured rocks, lush greenery, and modern facade create a visual balance, symbolizing the fusion of tradition and innovation in architectural education. The stylized approach adds an artistic depth, making this piece not just a depiction but a tribute to BUET’s architectural legacy.",
          medium: "Adobe Illustrator",
          date: "2023"
        },
        {
          src: laran,
          title: "Monsoon Whisper: The Kadam Bloom",
          description:
            "Inspired by the timeless allure of the Kadam flower—a cherished symbol in Bengali culture—this digital creation celebrates nature’s ephemeral poetry amid the monsoon. In this work, soft luminescence meets the rhythmic pulse of rain. The Kadam bloom unfurls gracefully as if in whispered dialogue with the monsoon’s gentle cascade. Rich, luminous hues mingle with delicate misty textures, evoking a serene dreamscape where tradition and modern digital technique coexist. Every petal and droplet hints at the fleeting beauty of life—a visual hymn of renewal and nostalgic longing for rain-soaked afternoons. The piece invites viewers to pause, reflect, and lose themselves in a moment of natural wonder and cultural reverie.",
          medium: "Digital",
          date: "2022"
        },
        {
          src: logo,
          title: "Symphony of Imagination",
          description:
            "A vibrant fusion of creativity and self-expression, this is the official logo for the 'Eyes on Talent' Facebook page and group. It seamlessly intertwines the fluid brushstrokes of painting, the captivating lens of photography, and the melodic curves of music. Designed to embody the spirit of a community where students and individuals of all ages showcase their talents and creativity, this logo invites everyone to join a celebration of artistic exploration and innovation.",
          medium: "Adobe Photoshop",
          date: "2021"
        },
        {
          src: birth,
          title: "Eternal Flame of Independence",
          description:
            "A heartfelt tribute crafted to celebrate the birthday of the Father of the Nation, Bangabandhu Sheikh Mujibur Rahman. This piece merges a dignified portrait with a mosaic of smaller images, symbolizing the collective memory and unity he ignited in Bangladesh. Warm hues and overlapping visuals highlight his enduring legacy, capturing the spirit of resilience, liberation, and hope that continues to guide the nation forward.",
          medium: "Adobe Photoshop",
          date: "2021"
        },
        {
          src: independence,
          title: "Crimson Echoes of Sacrifice",
          description:
            "A dynamic tribute honoring the blood and sacrifice of countless Bangalees who paved the path to freedom. Bold splashes of red and green evoke the national spirit, while powerful imagery and dramatic textures capture the relentless courage and resilience of a people united in their quest for independence. This artwork stands as a heartfelt homage to the enduring legacy of sacrifice and valor that continues to inspire.",
          medium: "Adobe Illustrator",
          date: "2021"
        }
  ],
};

const tabColors = {
  sketch: { from: "#1d3557", to: "#a3c4f3" },
  acrylic: { from: "#2a1b3d", to: "#cfbaf0" },
  watercolor: { from: "#f1c0e8", to: "#ffcfd2" },
  "crafts and models": { from: "#fde4cf", to: "#fbf8cc" },
  modeling: { from: "#1d3557", to: "#90dbf4" },
  illustration: { from: "#2a1b3d", to: "#f1c0e8" },
};

const Art = () => {
  const [activeTab, setActiveTab] = useState("sketch");
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
    setSelectedArtwork(null);
  }, []);

  const openModal = useCallback((art) => {
    setSelectedArtwork(art);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedArtwork(null);
  }, []);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.1 } },
    exit: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  };

  const modalVariants = {
    hidden: { scale: 0.5, opacity: 0, y: -30 },
    visible: { scale: 1, opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
    exit: { scale: 0.5, opacity: 0, y: 30, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const handleNext = useCallback(() => {
    const currentIndex = artworksData[activeTab].findIndex((art) => art.src === selectedArtwork.src);
    const nextIndex = (currentIndex + 1) % artworksData[activeTab].length;
    setSelectedArtwork(artworksData[activeTab][nextIndex]);
  }, [activeTab, selectedArtwork]);

  const handlePrev = useCallback(() => {
    const currentIndex = artworksData[activeTab].findIndex((art) => art.src === selectedArtwork.src);
    const prevIndex = (currentIndex - 1 + artworksData[activeTab].length) % artworksData[activeTab].length;
    setSelectedArtwork(artworksData[activeTab][prevIndex]);
  }, [activeTab, selectedArtwork]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedArtwork) return;
      if (e.key === "ArrowRight") handleNext();
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedArtwork, handleNext, handlePrev, closeModal]);

  useEffect(() => {
    if (selectedArtwork && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [selectedArtwork]);

  return (
    <section className="relative p-6 sm:p-10 md:p-14 lg:p-20 min-h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-75 backdrop-blur-lg"
        animate={{ background: `linear-gradient(135deg, ${tabColors[activeTab].from} 0%, ${tabColors[activeTab].to} 100%)` }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      <div className="container relative z-10 px-4 sm:px-8 lg:px-16 xl:px-24 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-10 sm:mb-16 md:mb-24 text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white tracking-wider drop-shadow-2xl text-stroke">
            Exquisite Artistry
          </h1>
          <p className="mt-3 sm:mt-5 md:mt-7 text-base sm:text-lg md:text-xl lg:text-2xl text-white font-description opacity-90 leading-relaxed">
            A curated collection of artworks, crafted to inspire and engage.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 md:gap-8 mb-10 sm:mb-14 md:mb-20" role="tablist">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              onClick={() => handleTabChange(tab.id)}
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 15px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`relative py-2 px-5 sm:py-3 sm:px-8 md:py-4 md:px-12 text-sm sm:text-base md:text-lg lg:text-xl font-heading rounded-full overflow-hidden focus:outline-none focus:ring-4 focus:ring-offset-2 ${
                activeTab === tab.id
                  ? "text-white shadow-xl"
                  : "bg-transparent text-white border-2 border-white hover:border-lemon_chiffon hover:text-lemon_chiffon"
              }`}
              style={{
                background: activeTab === tab.id
                  ? `linear-gradient(to right, ${tabColors[tab.id].from}, ${tabColors[tab.id].to})`
                  : "transparent",
              }}
            >
              <motion.span
                className="absolute inset-0"
                initial={{ x: "-100%" }}
                animate={{ x: activeTab === tab.id ? 0 : "-100%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{
                  background: `linear-gradient(to right, ${tabColors[tab.id].from}80, ${tabColors[tab.id].to}80)`,
                  opacity: 0.3,
                }}
              />
              <span className="relative z-10">{tab.title}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id={`panel-${activeTab}`}
            role="tabpanel"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
          >
            <Swiper
              modules={[Navigation, EffectCoverflow]}
              effect="coverflow"
              grabCursor
              centeredSlides
              slidesPerView={1}
              coverflowEffect={{
                rotate: 0,
                stretch: 20,
                depth: 400,
                modifier: 1,
                slideShadows: false,
              }}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="mySwiper"
            >
              {artworksData[activeTab].map((art) => (
                <SwiperSlide key={art.src}>
                  <div
                    className="relative w-[400px] h-auto sm:h-[300px] md:h-[400px] rounded-3xl cursor-pointer border-4 border-white shadow-lg"
                    tabIndex={0}
                    role="button"
                    aria-label={`View ${art.title}`}
                    onClick={() => openModal(art)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") openModal(art);
                    }}
                  >
                    <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={2000}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full h-full"
                      >
                        <LazyLoadImage
                          src={art.src}
                          alt={art.title}
                          className="object-contain w-full h-full rounded-3xl"
                          loading="lazy"
                          effect="blur"
                        />
                      </motion.div>
                    </Tilt>
                    <div className="absolute bottom-4 left-4 right-4 bg-deep_indigo bg-opacity-70 p-2 rounded-lg text-lemon_chiffon">
                      <h3 className="text-base sm:text-lg md:text-xl font-subheading font-semibold">
                        {art.title}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base font-description">{art.date}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {selectedArtwork && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4 sm:p-6 md:p-8"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={closeModal}
            >
              <motion.div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                className="relative bg-gradient-to-br from-lemon_chiffon to-champagne_pink p-6 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
                variants={modalVariants}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                onDragEnd={(e, { offset, velocity }) => {
                  if (offset.y > 150 || velocity.y > 500) closeModal();
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  ref={closeButtonRef}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-deep_indigo text-white flex items-center justify-center text-2xl hover:scale-110 transition-transform duration-300 focus:outline-none"
                  onClick={closeModal}
                  aria-label="Close modal"
                  variants={itemVariants}
                >
                  ×
                </motion.button>

                <motion.div className="flex flex-col items-center" variants={itemVariants}>
                  <motion.div className="mb-6 w-full" variants={itemVariants}>
                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                      <LazyLoadImage
                        src={selectedArtwork.src}
                        alt={selectedArtwork.title}
                        className="object-contain w-full h-auto max-h-[50vh] rounded-xl border-4 border-deep_indigo"
                        loading="lazy"
                        effect="blur"
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div className="text-center" variants={itemVariants}>
                    <motion.h2
                      className="font-heading text-3xl md:text-4xl font-extrabold text-deep_indigo mb-3 tracking-wide"
                      variants={itemVariants}
                    >
                      {selectedArtwork.title}
                    </motion.h2>
                    <motion.p
                      className="max-w-2xl mx-auto mb-4 text-base md:text-lg font-medium font-description leading-relaxed text-deep_indigo opacity-90"
                      variants={itemVariants}
                    >
                      {selectedArtwork.description}
                    </motion.p>
                    <motion.p
                      className="text-sm md:text-base font-medium font-description text-jordy_blue uppercase tracking-widest"
                      variants={itemVariants}
                    >
                      {selectedArtwork.date}
                    </motion.p>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-deep_indigo bg-opacity-50 hover:bg-opacity-70 text-white flex items-center justify-center text-2xl transition-transform duration-300 focus:outline-none"
                aria-label="Previous artwork"
                variants={itemVariants}
              >
                ←
              </motion.button>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-deep_indigo bg-opacity-50 hover:bg-opacity-70 text-white flex items-center justify-center text-2xl transition-transform duration-300 focus:outline-none"
                aria-label="Next artwork"
                variants={itemVariants}
              >
                →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default React.memo(Art);