import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { PriceComparator } from './components/PriceComparator';
import { InteractiveMap } from './components/InteractiveMap';
import { AcademySection } from './components/AcademySection';
import { ReviewsSection } from './components/ReviewsSection';
import { GallerySection } from './components/GallerySection';
import { PopularTimes } from './components/PopularTimes';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { MobileQuickBar } from './components/MobileQuickBar';
import { ServiceItem, PackageTier, AcademyCourse } from './types/salon';
import { SERVICES_DATA, SALON_INFO } from './data/salonData';
import { ShieldCheck, Sparkles, Clock, MapPin, Phone, MessageCircle } from 'lucide-react';

export default function App() {
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleToggleService = (service: ServiceItem) => {
    setSelectedServices((prev) => {
      const exists = prev.some((s) => s.id === service.id);
      if (exists) {
        return prev.filter((s) => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const handleSelectPackageAndSchedule = (tier: PackageTier) => {
    const packageItem: ServiceItem = {
      id: tier.id,
      name: `${tier.name} (Signature Package)`,
      category: 'package',
      price: tier.price,
      durationMin: tier.durationMin,
      description: `Includes: ${tier.services.join(' · ')}`,
      includedItems: tier.services,
      popular: tier.popular,
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    };
    setSelectedServices([packageItem]);
    setIsBookingOpen(true);
  };

  const handleSelectCourseAndSchedule = (course: AcademyCourse) => {
    const courseItem: ServiceItem = {
      id: course.id,
      name: `${course.title} (Academy Enrollment)`,
      category: 'academy',
      price: course.fee,
      durationMin: 120,
      description: `Mentor: ${course.mentor} · Duration: ${course.duration} · Certification: ${course.certification}`,
      includedItems: course.syllabus,
      image: course.image,
    };
    setSelectedServices([courseItem]);
    setIsBookingOpen(true);
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0d11] text-zinc-100 selection:bg-[#c5a059] selection:text-black">
      {/* Top Navigation */}
      <Navbar
        selectedServices={selectedServices}
        onOpenBooking={() => setIsBookingOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content */}
      <main className="pb-16 md:pb-0">
        {/* 1. Hero with Real Salon Video & Fast Booking CTAs */}
        <HeroSection
          onOpenBooking={() => setIsBookingOpen(true)}
          onNavigateSection={handleNavigateSection}
        />

        {/* 2. Interactive Services & Transparent Rate Card */}
        <ServicesSection
          selectedServices={selectedServices}
          onToggleService={handleToggleService}
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        {/* 3. Men's World Signature Grooming Packages & Value Bundles */}
        <PriceComparator
          onOpenBooking={() => setIsBookingOpen(true)}
          onSelectPackageAndSchedule={handleSelectPackageAndSchedule}
        />

        {/* 4. Popular Times & Quick Visit Guide */}
        <section className="py-16 bg-[#0c0e14] border-t border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <PopularTimes />
              </div>

              {/* Quick Contact & Walk-in Card */}
              <div className="bg-[#141720] border border-[#c5a059]/30 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#c5a059] uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Walk-ins & Priority Slots</span>
                </div>

                <h3 className="font-cinzel text-xl font-bold text-white">
                  Visit Us Today in Vishnu Colony
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  Located right above Manshi Shopping Complex. Walk-ins are welcomed, but booking via WhatsApp or phone guarantees zero wait time with Piyush Bhai.
                </p>

                <div className="pt-2 space-y-2">
                  <a
                    href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent("Hello Piyush Bhai, are there any slots available right now at Men's World Salon?")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Quick Check</span>
                  </a>

                  <a
                    href={`tel:${SALON_INFO.phoneRaw}`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#181b24] hover:bg-[#202430] border border-zinc-700 text-zinc-200 text-xs font-semibold transition-all"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Call Desk: {SALON_INFO.phone}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Men's World Hair Academy (Piyush Bhai Certified Training) */}
        <AcademySection
          onSelectCourseAndSchedule={handleSelectCourseAndSchedule}
        />

        {/* 6. Interactive Junagadh Map & Route Navigation */}
        <InteractiveMap
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        {/* 7. Real Google Reviews (4.4★ / 50 Reviews) */}
        <ReviewsSection />

        {/* 8. Photo & Video Gallery */}
        <GallerySection />
      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Mobile Sticky Quick Booking Bar */}
      <MobileQuickBar
        selectedServices={selectedServices}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Booking Drawer / Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedServices={selectedServices}
        onToggleService={handleToggleService}
      />
    </div>
  );
}
