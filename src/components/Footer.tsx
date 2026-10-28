import React from 'react';
import { Shield, Sparkles, Scroll, ExternalLink, Heart } from 'lucide-react';
import { Metadata } from '../types/lore';

interface FooterProps {
  metadata: Metadata;
  onOpenSources: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ metadata, onOpenSources, onNavigate }) => {
  return (
    <footer className="border-t border-gold-500/20 bg-gradient-to-b from-card/80 to-void py-16 text-parchment/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Logo & description */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-amber-700 p-[1.5px] shadow-glow">
                <div className="w-full h-full rounded-full bg-void flex items-center justify-center">
                  <Shield className="w-4 h-4 text-gold-400" />
                </div>
              </div>
              <div>
                <span className="font-serif font-extrabold tracking-wider text-base text-gold-gradient uppercase block">
                  Land of Dawn
                </span>
                <span className="text-[10px] uppercase tracking-widest text-parchment/60 font-sans">
                  The Imperial Lore Archive
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-parchment/60 font-sans leading-relaxed max-w-md">
              A cinematic narrative repository preserving the legends, character chronicles, and holy wars of the Land of Dawn.
            </p>
            <div className="text-[11px] font-sans text-parchment/50">
              {metadata.project_title} · Canon Version {metadata.schema_version} ({metadata.research_date})
            </div>
          </div>

          {/* Archive Navigation */}
          <div>
            <h4 className="font-serif text-xs uppercase tracking-widest text-gold-400 font-bold mb-4">
              Archive Chapters
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <button
                  onClick={() => onNavigate('stories')}
                  className="hover:text-gold-300 transition-colors"
                >
                  The Five Canonical Arcs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('path')}
                  className="hover:text-gold-300 transition-colors"
                >
                  Imperial Reading Sequence
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('heroes')}
                  className="hover:text-gold-300 transition-colors"
                >
                  Champions of Dawn Codex
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('factions')}
                  className="hover:text-gold-300 transition-colors"
                >
                  The Realm Factions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('timeline')}
                  className="hover:text-gold-300 transition-colors"
                >
                  Imperial Timeline
                </button>
              </li>
            </ul>
          </div>

          {/* Archival Principles */}
          <div>
            <h4 className="font-serif text-xs uppercase tracking-widest text-gold-400 font-bold mb-4">
              Canon Integrity
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <button
                  onClick={onOpenSources}
                  className="hover:text-gold-300 transition-colors flex items-center gap-1.5"
                >
                  <Scroll className="w-3.5 h-3.5 text-gold-400" />
                  <span>Inspect Sources & Policy</span>
                </button>
              </li>
              <li className="text-[11px] text-parchment/50 leading-relaxed">
                Zero speculative year fabrication. Strictly adheres to official Moonton Hero Biographies and Imperial Annals.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright / fair use disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-parchment/50 gap-4">
          <p>
            Mobile Legends: Bang Bang, its lore, and character names are registered trademarks of Moonton.
          </p>
          <p className="flex items-center gap-1 text-[11px]">
            <span>Archived with care for MLBB Lore Enthusiasts</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
