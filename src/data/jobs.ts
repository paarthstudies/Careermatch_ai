import type { JobItem } from '../types';

export const SAMPLE_JOBS: JobItem[] = [
  {
    id: 'job-1',
    role: 'Software Engineer',
    company: 'GreenTech Cloud Systems',
    logo: '🌿',
    location: 'San Francisco, CA (Hybrid)',
    salary: '$120,000 - $145,000',
    matchScore: 94,
    skillsReq: ['React', 'TypeScript', 'Node.js', 'System Design'],
    atsScore: 92,
    difficulty: 'Mid-Level'
  },
  {
    id: 'job-2',
    role: 'AI/ML Intern',
    company: 'EcoMind AI Labs',
    logo: '🌱',
    location: 'New York, NY (Remote)',
    salary: '$45 - $60 / hr',
    matchScore: 89,
    skillsReq: ['Python', 'PyTorch', 'Scikit-learn', 'NLP'],
    atsScore: 88,
    difficulty: 'Entry / Junior'
  },
  {
    id: 'job-3',
    role: 'Data Analyst',
    company: 'Verde Metrics Global',
    logo: '📊',
    location: 'Chicago, IL (Onsite)',
    salary: '$85,000 - $105,000',
    matchScore: 82,
    skillsReq: ['SQL', 'Tableau', 'Python', 'A/B Testing'],
    atsScore: 85,
    difficulty: 'Entry / Junior'
  },
  {
    id: 'job-4',
    role: 'Backend Developer',
    company: 'LeafScale Networks',
    logo: '🍃',
    location: 'Austin, TX (Hybrid)',
    salary: '$130,000 - $160,000',
    matchScore: 78,
    skillsReq: ['Go', 'PostgreSQL', 'Docker', 'Kubernetes'],
    atsScore: 76,
    difficulty: 'Senior / Hard'
  }
];
