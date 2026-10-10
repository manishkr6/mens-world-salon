import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Calendar, Clock, User, Phone, MessageCircle, Check, Trash2, Scissors, Download, Sparkles } from 'lucide-react';
import { SALON_INFO, SERVICES_DATA } from '../data/salonData';
import { ServiceItem } from '../types/salon';
import { Logo } from './Logo';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServices: ServiceItem[];
  onToggleService: (service: ServiceItem) => void;
}

const TIME_SLOTS = [
  '09:30 AM',
  '10:30 AM',
  '11:30 AM',
  '12:30 PM',
  '02:00 PM',
  '03:30 PM',
  '04:30 PM',
  '05:30 PM',
  '06:30 PM',
  '07:30 PM',
  '08:30 PM',
  '09:15 PM',
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedServices,
  onToggleService,
}) => {
  const [stylist, setStylist] = useState<'Piyush Bhai (Master Stylist)' | 'Senior Hair Stylist' | 'Any Available Stylist'>('Piyush Bhai (Master Stylist)');
  
  // Format today's date YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState<string>(todayStr);
  const [time, setTime] = useState<string>('05:30 PM');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [nameError, setNameError] = useState(false);

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmationId, setConfirmationId] = useState('');

  if (!isOpen) return null;

  const totalAmount = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.durationMin, 0);

  // Generate WhatsApp Message
  const getWhatsAppMessage = () => {
    const servicesList = selectedServices.length > 0 
      ? selectedServices.map((s) => {
          let itemStr = `• *${s.name}* - ₹${s.price} (~${s.durationMin} mins)`;
          if (s.includedItems && s.includedItems.length > 0) {
            itemStr += `\n  (Includes: ${s.includedItems.join(', ')})`;
          } else if (s.description) {
            itemStr += `\n  (${s.description})`;
          }
          return itemStr;
        }).join('\n\n')
      : '• Consultation / Standard Haircut';

    return `*APPOINTMENT BOOKING REQUEST*\n` +
      `*Salon:* ${SALON_INFO.name}\n` +
      `*Client Name:* ${name.trim() || 'Valued Guest'}\n` +
      `*Phone:* ${phone.trim() || 'Not provided'}\n` +
      `*Date:* ${date}\n` +
      `*Time Slot:* ${time}\n` +
      `*Preferred Stylist:* ${stylist}\n\n` +
      `*Selected Services & Packages:*\n${servicesList}\n\n` +
      `*Estimated Total Price:* ₹${totalAmount.toLocaleString()}\n` +
      `*Estimated Duration:* ~${totalDuration || 30} mins\n` +
      (notes.trim() ? `*Special Notes:* ${notes.trim()}\n` : '') +
      `\nPlease confirm slot availability. Thank you!`;
  };

  const handleBookViaWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!name.trim()) {
      setNameError(true);
      return;
    }
    setNameError(false);
    const text = encodeURIComponent(getWhatsAppMessage());
    window.open(`https://wa.me/${SALON_INFO.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
    triggerSuccess();
  };

  const triggerSuccess = () => {
    const randId = `MW-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmationId(randId);
    setBookingConfirmed(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c5a059', '#e6c687', '#ffffff', '#10b981'],
    });
  };

  const handleInAppConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setNameError(true);
      return;
    }
    setNameError(false);
    triggerSuccess();
  };

  const downloadCalendarFile = () => {
    const title = `Appointment at Men's World Salon (${stylist})`;
    const description = `Services: ${selectedServices.map((s) => s.name).join(', ')}. Stylist: ${stylist}. Location: ${SALON_INFO.address}`;
    const location = SALON_INFO.address;

    // Build .ics string
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Mens World Salon//Appointment Booking//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      `STATUS:CONFIRMED`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `MensWorld-Appointment-${date}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#141720] border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#181b24] px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="sm" showText={false} variant="gold" />
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white tracking-wide">
                BOOK YOUR APPOINTMENT
              </h3>
              <p className="text-[11px] text-zinc-400">
                Men's World Salon & Academy · Manshi Shopping Complex, Junagadh
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 max-h-[78vh] overflow-y-auto">
          {bookingConfirmed ? (
            /* Confirmation Receipt Screen */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 mx-auto flex items-center justify-center text-emerald-400 shadow-lg">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase font-semibold tracking-widest text-[#c5a059]">
                  Booking Request Recorded
                </span>
                <h4 className="font-cinzel text-2xl font-bold text-white mt-1">
                  Thank you, {name || 'Gentleman'}!
                </h4>
                <p className="text-zinc-400 text-xs mt-2 max-w-md mx-auto">
                  Your appointment slot has been generated. Confirmation Ref:{' '}
                  <span className="text-[#c5a059] font-mono font-bold">{confirmationId}</span>.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-[#181b24] p-5 rounded-xl border border-zinc-800 text-left text-xs space-y-3 max-w-md mx-auto">
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-400">Date & Slot:</span>
                  <span className="font-semibold text-white">{date} at {time}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-400">Stylist:</span>
                  <span className="font-semibold text-[#c5a059]">{stylist}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-400">Services:</span>
                  <span className="font-semibold text-white">
                    {selectedServices.length > 0
                      ? selectedServices.map((s) => s.name).join(', ')
                      : 'Haircut & Styling Consultation'}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-zinc-400">Total Estimate:</span>
                  <span className="font-cinzel text-base font-bold text-[#c5a059]">
                    {selectedServices.length > 0 ? `₹${totalAmount.toLocaleString()}` : 'Free Consultation / Pay At Salon'}
                  </span>
                </div>
              </div>

              {/* Action Buttons on Confirmation */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
                <button
                  onClick={downloadCalendarFile}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#1e222d] hover:bg-[#282d3a] border border-zinc-700 text-xs font-semibold text-zinc-200 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#c5a059]" />
                  <span>Add to Calendar (.ics)</span>
                </button>

                <a
                  href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(getWhatsAppMessage())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto py-2.5 px-4 rounded-lg bg-[#c5a059] hover:bg-[#d6b26d] text-xs font-semibold text-black transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleInAppConfirm} className="space-y-6">
              {/* Selected Services Pill Box */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Selected Services ({selectedServices.length})
                  </label>
                  <span className="text-xs text-zinc-400">
                    Est. Duration: ~{totalDuration || 30} mins
                  </span>
                </div>

                {selectedServices.length === 0 ? (
                  <div className="p-4 rounded-xl bg-[#181b24] border border-dashed border-zinc-700 text-center">
                    <p className="text-xs text-zinc-400 mb-2">
                      No specific services selected. A consultation and default haircut will be scheduled.
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => onToggleService(SERVICES_DATA[0])}
                        className="text-xs font-semibold text-[#c5a059] hover:underline"
                      >
                        + Add Classic Haircut (₹150)
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                    {selectedServices.map((service) => (
                      <div
                        key={service.id}
                        className="p-3 rounded-lg bg-[#181b24] border border-zinc-800 text-xs space-y-2"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-zinc-100 text-xs">{service.name}</span>
                              {service.category === 'package' && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/40 uppercase tracking-wider">
                                  Signature Package
                                </span>
                              )}
                              {service.category === 'academy' && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-cyan-950/60 text-cyan-300 border border-cyan-800 uppercase tracking-wider">
                                  Academy Course
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-zinc-500">Duration: ~{service.durationMin} mins</span>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="font-cinzel font-bold text-[#c5a059] text-sm">₹{service.price.toLocaleString()}</span>
                            <button
                              type="button"
                              onClick={() => onToggleService(service)}
                              className="text-zinc-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Show included items if available */}
                        {service.includedItems && service.includedItems.length > 0 ? (
                          <div className="pt-2 border-t border-zinc-800/80">
                            <span className="text-[10px] text-zinc-400 font-semibold block mb-1">
                              Included in this {service.category === 'package' ? 'Package' : 'Curriculum'}:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {service.includedItems.map((item, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] bg-[#10121a] text-zinc-300 px-2 py-0.5 rounded border border-zinc-800/80"
                                >
                                  ✓ {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        ) : service.description ? (
                          <p className="text-[11px] text-zinc-400 pt-1.5 border-t border-zinc-800/80 line-clamp-2 leading-relaxed">
                            {service.description}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Stylist Preference */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                  Preferred Stylist
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    'Piyush Bhai (Master Stylist)',
                    'Senior Hair Stylist',
                    'Any Available Stylist',
                  ].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStylist(s as any)}
                      className={`p-3 rounded-lg text-xs font-medium text-left border transition-all cursor-pointer ${
                        stylist === s
                          ? 'bg-[#c5a059]/15 border-[#c5a059] text-white font-semibold'
                          : 'bg-[#181b24] border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <Sparkles className="w-3 h-3 text-[#c5a059]" />
                        <span>{s.split(' ')[0]}</span>
                      </div>
                      <span className="text-[11px] text-zinc-500 block truncate">{s}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    Appointment Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      value={date}
                      min={todayStr}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#181b24] border border-zinc-700/80 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    Time Slot (Open till 10 PM)
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-[#181b24] border border-zinc-700/80 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#c5a059] appearance-none"
                    >
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t} className="bg-[#181b24]">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${nameError ? 'text-rose-400' : 'text-zinc-500'}`} />
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (nameError) setNameError(false);
                      }}
                      className={`w-full bg-[#181b24] border rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none ${
                        nameError
                          ? 'border-rose-500 focus:border-rose-400 ring-1 ring-rose-500/30'
                          : 'border-zinc-700/80 focus:border-[#c5a059]'
                      }`}
                      required
                    />
                  </div>
                  {nameError && (
                    <p className="text-[11px] text-rose-400 mt-1 font-medium">Please enter your name to schedule appointment.</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="e.g. 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#181b24] border border-zinc-700/80 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#c5a059]"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                  Special Notes / Styling Request (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Wedding groom styling, skin sensitive to blades, prefer low fade..."
                  rows={2}
                  className="w-full bg-[#181b24] border border-zinc-700/80 rounded-lg p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              {/* Total & Action Buttons */}
              <div className="pt-4 border-t border-zinc-800 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Total Estimated Amount:</span>
                  <span className="font-cinzel text-xl font-bold text-[#c5a059]">
                    {selectedServices.length > 0 ? `₹${totalAmount.toLocaleString()}` : 'Free Consultation (Pay At Salon)'}
                  </span>
                </div>

                <div className="space-y-2">
                  {/* Unified Select & Schedule WhatsApp Booking */}
                  <button
                    type="button"
                    onClick={handleBookViaWhatsApp}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg shadow-emerald-950/50 active:scale-[0.98] cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 shrink-0" />
                    <span>Select & Schedule · WhatsApp Booking</span>
                  </button>

                  {/* Secondary In-App Confirmation */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#181b24] hover:bg-[#222634] text-zinc-300 hover:text-white border border-zinc-700 text-xs font-semibold tracking-wider uppercase transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <Check className="w-4 h-4 text-[#c5a059]" />
                    <span>Or Confirm In-App & Get Voucher</span>
                  </button>
                </div>

                {/* Direct Phone Call fallback */}
                <div className="text-center pt-1">
                  <a
                    href={`tel:${SALON_INFO.phoneRaw}`}
                    className="text-xs text-zinc-400 hover:text-[#c5a059] transition-colors inline-flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3 text-[#c5a059]" />
                    <span>Or call desk directly: {SALON_INFO.phone}</span>
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
