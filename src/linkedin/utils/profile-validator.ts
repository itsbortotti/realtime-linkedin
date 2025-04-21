import { TechValidation } from '../interfaces/linkedin.interface';

export class ProfileValidator {
  private static readonly targetSkills = [
    // Frontend
    'javascript', 'typescript', 'react', 'next.js', 'vue', 'angular',
    // Backend
    'node.js', 'express', 'nestjs', 'python', 'django', 'java', 'spring',
    // Database
    'mongodb', 'postgresql', 'mysql', 'redis',
    // DevOps
    'docker', 'kubernetes', 'aws', 'azure', 'ci/cd',
    // Testing
    'jest', 'cypress', 'selenium',
    // Other
    'git', 'rest api', 'graphql', 'microservices'
  ];

  static validateProfile(profile: any): TechValidation {
    const profileText = [
      profile.headline,
      profile.summary,
      ...(profile.skills || [])
    ].join(' ').toLowerCase();

    const matchedSkills = this.targetSkills.filter(skill => 
      profileText.includes(skill.toLowerCase())
    );

    const score = (matchedSkills.length / this.targetSkills.length) * 100;
    
    return {
      isQualified: matchedSkills.length >= 5,
      matchedSkills,
      score: Math.round(score)
    };
  }
}