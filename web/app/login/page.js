'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login, register } from '@/lib/api';

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = mode === 'login'
        ? await login({ username, password })
        : await register({ username, password });

      localStorage.setItem('stockbook-token', result.token);
      localStorage.setItem('stockbook-user', JSON.stringify(result.user));
      router.push('/');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center py-10">
      <div className="w-full max-w-md animate-fade-up">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-paper font-display font-bold text-xl shadow-lg dark:shadow-[0_0_24px_rgba(232,185,106,0.2)]">
            £
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-brass mb-2">
            Access your ledger
          </p>
          <h1 className="font-display text-3xl font-bold text-ink">
            {mode === 'login' ? 'Welcome back' : 'Create account'}
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            Sign in with your username and password to keep your own stock book.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="mb-5 flex rounded-full border border-line bg-paper-dim/50 p-1 dark:bg-paper-dim">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
              mode === 'login'
                ? 'bg-ink text-paper shadow-md dark:shadow-[0_0_12px_rgba(232,185,106,0.15)]'
                : 'text-ink-soft hover:text-ink'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
              mode === 'register'
                ? 'bg-ink text-paper shadow-md dark:shadow-[0_0_12px_rgba(232,185,106,0.15)]'
                : 'text-ink-soft hover:text-ink'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-line bg-paper/80 p-6 shadow-xl dark:bg-paper-dim/70 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset,0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-sm"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-line bg-paper/60 px-4 py-3 text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-brass focus:border-brass transition-all duration-200 dark:bg-paper/10 dark:text-ink dark:placeholder:text-ink-soft/40 dark:border-line"
              placeholder="yourname"
              required
              autoComplete="username"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-line bg-paper/60 px-4 py-3 text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-brass focus:border-brass transition-all duration-200 dark:bg-paper/10 dark:text-ink dark:placeholder:text-ink-soft/40 dark:border-line"
              placeholder="At least 6 characters"
              required
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="flex items-center gap-2.5 rounded-xl border border-brick/30 bg-brick/10 px-4 py-3 animate-fade-in">
              <span className="text-brick text-base leading-none">⚠</span>
              <p className="text-sm font-medium text-brick">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-ink px-4 py-3.5 font-semibold text-paper transition-all duration-200 hover:bg-moss hover:shadow-lg hover:shadow-moss/20 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] dark:hover:shadow-moss/30"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"/>
                </svg>
                Please wait…
              </span>
            ) : mode === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>

        {/* Footer links */}
        <div className="mt-5 text-center space-y-2">
          <p className="text-sm text-ink-soft">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              className="font-semibold text-brass hover:text-brass-light transition-colors"
            >
              {mode === 'login' ? 'Register' : 'Log in'}
            </button>
          </p>
          <Link href="/" className="inline-block text-sm font-medium text-ink-soft hover:text-brass transition-colors">
            ← Back to ledger
          </Link>
        </div>
      </div>
    </div>
  );
}
