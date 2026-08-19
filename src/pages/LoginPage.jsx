import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/client';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await apiClient.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-kinetiq-navy flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-['Space_Grotesk'] text-3xl font-semibold text-white mb-1">
          Kinetiq
        </h1>
        <p className="text-slate-400 mb-8">Log in to track your momentum.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-kinetiq-navy-light border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-kinetiq-amber"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-kinetiq-navy-light border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-kinetiq-amber"
            />
          </div>

          {error && (
            <p className="text-sm text-kinetiq-danger">{error}</p>
          )}

          <button
            type="submit"
            className="mt-2 bg-kinetiq-amber text-kinetiq-navy font-semibold rounded-lg py-2.5 hover:bg-kinetiq-amber-light transition-colors"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;