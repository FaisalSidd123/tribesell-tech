import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const PROJECTS = [
  {
    id: 'aerostock',
    title: 'AeroStock E-Commerce platform',
    category: 'Web Development',
    tags: ['Next.js', 'PostgreSQL', 'Stripe API'],
    image: '/portfolio_web.png',
    description: 'A high-performance e-commerce platform built for scale.',
    fullDescription: 'AeroStock is a bespoke e-commerce platform engineered for high-volume transactions. We utilized a headless architecture with Next.js and PostgreSQL to ensure sub-second page loads and seamless integration with Stripe for global payments. The system features a custom CMS and real-time inventory synchronization.',
    link: '#',
    github: '#',
  },
  {
    id: 'velo',
    title: 'Velo Wealth Management App',
    category: 'Mobile Development',
    tags: ['React Native', 'Node.js', 'Biometrics'],
    image: '/portfolio_mobile.png',
    description: 'A secure, native wealth management application.',
    fullDescription: 'Velo is a premium mobile application designed for high-net-worth individuals to track and manage their portfolios. Built with React Native, it features buttery-smooth native animations, real-time market data WebSocket integrations, and enterprise-grade biometric security for authentication.',
    link: '#',
    github: '#',
  },
  {
    id: 'solstice',
    title: 'Solstice Brand Architecture',
    category: 'Graphic Design',
    tags: ['Branding', 'Typography', 'Logo Systems'],
    image: '/portfolio_design.png',
    description: 'A complete brand identity and design system.',
    fullDescription: 'We partnered with Solstice to completely reimagine their brand identity from the ground up. This included a bespoke logo system, a custom typographic scale, and a comprehensive design system that ensures consistent brand application across all digital and physical touchpoints.',
    link: '#',
    github: '#',
  },
];

// Shared animation constants
const ease = [0.16, 1, 0.3, 1];
const viewport = { once: true, amount: 0.2 };

export default function Portfolio() {
  const [selectedId, setSelectedId] = useState(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      const handleEscape = (e) => {
        if (e.key === 'Escape') setSelectedId(null);
      };
      window.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        window.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [selectedId]);

  const selectedProject = PROJECTS.find(p => p.id === selectedId);

  return (
    <section id="portfolio" className="py-32 bg-[#0F0F10] relative z-10 overflow-hidden">

      {/* Ambient glowing wash shape */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[130px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* --- CENTERED HEADING SECTION --- */}
        <div className="flex justify-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.8, ease }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-white text-center"
          >
            Our Project Showcase.
          </motion.h2>
        </div>

        {/* --- GRID LAYOUT --- */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              layoutId={isReducedMotion ? undefined : `card-${project.id}`}
              onClick={() => setSelectedId(project.id)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, ease, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer bg-[#161618] border border-white/5 rounded-xl md:rounded-2xl overflow-hidden hover:border-brand-red/30 hover:shadow-[0_20px_50px_rgba(225,77,69,0.08)] transition-colors duration-300 flex flex-col h-full"
            >
              {/* Image Container with Zoom effect */}
              <div className="w-full aspect-[4/3] overflow-hidden bg-neutral-900 relative">
                <motion.img
                  layoutId={isReducedMotion ? undefined : `image-${project.id}`}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center select-none opacity-90 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  draggable="false"
                />
                <motion.div
                  layoutId={isReducedMotion ? undefined : `badge-${project.id}`}
                  className="absolute top-2 left-2 md:top-4 md:left-4 bg-[#161618]/95 backdrop-blur-sm border border-white/5 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[8px] md:text-[10px] font-bold text-neutral-300 uppercase tracking-wider"
                >
                  {project.category}
                </motion.div>

                {/* GitHub Icon Badge */}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-2 right-2 md:top-4 md:right-4 bg-[#161618]/95 backdrop-blur-sm border border-white/5 p-1.5 md:p-2 rounded-full text-neutral-300 hover:text-white hover:border-white/30 transition-all z-20 shadow-sm hover:scale-105"
                  >
                    <GithubIcon className="w-3 h-3 md:w-4 md:h-4" />
                  </a>
                )}

                {/* Hover Overlay "View Project" */}
                <div className="absolute inset-0 bg-brand-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 pointer-events-none hidden sm:flex">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2 bg-brand-red text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                    View Project <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Details Content */}
              <motion.div
                layoutId={isReducedMotion ? undefined : `content-${project.id}`}
                className="p-3 sm:p-5 md:p-8 flex flex-col flex-1"
              >
                <h3 className="text-sm sm:text-lg md:text-xl font-display font-semibold text-white mb-1.5 md:mb-3 line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-neutral-400 text-xs md:text-sm leading-relaxed mb-3 md:mb-6 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 md:gap-2 mt-auto">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[8px] md:text-[10px] font-medium text-neutral-300 bg-white/5 px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 2 && (
                    <span className="text-[8px] md:text-[10px] font-medium text-neutral-500 bg-white/5 px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-md">
                      +{project.tags.length - 2}
                    </span>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>


      </div>

      {/* --- MODAL OVERLAY --- */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-6 lg:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-[#0F0F10]/95 backdrop-blur-md cursor-pointer"
            />
            
            {/* Modal Container */}
            <motion.div
              layoutId={isReducedMotion ? undefined : `card-${selectedProject.id}`}
              initial={isReducedMotion ? { opacity: 0, scale: 0.95, y: 20 } : undefined}
              animate={isReducedMotion ? { opacity: 1, scale: 1, y: 0 } : undefined}
              exit={isReducedMotion ? { opacity: 0, scale: 0.95, y: 20 } : undefined}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-3xl bg-[#121214] border border-white/10 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl flex flex-col h-auto relative z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 md:w-10 md:h-10 bg-black/40 hover:bg-brand-red backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white transition-all duration-200 cursor-pointer shadow-lg hover:scale-105"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              <div className="flex-1 flex flex-col w-full" data-lenis-prevent="true">
                {/* Hero Image with Gradient Fade */}
                <div className="w-full h-[180px] md:h-[220px] shrink-0 relative">
                  <motion.img
                    layoutId={isReducedMotion ? undefined : `image-${selectedProject.id}`}
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Gradient Overlay linking image to background */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/30 to-transparent" />
                  
                  <motion.div 
                    layoutId={isReducedMotion ? undefined : `badge-${selectedProject.id}`}
                    className="absolute top-5 left-5 md:top-6 md:left-6 bg-brand-navy/90 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold text-neutral-300 uppercase tracking-wider shadow-lg flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                    {selectedProject.category}
                  </motion.div>
                </div>

                {/* Modal Content */}
                <motion.div 
                  layoutId={isReducedMotion ? undefined : `content-${selectedProject.id}`}
                  className="px-6 pb-6 pt-5 md:px-8 md:pb-8 flex flex-col flex-1 shrink-0 relative z-10"
                >
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-white mb-3 leading-tight tracking-normal">
                    {selectedProject.title}
                  </h2>
                  
                  <p className="text-neutral-300 text-sm md:text-base leading-relaxed mb-5">
                    {selectedProject.fullDescription}
                  </p>

                  <div className="mb-5 md:mb-6">
                    <div className="flex items-center gap-2 mb-3">
                       <span className="w-2 h-2 rounded-full bg-brand-red shadow-[0_0_8px_rgba(225,77,69,0.8)]" />
                       <span className="text-xs font-bold text-white uppercase tracking-wider">Technologies Used</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium text-brand-red bg-brand-red/10 border border-brand-red/20 px-3 py-1.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-transparent border border-brand-red hover:bg-brand-red text-brand-red hover:text-white text-sm font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(225,77,69,0)] hover:shadow-[0_0_20px_rgba(225,77,69,0.3)]"
                      >
                        <GithubIcon className="w-5 h-5" />
                        View Code on GitHub
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
