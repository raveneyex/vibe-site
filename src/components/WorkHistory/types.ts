type TimelineHighlights = {
  responsibilities?: string[];
  technologies?: string[];
};

export type TimelineProject = TimelineHighlights & {
  name: string;
  client?: string;
  clientUrl?: string;
  role?: string;
  start?: string;
  end?: string | null;
  notes?: string;
};

export type TimelineExperience = TimelineHighlights & {
  company: string;
  location?: string;
  title: string;
  start: string;
  end?: string | null;
  team?: string;
  project?: string;
  projects?: TimelineProject[];
};

export type ExperienceVisibilityMap = Record<string, boolean>;
