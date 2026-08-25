import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Shared animation constants
const ease = [0.16, 1, 0.3, 1];
const viewport = { once: true, amount: 0.2 };

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', service: 'Web Development', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }
    
    setIsSubmitting(true);
    
    // EmailJS integration
    emailjs.send(
      'service_99g557c', // Service ID provided
      'template_x9qjank', // Template ID
      {
        from_name: formData.name,
        email_id: formData.email, // Matches {{email_id}} in template
        message: formData.message,
        service: formData.service
      },
      {
        publicKey: 'KjG_-tf52_1Njgm8c' // Public Key
      }
    )
    .then(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', service: 'Web Development', message: '' });
    })
    .catch((error) => {
      setIsSubmitting(false);
      console.error('Email sending failed:', error);
      alert('Failed to send message: ' + (error?.text || error?.message || JSON.stringify(error)));
    });
  };

  return (
    <section id="contact" className="py-32 bg-[#0F0F10] relative z-10 overflow-hidden">

      {/* Ambient glowing wash shape */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Ghost number background */}
      <div className="absolute top-8 left-6 md:left-16 text-[180px] md:text-[240px] font-display font-bold text-white/[0.02] leading-none select-none pointer-events-none z-0">
        05
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Soft Accent-Tinted Band Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.9, ease }}
          className="bg-brand-red/5 border border-white/5 rounded-2xl md:rounded-3xl p-5 sm:p-8 md:p-16 text-left relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16"
        >
          
          {/* Background Wash inside Card */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-red/5 rounded-full blur-[80px] pointer-events-none" />

          {/* Left Column (Info) */}
          <div className="lg:col-span-5 flex flex-col relative z-10">
            <div>
              {/* Eyebrow pill badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.6, ease }}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-red/10 border border-brand-red/15 rounded-full mb-5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.15em] text-brand-red uppercase">Get In Touch</span>
              </motion.div>

              {/* Dramatic CTA headline — scales in */}
              <motion.h2
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewport}
                transition={{ duration: 0.9, ease, delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 md:mb-6 leading-tight max-w-md"
              >
                Let's construct <br />something <span className="text-brand-red">great.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.8, ease, delay: 0.2 }}
                className="text-neutral-400 text-sm leading-relaxed max-w-sm mb-8"
              >
                Tell us about your web, mobile, or branding specifications. Our senior engineers will review and schedule a direct strategy session.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.7, ease, delay: 0.3 }}
              className="space-y-4"
            >
              <div>
                <p className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase">Office Location</p>
                <p className="text-sm font-medium text-neutral-300">
                  Rehman tower, Gulistan e Johr, Karachi
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column (Interactive Form) — delayed spring slide-up */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ type: "spring", stiffness: 200, damping: 30, delay: 0.3 }}
            className="lg:col-span-7 relative z-10 bg-[#161618] border border-white/5 rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
          >
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-3">Project Received!</h3>
                <p className="text-neutral-400 text-sm max-w-sm leading-relaxed mb-6">
                  Thank you for reaching out. A senior member of our development team will analyze your requirements and follow up within 24 hours.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-red hover:text-brand-red/80 hover:underline"
                >
                  Submit another message <ArrowRight className="w-3 h-3" />
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col text-left">
                    <label htmlFor="name" className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-900 border border-white/10 focus:border-brand-red focus:bg-neutral-950 rounded-lg text-sm text-white placeholder-neutral-600 outline-hidden transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col text-left">
                    <label htmlFor="email" className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="e.g. john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-900 border border-white/10 focus:border-brand-red focus:bg-neutral-950 rounded-lg text-sm text-white placeholder-neutral-600 outline-hidden transition-all"
                    />
                  </div>
                </div>

                {/* Service Selection */}
                <div className="flex flex-col text-left">
                  <label htmlFor="service" className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                    Service Required
                  </label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-900 border border-white/10 focus:border-brand-red focus:bg-neutral-950 rounded-lg text-sm text-white outline-hidden transition-all cursor-pointer"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="UI/UX & Branding">UI/UX & Branding</option>
                    <option value="Custom Software">Custom Software</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col text-left">
                  <label htmlFor="message" className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                    Project Guidelines & Scope *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Tell us about the features, app screens, or branding style you want to build..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-900 border border-white/10 focus:border-brand-red focus:bg-neutral-950 rounded-lg text-sm text-white placeholder-neutral-600 outline-hidden transition-all resize-none"
                  />
                </div>

                {/* Submit Button — spring pop-in */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-brand-red hover:bg-opacity-90 disabled:bg-brand-red/50 text-white font-medium rounded-xl shadow-md hover:shadow-lg hover:shadow-brand-red/15 transition-all duration-250 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing details...
                    </span>
                  ) : (
                    <>
                      Submit Project Request
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
