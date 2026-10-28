import React from 'react';
import { Compass, ArrowRight, CheckCircle2, Shield, Flame, BookOpen } from 'lucide-react';
import { ReadingPath, EnrichedStory } from '../types/lore';

interface ReadingPathProps {
  readingPath?: ReadingPath;
  stories: EnrichedStory[];
  onReadStory: (story: EnrichedStory) => void;
}

export const ReadingPathSection: React.FC<ReadingPathProps> = ({
  readingPath,
  stories,
  onReadStory
}) => {
  if (!readingPath) return null;

  return (
    <section id="path" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="relative rounded-2xl bg-gradient-to-br from-card via-night to-void border border-gold-500/25 p-6 sm:p-10 overflow-hidden shadow-2xl">
        {/* Ambient background glow */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-moniyan/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold-400 font-serif">
            <Compass className="w-4 h-4 text-gold-400" />
            <span>Recommended Reading Sequence</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-ivory tracking-tight mt-1.5">
            {readingPath.path_name}
          </h2>
          <p className="text-sm text-parchment/70 font-sans leading-relaxed mt-2">
            {readingPath.description}
          </p>
        </div>

        {/* Connected Step Cards */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-4">
          {readingPath.recommended_story_sequence.map((storyId, index) => {
            const story = stories.find((s) => s.story_id === storyId);
            if (!story) return null;

            return (
              <div
                key={storyId}
                onClick={() => onReadStory(story)}
                className="group relative bg-card/60 hover:bg-cardHover border border-white/10 hover:border-gold-400/50 rounded-xl p-4 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1 hover:shadow-glow"
              >
                {/* Step indicator header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="w-6 h-6 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 font-serif text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-parchment/50 font-sans">
                    {story.story_type.replace('_arc', '')}
                  </span>
                </div>

                {/* Story mini cover */}
                <div className="h-24 w-full rounded-lg overflow-hidden bg-void mb-3 relative">
                  <img
                    src={story.backdropUrl || story.coverArt}
                    alt={story.title}
                    className="w-full h-full object-cover object-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                    onError={(e) => {
                      if (story.coverArt && (e.target as HTMLImageElement).src !== story.coverArt) {
                        (e.target as HTMLImageElement).src = story.coverArt;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>

                {/* Story Info */}
                <div className="flex-1">
                  <h4 className="font-serif text-sm font-bold text-ivory group-hover:text-gold-300 transition-colors line-clamp-2">
                    {story.title}
                  </h4>
                  <p className="font-cormorant text-xs italic text-parchment/60 line-clamp-1 mt-0.5">
                    {story.subtitle}
                  </p>
                </div>

                {/* Bottom link */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gold-400 font-sans mt-3">
                  <span>~{story.estimatedMinutes} min</span>
                  <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
