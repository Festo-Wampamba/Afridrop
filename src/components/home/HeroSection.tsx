import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/Images/HeroPool.webp')" }}
      >
        <div className="absolute inset-0 bg-[#002B4A]/70 mix-blend-multiply" />
      </div>

      <div className="container relative z-10 px-4 text-center mt-16 text-balance">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight drop-shadow-sm">
          Professional Pool Services & Solutions
        </h1>
        
        <div className="flex flex-wrap justify-center gap-3 mb-10 text-sm md:text-base font-medium text-slate-800">
          {['Pool Construction', 'Design', 'Maintenance', 'Water Treatment'].map((tag) => (
            <span 
              key={tag}
              className="bg-[#B6E9F4]/90 px-3 py-1 rounded-md shadow-sm backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/services" 
            className="bg-[#009FCE] hover:bg-[#007FA5] hover:-translate-y-1 transition-all text-white px-8 py-3.5 rounded-lg font-bold shadow-lg"
          >
            Our Services
          </Link>
          <Link 
            href="/contact" 
            className="bg-transparent border-2 border-[#009FCE] text-[#009FCE] hover:bg-[#009FCE] hover:text-white hover:-translate-y-1 transition-all px-8 py-3.5 rounded-lg font-bold backdrop-blur-sm shadow-lg"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
