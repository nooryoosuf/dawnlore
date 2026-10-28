export interface Metadata {
  project_title: string;
  schema_version: string;
  research_date: string;
  canon_policy: string;
  research_notes: string;
}

export interface Story {
  story_id: string;
  title: string;
  subtitle: string;
  url_slug: string;
  story_type: string;
  recommended_reading_order: number;
  introduction: string;
  word_count: number;
  related_hero_ids: string[];
  related_region_ids: string[];
  related_faction_ids: string[];
  source_ids: string[];
  conclusion: string;
}

export interface Chapter {
  chapter_id: string;
  story_id: string;
  sequence_number: number;
  title: string;
  summary: string;
  content: string;
  word_count: number;
  related_hero_ids: string[];
  related_event_ids: string[];
  media_id: string | null;
  source_ids: string[];
}

export interface TimelineEvent {
  event_id: string;
  title: string;
  description: string;
  approximate_period: string;
  chronology_type: string;
  confidence: string;
  story_ids: string[];
  chapter_ids: string[];
  hero_ids: string[];
  region_ids: string[];
  faction_ids: string[];
  source_ids: string[];
  connection_to_adjacent: string;
}

export interface Hero {
  hero_id: string;
  canonical_name: string;
  aliases: string[];
  documented_role: string;
  region_id: string;
  faction_id: string;
  story_references: string[];
}

export interface Region {
  region_id: string;
  canonical_name: string;
  description: string;
  related_story_ids: string[];
  associated_event_ids: string[];
}

export interface Faction {
  faction_id: string;
  canonical_name: string;
  purpose: string;
  member_hero_ids: string[];
  associated_story_ids: string[];
}

export interface Relationship {
  relationship_id: string;
  source_entity: string;
  target_entity: string;
  relationship_type: string;
  description: string;
  supporting_source_ids: string[];
  canon_status: string;
}

export interface StoryConnection {
  connection_id: string;
  source_story_id: string;
  target_story_id: string;
  connection_type: string;
  description: string;
  connecting_hero_ids: string[];
  connecting_event_ids: string[];
}

export interface Source {
  source_id: string;
  title: string;
  source_type: string;
  url: string | null;
  reliability: string;
}

export interface MediaItem {
  media_id: string;
  intended_use: string;
  related_story_ids: string[];
  related_chapter_ids: string[];
  related_hero_ids: string[];
  related_event_ids: string[];
  original_source_url: string;
  asset_url: string | null;
  source_type: string;
  attribution: string;
  usage_status: string;
  verification_status: string;
  alt_text: string;
  fallback_behavior: string;
}

export interface ReadingPath {
  path_id: string;
  path_name: string;
  description: string;
  recommended_story_sequence: string[];
}

export interface ResearchGap {
  gap_id: string;
  topic: string;
  details: string;
  impact_on_continuity: string;
}

export interface RawLoreData {
  metadata: Metadata;
  stories: Story[];
  chapters: Chapter[];
  timeline: TimelineEvent[];
  heroes: Hero[];
  regions: Region[];
  factions: Faction[];
  relationships: Relationship[];
  story_connections: StoryConnection[];
  sources: Source[];
  media: MediaItem[];
  reading_paths: ReadingPath[];
  research_gaps: ResearchGap[];
}

export interface EnrichedHero extends Hero {
  avatarUrl: string;
  splashUrl: string;
  backdropUrl: string;
  classType: string;
  accentColor: string;
  badgeLabel: string;
  quote?: string;
  factionName: string;
  regionName: string;
}

export interface EnrichedStory extends Story {
  chapters: Chapter[];
  heroes: EnrichedHero[];
  coverArt: string;
  backdropUrl: string;
  estimatedMinutes: number;
  themeGradient: string;
}
