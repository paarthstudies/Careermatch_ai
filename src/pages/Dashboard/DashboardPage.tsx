import { Icons } from '../../components/common/Icons';
import { SAMPLE_JOBS } from '../../data/jobs';

type DashboardPageProps = {
  onLaunchPracticeForJob: (job: (typeof SAMPLE_JOBS)[number]) => void;
  onOpenJobs: () => void;
};

export function DashboardPage({ onLaunchPracticeForJob, onOpenJobs }: DashboardPageProps) {
  return (
    <div className="page-shell dashboard-page">
      <div className="stats-grid">
        {[
          { label: 'Overall Match Score', val: '92%', sub: 'Top 5% Student Rank', icon: <Icons.Target className="w-5 h-5" /> },
          { label: 'Resume ATS Score', val: '88 / 100', sub: 'Optimized for Tech Jobs', icon: <Icons.Sparkles className="w-5 h-5" /> },
          { label: 'Academic CGPA', val: '3.88 / 4.0', sub: 'Computer Science Senior', icon: <Icons.GraduationCap className="w-5 h-5" /> },
          { label: 'Mock Sessions', val: '14 Completed', sub: 'Avg. Score 8.4/10', icon: <Icons.Mic className="w-5 h-5" /> }
        ].map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="stat-head">
              <span>{stat.label}</span>
              <div className="stat-icon">{stat.icon}</div>
            </div>
            <div className="stat-value">{stat.val}</div>
            <div className="stat-subtext">{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="panel panel-wide">
          <div className="panel-header">
            <h3><Icons.Briefcase className="w-4 h-4" /> Top Matched Student Openings</h3>
            <button type="button" onClick={onOpenJobs} className="text-link">View Directory</button>
          </div>
          <div className="list-stack">
            {SAMPLE_JOBS.slice(0, 3).map((job) => (
              <div key={job.id} className="list-row">
                <div className="job-mini">
                  <span className="job-logo">{job.logo}</span>
                  <div>
                    <h4>{job.role}</h4>
                    <p>{job.company} • {job.location}</p>
                  </div>
                </div>
                <div className="job-actions">
                  <div className="match-pill">{job.matchScore}% Match</div>
                  <button type="button" onClick={() => onLaunchPracticeForJob(job)} className="primary-button small">Practice</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3><Icons.Target className="w-4 h-4" /> Verified Skill Progress</h3>
          </div>
          <div className="skill-list">
            {[
              { skill: 'React / Frontend Design', level: 92 },
              { skill: 'Data Structures & Algorithms', level: 88 },
              { skill: 'Node.js Backend APIs', level: 81 },
              { skill: 'Python / ML Modeling', level: 76 }
            ].map((item) => (
              <div key={item.skill} className="skill-item">
                <div className="skill-row">
                  <span>{item.skill}</span>
                  <strong>{item.level}%</strong>
                </div>
                <div className="progress-bar"><span style={{ width: `${item.level}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
