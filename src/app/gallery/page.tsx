'use client';

import PageHeader from '@/components/common/PageHeader';
import Image from 'next/image';
import { useState } from 'react';

// Gallery images from legacy
const GALLERY_IMAGES = [
  { src: '/assets/Images/HeroPool.webp', title: 'Modern Infinity Pool', category: 'construction' },
  { src: '/assets/Images/IndoorLuxuryPool.webp', title: 'Indoor Luxury Pool', category: 'construction' },
  { src: '/assets/Images/InfintyLuxryPool.webp', title: 'Infinity Luxury Pool', category: 'construction' },
  { src: '/assets/Images/LapPoolInstallation.webp', title: 'Lap Pool Installation', category: 'construction' },
  { src: '/assets/Images/CommercialResortPool.webp', title: 'Commercial Resort Pool', category: 'construction' },
  { src: '/assets/Images/NaturalBioPool.webp', title: 'Natural Bio Pool', category: 'construction' },
  { src: '/assets/Images/fixingPump.webp', title: 'Equipment Maintenance', category: 'maintenance' },
  { src: '/assets/Images/equipmentInstallation.webp', title: 'Equipment Installation', category: 'equipment' },
  { src: '/assets/Images/chemicalTest.webp', title: 'Water Testing', category: 'maintenance' },
  { src: '/assets/Images/cleaning2.webp', title: 'Pool Cleaning Service', category: 'maintenance' },
  { src: '/assets/Images/inspection.webp', title: 'Pool Inspection', category: 'service' },
  { src: '/assets/Images/HomePool.webp', title: 'Residential Pool', category: 'construction' }
];

const CATEGORIES = ['all', 'construction', 'maintenance', 'equipment', 'service'];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredImages = selectedCategory === 'all' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === selectedCategory);

  return (
    <main>
      <PageHeader 
        title="Project Gallery"
        subtitle="Explore our portfolio of stunning swimming pool projects across Uganda"
        backgroundImage="/assets/Images/galleryhero.png"
      />

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[#009FCE] text-white shadow-lg'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-[#EEF9FC]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <div key={index} className="group relative aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-shadow">
                <Image 
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white font-semibold">{image.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#00477A] mb-4">Want your pool to look this amazing?</h2>
          <p className="text-slate-600 text-lg mb-8">Let's bring your pool vision to life</p>
          <a 
            href="/contact" 
            className="inline-block bg-[#009FCE] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#00477A] transition-colors shadow-lg hover:-translate-y-1 transform duration-300"
          >
            Start Your Project
          </a>
        </div>
      </section>
    </main>
  );
}
