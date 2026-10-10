import React, { useState, useRef, useEffect } from 'react';
import { Phone, MessageCircle, Star, ArrowRight, ShieldCheck, Award, Volume2, VolumeX, Play, Pause, Sparkles } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { Logo } from './Logo';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onNavigateSection: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onNavigateSection,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize ambient salon lounge audio
    const audio = new Audio('/salon-lounge.mp3');
    audio.loop = true;
    audio.volume = 0.55;
    audioRef.current = audio;

    // Start video muted in background
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.play().catch(() => {});
    }

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const handleTogglePlayPause = async () => {
    const video = videoRef.current;
    const audio = audioRef.current;

    if (isPlaying) {
      // Pause video and sound
      if (video) video.pause();
      if (audio) audio.pause();
      setIsPlaying(false);
    } else {
      // Play both video and sound
      if (video) {
        try {
          video.muted = false;
          await video.play();
        } catch (e) {
          console.debug('Video play error:', e);
        }
      }

      if (audio) {
        try {
          audio.volume = 0.55;
          await audio.play();
        } catch (audioErr) {
          console.warn('Audio play error, trying unlock:', audioErr);
        }
      }

      setIsPlaying(true);
    }
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={!isPlaying}
          playsInline
          poster={SALON_INFO.videoPoster}
          className="w-full h-full object-cover opacity-40 filter brightness-90 scale-105 transition-transform duration-1000 ease-out"
        >
          <source src={SALON_INFO.videoUrl} type="video/mp4" />
          {SALON_INFO.videoBackupUrl && (
            <source src={SALON_INFO.videoBackupUrl} type="video/mp4" />
          )}
        </video>
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d11] via-[#0b0d11]/70 to-[#0b0d11]/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-[#0b0d11]/90" />
      </div>

      {/* Single Unified Play / Pause & Sound Button */}
      <div className="absolute top-5 right-4 sm:top-6 sm:right-6 z-20">
        <button
          onClick={handleTogglePlayPause}
          className={`group flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xl backdrop-blur-md border ${
            isPlaying
              ? 'bg-[#141722]/95 text-amber-300 border-amber-500/50 hover:bg-[#1c2030] ring-1 ring-amber-500/20'
              : 'bg-[#c5a059] text-black border-[#e6c687] hover:bg-[#d6b26d] shadow-[#c5a059]/30 hover:scale-105 active:scale-95'
          }`}
          title={isPlaying ? 'Pause salon atmosphere and sound' : 'Play salon atmosphere with sound'}
          aria-label={isPlaying ? 'Pause salon atmosphere and sound' : 'Play salon atmosphere with sound'}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause</span>
              <span className="flex items-center gap-1.5 pl-2 border-l border-zinc-700 text-emerald-400 text-[11px] font-medium">
                <Volume2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sound On</span>
                <span className="flex gap-0.5 items-end h-3 ml-0.5">
                  <span className="w-0.5 h-2 bg-emerald-400 animate-pulse" />
                  <span className="w-0.5 h-3 bg-emerald-400 animate-pulse delay-75" />
                  <span className="w-0.5 h-1.5 bg-emerald-400 animate-pulse delay-150" />
                </span>
              </span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Play Atmosphere</span>
              <span className="flex items-center gap-1 pl-2 border-l border-black/30 text-black/85 text-[11px] font-medium">
                <Volume2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">with Sound</span>
              </span>
            </>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Google Maps Rating Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1a1d26]/80 border border-[#c5a059]/40 backdrop-blur-md mb-6">
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < 4 ? 'fill-amber-400' : 'fill-amber-400/40'}`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-zinc-200">
            {SALON_INFO.rating} Rating
          </span>
          <span className="text-zinc-500">·</span>
          <span className="text-xs text-zinc-400">50 Google Reviews</span>
          <span className="text-zinc-500 hidden sm:inline">·</span>
          <span className="text-xs text-[#c5a059] font-medium hidden sm:inline">
            Junagadh, Gujarat
          </span>
        </div>

        {/* Official Brand Crest Emblem */}
        <div className="flex justify-center mb-4">
          <Logo size="lg" showText={false} variant="gold" />
        </div>

        {/* Primary Headline */}
        <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
          MEN'S WORLD <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e6c687] via-[#c5a059] to-[#997a37]">
            SALON & ACADEMY
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-300 font-normal mb-8 leading-relaxed">
          The ultimate grooming sanctuary for Junagadh gentlemen. Master precision haircuts by{' '}
          <strong className="text-zinc-100 font-semibold">Piyush Bhai</strong>, hot towel beard sculpting,
          luxe spa treatments, and accredited professional styling academy.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12">
          {/* WhatsApp Direct Booking */}
          <a
            href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent("Namaste Piyush Bhai, I want to book an appointment at Men's World Salon & Academy Junagadh.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-900/30 active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Book via WhatsApp</span>
          </a>

          {/* In-app booking modal */}
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#c5a059] hover:bg-[#d4af37] text-black font-semibold text-sm transition-all shadow-lg shadow-[#c5a059]/20 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Select Services & Schedule</span>
          </button>

          {/* Direct Call */}
          <a
            href={`tel:${SALON_INFO.phoneRaw}`}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#181b24] hover:bg-[#202430] text-zinc-200 border border-zinc-700/80 font-medium text-sm transition-all active:scale-95"
          >
            <Phone className="w-4 h-4 text-[#c5a059]" />
            <span>Call: {SALON_INFO.phone}</span>
          </a>
        </div>

        {/* Quick Compare Anchor */}
        <div className="flex items-center justify-center gap-4 text-xs text-zinc-400">
          <button
            onClick={() => onNavigateSection('compare')}
            className="hover:text-[#c5a059] transition-colors flex items-center gap-1 group focus:outline-none cursor-pointer"
          >
            <span>Explore Men's World Signature Grooming Packages (Save up to 40%)</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#c5a059] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-14 pt-8 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-[#141720]/60 border border-zinc-800/50">
            <Award className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-zinc-200">Piyush Bhai Signature</p>
              <p className="text-[11px] text-zinc-400">Master stylist precision cuts</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-[#141720]/60 border border-zinc-800/50">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-zinc-200">100% Sterile Hygiene</p>
              <p className="text-[11px] text-zinc-400">Single-use razor blades & caps</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-[#141720]/60 border border-zinc-800/50">
            <Star className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-zinc-200">Best Budget & Value</p>
              <p className="text-[11px] text-zinc-400">Transparent rates, no hidden fees</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-[#141720]/60 border border-zinc-800/50">
            <Award className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-zinc-200">Professional Academy</p>
              <p className="text-[11px] text-zinc-400">Certified barber diploma courses</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
