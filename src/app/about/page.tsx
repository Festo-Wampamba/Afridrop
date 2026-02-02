import PageHeader from '@/components/common/PageHeader';
import Counter from '@/components/common/Counter';
import Image from 'next/image';
import { Target, Eye, Award, ShieldCheck, Users, TrendingUp } from 'lucide-react';

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    description: "We conduct ourselves with honesty and transparency in all our interactions. Our clients can trust us to deliver on our promises and maintain the highest ethical standards."
  },
  {
    icon: Award,
    title: "Quality",
    description: "From materials selection to workmanship, we never compromise on quality. We believe in doing things right the first time and creating solutions that stand the test of time."
  },
  {
    icon: Users,
    title: "Local Expertise",
    description: "We combine global best practices with deep local knowledge. Our solutions are specifically tailored for Ugandan conditions, climate, and requirements."
  },
  {
    icon: Target,
    title: "Customer First",
    description: "Your satisfaction is our priority. We listen carefully to your needs and preferences, and work collaboratively to deliver personalized solutions that exceed your expectations."
  },
  {
    icon: TrendingUp,
    title: "Innovation",
    description: "We continuously seek better ways to serve our clients through new technologies, methods, and ideas. We stay at the forefront of industry developments."
  },
  {
    icon: Eye,
    title: "Continuous Growth",
    description: "We invest in the ongoing development of our team and processes. Through regular training and certification, we ensure our staff remains the most knowledgeable in the industry."
  }
];

const TEAM = [
  {
    name: "Asaba Gorret",
    position: "Founder & CEO",
    image: "/assets/Images/CEOgorret.webp",
    bio: "With over 15 years of experience in pool construction and management, Asaba founded Afridrop Solutions to bring world-class pool services to Uganda."
  },
  {
    name: "Muwanguzi Festo",
    position: "Technical Director",
    image: "/assets/Images/Festo.webp",
    bio: "Festo oversees all technical aspects of our projects, bringing his engineering expertise and international certification to ensure the highest standards."
  },
  {
    name: "Murungi Moriss",
    position: "Head of Operations",
    image: "/assets/Images/moris.webp",
    bio: "Moriss ensures that all our projects run smoothly from start to finish, coordinating our team of technicians and managing client relationships."
  },
  {
    name: "Solomon",
    position: "Water Quality Specialist",
    image: "/assets/Images/Engineer.webp",
    bio: "With a background in chemistry and water treatment, Solomon leads our water quality division, ensuring safe and balanced pool water for all our clients."
  }
];

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden">
      <PageHeader 
        title="About Us"
        subtitle="Learn who we are & how we're revolutionizing pool services across Uganda"
        backgroundImage="/assets/Images/abouthero.webp"
      />

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#009FCE]/20 to-[#00477A]/20 rounded-2xl transform group-hover:scale-105 transition-transform" />
              <Image 
                src="/assets/Images/AfridropTeamProfile.webp"
                alt="Afridrop Solutions Team at Work"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl w-full h-auto object-cover relative z-10"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#00477A] mb-6">Our Story</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>Afridrop Solutions Limited was founded in 2015 with a vision to transform the swimming pool industry in Uganda. What started as a small team of passionate pool enthusiasts has grown into a comprehensive pool solutions provider with a reputation for excellence.</p>
                <p>Over the years, we've grown from handling basic pool maintenance to becoming the country's most trusted name in pool construction, renovation, maintenance, and water treatment. Our journey has been defined by our commitment to quality, innovation, and customer satisfaction.</p>
                <p>Today, we serve residential and commercial clients across Uganda, bringing world-class pool solutions and expertise to every project we undertake. Our team of certified professionals continues to raise the standard for pool services in the region.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[#EEF9FC]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-[#009FCE]/10 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-[#009FCE]" />
              </div>
              <h3 className="text-2xl font-bold text-[#00477A] mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">To provide exceptional swimming pool solutions that enhance the quality of life for our clients through professional service, innovative technology, and sustainable practices. We aim to exceed expectations in every project we undertake.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-[#009FCE]/10 rounded-full flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-[#009FCE]" />
              </div>
              <h3 className="text-2xl font-bold text-[#00477A] mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">To be the leading swimming pool solutions provider in East Africa, recognized for our excellence, innovation, and commitment to sustainability. We aspire to set the industry standard for quality, service, and customer satisfaction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#00477A] mb-4">Our Core Values</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">These principles guide everything we do and every decision we make</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VALUES.map((value, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-[#EEF9FC] p-6 rounded-xl border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-[#009FCE]/10 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-[#009FCE]" />
                </div>
                <h3 className="text-xl font-bold text-[#00477A] mb-3">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-[#EEF9FC]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#00477A] mb-4">Meet Our Team</h2>
            <p className="text-slate-600 text-lg">The skilled professionals who make our success possible</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#00477A] mb-1">{member.name}</h3>
                  <p className="text-[#009FCE] font-medium mb-3">{member.position}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-[#009FCE] to-[#00477A] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <Counter 
                end={100} 
                suffix="+"
                className="text-5xl md:text-6xl font-extrabold mb-2"
              />
              <p className="text-xl text-white/90">Projects Completed</p>
            </div>
            <div className="text-center">
              <Counter 
                end={200} 
                suffix="+"
                className="text-5xl md:text-6xl font-extrabold mb-2"
              />
              <p className="text-xl text-white/90">Happy Clients</p>
            </div>
            <div className="text-center">
              <Counter 
                end={25} 
                suffix=""
                className="text-5xl md:text-6xl font-extrabold mb-2"
              />
              <p className="text-xl text-white/90">Team Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#00477A] mb-4">Ready to work with us?</h2>
          <p className="text-slate-600 text-lg mb-8">Contact our team today to discuss your swimming pool needs</p>
          <a 
            href="/contact" 
            className="inline-block bg-[#009FCE] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#00477A] transition-colors shadow-lg hover:-translate-y-1 transform duration-300"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}
