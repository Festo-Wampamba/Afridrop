import { Award, ShieldCheck, DollarSign } from 'lucide-react';
import Image from 'next/image';
import Counter from '../common/Counter';

const FEATURES = [
  {
    title: 'Certified Professionals',
    description: 'Our team consists of certified pool technicians with extensive training and experience.',
    Icon: Award
  },
  {
    title: 'Expert-Level Support',
    description: 'Get professional advice and support for all your swimming pool needs and concerns.',
    Icon: ShieldCheck
  },
  {
    title: 'Competitive Pricing',
    description: 'We offer high-quality services at competitive prices to fit various budgets.',
    Icon: DollarSign
  }
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-[#EEF9FC]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#00477A] mb-4">Why Choose Afridrop Solutions</h2>
          <p className="text-slate-600 text-lg">We are Uganda's trusted swimming pool specialists with years of experience</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div>
            <div className="space-y-8 mb-12">
              {FEATURES.map((feature, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-lg hover:bg-white hover:shadow-md transition-all">
                  <div className="shrink-0 bg-[#009FCE]/10 p-3 rounded-lg h-fit">
                    <feature.Icon className="text-[#009FCE] w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#00477A] mb-2">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-8 justify-center lg:justify-start">
              <Stat number={100} suffix="+" label="Projects Completed" />
              <Stat number={99} suffix="%" label="Client Satisfaction" />
            </div>
          </div>

          {/* Image Column */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#009FCE]/20 to-[#00477A]/20 rounded-2xl transform transition-transform group-hover:scale-105" />
            <Image 
              src="/assets/Images/AfridropServices.webp" 
              alt="Afridrop Solutions Team" 
              width={600} 
              height={400} 
              className="rounded-2xl shadow-xl w-full h-auto object-cover transform transition-transform group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, suffix, label }: { number: number; suffix: string; label: string }) {
  return (
    <div className="text-center bg-white/70 p-6 rounded-lg shadow-sm hover:-translate-y-1 transition-transform min-w-[140px]">
      <Counter 
        end={number} 
        suffix={suffix}
        className="text-4xl font-extrabold text-[#009FCE] mb-1"
      />
      <div className="text-sm font-medium text-slate-600">{label}</div>
    </div>
  );
}
