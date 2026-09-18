import { useMemo, useState } from 'react';
import { AppShell } from './components/layout/AppShell';
import { LoginPage } from './pages/Login/LoginPage';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { JobsPage } from './pages/Jobs/JobsPage';
import { MatchAnalysisPage } from './pages/MatchAnalysis/MatchAnalysisPage';
import { RoadmapPage } from './pages/Roadmap/RoadmapPage';
import { InterviewPage } from './pages/Interview/InterviewPage';
import { TARGET_ROLES } from './data/roles';
import { SAMPLE_JOBS } from './data/jobs';
import { useInterview } from './hooks/useInterview';
import type { JobItem, TabId } from './types';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<TabId>('interview');
  const [selectedJob, setSelectedJob] = useState<JobItem>(SAMPLE_JOBS[0]);
  const [roadmapRole, setRoadmapRole] = useState(TARGET_ROLES[0].name);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({
    'swe-d1-1': true,
    'swe-d1-2': true,
    'swe-d2-1': true,
    'aiml-d1-1': true,
  });

  const interviewState = useInterview();

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const markAllTasksForRole = (roleName: string, status: boolean) => {
    const rolePhases = interviewState.questions.length > 0 ? [] : [];
    const newCompleted = { ...completedTasks };
    // Keeps roadmap logic functional without duplicating the data; the role-specific roadmap data remains in the page component.
    const roadmapEntries = roleName === 'Software Engineer' ? [
      'swe-d1-1', 'swe-d1-2', 'swe-d1-3', 'swe-d2-1', 'swe-d2-2', 'swe-d2-3', 'swe-d3-1', 'swe-d3-2', 'swe-d3-3', 'swe-d4-1', 'swe-d4-2', 'swe-d4-3', 'swe-d5-1', 'swe-d5-2'
    ] : roleName === 'AI/ML Intern' ? [
      'aiml-d1-1', 'aiml-d1-2', 'aiml-d1-3', 'aiml-d2-1', 'aiml-d2-2', 'aiml-d2-3', 'aiml-d3-1', 'aiml-d3-2', 'aiml-d3-3', 'aiml-d4-1', 'aiml-d4-2', 'aiml-d5-1', 'aiml-d5-2'
    ] : roleName === 'Data Analyst' ? [
      'da-d1-1', 'da-d1-2', 'da-d1-3', 'da-d2-1', 'da-d2-2', 'da-d2-3', 'da-d3-1', 'da-d3-2', 'da-d3-3', 'da-d4-1', 'da-d4-2', 'da-d5-1', 'da-d5-2'
    ] : roleName === 'Backend Developer' ? [
      'be-d1-1', 'be-d1-2', 'be-d1-3', 'be-d2-1', 'be-d2-2', 'be-d2-3', 'be-d3-1', 'be-d3-2', 'be-d3-3', 'be-d4-1', 'be-d4-2', 'be-d5-1', 'be-d5-2'
    ] : [
      'ba-d1-1', 'ba-d1-2', 'ba-d1-3', 'ba-d2-1', 'ba-d2-2', 'ba-d2-3', 'ba-d3-1', 'ba-d3-2', 'ba-d3-3', 'ba-d4-1', 'ba-d4-2', 'ba-d5-1', 'ba-d5-2'
    ];

    roadmapEntries.forEach((taskId) => {
      newCompleted[taskId] = status;
    });
    setCompletedTasks(newCompleted);
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    setLoginPassword('');
    setLoginUsername('');
    setLoginError('');
  };

  const handleLaunchPracticeForJob = (job: JobItem) => {
    interviewState.setSelectedRole(job.role);
    interviewState.setSelectedDifficulty(job.difficulty);
    setActiveTab('interview');
    interviewState.setInterviewPhase('setup');
  };

  const currentPage = useMemo(() => {
    if (activeTab === 'dashboard') {
      return <DashboardPage onLaunchPracticeForJob={handleLaunchPracticeForJob} onOpenJobs={() => setActiveTab('jobs')} />;
    }
    if (activeTab === 'jobs') {
      return <JobsPage jobs={SAMPLE_JOBS} onSelectJob={(job) => { setSelectedJob(job); setActiveTab('match'); }} onLaunchPracticeForJob={handleLaunchPracticeForJob} />;
    }
    if (activeTab === 'match') {
      return <MatchAnalysisPage selectedJob={selectedJob} onLaunchPracticeForJob={handleLaunchPracticeForJob} />;
    }
    if (activeTab === 'roadmap') {
      return <RoadmapPage roadmapRole={roadmapRole} setRoadmapRole={setRoadmapRole} completedTasks={completedTasks} toggleTask={toggleTask} markAllTasksForRole={markAllTasksForRole} />;
    }
    return <InterviewPage interview={interviewState} />;
  }, [activeTab, completedTasks, interviewState, roadmapRole, selectedJob]);

  if (!isAuthenticated) {
    return (
      <LoginPage
        loginUsername={loginUsername}
        loginPassword={loginPassword}
        loginError={loginError}
        onUsernameChange={setLoginUsername}
        onPasswordChange={setLoginPassword}
        onSubmit={handleLogin}
        onQuickFill={handleQuickFill}
      />
    );
  }

  return (
    <AppShell activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} username={loginUsername || 'myself123'}>
      {currentPage}
    </AppShell>
  );
}
