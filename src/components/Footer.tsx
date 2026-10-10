import React from 'react';
import { MapPin, Phone, Clock, Instagram, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { Logo } from './Logo';

interface FooterProps {
  onNavigateSection: (id: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onOpenBooking }) => {
  return (
    <footer className="bg-[#08090d] border-t border-zinc-800 text-zinc-400 text-xs pb-20 md:pb-8 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Logo size="sm" showText={true} />

            <p className="text-zinc-400 leading-relaxed text-xs">
              Premier men's grooming lounge and accredited hair academy in Junagadh, Gujarat.
              Lead by Master Stylist Piyush Bhai with a commitment to hospital-grade hygiene and contemporary craftsmanship.
            </p>

            <div className="flex items-center gap-3 text-zinc-400 pt-1">
              <a
                href={SALON_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#141720] border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-[#c5a059] hover:border-[#c5a059] transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SALON_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#141720] border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-[#c5a059] hover:border-[#c5a059] transition-colors"
                title="Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-cinzel">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-[#c5a059] transition-colors text-left"
                >
                  Haircuts & Grooming Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('compare')}
                  className="hover:text-[#c5a059] transition-colors text-left cursor-pointer"
                >
                  Signature Grooming Packages (Bundles)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('academy')}
                  className="hover:text-[#c5a059] transition-colors text-left"
                >
                  Hair Academy Courses (Piyush Bhai)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('reviews')}
                  className="hover:text-[#c5a059] transition-colors text-left"
                >
                  Google Maps Reviews (4.4★)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('gallery')}
                  className="hover:text-[#c5a059] transition-colors text-left"
                >
                  Interior & Work Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="text-[#c5a059] hover:underline font-semibold text-left"
                >
                  Online Appointment Booking
                </button>
              </li>
            </ul>
          </div>

          {/* Business Hours & Contact */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-cinzel">
              Working Hours & Desk
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-zinc-200 font-semibold">Open Daily</span>
                  <span className="text-zinc-400">9:00 AM – 10:00 PM</span>
                  <span className="block text-[11px] text-emerald-400 mt-0.5">
                    Closes 10:00 PM tonight
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2">
                <Phone className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-zinc-200 font-semibold">Reception / Bookings</span>
                  <a
                    href={`tel:${SALON_INFO.phoneRaw}`}
                    className="text-[#c5a059] hover:underline font-semibold"
                  >
                    {SALON_INFO.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Plus Code */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-cinzel">
              Salon Location
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-zinc-200 font-semibold">
                    Above Manshi Shopping Complex
                  </span>
                  <p className="text-zinc-400 mt-0.5 leading-relaxed">
                    Vishnu Colony, Junagadh, Gujarat 362001
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#141720] border border-zinc-800 text-[11px]">
                <span className="text-zinc-500 block uppercase">Plus Code</span>
                <span className="font-mono text-zinc-200 font-semibold">{SALON_INFO.plusCode}</span>
              </div>

              <a
                href={SALON_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#c5a059] hover:underline font-semibold"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} MEN'S WORLD SALON & ACADEMY, Junagadh. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Sterilized & Certified Hygiene Protocol</span>
            <span>·</span>
            <span>Master Stylist Piyush Bhai</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
