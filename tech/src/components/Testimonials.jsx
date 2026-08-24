import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "TribeSell developed our mobile app in record time. The user experience is incredibly fluid, and our clients frequently comment on the buttery-smooth scrolling and secure authentication. The level of detail is unmatched.",
    author: "Sarah Jenkins",
    role: "Chief Technology Officer",
    company: "Velo Finance",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    quote: "Working with TribeSell was a major catalyst for our web sales. They optimized our performance scores, built a premium e-commerce dashboard, and improved our user conversion rate by 32% within months of launch.",
    author: "Michael Chen",
    role: "Founder & CEO",
    company: "AeroStock Inc.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    quote: "The design guidelines and UI system developed by TribeSell are phenomenal. They truly understand clean typography, deliberate color, and whitespace. Our in-house engineers find the React components exceptionally clean.",
    author: "Alena Rostova",
    role: "Brand Director",
    company: "Solstice Space",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];

// Duplicate the array 4 times to create a massive seamless loop.
// Shifting by exactly -25% will shift perfectly by 1 full set.
const MARQUEE_ITEMS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

const ease = [0.16, 1, 0.3, 1];
const viewport = { once: true, amount: 0.2 };

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-[#FAFAF9] relative z-10 border-t border-[#0F0F0F]/5 overflow-hidden">
      
      {/* Inject Custom CSS for Infinite Marquee */}
      <style>{`
        @keyframes scroll-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-25%); }
        }
        .animate-marquee {
          animation: scroll-marquee 25s linear infinite;
        }
        .group-marquee:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 mb-16 md:mb-20">
        {/* Centered Section Header */}
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-navy/5 border border-brand-navy/10 rounded-full mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.15em] text-brand-navy uppercase">Client Feedback</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-[#0F0F0F] tracking-tight mb-4"
          >
            What Our Clients Say
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="text-neutral-600 text-base md:text-lg max-w-md font-normal"
          >
            Real feedback from the brands and builders we partner with.
          </motion.p>
        </div>
      </div>

      {/* Infinite Scrolling Marquee */}
      <motion.div
        initial={{ opacity: 0, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
        viewport={viewport}
        transition={{ duration: 0.9, ease, delay: 0.2 }}
        className="w-full relative flex items-center group-marquee"
        style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }} // Forces element to span the full browser width regardless of parent container
      >
        {/* Edge Fade Gradients for smooth entrance/exit */}
        <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[#FAFAF9] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[#FAFAF9] to-transparent z-20 pointer-events-none" />

        {/* The Scrolling Track */}
        <div className="flex w-max animate-marquee py-4">
          {MARQUEE_ITEMS.map((testimonial, idx) => (
            <div 
              key={idx} 
              className="w-[260px] sm:w-[320px] md:w-[420px] lg:w-[480px] bg-white border border-[#0F0F0F]/5 rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300 relative overflow-hidden flex flex-col justify-between shrink-0 group mr-4 md:mr-8"
            >
              {/* Top decorative quote icon */}
              <div className="absolute top-4 right-4 md:top-6 md:right-6 text-neutral-100 group-hover:text-brand-red/5 transition-colors duration-300 select-none pointer-events-none z-0">
                <Quote className="w-10 h-10 md:w-16 md:h-16 stroke-[1.5]" />
              </div>

              <div className="relative z-10 flex-grow flex flex-col justify-between h-full">
                <p className="text-[#0F0F0F] font-sans text-xs sm:text-sm md:text-base font-normal leading-relaxed mb-6 md:mb-8 pr-6 md:pr-8 tracking-normal">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 md:gap-4 mt-auto">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-[#0F0F0F]/5 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-[11px] md:text-sm font-bold text-[#0F0F0F] truncate">{testimonial.author}</p>
                    <p className="text-[9px] md:text-xs text-neutral-500 font-medium truncate">
                      {testimonial.role} &bull; <span className="text-brand-red font-semibold">{testimonial.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      
    </section>
  );
}
