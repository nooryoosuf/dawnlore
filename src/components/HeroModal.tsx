import React from 'react';
import { X, Shield, BookOpen, Users, Compass, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';
import { EnrichedHero, EnrichedStory, Relationship } from '../types/lore';

interface HeroModalProps {
  hero: EnrichedHero | null;
  onClose: () => void;
  relationships: Relationship[];
  allHeroes: EnrichedHero[];
  onSelectHero: (hero: EnrichedHero) => void;
  stories: EnrichedStory[];
  onReadStory: (story: EnrichedStory) => void;
}

export const HeroModal: React.FC<HeroModalProps> = ({
  hero,
  onClose,
  relationships,
  allHeroes,
  onSelectHero,
  stories,
  onReadStory
}) => {
  if (!hero) return null;

  const heroStories = stories.filter((s) => hero.story_references.includes(s.story_id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-void/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-4xl max-h-[92vh] rounded-2xl bg-gradient-to-b from-card to-night border border-gold-500/30 overflow-hidden shadow-2xl flex flex-col md:flex-row my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-void/80 border border-white/10 text-parchment/60 hover:text-ivory hover:border-gold-400 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Character Portrait Column */}
        <div className="relative w-full md:w-5/12 min-h-[320px] md:min-h-full bg-void/90 flex items-end justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
          {/* Background Landscape Splash Art Overlay */}
          <div className="absolute inset-0 z-0 opacity-40">
            <img
              src={hero.backdropUrl}
              alt=""
              className="w-full h-full object-cover object-center filter blur-[1px] scale-110"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-void/50 to-void/70" />
          </div>

          {/* Background Ambient Radial Glow */}
          <div
            className="absolute inset-0 opacity-30 z-[1]"
            style={{
              background: `radial-gradient(circle at center, ${hero.accentColor} 0%, transparent 70%)`
            }}
          />

          <img
            src={hero.splashUrl}
            alt={hero.canonical_name}
            className="relative z-10 max-h-[460px] md:max-h-[520px] w-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = hero.avatarUrl;
            }}
          />

          {/* Vignette Bottom Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10" />

          {/* Badges on Portrait */}
          <div className="absolute bottom-4 left-4 right-4 z-20 text-center">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-serif font-bold uppercase tracking-wider bg-void/80 backdrop-blur-md border border-gold-500/30 text-gold-300">
              {hero.badgeLabel}
            </span>
          </div>
        </div>

        {/* Right Information Column */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Header Title */}
          <div>
            <div className="flex items-center gap-2 text-xs font-serif font-semibold tracking-wider text-gold-400 uppercase">
              <Shield className="w-3.5 h-3.5" />
              <span>{hero.factionName}</span>
              <span>·</span>
              <span>{hero.regionName}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-ivory mt-1">
              {hero.canonical_name}
            </h2>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {hero.aliases.map((alias, idx) => (
                <span
                  key={idx}
                  className="text-xs font-cormorant italic text-gold-300/80 bg-white/5 px-2 py-0.5 rounded"
                >
                  "{alias}"
                </span>
              ))}
            </div>
          </div>

          {/* Hero Quote */}
          {hero.quote && (
            <div className="p-3.5 rounded-lg bg-gold-500/5 border-l-2 border-gold-400 italic font-cormorant text-base text-parchment/90">
              "{hero.quote}"
            </div>
          )}

          {/* Documented Role */}
          <div className="space-y-1.5">
            <h4 className="text-xs uppercase font-serif tracking-wider text-parchment/50 font-bold">
              Imperial Canon Profile
            </h4>
            <p className="text-sm font-sans text-parchment/80 leading-relaxed">
              {hero.documented_role}
            </p>
          </div>

          {/* Canonical Relationships */}
          {relationships.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="text-xs uppercase font-serif tracking-wider text-parchment/50 font-bold flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-gold-400" />
                <span>Canonical Ties & Destinies</span>
              </h4>
              <div className="space-y-2">
                {relationships.map((rel) => {
                  const otherHeroId =
                    rel.source_entity === hero.hero_id ? rel.target_entity : rel.source_entity;
                  const otherHero = allHeroes.find((h) => h.hero_id === otherHeroId);

                  return (
                    <div
                      key={rel.relationship_id}
                      className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-gold-500/30 transition-all text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => otherHero && onSelectHero(otherHero)}
                          className="font-serif font-bold text-gold-300 hover:underline flex items-center gap-1.5"
                        >
                          {otherHero && (
                            <img
                              src={otherHero.avatarUrl}
                              alt={otherHero.canonical_name}
                              className="w-5 h-5 rounded-full object-cover"
                            />
                          )}
                          <span>{otherHero ? otherHero.canonical_name : otherHeroId}</span>
                        </button>
                        <span className="text-[10px] uppercase font-sans tracking-wider px-2 py-0.5 rounded bg-white/5 text-parchment/60">
                          {rel.relationship_type.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <p className="text-parchment/70 font-sans leading-relaxed">
                        {rel.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Story Appearances */}
          {heroStories.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="text-xs uppercase font-serif tracking-wider text-parchment/50 font-bold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-gold-400" />
                <span>Story Appearances</span>
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {heroStories.map((s) => (
                  <div
                    key={s.story_id}
                    onClick={() => {
                      onClose();
                      onReadStory(s);
                    }}
                    className="group flex items-center justify-between p-3 rounded-lg bg-card border border-white/10 hover:border-gold-400/50 cursor-pointer transition-all hover:bg-cardHover"
                  >
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-gold-400 font-serif">
                        Act 0{s.recommended_reading_order}
                      </span>
                      <h5 className="font-serif text-sm font-bold text-ivory group-hover:text-gold-300 transition-colors">
                        {s.title}
                      </h5>
                    </div>
                    <span className="text-xs text-gold-400 font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Read Arc
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
