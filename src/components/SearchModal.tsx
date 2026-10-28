import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, User, Clock, Shield, Sparkles, ChevronRight } from 'lucide-react';
import { searchArchive, SearchResult } from '../data/loreAdapter';
import { EnrichedStory, EnrichedHero } from '../types/lore';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStory: (storyId: string) => void;
  onSelectHero: (heroId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectStory,
  onSelectHero
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const res = searchArchive(query);
    setResults(res);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'story':
      case 'chapter':
        return <BookOpen className="w-4 h-4 text-gold-400" />;
      case 'hero':
        return <User className="w-4 h-4 text-blue-400" />;
      case 'event':
        return <Clock className="w-4 h-4 text-amber-400" />;
      case 'faction':
        return <Shield className="w-4 h-4 text-red-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-gold-400" />;
    }
  };

  const handleItemClick = (item: SearchResult) => {
    onClose();
    if (item.type === 'story') {
      onSelectStory(item.id);
    } else if (item.type === 'chapter' && item.storyId) {
      onSelectStory(item.storyId);
    } else if (item.type === 'hero') {
      onSelectHero(item.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-void/80 backdrop-blur-md animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-card border border-gold-500/30 overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-night">
          <Search className="w-5 h-5 text-gold-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stories, chapters, heroes (e.g. Silvanna, Dyrroth, Terizla, Aberleen)..."
            className="flex-1 bg-transparent text-sm sm:text-base text-ivory placeholder-parchment/40 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-parchment/40 hover:text-ivory"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs uppercase font-sans text-parchment/50 hover:text-ivory px-2 py-1 rounded border border-white/10"
          >
            Esc
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto divide-y divide-white/5 p-2">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-parchment/50 text-xs sm:text-sm">
              <Sparkles className="w-6 h-6 text-gold-500/40 mx-auto mb-2" />
              <p>Type to search official Land of Dawn stories, events, and champions.</p>
              <div className="flex justify-center gap-2 mt-4 text-[11px] text-parchment/40">
                <span className="bg-white/5 px-2 py-0.5 rounded">Silvanna</span>
                <span className="bg-white/5 px-2 py-0.5 rounded">Siege</span>
                <span className="bg-white/5 px-2 py-0.5 rounded">Abyss</span>
                <span className="bg-white/5 px-2 py-0.5 rounded">Carmilla</span>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-parchment/50 text-sm">
              No matching imperial records found for "{query}".
            </div>
          ) : (
            results.map((item, idx) => (
              <div
                key={`${item.type}-${item.id}-${idx}`}
                onClick={() => handleItemClick(item)}
                className="group flex items-center justify-between p-3.5 rounded-xl hover:bg-cardHover cursor-pointer transition-all"
              >
                <div className="flex items-start gap-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 mt-0.5 flex-shrink-0">
                    {getResultIcon(item.type)}
                  </div>
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-sans font-bold tracking-wider text-gold-400">
                        {item.type}
                      </span>
                      <h4 className="font-serif text-sm font-bold text-ivory group-hover:text-gold-300 transition-colors truncate">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-parchment/60 font-sans line-clamp-1 mt-0.5">
                      {item.subtitle}
                    </p>
                    {item.matchSnippet && (
                      <p className="text-[11px] text-parchment/40 italic font-cormorant line-clamp-1 mt-1">
                        "{item.matchSnippet}"
                      </p>
                    )}
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-parchment/40 group-hover:text-gold-300 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
