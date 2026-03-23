import React, { useEffect, useState } from 'react';
import { personalInfo, metrics, education, certifications } from '../../../data/resume';

const COPILOT_PHRASES = [
  'builds cloud-native Java microservices at scale.',
  'ships React & Angular frontends that users love.',
  'integrates LLMs for intelligent automation.',
  'designs reactive systems with Spring WebFlux.',
  'is AWS Certified and cloud-native by default.',
  'reduces CI/CD time by 50% using GitOps.',
];

const CopilotGhost: React.FC = () => {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const phrase = COPILOT_PHRASES[phraseIdx];
    if (typing) {
      if (displayed.length < phrase.length) {
        const t = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 38);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2200);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 16);
        return () => clearTimeout(t);
      } else {
        setPhraseIdx(i => (i + 1) % COPILOT_PHRASES.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, phraseIdx]);

  return (
    <div className="flex items-center gap-2 mt-2 mb-4">
      <span
        className="text-[10px] px-1.5 py-0.5 rounded font-mono flex-shrink-0"
        style={{ background: 'rgba(139,92,246,0.2)', color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.3)' }}
      >
        ✦ Copilot
      </span>
      <span className="text-sm font-mono" style={{ color: 'rgba(156,220,254,0.45)' }}>
        Jay {displayed}
        <span className="animate-pulse" style={{ color: 'rgba(174,175,173,0.6)' }}>|</span>
      </span>
    </div>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-6">
    <h2
      className="text-base font-bold mb-3 pb-1"
      style={{ color: '#4ec9b0', borderBottom: '1px solid #3c3c3c' }}
    >
      {title}
    </h2>
    {children}
  </div>
);

const Badge: React.FC<{ label: string; color?: string }> = ({ label, color = '#007acc' }) => (
  <span
    className="inline-block px-2 py-0.5 rounded text-[11px] font-mono mr-1.5 mb-1.5"
    style={{ background: color + '22', border: `1px solid ${color}55`, color }}
  >
    {label}
  </span>
);

const ReadmeEditor: React.FC = () => {
  return (
    <div
      className="h-full overflow-y-auto px-10 py-8"
      style={{
        background: '#1e1e1e',
        color: '#d4d4d4',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        fontSize: 14,
        lineHeight: 1.8,
        scrollbarWidth: 'thin',
        scrollbarColor: '#424242 transparent',
      }}
    >
      {/* Preview badge */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: '#0078d430', color: '#007acc', border: '1px solid #0078d450' }}>
          PREVIEW  📋 README.md
        </span>
      </div>

      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ color: '#ffffff' }}>
          Jay Sravan Vadlamudi <span className="text-2xl">👨‍💻</span>
        </h1>
        <p className="text-lg" style={{ color: '#9cdcfe' }}>
          Sr. Software Engineer &amp; Applied AI Engineer
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge label="9+ Years Experience" color="#4ec9b0" />
          <Badge label="AWS Certified" color="#f59e0b" />
          <Badge label="Open to Opportunities" color="#10b981" />
          <Badge label="Remote / Hybrid" color="#8b5cf6" />
        </div>

        {/* Copilot Ghost Text Animation */}
        <CopilotGhost />
      </div>

      <Section title="About">
        <p style={{ color: '#cccccc' }}>{personalInfo.summary}</p>
      </Section>

      {/* Quick Stats */}
      <Section title="Quick Stats">
        <div className="grid grid-cols-2 gap-3">
          {metrics.map(m => (
            <div
              key={m.label}
              className="p-3 rounded-lg"
              style={{ background: '#252526', border: '1px solid #3c3c3c' }}
            >
              <p
                className="text-2xl font-black font-mono"
                style={{ color: m.color === 'cyan' ? '#4ec9b0' : m.color === 'purple' ? '#c586c0' : m.color === 'green' ? '#10b981' : '#f59e0b' }}
              >
                {m.value}{m.suffix}
              </p>
              <p className="text-xs mt-0.5" style={{ color: '#858585' }}>{m.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Current Role 🚀">
        <div className="p-4 rounded-lg" style={{ background: '#252526', border: '1px solid #3c3c3c' }}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">📦</span>
            <strong style={{ color: '#ffffff' }}>United Parcel Service (UPS)</strong>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full animate-pulse"
              style={{ background: '#06b6d422', color: '#06b6d4', border: '1px solid #06b6d440' }}
            >
              ● NOW
            </span>
          </div>
          <p className="text-sm" style={{ color: '#9cdcfe' }}>Sr. Software Development Engineer – Java Full Stack</p>
          <p className="text-xs mt-1" style={{ color: '#858585' }}>
            Mar 2024 – Present · Parsippany, NJ · Logistics &amp; Customs Processing
          </p>
          <div className="mt-3 flex flex-wrap gap-1">
            {['Java 21','Spring WebFlux','Apache Camel','Angular 17','OpenShift','ArgoCD','GitHub Copilot'].map(t => (
              <Badge key={t} label={t} color="#06b6d4" />
            ))}
          </div>
        </div>
      </Section>

      <Section title="Tech Stack">
        <div className="space-y-2">
          {[
            { label: 'Languages', tags: ['Java 8–21', 'TypeScript', 'JavaScript', 'Python', 'SQL'], color: '#c586c0' },
            { label: 'Frontend', tags: ['React.js', 'Angular (v21)', 'Redux', 'HTML5', 'CSS3'], color: '#4ec9b0' },
            { label: 'Backend', tags: ['Spring Boot', 'Spring WebFlux', 'Node.js', 'GraphQL', 'REST'], color: '#9cdcfe' },
            { label: 'Cloud', tags: ['AWS', 'GCP', 'Azure', 'OpenShift', 'Docker', 'ArgoCD'], color: '#f59e0b' },
            { label: 'AI / LLM', tags: ['GitHub Copilot', 'OpenAI API', 'LLM Prompting', 'RAG', 'Agents'], color: '#10b981' },
          ].map(row => (
            <div key={row.label} className="flex items-start gap-3">
              <span className="text-xs w-20 flex-shrink-0 mt-1" style={{ color: '#858585' }}>{row.label}</span>
              <div>
                {row.tags.map(t => <Badge key={t} label={t} color={row.color} />)}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Education">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🎓</span>
          <div>
            <p style={{ color: '#ffffff' }}>{education.degree}</p>
            <p className="text-sm" style={{ color: '#9cdcfe' }}>{education.school}</p>
            <p className="text-xs" style={{ color: '#858585' }}>{education.location} · {education.year}</p>
          </div>
        </div>
      </Section>

      <Section title="Certifications">
        {certifications.map(c => (
          <div key={c.name} className="flex items-center gap-3">
            <span className="text-2xl">{c.icon}</span>
            <div>
              <p style={{ color: '#ffffff' }}>{c.name}</p>
              <p className="text-xs" style={{ color: '#858585' }}>{c.issuer}</p>
            </div>
          </div>
        ))}
      </Section>

      <Section title="Contact">
        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${personalInfo.email}`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all hover:opacity-90"
            style={{ background: '#0078d4', color: '#ffffff', textDecoration: 'none' }}
          >
            ✉️ {personalInfo.email}
          </a>
          <span
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
            style={{ background: '#252526', color: '#d4d4d4', border: '1px solid #3c3c3c' }}
          >
            📍 {personalInfo.location}
          </span>
        </div>
      </Section>

      <div
        className="mt-8 p-4 rounded-lg text-xs font-mono"
        style={{ background: '#252526', border: '1px solid #3c3c3c', color: '#6a9955' }}
      >
        {`// Navigate the files in the Explorer sidebar ←  to explore Jay's full portfolio`}
        <br />
        {`// Or press  Ctrl+\`  to open the terminal and run: jay --help`}
      </div>
    </div>
  );
};

export default ReadmeEditor;

