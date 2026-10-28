import React, { useState } from 'react';
import { Shield, Flame, Moon, Compass, Users, BookOpen, ChevronRight } from 'lucide-react';
import { Faction, EnrichedHero, EnrichedStory } from '../types/lore';

interface FactionExplorerProps {
  factions: Faction[];
  heroes: EnrichedHero[];
  stories: EnrichedStory[];
  onSelectHero: (hero: EnrichedHero) => void;
  onReadStory: (story: EnrichedStory) => void;
}

export const FactionExplorer: React.FC<FactionExplorerProps> = ({
  factions,
  heroes,
  stories,
  onSelectHero,
  onReadStory
}) => {
  const [selectedFactionId, setSelectedFactionId] = useState<string>(
    factions[0]?.faction_id || ''
  );

  const activeFaction =
    factions.find((f) => f.faction_id === selectedFactionId) || factions[0];

  const factionHeroes = heroes.filter((h) =>
    activeFaction?.member_hero_ids.includes(h.hero_id)
  );

  const factionStories = stories.filter((s) =>
    activeFaction?.associated_story_ids.includes(s.story_id)
  );

  return (
    <section id="factions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold-400 font-serif">
          <Shield className="w-3.5 h-3.5 text-gold-400" />
          <span>Forces of Destiny</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-ivory tracking-tight mt-1">
          The Great Realm Factions
        </h2>
        <p className="text-xs sm:text-sm text-parchment/60 font-sans mt-0.5">
          Clashing allegiances, ancient bloodlines, and ideological wars across the Land of Dawn.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Faction selector list (Left) */}
        <div className="lg:col-span-4 space-y-2">
          {factions.map((f) => {
            const isSelected = f.faction_id === activeFaction?.faction_id;
            return (
              <button
                key={f.faction_id}
                onClick={() => setSelectedFactionId(f.faction_id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                  isSelected
                    ? 'bg-card border-gold-400/60 shadow-glow text-gold-300 translate-x-1'
                    : 'bg-card/40 border-white/10 hover:border-white/20 text-parchment/70 hover:text-ivory'
                }`}
              >
                <div>
                  <h4 className="font-serif text-sm sm:text-base font-bold">
                    {f.canonical_name}
                  </h4>
                  <span className="text-[11px] font-sans opacity-70">
                    {f.member_hero_ids.length} Champions · {f.associated_story_ids.length} Lore Arcs
                  </span>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    isSelected ? 'text-gold-400 translate-x-1' : 'opacity-30'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Faction Detailed View (Right) */}
        {activeFaction && (
          <div className="lg:col-span-8 rounded-2xl bg-card border border-gold-500/30 p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
            {/* Ambient Background Watermark */}
            <div className="absolute -right-8 -bottom-8 opacity-5 pointer-events-none">
              <Shield className="w-72 h-72 text-gold-400" />
            </div>

            {/* Header */}
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-400 font-serif font-bold">
                Faction Dossier
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-ivory mt-1">
                {activeFaction.canonical_name}
              </h3>
              <p className="text-sm sm:text-base font-cormorant italic text-gold-300/90 mt-1 leading-snug">
                "{activeFaction.purpose}"
              </p>
            </div>

            {/* Champions within this Faction */}
            <div>
              <h4 className="text-xs uppercase font-serif tracking-wider text-parchment/50 font-bold mb-3 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-gold-400" />
                <span>Affiliated Champions</span>
              </h4>
              {factionHeroes.length === 0 ? (
                <p className="text-xs text-parchment/40 italic">
                  Non-playable regional nobility and political delegates.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {factionHeroes.map((hero) => (
                    <div
                      key={hero.hero_id}
                      onClick={() => onSelectHero(hero)}
                      className="group flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-gold-500/40 cursor-pointer transition-all hover:bg-cardHover"
                    >
                      <img
                        src={hero.avatarUrl}
                        alt={hero.canonical_name}
                        className="w-10 h-10 rounded-full object-cover border border-gold-500/30 group-hover:scale-105 transition-transform"
                      />
                      <div className="overflow-hidden">
                        <h5 className="font-serif text-sm font-bold text-ivory group-hover:text-gold-300 truncate">
                          {hero.canonical_name}
                        </h5>
                        <p className="text-[11px] text-parchment/50 font-sans truncate">
                          {hero.badgeLabel}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Associated Stories */}
            <div>
              <h4 className="text-xs uppercase font-serif tracking-wider text-parchment/50 font-bold mb-3 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-gold-400" />
                <span>Associated Canonical Story Arcs</span>
              </h4>
              <div className="space-y-2.5">
                {factionStories.map((story) => (
                  <div
                    key={story.story_id}
                    onClick={() => onReadStory(story)}
                    className="group flex items-center justify-between p-3.5 rounded-lg bg-white/5 border border-white/10 hover:border-gold-400/50 cursor-pointer transition-all hover:bg-cardHover"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-serif tracking-wider text-gold-400">
                        Act 0{story.recommended_reading_order}
                      </span>
                      <h5 className="font-serif text-sm sm:text-base font-bold text-ivory group-hover:text-gold-300">
                        {story.title}
                      </h5>
                      <p className="text-xs text-parchment/60 font-cormorant italic line-clamp-1">
                        {story.subtitle}
                      </p>
                    </div>
                    <div className="text-xs text-gold-400 font-serif font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Read Story</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
