import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#002B4A] to-[#00477A] text-white pt-16 relative border-t-4 border-[#009FCE]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Column */}
          <div className="space-y-6">
            <div className="bg-white/10 p-2 rounded-lg inline-block w-fit">
               <Image
                src="/assets/Images/logo_Afridrop_Solutions.png"
                alt="Afridrop Solutions Logo"
                width={147}
                height={75}
                className="h-16 w-auto"
              />
            </div>
            <p className="text-[#E0F5FA] text-sm leading-relaxed">
              Afridrop Solutions Limited is Uganda's premier swimming pool construction, maintenance, and water treatment provider, delivering exceptional quality and service.
            </p>
            <div className="flex gap-4">
              <SocialLink href="https://facebook.com" icon={<Facebook size={18} />} label="Facebook" />
              <SocialLink href="https://twitter.com" icon={<Twitter size={18} />} label="Twitter" />
              <SocialLink href="https://instagram.com" icon={<Instagram size={18} />} label="Instagram" />
              <SocialLink href="https://linkedin.com" icon={<Linkedin size={18} />} label="LinkedIn" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-[#009FCE]">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/about" label="About Us" />
              <FooterLink href="/services" label="Services" />
              <FooterLink href="/gallery" label="Project Gallery" />
              <FooterLink href="/blog" label="Blog" />
              <FooterLink href="/contact" label="Contact Us" />
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-[#009FCE]">
              Our Services
            </h3>
            <ul className="space-y-3">
              <FooterLink href="/services#construction" label="Pool Construction" />
              <FooterLink href="/services#renovation" label="Pool Renovation" />
              <FooterLink href="/services#maintenance" label="Pool Maintenance" />
              <FooterLink href="/services#treatment" label="Water Treatment" />
              <FooterLink href="/services#equipment" label="Equipment Installation" />
              <FooterLink href="/services#inspection" label="Inspection Services" />
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-[#009FCE]">
              Contact Information
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-4 text-sm text-[#E0F5FA]">
                <MapPin className="text-[#009FCE] shrink-0" size={20} />
                <span>Plot 67b, Spring Road Bugolobi, Kisakye<br />Complex Room G02 P.O Box 72312 Kampala.</span>
              </li>
              <li className="flex gap-4 text-sm text-[#E0F5FA]">
                <Phone className="text-[#009FCE] shrink-0" size={20} />
                <div className="flex flex-col gap-1">
                  <a href="tel:+256784464754" className="hover:text-[#009FCE] transition-colors">+256 7844 64754</a>
                  <a href="tel:+2567527737779" className="hover:text-[#009FCE] transition-colors">+256 7527737779</a>
                </div>
              </li>
              <li className="flex gap-4 text-sm text-[#E0F5FA]">
                <Mail className="text-[#009FCE] shrink-0" size={20} />
                <div className="flex flex-col gap-1">
                  <a href="mailto:sales@afridropsolutions.com" className="hover:text-[#009FCE] transition-colors">sales@afridropsolutions.com</a>
                  <a href="mailto:info@afridropsolutions.com" className="hover:text-[#009FCE] transition-colors">info@afridropsolutions.com</a>
                </div>
              </li>
              <li className="flex gap-4 text-sm text-[#E0F5FA]">
                <Clock className="text-[#009FCE] shrink-0" size={20} />
                <span>Mon-Fri: 8:00 AM - 6:00 PM<br />Sat: 9:00 AM - 2:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
                <span className="text-sm text-[#E0F5FA] font-medium">Payment Methods</span>
                <div className="flex gap-2">
                    <button className="bg-white p-1 rounded h-8 w-10 relative flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-sm">
                      <Image src="/assets/Images/mobilemoney.png" alt="Mobile Money" fill className="object-contain p-0.5" />
                    </button>
                    <button className="bg-white p-1 rounded h-8 w-10 relative flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-sm">
                      <Image src="/assets/Images/airtel.png" alt="Airtel" fill className="object-contain p-0.5" />
                    </button>
                    <button className="bg-white p-1 rounded h-8 w-10 relative flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-sm">
                      <Image src="/assets/Images/visa.png" alt="Visa" fill className="object-contain p-0.5" />
                    </button>
                    <button className="bg-white p-1 rounded h-8 w-10 relative flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-sm">
                      <Image src="/assets/Images/card1.png" alt="Mastercard" fill className="object-contain p-0.5" />
                    </button>
                </div>
            </div>
            <div className="text-sm text-[#E0F5FA] text-center">
                &copy; {currentYear} Afridrop Solutions Limited. All Rights Reserved.
            </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-[#009FCE] hover:-translate-y-1 hover:shadow-lg transition-all"
    >
      {icon}
    </a>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-[#E0F5FA] text-sm hover:text-[#009FCE] hover:translate-x-1 transition-all inline-block"
      >
        {label}
      </Link>
    </li>
  );
}
