import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="min-h-screen bg-kinetiq-navy">
      <Navbar />
      <Hero />
      <Dimensions />
      <HowItWorks />
      <MomentumComparison />
      <AISection />
      <CTASection />
      <Footer />
    </div>
  );
}

function KinetiqMark({ size }) {
  const s = size || 22;
  return (
    <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
      <path d="M6 24 L6 4" stroke="#D98F4E" strokeWidth="2.5" strokeLinecap="round"></path>
      <path d="M6 15 L20 4" stroke="#D98F4E" strokeWidth="2.5" strokeLinecap="round"></path>
      <path d="M6 15 L20 24" stroke="#D98F4E" strokeWidth="2.5" strokeLinecap="round" opacity="0.55"></path>
      <circle cx="20" cy="4" r="2.4" fill="#D98F4E"></circle>
    </svg>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navClass = scrolled
    ? 'sticky top-0 z-50 border-b border-slate-700 bg-kinetiq-navy/95 backdrop-blur transition-colors'
    : 'sticky top-0 z-50 border-b border-transparent bg-transparent transition-colors';

  return (
    <nav className={navClass}>
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 sm:px-8 py-4">
        <Link to="/" className="flex items-center gap-2">
          <KinetiqMark size={22} />
          <span className="font-['Space_Grotesk'] text-lg font-semibold text-white">Kinetiq</span>
        </Link>

        <div className="hidden sm:flex items-center gap-8">
          <a href="#product" className="kinetiq-nav-link text-sm text-slate-300 hover:text-white transition-colors">Product</a>
          <a href="#how-it-works" className="kinetiq-nav-link text-sm text-slate-300 hover:text-white transition-colors">How it works</a>
          <a href="#why-kinetiq" className="kinetiq-nav-link text-sm text-slate-300 hover:text-white transition-colors">Why Kinetiq</a>
          <a href="#ai-strategy" className="kinetiq-nav-link text-sm text-slate-300 hover:text-white transition-colors">AI strategy</a>
        </div>

        <div className="hidden sm:flex items-center gap-4">
          <Link to="/login" className="kinetiq-login-link text-sm text-slate-300 hover:text-white">Log in</Link>
          <Link to="/register" className="kinetiq-cta-primary bg-kinetiq-amber text-kinetiq-navy text-sm font-semibold rounded-lg px-4 py-2 hover:bg-kinetiq-amber-light">Sign up</Link>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden text-slate-300" aria-label="Toggle menu">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className="sm:hidden border-t border-slate-700 px-6 py-4 flex flex-col gap-4 bg-kinetiq-navy">
          <a href="#product" onClick={() => setMenuOpen(false)} className="text-sm text-slate-300">Product</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="text-sm text-slate-300">How it works</a>
          <a href="#why-kinetiq" onClick={() => setMenuOpen(false)} className="text-sm text-slate-300">Why Kinetiq</a>
          <a href="#ai-strategy" onClick={() => setMenuOpen(false)} className="text-sm text-slate-300">AI strategy</a>
          <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm text-slate-300">Log in</Link>
          <Link to="/register" onClick={() => setMenuOpen(false)} className="bg-kinetiq-amber text-kinetiq-navy text-sm font-semibold rounded-lg px-4 py-2 text-center">Sign up</Link>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-800">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)', backgroundSize: '48px 48px' }}></div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 700px 400px at 20% 0%, rgba(217,143,78,0.12), transparent 70%)' }}></div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 pt-20 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="kinetiq-fade-up">
          <span className="inline-block text-xs font-medium tracking-wide text-kinetiq-amber border border-kinetiq-amber/40 rounded-full px-3 py-1 mb-6">EVIDENCE-VERIFIED CAREER PROGRESS</span>
          <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl font-semibold text-[#F4F1EA] leading-[1.1] mb-6">
            Turn potential into measurable momentum.
          </h1>
          <p className="text-slate-400 text-lg mb-8 max-w-md">
            Kinetiq tracks the work you actually do, from DSA and projects to learning, and turns it into evidence-backed career momentum.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/register" className="kinetiq-cta-primary bg-kinetiq-amber text-kinetiq-navy font-semibold rounded-lg px-6 py-3 hover:bg-kinetiq-amber-light">Start building momentum</Link>
            <a href="#how-it-works" className="kinetiq-nav-link text-slate-300 text-sm font-medium hover:text-white">See how it works</a>
          </div>
        </div>

        <MomentumCardVisual />
      </div>
    </section>
  );
}

function MomentumCardVisual() {
  return (
    <div className="kinetiq-fade-up kinetiq-visual-card bg-kinetiq-surface border border-slate-300/20 rounded-xl p-6 shadow-lg max-w-sm ml-auto">
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs text-slate-500 font-medium">MOMENTUM SCORE</p>
        <span className="w-2 h-2 rounded-full bg-kinetiq-success animate-pulse"></span>
      </div>
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-4xl font-semibold text-kinetiq-navy">78</span>
        <span className="text-sm text-kinetiq-success font-medium">↑ +12 this week</span>
      </div>

      <svg viewBox="0 0 240 60" className="w-full h-14 mb-4">
        <polyline points="0,45 40,38 80,40 120,22 160,26 200,10 240,6" fill="none" stroke="#D98F4E" strokeWidth="2" strokeDasharray="4 4" className="kinetiq-dash-line"></polyline>
      </svg>

      <p className="text-xs text-slate-500 font-medium mb-2">EVIDENCE</p>
      <div className="flex flex-wrap gap-2">
        <span className="text-xs bg-slate-200 text-kinetiq-navy rounded-full px-3 py-1">GitHub</span>
        <span className="text-xs bg-slate-200 text-kinetiq-navy rounded-full px-3 py-1">DSA</span>
        <span className="text-xs bg-slate-200 text-kinetiq-navy rounded-full px-3 py-1">Projects</span>
        <span className="text-xs bg-slate-200 text-kinetiq-navy rounded-full px-3 py-1">Learning</span>
      </div>
    </div>
  );
}

function Dimensions() {
  const dims = [
    { label: 'EFFORT', text: 'What you worked on.' },
    { label: 'EVIDENCE', text: 'What proves you did it.' },
    { label: 'CONSISTENCY', text: 'How regularly you progress.' },
    { label: 'MOMENTUM', text: 'How those actions compound over time.' },
  ];

  return (
    <section id="product" className="max-w-6xl mx-auto px-6 sm:px-8 py-24 border-b border-slate-800">
      <p className="text-center text-slate-400 text-sm mb-2">POTENTIAL → ACTION → EVIDENCE → MOMENTUM</p>
      <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-semibold text-white text-center mb-14">
        Your career isn't a checklist.
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-800 border border-slate-800 rounded-xl overflow-hidden">
        {dims.map((d) => (
          <div key={d.label} className="kinetiq-visual-card bg-kinetiq-navy p-6">
            <p className="text-xs font-semibold text-kinetiq-amber mb-2">{d.label}</p>
            <p className="text-slate-400 text-sm">{d.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: '01', title: 'CHECK IN', text: 'Log what you actually worked on.' },
    { n: '02', title: 'VERIFY', text: 'Connect activity to real evidence.' },
    { n: '03', title: 'GUIDE', text: 'Get AI recommendations based on real progress.' },
  ];

  return (
    <section id="how-it-works" className="max-w-6xl mx-auto px-6 sm:px-8 py-24 border-b border-slate-800">
      <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-semibold text-white text-center mb-14">How it works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 relative">
        {steps.map((s, i) => (
          <StepBlock key={s.n} step={s} isLast={i === steps.length - 1} />
        ))}
      </div>
    </section>
  );
}

function StepBlock({ step, isLast }) {
  return (
    <div className="relative sm:px-6 first:sm:pl-0 last:sm:pr-0">
      <p className="text-kinetiq-amber font-['Space_Grotesk'] text-2xl font-semibold mb-3">{step.n}</p>
      <p className="text-white font-medium text-sm tracking-wide mb-2">{step.title}</p>
      <p className="text-slate-400 text-sm max-w-[220px]">{step.text}</p>
      {!isLast && (
        <div className="hidden sm:block absolute top-3 left-full w-8 border-t border-dashed border-slate-600"></div>
      )}
    </div>
  );
}

function MomentumComparison() {
  const streaks = ['Did something today', 'Maintains a count'];
  const streaksMissing = ["Doesn't measure quality", "Doesn't understand progress"];
  const momentum = ['Tracks actual work', 'Uses evidence', 'Accounts for consistency', 'Uses time decay', 'Builds a persistent record'];

  return (
    <section id="why-kinetiq" className="max-w-4xl mx-auto px-6 sm:px-8 py-24 border-b border-slate-800">
      <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-semibold text-white text-center mb-4">Why momentum, not streaks</h2>
      <p className="text-slate-400 text-center mb-14 max-w-lg mx-auto">Most trackers reward showing up. Kinetiq measures whether the work is real.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="border border-slate-700 rounded-xl p-6">
          <p className="text-slate-400 text-sm font-semibold mb-4">STREAKS</p>
          {streaks.map((t) => (
            <p key={t} className="text-slate-400 text-sm mb-2">✓ {t}</p>
          ))}
          {streaksMissing.map((t) => (
            <p key={t} className="text-slate-500 text-sm mb-2">✕ {t}</p>
          ))}
        </div>

        <div className="border border-kinetiq-amber/40 rounded-xl p-6 bg-kinetiq-navy-light">
          <p className="text-kinetiq-amber text-sm font-semibold mb-4">KINETIQ MOMENTUM</p>
          {momentum.map((t) => (
            <p key={t} className="text-slate-200 text-sm mb-2">✓ {t}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function AISection() {
  const actions = [
    'Complete the transaction API',
    'Add integration tests',
    'Push the implementation to GitHub',
  ];

  return (
    <section id="ai-strategy" className="max-w-4xl mx-auto px-6 sm:px-8 py-24 border-b border-slate-800">
      <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-semibold text-white text-center mb-4">Your progress should tell you what to do next.</h2>
      <p className="text-slate-400 text-center mb-14 max-w-lg mx-auto">Kinetiq doesn't just show dashboards. It analyzes real activity and tells you where to focus.</p>

      <div className="kinetiq-visual-card bg-kinetiq-surface border border-slate-300/20 rounded-xl p-6 max-w-md mx-auto">
        <p className="text-xs font-semibold text-kinetiq-navy tracking-wide mb-3">AI STRATEGIST</p>
        <p className="text-sm text-slate-600 mb-4">
          Based on your recent activity: you are consistently practicing DSA, but your backend project activity has slowed.
        </p>
        <p className="text-xs font-semibold text-kinetiq-navy mb-2">RECOMMENDED NEXT ACTION</p>
        {actions.map((a) => (
          <p key={a} className="text-sm text-slate-700 mb-1">→ {a}</p>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="max-w-3xl mx-auto px-6 sm:px-8 py-24 text-center">
      <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-semibold text-white mb-4 leading-tight">
        Stop tracking activity. Start building momentum.
      </h2>
      <p className="text-slate-400 mb-10 max-w-md mx-auto">
        Turn the work you're already doing into measurable career progress.
      </p>
      <Link to="/register" className="kinetiq-cta-primary inline-block bg-kinetiq-amber text-kinetiq-navy font-semibold rounded-lg px-6 py-3 hover:bg-kinetiq-amber-light">Start building with Kinetiq</Link>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-800 px-6 sm:px-8 py-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <KinetiqMark size={18} />
            <span className="font-['Space_Grotesk'] text-white font-semibold">Kinetiq</span>
          </div>
          <p className="text-slate-500 text-sm">Transform potential into progress.</p>
        </div>
        <div className="flex gap-8 text-sm">
          <a href="#product" className="kinetiq-nav-link text-slate-400 hover:text-white">Product</a>
          <a href="#how-it-works" className="kinetiq-nav-link text-slate-400 hover:text-white">How it works</a>
          <a href="https://github.com/sulekhathakur/Kinetiq" target="_blank" rel="noopener noreferrer" className="kinetiq-nav-link text-slate-400 hover:text-white">GitHub</a>
          <Link to="/login" className="kinetiq-nav-link text-slate-400 hover:text-white">Log in</Link>
        </div>
      </div>
      <p className="max-w-6xl mx-auto text-slate-600 text-xs mt-8">Built by Sulekha Thakur</p>
    </footer>
  );
}

export default LandingPage;