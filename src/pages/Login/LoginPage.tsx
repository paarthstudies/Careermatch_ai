import type { FormEvent } from 'react';
import { Icons } from '../../components/common/Icons';

type LoginPageProps = {
  loginUsername: string;
  loginPassword: string;
  loginError: string;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onQuickFill: () => void;
};

export function LoginPage({
  loginUsername,
  loginPassword,
  loginError,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
  onQuickFill,
}: LoginPageProps) {
  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-brand">
          <div className="brand-icon large"><Icons.Growth className="w-6 h-6" /></div>
          <div>
            <h1 className="brand-name large">Career<span>Match</span> AI</h1>
            <p className="brand-subtitle">AI Career Matchmaker & Interview Simulator</p>
          </div>
        </div>

        <div className="credentials-box">
          <div className="credentials-header">
            <span><Icons.Sparkles className="w-4 h-4" /> Demo Account Credentials</span>
            <button type="button" onClick={onQuickFill} className="quick-fill-button">Auto-Fill</button>
          </div>
          <div className="credentials-grid">
            <div>User: <strong>myself123</strong></div>
            <div>Pass: <strong>123456</strong></div>
          </div>
        </div>

        {loginError && (
          <div className="error-banner">
            <Icons.AlertTriangle className="w-4 h-4" />
            <span>{loginError}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="login-form">
          <div className="field-group">
            <label>Username</label>
            <div className="input-wrap">
              <span className="input-icon"><Icons.User className="w-4 h-4" /></span>
              <input
                type="text"
                value={loginUsername}
                onChange={(event) => onUsernameChange(event.target.value)}
                placeholder="Enter username (myself123)"
                required
              />
            </div>
          </div>

          <div className="field-group">
            <label>Password</label>
            <div className="input-wrap">
              <span className="input-icon"><Icons.Lock className="w-4 h-4" /></span>
              <input
                type="password"
                value={loginPassword}
                onChange={(event) => onPasswordChange(event.target.value)}
                placeholder="Enter password (123456)"
                required
              />
            </div>
          </div>

          <button type="submit" className="primary-button login-button">
            <span>Sign In to Student Platform</span>
            <Icons.ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="login-footer">Protected CareerMatch AI Student Environment</div>
      </div>
    </div>
  );
}
