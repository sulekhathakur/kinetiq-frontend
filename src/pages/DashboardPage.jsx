import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import apiClient from '../api/client';

function DashboardPage() {
  const [momentum, setMomentum] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const navigate = useNavigate();

  const parseRecommendation = (data) => {
    return typeof data === 'string' ? JSON.parse(data) : data;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const momentumRes = await apiClient.get('/momentum/latest');
        setMomentum(momentumRes.data);
      } catch (err) {
        setMomentum(null);
      }

      try {
        const historyRes = await apiClient.get('/momentum/history');
        setHistory(historyRes.data);
      } catch (err) {
        setHistory([]);
      }

      try {
        const recRes = await apiClient.get('/recommendations/latest');
        setRecommendation(parseRecommendation(recRes.data));
      } catch (err) {
        setRecommendation(null);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const res = await apiClient.get('/recommendations/generate');
      setRecommendation(parseRecommendation(res.data));
    } catch (err) {
      // Leave the existing recommendation in place if generation fails.
    }
    setGenerating(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-kinetiq-navy flex items-center justify-center">
        <p className="text-slate-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-kinetiq-navy px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-['Space_Grotesk'] text-2xl font-semibold text-white">Kinetiq</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            Log out
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/checkin')}
            className="bg-kinetiq-amber text-kinetiq-navy font-semibold rounded-lg px-4 py-2 hover:bg-kinetiq-amber-light transition-colors"
          >
            + New check-in
          </button>
          <button
            onClick={() => navigate('/evidence')}
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            View evidence history
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-kinetiq-surface rounded-xl p-6">
            <p className="text-sm text-slate-500 mb-1">Momentum score</p>
            {momentum ? (
              <p className="text-3xl font-semibold text-kinetiq-navy">
                {momentum.momentumScore.toFixed(1)}
              </p>
            ) : (
              <p className="text-slate-400">No data yet</p>
            )}
          </div>

          <div className="bg-kinetiq-surface rounded-xl p-6">
            <p className="text-sm text-slate-500 mb-1">Daily score (latest)</p>
            {momentum ? (
              <p className="text-3xl font-semibold text-kinetiq-navy">
                {momentum.dailyScore.toFixed(1)}
              </p>
            ) : (
              <p className="text-slate-400">No data yet</p>
            )}
          </div>
        </div>

        {history.length > 0 && (
          <div className="bg-kinetiq-surface rounded-xl p-6 mb-6">
            <p className="text-sm text-slate-500 mb-4">Momentum over time</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={history}>
                <XAxis dataKey="snapshotDate" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="momentumScore" stroke="#D98F4E" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="bg-kinetiq-navy-light rounded-xl p-6">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm text-kinetiq-amber font-medium">This week's focus</p>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="text-xs text-slate-400 hover:text-white transition-colors disabled:opacity-50"
            >
              {generating ? 'Generating...' : recommendation ? 'Refresh' : 'Generate'}
            </button>
          </div>

          {generating ? (
            <p className="text-slate-400">Analyzing your recent progress...</p>
          ) : recommendation ? (
            <>
              <p className="text-white mb-3">{recommendation.summary}</p>
              <ul className="list-disc list-inside text-slate-300 mb-3">
                {recommendation.focusAreas.map((area, i) => (
                  <li key={i}>{area}</li>
                ))}
              </ul>
              <p className="text-sm text-slate-400 italic">{recommendation.reasoning}</p>
            </>
          ) : (
            <p className="text-slate-400">No recommendation generated yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;