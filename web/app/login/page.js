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
    <div className="py-10 max-w-md">
      <div className="mb-6">
        <p className="font-mono text-xs uppercase tracking-widest text-brass mb-1">Access your ledger</p>
        <h1 className="font-display text-3xl font-bold text-ink">
          {mode === 'login' ? 'Log in' : 'Create account'}
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          Sign in with your username and password to keep your own stock book.
        </p>
      </div>

      <div className="mb-4 flex rounded-full border border-line p-1">
        <button
          type="button"
          onClick={() => setMode('login')}
          className={`flex-1 rounded-full px-3 py-2 text-sm font-medium ${mode === 'login' ? 'bg-ink text-paper' : 'text-ink-soft'}`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setMode('register')}
          className={`flex-1 rounded-full px-3 py-2 text-sm font-medium ${mode === 'register' ? 'bg-ink text-paper' : 'text-ink-soft'}`}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-md border border-line bg-paper-dim/40 p-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-ink" htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-md border border-line bg-white/50 px-3.5 py-2.5 text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-brass"
            placeholder="yourname"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-ink" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-line bg-white/50 px-3.5 py-2.5 text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-brass"
            placeholder="At least 6 characters"
            required
          />
        </div>

        {error ? <p className="text-sm text-brick">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-ink px-4 py-3 font-medium text-paper transition-colors hover:bg-moss disabled:opacity-80"
        >
          {loading ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Register'}
        </button>
      </form>

      <p className="mt-4 text-sm text-ink-soft">
        New here? Register an account to start your own stock book.
      </p>
      <Link href="/" className="mt-2 inline-block text-sm font-medium text-brass">Back to ledger</Link>
    </div>
  );
}
