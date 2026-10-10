import React, { useState } from 'react';
import { Clock, Users, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';
import { POPULAR_TIMES_DATA } from '../data/salonData';

const WEEKDAY_DATA = [
  { hour: '9 AM', label: '9a', busyPct: 15, status: 'Quiet · Direct Seating' },
  { hour: '11 AM', label: '11a', busyPct: 35, status: 'Light · ~5 min' },
  { hour: '1 PM', label: '1p', busyPct: 55, status: 'Moderate · ~10 min' },
  { hour: '3 PM', label: '3p', busyPct: 40, status: 'Moderate · ~5 min' },
  { hour: '5 PM', label: '5p', busyPct: 70, status: 'Busy · ~15 min' },
  { hour: '7 PM', label: '7p', busyPct: 88, isPeak: true, status: 'Peak Hours · Reserve Slot' },
  { hour: '9 PM', label: '9p', busyPct: 65, status: 'Moderate · ~10 min' },
];

export const PopularTimes: React.FC = () => {
  const [dayType, setDayType] = useState<'weekend' | 'weekday'>('weekend');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(5); // default highlight 7 PM peak

  const activeData = dayType === 'weekend' ? POPULAR_TIMES_DATA : WEEKDAY_DATA;
  const currentActive = hoveredIdx !== null ? activeData[hoveredIdx] : activeData[5];

  // Helper to determine fill color and styling based on % fill
  const getFillStyle = (pct: number) => {
    if (pct >= 85) {
      return {
        gradient: 'bg-gradient-to-t from-[#c5a059] via-[#d6b26d] to-[#ffe5a3]',
        glow: 'shadow-lg shadow-[#c5a059]/40',
        textBadge: 'text-[#ffd700] border-[#c5a059]',
        label: 'Peak Hour',
      };
    }
    if (pct >= 65) {
      return {
        gradient: 'bg-gradient-to-t from-[#9a7836] via-[#c5a059] to-[#e4c382]',
        glow: 'shadow-md shadow-[#c5a059]/20',
        textBadge: 'text-[#c5a059] border-[#c5a059]/60',
        label: 'Busy',
      };
    }
    if (pct >= 40) {
      return {
        gradient: 'bg-gradient-to-t from-amber-700/80 via-amber-600/90 to-[#c5a059]/80',
        glow: 'shadow-sm',
        textBadge: 'text-amber-400 border-amber-500/40',
        label: 'Moderate',
      };
    }
    return {
      gradient: 'bg-gradient-to-t from-emerald-700/80 via-emerald-600 to-emerald-400',
      glow: 'shadow-sm shadow-emerald-500/20',
      textBadge: 'text-emerald-400 border-emerald-500/40',
      label: 'Low Wait',
    };
  };

  return (
    <div className="bg-[#141720] border border-zinc-800 rounded-xl p-6 shadow-xl">
      {/* Header with Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#c5a059]" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-cinzel">
            Popular Times & Activity Level
          </h4>
        </div>

        {/* Day Selector Tabs */}
        <div className="inline-flex rounded-lg bg-[#0e1017] p-1 border border-zinc-800 self-start sm:self-auto text-xs">
          <button
            onClick={() => setDayType('weekend')}
            className={`px-3 py-1 rounded-md font-medium transition-all ${
              dayType === 'weekend'
                ? 'bg-[#c5a059] text-black font-semibold shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Sat - Sun (Weekend)
          </button>
          <button
            onClick={() => setDayType('weekday')}
            className={`px-3 py-1 rounded-md font-medium transition-all ${
              dayType === 'weekday'
                ? 'bg-[#c5a059] text-black font-semibold shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Mon - Fri (Weekdays)
          </button>
        </div>
      </div>

      {/* Active Time Slot Summary Banner */}
      <div className="mb-6 p-3 rounded-lg bg-[#0e1017] border border-zinc-800/80 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[#c5a059]" />
          <span className="text-zinc-300">
            Selected Time: <strong className="text-white">{currentActive.hour}</strong>
          </span>
          <span className="text-zinc-600">·</span>
          <span className="font-semibold text-[#c5a059]">{currentActive.busyPct}% Filled</span>
        </div>
        <span
          className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
            getFillStyle(currentActive.busyPct).textBadge
          }`}
        >
          {getFillStyle(currentActive.busyPct).label}
        </span>
      </div>

      {/* Bar Chart Container with full track fills based on % */}
      <div className="h-44 pt-2 pb-2 flex items-end justify-between gap-2 sm:gap-3 border-b border-zinc-800">
        {activeData.map((item, idx) => {
          const style = getFillStyle(item.busyPct);
          const isSelected = hoveredIdx === idx;

          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              className="flex-1 flex flex-col items-center h-full justify-end cursor-pointer group"
            >
              {/* Visible Percentage Value above the bar */}
              <div
                className={`text-[10px] sm:text-xs font-bold mb-1.5 transition-all ${
                  isSelected
                    ? 'text-white scale-110 font-extrabold'
                    : item.busyPct >= 75
                    ? 'text-[#c5a059]'
                    : 'text-zinc-400'
                }`}
              >
                {item.busyPct}%
              </div>

              {/* Full Height Track (100% capacity) - Inside it fills based on % */}
              <div className="w-full max-w-[32px] sm:max-w-[40px] h-28 bg-[#0b0d13] border border-zinc-800/90 rounded-md p-0.5 flex flex-col justify-end relative overflow-hidden group-hover:border-[#c5a059]/60 transition-colors">
                {/* 100% guide tick */}
                <div className="absolute top-1 left-0 right-0 border-t border-zinc-800/60 pointer-events-none" />
                {/* 50% guide tick */}
                <div className="absolute top-1/2 left-0 right-0 border-t border-zinc-800/40 pointer-events-none" />

                {/* Animated Fill Bar - Filled based on % */}
                <div
                  className={`w-full rounded-sm transition-all duration-500 ease-out relative ${style.gradient} ${
                    isSelected ? style.glow + ' ring-1 ring-white/50' : ''
                  }`}
                  style={{ height: `${item.busyPct}%` }}
                >
                  {/* Subtle gloss highlight on top of the fill */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-white/40 rounded-t-sm" />
                </div>
              </div>

              {/* Time Label */}
              <span
                className={`text-[10px] sm:text-xs mt-2 transition-colors font-medium ${
                  isSelected ? 'text-[#c5a059] font-bold' : 'text-zinc-400'
                }`}
              >
                <span className="xs:hidden">{item.label}</span>
                <span className="hidden xs:inline">{item.hour}</span>
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend & Advice */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-t from-[#c5a059] to-[#ffe5a3]"></span>
            <span>Peak (&gt;80%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-t from-amber-700 to-[#c5a059]"></span>
            <span>Moderate (40%-79%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-t from-emerald-700 to-emerald-400"></span>
            <span>Low Wait (&lt;40%)</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-zinc-400">
          <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>Tip: Hover or tap any bar to see live capacity</span>
        </div>
      </div>
    </div>
  );
};
