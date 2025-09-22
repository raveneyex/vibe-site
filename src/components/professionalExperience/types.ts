export type TimelineProject = {
  name: string;
  client?: string;
  clientUrl?: string;
  role?: string;
  start?: string;
  end?: string | null;
  notes?: string;
  responsibilities?: string[];
  technologies?: string[];
};

export type TimelineExperience = {
  company: string;
  location?: string;
  title: string;
  start: string;
  end?: string | null;
  responsibilities?: string[];
  technologies?: string[];
  team?: string;
  project?: string;
  client?: string;
  clientUrl?: string;
  projects?: TimelineProject[];
};

export type ExperienceVisibilityMap = Record<string, boolean>;
