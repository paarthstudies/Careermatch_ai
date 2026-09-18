import { Icons } from '../../components/common/Icons';
import { ROADMAP_DATA } from '../../data/roadmap';
import { TARGET_ROLES } from '../../data/roles';

type RoadmapPageProps = {
  roadmapRole: string;
  setRoadmapRole: (value: string) => void;
  completedTasks: Record<string, boolean>;
  toggleTask: (taskId: string) => void;
  markAllTasksForRole: (roleName: string, status: boolean) => void;
};

export function RoadmapPage({ roadmapRole, setRoadmapRole, completedTasks, toggleTask, markAllTasksForRole }: RoadmapPageProps) {
  const phases = ROADMAP_DATA[roadmapRole] || [];
  const allTasks = phases.flatMap((phase) => phase.tasks);
  const completedCount = allTasks.filter((task) => completedTasks[task.id]).length;
  const totalCount = allTasks.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="page-shell">
      <div className="panel roadmap-panel">
        <div className="roadmap-header">
          <div>
            <h2>14-Day Placement Prep Timeline</h2>
            <p>Interactive step-by-step daily objectives tailored by role</p>
          </div>

          <div className="role-chip-group">
            {TARGET_ROLES.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setRoadmapRole(role.name)}
                className={`role-chip ${roadmapRole === role.name ? 'active' : ''}`}
              >
                <span>{role.icon}</span>
                <span>{role.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="progress-banner">
          <div>
            <div className="progress-label">Active Role Plan: {roadmapRole}</div>
            <div className="progress-note">Track your step-by-step progress towards placement readiness.</div>
          </div>
          <div className="progress-controls">
            <div className="progress-track"><span style={{ width: `${progressPct}%` }} /></div>
            <span className="progress-value">{progressPct}%</span>
            <div className="quick-progress-actions">
              <button type="button" onClick={() => markAllTasksForRole(roadmapRole, true)} className="mini-button success">Check All</button>
              <button type="button" onClick={() => markAllTasksForRole(roadmapRole, false)} className="mini-button neutral">Reset</button>
            </div>
          </div>
        </div>

        <div className="timeline-list">
          {phases.map((phase) => {
            const phaseCompleted = phase.tasks.every((task) => completedTasks[task.id]);
            return (
              <div key={phase.phase} className={`timeline-card ${phaseCompleted ? 'complete' : ''}`}>
                <div className="timeline-header">
                  <div className="phase-tag">{phase.phase}</div>
                  <h4>{phase.title}</h4>
                  {phaseCompleted && <span className="done-pill"><Icons.CheckCircle className="w-4 h-4" /> Phase Complete</span>}
                </div>

                <div className="task-list">
                  {phase.tasks.map((task) => {
                    const isDone = !!completedTasks[task.id];
                    return (
                      <label key={task.id} className={`task-item ${isDone ? 'checked' : ''}`}>
                        <input type="checkbox" checked={isDone} onChange={() => toggleTask(task.id)} />
                        <span>{task.label}</span>
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
  );
}
