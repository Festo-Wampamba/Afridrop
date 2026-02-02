import PageHeader from '@/components/common/PageHeader';
import Image from 'next/image';
import { Check } from 'lucide-react';
import PoolConfigurator from '@/components/services/PoolConfigurator';

// Services data extracted from legacy
const SERVICES = [
  {
    id: 'construction',
    title: 'Pool Construction',
    description: 'Our expert team designs and builds custom swimming pools for residential and commercial properties.',
    image: '/assets/Images/PoolConstruction.webp',
    features: ['Custom pool design', 'Concrete and fiberglass options', 'Infinity edge and lap pools', 'Complete landscaping integration']
  },
  {
    id: 'renovation',
    title: 'Pool Renovation',
    description: 'Transform your existing pool with our comprehensive renovation services.',
    image: '/assets/Images/Water_Treatment.webp',
    features: ['Surface resurfacing', 'Tile replacement', 'Deck renovation', 'Equipment upgrades']
  },
  {
    id: 'maintenance',
    title: 'Pool Maintenance',
    description: 'Keep your pool in perfect condition with our regular maintenance services.',
    image: '/assets/Images/fixingPump.webp',
    features: ['Water testing and balancing', 'Skimming and vacuuming', 'Filter cleaning', 'Equipment inspection']
  },
  {
    id: 'treatment',
    title: 'Water Treatment',
    description: 'Our professional water treatment services ensure your pool water is clean and safe.',
    image: '/assets/Images/waterTreatment.png',
    features: ['Chemical balancing', 'Algae prevention and treatment', 'Sanitization systems', 'Water quality testing']
  },
  {
    id: 'equipment',
    title: 'Equipment Installation',
    description: 'We supply and install high-quality pool equipment from leading manufacturers.',
    image: '/assets/Images/equipmentInstallation.webp',
    features: ['Pump and filter installation', 'Heating systems', 'Automation and controls', 'Lighting systems']
  },
  {
    id: 'cleaning',
    title: 'Pool Cleaning',
    description: 'Our thorough cleaning services keep your pool sparkling clean and inviting.',
    image: '/assets/Images/cleaning2.webp',
    features: ['Surface skimming', 'Vacuuming and brushing', 'Tile and grout cleaning', 'Deck washing']
  },
  {
    id: 'chemicals',
    title: 'Chemical Supply',
    description: 'We provide a full range of pool chemicals to keep your water crystal clear.',
    image: '/assets/Images/chemicalStore.webp',
    features: ['Chlorine and sanitizers', 'pH adjusters', 'Algaecides', 'Specialty chemicals']
  },
  {
    id: 'inspection',
    title: 'Inspection Services',
    description: 'Our comprehensive inspection services identify potential issues before they become major problems.',
    image: '/assets/Images/inspection.webp',
    features: ['Equipment diagnostics', 'Leak detection', 'Structural assessment', 'Safety compliance checks']
  }
];

// Detailed process steps matching the new design
const PROCESS_STEPS = [
  { 
    number: 1, 
    title: 'Consultation & Design', 
    duration: '1-2 weeks',
    items: [
      'Site assessment & measurements',
      'Custom design creation',
      '3D visualization & approval',
      'Material selection & pricing'
    ],
    role: 'Provide vision, approve designs, select materials',
    badgeColor: 'bg-slate-200 text-slate-700',
    roleColor: 'bg-slate-100 text-slate-700'
  },
  { 
    number: 2, 
    title: 'Permits & Planning', 
    duration: '2-3 weeks',
    items: [
      'Building permit applications',
      'Utility marking & clearance',
      'Engineering approvals',
      'Construction scheduling'
    ],
    role: 'Provide property documents, sign permit applications',
    badgeColor: 'bg-indigo-100 text-indigo-700',
    roleColor: 'bg-indigo-50 text-indigo-700'
  },
  { 
    number: 3, 
    title: 'Excavation', 
    duration: '3-5 days',
    items: [
      'Precise pool excavation',
      'Soil removal & disposal',
      'Grade verification',
      'Site preparation for installation'
    ],
    role: 'Ensure site access, relocate outdoor items',
    badgeColor: 'bg-amber-100 text-amber-700',
    roleColor: 'bg-amber-50 text-amber-700'
  },
  { 
    number: 4, 
    title: 'Installation', 
    duration: '2-3 weeks',
    items: [
      'Steel reinforcement installation',
      'Plumbing & electrical rough-in',
      'Concrete/gunite application',
      'Equipment installation'
    ],
    role: 'Monitor progress, approve change orders',
    badgeColor: 'bg-cyan-100 text-cyan-700',
    roleColor: 'bg-cyan-50 text-cyan-700'
  },
  { 
    number: 5, 
    title: 'Finishing', 
    duration: '1-2 weeks',
    items: [
      'Tile & coping installation',
      'Interior surface application',
      'Decking & landscaping',
      'Final electrical connections'
    ],
    role: 'Final material approvals, walkthrough preparation',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    roleColor: 'bg-emerald-50 text-emerald-700'
  },
  { 
    number: 6, 
    title: 'Handover', 
    duration: '2-3 days',
    items: [
      'Pool filling & startup',
      'Equipment training',
      'Maintenance instructions',
      'Warranty documentation'
    ],
    role: 'Final inspection, equipment training, enjoy your pool!',
    badgeColor: 'bg-slate-200 text-slate-700',
    roleColor: 'bg-slate-100 text-slate-700'
  }
];

export default function ServicesPage() {
  return (
    <main>
      <PageHeader 
        title="Our Services"
        subtitle="Professional Pool Solutions for Every Need"
      />

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#00477A] mb-4">Comprehensive Pool Services</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">From construction to maintenance, we provide all the services you need</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service) => (
              <div key={service.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="h-48 relative overflow-hidden">
                  <Image 
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#00477A] mb-2">{service.title}</h3>
                  <p className="text-slate-600 mb-4 text-sm">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-[#009FCE] shrink-0 mt-0.5" />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a 
                    href="/contact" 
                    className="block text-center bg-[#009FCE] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#00477A] transition-colors"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-[#f8fafc] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#00477A] mb-6">Our Construction Process</h2>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Six proven phases that ensure your pool construction is completed on time, within budget, and exceeds expectations.
            </p>
          </div>
          
          {/* Process Steps Container */}
          <div className="relative">
            <div className="flex flex-col md:flex-row md:overflow-x-auto pb-12 gap-8 md:snap-x md:snap-mandatory px-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {PROCESS_STEPS.map((step) => (
                <div 
                  key={step.number} 
                  className="w-full md:w-auto md:min-w-[380px] bg-white p-8 rounded-3xl md:snap-center shadow-lg border border-slate-100 flex-none flex flex-col"
                >
                  <div className="flex items-start gap-6 mb-6">
                    <div className={`w-14 h-14 ${step.badgeColor} rounded-2xl flex items-center justify-center text-xl font-bold shrink-0`}>
                      {step.number}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-1">{step.title}</h3>
                      <p className="text-slate-500 font-medium">{step.duration}</p>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {step.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm">
                         <Check className="w-5 h-5 text-[#009FCE] shrink-0" />
                         <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={`p-4 rounded-xl ${step.roleColor} border border-transparent`}>
                     <p className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">Your Role:</p>
                     <p className="text-sm font-medium leading-snug">{step.role}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Fade indicators (Desktop only) */}
            <div className="hidden md:block absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-[#f8fafc] to-transparent pointer-events-none" />
            <div className="hidden md:block absolute top-0 left-0 h-full w-4 bg-gradient-to-r from-[#f8fafc] to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Pool Configurator */}
      <PoolConfigurator />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#009FCE] to-[#00477A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Pool Experience?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Contact us today for a free consultation and quote</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/contact" className="bg-white text-[#009FCE] px-8 py-4 rounded-lg font-semibold hover:bg-slate-100 transition-colors shadow-lg">
              Get a Quote
            </a>
            <a href="tel:+256784464754" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Call Us: +256 7844 64754
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
