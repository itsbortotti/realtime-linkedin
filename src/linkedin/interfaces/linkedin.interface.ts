export interface TechValidation {
  isQualified: boolean;
  matchedSkills: string[];
  score: number;
}

export interface ProfileDetails {
  skills: string[];
  experience: any[];
  education: any[];
  location: string;
  currentPosition: string;
  languages: string[];
  validation?: TechValidation;
}

export interface Profile {
  profileId: string;
  name: string;
  detailedInfo?: ProfileDetails;
  headline?: string;
  summary?: string;
  profilePicture?: string;
  profileURL?: string;
}

export class LinkedinResponse {
  message: string;
  total: number;
  data: Profile[];
  error?: string;
  details?: any;

  constructor(partial: Partial<LinkedinResponse>) {
    Object.assign(this, partial);
  }
}
