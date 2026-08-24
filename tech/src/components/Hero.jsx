import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=80&auto=format", // Web Dev setup
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&q=80&auto=format", // Mobile App interface mockup
  "https://images.unsplash.com/photo-1542744094-3a3172720449?w=1920&q=80&auto=format"  // Digital design workspace
];

export default function Hero() {
  const heroRef = useRef(null);

  // Preload all 3 background images immediately
  useEffect(() => {
    HERO_IMAGES.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set(".hero-anim", { opacity: 1, y: 0 });
        gsap.set(".hero-bg-wrapper", { opacity: 1 });
        return;
      }

      // Master Entrance Timeline
      const tl = gsap.timeline();

      // Fade in background gently
      tl.fromTo(".hero-bg-wrapper", { opacity: 0 }, { opacity: 1, duration: 2, ease: "power2.inOut" }, 0);

      // Staggered text & UI reveal
      tl.from(".hero-anim-1", { opacity: 0, y: 15, duration: 0.7, ease: "power3.out" }, 0)
        .from(".hero-anim-2", { opacity: 0, y: 15, duration: 0.7, ease: "power3.out" }, 0.05)
        .from(".hero-anim-3", { opacity: 0, y: 15, duration: 0.7, ease: "power3.out" }, 0.1)
        .from(".hero-anim-4", { opacity: 0, y: 15, duration: 0.7, ease: "power3.out" }, 0.15)
        .from(".hero-anim-5", { opacity: 0, y: 15, duration: 0.7, ease: "power3.out" }, 0.2);

      // Synced Rotating Text Timeline (starts after entrance delay)
      const phraseTl = gsap.timeline({ repeat: -1, delay: 2.5, repeatDelay: 2.5 });

      const tOut = 0.5;
      const tIn = 0.6;
      const tHold = 2.2;
      const overlap = tOut - 0.1; // 0.4

      // Step 1 -> Step 2 (Frame 0 -> 1)
      phraseTl.addLabel('f0-out')
        .to('.line1-0', { y: -15, opacity: 0, duration: tOut, ease: 'power2.in' }, 'f0-out')
        .to('.line2-0', { y: -15, opacity: 0, duration: tOut, ease: 'power2.in' }, 'f0-out')
        .fromTo('.line1-1', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: tIn, ease: 'power2.out', immediateRender: false }, `f0-out+=${overlap}`)
        .fromTo('.line2-1', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: tIn, ease: 'power2.out', immediateRender: false }, `f0-out+=${overlap}`)
        .to({}, { duration: tHold }); // Hold

      // Step 2, Phrase 1 -> Phrase 2 (Frame 1 -> 2)
      phraseTl.addLabel('f1-out')
        .to('.line2-1', { y: -15, opacity: 0, duration: tOut, ease: 'power2.in' }, 'f1-out')
        .fromTo('.line2-2', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: tIn, ease: 'power2.out', immediateRender: false }, `f1-out+=${overlap}`)
        .to({}, { duration: tHold }); // Hold

      // Step 2, Phrase 2 -> Phrase 3 (Frame 2 -> 3)
      phraseTl.addLabel('f2-out')
        .to('.line2-2', { y: -15, opacity: 0, duration: tOut, ease: 'power2.in' }, 'f2-out')
        .fromTo('.line2-3', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: tIn, ease: 'power2.out', immediateRender: false }, `f2-out+=${overlap}`)
        .to({}, { duration: tHold }); // Hold

      // Step 2 -> Step 1 (Frame 3 -> 0)
      phraseTl.addLabel('f3-out')
        .to('.line1-1', { y: -15, opacity: 0, duration: tOut, ease: 'power2.in' }, 'f3-out')
        .to('.line2-3', { y: -15, opacity: 0, duration: tOut, ease: 'power2.in' }, 'f3-out')
        .fromTo('.line1-0', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: tIn, ease: 'power2.out', immediateRender: false }, `f3-out+=${overlap}`)
        .to('.line2-0', { y: 0, opacity: 1, duration: tIn, ease: 'power2.out', immediateRender: false }, `f3-out+=${overlap}`);

      // --- BULLETPROOF SEAMLESS BACKGROUND SLIDESHOW TIMELINE ---
      const images = gsap.utils.toArray('.hero-bg-img');
      let currentIndex = 0;

      // Set initial state: image 0 visible (zIndex: 2), rest hidden (zIndex: 1)
      images.forEach((img, i) => {
        gsap.set(img, { opacity: i === 0 ? 0.85 : 0, scale: 1, zIndex: i === 0 ? 2 : 1 });
      });

      // Initial Ken Burns zoom for first image
      gsap.to(images[0], { scale: 1.08, duration: 5.5, ease: 'none' });

      const cycleNextImage = () => {
        const currentImg = images[currentIndex];
        const nextIndex = (currentIndex + 1) % images.length;
        const nextImg = images[nextIndex];

        // Prepare next image underneath with full opacity 0.85 & reset scale
        gsap.set(nextImg, { zIndex: 1, opacity: 0.85, scale: 1 });

        // Start Ken Burns zoom on next image immediately
        gsap.to(nextImg, { scale: 1.08, duration: 5.5, ease: 'none' });

        // Keep current image on top (zIndex: 2) and fade it out over 1.5s reveal next image underneath
        gsap.to(currentImg, {
          opacity: 0,
          duration: 1.5,
          ease: 'power2.inOut',
          onComplete: () => {
            // Once faded out, demote current image zIndex to 1 and promote next image to zIndex 2
            gsap.set(currentImg, { zIndex: 1 });
            gsap.set(nextImg, { zIndex: 2 });
          }
        });

        currentIndex = nextIndex;
        // Schedule next transition after 4 seconds hold
        gsap.delayedCall(4, cycleNextImage);
      };

      // Start initial cycle after 4 seconds
      gsap.delayedCall(4, cycleNextImage);

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleCTA = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden flex items-center justify-center bg-[#0F0F0F]"
    >
      {/* --- PREMIUM PHOTOGRAPHIC BACKGROUND --- */}
      <div className="hero-bg-wrapper opacity-0 absolute inset-0 z-0 overflow-hidden bg-[#0F0F0F]">

        {/* Images with enhanced visibility */}
        {HERO_IMAGES.map((src, idx) => (
          <div
            key={idx}
            className={`hero-bg-img absolute inset-0 bg-cover bg-center ${idx === 0 ? 'opacity-85' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}

        {/* --- COLOR GRADING & CONTRAST OVERLAYS --- */}

        {/* 1. Subtle Navy Accent Tint */}
        <div className="absolute inset-0 bg-brand-navy/10 mix-blend-multiply" />

        {/* 2. Warm Brand-Red/Coral Accent Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(225,77,69,0.2)_0%,transparent_60%)] mix-blend-screen" />

        {/* 3. Soft Text Contrast Protection (Legibility without dimming photo) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,15,15,0.35)_0%,rgba(15,15,15,0.05)_75%,transparent_100%)]" />

        {/* Smooth dark gradient fading up from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent" />
      </div>

      {/* --- FOREGROUND CONTENT --- */}
      <div className="max-w-4xl mx-auto px-6 w-full relative z-10 flex flex-col items-center text-center">

        {/* Eyebrow badge */}
        <div className="hero-anim hero-anim-1 inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 border border-white/25 rounded-full mb-6 backdrop-blur-sm shadow-sm">
          <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
          <span className="text-[11px] font-extrabold tracking-widest text-white uppercase font-sans">
            Web &bull; Mobile &bull; Design
          </span>
        </div>

        {/* Sync-Rotating Headline with CSS Grid Jitter-Free Stacking */}
        <h1 className="hero-anim hero-anim-2 text-white font-display font-extrabold text-[8vw] min-[400px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight mb-6 flex flex-col items-center w-full text-center whitespace-nowrap drop-shadow-sm">

          {/* Row 1: Line 1 */}
          <div className="grid grid-cols-1 grid-rows-1 place-items-center w-full px-4">
            <div className="line1-0 col-start-1 row-start-1 opacity-100">We Build Premium</div>
            <div className="line1-1 col-start-1 row-start-1 opacity-0">Our Expertise</div>
          </div>

          {/* Row 2: Line 2 */}
          <div className="grid grid-cols-1 grid-rows-1 place-items-center w-full text-brand-red mt-1 sm:mt-2 px-4">
            <div className="line2-0 col-start-1 row-start-1 opacity-100">Digital Experiences.</div>
            <div className="line2-1 col-start-1 row-start-1 opacity-0">Web Development.</div>
            <div className="line2-2 col-start-1 row-start-1 opacity-0">Mobile Development.</div>
            <div className="line2-3 col-start-1 row-start-1 opacity-0">Graphic Design.</div>
          </div>
        </h1>

        {/* Subheadline */}
        <p className="hero-anim hero-anim-3 text-neutral-200 text-base md:text-xl font-normal leading-relaxed max-w-2xl mb-10 px-4 tracking-normal drop-shadow-xs">
          TribeSell is an elite design and development agency. We craft high-performance websites, bespoke mobile apps, and premium brand identities.
        </p>

        {/* CTA Row */}
        <div className="hero-anim hero-anim-4 flex flex-col sm:flex-row w-full sm:w-auto justify-center items-center gap-4 mb-14 px-6">
          <a
            href="#contact"
            onClick={(e) => handleCTA(e, '#contact')}
            className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-8 py-4 bg-brand-red hover:bg-[#c93e37] text-white font-semibold tracking-wide rounded-full shadow-lg shadow-brand-red/25 hover:shadow-brand-red/40 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03]"
          >
            Start a Project
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </a>

          <a
            href="#portfolio"
            onClick={(e) => handleCTA(e, '#portfolio')}
            className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-8 py-4 bg-white/12 border border-white/25 hover:border-white/50 text-white font-semibold tracking-wide rounded-full hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] backdrop-blur-sm"
          >
            View Our Work
          </a>
        </div>

        {/* Trust Row */}
        <div className="hero-anim hero-anim-5 flex items-center justify-center gap-6 py-6 border-t border-white/10 w-full max-w-[480px]">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold font-display text-white">50+</span>
            <span className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase">Projects Done</span>
          </div>
          <div className="h-10 w-px bg-white/10"></div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold font-display text-white">3</span>
            <span className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase">Disciplines</span>
          </div>
          <div className="h-10 w-px bg-white/10"></div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold font-display text-white">100%</span>
            <span className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase">In-House Quality</span>
          </div>
        </div>

      </div>
    </section>
  );
}
