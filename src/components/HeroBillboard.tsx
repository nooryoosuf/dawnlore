import React, { useState, useEffect } from 'react';
import { Play, BookOpen, Compass, ChevronRight, Sparkles, Shield, Bookmark, BookmarkCheck } from 'lucide-react';
import { EnrichedStory, EnrichedHero } from '../types/lore';

interface HeroBillboardProps {
  stories: EnrichedStory[];
  onReadStory: (story: EnrichedStory) => void;
  onSelectHero: (hero: EnrichedHero) => void;
  isBookmarked: (storyId: string) => boolean;
  onToggleBookmark: (storyId: string) => void;
}

export const HeroBillboard: React.FC<HeroBillboardProps> = ({
  stories,
  onReadStory,
  onSelectHero,
  isBookmarked,
  onToggleBookmark
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeStory = stories[currentIndex] || stories[0];

  useEffect(() => {
    // Subtle auto slide every 14 seconds if user doesn't interact
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.min(stories.length, 3));
    }, 14000);
    return () => clearInterval(timer);
  }, [stories.length]);

  if (!activeStory) return null;

  const bookmarked = isBookmarked(activeStory.story_id);

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Dynamic Background Art with Layered Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Full-Bleed Cinematic Splash Art Painting Background */}
        <div className="absolute inset-0 transition-opacity duration-1000">
          <img
            key={`backdrop-${activeStory.story_id}`}
            src={activeStory.backdropUrl}
            alt={activeStory.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.1] scale-105 transition-transform duration-1000 ease-out"
            onError={(e) => {
              if (activeStory.coverArt && (e.target as HTMLImageElement).src !== activeStory.coverArt) {
                (e.target as HTMLImageElement).src = activeStory.coverArt;
              }
            }}
          />
        </div>

        {/* Ambient Radial Color Bloom */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 75% 35%, rgba(197, 160, 89, 0.25) 0%, transparent 65%), radial-gradient(circle at 25% 65%, rgba(220, 38, 38, 0.3) 0%, transparent 65%)`
          }}
        />

        {/* Character Foreground Cutout for Multi-Layer Depth */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full lg:w-1/2 h-full opacity-40 lg:opacity-75 pointer-events-none overflow-hidden flex items-center justify-end pr-4 lg:pr-16">
          <img
            key={`character-${activeStory.story_id}`}
            src={activeStory.coverArt}
            alt={activeStory.title}
            referrerPolicy="no-referrer"
            className="h-[85%] max-h-[750px] object-contain object-right filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] animate-fade-in transition-all duration-700"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        {/* Cinematic Vignette & Edge Blending Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/90 sm:via-void/80 to-transparent w-full lg:w-3/4 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-void/90 via-transparent to-void z-10" />
        <div className="absolute inset-0 cinematic-vignette opacity-80 pointer-events-none z-10" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl lg:max-w-3xl space-y-5">
          {/* Badge Row */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-gold-500/15 text-gold-300 border border-gold-400/30">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              Imperial Chronicle · Arc {activeStory.recommended_reading_order}
            </span>
            <span className="text-xs uppercase tracking-widest text-parchment/60 font-medium">
              {activeStory.word_count.toLocaleString()} Words · ~{activeStory.estimatedMinutes} min read
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-gold-500/40" />
            <span className="text-xs text-parchment/50 font-serif italic">
              Strict Canon Verified
            </span>
          </div>

          {/* Editorial Title */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ivory leading-[1.1] drop-shadow-lg">
            {activeStory.title}
          </h1>

          {/* Subtitle */}
          <p className="font-cormorant text-xl sm:text-2xl italic text-gold-300/90 leading-snug">
            "{activeStory.subtitle}"
          </p>

          {/* Introduction Synopsis */}
          <p className="text-sm sm:text-base text-parchment/80 leading-relaxed font-sans line-clamp-3 sm:line-clamp-4 max-w-2xl">
            {activeStory.introduction}
          </p>

          {/* Key Characters Row */}
          <div className="pt-2">
            <span className="text-xs font-medium uppercase tracking-wider text-parchment/50 block mb-2">
              Featured Champions
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {activeStory.heroes.map((hero) => (
                <button
                  key={hero.hero_id}
                  onClick={() => onSelectHero(hero)}
                  className="group flex items-center gap-2 bg-card/80 hover:bg-cardHover border border-white/10 hover:border-gold-500/40 rounded-full pl-1.5 pr-3 py-1 transition-all text-xs"
                >
                  <img
                    src={hero.avatarUrl}
                    alt={hero.canonical_name}
                    className="w-6 h-6 rounded-full object-cover border border-gold-500/30 group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://api.dicebear.com/7.x/identicon/svg?seed=' + hero.canonical_name;
                    }}
                  />
                  <span className="text-ivory font-medium group-hover:text-gold-300 transition-colors">
                    {hero.canonical_name}
                  </span>
                  <span className="text-[10px] text-parchment/50">· {hero.badgeLabel}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              onClick={() => onReadStory(activeStory)}
              className="flex items-center gap-2.5 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-600 hover:from-gold-300 hover:to-amber-500 text-night font-serif font-bold text-sm sm:text-base px-6 py-3 rounded-lg shadow-goldGlow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <BookOpen className="w-5 h-5 text-night fill-night" />
              <span>Begin Reading</span>
            </button>

            <button
              onClick={() => onToggleBookmark(activeStory.story_id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                bookmarked
                  ? 'bg-gold-500/15 border-gold-400 text-gold-300'
                  : 'bg-card/70 border-white/15 text-parchment/80 hover:text-ivory hover:border-white/30'
              }`}
            >
              {bookmarked ? (
                <>
                  <BookmarkCheck className="w-4 h-4 text-gold-400" />
                  <span>Bookmarked</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span>Save to Archive</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Carousel Story Indicators / Switcher */}
        <div className="mt-12 flex items-center gap-3">
          {stories.slice(0, 5).map((story, idx) => (
            <button
              key={story.story_id}
              onClick={() => setCurrentIndex(idx)}
              className={`group flex items-center gap-2 text-xs transition-all ${
                currentIndex === idx ? 'text-gold-300' : 'text-parchment/40 hover:text-parchment/80'
              }`}
            >
              <span
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  currentIndex === idx
                    ? 'w-10 bg-gradient-to-r from-gold-400 to-amber-500'
                    : 'w-2 bg-white/20 group-hover:bg-white/40'
                }`}
              />
              <span className="hidden md:inline font-serif font-medium">0{idx + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
