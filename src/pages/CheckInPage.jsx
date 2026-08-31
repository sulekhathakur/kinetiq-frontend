import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/client';

function CheckInPage() {
  const [type, setType] = useState('DSA');
  const [description, setDescription] = useState('');
  const [checkinDate, setCheckinDate] = useState(new Date().toISOString().split('T')[0]);
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setSubmitting(true);

    try {
      const checkInRes = await apiClient.post('/checkins', { type, description, checkinDate });
      const checkInId = checkInRes.data.id;

      if (evidenceUrl.trim() !== '') {
        try {
          await apiClient.post('/evidence', {
            checkInId,
            evidenceType: 'LINK',
            url: evidenceUrl,
          });
        } catch (evidenceErr) {
          // Check-in already succeeded; evidence failing shouldn't block the whole flow.
        }
      }

      setSuccess(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-kinetiq-navy flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <p className="text-kinetiq-success text-lg mb-2">Check-in submitted.</p>
          <p className="text-slate-400 mb-6">Momentum updated for {checkinDate}.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-kinetiq-amber text-kinetiq-navy font-semibold rounded-lg px-6 py-2.5 hover:bg-kinetiq-amber-light transition-colors"
          >
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-kinetiq-navy px-6 py-8">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-sm text-slate-400 hover:text-white mb-6"
        >
          ← Back to dashboard
        </button>

        <h1 className="font-['Space_Grotesk'] text-2xl font-semibold text-white mb-1">
          Daily check-in
        </h1>
        <p className="text-slate-400 mb-8">What did you get done today?</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              disabled={submitting}
              className="w-full bg-kinetiq-navy-light border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-kinetiq-amber disabled:opacity-50"
            >
              <option value="DSA">DSA</option>
              <option value="PROJECT">Project</option>
              <option value="LEARNING">Learning</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              disabled={submitting}
              className="w-full bg-kinetiq-navy-light border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-kinetiq-amber resize-none disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Date</label>
            <input
              type="date"
              value={checkinDate}
              onChange={(e) => setCheckinDate(e.target.value)}
              required
              disabled={submitting}
              className="w-full bg-kinetiq-navy-light border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-kinetiq-amber disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">
              Evidence link <span className="text-slate-500">(optional — e.g. a GitHub commit)</span>
            </label>
            <input
              type="url"
              value={evidenceUrl}
              onChange={(e) => setEvidenceUrl(e.target.value)}
              placeholder="https://github.com/you/repo/commit/..."
              disabled={submitting}
              className="w-full bg-kinetiq-navy-light border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-kinetiq-amber disabled:opacity-50"
            />
          </div>

          {error && <p className="text-sm text-kinetiq-danger">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 bg-kinetiq-amber text-kinetiq-navy font-semibold rounded-lg py-2.5 hover:bg-kinetiq-amber-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : 'Submit check-in'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckInPage;