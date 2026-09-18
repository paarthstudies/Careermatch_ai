import type { EvaluationResult, QuestionItem } from '../../types';
import { MOCK_QUESTION_BANK } from '../../data/questions';

const API_KEY = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env?.VITE_GEMINI_API_KEY || '';

export async function callGeminiAPI(
  prompt: string,
  systemInstruction = '',
  responseSchema?: object | null,
): Promise<string | null> {
  if (!API_KEY) {
    return null;
  }

  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
    const payload: Record<string, unknown> = {
      contents: [{ parts: [{ text: prompt }] }],
      ...(systemInstruction ? { systemInstruction: { parts: [{ text: systemInstruction }] } } : {}),
    };

    if (responseSchema) {
      payload.generationConfig = {
        responseMimeType: 'application/json',
        responseSchema,
      };
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API status: ${response.status}`);
    }

    const result = await response.json();
    return result.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (error) {
    console.warn('Gemini API connection unfulfilled, defaulting to local intelligent engine:', error);
    return null;
  }
}

export function generateFallbackQuestions(role: string, difficulty: string, focus: string): QuestionItem[] {
  const bank = MOCK_QUESTION_BANK[role] || MOCK_QUESTION_BANK['Software Engineer'];
  return bank.map((q, idx) => ({
    id: `q-${idx + 1}`,
    question: `[${difficulty}] ${q.question}`,
    category: q.category,
    hint: q.hint,
    idealAnswerSample: q.idealAnswerSample,
  }));
}

export function fallbackEvaluateAnswer(questionText: string, answerText: string, focus: string): EvaluationResult {
  const wordCount = answerText.trim().split(/\s+/).filter(Boolean).length;
  let score = 5.5;
  let accuracy = 65;
  let structure = 60;
  let relevance = 65;

  if (wordCount > 30) {
    score += 1.8;
    accuracy += 15;
    structure += 20;
    relevance += 15;
  }
  if (wordCount > 70) {
    score += 1.5;
    accuracy += 12;
    structure += 15;
    relevance += 15;
  }

  const keywords = ['for example', 'firstly', 'because', 'result', 'system', 'data', 'using', 'optimized', 'architecture'];
  const matchedKw = keywords.filter((keyword) => answerText.toLowerCase().includes(keyword));
  score += Math.min(matchedKw.length * 0.3, 1.2);

  score = Math.min(Math.max(parseFloat(score.toFixed(1)), 4.5), 9.8);
  accuracy = Math.min(Math.round(accuracy + score * 2), 98);
  structure = Math.min(Math.round(structure + score * 2), 96);
  relevance = Math.min(Math.round(relevance + score * 2.2), 99);

  return {
    score,
    metrics: { accuracy, structure, relevance },
    strengths: [
      `Clear, structured response (${wordCount} words analyzed).`,
      matchedKw.length > 0 ? 'Effective use of core technical terminology.' : 'Demonstrated foundational knowledge of key principles.'
    ],
    improvements: [
      wordCount < 60 ? 'Expand your answer using the STAR method for maximum clarity.' : 'Add quantitative metrics or benchmarks.',
      'Highlight explicit technical trade-offs.'
    ],
    suggestedAnswer: 'A high-scoring answer establishes clear context, methodical technical steps, measurable metrics, and key architectural trade-offs.'
  };
}

export function parseGeneratedQuestionArray(raw: string, fallbackRole: string, fallbackDifficulty: string): QuestionItem[] {
  try {
    const parsed = JSON.parse(raw);
    const generated = Array.isArray(parsed) ? parsed : [];
    return generated.slice(0, 5).map((item, idx) => ({
      id: `q-api-${idx + 1}`,
      question: item.question || 'Describe your approach to a real-world challenge in this role.',
      category: item.category || 'Technical',
      hint: item.hint || 'Focus on clear structure and technical accuracy.',
      idealAnswerSample: item.idealAnswerSample || 'A top response highlights context, action, and results.',
    }));
  } catch {
    return generateFallbackQuestions(fallbackRole, fallbackDifficulty, 'Technical & System Architecture');
  }
}

export function parseEvaluationResult(raw: string, fallback: EvaluationResult): EvaluationResult {
  try {
    const parsed = JSON.parse(raw);
    return {
      score: Number(parsed.score ?? fallback.score),
      metrics: {
        accuracy: Number(parsed.metrics?.accuracy ?? fallback.metrics.accuracy),
        structure: Number(parsed.metrics?.structure ?? fallback.metrics.structure),
        relevance: Number(parsed.metrics?.relevance ?? fallback.metrics.relevance),
      },
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : fallback.strengths,
      improvements: Array.isArray(parsed.improvements) ? parsed.improvements : fallback.improvements,
      suggestedAnswer: String(parsed.suggestedAnswer ?? fallback.suggestedAnswer),
    };
  } catch {
    return fallback;
  }
}
