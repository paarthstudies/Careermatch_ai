import React, { useState, useEffect, useRef } from 'react';

// Inject Classy Typography Styles for Students (Outfit & Plus Jakarta Sans)
const FontStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
    
    .font-heading {
      font-family: 'Outfit', sans-serif;
    }
    .font-body {
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    
    /* Custom Green Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #f1f5f9;
    }
    ::-webkit-scrollbar-thumb {
      background: #10b981;
      border-radius: 9999px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #059669;
    }
  `}</style>
);

const Icons = {
  Growth: () => (
    <svg className="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  Sparkles: () => (
    <svg className="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4M3 5h4M19 17v4M17 19h4"/>
    </svg>
  ),
  Mic: () => (
    <svg className="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" x2="12" y1="19" y2="22"/>
    </svg>
  ),
  MicOff: () => (
    <svg className="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" x2="22" y1="2" y2="22"/>
      <path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2"/>
      <path d="M5 10v2a7 7 0 0 0 12 5"/>
      <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33"/>
      <line x1="12" x2="12" y1="19" y2="22"/>
    </svg>
  ),
  CheckCircle: () => (
    <svg className="w-5 h-5 inline-block text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  AlertTriangle: () => (
    <svg className="w-5 h-5 inline-block text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
      <line x1="12" x2="12" y1="9" y2="13"/>
      <line x1="12" x2="12.01" y1="17" y2="17"/>
    </svg>
  ),
  Lightbulb: () => (
    <svg className="w-5 h-5 inline-block text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
      <path d="M9 18h6"/>
      <path d="M10 22h4"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg className="w-4 h-4 inline-block ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  Play: () => (
    <svg className="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  ),
  Briefcase: () => (
    <svg className="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  Target: () => (
    <svg className="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  Calendar: () => (
    <svg className="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
      <line x1="16" x2="16" y1="2" y2="6"/>
      <line x1="8" x2="8" y1="2" y2="6"/>
      <line x1="3" x2="21" y1="10" y2="10"/>
    </svg>
  ),
  Award: () => (
    <svg className="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7"/>
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
    </svg>
  ),
  RotateCcw: () => (
    <svg className="w-4 h-4 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
    </svg>
  ),
  GraduationCap: () => (
    <svg className="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  Brain: () => (
    <svg className="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
      <path d="M12 5v13"/>
    </svg>
  ),
  LogOut: () => (
    <svg className="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  Lock: () => (
    <svg className="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  User: () => (
    <svg className="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
};

const TARGET_ROLES = [
  { id: 'swe', name: 'Software Engineer', dept: 'Engineering', icon: '💻', keySkills: ['Data Structures', 'System Design', 'React', 'Algorithms'] },
  { id: 'aiml', name: 'AI/ML Intern', dept: 'AI Research', icon: '🤖', keySkills: ['Python', 'PyTorch', 'Model Tuning', 'Math/Linear Algebra'] },
  { id: 'da', name: 'Data Analyst', dept: 'Analytics', icon: '📊', keySkills: ['SQL Querying', 'Tableau', 'Statistics', 'A/B Testing'] },
  { id: 'be', name: 'Backend Developer', dept: 'Cloud & Infrastructure', icon: '⚙️', keySkills: ['Node.js/Python', 'PostgreSQL', 'REST API Design', 'Redis'] },
  { id: 'ba', name: 'Business Analyst', dept: 'Strategy & Ops', icon: '📈', keySkills: ['Requirement Gathering', 'Process Mapping', 'Financial Modeling', 'Agile'] }
];

const ROADMAP_DATA = {
  'Software Engineer': [
    {
      phase: 'Days 1 - 3',
      title: 'Data Structures & Core Algorithms',
      tasks: [
        { id: 'swe-d1-1', label: 'Master Arrays, Two-Pointer technique & Sliding Window problems' },
        { id: 'swe-d1-2', label: 'Practice Binary Tree Traversals (DFS/BFS) & Hash Table patterns' },
        { id: 'swe-d1-3', label: 'Review Dynamic Programming fundamentals (Knapsack, Subsequences)' }
      ]
    },
    {
      phase: 'Days 4 - 6',
      title: 'System Design & Architecture',
      tasks: [
        { id: 'swe-d2-1', label: 'Study Distributed Caching (Redis, Memcached, Cache-Aside pattern)' },
        { id: 'swe-d2-2', label: 'Learn Database Indexing, Sharding & SQL vs NoSQL trade-offs' },
        { id: 'swe-d2-3', label: 'Design a scalable URL Shortener / High-throughput Chat Service' }
      ]
    },
    {
      phase: 'Days 7 - 9',
      title: 'Frontend & Web Fundamentals',
      tasks: [
        { id: 'swe-d3-1', label: 'Master React Virtual DOM, Hooks, Context, & Reconciliation' },
        { id: 'swe-d3-2', label: 'Optimize Web Performance (Lazy Loading, Debouncing, Asset Bundling)' },
        { id: 'swe-d3-3', label: 'Review RESTful API design & GraphQL query optimization' }
      ]
    },
    {
      phase: 'Days 10 - 12',
      title: 'Behavioral Prep & STAR Stories',
      tasks: [
        { id: 'swe-d4-1', label: 'Draft STAR stories for technical conflict & deadline pressure' },
        { id: 'swe-d4-2', label: 'Prepare 3 quantifiable metrics from past internship/projects' },
        { id: 'swe-d4-3', label: 'Formulate thoughtful questions for the engineering manager' }
      ]
    },
    {
      phase: 'Days 13 - 14',
      title: 'Full Mock Simulations & Review',
      tasks: [
        { id: 'swe-d5-1', label: 'Complete 2 timed AI Mock Sessions in technical & system design' },
        { id: 'swe-d5-2', label: 'Review weakness diagnostic reports from practice sessions' }
      ]
    }
  ],
  'AI/ML Intern': [
    {
      phase: 'Days 1 - 3',
      title: 'Math Foundations & Classical ML',
      tasks: [
        { id: 'aiml-d1-1', label: 'Review Linear Algebra, Gradient Descent & Probability distributions' },
        { id: 'aiml-d1-2', label: 'Implement Decision Trees, Random Forests & SVMs from scratch' },
        { id: 'aiml-d1-3', label: 'Master Scikit-Learn data pipelines & feature engineering' }
      ]
    },
    {
      phase: 'Days 4 - 6',
      title: 'Deep Learning & PyTorch/TensorFlow',
      tasks: [
        { id: 'aiml-d2-1', label: 'Build CNNs for Image Classification & Transfer Learning' },
        { id: 'aiml-d2-2', label: 'Understand Backpropagation, Loss Functions & Regularization (L1/L2)' },
        { id: 'aiml-d2-3', label: 'Practice PyTorch DataLoader, custom modules & GPU acceleration' }
      ]
    },
    {
      phase: 'Days 7 - 9',
      title: 'Transformers & Modern NLP/LLMs',
      tasks: [
        { id: 'aiml-d3-1', label: 'Study Self-Attention mechanism, Multi-Head Attention & Transformer block' },
        { id: 'aiml-d3-2', label: 'Explore Fine-tuning HuggingFace models & LoRA parameter efficiency' },
        { id: 'aiml-d3-3', label: 'Implement a Retrieval-Augmented Generation (RAG) prototype' }
      ]
    },
    {
      phase: 'Days 10 - 12',
      title: 'Model Evaluation & MLOps',
      tasks: [
        { id: 'aiml-d4-1', label: 'Master evaluation metrics (Precision, Recall, F1, ROC-AUC)' },
        { id: 'aiml-d4-2', label: 'Learn ONNX deployment, Quantization & Model Serving basics' }
      ]
    },
    {
      phase: 'Days 13 - 14',
      title: 'Mock AI Interviews & Portfolio Defense',
      tasks: [
        { id: 'aiml-d5-1', label: 'Simulate AI Research viva in AI Interview Studio' },
        { id: 'aiml-d5-2', label: 'Prepare 5-minute elevator pitch for your ML GitHub projects' }
      ]
    }
  ],
  'Data Analyst': [
    {
      phase: 'Days 1 - 3',
      title: 'Advanced SQL Querying',
      tasks: [
        { id: 'da-d1-1', label: 'Master Window Functions (RANK, DENSE_RANK, LAG/LEAD)' },
        { id: 'da-d1-2', label: 'Write complex CTEs, Subqueries, & Self-Joins' },
        { id: 'da-d1-3', label: 'Optimize database queries using EXPLAIN execution plans' }
      ]
    },
    {
      phase: 'Days 4 - 6',
      title: 'Data Visualization & BI Tools',
      tasks: [
        { id: 'da-d2-1', label: 'Build interactive dashboards in Tableau or PowerBI' },
        { id: 'da-d2-2', label: 'Design executive-ready charts with clear narrative insights' },
        { id: 'da-d2-3', label: 'Master Pandas, Seaborn & Matplotlib for exploratory analysis' }
      ]
    },
    {
      phase: 'Days 7 - 9',
      title: 'Statistics & A/B Testing',
      tasks: [
        { id: 'da-d3-1', label: 'Understand Hypothesis Testing, P-values & Confidence Intervals' },
        { id: 'da-d3-2', label: 'Calculate Sample Size requirements & Statistical Power' },
        { id: 'da-d3-3', label: 'Analyze experimental A/B test results and guardrail metrics' }
      ]
    },
    {
      phase: 'Days 10 - 12',
      title: 'Business Case Studies & Metrics',
      tasks: [
        { id: 'da-d4-1', label: 'Practice case studies: Retention, Churn, LTV & CAC modeling' },
        { id: 'da-d4-2', label: 'Draft structured data stories for non-technical stakeholders' }
      ]
    },
    {
      phase: 'Days 13 - 14',
      title: 'Mock Case Interviews',
      tasks: [
        { id: 'da-d5-1', label: 'Complete Data Analytics interview practice in AI Studio' },
        { id: 'da-d5-2', label: 'Review SQL live-coding speed and accuracy' }
      ]
    }
  ],
  'Backend Developer': [
    {
      phase: 'Days 1 - 3',
      title: 'Language Internals & Async Control',
      tasks: [
        { id: 'be-d1-1', label: 'Master Event Loop, Async/Await, & Concurrency models' },
        { id: 'be-d1-2', label: 'Implement RESTful APIs with input validation & middleware' },
        { id: 'be-d1-3', label: 'Practice error handling, logging, & structured tracing' }
      ]
    },
    {
      phase: 'Days 4 - 6',
      title: 'Database Design & ORM Optimization',
      tasks: [
        { id: 'be-d2-1', label: 'Design relational schemas in PostgreSQL with foreign keys & constraints' },
        { id: 'be-d2-2', label: 'Implement database migrations, indexing & transaction isolation levels' },
        { id: 'be-d2-3', label: 'Configure Connection Pooling & Redis caching layers' }
      ]
    },
    {
      phase: 'Days 7 - 9',
      title: 'Microservices & Message Queues',
      tasks: [
        { id: 'be-d3-1', label: 'Understand Message Queues (RabbitMQ/Kafka) & Event-Driven architecture' },
        { id: 'be-d3-2', label: 'Implement Authentication using JWT, OAuth2, & Rate Limiting' },
        { id: 'be-d3-3', label: 'Build Docker containers & Docker Compose multi-service setups' }
      ]
    },
    {
      phase: 'Days 10 - 12',
      title: 'Security, CI/CD & Testing',
      tasks: [
        { id: 'be-d4-1', label: 'Write Unit & Integration tests using Jest / PyTest' },
        { id: 'be-d4-2', label: 'Prevent OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF)' }
      ]
    },
    {
      phase: 'Days 13 - 14',
      title: 'System Design Mock Sessions',
      tasks: [
        { id: 'be-d5-1', label: 'Simulate Backend Architecture interview in AI Studio' },
        { id: 'be-d5-2', label: 'Refine API documentation and OpenAPI/Swagger specs' }
      ]
    }
  ],
  'Business Analyst': [
    {
      phase: 'Days 1 - 3',
      title: 'Requirements Gathering & Process Mapping',
      tasks: [
        { id: 'ba-d1-1', label: 'Master Business Process Modeling Notation (BPMN) & Flowcharts' },
        { id: 'ba-d1-2', label: 'Draft comprehensive User Stories with Acceptance Criteria' },
        { id: 'ba-d1-3', label: 'Practice stakeholder interviewing & requirement elicitation' }
      ]
    },
    {
      phase: 'Days 4 - 6',
      title: 'Agile & Scrum Methodologies',
      tasks: [
        { id: 'ba-d2-1', label: 'Understand Jira workflows, Backlog Grooming, & Sprint Planning' },
        { id: 'ba-d2-2', label: 'Learn Product Roadmap prioritization (RICE, MoSCoW framework)' },
        { id: 'ba-d2-3', label: 'Create Functional vs Non-Functional Specification Documents' }
      ]
    },
    {
      phase: 'Days 7 - 9',
      title: 'Data Analysis & Financial Modeling',
      tasks: [
        { id: 'ba-d3-1', label: 'Master Excel Advanced Functions (VLOOKUP, INDEX/MATCH, Pivot Tables)' },
        { id: 'ba-d3-2', label: 'Perform Cost-Benefit Analysis & ROI calculations' },
        { id: 'ba-d3-3', label: 'Write basic SQL queries to retrieve business metrics' }
      ]
    },
    {
      phase: 'Days 10 - 12',
      title: 'Root Cause & Gap Analysis',
      tasks: [
        { id: 'ba-d4-1', label: 'Apply 5-Whys and Fishbone (Ishikawa) root cause diagrams' },
        { id: 'ba-d4-2', label: 'Prepare executive presentations with actionable recommendations' }
      ]
    },
    {
      phase: 'Days 13 - 14',
      title: 'Case Study Mock Interviews',
      tasks: [
        { id: 'ba-d5-1', label: 'Practice product case studies in AI Interview Studio' },
        { id: 'ba-d5-2', label: 'Refine executive communication and problem framing' }
      ]
    }
  ]
};

const MOCK_QUESTION_BANK = {
  'Software Engineer': [
    {
      question: "How would you design an efficient caching system for a high-throughput REST API to minimize database load?",
      category: "System Design",
      hint: "Mention cache invalidation strategies (TTL, LRU), Redis/Memcached, and Cache-Aside vs Write-Through patterns.",
      idealAnswerSample: "I would use a distributed key-value store like Redis using the Cache-Aside pattern. For fast reads, the API checks Redis first; on miss, it queries PostgreSQL, populates Redis with an appropriate TTL (e.g. 1 hour), and returns the payload. To maintain consistency on updates, I'd implement explicit cache invalidation."
    },
    {
      question: "Explain the difference between optimistic and pessimistic locking in database transactions, and when to use each.",
      category: "Database Concepts",
      hint: "Optimistic locking uses version numbers/timestamps without locking rows; pessimistic locking locks records upfront.",
      idealAnswerSample: "Optimistic locking assumes collisions are rare and verifies record version numbers before committing. It is ideal for read-heavy applications. Pessimistic locking acquires explicit database locks, preventing concurrent modifications entirely."
    },
    {
      question: "Describe a complex technical bug you encountered recently and walk me through your step-by-step debugging workflow.",
      category: "Behavioral / Problem Solving",
      hint: "Use the STAR approach: Situation, Task, Action (tools used, isolation steps), Result (resolution and metrics).",
      idealAnswerSample: "In my recent project, production users experienced memory leaks. Task: Identify root cause without downtime. Action: I collected heap snapshots, isolated an unhandled event listener retention pattern, and refactored the component teardown hooks. Result: Reduced memory footprint by 42%."
    },
    {
      question: "How do React's virtual DOM reconciliation and keys mechanism optimize rendering performance?",
      category: "Frontend Architecture",
      hint: "Discuss the Diffing algorithm, O(n) complexity heuristics, fiber trees, and stability of unique array keys.",
      idealAnswerSample: "React creates a lightweight in-memory snapshot of the UI. During state updates, it generates a new Virtual DOM tree and runs a diffing algorithm comparing it to the previous tree. Stable keys allow React to identify moved or updated items in O(n) time."
    },
    {
      question: "How do you ensure web application security against SQL Injection and Cross-Site Scripting (XSS)?",
      category: "Security Best Practices",
      hint: "Mention parameterized queries/ORMs, Content Security Policy (CSP), HTML escaping, and sanitized input validation.",
      idealAnswerSample: "To prevent SQL Injection, I strictly enforce parameterized queries via modern ORMs and avoid raw string concatenation. Against XSS, I utilize automatic DOM sanitization, React's default escaping, and Content Security Policies."
    }
  ],
  'AI/ML Intern': [
    {
      question: "Explain the Bias-Variance tradeoff and how regularization techniques (L1/L2) mitigate overfitting.",
      category: "Machine Learning Fundamentals",
      hint: "High bias leads to underfitting; high variance leads to overfitting. L1 (Lasso) promotes sparsity; L2 (Ridge) penalizes large weights.",
      idealAnswerSample: "Bias represents errors from overly simplistic assumptions, while Variance is sensitivity to small fluctuations in training data. L1 regularization adds absolute weight penalties to drive irrelevant features to zero, while L2 adds squared penalties to constrain coefficient magnitudes."
    },
    {
      question: "How does the Self-Attention mechanism work in Transformer architectures like BERT or GPT?",
      category: "Deep Learning & NLP",
      hint: "Explain Query, Key, and Value vectors, scaled dot-product attention formula, and positional encodings.",
      idealAnswerSample: "Self-attention computes dynamic weights representing relationships between all tokens in a sequence regardless of distance. Input vectors map into Query, Key, and Value projections. Attention scores are calculated using Softmax((Q * K^T) / sqrt(d_k)) * V."
    }
  ]
};

const SAMPLE_JOBS = [
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

async function callGeminiAPI(prompt, systemInstruction = "", responseSchema = null) {
  try {
    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined
    };

    if (responseSchema) {
      payload.generationConfig = {
        responseMimeType: "application/json",
        responseSchema: responseSchema
      };
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`API status: ${response.status}`);
    const result = await response.json();
    return result.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (err) {
    console.warn("Gemini API connection unfulfilled, defaulting to local intelligent engine:", err.message);
    return null;
  }
}

function generateFallbackQuestions(role, difficulty, focus) {
  const bank = MOCK_QUESTION_BANK[role] || MOCK_QUESTION_BANK['Software Engineer'];
  return bank.map((q, idx) => ({
    id: `q-${idx + 1}`,
    question: `[${difficulty}] ${q.question}`,
    category: q.category,
    hint: q.hint,
    idealAnswerSample: q.idealAnswerSample
  }));
}

function fallbackEvaluateAnswer(questionText, answerText, focus) {
  const wordCount = answerText.trim().split(/\s+/).filter(Boolean).length;
  let score = 5.5;
  let accuracy = 65;
  let structure = 60;
  let relevance = 65;

  if (wordCount > 30) { score += 1.8; accuracy += 15; structure += 20; relevance += 15; }
  if (wordCount > 70) { score += 1.5; accuracy += 12; structure += 15; relevance += 15; }

  const keywords = ['for example', 'firstly', 'because', 'result', 'system', 'data', 'using', 'optimized', 'architecture'];
  const matchedKw = keywords.filter(k => answerText.toLowerCase().includes(k));
  score += Math.min(matchedKw.length * 0.3, 1.2);

  score = Math.min(Math.max(parseFloat(score.toFixed(1)), 4.5), 9.8);
  accuracy = Math.min(Math.round(accuracy + (score * 2)), 98);
  structure = Math.min(Math.round(structure + (score * 2)), 96);
  relevance = Math.min(Math.round(relevance + (score * 2.2)), 99);

  return {
    score,
    metrics: { accuracy, structure, relevance },
    strengths: [
      `Clear, structured response (${wordCount} words analyzed).`,
      matchedKw.length > 0 ? `Effective use of core technical terminology.` : "Demonstrated foundational knowledge of key principles."
    ],
    improvements: [
      wordCount < 60 ? "Expand your answer using the STAR method for maximum clarity." : "Add quantitative metrics or benchmarks.",
      "Highlight explicit technical trade-offs."
    ],
    suggestedAnswer: "A high-scoring answer establishes clear context, methodical technical steps, measurable metrics, and key architectural trade-offs."
  };
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('interview');
  const [selectedJob, setSelectedJob] = useState(SAMPLE_JOBS[0]);

  const [interviewPhase, setInterviewPhase] = useState('setup');
  const [selectedRole, setSelectedRole] = useState(TARGET_ROLES[0].name);
  const [selectedDifficulty, setSelectedDifficulty] = useState('Mid-Level');
  const [selectedFocus, setSelectedFocus] = useState('Technical & System Architecture');

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState(['', '', '', '', '']);
  const [evaluations, setEvaluations] = useState([null, null, null, null, null]);
  const [showHint, setShowHint] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [recordTimer, setRecordTimer] = useState(0);
  const timerRef = useRef(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const [roadmapRole, setRoadmapRole] = useState(TARGET_ROLES[0].name);
  const [completedTasks, setCompletedTasks] = useState({
    'swe-d1-1': true,
    'swe-d1-2': true,
    'swe-d2-1': true,
    'aiml-d1-1': true
  });

  const toggleTask = (taskId) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const markAllTasksForRole = (roleName, status) => {
    const rolePhases = ROADMAP_DATA[roleName] || [];
    const newCompleted = { ...completedTasks };
    rolePhases.forEach(phase => {
      phase.tasks.forEach(task => {
        newCompleted[task.id] = status;
      });
    });
    setCompletedTasks(newCompleted);
  };

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordTimer(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setRecordTimer(0);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const handleStartInterview = async () => {
    setIsGenerating(true);
    setInterviewPhase('setup');

    const prompt = `Generate exactly 5 high-quality interview questions for a candidate applying for "${selectedRole}" at "${selectedDifficulty}" level focusing on "${selectedFocus}". Return a JSON array.`;
    const schema = {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          question: { type: "STRING" },
          category: { type: "STRING" },
          hint: { type: "STRING" },
          idealAnswerSample: { type: "STRING" }
        },
        required: ["question", "category", "hint", "idealAnswerSample"]
      }
    };

    const apiResultText = await callGeminiAPI(prompt, "You are a senior hiring manager.", schema);
    let generatedQs = [];

    if (apiResultText) {
      try {
        const parsed = JSON.parse(apiResultText);
        generatedQs = parsed.map((item, idx) => ({
          id: `q-api-${idx + 1}`,
          question: item.question,
          category: item.category || selectedFocus,
          hint: item.hint || "Focus on clear structure and technical accuracy.",
          idealAnswerSample: item.idealAnswerSample || "A top response highlights context, action, and results."
        }));
      } catch (e) {
        console.warn("Fallback to offline question bank");
      }
    }

    if (!generatedQs || generatedQs.length < 5) {
      generatedQs = generateFallbackQuestions(selectedRole, selectedDifficulty, selectedFocus);
    }

    setQuestions(generatedQs);
    setCurrentQuestionIdx(0);
    setUserAnswers(['', '', '', '', '']);
    setEvaluations([null, null, null, null, null]);
    setShowHint(false);
    setIsGenerating(false);
    setInterviewPhase('active');
  };

  const handleAutofillSample = () => {
    const q = questions[currentQuestionIdx];
    if (q) {
      const sampleText = q.idealAnswerSample || "In my previous project, I solved a key bottleneck by analyzing query execution plans, introducing indexed caching layers, and running stress tests to ensure stable performance under load.";
      const updated = [...userAnswers];
      updated[currentQuestionIdx] = sampleText;
      setUserAnswers(updated);
    }
  };

  const handleSubmitAnswer = async () => {
    const currentAns = userAnswers[currentQuestionIdx];
    if (!currentAns || currentAns.trim().length < 5) return;

    setIsEvaluating(true);
    setInterviewPhase('evaluating');

    const q = questions[currentQuestionIdx];
    const prompt = `Evaluate the candidate's answer for Role: ${selectedRole}. Question: "${q.question}". Answer: "${currentAns}". Return a JSON object with score (0-10), metrics (accuracy, structure, relevance), strengths, improvements, suggestedAnswer.`;

    const schema = {
      type: "OBJECT",
      properties: {
        score: { type: "NUMBER" },
        metrics: {
          type: "OBJECT",
          properties: {
            accuracy: { type: "NUMBER" },
            structure: { type: "NUMBER" },
            relevance: { type: "NUMBER" }
          },
          required: ["accuracy", "structure", "relevance"]
        },
        strengths: { type: "ARRAY", items: { type: "STRING" } },
        improvements: { type: "ARRAY", items: { type: "STRING" } },
        suggestedAnswer: { type: "STRING" }
      },
      required: ["score", "metrics", "strengths", "improvements", "suggestedAnswer"]
    };

    const rawResult = await callGeminiAPI(prompt, "You are an encouraging, expert tech interviewer.", schema);
    let evalObj = null;

    if (rawResult) {
      try {
        evalObj = JSON.parse(rawResult);
      } catch (e) {
        console.warn("Parsing failure, running fallback evaluation");
      }
    }

    if (!evalObj) {
      evalObj = fallbackEvaluateAnswer(q.question, currentAns, selectedFocus);
      if (q.idealAnswerSample) evalObj.suggestedAnswer = q.idealAnswerSample;
    }

    const updatedEvals = [...evaluations];
    updatedEvals[currentQuestionIdx] = evalObj;
    setEvaluations(updatedEvals);

    setIsEvaluating(false);
    setInterviewPhase('result');
  };

  const handleNextQuestion = () => {
    setShowHint(false);
    if (currentQuestionIdx < 4) {
      setCurrentQuestionIdx(prev => prev + 1);
      setInterviewPhase('active');
    } else {
      setInterviewPhase('summary');
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      if (!userAnswers[currentQuestionIdx]) {
        const simulatedVoiceText = "To ensure system reliability under peak demand, I decouple queue processing using message brokers like RabbitMQ or Kafka, keeping latency consistently low for core HTTP request handlers.";
        const updated = [...userAnswers];
        updated[currentQuestionIdx] = simulatedVoiceText;
        setUserAnswers(updated);
      }
    } else {
      setIsRecording(true);
    }
  };

  const handleLaunchPracticeForJob = (job) => {
    setSelectedRole(job.role);
    setSelectedDifficulty(job.difficulty);
    setActiveTab('interview');
    setInterviewPhase('setup');
  };

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    if (loginUsername.trim() === 'myself123' && loginPassword === '123456') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password. Use username "myself123" and password "123456"');
    }
  };

  const handleQuickFill = () => {
    setLoginUsername('myself123');
    setLoginPassword('123456');
    setLoginError('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginUsername('');
    setLoginPassword('');
    setLoginError('');
  };

  const getAverageScore = () => {
    const validScores = evaluations.filter(Boolean).map(e => e.score);
    if (validScores.length === 0) return 0;
    const sum = validScores.reduce((a, b) => a + b, 0);
    return (sum / validScores.length).toFixed(1);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 font-body flex items-center justify-center p-4 selection:bg-emerald-500 selection:text-white">
        <FontStyles />
        <div className="w-full max-w-md bg-white border border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-emerald-950/5 space-y-6">
          
          {/* Logo & Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-600/20 text-white">
              <Icons.Growth />
            </div>
            <div>
              <h1 className="font-heading font-extrabold text-2xl text-slate-900 tracking-tight">
                Career<span className="text-emerald-600">Match</span> AI
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-1">Student Portal Access</p>
            </div>
          </div>

          {/* Credentials Notice Box */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3.5 text-xs text-emerald-900 space-y-2">
            <div className="font-heading font-bold flex items-center justify-between text-emerald-800">
              <span className="flex items-center space-x-1.5">
                <Icons.Sparkles />
                <span>Demo Account Credentials</span>
              </span>
              <button
                type="button"
                onClick={handleQuickFill}
                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold rounded-lg text-[11px] transition-all shadow-sm"
              >
                Auto-Fill
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-white/80 p-2 rounded-xl border border-emerald-200/50">
              <div>User: <strong className="text-emerald-700">myself123</strong></div>
              <div>Pass: <strong className="text-emerald-700">123456</strong></div>
            </div>
          </div>

          {/* Error Banner */}
          {loginError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-2xl text-xs flex items-start space-x-2">
              <Icons.AlertTriangle />
              <span>{loginError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-heading font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1">
                <span>Username</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <Icons.User />
                </span>
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="Enter username (myself123)"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-heading font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1">
                <span>Password</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <Icons.Lock />
                </span>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter password (123456)"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-heading font-bold text-sm shadow-xl shadow-emerald-600/25 hover:shadow-emerald-600/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2"
            >
              <span>Sign In to Student Platform</span>
              <Icons.ArrowRight />
            </button>
          </form>

          <div className="text-center text-[11px] text-slate-400 font-medium">
            Protected CareerMatch AI Student Environment
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-body selection:bg-emerald-500 selection:text-white">
      <FontStyles />

      {/* CLASSY HEADER & NAVBAR (Emerald & Pure White) */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Brand Logo & Green Badge */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-600/20 text-white">
              <Icons.Growth />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-heading font-extrabold text-2xl tracking-tight text-slate-900">
                  Career<span className="text-emerald-600">Match</span>
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1.5"></span>
                  Student Edition
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">AI Career Matchmaker & Interview Simulator</p>
            </div>
          </div>

          {/* Navigation Pills */}
          <nav className="flex items-center space-x-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80 text-sm font-medium overflow-x-auto max-w-full">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: <Icons.Target /> },
              { id: 'jobs', label: 'Jobs Directory', icon: <Icons.Briefcase /> },
              { id: 'match', label: 'Match Analysis', icon: <Icons.Sparkles /> },
              { id: 'roadmap', label: 'Prep Roadmap', icon: <Icons.Calendar /> },
              { id: 'interview', label: 'AI Interview Studio', icon: <Icons.Mic />, highlight: true }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 whitespace-nowrap font-heading text-xs font-bold ${
                  activeTab === tab.id
                    ? tab.highlight 
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/25'
                      : 'bg-white text-emerald-950 shadow-sm font-bold border border-slate-200'
                    : 'text-slate-600 hover:text-emerald-700 hover:bg-white/60'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Student Profile Badge & Logout Button */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="flex items-center space-x-3 bg-emerald-50/70 border border-emerald-200/60 px-3.5 py-1.5 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-heading font-bold text-xs flex items-center justify-center shadow-sm">
                AC
              </div>
              <div className="text-left text-xs">
                <div className="font-heading font-bold text-slate-900">myself123</div>
                <div className="text-emerald-700 font-medium">CS Senior • ATS 88%</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700 text-slate-600 text-xs font-heading font-bold transition-all flex items-center space-x-1.5"
              title="Sign Out"
            >
              <Icons.LogOut />
              <span>Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8">

        {/* ========================================================================= */}
        {/* MODULE 1: AI INTERVIEW PRACTICE STUDIO                                    */}
        {/* ========================================================================= */}
        {activeTab === 'interview' && (
          <div className="space-y-6">

            {/* 1A. SETUP STAGE */}
            {interviewPhase === 'setup' && (
              <div className="max-w-4xl mx-auto bg-white border border-emerald-100 rounded-3xl p-6 lg:p-10 shadow-xl shadow-emerald-950/5 space-y-8">
                
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold font-heading">
                    <Icons.Sparkles />
                    <span>Real-time AI Interview Simulator</span>
                  </div>
                  <h1 className="font-heading text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                    Configure Your Interactive Studio
                  </h1>
                  <p className="text-slate-600 max-w-xl mx-auto text-sm leading-relaxed">
                    Select your target job role, experience level, and preferred interview focus. Gemini AI will generate 5 customized practice questions and deliver instant, constructive feedback.
                  </p>
                </div>

                {/* Role Selection Grid */}
                <div className="space-y-3">
                  <label className="text-xs font-heading font-bold uppercase tracking-wider text-emerald-900 flex items-center space-x-2">
                    <Icons.Briefcase />
                    <span>1. Select Target Job Role</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {TARGET_ROLES.map((role) => (
                      <button
                        key={role.id}
                        onClick={() => setSelectedRole(role.name)}
                        className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-3 ${
                          selectedRole === role.name
                            ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/30 shadow-md'
                            : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{role.icon}</span>
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">{role.dept}</span>
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-slate-900 text-sm">{role.name}</h3>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {role.keySkills.slice(0, 3).map((s, i) => (
                              <span key={i} className="text-[10px] text-emerald-800 bg-emerald-100/50 px-2 py-0.5 rounded border border-emerald-200/50 font-medium">{s}</span>
                            ))}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty & Focus Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Difficulty level */}
                  <div className="space-y-3">
                    <label className="text-xs font-heading font-bold uppercase tracking-wider text-emerald-900 flex items-center space-x-2">
                      <Icons.Target />
                      <span>2. Select Experience Difficulty</span>
                    </label>
                    <div className="space-y-2">
                      {[
                        { id: 'Entry / Junior', desc: 'Foundational concepts, basic problem solving, core syntax' },
                        { id: 'Mid-Level', desc: 'Practical trade-offs, architecture decisions, STAR scenarios' },
                        { id: 'Senior / Hard', desc: 'Complex system scalability, deep internals, ambiguous problems' }
                      ].map((diff) => (
                        <button
                          key={diff.id}
                          onClick={() => setSelectedDifficulty(diff.id)}
                          className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                            selectedDifficulty === diff.id
                              ? 'bg-emerald-50/90 border-emerald-500 text-emerald-950 font-medium shadow-sm'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-heading font-bold text-sm text-slate-900">{diff.id}</span>
                            {selectedDifficulty === diff.id && <Icons.CheckCircle />}
                          </div>
                          <p className="text-xs text-slate-500 mt-1">{diff.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question Focus */}
                  <div className="space-y-3">
                    <label className="text-xs font-heading font-bold uppercase tracking-wider text-emerald-900 flex items-center space-x-2">
                      <Icons.Brain />
                      <span>3. Question Focus Area</span>
                    </label>
                    <div className="space-y-2">
                      {[
                        { id: 'Technical & System Architecture', label: 'Technical & Code Design' },
                        { id: 'Behavioral STAR Method', label: 'Behavioral & Leadership (STAR)' },
                        { id: 'Mixed Balanced Session', label: 'Balanced Hybrid (Technical + Behavioral)' }
                      ].map((focus) => (
                        <button
                          key={focus.id}
                          onClick={() => setSelectedFocus(focus.id)}
                          className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                            selectedFocus === focus.id
                              ? 'bg-emerald-50/90 border-emerald-500 text-emerald-950 font-medium shadow-sm'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-heading font-bold text-sm text-slate-900">{focus.label}</span>
                            {selectedFocus === focus.id && <Icons.CheckCircle />}
                          </div>
                          <p className="text-xs text-slate-500 mt-1">Algorithmic tailored evaluation model</p>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Launch Button */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 flex items-center space-x-2 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span>Ready to launch 5 interactive questions</span>
                  </div>
                  <button
                    onClick={handleStartInterview}
                    disabled={isGenerating}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-heading font-bold text-sm shadow-xl shadow-emerald-600/25 hover:shadow-emerald-600/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Generating AI Questions...</span>
                      </>
                    ) : (
                      <>
                        <Icons.Sparkles />
                        <span>Start Practice Session (5 Questions)</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            )}

            {/* 1B. ACTIVE INTERVIEW WORKSPACE */}
            {(interviewPhase === 'active' || interviewPhase === 'evaluating') && questions.length > 0 && (
              <div className="max-w-4xl mx-auto space-y-6">

                {/* Header Banner */}
                <div className="bg-white border border-emerald-100 p-4 rounded-2xl flex items-center justify-between shadow-sm">
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 rounded-xl bg-emerald-100/80 text-emerald-800 border border-emerald-200 text-xs font-heading font-bold">
                      Question {currentQuestionIdx + 1} of 5
                    </span>
                    <span className="text-xs text-slate-600 font-medium">
                      Target: <strong className="text-slate-900">{selectedRole}</strong> ({selectedDifficulty})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-500 font-medium">Progress:</span>
                    <div className="w-28 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300" 
                        style={{ width: `${((currentQuestionIdx + 1) / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Main Question Box */}
                <div className="bg-white border border-emerald-100 rounded-3xl p-6 lg:p-8 shadow-xl shadow-emerald-950/5 space-y-6">
                  
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <span className="inline-block px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-heading font-semibold uppercase tracking-wider border border-slate-200">
                        Category: {questions[currentQuestionIdx].category}
                      </span>
                      <h2 className="font-heading text-xl lg:text-2xl font-bold text-slate-900 leading-snug">
                        {questions[currentQuestionIdx].question}
                      </h2>
                    </div>
                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="px-3.5 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-heading font-bold hover:bg-teal-100 transition-all flex items-center space-x-1 whitespace-nowrap shrink-0"
                    >
                      <Icons.Lightbulb />
                      <span>{showHint ? 'Hide Hint' : '💡 Student Hint'}</span>
                    </button>
                  </div>

                  {/* Hint Drawer */}
                  {showHint && (
                    <div className="bg-teal-50/60 border border-teal-200 p-4 rounded-2xl text-xs text-teal-900 space-y-1">
                      <div className="font-heading font-bold text-teal-800 flex items-center space-x-1">
                        <Icons.Lightbulb />
                        <span>Recommended Key Angles:</span>
                      </div>
                      <p className="leading-relaxed">{questions[currentQuestionIdx].hint}</p>
                    </div>
                  )}

                  {/* Response Input Area */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-heading font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-2">
                        <span>Your Answer (Verbatim or Voice Input)</span>
                      </label>
                      <button
                        onClick={handleAutofillSample}
                        className="text-xs text-emerald-600 hover:text-emerald-700 font-medium underline flex items-center space-x-1"
                      >
                        <Icons.Sparkles />
                        <span>✨ Fill Sample Response for Demo</span>
                      </button>
                    </div>

                    <div className="relative">
                      <textarea
                        value={userAnswers[currentQuestionIdx]}
                        onChange={(e) => {
                          const updated = [...userAnswers];
                          updated[currentQuestionIdx] = e.target.value;
                          setUserAnswers(updated);
                        }}
                        placeholder="Structure your answer clearly (Context, Action, Metrics, Result)..."
                        rows={6}
                        className="w-full bg-slate-50/60 border border-slate-200 rounded-2xl p-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-y"
                      ></textarea>

                      {/* Speech Visualizer */}
                      {isRecording && (
                        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center space-y-4 border border-emerald-300 shadow-lg">
                          <div className="flex items-center space-x-1.5 h-10">
                            {[40, 70, 30, 90, 60, 100, 50, 80, 40, 90, 60].map((h, i) => (
                              <div
                                key={i}
                                className="w-1.5 bg-emerald-500 rounded-full animate-pulse"
                                style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                              ></div>
                            ))}
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-heading font-bold text-slate-900">Simulating Voice Input Capture...</div>
                            <div className="text-xs text-slate-500 mt-1">
                              Duration: <span className="text-emerald-600 font-mono font-bold">{recordTimer}s</span> • Speak into your microphone
                            </div>
                          </div>
                          <button
                            onClick={toggleRecording}
                            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-heading font-bold shadow-md transition-all"
                          >
                            Stop Recording & Insert Text
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <button
                        onClick={toggleRecording}
                        className={`px-4 py-2 rounded-xl border text-xs font-heading font-bold transition-all flex items-center space-x-2 ${
                          isRecording 
                            ? 'bg-rose-50 border-rose-300 text-rose-700' 
                            : 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                        }`}
                      >
                        {isRecording ? <Icons.MicOff /> : <Icons.Mic />}
                        <span>{isRecording ? 'Stop Recording' : '🎙️ Simulate Voice Recording'}</span>
                      </button>

                      <span className="text-xs text-slate-500 font-medium">
                        Word Count: <strong className="text-emerald-700 font-bold">{userAnswers[currentQuestionIdx].trim().split(/\s+/).filter(Boolean).length}</strong> words
                      </span>
                    </div>

                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={isEvaluating || userAnswers[currentQuestionIdx].trim().length < 5}
                      className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-heading font-bold text-xs shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/35 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isEvaluating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Evaluating Answer...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit & Analyze Response</span>
                          <Icons.ArrowRight />
                        </>
                      )}
                    </button>
                  </div>

                </div>

              </div>
            )}

            {/* 1C. PER-QUESTION DIAGNOSTIC REPORT */}
            {interviewPhase === 'result' && evaluations[currentQuestionIdx] && (
              <div className="max-w-4xl mx-auto space-y-6">
                
                <div className="bg-white border border-emerald-100 rounded-3xl p-6 lg:p-8 shadow-xl shadow-emerald-950/5 space-y-6">
                  
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
                    <div className="flex items-center space-x-5">
                      
                      {/* Circle Gauge */}
                      <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-slate-100"
                            strokeWidth="3.5"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className={evaluations[currentQuestionIdx].score >= 8 ? "text-emerald-500" : evaluations[currentQuestionIdx].score >= 6 ? "text-amber-500" : "text-rose-500"}
                            strokeDasharray={`${evaluations[currentQuestionIdx].score * 10}, 100`}
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div className="absolute text-center">
                          <span className="font-heading text-2xl font-black text-slate-900">{evaluations[currentQuestionIdx].score}</span>
                          <span className="text-[10px] text-slate-400 block font-bold">/ 10 Score</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-heading font-bold border ${
                            evaluations[currentQuestionIdx].score >= 8
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}>
                            {evaluations[currentQuestionIdx].score >= 8 ? 'Strong Performance' : 'Satisfactory Response'}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">Diagnostic Feedback</span>
                        </div>
                        <h2 className="font-heading text-xl font-bold text-slate-900 mt-1">
                          {questions[currentQuestionIdx].category}
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">Benchmarked for student applicants</p>
                      </div>

                    </div>

                    {/* Breakdown Scores */}
                    <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
                      {[
                        { label: 'Technical Acc.', val: evaluations[currentQuestionIdx].metrics?.accuracy || 80 },
                        { label: 'Structure', val: evaluations[currentQuestionIdx].metrics?.structure || 75 },
                        { label: 'Relevance', val: evaluations[currentQuestionIdx].metrics?.relevance || 85 }
                      ].map((m, i) => (
                        <div key={i} className="bg-emerald-50/40 p-3 rounded-2xl border border-emerald-100 text-center">
                          <div className="font-heading text-lg font-extrabold text-emerald-700">{m.val}%</div>
                          <div className="text-[10px] text-slate-600 font-medium mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Strengths & Weaknesses */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-5 space-y-3">
                      <div className="flex items-center space-x-2 text-emerald-800 font-heading font-bold text-sm">
                        <Icons.CheckCircle />
                        <span>Key Strengths</span>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-700">
                        {evaluations[currentQuestionIdx].strengths?.map((str, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{str}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-5 space-y-3">
                      <div className="flex items-center space-x-2 text-amber-800 font-heading font-bold text-sm">
                        <Icons.AlertTriangle />
                        <span>Areas to Enhance</span>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-700">
                        {evaluations[currentQuestionIdx].improvements?.map((imp, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-amber-600 font-bold">•</span>
                            <span>{imp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Model Answer */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                    <div className="flex items-center space-x-2 text-emerald-800 font-heading font-bold text-xs uppercase tracking-wider">
                      <Icons.Lightbulb />
                      <span>Model Answer Concept</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-200/80 italic">
                      "{evaluations[currentQuestionIdx].suggestedAnswer}"
                    </p>
                  </div>

                  {/* Next Step Footer */}
                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-xs text-slate-500 font-medium">
                      Question {currentQuestionIdx + 1} reviewed
                    </span>
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-heading font-bold text-xs shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all flex items-center space-x-2"
                    >
                      <span>{currentQuestionIdx < 4 ? 'Proceed to Next Question' : 'View Full Scorecard'}</span>
                      <Icons.ArrowRight />
                    </button>
                  </div>

                </div>

              </div>
            )}

            {/* 1D. FINAL INTERVIEW SCORECARD */}
            {interviewPhase === 'summary' && (
              <div className="max-w-4xl mx-auto space-y-6">
                
                <div className="bg-white border border-emerald-100 rounded-3xl p-6 lg:p-8 shadow-xl shadow-emerald-950/5 space-y-8">
                  
                  <div className="text-center space-y-3">
                    <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-heading font-bold">
                      <Icons.Award />
                      <span>Practice Session Completed</span>
                    </div>
                    <h2 className="font-heading text-3xl font-extrabold text-slate-900">Overall Interview Report</h2>
                    <p className="text-xs text-slate-500 font-medium">Candidate: Alex Chen • Role: {selectedRole} ({selectedDifficulty})</p>
                  </div>

                  {/* Score Banner */}
                  <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
                    <div className="flex items-center space-x-6">
                      <div className="text-center bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 min-w-[120px]">
                        <span className="font-heading text-4xl font-black text-emerald-300">{getAverageScore()}</span>
                        <span className="text-xs text-emerald-100 block font-medium mt-1">/ 10 Score</span>
                      </div>
                      <div className="space-y-1">
                        <div className="font-heading text-lg font-bold text-white">
                          {parseFloat(getAverageScore()) >= 8 ? '🔥 Campus Placement Ready!' : '📈 Solid Foundational Readiness'}
                        </div>
                        <p className="text-xs text-emerald-100/90 max-w-md leading-relaxed">
                          Great demonstration of technical vocabulary. Focus on the actionable steps below to refine concise delivery during actual interviews.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setInterviewPhase('setup')}
                      className="px-5 py-2.5 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 font-heading font-bold text-xs transition-all flex items-center space-x-2 shrink-0 shadow-sm"
                    >
                      <Icons.RotateCcw />
                      <span>Retake Practice</span>
                    </button>
                  </div>

                  {/* Question Breakdown List */}
                  <div className="space-y-3">
                    <h3 className="font-heading text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-2">
                      <Icons.Target />
                      <span>Question Summary</span>
                    </h3>

                    <div className="space-y-3">
                      {questions.map((q, idx) => {
                        const ev = evaluations[idx];
                        return (
                          <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-heading font-bold text-emerald-700">Q{idx + 1}</span>
                                <span className="text-[10px] bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-medium">{q.category}</span>
                              </div>
                              <p className="text-xs text-slate-800 font-medium line-clamp-1">{q.question}</p>
                            </div>
                            <div className="flex items-center space-x-4 shrink-0">
                              <div className="text-right">
                                <span className="font-heading text-sm font-bold text-slate-900">{ev ? `${ev.score}/10` : 'N/A'}</span>
                                <span className="text-[10px] text-slate-500 block">Score</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Next Step */}
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-700">
                    <div>
                      <strong>Recommended Action:</strong> Save these focus areas to your 14-Day Student Preparation Roadmap.
                    </div>
                    <button
                      onClick={() => setActiveTab('roadmap')}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-heading font-bold rounded-xl transition-all shrink-0"
                    >
                      View Prep Roadmap
                    </button>
                  </div>

                </div>

              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 2: STUDENT DASHBOARD                                               */}
        {/* ========================================================================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Overall Match Score', val: '92%', sub: 'Top 5% Student Rank', color: 'bg-emerald-50 border-emerald-200 text-emerald-800', icon: <Icons.Target /> },
                { label: 'Resume ATS Score', val: '88 / 100', sub: 'Optimized for Tech Jobs', color: 'bg-teal-50 border-teal-200 text-teal-800', icon: <Icons.Sparkles /> },
                { label: 'Academic CGPA', val: '3.88 / 4.0', sub: 'Computer Science Senior', color: 'bg-slate-100 border-slate-200 text-slate-800', icon: <Icons.GraduationCap /> },
                { label: 'Mock Sessions', val: '14 Completed', sub: 'Avg. Score 8.4/10', color: 'bg-emerald-50 border-emerald-200 text-emerald-800', icon: <Icons.Mic /> }
              ].map((stat, i) => (
                <div key={i} className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-sm space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-xs text-slate-500 font-medium">{stat.label}</span>
                    <div className={`p-2 rounded-xl border ${stat.color}`}>{stat.icon}</div>
                  </div>
                  <div className="font-heading text-2xl font-black text-slate-900">{stat.val}</div>
                  <div className="text-xs text-emerald-700 font-medium">{stat.sub}</div>
                </div>
              ))}
            </div>

            {/* Matched Jobs + Skill Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div className="lg:col-span-2 bg-white border border-emerald-100 rounded-3xl p-6 space-y-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <h3 className="font-heading font-bold text-slate-900 text-base flex items-center space-x-2">
                    <Icons.Briefcase />
                    <span>Top Matched Student Openings</span>
                  </h3>
                  <button onClick={() => setActiveTab('jobs')} className="text-xs text-emerald-700 font-bold hover:underline">
                    View Directory
                  </button>
                </div>

                <div className="space-y-3">
                  {SAMPLE_JOBS.slice(0, 3).map((job) => (
                    <div key={job.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl p-2 bg-white rounded-xl border border-slate-200 shadow-sm">{job.logo}</span>
                        <div>
                          <h4 className="font-heading font-bold text-slate-900 text-sm">{job.role}</h4>
                          <p className="text-xs text-slate-500">{job.company} • {job.location}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 shrink-0">
                        <div className="text-right">
                          <span className="text-xs font-heading font-bold text-emerald-700 block">{job.matchScore}% Match</span>
                          <span className="text-[10px] text-slate-500">ATS: {job.atsScore}</span>
                        </div>
                        <button
                          onClick={() => handleLaunchPracticeForJob(job)}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-heading font-bold transition-all shadow-sm"
                        >
                          Practice
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-emerald-100 rounded-3xl p-6 space-y-4 shadow-sm">
                <h3 className="font-heading font-bold text-slate-900 text-base flex items-center space-x-2">
                  <Icons.Target />
                  <span>Verified Skill Progress</span>
                </h3>
                <div className="space-y-3.5 text-xs">
                  {[
                    { skill: 'React / Frontend Design', level: 92 },
                    { skill: 'Data Structures & Algorithms', level: 88 },
                    { skill: 'Node.js Backend APIs', level: 81 },
                    { skill: 'Python / ML Modeling', level: 76 }
                  ].map((s, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-slate-700 font-medium">
                        <span>{s.skill}</span>
                        <span className="font-heading font-bold text-emerald-700">{s.level}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${s.level}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 3: JOBS DIRECTORY                                                  */}
        {/* ========================================================================= */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-heading text-2xl font-extrabold text-slate-900">Student Placement Jobs Directory</h2>
              <p className="text-xs text-slate-500 font-medium">Filtered according to your resume, GPA, and verified skills</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SAMPLE_JOBS.map((job) => (
                <div key={job.id} className="bg-white border border-emerald-100 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl p-3 bg-slate-50 rounded-2xl border border-slate-200/80">{job.logo}</span>
                      <div>
                        <h3 className="font-heading font-bold text-slate-900 text-base">{job.role}</h3>
                        <p className="text-xs text-slate-500">{job.company} • {job.location}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-heading font-bold">
                      {job.matchScore}% Match
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.skillsReq.map((skill, idx) => (
                      <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">{job.salary}</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedJob(job);
                          setActiveTab('match');
                        }}
                        className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-heading font-bold rounded-xl transition-all"
                      >
                        Deep Dive
                      </button>
                      <button
                        onClick={() => handleLaunchPracticeForJob(job)}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-heading font-bold rounded-xl transition-all flex items-center space-x-1 shadow-sm"
                      >
                        <Icons.Mic />
                        <span>Practice</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 4: MATCH ANALYSIS DEEP DIVE                                        */}
        {/* ========================================================================= */}
        {activeTab === 'match' && selectedJob && (
          <div className="space-y-6">
            <div className="bg-white border border-emerald-100 rounded-3xl p-6 lg:p-8 space-y-6 shadow-sm">
              <div className="flex items-center space-x-4 border-b border-slate-100 pb-6">
                <span className="text-4xl p-3 bg-slate-50 rounded-2xl border border-slate-200">{selectedJob.logo}</span>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900">Match Analysis: {selectedJob.role}</h2>
                  <p className="text-xs text-slate-500">{selectedJob.company} • {selectedJob.location}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-5 space-y-3">
                  <h3 className="text-emerald-800 font-heading font-bold text-sm flex items-center space-x-2">
                    <Icons.CheckCircle />
                    <span>Matched Resume Skills</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Node.js', 'Data Structures'].map((s, i) => (
                      <span key={i} className="text-xs bg-white text-emerald-800 border border-emerald-200 px-3 py-1 rounded-xl font-medium">
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-5 space-y-3">
                  <h3 className="text-amber-800 font-heading font-bold text-sm flex items-center space-x-2">
                    <Icons.AlertTriangle />
                    <span>Recommended Skills to Highlight</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['System Design', 'Kubernetes'].map((s, i) => (
                      <span key={i} className="text-xs bg-white text-amber-800 border border-amber-200 px-3 py-1 rounded-xl font-medium">
                        + {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => handleLaunchPracticeForJob(selectedJob)}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-heading font-bold rounded-2xl shadow-md transition-all flex items-center space-x-2"
                >
                  <Icons.Mic />
                  <span>Launch Custom Interview Practice for this Job</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 5: 14-DAY PREPARATION ROADMAP                                      */}
        {/* ========================================================================= */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            <div className="bg-white border border-emerald-100 rounded-3xl p-6 lg:p-8 space-y-6 shadow-sm">
              
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="font-heading text-2xl font-extrabold text-slate-900">14-Day Placement Prep Timeline</h2>
                  <p className="text-xs text-slate-500 font-medium mt-1">Interactive step-by-step daily objectives tailored by role</p>
                </div>

                {/* Role Switcher Pills */}
                <div className="flex flex-wrap gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80">
                  {TARGET_ROLES.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => setRoadmapRole(role.name)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-heading font-bold transition-all flex items-center space-x-1.5 ${
                        roadmapRole === role.name
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-slate-600 hover:text-emerald-700 hover:bg-white/60'
                      }`}
                    >
                      <span>{role.icon}</span>
                      <span>{role.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress Summary Card for Active Role */}
              {(() => {
                const phases = ROADMAP_DATA[roadmapRole] || [];
                const allTasks = phases.flatMap(p => p.tasks);
                const completedCount = allTasks.filter(t => completedTasks[t.id]).length;
                const totalCount = allTasks.length;
                const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

                return (
                  <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-950 text-white p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
                    <div className="space-y-1 w-full md:w-auto">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-heading font-bold text-emerald-400 uppercase tracking-wider">
                          Active Role Plan: {roadmapRole}
                        </span>
                        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] px-2 py-0.5 rounded-full font-bold">
                          {completedCount} of {totalCount} Objectives Done
                        </span>
                      </div>
                      <div className="text-sm font-medium text-slate-200">
                        Track your step-by-step progress towards placement readiness.
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 w-full md:w-auto shrink-0 justify-between md:justify-end">
                      <div className="w-36 sm:w-48 bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700">
                        <div
                          className="bg-gradient-to-r from-emerald-400 to-teal-300 h-full transition-all duration-300"
                          style={{ width: `${progressPct}%` }}
                        ></div>
                      </div>
                      <span className="font-heading font-extrabold text-xl text-emerald-300 min-w-[3rem] text-right">
                        {progressPct}%
                      </span>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => markAllTasksForRole(roadmapRole, true)}
                          className="px-2.5 py-1.5 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-lg text-[11px] font-heading font-bold transition-all"
                          title="Mark all items complete"
                        >
                          Check All
                        </button>
                        <button
                          onClick={() => markAllTasksForRole(roadmapRole, false)}
                          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] font-heading font-bold transition-all border border-slate-700"
                          title="Reset role checklist"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Step-by-step Daily Phases List */}
              <div className="space-y-4">
                {(ROADMAP_DATA[roadmapRole] || []).map((phase, pIdx) => {
                  const phaseCompleted = phase.tasks.every(t => completedTasks[t.id]);
                  return (
                    <div
                      key={pIdx}
                      className={`border rounded-2xl p-5 transition-all space-y-3 ${
                        phaseCompleted
                          ? 'bg-emerald-50/40 border-emerald-200'
                          : 'bg-slate-50/60 border-slate-200'
                      }`}
                    >
                      {/* Phase Title Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className={`px-2.5 py-1 rounded-xl text-xs font-heading font-bold border ${
                            phaseCompleted
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          }`}>
                            {phase.phase}
                          </span>
                          <h4 className="font-heading font-bold text-slate-900 text-sm">
                            {phase.title}
                          </h4>
                        </div>
                        {phaseCompleted && (
                          <span className="text-xs text-emerald-700 font-heading font-bold flex items-center space-x-1">
                            <Icons.CheckCircle />
                            <span>Phase Complete</span>
                          </span>
                        )}
                      </div>

                      {/* Interactive Task Checkboxes */}
                      <div className="space-y-2 pt-1">
                        {phase.tasks.map((task) => {
                          const isDone = !!completedTasks[task.id];
                          return (
                            <label
                              key={task.id}
                              onClick={() => toggleTask(task.id)}
                              className={`flex items-start space-x-3 p-3 rounded-xl border cursor-pointer transition-all ${
                                isDone
                                  ? 'bg-white border-emerald-200/80 shadow-2xs'
                                  : 'bg-white/80 border-slate-200/70 hover:border-emerald-300'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isDone}
                                onChange={() => {}} // Handled by parent label click
                                className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 accent-emerald-600"
                              />
                              <span className={`text-xs leading-relaxed font-medium transition-all ${
                                isDone ? 'line-through text-slate-400' : 'text-slate-800'
                              }`}>
                                {task.label}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/80 bg-white py-6 text-center text-xs text-slate-500 font-medium">
        CareerMatch • Student Interview Preparation Platform
      </footer>

    </div>
  );
}