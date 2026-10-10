import React, { useState, useMemo } from 'react';
import { Clock, Plus, Check, Search, MessageCircle, Sparkles } from 'lucide-react';
import { SERVICES_DATA, SALON_INFO } from '../data/salonData';
import { ServiceCategory, ServiceItem } from '../types/salon';

interface ServicesSectionProps {
  selectedServices: ServiceItem[];
  onToggleService: (service: ServiceItem) => void;
  onOpenBooking: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  selectedServices,
  onToggleService,
  onOpenBooking,
}) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: ServiceCategory; label: string }[] = [
    { id: 'all', label: 'All Services' },
    { id: 'haircut', label: 'Haircuts & Styling' },
    { id: 'beard', label: 'Beard & Shave' },
    { id: 'spa', label: 'Hair Spa & Repair' },
    { id: 'facial', label: 'Facial & D-Tan' },
    { id: 'package', label: 'Combos & Groom Packages' },
  ];

  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' ? true : item.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const isSelected = (id: string) => {
    return selectedServices.some((s) => s.id === id);
  };

  const totalAmount = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.durationMin, 0);

  return (
    <section id="services" className="py-20 bg-[#0f1117] border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#c5a059] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Menu & Transparent Pricing</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-wide">
              GROOMING SERVICES & RATE CARD
            </h2>
            <p className="text-zinc-400 text-sm mt-2 max-w-xl">
              Curated precision cuts, beard architecture, rejuvenating facials, and wedding treatments in Junagadh. Select services to build your customized appointment.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fade, beard, facial..."
              className="w-full bg-[#181b24] border border-zinc-700/80 rounded-lg pl-9 pr-4 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#c5a059] transition-colors"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#c5a059] text-black shadow-md font-semibold'
                    : 'bg-[#181b24] text-zinc-400 hover:text-zinc-200 hover:bg-[#202430] border border-zinc-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const selected = isSelected(service.id);
            return (
              <div
                key={service.id}
                className={`flex flex-col justify-between rounded-xl bg-[#141720] border transition-all duration-200 overflow-hidden group ${
                  selected
                    ? 'border-[#c5a059] ring-1 ring-[#c5a059]/40 shadow-lg shadow-[#c5a059]/5'
                    : 'border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                {/* Service image & badges */}
                <div className="relative h-44 w-full overflow-hidden bg-zinc-900">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141720] via-transparent to-transparent" />

                  {/* Highlights */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {service.masterStylistOnly && (
                      <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-amber-500/90 text-black shadow-sm">
                        Piyush Bhai Signature
                      </span>
                    )}
                    {service.popular && !service.masterStylistOnly && (
                      <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-[#181b24]/90 text-[#c5a059] border border-[#c5a059]/30">
                        Popular in Junagadh
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 right-3 flex items-center gap-1 text-[11px] font-medium text-zinc-300 bg-black/60 px-2 py-1 rounded-md backdrop-blur-sm">
                    <Clock className="w-3 h-3 text-[#c5a059]" />
                    <span>{service.durationMin} mins</span>
                  </div>
                </div>

                {/* Body details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-base font-semibold text-zinc-100 group-hover:text-[#c5a059] transition-colors leading-snug">
                        {service.name}
                      </h3>
                      <span className="font-cinzel text-lg font-bold text-[#c5a059] shrink-0">
                        ₹{service.price}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      {service.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onToggleService(service)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        selected
                          ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30'
                          : 'bg-[#1e222d] text-zinc-200 border border-zinc-700 hover:bg-[#282d3c]'
                      }`}
                    >
                      {selected ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Selected</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-[#c5a059]" />
                          <span>Add to Appointment</span>
                        </>
                      )}
                    </button>

                    {/* WhatsApp 1-click for this item */}
                    <a
                      href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello Piyush Bhai, I would like to book "${service.name}" (₹${service.price}, ~${service.durationMin} mins) at Men's World Salon.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#181b24] text-zinc-400 hover:text-emerald-400 hover:bg-[#202430] border border-zinc-700 transition-colors"
                      title="Quick WhatsApp Booking"
                      aria-label="Book on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state if search returns nothing */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-[#141720] rounded-xl border border-zinc-800">
            <p className="text-zinc-400 text-sm">No services found matching "{searchQuery}"</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-3 text-xs text-[#c5a059] underline hover:text-amber-400 font-medium"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Selected Services Summary: Desktop Floating Ribbon */}
        {selectedServices.length > 0 && (
          <>
            {/* Desktop & Tablet Floating Ribbon */}
            <div className="hidden md:flex sticky bottom-6 mt-10 z-30 max-w-2xl mx-auto bg-[#1a1d26]/95 border border-[#c5a059]/50 rounded-xl p-4 shadow-2xl backdrop-blur-md items-center justify-between gap-4">
              <div>
                <div className="text-xs text-zinc-400">
                  <span className="font-semibold text-white">{selectedServices.length}</span>{' '}
                  {selectedServices.length === 1 ? 'service' : 'services'} selected · ~{totalDuration} mins
                </div>
                <div className="font-cinzel text-lg font-bold text-[#c5a059]">
                  Estimated Total: ₹{totalAmount}
                </div>
              </div>

              <button
                onClick={onOpenBooking}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#c5a059] hover:bg-[#d4af37] text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Schedule Slot</span>
              </button>
            </div>

            {/* Mobile Static In-flow Summary (Does not collide with MobileQuickBar) */}
            <div className="md:hidden mt-8 p-4 rounded-xl bg-[#141720] border border-[#c5a059]/40 flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] text-zinc-400">
                  <strong className="text-white">{selectedServices.length}</strong> selected · ~{totalDuration} mins
                </p>
                <p className="font-cinzel text-base font-bold text-[#c5a059]">
                  Total: ₹{totalAmount}
                </p>
              </div>
              <button
                onClick={onOpenBooking}
                className="px-4 py-2 rounded-lg bg-[#c5a059] text-black font-bold text-xs uppercase tracking-wider shadow active:scale-95 cursor-pointer shrink-0"
              >
                Schedule Slot
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
