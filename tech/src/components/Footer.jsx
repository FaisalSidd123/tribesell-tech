import React from 'react';
import { motion } from 'framer-motion';

// Shared animation constants
const ease = [0.16, 1, 0.3, 1];
const viewport = { once: true, amount: 0.3 };

export default function Footer() {
  const handleScrollTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0F0F10] border-t border-white/5 py-12 md:py-16 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.8, ease }}
        className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8"
      >
        
        {/* Left Side - Brand Logo */}
        <div className="flex flex-col items-start gap-4 text-left">
          <a
            href="#"
            onClick={handleScrollTop}
            className="flex items-center gap-2.5 text-lg font-display font-bold text-white"
          >
            <img src="/tribesell_logo.png" alt="TribeSell" className="w-7 h-7 object-contain" />
            <span>TribeSell</span>
          </a>
          <p className="text-neutral-400 text-xs max-w-xs leading-relaxed">
            Crafting premium web systems, mobile products, and high-performance brand designs.
          </p>
        </div>

        {/* Middle - Navigation */}
        <div className="flex flex-wrap gap-x-6 gap-y-4 items-center">
          <a href="#services" onClick={(e) => handleLinkClick(e, '#services')} className="text-sm md:text-xs font-semibold text-neutral-400 hover:text-white transition-colors duration-200">
            Services
          </a>
          <a href="#process" onClick={(e) => handleLinkClick(e, '#process')} className="text-sm md:text-xs font-semibold text-neutral-400 hover:text-white transition-colors duration-200">
            Process
          </a>
          <a href="#portfolio" onClick={(e) => handleLinkClick(e, '#portfolio')} className="text-sm md:text-xs font-semibold text-neutral-400 hover:text-white transition-colors duration-200">
            Portfolio
          </a>
          <a href="#testimonials" onClick={(e) => handleLinkClick(e, '#testimonials')} className="text-sm md:text-xs font-semibold text-neutral-400 hover:text-white transition-colors duration-200">
            Testimonials
          </a>
        </div>

        {/* Right Side - Socials & Copyright */}
        <div className="flex flex-col items-start md:items-end gap-4 text-left md:text-right">
          <div className="flex items-center gap-4">
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 hover:-translate-y-1 transition-all duration-200" aria-label="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 hover:-translate-y-1 transition-all duration-200" aria-label="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 hover:-translate-y-1 transition-all duration-200" aria-label="Dribbble">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.203c-.398-.105-3.11-.773-6.224-.342 1.29 3.56 1.81 6.48 1.87 6.84 2.703-1.565 4.542-4.29 4.354-6.498zm-2.928 7.848c-.085-.515-.635-3.52-1.97-7.113-5.26 1.47-7.054 4.4-7.14 4.562 2.108 1.54 4.7 2.455 7.51 2.55zm-11.588-1.26c.105-.187 2.372-4.148 7.37-5.503-.198-.48-.423-.96-.653-1.428-4.996 1.5-9.826 1.4-10.237 1.39A11.9 11.9 0 007.604 20.38zM1.31 13.064c.466.01 4.767.045 9.47-1.378a31.9 31.9 0 00-1.89-3.95A22.8 22.8 0 001.764 10.4c-.29.85-.454 1.76-.454 2.664zm2.148-4.26c4.664-1.92 6.55-4.4 6.702-4.608A11.9 11.9 0 002.39 8.163v.64zm8.685-5.46c-.198.273-2.223 3.018-6.924 4.85a34 34 0 011.826 3.652c3.48-1.127 7.037-.417 7.35-.353a28.4 28.4 0 003.54-7.596 11.9 11.9 0 00-5.79-5.553z"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 hover:-translate-y-1 transition-all duration-200" aria-label="GitHub">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
          </div>
          <p className="text-[10px] text-neutral-500">
            &copy; {new Date().getFullYear()} TribeSell. All rights reserved.
          </p>
        </div>

      </motion.div>
    </footer>
  );
}
