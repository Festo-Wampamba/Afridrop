'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

export default function ContactSection() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      // Reset after delay
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#00477A] mb-4">Contact Us</h2>
            <p className="text-slate-600 text-lg mb-12">
              Have questions? Our experienced team is ready to help you with all your pool needs
            </p>

            <div className="bg-[#00477A] text-white rounded-2xl p-10 shadow-xl h-fit">
               <h3 className="text-2xl font-bold mb-8">Get in Touch</h3>
               <div className="space-y-8">
                 <ContactItem Icon={Phone} title="Phone Number" content={<>+256 7844 64754<br/>+256 7527 737779</>} />
                 <ContactItem Icon={Mail} title="Email Address" content={<>sales@afridropsolutions.com<br/>info@afridropsolutions.com</>} />
                 <ContactItem Icon={MapPin} title="Our Location" content={<>Plot 67b, Spring Road Bugolobi, Kisakye<br/>Complex, P.O Box 72312 Kampala.</>} />
                 <ContactItem Icon={Clock} title="Business Hours" content={<>Mon-Fri: 8:00 AM - 6:00 PM<br/>Sat: 9:00 AM - 2:00 PM</>} />
               </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-slate-50 p-8 md:p-10 rounded-2xl shadow-lg border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#009FCE] focus:ring-2 focus:ring-[#009FCE]/20 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#009FCE] focus:ring-2 focus:ring-[#009FCE]/20 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#009FCE] focus:ring-2 focus:ring-[#009FCE]/20 outline-none transition-all"
                  placeholder="+256..."
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Your Message</label>
                <textarea 
                  id="message" 
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#009FCE] focus:ring-2 focus:ring-[#009FCE]/20 outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={formStatus === 'sending'}
                className="w-full bg-[#009FCE] hover:bg-[#007FA5] text-white py-4 rounded-lg font-bold shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formStatus === 'sending' ? 'Sending...' : <>Send Message <Send size={18} /></>}
              </button>

              {formStatus === 'success' && (
                <div className="p-4 bg-green-100 text-green-700 rounded-lg text-sm text-center font-medium animate-in fade-in slide-in-from-bottom-2">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

function ContactItem({ Icon, title, content }: { Icon: any, title: string, content: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0">
        <Icon className="text-[#009FCE] w-6 h-6 mt-1" />
      </div>
      <div>
        <h4 className="text-[#E0F5FA] text-sm font-medium mb-1 uppercase tracking-wider">{title}</h4>
        <p className="text-white text-base leading-relaxed">{content}</p>
      </div>
    </div>
  );
}
