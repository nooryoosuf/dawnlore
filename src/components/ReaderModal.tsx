import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Type,
  ZoomIn,
  ZoomOut,
  List,
  Sparkles,
  Scroll,
  Shield,
  Clock,
  ArrowRight
} from 'lucide-react';
import { EnrichedStory, Chapter, EnrichedHero, Source } from '../types/lore';

interface ReaderModalProps {
  story: EnrichedStory | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (storyId: string) => void;
  allHeroes: EnrichedHero[];
  onSelectHero: (hero: EnrichedHero) => void;
  sources: Source[];
  onNextStory?: () => void;
}

export const ReaderModal: React.FC<ReaderModalProps> = ({
  story,
  onClose,
  isBookmarked,
  onToggleBookmark,
  allHeroes,
  onSelectHero,
  sources,
  onNextStory
}) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans'>('serif');
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(1); // 0 = sm, 1 = md, 2 = lg, 3 = xl
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveChapterIndex(0);
  }, [story?.story_id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && activeChapterIndex < (story?.chapters.length || 1) - 1) {
        setActiveChapterIndex((prev) => prev + 1);
        contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }
      if (e.key === 'ArrowLeft' && activeChapterIndex > 0) {
        setActiveChapterIndex((prev) => prev - 1);
        contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, activeChapterIndex, story?.chapters.length]);

  if (!story) return null;

  const currentChapter: Chapter | undefined = story.chapters[activeChapterIndex];

  // Heroes in this chapter
  const chapterHeroes = allHeroes.filter((h) =>
    currentChapter?.related_hero_ids.includes(h.hero_id)
  );

  // Sources for this chapter
  const chapterSources = sources.filter((s) =>
    currentChapter?.source_ids.includes(s.source_id)
  );

  const fontSizes = [
    'text-base leading-relaxed',
    'text-lg leading-relaxed',
    'text-xl leading-loose',
    'text-2xl leading-loose'
  ];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const progress = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
    setReadingProgress(Math.min(100, Math.max(0, progress)));
  };

  const nextChapter = () => {
    if (activeChapterIndex < story.chapters.length - 1) {
      setActiveChapterIndex((prev) => prev + 1);
      contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevChapter = () => {
    if (activeChapterIndex > 0) {
      setActiveChapterIndex((prev) => prev - 1);
      contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-void text-ivory flex flex-col overflow-hidden animate-fade-in">
      {/* Top Reading Navigation Bar */}
      <header className="relative z-20 h-16 bg-night/95 backdrop-blur-md border-b border-gold-500/20 px-4 sm:px-6 flex items-center justify-between">
        {/* Story title & Chapter indicator */}
        <div className="flex items-center gap-3 overflow-hidden">
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-card border border-white/10 hover:border-gold-400 text-parchment/70 hover:text-ivory transition-all"
            title="Return to library (Esc)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="truncate">
            <h2 className="font-serif text-sm sm:text-base font-bold text-ivory truncate">
              {story.title}
            </h2>
            <p className="text-[11px] font-sans text-parchment/60 truncate">
              Chapter {activeChapterIndex + 1} of {story.chapters.length}:{' '}
              {currentChapter?.title}
            </p>
          </div>
        </div>

        {/* Reader Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Serif / Sans toggle */}
          <button
            onClick={() => setFontFamily((prev) => (prev === 'serif' ? 'sans' : 'serif'))}
            className={`px-2.5 py-1 rounded text-xs font-semibold border transition-all ${
              fontFamily === 'serif'
                ? 'bg-gold-500/20 border-gold-400 text-gold-300 font-cormorant text-sm'
                : 'bg-card border-white/10 text-parchment/70 font-sans'
            }`}
            title="Toggle Serif / Sans font"
          >
            {fontFamily === 'serif' ? 'Serif' : 'Sans'}
          </button>

          {/* Font Size Buttons */}
          <div className="hidden sm:flex items-center gap-1 bg-card border border-white/10 rounded-lg p-0.5">
            <button
              onClick={() => setFontSizeLevel((prev) => Math.max(0, prev - 1))}
              disabled={fontSizeLevel === 0}
              className="p-1 text-parchment/60 hover:text-ivory disabled:opacity-30"
              title="Decrease font size"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono px-1 text-gold-400">
              A{fontSizeLevel === 1 ? '' : fontSizeLevel > 1 ? `+${fontSizeLevel - 1}` : '-1'}
            </span>
            <button
              onClick={() => setFontSizeLevel((prev) => Math.min(fontSizes.length - 1, prev + 1))}
              disabled={fontSizeLevel === fontSizes.length - 1}
              className="p-1 text-parchment/60 hover:text-ivory disabled:opacity-30"
              title="Increase font size"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Table of contents toggle */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 rounded-lg border transition-all ${
              isSidebarOpen
                ? 'bg-gold-500/20 border-gold-400 text-gold-300'
                : 'bg-card border-white/10 text-parchment/70 hover:text-ivory'
            }`}
            title="Toggle Table of Contents"
          >
            <List className="w-4 h-4" />
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => onToggleBookmark(story.story_id)}
            className={`p-2 rounded-lg border transition-all ${
              isBookmarked
                ? 'bg-gold-500/20 border-gold-400 text-gold-300 shadow-glow'
                : 'bg-card border-white/10 text-parchment/70 hover:text-ivory'
            }`}
            title={isBookmarked ? 'Bookmarked' : 'Add bookmark'}
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-4 h-4 text-gold-400" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>

          {/* Close Reader */}
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-card border border-white/10 hover:border-gold-400 text-parchment/70 hover:text-ivory transition-all"
            title="Exit Reader"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reading Progress Indicator Bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-gold-400 to-amber-600 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </header>

      {/* Main Reader Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Table of Contents Drawer (Left) */}
        {isSidebarOpen && (
          <aside className="w-72 sm:w-80 bg-night border-r border-white/10 flex flex-col overflow-y-auto animate-fade-in flex-shrink-0">
            <div className="p-4 border-b border-white/10">
              <span className="text-[10px] uppercase font-serif tracking-widest text-gold-400 font-bold">
                Table of Contents
              </span>
              <h3 className="font-serif text-sm font-bold text-ivory mt-0.5">
                {story.chapters.length} Chapters
              </h3>
            </div>
            <div className="divide-y divide-white/5 flex-1">
              {story.chapters.map((chap, idx) => {
                const isActive = idx === activeChapterIndex;
                return (
                  <button
                    key={chap.chapter_id}
                    onClick={() => {
                      setActiveChapterIndex(idx);
                      contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full text-left p-4 transition-all duration-200 ${
                      isActive
                        ? 'bg-gold-500/15 border-l-4 border-gold-400 text-gold-300'
                        : 'hover:bg-card text-parchment/70 hover:text-ivory'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-wider mb-1 font-sans">
                      <span className={isActive ? 'text-gold-400 font-bold' : 'text-parchment/40'}>
                        Chapter 0{chap.sequence_number}
                      </span>
                      <span className="text-parchment/40">{chap.word_count} words</span>
                    </div>
                    <h5 className="font-serif text-xs sm:text-sm font-bold line-clamp-1">
                      {chap.title}
                    </h5>
                    <p className="text-[11px] font-sans text-parchment/50 line-clamp-2 mt-1">
                      {chap.summary}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Canon Sources footer in TOC */}
            <div className="p-4 border-t border-white/10 bg-void/40">
              <span className="text-[10px] uppercase font-serif tracking-wider text-parchment/40 block mb-1.5 font-bold">
                Archival Reference
              </span>
              <p className="text-[11px] font-sans text-parchment/60 leading-tight">
                Adheres to official Moonton Hero Biographies & Imperial Masteries.
              </p>
            </div>
          </aside>
        )}

        {/* Central Reading Canvas */}
        <main
          ref={contentRef}
          onScroll={handleScroll}
          className="relative flex-1 overflow-y-auto px-4 sm:px-12 lg:px-20 py-10 sm:py-16 scroll-smooth bg-gradient-to-b from-void via-night/40 to-void"
        >
          {/* Ambient Splash Art Header Overlay */}
          <div className="absolute top-0 left-0 right-0 h-96 overflow-hidden pointer-events-none opacity-20">
            <img
              src={story.backdropUrl}
              alt=""
              className="w-full h-full object-cover object-center filter blur-[1px]"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-night/60 via-void/80 to-void" />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
          </div>
          {currentChapter && (
            <article className="max-w-3xl mx-auto space-y-8 animate-fade-in">
              {/* Chapter Header */}
              <div className="text-center space-y-3 pb-8 border-b border-gold-500/20">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif font-semibold uppercase tracking-wider bg-gold-500/10 text-gold-400 border border-gold-500/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  Chapter 0{currentChapter.sequence_number} of {story.chapters.length}
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ivory tracking-tight leading-tight">
                  {currentChapter.title}
                </h1>

                <p className="font-cormorant text-lg sm:text-xl italic text-gold-300/80 max-w-xl mx-auto">
                  "{currentChapter.summary}"
                </p>

                <div className="flex items-center justify-center gap-4 text-xs text-parchment/50 font-sans pt-1">
                  <span>{currentChapter.word_count} Words</span>
                  <span>·</span>
                  <span>~{Math.max(1, Math.ceil(currentChapter.word_count / 200))} min read</span>
                </div>
              </div>

              {/* Chapter Narrative Text */}
              <div
                className={`text-parchment/90 ${fontSizes[fontSizeLevel]} ${
                  fontFamily === 'serif' ? 'font-cormorant' : 'font-sans'
                }`}
              >
                <p className="drop-cap leading-relaxed whitespace-pre-line tracking-normal">
                  {currentChapter.content}
                </p>
              </div>

              {/* End of Chapter Navigation Controls */}
              <div className="pt-10 border-t border-white/10 flex items-center justify-between gap-4">
                <button
                  onClick={prevChapter}
                  disabled={activeChapterIndex === 0}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 hover:border-gold-400/50 text-xs font-serif font-semibold disabled:opacity-20 disabled:pointer-events-none transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Chapter</span>
                </button>

                <div className="text-xs font-serif text-parchment/50">
                  {activeChapterIndex + 1} / {story.chapters.length}
                </div>

                {activeChapterIndex < story.chapters.length - 1 ? (
                  <button
                    onClick={nextChapter}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold-500/20 hover:bg-gold-500/30 border border-gold-400 text-gold-300 text-xs font-serif font-bold transition-all shadow-glow hover:scale-105"
                  >
                    <span>Next Chapter</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="text-xs font-serif text-gold-400 font-bold flex items-center gap-1">
                    <span>Story Completed</span>
                  </div>
                )}
              </div>

              {/* Final Story Conclusion Card (shown on last chapter) */}
              {activeChapterIndex === story.chapters.length - 1 && (
                <div className="mt-12 rounded-xl bg-card border border-gold-500/30 p-6 sm:p-8 space-y-4 shadow-xl">
                  <div className="flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-widest text-gold-400">
                    <Scroll className="w-4 h-4" />
                    <span>Archival Historical Epilogue</span>
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-ivory">
                    Canonical Impact
                  </h4>
                  <p className="font-cormorant italic text-base sm:text-lg text-parchment/90 leading-relaxed">
                    "{story.conclusion}"
                  </p>

                  {/* Next Story Recommendation */}
                  {onNextStory && (
                    <div className="pt-4 border-t border-white/10 flex justify-end">
                      <button
                        onClick={onNextStory}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-gold-400 to-amber-600 text-night font-serif font-bold text-xs hover:scale-105 transition-all shadow-goldGlow"
                      >
                        <span>Continue to Next Story Arc</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Champions Mentioned in this Chapter */}
              {chapterHeroes.length > 0 && (
                <div className="pt-6 border-t border-white/10">
                  <span className="text-xs uppercase font-serif tracking-wider text-parchment/50 font-bold block mb-3">
                    Featured Characters in this Chapter
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {chapterHeroes.map((hero) => (
                      <button
                        key={hero.hero_id}
                        onClick={() => onSelectHero(hero)}
                        className="flex items-center gap-2.5 p-2 pr-3 rounded-full bg-card border border-white/10 hover:border-gold-400/50 text-xs transition-all hover:bg-cardHover"
                      >
                        <img
                          src={hero.avatarUrl}
                          alt={hero.canonical_name}
                          className="w-7 h-7 rounded-full object-cover border border-gold-500/30"
                        />
                        <div className="text-left">
                          <span className="font-bold text-ivory block leading-tight">
                            {hero.canonical_name}
                          </span>
                          <span className="text-[10px] text-parchment/50 font-sans">
                            {hero.badgeLabel}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </article>
          )}
        </main>
      </div>
    </div>
  );
};
