import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, CheckCircle, ExternalLink, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { REVIEWS_DATA, SALON_INFO } from '../data/salonData';
import { ReviewItem } from '../types/salon';

export const ReviewsSection: React.FC = () => {
  const reviews = REVIEWS_DATA;

  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  const totalCount = reviews.length;
  const count5 = reviews.filter((r) => r.rating === 5).length;
  const count4 = reviews.filter((r) => r.rating === 4).length;
  const count3 = reviews.filter((r) => r.rating === 3).length;
  const count2 = reviews.filter((r) => r.rating === 2).length;
  const count1 = reviews.filter((r) => r.rating === 1).length;

  const averageRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (totalCount || 1)
  ).toFixed(1);

  const filterTags = [
    { id: 'all', label: 'All Reviews', count: reviews.length },
    { id: 'haircut', label: 'Haircut & Styling', count: reviews.filter((r) => r.tags.includes('haircut')).length },
    { id: 'skilled stylist', label: 'Piyush Bhai & Stylists', count: reviews.filter((r) => r.tags.includes('skilled stylist')).length },
    { id: 'hygiene', label: 'Hygiene & Cleanliness', count: reviews.filter((r) => r.tags.includes('hygiene')).length },
    { id: 'value for money', label: 'Value & Pricing', count: reviews.filter((r) => r.tags.includes('value for money')).length },
    { id: 'ambiance', label: 'Ambiance & Lounge', count: reviews.filter((r) => r.tags.includes('ambiance')).length },
    { id: 'facial', label: 'Facial & Grooming', count: reviews.filter((r) => r.tags.includes('facial')).length },
  ];

  const filteredReviews = reviews.filter((r) => {
    if (selectedTag === 'all') return true;
    return r.tags.includes(selectedTag);
  });

  const displayedReviews = filteredReviews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredReviews.length;

  const handleViewMore = () => {
    // Show all 50 reviews when clicking "View More Reviews"
    setSelectedTag('all');
    setVisibleCount(reviews.length);
  };

  const handleShowLess = () => {
    setVisibleCount(6);
    const el = document.getElementById('reviews');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleLike = (id: string) => {
    setLikedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="reviews" className="py-20 bg-[#0f1117] border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181b24] border border-[#c5a059]/30 text-xs font-semibold text-[#c5a059] uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-[#c5a059]" />
            <span>Google Maps Verified Feedback</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-wide mb-3">
            CLIENT EXPERIENCES & REVIEWS
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Real reviews directly from our Google Maps Business profile in Junagadh.
          </p>
        </div>

        {/* Rating Breakdown Dashboard (Clean 2-Column without Write Review) */}
        <div className="p-5 sm:p-8 rounded-2xl bg-[#141720] border border-zinc-800 mb-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center max-w-4xl mx-auto">
          {/* Score */}
          <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-zinc-800 pb-5 md:pb-0 md:pr-8">
            <div className="font-cinzel text-4xl sm:text-5xl font-extrabold text-white mb-2">
              4.4
            </div>
            <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${i < 4 ? 'fill-amber-400' : 'fill-amber-400/30'}`}
                />
              ))}
            </div>
            <p className="text-xs text-zinc-400">
              Based on <strong className="text-white">{totalCount} verified Google Maps reviews</strong>
            </p>
            <p className="text-[11px] text-[#c5a059] font-medium mt-1">
              Top-rated for hygiene & Piyush Bhai's scissor work
            </p>
          </div>

          {/* Star bars */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-4 text-zinc-400 font-medium">5★</span>
              <div className="flex-1 h-2 rounded-full bg-[#1e222d] overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all"
                  style={{ width: `${Math.round((count5 / totalCount) * 100)}%` }}
                ></div>
              </div>
              <span className="w-8 text-zinc-400 text-right">{count5}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 text-zinc-400 font-medium">4★</span>
              <div className="flex-1 h-2 rounded-full bg-[#1e222d] overflow-hidden">
                <div
                  className="h-full bg-amber-400/80 rounded-full transition-all"
                  style={{ width: `${Math.round((count4 / totalCount) * 100)}%` }}
                ></div>
              </div>
              <span className="w-8 text-zinc-400 text-right">{count4}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 text-zinc-400 font-medium">3★</span>
              <div className="flex-1 h-2 rounded-full bg-[#1e222d] overflow-hidden">
                <div
                  className="h-full bg-amber-400/50 rounded-full transition-all"
                  style={{ width: `${Math.round((count3 / totalCount) * 100)}%` }}
                ></div>
              </div>
              <span className="w-8 text-zinc-400 text-right">{count3}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 text-zinc-400 font-medium">2★</span>
              <div className="flex-1 h-2 rounded-full bg-[#1e222d] overflow-hidden">
                <div
                  className="h-full bg-amber-400/30 rounded-full transition-all"
                  style={{ width: `${Math.round((count2 / totalCount) * 100)}%` }}
                ></div>
              </div>
              <span className="w-8 text-zinc-400 text-right">{count2}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 text-zinc-400 font-medium">1★</span>
              <div className="flex-1 h-2 rounded-full bg-[#1e222d] overflow-hidden">
                <div
                  className="h-full bg-amber-400/20 rounded-full transition-all"
                  style={{ width: `${Math.round((count1 / totalCount) * 100)}%` }}
                ></div>
              </div>
              <span className="w-8 text-zinc-400 text-right">{count1}</span>
            </div>
          </div>
        </div>

        {/* Filter tags (scraped from Google Maps summary) */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs text-zinc-500 mr-1 font-medium whitespace-nowrap shrink-0">Topic:</span>
          {filterTags.map((tag) => {
            const active = selectedTag === tag.id;
            return (
              <button
                key={tag.id}
                onClick={() => setSelectedTag(tag.id)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#c5a059] text-black font-semibold shadow'
                    : 'bg-[#181b24] text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                <span>{tag.label}</span>
                <span className={`text-[10px] ${active ? 'text-black/70' : 'text-zinc-500'}`}>
                  {tag.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {displayedReviews.map((rev) => {
            const isLiked = likedReviews[rev.id];

            return (
              <div
                key={rev.id}
                className="rounded-xl bg-[#141720] border border-zinc-800/80 p-5 sm:p-6 flex flex-col justify-between hover:border-zinc-700 transition-all"
              >
                <div>
                  {/* User info */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#c5a059] to-amber-700 flex items-center justify-center font-bold text-black text-sm">
                        {rev.author.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white leading-snug">
                          {rev.author}
                        </h4>
                        <p className="text-[11px] text-zinc-500">
                          {rev.reviewCount} · {rev.timeAgo}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-xs text-zinc-300 leading-relaxed mb-4 italic">
                    "{rev.comment}"
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {rev.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] text-zinc-400 bg-[#181b24] px-2 py-0.5 rounded border border-zinc-800"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  {/* Owner reply if present */}
                  {rev.ownerReply && (
                    <div className="p-3 rounded-lg bg-[#181b24] border-l-2 border-[#c5a059] text-[11px] text-zinc-300 mb-4 space-y-1">
                      <div className="flex items-center justify-between text-zinc-400 font-semibold">
                        <span className="text-[#c5a059]">Response from the owner</span>
                        <span>{rev.ownerReply.timeAgo}</span>
                      </div>
                      <p className="text-zinc-400">{rev.ownerReply.text}</p>
                    </div>
                  )}
                </div>

                {/* Bottom actions */}
                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
                  <button
                    onClick={() => toggleLike(rev.id)}
                    className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isLiked ? 'text-[#c5a059]' : 'hover:text-zinc-300'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#c5a059]' : ''}`} />
                    <span>{isLiked ? 'Helpful (1)' : 'Helpful'}</span>
                  </button>

                  <span className="text-[11px] text-zinc-500">Verified Visit</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* View More Reviews CTA Bar */}
        <div className="mt-12 text-center flex flex-col items-center justify-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {hasMore ? (
              <button
                onClick={handleViewMore}
                className="px-6 py-3.5 rounded-xl bg-[#c5a059] hover:bg-[#d6b26d] text-black font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-[#c5a059]/20 transition-all cursor-pointer hover:scale-[1.02] active:scale-98"
              >
                <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                <span>View More Reviews (Show All {reviews.length} Reviews)</span>
              </button>
            ) : (
              reviews.length > 6 && (
                <button
                  onClick={handleShowLess}
                  className="px-6 py-3 rounded-xl bg-[#181b24] hover:bg-[#202430] border border-zinc-700 text-zinc-300 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer hover:border-zinc-500"
                >
                  <ChevronUp className="w-4 h-4" />
                  <span>Show Less (Collapse to 6 Reviews)</span>
                </button>
              )
            )}
          </div>

          <p className="text-xs text-zinc-500">
            Showing <strong className="text-zinc-300">{displayedReviews.length}</strong> of{' '}
            <strong className="text-zinc-300">{reviews.length}</strong> verified reviews on Google Maps
          </p>
        </div>
      </div>
    </section>
  );
};
