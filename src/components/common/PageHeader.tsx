import Image from 'next/image';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export default function PageHeader({ 
  title, 
  subtitle,
  backgroundImage = '/assets/Images/HeroPool.webp'
}: PageHeaderProps) {
  return (
    <section className="relative bg-gradient-to-br from-[#002B4A] to-[#00477A] py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <Image 
          src={backgroundImage}
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#009FCE]/30 to-[#00477A]/50" />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-white/80 mb-6 text-sm">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <span className="text-white font-medium">{title}</span>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            {title}
          </h1>
          
          {/* Subtitle */}
          {subtitle && (
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              {subtitle}
            </p>
          )}
          
          {/* Decorative Line */}
          <div className="mt-8 flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#009FCE] to-transparent rounded-full" />
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/10 rounded-full animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-white/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
    </section>
  );
}
