import React, { useState } from 'react';
import { Users, Shield, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { EnrichedHero } from '../types/lore';

interface HeroCodexProps {
  heroes: EnrichedHero[];
  onSelectHero: (hero: EnrichedHero) => void;
}

export const HeroCodex: React.FC<HeroCodexProps> = ({ heroes, onSelectHero }) => {
  const [selectedFaction, setSelectedFaction] = useState<string>('all');

  const factions = [
    { id: 'all', label: 'All Champions' },
    { id: 'faction_moniyan_empire', label: 'Moniyan Imperial Court' },
    { id: 'faction_lightborn', label: 'Lightborn Order' },
    { id: 'faction_abyss', label: 'The Abyssal Host' },
    { id: 'faction_demon_hunters', label: 'Demon Hunters' },
    { id: 'faction_blood_demons', label: 'Blood Demon Enclave' },
  ];

  const filteredHeroes = heroes.filter((h) => {
    if (selectedFaction === 'all') return true;
    return h.faction_id === selectedFaction;
  });

  return (
    <section id="heroes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold-400 font-serif">
            <Users className="w-3.5 h-3.5 text-gold-400" />
            <span>Characters of the Realm</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-ivory tracking-tight mt-1">
            Champions of Dawn
          </h2>
          <p className="text-xs sm:text-sm text-parchment/60 font-sans mt-0.5">
            Key figures whose intertwined fates forged the history of the continent.
          </p>
        </div>

        {/* Faction Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-card/60 border border-white/10 p-1.5 rounded-xl">
          {factions.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFaction(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedFaction === f.id
                  ? 'bg-gold-500/20 text-gold-300 border border-gold-400/40 shadow-sm'
                  : 'text-parchment/70 hover:text-ivory hover:bg-white/5'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {filteredHeroes.map((hero) => (
          <div
            key={hero.hero_id}
            onClick={() => onSelectHero(hero)}
            className="group relative rounded-xl bg-card border border-white/10 hover:border-gold-400/50 p-4 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-glow overflow-hidden"
          >
            {/* Ambient Background subtle glow */}
            <div
              className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 transition-opacity blur-2xl pointer-events-none"
              style={{ backgroundColor: hero.accentColor }}
            />

            {/* Ambient Background Splash Painting */}
            <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-30 transition-opacity duration-500 overflow-hidden pointer-events-none">
              <img
                src={hero.backdropUrl}
                alt=""
                className="w-full h-full object-cover object-center filter blur-[1px] scale-110 group-hover:scale-125 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/75 to-transparent" />
            </div>

            <div>
              {/* Character Portrait with circle border */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 rounded-full overflow-hidden p-0.5 border-2 border-white/10 group-hover:border-gold-400 transition-colors shadow-lg">
                <img
                  src={hero.avatarUrl}
                  alt={hero.canonical_name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://api.dicebear.com/7.x/identicon/svg?seed=' + hero.canonical_name;
                  }}
                />
              </div>

              {/* Title & Badge */}
              <div className="text-center space-y-1">
                <h4 className="font-serif text-base sm:text-lg font-bold text-ivory group-hover:text-gold-300 transition-colors">
                  {hero.canonical_name}
                </h4>
                <span className="inline-block text-[10px] uppercase font-sans font-semibold tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-gold-400/90 border border-gold-500/20">
                  {hero.badgeLabel}
                </span>
              </div>

              {/* Faction & Region */}
              <p className="text-[11px] text-parchment/60 text-center font-sans mt-2 line-clamp-1">
                {hero.factionName}
              </p>
            </div>

            {/* Bottom Inspect Action */}
            <div className="pt-3 border-t border-white/10 mt-3 flex items-center justify-center text-xs font-serif font-semibold text-parchment/60 group-hover:text-gold-300 transition-colors gap-1">
              <span>Inspect Lore</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
