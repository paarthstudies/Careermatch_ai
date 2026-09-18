import type { RoadmapPhase } from '../types';

export const ROADMAP_DATA: Record<string, RoadmapPhase[]> = {
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
