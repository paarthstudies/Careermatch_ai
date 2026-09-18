import { Icons } from '../../components/common/Icons';
import type { JobItem } from '../../types';

type JobsPageProps = {
  jobs: JobItem[];
  onSelectJob: (job: JobItem) => void;
  onLaunchPracticeForJob: (job: JobItem) => void;
};

export function JobsPage({ jobs, onSelectJob, onLaunchPracticeForJob }: JobsPageProps) {
  return (
    <div className="page-shell">
      <div className="section-heading">
        <h2>Student Placement Jobs Directory</h2>
        <p>Filtered according to your resume, GPA, and verified skills</p>
      </div>

      <div className="job-grid">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <div className="job-card-header">
              <div className="job-mini">
                <span className="job-logo large">{job.logo}</span>
                <div>
                  <h3>{job.role}</h3>
                  <p>{job.company} • {job.location}</p>
                </div>
              </div>
              <span className="match-pill">{job.matchScore}% Match</span>
            </div>

            <div className="chip-row">
              {job.skillsReq.map((skill) => (
                <span key={skill} className="chip">{skill}</span>
              ))}
            </div>

            <div className="job-footer">
              <span className="salary-text">{job.salary}</span>
              <div className="action-row">
                <button type="button" onClick={() => onSelectJob(job)} className="secondary-button">Deep Dive</button>
                <button type="button" onClick={() => onLaunchPracticeForJob(job)} className="primary-button small">
                  <Icons.Mic className="w-4 h-4" />
                  <span>Practice</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
