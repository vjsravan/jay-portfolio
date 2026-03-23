import React from 'react';

const kw = (s: string) => <span style={{ color: '#c586c0' }}>{s}</span>;
const st = (s: string) => <span style={{ color: '#ce9178' }}>{s}</span>;
const co = (s: string) => <span style={{ color: '#6a9955' }}>{s}</span>;
const ty = (s: string) => <span style={{ color: '#4ec9b0' }}>{s}</span>;
const vr = (s: string) => <span style={{ color: '#9cdcfe' }}>{s}</span>;
const fn = (s: string) => <span style={{ color: '#dcdcaa' }}>{s}</span>;
const tg = (s: string) => <span style={{ color: '#4ec9b0' }}>{s}</span>;
const at = (s: string) => <span style={{ color: '#9cdcfe' }}>{s}</span>;
const tx = (s: string) => <span style={{ color: '#d4d4d4' }}>{s}</span>;
const nm = (s: string) => <span style={{ color: '#b5cea8' }}>{s}</span>;

interface LineProps { num: number; children?: React.ReactNode; indent?: number }
const L: React.FC<LineProps> = ({ num, children, indent = 0 }) => (
  <div className="flex hover:bg-[#2a2d2e] min-h-[1.35rem]">
    <span className="select-none text-right pr-4 w-12 flex-shrink-0 text-xs leading-[1.35rem]" style={{ color: '#5a5a5a' }}>{num}</span>
    <span className="flex-1 text-xs leading-[1.35rem] pr-4 font-mono whitespace-pre">{' '.repeat(indent * 2)}{children}</span>
  </div>
);

const ProjectsEditor: React.FC = () => {
  let n = 1;
  const l = () => n++;

  const PROJECTS = [
    {
      name: 'CustomsProcessingEngine',
      emoji: '📦',
      company: 'UPS',
      description: 'High-throughput reactive customs message pipeline for international packages',
      tech: ['Java 21', 'Spring WebFlux', 'Apache Camel', 'OpenShift'],
      impact: '30% faster customs processing · 99.9% uptime',
      color: '#06b6d4',
    },
    {
      name: 'LoanLeaseTracker',
      emoji: '🚗',
      company: 'Mercedes-Benz Financial',
      description: 'Modern Angular + Spring Boot platform replacing legacy Struts application',
      tech: ['Angular 17', 'Spring Boot', 'OAuth 2.0', 'PostgreSQL'],
      impact: '40% reduction in maintenance · 25% throughput improvement',
      color: '#8b5cf6',
    },
    {
      name: 'HealthClaimsPortal',
      emoji: '🏥',
      company: 'United Healthcare',
      description: 'HIPAA-compliant healthcare claims portal with GraphQL APIs',
      tech: ['Angular', 'GraphQL', 'Kafka', 'AWS', 'JWT'],
      impact: 'HIPAA compliance · Async claims processing via Kafka',
      color: '#10b981',
    },
    {
      name: 'PaymentDashboard',
      emoji: '🏦',
      company: 'Wells Fargo',
      description: 'Real-time payment tracking dashboard with React/Redux and Kafka notifications',
      tech: ['React', 'Redux', 'Spring Boot', 'MongoDB', 'Kafka'],
      impact: 'Real-time notifications · Containerized on Azure Cloud',
      color: '#f59e0b',
    },
    {
      name: 'LLMLogSummarizer',
      emoji: '🤖',
      company: 'Personal / UPS AI Lab',
      description: 'Prototype using GPT-4 to summarize customs error logs and explain root causes',
      tech: ['Python', 'OpenAI API', 'LangChain', 'FastAPI'],
      impact: 'AI-powered root cause analysis · Natural language error summaries',
      color: '#ec4899',
    },
  ];

  return (
    <div
      className="h-full overflow-y-auto py-2"
      style={{
        background: '#1e1e1e',
        fontFamily: "'Cascadia Code','Fira Code','JetBrains Mono',monospace",
        scrollbarWidth: 'thin',
        scrollbarColor: '#424242 transparent',
      }}
    >
      <L num={l()}>{kw('import')} {ty('React')} {kw('from')} {st('"react"')}{tx(';')}</L>
      <L num={l()}>{kw('import')} {tx('{ ')}{ty('Project')}{tx(' }')} {kw('from')} {st('"./types"')}{tx(';')}</L>
      <L num={l()}></L>
      <L num={l()}>{co('// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')}</L>
      <L num={l()}>{co('// Jay\'s Key Projects – Production & Prototype')}</L>
      <L num={l()}>{co('// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')}</L>
      <L num={l()}></L>

      {PROJECTS.map((p) => (
        <React.Fragment key={p.name}>
          <L num={l()}>{co(`// ${p.emoji} ${p.company}`)}</L>
          <L num={l()}>{kw('const')} {vr(p.name)}{tx(':')} {ty('Project')} {tx('= (')}{tx(') => (')}</L>
          <L num={l()} indent={1}>{tg('<ProjectCard')}</L>
          <L num={l()} indent={2}>{at('name')}{tx('=')}
            {st(`"${p.name}"`)}</L>
          <L num={l()} indent={2}>{at('description')}{tx('=')}
            {st(`"${p.description}"`)}</L>
          <L num={l()} indent={2}>{at('tech')}{tx('={[')}
            {p.tech.map((t, i, a) => <>{st(`"${t}"`)}{i < a.length - 1 ? tx(', ') : ''}</>)}
            {tx(']}')}
          </L>
          <L num={l()} indent={2}>{at('impact')}{tx('=')}{st(`"${p.impact}"`)}</L>
          <L num={l()} indent={2}>{at('color')}{tx('=')}{st(`"${p.color}"`)}</L>
          <L num={l()} indent={1}>{tg('/>')}</L>
          <L num={l()}>{tx(');')}</L>
          <L num={l()}></L>
        </React.Fragment>
      ))}

      <L num={l()}>{co('// Combined portfolio export')}</L>
      <L num={l()}>{kw('const')} {fn('Portfolio')}{tx(':')} {ty('React.FC')} {tx('= () => (')}</L>
      <L num={l()} indent={1}>{tg('<ProjectGallery')} {at('columns')}{tx('={')}{nm('3')}{tx('}>')}</L>
      {PROJECTS.map(p => (
        <L key={p.name} num={l()} indent={2}>{tg('<')}{vr(p.name)}{tx(' />')}</L>
      ))}
      <L num={l()} indent={1}>{tg('</ProjectGallery>')}</L>
      <L num={l()}>{tx(');')}</L>
      <L num={l()}></L>
      <L num={l()}>{kw('export default')} {vr('Portfolio')}{tx(';')}</L>
    </div>
  );
};

export default ProjectsEditor;

