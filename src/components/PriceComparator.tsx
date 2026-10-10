import React, { useState } from 'react';
import { Check, Sparkles, Clock, MessageCircle, ShieldCheck, Award, Zap, Calendar } from 'lucide-react';
import { MENS_WORLD_PACKAGE_TIERS, SALON_INFO } from '../data/salonData';
import { PackageTier } from '../types/salon';

interface PriceComparatorProps {
  onOpenBooking: () => void;
  onSelectPackageAndSchedule: (tier: PackageTier) => void;
}

export const PriceComparator: React.FC<PriceComparatorProps> = ({
  onOpenBooking,
  onSelectPackageAndSchedule,
}) => {
  const [selectedTierId, setSelectedTierId] = useState<string>('pkg-executive');

  const selectedTier =
    MENS_WORLD_PACKAGE_TIERS.find((t) => t.id === selectedTierId) || MENS_WORLD_PACKAGE_TIERS[1];

  const getPackageWhatsAppUrl = (tier: PackageTier) => {
    const savings = tier.originalValue - tier.price;
    const servicesList = tier.services.map((s) => `  ✓ ${s}`).join('\n');
    const featuresList = tier.features.map((f) => `  • ${f}`).join('\n');

    const text =
      `*MEN'S WORLD SALON & ACADEMY - APPOINTMENT BOOKING*\n\n` +
      `Hello Piyush Bhai, I would like to book the *${tier.name}* at Men's World Salon.\n\n` +
      `📦 *Package:* ${tier.name} (${tier.tagline})\n` +
      `💰 *Price:* ₹${tier.price} _(Original: ₹${tier.originalValue} - Save ₹${savings})_\n` +
      `⏱️ *Estimated Duration:* ~${tier.durationMin} mins\n\n` +
      `✂️ *Included Services:*\n${servicesList}\n\n` +
      `⭐ *Hygiene & Perks:*\n${featuresList}\n\n` +
      `📍 *Location:* Above Manshi Shopping Complex, Zanzarda Rd, Junagadh\n\n` +
      `Please confirm the next available time slot for this appointment. Thank you!`;

    return `https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="compare" className="py-20 bg-[#0b0d11] border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181b24] border border-[#c5a059]/30 text-xs font-semibold text-[#c5a059] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Value Bundles & Transparent Pricing</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-wide mb-4">
            MEN'S WORLD SIGNATURE GROOMING PACKAGES
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Crafted for Junagadh gentlemen. Enjoy bundled savings of up to 40% with complimentary hair wash, single-use sterilized razor blades, and direct attention from founder Piyush Bhai.
          </p>
        </div>

        {/* Value Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="p-4 rounded-xl bg-[#141720] border border-zinc-800 text-center">
            <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto mb-1.5" />
            <h4 className="text-xs font-bold text-white">100% Sterile Hygiene</h4>
            <p className="text-[11px] text-zinc-400 mt-0.5">Single-use blades & fresh capes</p>
          </div>
          <div className="p-4 rounded-xl bg-[#141720] border border-zinc-800 text-center">
            <Award className="w-5 h-5 text-[#c5a059] mx-auto mb-1.5" />
            <h4 className="text-xs font-bold text-white">Master Stylist</h4>
            <p className="text-[11px] text-zinc-400 mt-0.5">Piyush Bhai on site</p>
          </div>
          <div className="p-4 rounded-xl bg-[#141720] border border-zinc-800 text-center">
            <Zap className="w-5 h-5 text-amber-400 mx-auto mb-1.5" />
            <h4 className="text-xs font-bold text-white">Free Hair Wash</h4>
            <p className="text-[11px] text-zinc-400 mt-0.5">Included with all haircut tiers</p>
          </div>
          <div className="p-4 rounded-xl bg-[#141720] border border-zinc-800 text-center">
            <Clock className="w-5 h-5 text-cyan-400 mx-auto mb-1.5" />
            <h4 className="text-xs font-bold text-white">Zero Wait Priority</h4>
            <p className="text-[11px] text-zinc-400 mt-0.5">Book online or via WhatsApp</p>
          </div>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {MENS_WORLD_PACKAGE_TIERS.map((tier) => {
            const isSelected = selectedTierId === tier.id;
            const savings = tier.originalValue - tier.price;

            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTierId(tier.id)}
                className={`relative rounded-xl p-6 flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#161a24] border-2 border-[#c5a059] shadow-xl shadow-[#c5a059]/10 ring-1 ring-[#c5a059]/30'
                    : 'bg-[#12141c] border border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                {/* Popular Pill */}
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#c5a059] text-black text-[10px] font-extrabold uppercase tracking-wider shadow">
                    Most Popular in Junagadh
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <h3 className="text-base font-bold text-white font-cinzel leading-snug">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-[#c5a059] mt-0.5 font-medium">{tier.tagline}</p>
                  </div>

                  {/* Price Box */}
                  <div className="p-4 rounded-lg bg-[#0e1017] border border-zinc-800/80 mb-5">
                    <div className="flex items-baseline gap-2">
                      <span className="font-cinzel text-3xl font-extrabold text-[#c5a059]">
                        ₹{tier.price}
                      </span>
                      <span className="text-xs text-zinc-500 line-through">
                        ₹{tier.originalValue}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] mt-1.5 text-zinc-400">
                      <span>Duration: ~{tier.durationMin} mins</span>
                      <span className="text-emerald-400 font-semibold">Save ₹{savings}</span>
                    </div>
                  </div>

                  {/* Included Services */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500 block">
                      Services Included
                    </span>
                    {tier.services.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Package Perks */}
                  <div className="pt-3 border-t border-zinc-800/60 space-y-1 text-[11px] text-zinc-400 mb-6">
                    {tier.features.map((feat, fIdx) => (
                      <p key={fIdx}>• {feat}</p>
                    ))}
                  </div>
                </div>

                {/* Actions: Single Unified Select & Schedule on WhatsApp Button */}
                <div className="pt-2">
                  <a
                    href={getPackageWhatsAppUrl(tier)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTierId(tier.id);
                    }}
                    className={`w-full py-3 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 text-center cursor-pointer ${
                      isSelected
                        ? 'bg-[#c5a059] hover:bg-[#d6b26d] text-black shadow-[#c5a059]/20 font-extrabold'
                        : 'bg-[#181b24] hover:bg-emerald-600 hover:text-white text-zinc-200 border border-zinc-700 hover:border-emerald-500'
                    }`}
                  >
                    <MessageCircle className={`w-4 h-4 shrink-0 ${isSelected ? 'text-black' : 'text-emerald-400'}`} />
                    <span>Select & Schedule via WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
