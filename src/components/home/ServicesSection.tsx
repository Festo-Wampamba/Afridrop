import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    id: 'construction',
    title: 'Pool Construction',
    description: 'Custom swimming pool design and construction for residential and commercial properties. We handle everything from concept to completion.',
    icon: '/assets/Images/pool-construction.png',
    link: '/services#construction'
  },
  {
    id: 'treatment',
    title: 'Water Treatment',
    description: 'Professional water treatment services to ensure your pool water is clean, balanced, and safe for swimming all year round.',
    icon: '/assets/Images/water-treatment.png',
    link: '/services#treatment'
  },
  {
    id: 'maintenance',
    title: 'Pool Maintenance',
    description: 'Regular maintenance services to keep your pool in perfect condition, including cleaning, equipment checks, and repairs.',
    icon: '/assets/Images/maintenance.png',
    link: '/services#maintenance'
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#00477A] mb-4">Our Premium Services</h2>
          <p className="text-slate-600 text-lg">
            We offer comprehensive swimming pool solutions for residential and commercial clients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-xl shadow-md p-8 hover:-translate-y-2 hover:shadow-xl hover:bg-[#B6E9F4]/10 transition-all duration-300 group"
            >
              <div className="mb-6 bg-[#009FCE]/10 w-20 h-20 rounded-full flex items-center justify-center group-hover:bg-[#009FCE]/20 transition-colors">
                <Image 
                  src={service.icon} 
                  alt={`${service.title} Icon`} 
                  width={64} 
                  height={64} 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-[#00477A] mb-4 group-hover:text-[#002B4A] transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              <Link 
                href={service.link}
                className="inline-flex items-center text-[#009FCE] font-semibold group-hover:text-[#007FA5] transition-colors"
              >
                View Services 
                <ArrowRight size={18} className="ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
