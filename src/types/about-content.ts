
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export interface ValueItem {
  title: string;
  description: string;
  color: string;
}

export interface HeroSectionContent {
  title: string;
  subtitle: string;
}

export interface StorySectionContent {
  title: string;
  content: string;
}

export interface TeamSectionContent {
  title: string;
  members: TeamMember[];
}

export interface ValuesSectionContent {
  title: string;
  values: ValueItem[];
}

export interface ExperienceSectionContent {
  title: string;
  content: string;
}

export interface AboutContent {
  hero: HeroSectionContent;
  story: StorySectionContent;
  team: TeamSectionContent;
  values: ValuesSectionContent;
  experience: ExperienceSectionContent;
}

export type SectionKey = 'hero' | 'story' | 'team' | 'values' | 'experience';
