import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Custom components
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import Services from './components/Services';
import Process from './components/Process';
import Portfolio from './components/Portfolio';

import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [startHero, setStartHero] = useState(false);
  const [navTheme, setNavTheme] = useState('light');

  useEffect(() => {
    // Only initialize scroll engines and markers after the loader is completed
    if (isLoading) return;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: true, // Enables smooth scroll on mobile/touch devices
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis with GSAP Ticker
    const tickerUpdate = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);

    // Disable lag smoothing to prevent jerks
    gsap.ticker.lagSmoothing(0);

    // Dynamic Navbar Theme Detection using ScrollTrigger markers
    const lights = document.querySelectorAll('.section-light');
    const darks = document.querySelectorAll('.section-dark');
    const scrollTriggers = [];

    lights.forEach((section) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 72px',
        end: 'bottom 72px',
        onToggle: (self) => {
          if (self.isActive) {
            setNavTheme('light');
          }
        },
      });
      scrollTriggers.push(trigger);
    });

    darks.forEach((section) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 72px',
        end: 'bottom 72px',
        onToggle: (self) => {
          if (self.isActive) {
            setNavTheme('dark');
          }
        },
      });
      scrollTriggers.push(trigger);
    });

    // Clean up scroll bindings
    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerUpdate);
      scrollTriggers.forEach((trigger) => trigger.kill());
    };
  }, [isLoading]);

  return (
    <div className="w-full min-h-screen bg-[#FAFAF9] text-[#0F0F0F] relative selection:bg-brand-red/10 selection:text-brand-red">
      {/* Intro Loader Animation Overlay */}
      {isLoading && (
        <Loader
          onExitStart={() => setStartHero(true)}
          onComplete={() => setIsLoading(false)}
        />
      )}

      {/* Navigation (Sticky & theme-adapting) */}
      <Navbar theme={navTheme} />

      {/* Hero Section */}
      <div className="section-dark">
        <Hero start={startHero} />
      </div>

      {/* Trust Strip */}
      <div className="section-light">
        <TrustStrip />
      </div>

      {/* ── Divider: Light → Dark ── */}
      <div className="h-24 bg-gradient-to-b from-[#FAFAF9] via-[#FAFAF9]/60 to-[#0F0F10]" />

      {/* Services Section (Dark Theme) */}
      <div className="section-dark">
        <Services />
      </div>

      {/* ── Divider: Dark → Light ── */}
      <div className="h-24 bg-gradient-to-b from-[#0F0F10] via-[#0F0F10]/60 to-[#FAFAF9]" />

      {/* Process Section */}
      <div className="section-light">
        <Process />
      </div>

      {/* ── Divider: Light → Dark ── */}
      <div className="h-24 bg-gradient-to-b from-[#FAFAF9] via-[#FAFAF9]/60 to-[#0F0F10]" />

      {/* Portfolio Section (Dark Theme) */}
      <div className="section-dark">
        <Portfolio />
      </div>

      {/* ── Divider: Dark → Light ── */}
      <div className="h-24 bg-gradient-to-b from-[#0F0F10] via-[#0F0F10]/60 to-[#FAFAF9]" />

      {/* Testimonials Section */}
      <div className="section-light">
        <Testimonials />
      </div>

      {/* ── Divider: Light → Dark ── */}
      <div className="h-24 bg-gradient-to-b from-[#FAFAF9] via-[#FAFAF9]/60 to-[#0F0F10]" />

      {/* Contact Section (Dark Theme) */}
      <div className="section-dark">
        <Contact />
      </div>

      {/* Footer Section (Dark Theme) */}
      <div className="section-dark">
        <Footer />
      </div>
    </div>
  );
}
