import { Icons } from '../../components/common/Icons';
import type { JobItem } from '../../types';

type MatchAnalysisPageProps = {
  selectedJob: JobItem;
  onLaunchPracticeForJob: (job: JobItem) => void;
};

export function MatchAnalysisPage({ selectedJob, onLaunchPracticeForJob }: MatchAnalysisPageProps) {
  return (
    <div className="page-shell">
      <div className="panel panel-match">
        <div className="panel-header match-header">
          <div className="job-mini">
            <span className="job-logo large">{selectedJob.logo}</span>
            <div>
              <h2>Match Analysis: {selectedJob.role}</h2>
              <p>{selectedJob.company} • {selectedJob.location}</p>
            </div>
          </div>
        </div>

        <div className="two-column-grid">
          <div className="info-card success-card">
            <h3><Icons.CheckCircle className="w-4 h-4" /> Matched Resume Skills</h3>
            <div className="chip-row">
              {['React', 'TypeScript', 'Node.js', 'Data Structures'].map((skill) => (
                <span key={skill} className="chip success">✓ {skill}</span>
              ))}
            </div>
          </div>

          <div className="info-card warning-card">
            <h3><Icons.AlertTriangle className="w-4 h-4" /> Recommended Skills to Highlight</h3>
            <div className="chip-row">
              {['System Design', 'Kubernetes'].map((skill) => (
                <span key={skill} className="chip warning">+ {skill}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="cta-row">
          <button type="button" onClick={() => onLaunchPracticeForJob(selectedJob)} className="primary-button">
            <Icons.Mic className="w-4 h-4" />
            <span>Launch Custom Interview Practice for this Job</span>
          </button>
        </div>
      </div>
    </div>
  );
}
