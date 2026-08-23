import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Loader({ onComplete, onExitStart }) {
  const containerRef = useRef(null);
  const topPanelRef = useRef(null);
  const bottomPanelRef = useRef(null);
  const contentRef = useRef(null);
  const lettersRef = useRef([]);
  const progressRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    // Check session storage
    const hasLoadedThisSession = sessionStorage.getItem('tribesell_loaded');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Lock body scroll while loader is active
    document.body.style.overflow = 'hidden';

    // If already loaded in this session or reduced motion is active, skip or run a fast fadeout
    if (hasLoadedThisSession === 'true' || prefersReducedMotion) {
      if (onExitStart) onExitStart();
      const skipTl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          onComplete();
        }
      });
      skipTl.to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
      return;
    }

    // Full Sequence Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('tribesell_loaded', 'true');
        document.body.style.overflow = '';
        onComplete();
      }
    });

    // Set initial values
    gsap.set(lettersRef.current, { opacity: 0, y: 30, filter: 'blur(10px)' });
    gsap.set(progressRef.current, { width: '0%' });

    // 1. Reveal letters staggered with blur-to-focus
    tl.to(lettersRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      stagger: 0.05,
      ease: 'power3.out'
    });

    // 2. Animate progress bar and counter in parallel
    const counterObj = { val: 0 };
    tl.to(progressRef.current, {
      width: '100%',
      duration: 1.4,
      ease: 'power2.out'
    }, '-=0.3');

    tl.to(counterObj, {
      val: 100,
      duration: 1.4,
      ease: 'power2.out',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = Math.floor(counterObj.val);
        }
      }
    }, '<'); // Align with previous progress bar tween

    // 3. Fade out the text & loader details slightly before panels slide apart
    tl.to(contentRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.35,
      ease: 'power2.in'
    }, '+=0.1');

    // 4. Fire the Hero entrance animations right as the panels begin splitting
    tl.call(() => {
      if (onExitStart) onExitStart();
    });

    // 5. Split and slide the top/bottom background panels apart
    tl.to(topPanelRef.current, {
      yPercent: -100,
      duration: 0.65,
      ease: 'power3.inOut'
    });

    tl.to(bottomPanelRef.current, {
      yPercent: 100,
      duration: 0.65,
      ease: 'power3.inOut'
    }, '<');

    // Make the outer container invisible/hidden at the end
    tl.to(containerRef.current, {
      display: 'none',
      duration: 0
    });

  }, [onComplete, onExitStart]);

  const word = "TribeSell";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden"
    >
      {/* Top half split panel */}
      <div
        ref={topPanelRef}
        className="absolute top-0 left-0 w-full h-[50vh] bg-[#0A0A0A] z-10 border-b border-white/5"
      />

      {/* Bottom half split panel */}
      <div
        ref={bottomPanelRef}
        className="absolute bottom-0 left-0 w-full h-[50vh] bg-[#0A0A0A] z-10"
      />

      {/* Loader Content */}
      <div
        ref={contentRef}
        className="relative z-20 flex flex-col items-center justify-center text-center px-6"
      >
        {/* Wordmark logo container */}
        <div className="flex items-center overflow-hidden mb-6">
          <img
            ref={(el) => (lettersRef.current[0] = el)}
            src="/tribesell_logo.png"
            alt=""
            className="w-10 h-10 md:w-12 md:h-12 object-contain mr-3 select-none"
            draggable="false"
          />
          {word.split("").map((char, index) => (
            <span
              key={index}
              ref={(el) => (lettersRef.current[index + 1] = el)}
              className="text-white font-display font-bold text-4xl md:text-5xl select-none display-inline"
            >
              {char}
            </span>
          ))}
        </div>

        {/* Counter and Progress Track */}
        <div className="w-48 flex flex-col gap-2">
          {/* Progress Bar Track */}
          <div className="w-full h-[1.5px] bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-brand-red rounded-full"
            />
          </div>

          {/* Numerical Counter */}
          <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-neutral-500">
            <span>LOADING</span>
            <span>
              <span ref={counterRef}>0</span>%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
