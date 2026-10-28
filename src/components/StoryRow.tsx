import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { EnrichedStory, EnrichedHero } from '../types/lore';
import { StoryCard } from './StoryCard';

interface StoryRowProps {
  title: string;
  subtitle: string;
  stories: EnrichedStory[];
  onReadStory: (story: EnrichedStory) => void;
  onSelectHero: (hero: EnrichedHero) => void;
  isBookmarked: (storyId: string) => boolean;
  onToggleBookmark: (storyId: string) => void;
}

export const StoryRow: React.FC<StoryRowProps> = ({
  title,
  subtitle,
  stories,
  onReadStory,
  onSelectHero,
  isBookmarked,
  onToggleBookmark
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="stories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header with Title and Scroll Controls */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold-400 font-serif">
            <BookOpen className="w-3.5 h-3.5 text-gold-400" />
            <span>The Lore Archive</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ivory tracking-tight mt-1">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-parchment/60 font-sans mt-0.5">
            {subtitle}
          </p>
        </div>

        {/* Scroll Arrows */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-card/80 border border-white/10 hover:border-gold-500/40 text-parchment/70 hover:text-ivory transition-all shadow-sm"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-card/80 border border-white/10 hover:border-gold-500/40 text-parchment/70 hover:text-ivory transition-all shadow-sm"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stories Grid / Horizontal Scroller */}
      <div
        ref={rowRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 overflow-x-auto pb-4 pt-1 scroll-smooth"
      >
        {stories.map((story) => (
          <StoryCard
            key={story.story_id}
            story={story}
            onRead={onReadStory}
            onSelectHero={onSelectHero}
            isBookmarked={isBookmarked(story.story_id)}
            onToggleBookmark={onToggleBookmark}
          />
        ))}
      </div>
    </section>
  );
};
