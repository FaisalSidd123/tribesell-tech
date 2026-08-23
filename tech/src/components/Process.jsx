import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const STEPS = [
  {
    num: '01',
    title: 'Discovery & Design System',
    description: 'We align on your product strategy, compile design components, and outline the technical blueprint.',
    detail: 'Before writing code, we design interactive high-fidelity mockups using a custom styling token library tailored to your brand.'
  },
  {
    num: '02',
    title: 'Pixel-Perfect Prototyping',
    description: 'We transform creative layouts into clean responsive frontend components with rich micro-animations.',
    detail: 'We build interactive states and clean transitions early on so you can feel the final application feel and usability.'
  },
  {
    num: '03',
    title: 'Robust Architecture',
    description: 'We code custom web platforms and mobile apps using lightweight, future-proof frameworks.',
    detail: 'We develop clean, modular architectures using React/Vite/NextJS. Security and core performance are baked in.'
  },
  {
    num: '04',
    title: 'Launch & Performance Tuning',
    description: 'We optimize Core Web Vitals, set up continuous delivery pipelines, and launch smoothly.',
    detail: 'Our custom QA checklists cover SEO tags, security configuration, speed optimization, and responsive design audits.'
  }
];

export default function Process() {
  const pinContainerRef = useRef(null);
  const svgContainerRef = useRef(null);
  const pathRef = useRef(null);
  const nodesRef = useRef([]);
  const cardsRef = useRef([]);
  const numRefs = useRef([]);
  
  const [pathD, setPathD] = useState("");
  const thresholdsRef = useRef([0.125, 0.375, 0.625, 0.875]);
  const activeIdxRef = useRef(-2);

  // 1. Calculate SVG Path dynamically based on actual DOM nodes
  useEffect(() => {
    const updatePath = () => {
      // Only for desktop
      if (window.innerWidth < 1024) return;
      if (!svgContainerRef.current || !nodesRef.current.length) return;
      
      const containerRect = svgContainerRef.current.getBoundingClientRect();
      const width = containerRect.width;
      
      const points = [];
      const thresholds = [];
      
      nodesRef.current.forEach((node) => {
         if (!node) return;
         const rect = node.getBoundingClientRect();
         // Center of node relative to SVG container
         const x = rect.left + rect.width / 2 - containerRect.left;
         const y = rect.top + rect.height / 2 - containerRect.top;
         points.push({ x, y });
         
         thresholds.push(x / width);
      });
      
      if (points.length < STEPS.length) return;
      thresholdsRef.current = thresholds;

      // Extend to full width
      const startX = 0;
      const startY = points[0].y;
      const endX = width;
      const endY = points[points.length-1].y;

      // Generate smooth cubic bezier sine wave
      let d = `M ${startX} ${startY} L ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
         const curr = points[i-1];
         const next = points[i];
         const cpOffset = (next.x - curr.x) * 0.45; // 0.45 creates a nice smooth curve
         d += ` C ${curr.x + cpOffset} ${curr.y}, ${next.x - cpOffset} ${next.y}, ${next.x} ${next.y}`;
      }
      d += ` L ${endX} ${endY}`;
      
      setPathD(d);
    };
    
    // Initial calculate
    const timeout = setTimeout(updatePath, 50);
    window.addEventListener('resize', updatePath);
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', updatePath);
    };
  }, []);

  // 2. Set up GSAP animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const mm = gsap.matchMedia();

    // Desktop: Pinned Waveform
    mm.add("(min-width: 1024px)", () => {
      if (!pathD || !pinContainerRef.current || !pathRef.current) return;
      
      const path = pathRef.current;
      const length = path.getTotalLength();
      
      // Reset cards to inactive state initially
      cardsRef.current.forEach(card => {
        if(card) gsap.set(card, { opacity: 0.4, y: 20, scale: 0.95, borderColor: 'rgba(15, 15, 15, 0.05)' });
      });
      nodesRef.current.forEach(node => {
        if(node) {
           gsap.set(node, { scale: 1, backgroundColor: '#FAFAF9', borderColor: '#E5E7EB', boxShadow: 'none' });
           const dot = node.querySelector('.node-dot');
           if (dot) gsap.set(dot, { backgroundColor: '#E5E7EB' });
        }
      });
      activeIdxRef.current = -2;

      // Ensure path is undrawn
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      const pinScrollLength = 2000; // Tunable variable for scroll feel

      // Main scrub animation
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: pinContainerRef.current,
          pin: true,
          start: 'center center',
          end: `+=${pinScrollLength}`,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const thresholds = thresholdsRef.current;
            
            let newActiveIdx = -1;
            for (let i = STEPS.length - 1; i >= 0; i--) {
              if (progress >= thresholds[i]) {
                newActiveIdx = i;
                break;
              }
            }
            
            // Only fire animations if the active phase changed
            if (newActiveIdx !== activeIdxRef.current) {
              activeIdxRef.current = newActiveIdx;
              
              STEPS.forEach((_, idx) => {
                const node = nodesRef.current[idx];
                const card = cardsRef.current[idx];
                const num = numRefs.current[idx];
                if (!node || !card) return;
                
                const dot = node.querySelector('.node-dot');
                
                if (idx === newActiveIdx) {
                  // ACTIVE
                  gsap.to(node, { scale: 1.3, backgroundColor: '#E14D45', borderColor: '#E14D45', boxShadow: '0 0 24px rgba(225, 77, 69, 0.5)', duration: 0.4, overwrite: 'auto' });
                  if (dot) gsap.to(dot, { backgroundColor: '#ffffff', duration: 0.4, overwrite: 'auto' });
                  gsap.to(card, { opacity: 1, y: 0, scale: 1.02, borderColor: 'rgba(225, 77, 69, 0.4)', duration: 0.4, overwrite: 'auto' });
                  if (num) gsap.to(num, { color: '#E14D45', duration: 0.4, overwrite: 'auto' });
                } else if (idx < newActiveIdx) {
                  // COMPLETED (passed)
                  gsap.to(node, { scale: 1, backgroundColor: '#E14D45', borderColor: '#E14D45', boxShadow: 'none', duration: 0.4, overwrite: 'auto' });
                  if (dot) gsap.to(dot, { backgroundColor: '#ffffff', duration: 0.4, overwrite: 'auto' });
                  gsap.to(card, { opacity: 1, y: 0, scale: 1.02, borderColor: 'rgba(225, 77, 69, 0.4)', duration: 0.4, overwrite: 'auto' });
                  if (num) gsap.to(num, { color: '#E14D45', duration: 0.4, overwrite: 'auto' });
                } else {
                  // INACTIVE (upcoming)
                  gsap.to(node, { scale: 1, backgroundColor: '#FAFAF9', borderColor: '#E5E7EB', boxShadow: 'none', duration: 0.4, overwrite: 'auto' });
                  if (dot) gsap.to(dot, { backgroundColor: '#E5E7EB', duration: 0.4, overwrite: 'auto' });
                  gsap.to(card, { opacity: 0.4, y: 20, scale: 0.95, borderColor: 'rgba(15, 15, 15, 0.05)', duration: 0.4, overwrite: 'auto' });
                  if (num) gsap.to(num, { color: 'rgba(225, 77, 69, 0.2)', duration: 0.4, overwrite: 'auto' });
                }
              });
            }
          }
        }
      });
    });

    // Mobile: Standard vertical scrub/fade
    mm.add("(max-width: 1023px)", () => {
      const mobileSteps = gsap.utils.toArray('.mobile-step');
      mobileSteps.forEach(step => {
        gsap.fromTo(step, 
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: 'power3.out',
            scrollTrigger: { 
              trigger: step, 
              start: 'top 75%',
              toggleActions: 'play none none none'
            } 
          }
        );
      });
    });

    return () => mm.revert();
  }, [pathD]);

  return (
    <div id="process" className="relative bg-[#FAFAF9] z-10 py-24 lg:py-32 overflow-hidden">
      
      {/* Section Header */}
      <div className="flex justify-center mb-16 lg:mb-24">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-[#0F0F0F] text-center">
          Our Workflow.
        </h2>
      </div>

      {/* --- DESKTOP LAYOUT (Horizontal Pinned Waveform) --- */}
      <div ref={pinContainerRef} className="hidden lg:block max-w-[1600px] mx-auto px-10 w-full relative min-h-[600px]">
        
        {/* The SVG Wave Container */}
        <div 
          ref={svgContainerRef}
          className="absolute left-10 right-10 top-0 bottom-0 z-0 pointer-events-none"
        >
          {pathD && (
            <svg className="w-full h-full overflow-visible">
              {/* Dim background line */}
              <path d={pathD} stroke="#E5E7EB" strokeWidth="3" fill="none" />
              {/* Active filled line */}
              <path 
                ref={pathRef} 
                d={pathD} 
                stroke="#E14D45" 
                strokeWidth="3" 
                fill="none" 
                className="will-change-[stroke-dashoffset]" 
              />
            </svg>
          )}
        </div>

        {/* The Cards Grid */}
        <div className="grid grid-cols-4 gap-6 h-full absolute inset-x-10 top-0 bottom-0">
          {STEPS.map((step, idx) => {
            const isTopNode = idx % 2 === 0; // Alternating peak/trough
            return (
              <div 
                key={step.num}
                className={`relative flex flex-col ${isTopNode ? 'justify-start pt-16' : 'justify-end pb-16'} z-10 h-full`}
              >
                {/* Node */}
                <div 
                  ref={el => nodesRef.current[idx] = el}
                  className={`absolute left-1/2 -translate-x-1/2 ${isTopNode ? 'top-16' : 'bottom-16'} w-8 h-8 bg-[#FAFAF9] border-2 border-[#E5E7EB] rounded-full z-20 flex items-center justify-center will-change-[transform,background-color,border-color,box-shadow]`}
                >
                  <div className="node-dot w-2 h-2 rounded-full bg-[#E5E7EB]" />
                </div>

                {/* Card Content */}
                <div 
                  ref={el => cardsRef.current[idx] = el}
                  className={`card-content bg-white border border-[#0F0F0F]/5 rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] will-change-[opacity,transform,border-color] ${isTopNode ? 'mt-8' : 'mb-8'}`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span 
                      ref={el => numRefs.current[idx] = el}
                      className="text-3xl font-display font-bold text-brand-red/20 will-change-[color]"
                    >
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-lg font-display font-semibold text-[#0F0F0F] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-4">
                    {step.description}
                  </p>
                  <div className="border-t border-[#0F0F0F]/5 pt-4">
                    <p className="text-[11px] text-neutral-400 leading-relaxed font-normal">
                      {step.detail}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- MOBILE LAYOUT (Vertical Stack, No Pinning) --- */}
      <div className="lg:hidden max-w-xl mx-auto px-6 w-full flex flex-col gap-8 relative z-10">
        {STEPS.map((step, idx) => (
          <div
            key={step.num}
            className="mobile-step relative pl-10 flex flex-col"
          >
            {/* Simple Mobile Node (Static) */}
            <div className="absolute left-0 top-8 w-6 h-6 -translate-y-1/2 bg-brand-red/5 border-2 border-brand-red rounded-full z-20 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
            </div>

            {/* Simple Vertical Line (Static) */}
            {idx < STEPS.length - 1 && (
              <div className="absolute left-[11px] top-12 bottom-[-2rem] w-0.5 bg-brand-red/20 z-10" />
            )}

            {/* Card Content */}
            <div className="bg-white border border-[#0F0F0F]/5 rounded-2xl p-6 shadow-sm w-full">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-display font-bold text-brand-red/20">{step.num}</span>
                <span className="text-[10px] font-bold tracking-wider text-brand-red bg-brand-red/10 px-2 py-1 rounded-full uppercase">
                  Phase {idx + 1}
                </span>
              </div>
              <h3 className="text-base font-display font-semibold text-[#0F0F0F] mb-3">
                {step.title}
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed mb-4">
                {step.description}
              </p>
              <div className="border-t border-[#0F0F0F]/5 pt-4">
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {step.detail}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
