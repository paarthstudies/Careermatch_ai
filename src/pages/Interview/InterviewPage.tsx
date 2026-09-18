import { Icons } from '../../components/common/Icons';
import type { Difficulty, EvaluationResult, FocusArea, InterviewPhase } from '../../types';

const difficultyOptions: Difficulty[] = ['Entry / Junior', 'Mid-Level', 'Senior / Hard'];
const focusOptions: FocusArea[] = ['Technical & System Architecture', 'Behavioral STAR Method', 'Mixed Balanced Session'];

type InterviewPageProps = {
  interview: {
    interviewPhase: InterviewPhase;
    selectedRole: string;
    selectedDifficulty: Difficulty;
    selectedFocus: FocusArea;
    questions: Array<{ id: string; question: string; category: string; hint: string; idealAnswerSample: string }>;
    currentQuestionIdx: number;
    userAnswers: string[];
    evaluations: Array<EvaluationResult | null>;
    showHint: boolean;
    isGenerating: boolean;
    isEvaluating: boolean;
    isRecording: boolean;
    recordTimer: number;
    setSelectedRole: (value: string) => void;
    setSelectedDifficulty: (value: Difficulty) => void;
    setSelectedFocus: (value: FocusArea) => void;
    setShowHint: (value: boolean) => void;
    startInterview: () => Promise<void>;
    updateAnswer: (value: string) => void;
    autofillSampleResponse: () => void;
    submitAnswer: () => Promise<void>;
    nextQuestion: () => void;
    toggleRecording: () => void;
    getAverageScore: () => string;
  };
};

export function InterviewPage({ interview }: InterviewPageProps) {
  const currentQuestion = interview.questions[interview.currentQuestionIdx];
  const currentEvaluation = interview.evaluations[interview.currentQuestionIdx];

  if (interview.interviewPhase === 'setup') {
    return (
      <div className="page-shell interview-page">
        <div className="panel setup-panel">
          <div className="setup-header">
            <span className="pill"><Icons.Sparkles className="w-4 h-4" /> Real-time AI Interview Simulator</span>
            <h1>Configure Your Interactive Studio</h1>
            <p>Select your target job role, experience level, and preferred interview focus. Gemini AI will generate 5 customized practice questions and deliver instant, constructive feedback.</p>
          </div>

          <div className="field-block">
            <label><Icons.Briefcase className="w-4 h-4" /> Select Target Job Role</label>
            <div className="option-grid role-grid">
              {[
                { id: 'swe', name: 'Software Engineer', dept: 'Engineering', icon: '💻', keySkills: ['Data Structures', 'System Design', 'React'] },
                { id: 'aiml', name: 'AI/ML Intern', dept: 'AI Research', icon: '🤖', keySkills: ['Python', 'PyTorch', 'NLP'] },
                { id: 'da', name: 'Data Analyst', dept: 'Analytics', icon: '📊', keySkills: ['SQL', 'Tableau', 'Statistics'] },
                { id: 'be', name: 'Backend Developer', dept: 'Cloud & Infrastructure', icon: '⚙️', keySkills: ['Node.js', 'PostgreSQL', 'Redis'] },
                { id: 'ba', name: 'Business Analyst', dept: 'Strategy & Ops', icon: '📈', keySkills: ['Agile', 'SQL', 'Strategy'] }
              ].map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => interview.setSelectedRole(role.name)}
                  className={`option-card ${interview.selectedRole === role.name ? 'selected' : ''}`}
                >
                  <div className="option-row">
                    <span className="role-emoji">{role.icon}</span>
                    <span className="dept-tag">{role.dept}</span>
                  </div>
                  <h3>{role.name}</h3>
                  <div className="chip-row small">
                    {role.keySkills.map((skill) => <span key={skill} className="chip">{skill}</span>)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="multi-column-grid">
            <div className="field-block">
              <label><Icons.Target className="w-4 h-4" /> Select Experience Difficulty</label>
              <div className="option-stack">
                {difficultyOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => interview.setSelectedDifficulty(option)}
                    className={`option-button ${interview.selectedDifficulty === option ? 'selected' : ''}`}
                  >
                    <span>{option}</span>
                    {interview.selectedDifficulty === option && <Icons.CheckCircle className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="field-block">
              <label><Icons.Brain className="w-4 h-4" /> Question Focus Area</label>
              <div className="option-stack">
                {focusOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => interview.setSelectedFocus(option)}
                    className={`option-button ${interview.selectedFocus === option ? 'selected' : ''}`}
                  >
                    <span>{option}</span>
                    {interview.selectedFocus === option && <Icons.CheckCircle className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="setup-footer">
            <span className="status-dot" /> Ready to launch 5 interactive questions
            <button type="button" onClick={() => interview.startInterview()} disabled={interview.isGenerating} className="primary-button">
              {interview.isGenerating ? (
                <>
                  <div className="spinner" />
                  <span>Generating AI Questions...</span>
                </>
              ) : (
                <>
                  <Icons.Sparkles className="w-4 h-4" />
                  <span>Start Practice Session (5 Questions)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if ((interview.interviewPhase === 'active' || interview.interviewPhase === 'evaluating') && currentQuestion) {
    return (
      <div className="page-shell interview-page">
        <div className="interview-shell">
          <div className="interview-topbar">
            <span className="pill">Question {interview.currentQuestionIdx + 1} of 5</span>
            <span className="plain-note">Target: <strong>{interview.selectedRole}</strong> ({interview.selectedDifficulty})</span>
            <div className="progress-meter"><span style={{ width: `${((interview.currentQuestionIdx + 1) / 5) * 100}%` }} /></div>
          </div>

          <div className="panel question-panel">
            <div className="question-header">
              <span className="category-tag">Category: {currentQuestion.category}</span>
              <button type="button" onClick={() => interview.setShowHint(!interview.showHint)} className="hint-button">
                <Icons.Lightbulb className="w-4 h-4" />
                <span>{interview.showHint ? 'Hide Hint' : 'Student Hint'}</span>
              </button>
            </div>

            <h2>{currentQuestion.question}</h2>

            {interview.showHint && (
              <div className="hint-box">
                <div className="hint-title"><Icons.Lightbulb className="w-4 h-4" /> Recommended Key Angles</div>
                <p>{currentQuestion.hint}</p>
              </div>
            )}

            <div className="field-block">
              <div className="answer-header">
                <label>Your Answer (Verbatim or Voice Input)</label>
                <button type="button" className="text-link" onClick={interview.autofillSampleResponse}>✨ Fill Sample Response for Demo</button>
              </div>

              <div className="textarea-wrap">
                <textarea
                  value={interview.userAnswers[interview.currentQuestionIdx]}
                  onChange={(event) => interview.updateAnswer(event.target.value)}
                  rows={6}
                  placeholder="Structure your answer clearly (Context, Action, Metrics, Result)..."
                />

                {interview.isRecording && (
                  <div className="voice-overlay">
                    <div className="voice-bars">
                      {[40, 70, 30, 90, 60, 100, 50, 80, 40, 90, 60].map((height, index) => (
                        <div key={index} className="voice-bar" style={{ height: `${height}%`, animationDelay: `${index * 0.1}s` }} />
                      ))}
                    </div>
                    <div className="voice-copy">Simulating Voice Input Capture...</div>
                    <div className="voice-detail">Duration: <strong>{interview.recordTimer}s</strong> • Speak into your microphone</div>
                    <button type="button" onClick={interview.toggleRecording} className="danger-button">Stop Recording & Insert Text</button>
                  </div>
                )}
              </div>

              <div className="answer-actions">
                <button type="button" className={`voice-button ${interview.isRecording ? 'recording' : ''}`} onClick={interview.toggleRecording}>
                  {interview.isRecording ? <Icons.MicOff className="w-4 h-4" /> : <Icons.Mic className="w-4 h-4" />}
                  <span>{interview.isRecording ? 'Stop Recording' : 'Simulate Voice Recording'}</span>
                </button>
                <span className="word-counter">Word Count: <strong>{interview.userAnswers[interview.currentQuestionIdx].trim().split(/\s+/).filter(Boolean).length}</strong></span>
              </div>
            </div>

            <div className="submit-row">
              <button type="button" onClick={() => interview.submitAnswer()} disabled={interview.isEvaluating || interview.userAnswers[interview.currentQuestionIdx].trim().length < 5} className="primary-button">
                {interview.isEvaluating ? (
                  <>
                    <div className="spinner small" />
                    <span>Evaluating Answer...</span>
                  </>
                ) : (
                  <>
                    <span>Submit & Analyze Response</span>
                    <Icons.ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (interview.interviewPhase === 'result' && currentEvaluation) {
    return (
      <div className="page-shell interview-page">
        <div className="panel results-panel">
          <div className="score-header">
            <div className="score-ring">
              <svg viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" style={{ strokeDasharray: `${currentEvaluation.score * 10}, 100` }} />
              </svg>
              <div className="score-label"><strong>{currentEvaluation.score}</strong><span>/10</span></div>
            </div>

            <div>
              <div className="result-badge">{currentEvaluation.score >= 8 ? 'Strong Performance' : 'Satisfactory Response'}</div>
              <h2>{currentQuestion.category}</h2>
              <p>Benchmarked for student applicants</p>
            </div>
            <div className="metric-grid">
              {[
                { label: 'Technical Acc.', val: currentEvaluation.metrics.accuracy },
                { label: 'Structure', val: currentEvaluation.metrics.structure },
                { label: 'Relevance', val: currentEvaluation.metrics.relevance },
              ].map((metric) => (
                <div key={metric.label} className="metric-box">
                  <span>{metric.val}%</span>
                  <small>{metric.label}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="two-column-grid">
            <div className="info-card success-card">
              <h3><Icons.CheckCircle className="w-4 h-4" /> Key Strengths</h3>
              <ul>
                {currentEvaluation.strengths.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="info-card warning-card">
              <h3><Icons.AlertTriangle className="w-4 h-4" /> Areas to Enhance</h3>
              <ul>
                {currentEvaluation.improvements.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>

          <div className="suggested-answer-box">
            <div className="suggested-header"><Icons.Lightbulb className="w-4 h-4" /> Model Answer Concept</div>
            <p>“{currentEvaluation.suggestedAnswer}”</p>
          </div>

          <div className="submit-row result-footer">
            <span>Question {interview.currentQuestionIdx + 1} reviewed</span>
            <button type="button" onClick={interview.nextQuestion} className="primary-button">
              <span>{interview.currentQuestionIdx < 4 ? 'Proceed to Next Question' : 'View Full Scorecard'}</span>
              <Icons.ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (interview.interviewPhase === 'summary') {
    return (
      <div className="page-shell interview-page">
        <div className="panel summary-panel">
          <div className="summary-header">
            <span className="pill"><Icons.Award className="w-4 h-4" /> Practice Session Completed</span>
            <h2>Overall Interview Report</h2>
            <p>Candidate: Alex Chen • Role: {interview.selectedRole} ({interview.selectedDifficulty})</p>
          </div>

          <div className="score-banner">
            <div className="score-box">
              <span className="big-score">{interview.getAverageScore()}</span>
              <small>/ 10 Score</small>
            </div>
            <div>
              <h3>{Number(interview.getAverageScore()) >= 8 ? '🔥 Campus Placement Ready!' : '📈 Solid Foundational Readiness'}</h3>
              <p>Great demonstration of technical vocabulary. Focus on the actionable steps below to refine concise delivery during actual interviews.</p>
            </div>
            <button type="button" onClick={() => interview.startInterview()} className="secondary-button">Retake Practice</button>
          </div>

          <div className="question-summary-list">
            {interview.questions.map((question, index) => {
              const ev = interview.evaluations[index];
              return (
                <div key={question.id} className="summary-row">
                  <div>
                    <div className="summary-meta"><span>Q{index + 1}</span><small>{question.category}</small></div>
                    <p>{question.question}</p>
                  </div>
                  <div className="summary-score">{ev ? `${ev.score}/10` : 'N/A'}</div>
                </div>
              );
            })}
          </div>

          <div className="summary-callout">
            <span><strong>Recommended Action:</strong> Save these focus areas to your 14-Day Student Preparation Roadmap.</span>
            <button type="button" onClick={() => (window as Window & { location?: { href?: string } }).location = { href: '#roadmap' } as any} className="primary-button small">View Prep Roadmap</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
