import React from 'react';
import { BookOpen, Clock, FileText, Bookmark, BookmarkCheck, ChevronRight } from 'lucide-react';
import { EnrichedStory, EnrichedHero } from '../types/lore';

interface StoryCardProps {
  story: EnrichedStory;
  onRead: (story: EnrichedStory) => void;
  onSelectHero: (hero: EnrichedHero) => void;
  isBookmarked: boolean;
  onToggleBookmark: (storyId: string) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  story,
  onRead,
  onSelectHero,
  isBookmarked,
  onToggleBookmark
}) => {
  return (
    <div className="group relative rounded-xl bg-card border border-white/10 hover:border-gold-500/40 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-glow hover:-translate-y-1">
      {/* Top Banner Image with Gradient Overlay */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-void/80">
        <img
          src={story.backdropUrl || story.coverArt}
          alt={story.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          onError={(e) => {
            if (story.coverArt && (e.target as HTMLImageElement).src !== story.coverArt) {
              (e.target as HTMLImageElement).src = story.coverArt;
            }
          }}
        />

        {/* Ambient Gradient Fill */}
        <div className={`absolute inset-0 bg-gradient-to-t ${story.themeGradient} opacity-70`} />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

        {/* Reading Order Number Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-void/80 backdrop-blur-md border border-gold-500/30 px-2.5 py-1 rounded-full">
          <span className="text-[10px] uppercase font-serif tracking-widest text-gold-400 font-semibold">
            Act 0{story.recommended_reading_order}
          </span>
        </div>

        {/* Bookmark button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(story.story_id);
          }}
          title={isBookmarked ? 'Remove bookmark' : 'Bookmark story'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all ${
            isBookmarked
              ? 'bg-gold-500/20 border-gold-400 text-gold-300 shadow-glow'
              : 'bg-void/60 border-white/10 text-parchment/60 hover:text-ivory hover:border-white/30'
          }`}
        >
          {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-gold-400" /> : <Bookmark className="w-4 h-4" />}
        </button>

        {/* Chapters count badge */}
        <div className="absolute bottom-3 left-3 text-[11px] font-sans font-medium text-parchment/70 bg-void/70 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10">
          {story.chapters.length} Chapters · {story.word_count.toLocaleString()} words
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Badge & Era */}
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-parchment/50 font-medium mb-1.5">
            <span className="text-gold-400/90 font-serif">{story.story_type.replace(/_/g, ' ')}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              ~{story.estimatedMinutes} min
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onRead(story)}
            className="font-serif text-lg font-bold text-ivory group-hover:text-gold-300 transition-colors cursor-pointer leading-snug line-clamp-2"
          >
            {story.title}
          </h3>

          {/* Subtitle */}
          <p className="font-cormorant text-sm italic text-parchment/70 mt-1 line-clamp-1">
            {story.subtitle}
          </p>

          {/* Excerpt */}
          <p className="text-xs text-parchment/60 leading-relaxed font-sans line-clamp-3 mt-2.5">
            {story.introduction}
          </p>
        </div>

        {/* Footer info: Heroes & CTA */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          {/* Hero avatars stack */}
          <div className="flex items-center -space-x-2">
            {story.heroes.slice(0, 4).map((hero) => (
              <img
                key={hero.hero_id}
                src={hero.avatarUrl}
                alt={hero.canonical_name}
                title={hero.canonical_name}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectHero(hero);
                }}
                className="w-7 h-7 rounded-full object-cover border-2 border-card hover:border-gold-400 hover:scale-110 transition-all cursor-pointer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://api.dicebear.com/7.x/identicon/svg?seed=' + hero.canonical_name;
                }}
              />
            ))}
            {story.heroes.length > 4 && (
              <span className="w-7 h-7 rounded-full bg-cardHover border-2 border-card text-[10px] font-medium flex items-center justify-center text-parchment/70">
                +{story.heroes.length - 4}
              </span>
            )}
          </div>

          {/* Read CTA Button */}
          <button
            onClick={() => onRead(story)}
            className="flex items-center gap-1 text-xs font-serif font-bold text-gold-400 hover:text-gold-300 group/btn transition-colors"
          >
            <span>Read Story</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
