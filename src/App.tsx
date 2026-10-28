import React, { useState, useEffect } from 'react';
import {
  rawLore,
  getAllEnrichedStories,
  getAllEnrichedHeroes,
  getFactions,
  getTimelineEvents,
  getReadingPath,
  getRelationshipsForHero,
  getSources,
  getMetadata
} from './data/loreAdapter';
import { EnrichedStory, EnrichedHero } from './types/lore';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { HeroBillboard } from './components/HeroBillboard';
import { StoryRow } from './components/StoryRow';
import { ReadingPathSection } from './components/ReadingPathSection';
import { HeroCodex } from './components/HeroCodex';
import { FactionExplorer } from './components/FactionExplorer';
import { TimelineVisualizer } from './components/TimelineVisualizer';
import { ReaderModal } from './components/ReaderModal';
import { HeroModal } from './components/HeroModal';
import { SearchModal } from './components/SearchModal';
import { SourcesModal } from './components/SourcesModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [stories] = useState<EnrichedStory[]>(() => getAllEnrichedStories());
  const [heroes] = useState<EnrichedHero[]>(() => getAllEnrichedHeroes());
  const [factions] = useState(() => getFactions());
  const [timelineEvents] = useState(() => getTimelineEvents());
  const [readingPath] = useState(() => getReadingPath());
  const [sources] = useState(() => getSources());
  const [metadata] = useState(() => getMetadata());

  // Interactive UI state
  const [activeStory, setActiveStory] = useState<EnrichedStory | null>(null);
  const [activeHero, setActiveHero] = useState<EnrichedHero | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSourcesOpen, setIsSourcesOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('stories');

  // Bookmarks with local storage persistence
  const [bookmarkedStoryIds, setBookmarkedStoryIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mlbb_lore_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleBookmark = (storyId: string) => {
    setBookmarkedStoryIds((prev) => {
      const next = prev.includes(storyId)
        ? prev.filter((id) => id !== storyId)
        : [...prev, storyId];
      try {
        localStorage.setItem('mlbb_lore_bookmarks', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const isBookmarked = (storyId: string) => bookmarkedStoryIds.includes(storyId);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNextStory = () => {
    if (!activeStory) return;
    const currentIndex = stories.findIndex((s) => s.story_id === activeStory.story_id);
    if (currentIndex >= 0 && currentIndex < stories.length - 1) {
      setActiveStory(stories[currentIndex + 1]);
    }
  };

  const handleSelectStoryById = (storyId: string) => {
    const s = stories.find((item) => item.story_id === storyId);
    if (s) setActiveStory(s);
  };

  const handleSelectHeroById = (heroId: string) => {
    const h = heroes.find((item) => item.hero_id === heroId);
    if (h) setActiveHero(h);
  };

  return (
    <div className="min-h-screen bg-void text-ivory flex flex-col font-sans selection:bg-gold-500/30 selection:text-gold-300 pb-16 md:pb-0">
      {/* Top Fixed Navbar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSources={() => setIsSourcesOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        bookmarkedStoryIds={bookmarkedStoryIds}
        onOpenBookmarks={() => handleNavigate('stories')}
      />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Hero Billboard (Netflix / Cinematic Style) */}
      <div id="hero">
        <HeroBillboard
          stories={stories}
          onReadStory={(story) => setActiveStory(story)}
          onSelectHero={(hero) => setActiveHero(hero)}
          isBookmarked={isBookmarked}
          onToggleBookmark={toggleBookmark}
        />
      </div>

      {/* Main Story Showcase */}
      <StoryRow
        title="The Sovereign Canon: The Moniyan Saga"
        subtitle="Five interconnected tales of royal abduction, imperial treason, blood covenants, and the siege of the sanctuary."
        stories={stories}
        onReadStory={(story) => setActiveStory(story)}
        onSelectHero={(hero) => setActiveHero(hero)}
        isBookmarked={isBookmarked}
        onToggleBookmark={toggleBookmark}
      />

      {/* Official Reading Path Progression */}
      <ReadingPathSection
        readingPath={readingPath}
        stories={stories}
        onReadStory={(story) => setActiveStory(story)}
      />

      {/* Characters of Dawn Codex */}
      <HeroCodex
        heroes={heroes}
        onSelectHero={(hero) => setActiveHero(hero)}
      />

      {/* Factions of the Continent */}
      <FactionExplorer
        factions={factions}
        heroes={heroes}
        stories={stories}
        onSelectHero={(hero) => setActiveHero(hero)}
        onReadStory={(story) => setActiveStory(story)}
      />

      {/* Chronological Timeline */}
      <TimelineVisualizer
        events={timelineEvents}
        heroes={heroes}
        stories={stories}
        onSelectHero={(hero) => setActiveHero(hero)}
        onReadStory={(story) => setActiveStory(story)}
      />

      {/* Footer */}
      <Footer
        metadata={metadata}
        onOpenSources={() => setIsSourcesOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Fullscreen Reader Modal */}
      <ReaderModal
        story={activeStory}
        onClose={() => setActiveStory(null)}
        isBookmarked={activeStory ? isBookmarked(activeStory.story_id) : false}
        onToggleBookmark={toggleBookmark}
        allHeroes={heroes}
        onSelectHero={(hero) => setActiveHero(hero)}
        sources={sources}
        onNextStory={handleNextStory}
      />

      {/* Hero Details Codex Modal */}
      <HeroModal
        hero={activeHero}
        onClose={() => setActiveHero(null)}
        relationships={activeHero ? getRelationshipsForHero(activeHero.hero_id) : []}
        allHeroes={heroes}
        onSelectHero={(hero) => setActiveHero(hero)}
        stories={stories}
        onReadStory={(story) => setActiveStory(story)}
      />

      {/* Global Command / Search Palette */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectStory={handleSelectStoryById}
        onSelectHero={handleSelectHeroById}
      />

      {/* Sources & Canon Annals Modal */}
      <SourcesModal
        isOpen={isSourcesOpen}
        onClose={() => setIsSourcesOpen(false)}
        metadata={metadata}
        sources={sources}
        researchGaps={rawLore.research_gaps || []}
      />
    </div>
  );
};
