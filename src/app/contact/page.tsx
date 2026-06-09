'use client';

import PageHeader from '@/components/common/PageHeader';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';
import dynamic from 'next/dynamic';

// Leaflet touches window; load client-side only.
const MapView = dynamic(() => import('@/components/common/MapView'), {
  ssr: false,
  loading: () => <div className="h-[450px] w-full bg-slate-100 animate-pulse" />,
});

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('Sending...');
    
    // In production, this would submit to your backend
    setTimeout(() => {
      setFormStatus('Thank you! We\'ll get back to you soon.');
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <main>
      <PageHeader 
        title="Get In Touch"
        subtitle="We're here to answer any questions about our services"
      />

      {/* Contact Info Bar */}
      <section className="bg-white shadow-md py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#009FCE]/10 rounded-full flex items-center justify-center">
                <Phone className="text-[#009FCE]" size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Call Us Today</p>
                <a href="tel:+256784464754" className="font-semibold text-[#00477A] hover:text-[#009FCE] transition-colors">+256 7844 64754</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#009FCE]/10 rounded-full flex items-center justify-center">
                <Mail className="text-[#009FCE]" size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Email Us</p>
                <a href="mailto:info@afridropsolutions.com" className="font-semibold text-[#00477A] hover:text-[#009FCE] transition-colors">info@afridropsolutions.com</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#009FCE]/10 rounded-full flex items-center justify-center">
                <Clock className="text-[#009FCE]" size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Working Hours</p>
                <p className="font-semibold text-[#00477A]">Mon-Fri: 8:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 bg-[#EEF9FC]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <h2 className="text-3xl font-bold text-[#00477A] mb-6">Contact Information</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Have questions about our services or want to schedule a consultation? Reach out to us using any of the methods below.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#009FCE]/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="text-[#009FCE]" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#00477A] mb-1">Our Location</h3>
                    <p className="text-slate-600">Plot 67b, Spring Road Bugolobi, Kisakye<br/>Complex Room G02 P.O Box 72312 Kampala</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#009FCE]/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="text-[#009FCE]" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#00477A] mb-1">Phone Numbers</h3>
                    <p className="text-slate-600 flex flex-col gap-1">
                      <a href="tel:+256784464754" className="hover:text-[#009FCE] transition-colors w-fit">+256 7844 64754</a>
                      <a href="tel:+256752737779" className="hover:text-[#009FCE] transition-colors w-fit">+256 7527 37779</a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#009FCE]/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="text-[#009FCE]" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#00477A] mb-1">Email Addresses</h3>
                    <p className="text-slate-600 flex flex-col gap-1">
                      <a href="mailto:sales@afridropsolutions.com" className="hover:text-[#009FCE] transition-colors w-fit">sales@afridropsolutions.com</a>
                      <a href="mailto:info@afridropsolutions.com" className="hover:text-[#009FCE] transition-colors w-fit">info@afridropsolutions.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#009FCE]/10 rounded-full flex items-center justify-center shrink-0">
                    <Clock className="text-[#009FCE]" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#00477A] mb-1">Business Hours</h3>
                    <p className="text-slate-600">Mon-Fri: 8:00 AM - 6:00 PM<br/>Sat: 9:00 AM - 2:00 PM<br/>Sun: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <h3 className="text-2xl font-bold text-[#00477A] mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009FCE]/50 focus:border-[#009FCE]"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Your Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009FCE]/50 focus:border-[#009FCE]"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009FCE]/50 focus:border-[#009FCE]"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009FCE]/50 focus:border-[#009FCE]"
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-[#009FCE] text-white px-6 py-4 rounded-lg font-semibold hover:bg-[#00477A] transition-colors shadow-lg"
                >
                  Send Message
                </button>
                
                {formStatus && (
                  <p className="text-center text-[#009FCE] font-medium">{formStatus}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[450px]">
        <MapView
          center={[0.3176, 32.6133]}
          zoom={15}
          markers={[{ lat: 0.3176, lng: 32.6133, label: 'Afridrop Solutions — Bugolobi, Kampala' }]}
          className="h-[450px] w-full"
        />
      </section>
    </main>
  );
}
