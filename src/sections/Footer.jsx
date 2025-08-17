"use client";

import { motion } from "framer-motion";
import { Helmet } from "react-helmet"; // Helmet for SEO metadata
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaGithub,
  FaMedium,
} from "react-icons/fa";

/**
 * Footer Component
 * 
 * - Responsive footer with animated gradient background
 * - Contains author branding, description, and social links
 * - SEO-optimized with Helmet metadata
 * - Accessible with aria-labels & semantic HTML
 * - Interactive hover effects for links
 */
export default function Footer() {
  return (
    <>
      {/* Helmet for SEO meta tags */}
      <Helmet>
        <title>Bushra Khandoker | Innovator & Thinker</title>
        <meta
          name="description"
          content="Bushra Khandoker - A dreamer, innovator, and renaissance thinker passionately exploring the world. Connect via social links, GitHub, Medium, and more."
        />
        <meta
          name="keywords"
          content="Bushra Khandoker, innovator, dreamer, thinker, GitHub, Medium, Instagram, Facebook, WhatsApp, portfolio"
        />
        <meta name="author" content="Bushra Khandoker" />
        <meta property="og:title" content="Bushra Khandoker | Innovator & Thinker" />
        <meta
          property="og:description"
          content="A dreamer, trailblazing innovator, and renaissance thinker. Connect with Bushra across social platforms."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-portfolio-url.com/" />
        <meta property="og:image" content="https://your-portfolio-url.com/preview.jpg" />
        <link rel="canonical" href="https://your-portfolio-url.com/" />
      </Helmet>

      <footer
        className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 relative overflow-hidden"
        role="contentinfo"
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 opacity-20 animate-gradient-move" />

        {/* Main Footer Content */}
        <div className="relative z-10 container mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row justify-between items-center">
          {/* Branding and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h2 className="font-heading text-4xl md:text-5xl tracking-tight text-lemon_chiffon">
              Bushra Khandoker
            </h2>
            <p className="font-description text-xl md:text-2xl mt-2 max-w-md leading-relaxed">
              A dreamer, a trailblazing innovator, and a renaissance thinker,
              passionately committed to exploring the world.
            </p>
          </motion.div>

          {/* Social Media Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex space-x-8 mt-6 md:mt-0"
            aria-label="Social Media Links"
          >
            <a
              href="https://www.facebook.com/bushra.708"
              target="_blank"
              rel="noopener noreferrer"
              className="transform transition-all duration-300 hover:scale-110 hover:text-teal-300"
              aria-label="Visit Facebook profile"
            >
              <FaFacebookF size={26} />
            </a>
            <a
              href="https://www.instagram.com/bushra._.708"
              target="_blank"
              rel="noopener noreferrer"
              className="transform transition-all duration-300 hover:scale-110 hover:text-teal-300"
              aria-label="Visit Instagram profile"
            >
              <FaInstagram size={26} />
            </a>
            <a
              href="https://wa.me/8801334798878"
              target="_blank"
              rel="noopener noreferrer"
              className="transform transition-all duration-300 hover:scale-110 hover:text-teal-300"
              aria-label="Chat on WhatsApp"
            >
              <FaWhatsapp size={26} />
            </a>
            <a
              href="https://github.com/Bushraabir/"
              target="_blank"
              rel="noopener noreferrer"
              className="transform transition-all duration-300 hover:scale-110 hover:text-teal-300"
              aria-label="Visit GitHub profile"
            >
              <FaGithub size={26} />
            </a>
            <a
              href="https://medium.com/@bb3708627/"
              target="_blank"
              rel="noopener noreferrer"
              className="transform transition-all duration-300 hover:scale-110 hover:text-teal-300"
              aria-label="Read articles on Medium"
            >
              <FaMedium size={26} />
            </a>
            <a
              href="tel:+8801334798878"
              className="transform transition-all duration-300 hover:scale-110 hover:text-teal-300"
              aria-label="Call via phone"
            >
              <FaPhoneAlt size={26} />
            </a>
          </motion.nav>
        </div>

        {/* Bottom Bar */}
        <div className="relative z-10 container mx-auto px-6 py-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="font-description text-lg text-center md:text-left"
          >
            © {new Date().getFullYear()} Bushra Khandoker. All rights reserved.
          </motion.div>
          {/* Address for SEO */}
          <address className="not-italic mt-2 md:mt-0 text-sm text-gray-400 text-center md:text-right">
            Dhaka, Bangladesh | <a href="bushrakhandoker2@gmail.com" className="hover:underline">bushrakhandoker2@gmail.com</a>
          </address>
        </div>
      </footer>
    </>
  );
}
