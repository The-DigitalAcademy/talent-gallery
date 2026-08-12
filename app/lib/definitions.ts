export type UUID = string;
export type Timestamptz = string;

export interface Talent {
  id: UUID;
  fullname: string;
  bio: string;
  location_id: UUID;
  program_id: UUID;
  cohort_id: UUID;
  talent_status_id: UUID;
  profile_image_url: string | null;
  portfolio_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  youtube_url: string | null;
  is_published: boolean;
  created_at: Timestamptz;
}

export interface Location {
  id: UUID;
  city: string;
  country: string;
  created_at: Timestamptz;
}

export interface Program {
  id: UUID;
  name: string;
  created_at: Timestamptz;
}

export interface Role {
  id: UUID;
  name: string;
  created_at: Timestamptz;
}

export interface Cohort {
  id: UUID;
  name: string;
  slug: string;
  created_at: Timestamptz;
}

export interface TalentStatus {
  id: UUID;
  name: string;
  description: string;
  created_at: Timestamptz;
}

export interface Endorsement {
  id: UUID;
  endorser_name: string;
  message: string;
  talent_id: UUID;
  created_at: Timestamptz;
}

export interface Capability {
  id: UUID;
  name: string;
  created_at: Timestamptz;
}

export interface Project {
  id: UUID;
  name: string;
  description: string;
  created_at: Timestamptz;
  talent_id: UUID;
}

export interface TalentCapability {
  talent_id: UUID;
  capability_id: UUID;
  created_at: Timestamptz;
}

export interface TalentProject {
  id: UUID;
  talent_id: UUID;
  project_id: UUID;
  created_at: Timestamptz;
}

export interface ProjectCapability {
  id: UUID;
  project_id: UUID;
  capability_id: UUID;
  created_at: Timestamptz;
}

export interface WorkExperience {
  id: UUID;
  talent_id: UUID;
  company: string;
  role: string;
  duration: string;
  description: string
  created_at: Timestamptz;
}

export type FormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  fields?: Record<string, any>;
}