export interface SkillItem {
  name: string;
  icon: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  items: SkillItem[];
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Testimonial {
  name: string;
  role: string;
  image: string;
  text: string;
}

export interface OpenSourceContribution {
  project: string;
  description: string;
  type: string;
  prUrl: string;
  repoUrl: string;
  merged: boolean;
}

export interface PortfolioData {
  name: string;
  title: string;
  roles: string[];
  location: string;
  email: string;
  website: string;
  github: string;
  linkedin: string;
  available: boolean;
  bio: string;
  bio2: string;
  tags: string[];
  stats: Stat[];
  skills: SkillCategory[];
  testimonials: Testimonial[];
  contributions: OpenSourceContribution[];
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  color: string;
}

export interface PortfolioResolvedData {
  portfolio: PortfolioData;
  projects: Project[];
}
