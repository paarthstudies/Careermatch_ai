import { useState, useEffect, useRef } from 'react';
import type { Difficulty, EvaluationResult, FocusArea, InterviewPhase, QuestionItem, TabId } from '../types';
import { TARGET_ROLES } from '../data/roles';
import { ROADMAP_DATA } from '../data/roadmap';
import { callGeminiAPI, fallbackEvaluateAnswer, generateFallbackQuestions, parseEvaluationResult, parseGeneratedQuestionArray } from '../services/gemini/geminiService';

export function useInterview() {
  const [interviewPhase, setInterviewPhase] = useState<InterviewPhase>('setup');
  const [selectedRole, setSelectedRole] = useState(TARGET_ROLES[0].name);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Mid-Level');
  const [selectedFocus, setSelectedFocus] = useState<FocusArea>('Technical & System Architecture');
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>(['', '', '', '', '']);
  const [evaluations, setEvaluations] = useState<Array<EvaluationResult | null>>([null, null, null, null, null]);
  const [showHint, setShowHint] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordTimer, setRecordTimer] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = window.setInterval(() => {
        setRecordTimer((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) window.clearInterval(timerRef.current);
      setRecordTimer(0);
    }

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const startInterview = async () => {
    setIsGenerating(true);
    setInterviewPhase('setup');

    const prompt = `Generate exactly 5 high-quality interview questions for a candidate applying for "${selectedRole}" at "${selectedDifficulty}" level focusing on "${selectedFocus}". Return a JSON array.`;
    const schema = {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          question: { type: 'STRING' },
          category: { type: 'STRING' },
          hint: { type: 'STRING' },
          idealAnswerSample: { type: 'STRING' }
        },
        required: ['question', 'category', 'hint', 'idealAnswerSample']
      }
    };

    const apiResultText = await callGeminiAPI(prompt, 'You are a senior hiring manager.', schema);
    let generatedQs = apiResultText ? parseGeneratedQuestionArray(apiResultText, selectedRole, selectedDifficulty) : [];

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

  const updateAnswer = (value: string) => {
    const updated = [...userAnswers];
    updated[currentQuestionIdx] = value;
    setUserAnswers(updated);
  };

  const autofillSampleResponse = () => {
    const question = questions[currentQuestionIdx];
    if (!question) return;
    const sampleText = question.idealAnswerSample || 'In my previous project, I solved a key bottleneck by analyzing query execution plans, introducing indexed caching layers, and running stress tests to ensure stable performance under load.';
    updateAnswer(sampleText);
  };

  const submitAnswer = async () => {
    const currentAnswer = userAnswers[currentQuestionIdx];
    if (!currentAnswer || currentAnswer.trim().length < 5) return;

    setIsEvaluating(true);
    setInterviewPhase('evaluating');

    const question = questions[currentQuestionIdx];
    const prompt = `Evaluate the candidate's answer for Role: ${selectedRole}. Question: "${question.question}". Answer: "${currentAnswer}". Return a JSON object with score (0-10), metrics (accuracy, structure, relevance), strengths, improvements, suggestedAnswer.`;
    const schema = {
      type: 'OBJECT',
      properties: {
        score: { type: 'NUMBER' },
        metrics: {
          type: 'OBJECT',
          properties: {
            accuracy: { type: 'NUMBER' },
            structure: { type: 'NUMBER' },
            relevance: { type: 'NUMBER' }
          },
          required: ['accuracy', 'structure', 'relevance']
        },
        strengths: { type: 'ARRAY', items: { type: 'STRING' } },
        improvements: { type: 'ARRAY', items: { type: 'STRING' } },
        suggestedAnswer: { type: 'STRING' }
      },
      required: ['score', 'metrics', 'strengths', 'improvements', 'suggestedAnswer']
    };

    const rawResult = await callGeminiAPI(prompt, 'You are an encouraging, expert tech interviewer.', schema);
    const fallbackEvaluation = fallbackEvaluateAnswer(question.question, currentAnswer, selectedFocus);
    if (question.idealAnswerSample) fallbackEvaluation.suggestedAnswer = question.idealAnswerSample;

    const evalResult = rawResult ? parseEvaluationResult(rawResult, fallbackEvaluation) : fallbackEvaluation;
    const updatedEvals = [...evaluations];
    updatedEvals[currentQuestionIdx] = evalResult;
    setEvaluations(updatedEvals);
    setIsEvaluating(false);
    setInterviewPhase('result');
  };

  const nextQuestion = () => {
    setShowHint(false);
    if (currentQuestionIdx < 4) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setInterviewPhase('active');
    } else {
      setInterviewPhase('summary');
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      if (!userAnswers[currentQuestionIdx]) {
        const simulatedVoiceText = 'To ensure system reliability under peak demand, I decouple queue processing using message brokers like RabbitMQ or Kafka, keeping latency consistently low for core HTTP request handlers.';
        updateAnswer(simulatedVoiceText);
      }
    } else {
      setIsRecording(true);
    }
  };

  const getAverageScore = () => {
    const validScores = evaluations.filter(Boolean).map((evaluation) => evaluation!.score);
    if (validScores.length === 0) return '0.0';
    const sum = validScores.reduce((total, score) => total + score, 0);
    return (sum / validScores.length).toFixed(1);
  };

  return {
    interviewPhase,
    selectedRole,
    selectedDifficulty,
    selectedFocus,
    questions,
    currentQuestionIdx,
    userAnswers,
    evaluations,
    showHint,
    isGenerating,
    isEvaluating,
    isRecording,
    recordTimer,
    setSelectedRole,
    setSelectedDifficulty,
    setSelectedFocus,
    setInterviewPhase,
    setShowHint,
    startInterview,
    updateAnswer,
    autofillSampleResponse,
    submitAnswer,
    nextQuestion,
    toggleRecording,
    getAverageScore,
  };
}
