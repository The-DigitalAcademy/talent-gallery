import { Education } from "../lib/definitions";

export interface NamedEntity {
  name: string;
}
export interface Role {
  id: string;
  name: string;
}

export interface Talent {
  id: string;
  fullname: string;
  bio: string | null;
  slug: string;
  profile_image_url: string | null;
  role: string | null
  location: string | null;
  cohort: NamedEntity | null;
  program: NamedEntity | null;
  talent_status: NamedEntity | null;
  capabilities: string[];
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string | null;
};

export interface Project {
  id: string;
  name: string;
  description: string | null;
  project_url: string
};

export interface Endorsement {
  id: string;
  endorser_name: string;
  message: string;
};

export interface TalentProfileInterface {
  id: string;
  fullname: string;
  bio: string | null;
  profile_image_url: string | null;
  youtube_url: string | null;
  github_url: string | null;
  portfolio_url: string | null;
  linkedin_url: string | null;
  slug: string;
  is_published: boolean;
  created_at: string;
  capabilities_summary: string;
  location: string | null;
  program_id: string;
  cohort_id: string;
  talent_status_id: string;
  cohort: NamedEntity | null;
  program: NamedEntity | null;
  talent_status: NamedEntity | null;

  capabilities: string[];
  education: Education[];
  work_experiences: WorkExperience[];
  projects: Project[];
  endorsements: Endorsement[];
  role?: string | null;
};

export interface ConfirmedTalentSchema {
  id: string;
  fullname: string;
  bio: string | null;
  profile_image_url: string | null;
  slug: string;
  location: string | null;
  cohort: { name: string } | null;
  program: { name: string } | null;
  talent_status: { name: string } | null;
  capabilities: string[];
}
