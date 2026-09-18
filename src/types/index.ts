export type TabId = 'dashboard' | 'jobs' | 'match' | 'roadmap' | 'interview';

export type Difficulty = 'Entry / Junior' | 'Mid-Level' | 'Senior / Hard';

export type FocusArea = 'Technical & System Architecture' | 'Behavioral STAR Method' | 'Mixed Balanced Session';

export type RoleOption = {
  id: string;
  name: string;
  dept: string;
  icon: string;
  keySkills: string[];
};

export type TaskItem = {
  id: string;
  label: string;
};

export type RoadmapPhase = {
  phase: string;
  title: string;
  tasks: TaskItem[];
};

export type QuestionItem = {
  id: string;
  question: string;
  category: string;
  hint: string;
  idealAnswerSample: string;
};

export type JobItem = {
  id: string;
  role: string;
  company: string;
  logo: string;
  location: string;
  salary: string;
  matchScore: number;
  skillsReq: string[];
  atsScore: number;
  difficulty: Difficulty;
};

export type Metrics = {
  accuracy: number;
  structure: number;
  relevance: number;
};

export type EvaluationResult = {
  score: number;
  metrics: Metrics;
  strengths: string[];
  improvements: string[];
  suggestedAnswer: string;
};

export type InterviewPhase = 'setup' | 'active' | 'evaluating' | 'result' | 'summary';
