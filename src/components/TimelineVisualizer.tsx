import React, { useState } from 'react';
import { Clock, Shield, AlertCircle, ArrowDown, BookOpen, User, CheckCircle2 } from 'lucide-react';
import { TimelineEvent, EnrichedHero, EnrichedStory } from '../types/lore';

interface TimelineVisualizerProps {
  events: TimelineEvent[];
  heroes: EnrichedHero[];
  stories: EnrichedStory[];
  onSelectHero: (hero: EnrichedHero) => void;
  onReadStory: (story: EnrichedStory) => void;
}

export const TimelineVisualizer: React.FC<TimelineVisualizerProps> = ({
  events,
  heroes,
  stories,
  onSelectHero,
  onReadStory
}) => {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  return (
    <section id="timeline" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold-400 font-serif">
          <Clock className="w-3.5 h-3.5 text-gold-400" />
          <span>Chronology of Dawn</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-ivory tracking-tight mt-1.5">
          Imperial Annals & Historical Eras
        </h2>
        <p className="text-xs sm:text-sm text-parchment/60 font-sans mt-2">
          Strict canon historical progression without speculative year fabrication. Every event links causally to the conflicts of the realm.
        </p>
      </div>

      {/* Vertical Timeline Tree */}
      <div className="relative border-l-2 border-gold-500/25 ml-4 sm:ml-32 md:ml-44 space-y-10 pl-6 sm:pl-10">
        {events.map((event, index) => {
          const isSelected = selectedEventId === event.event_id;
          const eventHeroes = heroes.filter((h) => event.hero_ids.includes(h.hero_id));
          const eventStories = stories.filter((s) => event.story_ids.includes(s.story_id));

          return (
            <div
              key={event.event_id}
              className="relative group cursor-pointer"
              onClick={() => setSelectedEventId(isSelected ? null : event.event_id)}
            >
              {/* Timeline Node Icon on line */}
              <div
                className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isSelected
                    ? 'bg-gold-500 border-gold-300 text-night shadow-goldGlow scale-110'
                    : 'bg-void border-gold-500/50 text-gold-400 group-hover:border-gold-300 group-hover:scale-105'
                }`}
              >
                <span className="font-serif text-xs font-bold">{index + 1}</span>
              </div>

              {/* Time Period Tag (Left on larger screens) */}
              <div className="hidden sm:block absolute -left-44 top-2 text-right w-36 pr-4">
                <span className="text-xs font-cormorant font-semibold italic text-gold-300/80 line-clamp-2">
                  {event.approximate_period}
                </span>
              </div>

              {/* Event Card Content */}
              <div className="rounded-xl bg-card border border-white/10 group-hover:border-gold-500/40 p-5 sm:p-6 transition-all duration-300 shadow-md group-hover:shadow-glow">
                {/* Mobile time period badge */}
                <div className="sm:hidden text-xs font-cormorant italic text-gold-300/90 mb-1.5">
                  {event.approximate_period}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-ivory group-hover:text-gold-300 transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-sans tracking-wider px-2 py-0.5 rounded bg-gold-500/10 text-gold-300 border border-gold-400/20">
                      {event.confidence} canon
                    </span>
                  </div>
                </div>

                <p className="text-sm font-sans text-parchment/80 leading-relaxed mt-2.5">
                  {event.description}
                </p>

                {/* Causality Note / Connection to adjacent */}
                {event.connection_to_adjacent && (
                  <div className="mt-3.5 p-3 rounded-lg bg-gold-500/5 border-l-2 border-gold-400/50 text-xs text-parchment/70 font-serif italic">
                    <span className="font-bold text-gold-300 not-italic">Causal Impact: </span>
                    {event.connection_to_adjacent}
                  </div>
                )}

                {/* Associated heroes and stories tags */}
                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  {/* Hero pills */}
                  <div className="flex flex-wrap items-center gap-2">
                    {eventHeroes.map((h) => (
                      <button
                        key={h.hero_id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectHero(h);
                        }}
                        className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 px-2 py-0.5 rounded-full text-xs text-parchment/80 hover:text-gold-300 transition-all"
                      >
                        <img
                          src={h.avatarUrl}
                          alt={h.canonical_name}
                          className="w-4 h-4 rounded-full object-cover"
                        />
                        <span>{h.canonical_name}</span>
                      </button>
                    ))}
                  </div>

                  {/* Read Story Button */}
                  {eventStories.length > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onReadStory(eventStories[0]);
                      }}
                      className="text-xs font-serif font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read Story</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
