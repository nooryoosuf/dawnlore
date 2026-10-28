import rawData from '../../gemini-code-1793168579969.json';
import {
  RawLoreData,
  Story,
  Chapter,
  Hero,
  Region,
  Faction,
  TimelineEvent,
  Relationship,
  EnrichedHero,
  EnrichedStory,
  ReadingPath,
  Metadata,
  StoryConnection,
  Source
} from '../types/lore';

export const rawLore: RawLoreData = rawData as unknown as RawLoreData;

// High-fidelity image mappings for the 10 heroes
// Sourced directly from Moonton's official GMS CDN asset pipelines
export const HERO_ASSET_MAP: Record<
  string,
  {
    avatarUrl: string;
    splashUrl: string;
    backdropUrl: string;
    classType: string;
    accentColor: string;
    badgeLabel: string;
    quote: string;
  }
> = {
  hero_silvanna: {
    avatarUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_5e7b297af7c6e32a420b897aa4998071.png',
    splashUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_fe98dd2e19bb6c29591763d1d11a3eb7.png',
    backdropUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_1582f0613b6c03e1f4f147a3da23d70a.png',
    classType: 'Fighter / Magic Burst',
    accentColor: '#eab308', // Imperial Gold
    badgeLabel: 'Imperial Princess',
    quote: 'Only by extinguishing the darkness can we restore the dawn.'
  },
  hero_dyrroth: {
    avatarUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_8ec13b59871b2862d773beac2d69fa3e.png',
    splashUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_bf8dcb20923cee2407563e0fe88aa557.png',
    backdropUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_ce1031d6d4e49f33719bd3d833a9b45b.png',
    classType: 'Fighter / Abyssal Striker',
    accentColor: '#ef4444', // Abyssal Crimson
    badgeLabel: 'Prince of the Abyss',
    quote: 'I was born of fire and shadow. The light offers nothing to me.'
  },
  hero_thamuz: {
    avatarUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_b5ad55e408b68acf6a86e7ff76f5f569.png',
    splashUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_3e7e133556af2f5d82f49fa8624b6bd5.png',
    backdropUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_2fc38a2e465b275a72c3308152cab77d.png',
    classType: 'Fighter / Lord of Lava',
    accentColor: '#f97316', // Molten Orange
    badgeLabel: 'Lord Lava',
    quote: 'The weak will burn, and the Land of Dawn will bow before the flames.'
  },
  hero_alice: {
    avatarUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_18300163a5a912a84adb52b8d59b4618.png',
    splashUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_ec3d5c825e893947a235ea9ea59fff77.png',
    backdropUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_34013ffb449baa842122de6126e43259.png',
    classType: 'Mage / Tank',
    accentColor: '#a855f7', // Blood Demon Violet
    badgeLabel: 'Queen of Blood Demons',
    quote: 'Your sweetest desires make you my easiest puppet.'
  },
  hero_alucard: {
    avatarUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_0f51b6906e08897aa02330d65b0deeac.png',
    splashUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_df695a059c0f0a63fe922786098089cd.png',
    backdropUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_3c0135f79624621b63ff686f540b2a78.png',
    classType: 'Fighter / Demon Hunter',
    accentColor: '#3b82f6', // Azure Steel
    badgeLabel: 'Demon Hunter',
    quote: 'Demons shall pay with blood for the lies they sowed.'
  },
  hero_tigreal: {
    avatarUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_8b30576754be1a4f8bebd09df8d6bec7.png',
    splashUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_4e0005dbfb1376beaccc54ef7aa39375.png',
    backdropUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_2f346943d85318a466b5eba513682d7c.png',
    classType: 'Tank / Vanguard',
    accentColor: '#60a5fa', // Lightborn Blue
    badgeLabel: 'Shield of the Empire',
    quote: 'A knight stands firm so that others may live without fear.'
  },
  hero_terizla: {
    avatarUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_c4bb270c28c7be663f57e993b0d6d3d8.png',
    splashUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_fcfbde52476bad8c8e67951240de854c.png',
    backdropUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_7fe813b1c6b84e6fb234d0428c0c7cd7.png',
    classType: 'Fighter / Heavy Juggernaut',
    accentColor: '#b91c1c', // Blood Iron
    badgeLabel: 'The Executioner',
    quote: 'Ten years of torment... every blow from my hammer shall be repaid.'
  },
  hero_julian: {
    avatarUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_5511ddc0ad2789b525f32ef572b017eb.png',
    splashUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_44891c699fb1c00fc4a7fa59ea95b8b3.png',
    backdropUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_af290850533bcaeaf7630d573969a74c.png',
    classType: 'Fighter / Mage',
    accentColor: '#38bdf8', // Raven Sky
    badgeLabel: 'The Forsaken Light',
    quote: 'I follow the light that is real, not the words of kings.'
  },
  hero_carmilla: {
    avatarUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_6fb8f120dafdcbc1b5da2a2667016ad5.png',
    splashUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_358d6ad9cff97fc3bfef8a2bd4acbadd.png',
    backdropUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_429bbf3c9f1b16aa45bdfdeac80761e5.png',
    classType: 'Support / Tank',
    accentColor: '#f43f5e', // Crimson Rose
    badgeLabel: 'Shadow of Aberleen',
    quote: 'If loving you means embracing the night, I would die a thousand times.'
  },
  hero_cecilion: {
    avatarUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_045399c265021d47da6512e6de20b64f.png',
    splashUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_af02ce891528cd3576858589d8d33d8d.png',
    backdropUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_c0bb649180f1f1bfd0ba81b78ee35844.png',
    classType: 'Mage / Late-Game Burst',
    accentColor: '#c084fc', // Opera Twilight
    badgeLabel: 'Embrace of Night',
    quote: 'The curtain rises on eternity. Our love will outlive the world.'
  }
};

// Story aesthetic themes and cinematic backdrops
export const STORY_THEMES: Record<
  string,
  {
    themeGradient: string;
    coverArt: string;
    backdropUrl: string;
    badge: string;
    era: string;
  }
> = {
  story_moniyan_001: {
    themeGradient: 'from-amber-950/60 via-red-950/40 to-night',
    coverArt: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_bf8dcb20923cee2407563e0fe88aa557.png',
    backdropUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_ce1031d6d4e49f33719bd3d833a9b45b.png',
    badge: 'Royal Tragedy Arc',
    era: 'Imperial Calendar Year 20'
  },
  story_moniyan_002: {
    themeGradient: 'from-blue-950/60 via-amber-950/40 to-night',
    coverArt: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_fe98dd2e19bb6c29591763d1d11a3eb7.png',
    backdropUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_1582f0613b6c03e1f4f147a3da23d70a.png',
    badge: 'Epic Climax',
    era: 'Siege of the Sanctuary'
  },
  story_alucard_001: {
    themeGradient: 'from-slate-900/80 via-blue-950/40 to-night',
    coverArt: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_df695a059c0f0a63fe922786098089cd.png',
    backdropUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_3c0135f79624621b63ff686f540b2a78.png',
    badge: 'Vengeance Chronicles',
    era: 'Post-Monastery Purge'
  },
  story_terizla_001: {
    themeGradient: 'from-red-950/70 via-stone-900/60 to-night',
    coverArt: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_fcfbde52476bad8c8e67951240de854c.png',
    backdropUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_7fe813b1c6b84e6fb234d0428c0c7cd7.png',
    badge: 'Dark Inquisition Arc',
    era: 'Subterranean Imperial Inquisition'
  },
  story_carmilla_001: {
    themeGradient: 'from-purple-950/70 via-rose-950/50 to-night',
    coverArt: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_358d6ad9cff97fc3bfef8a2bd4acbadd.png',
    backdropUrl: 'https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_429bbf3c9f1b16aa45bdfdeac80761e5.png',
    badge: 'Gothic Romance Arc',
    era: 'Aberleen Blood Moon'
  }
};

// Region badges & thematic metadata
export const REGION_META: Record<string, { banner: string; iconSymbol: string; borderAccent: string }> = {
  region_moniyan_empire: {
    banner: 'Imperial Citadels of Light & Aurelius Dynasty',
    iconSymbol: 'Crown',
    borderAccent: 'border-blue-500/30'
  },
  region_abyss: {
    banner: 'Volcanic Fissures & Subterranean Demon Realms',
    iconSymbol: 'Flame',
    borderAccent: 'border-red-500/30'
  },
  region_monastery_of_light: {
    banner: 'Holy Sanctuary of Monastic Templars & Sacred Oaths',
    iconSymbol: 'Shield',
    borderAccent: 'border-amber-500/30'
  },
  region_castle_aberleen: {
    banner: 'Mist-Veiled Gothic Enclave of the Southern Marches',
    iconSymbol: 'Moon',
    borderAccent: 'border-purple-500/30'
  }
};

// Adapter functions
export function getHeroEnriched(hero: Hero): EnrichedHero {
  const assets = HERO_ASSET_MAP[hero.hero_id] || {
    avatarUrl: '',
    splashUrl: '',
    backdropUrl: '',
    classType: 'Hero of Dawn',
    accentColor: '#c5a059',
    badgeLabel: 'Legend',
    quote: ''
  };

  const faction = rawLore.factions.find((f) => f.faction_id === hero.faction_id);
  const region = rawLore.regions.find((r) => r.region_id === hero.region_id);

  return {
    ...hero,
    ...assets,
    factionName: faction ? faction.canonical_name : 'Independent',
    regionName: region ? region.canonical_name : 'Land of Dawn'
  };
}

export function getAllEnrichedHeroes(): EnrichedHero[] {
  return rawLore.heroes.map(getHeroEnriched);
}

export function getStoryEnriched(story: Story): EnrichedStory {
  const chapters = rawLore.chapters
    .filter((c) => c.story_id === story.story_id)
    .sort((a, b) => a.sequence_number - b.sequence_number);

  const heroes = rawLore.heroes
    .filter((h) => story.related_hero_ids.includes(h.hero_id))
    .map(getHeroEnriched);

  const theme = STORY_THEMES[story.story_id] || {
    themeGradient: 'from-slate-900 via-night to-night',
    coverArt: '',
    badge: 'Canon Lore',
    era: 'Imperial Record'
  };

  // Estimate read time based on ~200 wpm
  const estimatedMinutes = Math.max(1, Math.ceil(story.word_count / 200));

  return {
    ...story,
    chapters,
    heroes,
    ...theme,
    estimatedMinutes
  };
}

export function getAllEnrichedStories(): EnrichedStory[] {
  return rawLore.stories
    .map(getStoryEnriched)
    .sort((a, b) => a.recommended_reading_order - b.recommended_reading_order);
}

export function getStoryById(storyId: string): EnrichedStory | undefined {
  const story = rawLore.stories.find((s) => s.story_id === storyId);
  return story ? getStoryEnriched(story) : undefined;
}

export function getHeroById(heroId: string): EnrichedHero | undefined {
  const hero = rawLore.heroes.find((h) => h.hero_id === heroId);
  return hero ? getHeroEnriched(hero) : undefined;
}

export function getRelationshipsForHero(heroId: string): Relationship[] {
  return rawLore.relationships.filter(
    (rel) => rel.source_entity === heroId || rel.target_entity === heroId
  );
}

export function getTimelineEvents(): TimelineEvent[] {
  return rawLore.timeline;
}

export function getFactions(): Faction[] {
  return rawLore.factions;
}

export function getRegions(): Region[] {
  return rawLore.regions;
}

export function getReadingPath(): ReadingPath | undefined {
  return rawLore.reading_paths[0];
}

export function getStoryConnections(): StoryConnection[] {
  return rawLore.story_connections;
}

export function getSources(): Source[] {
  return rawLore.sources;
}

export function getMetadata(): Metadata {
  return rawLore.metadata;
}

// Global search across all lore data
export interface SearchResult {
  type: 'story' | 'chapter' | 'hero' | 'event' | 'faction' | 'region';
  id: string;
  title: string;
  subtitle: string;
  matchSnippet?: string;
  linkAction?: string;
  storyId?: string;
}

export function searchArchive(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];

  // Stories
  rawLore.stories.forEach((story) => {
    if (
      story.title.toLowerCase().includes(q) ||
      story.subtitle.toLowerCase().includes(q) ||
      story.introduction.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'story',
        id: story.story_id,
        title: story.title,
        subtitle: story.subtitle,
        matchSnippet: story.introduction.slice(0, 110) + '...'
      });
    }
  });

  // Chapters
  rawLore.chapters.forEach((chap) => {
    if (
      chap.title.toLowerCase().includes(q) ||
      chap.summary.toLowerCase().includes(q) ||
      chap.content.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'chapter',
        id: chap.chapter_id,
        title: chap.title,
        subtitle: `Chapter ${chap.sequence_number} · ${chap.summary}`,
        matchSnippet: chap.content.slice(0, 110) + '...',
        storyId: chap.story_id
      });
    }
  });

  // Heroes
  rawLore.heroes.forEach((hero) => {
    if (
      hero.canonical_name.toLowerCase().includes(q) ||
      hero.aliases.some((a) => a.toLowerCase().includes(q)) ||
      hero.documented_role.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'hero',
        id: hero.hero_id,
        title: hero.canonical_name,
        subtitle: hero.aliases.join(' · '),
        matchSnippet: hero.documented_role
      });
    }
  });

  // Timeline events
  rawLore.timeline.forEach((event) => {
    if (
      event.title.toLowerCase().includes(q) ||
      event.description.toLowerCase().includes(q) ||
      event.approximate_period.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'event',
        id: event.event_id,
        title: event.title,
        subtitle: event.approximate_period,
        matchSnippet: event.description
      });
    }
  });

  // Factions
  rawLore.factions.forEach((faction) => {
    if (
      faction.canonical_name.toLowerCase().includes(q) ||
      faction.purpose.toLowerCase().includes(q)
    ) {
      results.push({
        type: 'faction',
        id: faction.faction_id,
        title: faction.canonical_name,
        subtitle: 'Faction / Allegiance',
        matchSnippet: faction.purpose
      });
    }
  });

  return results;
}
