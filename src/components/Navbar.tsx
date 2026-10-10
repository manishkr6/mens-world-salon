import React, { useEffect } from 'react';
import { Phone, MessageCircle, MapPin, Calendar, Clock, Menu, X, Scissors, Award, Star } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { ServiceItem } from '../types/salon';
import { Logo } from './Logo';

interface NavbarProps {
  selectedServices: ServiceItem[];
  onOpenBooking: () => void;
  onNavigateSection: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedServices,
  onOpenBooking,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const totalAmount = selectedServices.reduce((sum, s) => sum + s.price, 0);

  // Prevent background website scrolling when hamburger menu is open on mobile & tablet
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;
      
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      // Intercept touch movements outside the menu container
      const handleTouchMove = (e: TouchEvent) => {
        const scrollContainer = document.getElementById('mobile-nav-scroll-container');
        if (!scrollContainer || !scrollContainer.contains(e.target as Node)) {
          e.preventDefault();
        }
      };

      document.addEventListener('touchmove', handleTouchMove, { passive: false });

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
        document.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, [mobileMenuOpen]);

  const handleNav = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0b0d11] border-b border-zinc-800 shadow-xl">
      {/* Top micro banner - compact and responsive on mobile */}
      <div className="bg-[#12151e] border-b border-zinc-800/80 py-1.5 px-3 sm:px-4 text-xs text-zinc-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-[11px] sm:text-xs">
          {/* Left: Status & Location */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Open 9 AM-10 PM</span>
            </span>

            <span className="text-zinc-600 hidden xs:inline">·</span>

            {/* Clickable Google Maps Location Link */}
            <a
              href={SALON_INFO.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-[#c5a059] transition-colors truncate hidden xs:inline-flex items-center gap-1"
              title="Open Google Maps Directions: Above Manshi Shopping Complex, Zanzarda Rd, Vishnu Colony, Junagadh"
            >
              <MapPin className="w-3 h-3 text-[#c5a059] shrink-0" />
              <span className="hidden md:inline font-medium truncate">
                Above Manshi Shopping Complex, Zanzarda Rd, Junagadh
              </span>
              <span className="inline md:hidden font-medium truncate">
                Zanzarda Rd, Junagadh
              </span>
            </a>
          </div>

          {/* Right: Direct Contacts */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={`tel:${SALON_INFO.phoneRaw}`}
              className="hover:text-[#c5a059] transition-colors flex items-center gap-1 text-zinc-300 font-medium"
              title="Call Men's World Salon"
            >
              <Phone className="w-3 h-3 text-[#c5a059]" />
              <span className="hidden sm:inline">{SALON_INFO.phone}</span>
              <span className="sm:hidden">Call</span>
            </a>

            <span className="text-zinc-600">·</span>

            <a
              href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent("Hello Piyush Bhai, I'd like to inquire about appointment availability at Men's World Salon & Academy.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 font-medium"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2">
        {/* Brand */}
        <button
          onClick={() => handleNav('hero')}
          className="text-left group focus:outline-none cursor-pointer shrink-0"
        >
          <Logo size="sm" showText={true} />
        </button>

        {/* Desktop Nav Links (Visible on Large Desktops only) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-zinc-300">
          <button
            onClick={() => handleNav('services')}
            className="hover:text-[#c5a059] transition-colors focus:outline-none cursor-pointer"
          >
            Services & Prices
          </button>
          <button
            onClick={() => handleNav('compare')}
            className="hover:text-[#c5a059] transition-colors focus:outline-none flex items-center gap-1.5 cursor-pointer"
          >
            <span>Signature Packages</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#c5a059]/15 text-[#c5a059] border border-[#c5a059]/30">
              Save 40%
            </span>
          </button>
          <button
            onClick={() => handleNav('academy')}
            className="hover:text-[#c5a059] transition-colors focus:outline-none cursor-pointer"
          >
            Academy Courses
          </button>
          <button
            onClick={() => handleNav('map-directions')}
            className="hover:text-[#c5a059] transition-colors focus:outline-none cursor-pointer"
          >
            Location
          </button>
          <button
            onClick={() => handleNav('reviews')}
            className="hover:text-[#c5a059] transition-colors focus:outline-none cursor-pointer"
          >
            Reviews (4.4★)
          </button>
          <button
            onClick={() => handleNav('gallery')}
            className="hover:text-[#c5a059] transition-colors focus:outline-none cursor-pointer"
          >
            Gallery
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Booking Trigger - cleanly adapts to mobile and desktop without wrapping */}
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-lg bg-[#c5a059] text-black font-bold text-xs sm:text-sm hover:bg-[#d6b26d] transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="hidden sm:inline">Book Appointment</span>
            <span className="sm:hidden">Book</span>
            {selectedServices.length > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] sm:text-xs bg-black text-[#c5a059] rounded font-bold ml-0.5">
                {selectedServices.length} · ₹{totalAmount}
              </span>
            )}
          </button>

          {/* Hamburger menu trigger (visible on mobile, tab, and medium devices) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-zinc-800/80 text-zinc-200 hover:text-white hover:bg-zinc-700 focus:outline-none cursor-pointer transition-colors shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#c5a059]" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Full Screen Navigation Drawer (locks background scroll completely) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-[#0b0d11]">
          {/* Drawer Top Header with Close Button */}
          <div className="flex items-center justify-between px-4 h-16 border-b border-zinc-800 bg-[#0f1117] shrink-0">
            <Logo size="sm" showText={true} />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5 text-[#c5a059]" />
            </button>
          </div>

          {/* Drawer Scrollable Content with isolated overscroll contain */}
          <div
            id="mobile-nav-scroll-container"
            className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 space-y-6"
            style={{ WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain' }}
          >
            {/* Quick Primary Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#c5a059] text-black font-bold text-xs uppercase tracking-wider shadow-md active:scale-95 cursor-pointer text-center"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>
                  {selectedServices.length > 0 ? `Book (${selectedServices.length}) ₹${totalAmount}` : 'Book Slot'}
                </span>
              </button>

              <a
                href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent("Hello Piyush Bhai, I want to book an appointment at Men's World Salon Junagadh.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 font-bold text-xs uppercase tracking-wider active:scale-95 text-center"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Navigation Sections */}
            <div className="space-y-1.5 border-t border-b border-zinc-800/80 py-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 px-3 mb-2">
                Navigation Menu
              </p>

              <button
                onClick={() => handleNav('services')}
                className="w-full flex items-center justify-between p-3 rounded-xl text-zinc-200 hover:text-white hover:bg-zinc-800/60 font-semibold text-sm transition-colors text-left cursor-pointer"
              >
                <span>✂️ Services & Pricing</span>
                <span className="text-xs text-[#c5a059]">Transparent</span>
              </button>

              <button
                onClick={() => handleNav('compare')}
                className="w-full flex items-center justify-between p-3 rounded-xl text-zinc-200 hover:text-white hover:bg-zinc-800/60 font-semibold text-sm transition-colors text-left cursor-pointer"
              >
                <span>💎 Signature Grooming Packages</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#c5a059]/20 text-[#c5a059] font-bold">Save 40%</span>
              </button>

              <button
                onClick={() => handleNav('academy')}
                className="w-full flex items-center justify-between p-3 rounded-xl text-zinc-200 hover:text-white hover:bg-zinc-800/60 font-semibold text-sm transition-colors text-left cursor-pointer"
              >
                <span>🎓 Academy (By Piyush Bhai)</span>
                <span className="text-xs text-zinc-400">Certified</span>
              </button>

              <button
                onClick={() => handleNav('map-directions')}
                className="w-full flex items-center justify-between p-3 rounded-xl text-zinc-200 hover:text-white hover:bg-zinc-800/60 font-semibold text-sm transition-colors text-left cursor-pointer"
              >
                <span>📍 Location & Google Directions</span>
                <span className="text-xs text-zinc-400">Vishnu Colony</span>
              </button>

              <button
                onClick={() => handleNav('reviews')}
                className="w-full flex items-center justify-between p-3 rounded-xl text-zinc-200 hover:text-white hover:bg-zinc-800/60 font-semibold text-sm transition-colors text-left cursor-pointer"
              >
                <span>⭐ Client Reviews</span>
                <span className="text-xs text-amber-400 font-bold">4.4★ (50 Reviews)</span>
              </button>

              <button
                onClick={() => handleNav('gallery')}
                className="w-full flex items-center justify-between p-3 rounded-xl text-zinc-200 hover:text-white hover:bg-zinc-800/60 font-semibold text-sm transition-colors text-left cursor-pointer"
              >
                <span>📸 Photo & Video Gallery</span>
                <span className="text-xs text-zinc-400">Salon Lounge</span>
              </button>
            </div>

            {/* Quick Contact & Working Hours Card */}
            <div className="p-4 rounded-xl bg-[#141720] border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Open Daily 9 AM - 10 PM</span>
                </span>
                <a
                  href={`tel:${SALON_INFO.phoneRaw}`}
                  className="text-[#c5a059] font-bold flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>{SALON_INFO.phone}</span>
                </a>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Above Manshi Shopping Complex, Zanzarda Rd, Vishnu Colony, Junagadh
              </p>
              <a
                href={SALON_INFO.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-2.5 px-3 rounded-lg bg-[#181b24] hover:bg-[#202430] border border-zinc-700 text-[#c5a059] text-xs font-semibold"
              >
                Open Google Maps Directions ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
