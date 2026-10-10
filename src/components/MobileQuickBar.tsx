import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { ServiceItem } from '../types/salon';

interface MobileQuickBarProps {
  selectedServices: ServiceItem[];
  onOpenBooking: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({
  selectedServices,
  onOpenBooking,
}) => {
  const totalAmount = selectedServices.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0f1117]/95 backdrop-blur-md border-t border-zinc-800 p-2.5 px-3 flex items-center justify-between gap-2 shadow-2xl">
      {/* Call button */}
      <a
        href={`tel:${SALON_INFO.phoneRaw}`}
        className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-[#181b24] text-zinc-300 border border-zinc-700/80 active:bg-zinc-800 text-[11px] font-semibold"
      >
        <Phone className="w-4 h-4 text-[#c5a059] mb-0.5" />
        <span>Call</span>
      </a>

      {/* WhatsApp button */}
      <a
        href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent("Hello Piyush Bhai, I want to book an appointment at Men's World Salon Junagadh.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 active:bg-emerald-600/30 text-[11px] font-semibold"
      >
        <MessageCircle className="w-4 h-4 text-emerald-400 mb-0.5" />
        <span>WhatsApp</span>
      </a>

      {/* Book Slot */}
      <button
        onClick={onOpenBooking}
        className={`flex-[2] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg font-bold text-xs tracking-wider uppercase shadow-lg transition-all active:scale-95 cursor-pointer ${
          selectedServices.length > 0
            ? 'bg-[#c5a059] text-black shadow-[#c5a059]/30 ring-1 ring-amber-300'
            : 'bg-[#c5a059] text-black shadow-[#c5a059]/20'
        }`}
      >
        <Calendar className="w-4 h-4 shrink-0" />
        <span className="truncate">
          {selectedServices.length > 0 ? `Book (${selectedServices.length}) · ₹${totalAmount}` : 'Book Slot'}
        </span>
      </button>
    </div>
  );
};
