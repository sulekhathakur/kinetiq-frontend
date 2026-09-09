import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/client';

function EvidencePage() {
  const [evidence, setEvidence] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvidence = async () => {
      try {
        const res = await apiClient.get('/evidence');
        setEvidence(res.data);
      } catch (err) {
        setEvidence([]);
      }
      setLoading(false);
    };

    fetchEvidence();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-kinetiq-navy flex items-center justify-center">
        <p className="text-slate-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-kinetiq-navy px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate('/dashboard')} className="text-sm text-slate-400 hover:text-white mb-6">
          Back to dashboard
        </button>

        <h1 className="font-['Space_Grotesk'] text-2xl font-semibold text-white mb-1">
          Evidence history
        </h1>
        <p className="text-slate-400 mb-8">
          Everything you have submitted, and its verification status.
        </p>

        {evidence.length === 0 && (
          <p className="text-slate-400">No evidence submitted yet.</p>
        )}

        <div className="flex flex-col gap-3">
          {evidence.map((item) => (
            <EvidenceRow key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function EvidenceRow({ item }) {
  const badgeClass = item.verified
    ? 'text-xs font-medium rounded-full px-3 py-1 whitespace-nowrap bg-green-100 text-kinetiq-success'
    : 'text-xs font-medium rounded-full px-3 py-1 whitespace-nowrap bg-slate-200 text-slate-500';

  return (
    <div className="bg-kinetiq-surface rounded-xl p-4 flex items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-kinetiq-navy bg-slate-200 rounded px-2 py-0.5">
            {item.checkInType}
          </span>
          <span className="text-xs text-slate-500">{item.checkinDate}</span>
        </div>
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm text-kinetiq-navy hover:underline break-all">
          {item.url}
        </a>
      </div>
      <span className={badgeClass}>
        {item.verified ? 'Verified' : 'Unverified'}
      </span>
    </div>
  );
}

export default EvidencePage;