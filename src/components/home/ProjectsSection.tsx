import Image from 'next/image';
import Link from 'next/link';

const PROJECTS = [
  {
    id: 1,
    title: 'Homeowner, Pool',
    location: 'Kampala, Uganda',
    image: '/assets/Images/HomePool.webp'
  },
  {
    id: 2,
    title: 'Commercial Resort Pool',
    location: 'Entebbe, Uganda',
    image: '/assets/Images/CommercialResortPool.webp'
  },
  {
    id: 3,
    title: 'Infinity Luxury Pool',
    location: 'Hoima, Uganda',
    image: '/assets/Images/InfintyLuxryPool.webp'
  },
  {
    id: 4,
    title: 'Lap Pool Installation',
    location: 'Mbarara, Uganda',
    image: '/assets/Images/LapPoolInstallation1.webp'
  },
  {
    id: 5,
    title: 'Natural Bio Pool',
    location: 'Fort Portal, Uganda',
    image: '/assets/Images/NaturalBioPool.webp'
  },
  {
    id: 6,
    title: 'Indoor Luxury Pool',
    location: 'Kampala, Uganda',
    image: '/assets/Images/IndoorLuxuryPool.webp'
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#00477A] mb-4">Our Featured Projects</h2>
          <p className="text-slate-600 text-lg">
            Explore some of our recent swimming pool construction and renovation projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {PROJECTS.map((project) => (
            <div 
              key={project.id}
              className="group relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg cursor-pointer"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white text-xl font-bold mb-1">{project.title}</h3>
                <p className="text-[#E0F5FA] text-sm flex items-center gap-2">
                 {project.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            href="/gallery" 
            className="inline-block bg-[#009FCE] hover:bg-[#007FA5] text-white px-8 py-3 rounded-lg font-bold shadow-md transition-all hover:-translate-y-1"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
