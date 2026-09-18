export const MOCK_QUESTION_BANK: Record<string, Array<{question: string; category: string; hint: string; idealAnswerSample: string}>> = {
  'Software Engineer': [
    {
      question: "How would you design an efficient caching system for a high-throughput REST API to minimize database load?",
      category: 'System Design',
      hint: 'Mention cache invalidation strategies (TTL, LRU), Redis/Memcached, and Cache-Aside vs Write-Through patterns.',
      idealAnswerSample: 'I would use a distributed key-value store like Redis using the Cache-Aside pattern. For fast reads, the API checks Redis first; on miss, it queries PostgreSQL, populates Redis with an appropriate TTL (e.g. 1 hour), and returns the payload. To maintain consistency on updates, I would implement explicit cache invalidation.'
    },
    {
      question: 'Explain the difference between optimistic and pessimistic locking in database transactions, and when to use each.',
      category: 'Database Concepts',
      hint: 'Optimistic locking uses version numbers/timestamps without locking rows; pessimistic locking locks records upfront.',
      idealAnswerSample: 'Optimistic locking assumes collisions are rare and verifies record version numbers before committing. It is ideal for read-heavy applications. Pessimistic locking acquires explicit database locks, preventing concurrent modifications entirely.'
    },
    {
      question: 'Describe a complex technical bug you encountered recently and walk me through your step-by-step debugging workflow.',
      category: 'Behavioral / Problem Solving',
      hint: 'Use the STAR approach: Situation, Task, Action (tools used, isolation steps), Result (resolution and metrics).',
      idealAnswerSample: 'In my recent project, production users experienced memory leaks. Task: Identify root cause without downtime. Action: I collected heap snapshots, isolated an unhandled event listener retention pattern, and refactored the component teardown hooks. Result: Reduced memory footprint by 42%.'
    },
    {
      question: "How do React's virtual DOM reconciliation and keys mechanism optimize rendering performance?",
      category: 'Frontend Architecture',
      hint: 'Discuss the Diffing algorithm, O(n) complexity heuristics, fiber trees, and stability of unique array keys.',
      idealAnswerSample: 'React creates a lightweight in-memory snapshot of the UI. During state updates, it generates a new Virtual DOM tree and runs a diffing algorithm comparing it to the previous tree. Stable keys allow React to identify moved or updated items in O(n) time.'
    },
    {
      question: 'How do you ensure web application security against SQL Injection and Cross-Site Scripting (XSS)?',
      category: 'Security Best Practices',
      hint: 'Mention parameterized queries/ORMs, Content Security Policy (CSP), HTML escaping, and sanitized input validation.',
      idealAnswerSample: 'To prevent SQL Injection, I strictly enforce parameterized queries via modern ORMs and avoid raw string concatenation. Against XSS, I utilize automatic DOM sanitization, React default escaping, and Content Security Policies.'
    }
  ],
  'AI/ML Intern': [
    {
      question: 'Explain the Bias-Variance tradeoff and how regularization techniques (L1/L2) mitigate overfitting.',
      category: 'Machine Learning Fundamentals',
      hint: 'High bias leads to underfitting; high variance leads to overfitting. L1 (Lasso) promotes sparsity; L2 (Ridge) penalizes large weights.',
      idealAnswerSample: 'Bias represents errors from overly simplistic assumptions, while variance is sensitivity to small fluctuations in training data. L1 regularization adds absolute weight penalties to drive irrelevant features to zero, while L2 adds squared penalties to constrain coefficient magnitudes.'
    },
    {
      question: 'How does the Self-Attention mechanism work in Transformer architectures like BERT or GPT?',
      category: 'Deep Learning & NLP',
      hint: 'Explain Query, Key, and Value vectors, scaled dot-product attention formula, and positional encodings.',
      idealAnswerSample: 'Self-attention computes dynamic weights representing relationships between all tokens in a sequence regardless of distance. Input vectors map into Query, Key, and Value projections. Attention scores are calculated using Softmax((Q * K^T) / sqrt(d_k)) * V.'
    }
  ]
};
