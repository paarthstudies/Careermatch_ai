import type { Dispatch, SetStateAction } from 'react';
import { Icons } from '../common/Icons';
import type { TabId } from '../../types';

const tabs: Array<{ id: TabId; label: string; icon: JSX.Element }> = [
  { id: 'dashboard', label: 'Dashboard', icon: <Icons.Target className="w-4 h-4" /> },
  { id: 'jobs', label: 'Jobs Directory', icon: <Icons.Briefcase className="w-4 h-4" /> },
  { id: 'match', label: 'Match Analysis', icon: <Icons.Sparkles className="w-4 h-4" /> },
  { id: 'roadmap', label: 'Prep Roadmap', icon: <Icons.Calendar className="w-4 h-4" /> },
  { id: 'interview', label: 'AI Interview Studio', icon: <Icons.Mic className="w-4 h-4" />, }
];

type AppShellProps = {
  activeTab: TabId;
  setActiveTab: Dispatch<SetStateAction<TabId>>;
  onLogout: () => void;
  username: string;
  children: React.ReactNode;
};

export function AppShell({ activeTab, setActiveTab, onLogout, username, children }: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand-block">
            <div className="brand-icon"><Icons.Growth className="w-5 h-5" /></div>
            <div>
              <div className="brand-name">Career<span>Match</span></div>
              <div className="brand-badge">Student Edition</div>
            </div>
          </div>

          <nav className="tab-nav" aria-label="Main navigation">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="profile-box">
            <div className="avatar">AC</div>
            <div>
              <div className="user-name">{username}</div>
              <div className="user-role">CS Senior • ATS 88%</div>
            </div>
            <button type="button" onClick={onLogout} className="logout-button">
              <Icons.LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">{children}</main>

      <footer className="app-footer">CareerMatch • Student Interview Preparation Platform</footer>
    </div>
  );
}
