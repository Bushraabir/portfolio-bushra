"use client";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-deep_indigo text-lemon_chiffon relative overflow-hidden opacity-80">
      <div className="absolute inset-0 bg-gradient-to-r from-electric_blue to-aquamarine opacity-20 animate-gradient-move" />
      <div className="relative z-10 container mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row justify-between items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-0 text-center md:text-left"
        >
          <h2 className="font-heading text-left  text-4xl md:text-5xl">Bushra Khandoker</h2>
          <p className="font-description text-left text-xl md:text-2xl mt-2">
          A dreamer, a trailblazing innovator and a renaissance thinker, passionately committed to explore the world
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex space-x-6"
        >
          <a
            href="https://www.facebook.com/bushra.708"
            target="_blank"
            rel="noopener noreferrer"
            className="transform transition-transform hover:scale-110"
          >
            <FaFacebookF size={24} />
          </a>
          <a
            href="https://www.instagram.com/bushra._.708"
            target="_blank"
            rel="noopener noreferrer"
            className="transform transition-transform hover:scale-110"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://wa.me/8801334798878"
            target="_blank"
            rel="noopener noreferrer"
            className="transform transition-transform hover:scale-110"
          >
            <FaWhatsapp size={24} />
          </a>
          <a
            href="tel:+8801334798878"
            className="transform transition-transform hover:scale-110"
          >
            <FaPhoneAlt size={24} />
          </a>
        </motion.div>
      </div>
      <div className="relative z-10 container mx-auto px-6 py-8 border-t border-champagne_pink-500 flex flex-col md:flex-row justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="font-description text-lg"
        >
          &copy; {new Date().getFullYear()} Bushra. All rights reserved.
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          viewport={{ once: true }}
          className="mt-4 md:mt-0 font-description text-lg"
        >
          <a
            href="tel:+8801334798878"
            className="transition-colors hover:text-tea_rose"
          >
            +8801334798878
          </a>
        </motion.div>
      </div>
      
    </footer>
  );
}
