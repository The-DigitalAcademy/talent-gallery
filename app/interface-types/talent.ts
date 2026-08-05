export interface Capability {
  id: string;
  name: string;
}

export interface Location {
  city: string;
  country: string;
}

export interface NamedEntity {
  name: string;
}
<<<<<<< HEAD
export interface Role {
  id: string;
  name: string;
  description: string;
}
=======
>>>>>>> ee648200d815df57b9a64107322068133813df9f

export interface Talent {
  id: string;
  fullname: string;
  bio: string | null;
  slug: string;
  profile_image_url: string | null;
<<<<<<< HEAD
  role: Role | null
=======
>>>>>>> ee648200d815df57b9a64107322068133813df9f

  location: Location | null;
  cohort: NamedEntity | null;
  program: NamedEntity | null;
  talent_status: NamedEntity | null;

  capabilities: Capability[];
}

export interface TalentCapability {
  capability: Capability;
}

export interface ProjectCapability {
  capability: Pick<Capability, "name">;
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
  capabilities: ProjectCapability[];
<<<<<<< HEAD
  project_url: string
=======
>>>>>>> ee648200d815df57b9a64107322068133813df9f
};

export interface Endorsement {
  id: string;
  endorser_name: string;
  message: string;
};

<<<<<<< HEAD
export interface Role {
  name: string;
};

=======
>>>>>>> ee648200d815df57b9a64107322068133813df9f
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
  location_id: string;
  program_id: string;
  cohort_id: string;
  talent_status_id: string;

  location: Location | null;
  cohort: NamedEntity | null;
  program: NamedEntity | null;
  talent_status: NamedEntity | null;

  capabilities: TalentCapability[];
  work_experiences: WorkExperience[];
  projects: Project[];
  endorsements: Endorsement[];
  role: Role;
};

export interface ConfirmedTalentSchema {
  id: string;
  fullname: string;
  bio: string | null;
  profile_image_url: string | null;
  slug: string;
  location: { city: string; country: string } | null;
  cohort: { name: string } | null;
  program: { name: string } | null;
  talent_status: { name: string } | null;
  capabilities: Array<{ capability: { id: string; name: string } }>;
}
