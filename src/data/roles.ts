import type { RoleOption } from '../types';

export const TARGET_ROLES: RoleOption[] = [
  { id: 'swe', name: 'Software Engineer', dept: 'Engineering', icon: '💻', keySkills: ['Data Structures', 'System Design', 'React', 'Algorithms'] },
  { id: 'aiml', name: 'AI/ML Intern', dept: 'AI Research', icon: '🤖', keySkills: ['Python', 'PyTorch', 'Model Tuning', 'Math/Linear Algebra'] },
  { id: 'da', name: 'Data Analyst', dept: 'Analytics', icon: '📊', keySkills: ['SQL Querying', 'Tableau', 'Statistics', 'A/B Testing'] },
  { id: 'be', name: 'Backend Developer', dept: 'Cloud & Infrastructure', icon: '⚙️', keySkills: ['Node.js/Python', 'PostgreSQL', 'REST API Design', 'Redis'] },
  { id: 'ba', name: 'Business Analyst', dept: 'Strategy & Ops', icon: '📈', keySkills: ['Requirement Gathering', 'Process Mapping', 'Financial Modeling', 'Agile'] }
];
