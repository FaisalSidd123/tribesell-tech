import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Smartphone, Palette, Megaphone, ChevronRight } from 'lucide-react';

const SERVICES = [
  {
    num: '01',
    icon: Code2,
    title: 'Web Development',
    teaser: 'High-performance, SEO-optimized web systems.',
    description: 'Pixel-perfect web systems built with modern frameworks to drive your business forward.',
    capabilities: [
      'Next.js & React Architectures',
      'Headless Commerce Systems',
      'API & Backend Integrations',
      'Core Web Vitals Optimization',
    ],
    tags: ['React', 'Next.js', 'Performance'],
    color: 'text-brand-red',
  },
  {
    num: '02',
    icon: Smartphone,
    title: 'Mobile Development',
    teaser: 'Bespoke native and hybrid mobile applications.',
    description: 'Buttery-smooth interactions and offline-first capabilities for iOS & Android platforms.',
    capabilities: [
      'React Native & Flutter Apps',
      'Dynamic Sync & Push Systems',
      'Apple/Google Store Deployments',
      'Wearable & Device Integrations',
    ],
    tags: ['iOS', 'Android', 'React Native'],
    color: 'text-brand-red',
  },
  {
    num: '03',
    icon: Palette,
    title: 'Graphic Design',
    teaser: 'Sleek editorial identities and user experience layouts.',
    description: 'Design system guidelines that build confidence and elevate brands across all touchpoints.',
    capabilities: [
      'UI/UX Design Systems',
      'Brand Identity & Guidelines',
      'Premium Pitch Deck Design',
      'Custom Mockups & Graphics',
    ],
    tags: ['UI/UX', 'Branding', 'Figma'],
    color: 'text-brand-red',
  },
  {
    num: '04',
    icon: Megaphone,
    title: 'Digital Marketing',
    teaser: 'Data-driven growth strategies & targeted campaigns.',
    description: 'Scalable marketing funnels, SEO campaigns, and social media growth strategies designed to convert.',
    capabilities: [
      'Search Engine Optimization (SEO)',
      'Paid Ads & Performance Marketing',
      'Social Media Strategy & Content',
      'Conversion Rate Optimization (CRO)',
    ],
    tags: ['SEO', 'PPC', 'Growth Marketing'],
    color: 'text-brand-red',
  },
];

const ServiceCard = ({ service }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = service.icon;

  const handleFlip = () => setIsFlipped(!isFlipped);
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip();
    }
  };

  return (
    <div
      className="group relative h-[420px] w-full cursor-pointer [perspective:1000px] outline-none"
      onMouseEnter={() => { if (window.matchMedia('(hover: hover)').matches) setIsFlipped(true); }}
      onMouseLeave={() => { if (window.matchMedia('(hover: hover)').matches) setIsFlipped(false); }}
      onClick={() => { if (!window.matchMedia('(hover: hover)').matches) handleFlip(); }}
      onFocus={() => setIsFlipped(true)}
      onBlur={() => setIsFlipped(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={`${service.title} Service Card. ${isFlipped ? 'Showing details.' : 'Press enter to flip for details.'}`}
    >
      {/* Lift & Glow Wrapper */}
      <div className="w-full h-full transition-all duration-300 group-hover:scale-[1.03] group-focus:scale-[1.03] rounded-2xl relative">
        
        {/* Glow effect pseudo-element (Outer card glow) */}
        <div className="absolute inset-0 rounded-2xl bg-brand-red/20 blur-2xl opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* 3D Wrapper */}
        <div 
          className="relative w-full h-full transition-transform duration-[600ms] [transform-style:preserve-3d] ease-[cubic-bezier(0.4,0.2,0.2,1)] motion-reduce:transition-none"
          style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          
          {/* FRONT FACE */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-gradient-to-br from-[#1c1c1f] to-[#121214] border border-brand-red/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)] group-hover:border-brand-red/40 group-focus:border-brand-red/40 rounded-2xl p-8 flex flex-col transition-all duration-300 z-10 overflow-hidden">
            
            {/* Oversized background numeral */}
            <div className="absolute -top-6 -right-4 text-[120px] font-display font-bold text-white/[0.02] leading-none select-none pointer-events-none group-hover:text-brand-red/[0.05] transition-colors duration-300">
              {service.num}
            </div>

            <div className="relative z-10 flex-1">
              {/* Icon Container with Glow */}
              <div className="relative mb-8 w-14 h-14">
                {/* Glow Blob behind icon */}
                <div className="absolute inset-0 bg-brand-red blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                {/* Physical Icon Box */}
                <div className={`relative w-full h-full rounded-2xl flex items-center justify-center bg-[#161618] border border-white/5 group-hover:border-brand-red/30 transition-colors duration-300 ${service.color}`}>
                  <Icon className="w-6 h-6 drop-shadow-[0_0_10px_rgba(225,77,69,0.5)]" />
                </div>
              </div>

              {/* Title & Teaser */}
              <h3 className="text-[26px] font-display font-semibold text-white mb-4 group-hover:[text-shadow:_0_0_15px_rgba(225,77,69,0.3)] transition-all duration-300">
                {service.title}
              </h3>
              <p className="text-neutral-400 text-[15px] leading-relaxed pr-4">
                {service.teaser}
              </p>
            </div>

            {/* Bottom Section: Tags & Hint */}
            <div className="relative z-10 mt-auto pt-6 flex flex-col gap-6">
              <div className="flex flex-wrap gap-2">
                {service.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5 text-neutral-400 text-[11px] font-medium tracking-wide uppercase group-hover:border-brand-red/20 group-hover:text-brand-red transition-colors duration-300">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center text-brand-red/70 text-[11px] font-bold tracking-widest uppercase gap-1.5 group-hover:text-brand-red transition-colors duration-300">
                 <span className="hidden lg:inline">Explore</span>
                 <span className="lg:hidden">Tap to see more</span>
                 <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* BACK FACE */}
          <div 
            className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-gradient-to-br from-brand-red to-[#c93e37] border border-[#c93e37] shadow-inner rounded-2xl p-8 flex flex-col z-0"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <h3 className="text-xl font-display font-semibold text-white mb-3">
              {service.title}
            </h3>
            <p className="text-white/90 text-[13px] leading-relaxed mb-6">
              {service.description}
            </p>

            <div className="border-t border-white/20 pt-5 mt-auto mb-6">
              <p className="text-[10px] font-bold tracking-wider text-white/70 uppercase mb-4">Included</p>
              <ul className="space-y-2.5">
                {service.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-2.5 text-xs text-white">
                    <div className="w-1 h-1 rounded-full bg-white/70 shrink-0 mt-1.5" />
                    <span className="leading-tight">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a 
              href="#contact" 
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-white/80 transition-colors mt-auto w-max"
              tabIndex={isFlipped ? 0 : -1}
            >
              Get started <ChevronRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Ensure elements are visible if reduced motion is enabled
      gsap.set(".service-anim-item", { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });

      tl.fromTo(".service-header-item",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      )
      .fromTo(".service-card-wrapper",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-32 bg-[#0F0F10] relative z-10 overflow-hidden">

      {/* Ambient glowing wash shape */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/5 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Dot Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="flex justify-center mb-16 md:mb-20">
          <h2 className="service-anim-item service-header-item text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-white text-center opacity-0">
            Our Expertise.
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <div key={service.title} className="service-anim-item service-card-wrapper opacity-0">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
