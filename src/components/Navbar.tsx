import React, { useState, useEffect } from 'react';
import { Search, Volume2, VolumeX, BookOpen, Sparkles, Menu, X, Shield, Scroll } from 'lucide-react';
import { ambientSound } from '../utils/audioAmbience';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenSources: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  bookmarkedStoryIds: string[];
  onOpenBookmarks: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenSources,
  activeSection,
  onNavigate,
  bookmarkedStoryIds,
  onOpenBookmarks
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const newState = ambientSound.toggle();
    setIsAudioActive(newState);
  };

  const navLinks = [
    { id: 'stories', label: 'Stories' },
    { id: 'path', label: 'Reading Path' },
    { id: 'heroes', label: 'Heroes' },
    { id: 'factions', label: 'Factions' },
    { id: 'timeline', label: 'Timeline' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-void/90 backdrop-blur-md border-b border-gold-500/20 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-void/95 via-void/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <div
          onClick={() => {
            onNavigate('hero');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 via-gold-600 to-amber-900 p-[1.5px] shadow-glow transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full rounded-full bg-void flex items-center justify-center">
              <Shield className="w-5 h-5 text-gold-400 transition-colors group-hover:text-gold-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-extrabold tracking-wider text-base sm:text-lg text-gold-gradient uppercase">
              Land of Dawn
            </span>
            <span className="text-[10px] uppercase tracking-widest text-parchment/60 font-sans -mt-1">
              Imperial Lore Archive
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`text-sm font-medium tracking-wide transition-all relative py-1 ${
                activeSection === link.id
                  ? 'text-gold-300'
                  : 'text-parchment/70 hover:text-ivory'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-400 to-amber-600 rounded-full" />
              )}
            </button>
          ))}
          <button
            onClick={onOpenSources}
            className="text-xs uppercase tracking-wider text-parchment/50 hover:text-gold-400 transition-colors flex items-center gap-1 border border-white/10 hover:border-gold-500/40 px-2.5 py-1 rounded"
          >
            <Scroll className="w-3 h-3 text-gold-400" />
            Canon Annals
          </button>
        </nav>

        {/* Right utility buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Ambience Toggle */}
          <button
            onClick={toggleSound}
            title={isAudioActive ? 'Mute cinematic ambient audio' : 'Play cinematic ambient audio'}
            className={`p-2 rounded-full border transition-all duration-300 ${
              isAudioActive
                ? 'bg-gold-500/20 border-gold-400 text-gold-300 shadow-glow'
                : 'bg-card/50 border-white/10 text-parchment/60 hover:text-ivory hover:border-white/20'
            }`}
          >
            {isAudioActive ? (
              <span className="flex items-center gap-1.5 px-1">
                <Volume2 className="w-4 h-4 animate-pulse text-gold-400" />
                <span className="hidden sm:inline text-[11px] font-sans font-medium text-gold-300">
                  Audio ON
                </span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-1">
                <VolumeX className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px] font-sans font-medium text-parchment/60">
                  Ambience
                </span>
              </span>
            )}
          </button>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 bg-card/70 hover:bg-cardHover border border-white/10 hover:border-gold-500/40 text-parchment/70 hover:text-ivory px-3 py-1.5 rounded-full text-xs transition-all shadow-sm"
          >
            <Search className="w-3.5 h-3.5 text-gold-400" />
            <span className="hidden sm:inline">Search lore...</span>
            <kbd className="hidden md:inline-block bg-white/5 text-[10px] text-parchment/50 px-1.5 py-0.5 rounded border border-white/10">
              Ctrl+K
            </kbd>
          </button>

          {/* Bookmarks Pill */}
          {bookmarkedStoryIds.length > 0 && (
            <button
              onClick={onOpenBookmarks}
              title="View bookmarked stories"
              className="flex items-center gap-1.5 bg-gold-500/10 border border-gold-500/30 text-gold-300 px-2.5 py-1.5 rounded-full text-xs hover:bg-gold-500/20 transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{bookmarkedStoryIds.length}</span>
            </button>
          )}

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-card/60 border border-white/10 text-parchment/80 hover:text-ivory"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-void/98 border-b border-gold-500/20 px-4 pt-4 pb-6 space-y-3 animate-fade-in">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 px-3 rounded text-sm font-medium ${
                activeSection === link.id
                  ? 'bg-gold-500/15 text-gold-300 border-l-2 border-gold-400'
                  : 'text-parchment/80 hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenSources();
                setIsMobileMenuOpen(false);
              }}
              className="text-xs text-gold-400 flex items-center gap-1.5 py-2"
            >
              <Scroll className="w-4 h-4" />
              Imperial Canon & Sources
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
