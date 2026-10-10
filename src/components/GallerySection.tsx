import React, { useState } from 'react';
import { Camera, X, ZoomIn } from 'lucide-react';
import { GALLERY_ITEMS, SALON_INFO } from '../data/salonData';

export const GallerySection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'interior' | 'haircut' | 'beard' | 'academy'>('all');
  const [activeImage, setActiveImage] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  return (
    <section id="gallery" className="py-20 bg-[#0b0d11] border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181b24] border border-[#c5a059]/30 text-xs font-semibold text-[#c5a059] uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Salon Ambiance & Work</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-wide mb-3">
            PHOTOS & VIDEOS GALLERY
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Take a look inside Men's World Salon at Manshi Shopping Complex, Junagadh. From real haircut transformations to our hygiene stations and academy workshops.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Media' },
            { id: 'interior', label: 'Interior & Stations' },
            { id: 'haircut', label: 'Haircut Transformations' },
            { id: 'beard', label: 'Beard Sculpting' },
            { id: 'academy', label: 'Academy Workshops' },
          ].map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#c5a059] text-black font-semibold shadow'
                    : 'bg-[#181b24] text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid - All boxes follow the identical elegant card design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="group relative rounded-xl overflow-hidden bg-[#141720] border border-zinc-800/80 cursor-pointer aspect-4/3 shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Overlay Content */}
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="text-[10px] font-semibold text-[#c5a059] uppercase tracking-wider block mb-1">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold text-white group-hover:text-[#c5a059] transition-colors leading-tight">
                  {item.title}
                </h4>
                <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">
                  {item.caption}
                </p>
              </div>

              {/* Zoom icon badge */}
              <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setActiveImage(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-[#141720] rounded-2xl overflow-hidden border border-zinc-700 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[70vh] bg-black flex items-center justify-center p-4">
                <img
                  src={activeImage.image}
                  alt={activeImage.title}
                  className="max-h-[70vh] w-auto object-contain mx-auto"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 bg-[#181b24] flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white font-cinzel">
                    {activeImage.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">{activeImage.caption}</p>
                </div>

                <a
                  href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello Piyush Bhai, I liked the style in "${activeImage.title}" on your website gallery. Can I book an appointment for this look?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#c5a059] hover:bg-[#d4af37] text-black font-semibold text-xs transition-colors shrink-0"
                >
                  Book This Look
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
