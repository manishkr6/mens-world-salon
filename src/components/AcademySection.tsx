import React from 'react';
import { Award, BookOpen, Clock, Users, CheckCircle2, MessageCircle, Phone, Sparkles, Calendar } from 'lucide-react';
import { ACADEMY_COURSES, SALON_INFO } from '../data/salonData';
import { AcademyCourse } from '../types/salon';

interface AcademySectionProps {
  onSelectCourseAndSchedule?: (course: AcademyCourse) => void;
}

export const AcademySection: React.FC<AcademySectionProps> = ({
  onSelectCourseAndSchedule,
}) => {
  const getCourseWhatsAppUrl = (course: AcademyCourse) => {
    const syllabusList = course.syllabus.map((s) => `  ✓ ${s}`).join('\n');
    const text =
      `*MEN'S WORLD HAIR ACADEMY - ADMISSION & SCHEDULE INQUIRY*\n\n` +
      `Hello Piyush Bhai, I would like to inquire & schedule admission for:\n\n` +
      `🎓 *Course:* ${course.title}\n` +
      `💰 *Fee:* ₹${course.fee.toLocaleString()}\n` +
      `⏱️ *Duration:* ${course.duration}\n` +
      `👨‍🏫 *Mentor:* ${course.mentor}\n` +
      `📜 *Certification:* ${course.certification}\n\n` +
      `📚 *Curriculum Highlights:*\n${syllabusList}\n\n` +
      `📍 *Location:* Above Manshi Shopping Complex, Zanzarda Rd, Junagadh\n\n` +
      `Please share batch starting dates and registration schedule. Thank you!`;

    return `https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };
  return (
    <section id="academy" className="py-20 bg-[#0c0e14] border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181b24] border border-[#c5a059]/30 text-xs font-semibold text-[#c5a059] uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Professional Career Education</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-wide mb-4">
            MEN'S WORLD HAIR ACADEMY
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Personal mentorship under Master Stylist <strong className="text-white">Piyush Bhai</strong> in Junagadh.
            From fundamental barbering to advanced chemical artistry and launching your own profitable salon.
          </p>
        </div>

        {/* Courses Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {ACADEMY_COURSES.map((course, idx) => (
            <div
              key={course.id}
              className={`rounded-xl bg-[#141720] border transition-all flex flex-col justify-between overflow-hidden group ${
                idx === 1
                  ? 'border-[#c5a059] shadow-xl shadow-[#c5a059]/10 ring-1 ring-[#c5a059]/30'
                  : 'border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              {/* Image banner */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141720] via-[#141720]/40 to-transparent" />

                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-semibold text-zinc-300 border border-zinc-700">
                  {course.level}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-zinc-300">
                  <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded">
                    <Clock className="w-3 h-3 text-[#c5a059]" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded text-amber-400">
                    <Users className="w-3 h-3" />
                    Only {course.seatsPerBatch} Seats/Batch
                  </span>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#c5a059] transition-colors leading-snug">
                      {course.title}
                    </h3>
                  </div>

                  <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Highlights checklist */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 block">
                      Curriculum Highlights
                    </span>
                    {course.syllabus.map((item, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Mentorship & Cert */}
                  <div className="p-3 rounded-lg bg-[#181b24] border border-zinc-800 text-xs text-zinc-300 mb-6 space-y-1">
                    <p>
                      <strong className="text-white">Mentor:</strong> {course.mentor}
                    </p>
                    <p className="text-zinc-400">
                      <strong className="text-white">Diploma:</strong> {course.certification}
                    </p>
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-4 border-t border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Course Fee</span>
                      <span className="font-cinzel text-xl font-bold text-[#c5a059]">₹{course.fee.toLocaleString()}</span>
                    </div>
                    <span className="text-[11px] text-zinc-400 font-medium">Batch Seats: {course.seatsPerBatch} Max</span>
                  </div>

                  <div className="pt-1">
                    <a
                      href={getCourseWhatsAppUrl(course)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#c5a059] hover:bg-[#d6b26d] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 text-center"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0 text-black" />
                      <span>Select & Schedule via WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Academy Perks Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-[#161a24] to-[#12141c] border border-[#c5a059]/30 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">80% Live Model Practical</h4>
              <div className="w-full max-w-[180px] h-1.5 bg-[#0e1017] border border-zinc-800 rounded-full overflow-hidden my-1.5 mx-auto md:mx-0">
                <div className="h-full bg-gradient-to-r from-[#c5a059] to-[#ffe5a3] rounded-full shadow-sm" style={{ width: '80%' }} />
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Practice on live clients and hair mannequins inside our Junagadh salon.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Starter Tool Kit Provided</h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Professional shears, clippers, trimmer guards, and cape kit included.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Placement Support</h4>
              <div className="w-full max-w-[180px] h-1.5 bg-[#0e1017] border border-zinc-800 rounded-full overflow-hidden my-1.5 mx-auto md:mx-0">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full shadow-sm" style={{ width: '100%' }} />
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Join our salon team or get guidance to set up your own hair studio in Saurashtra.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
