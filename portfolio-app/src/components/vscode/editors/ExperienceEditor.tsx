import React, { useState } from 'react';

// Color helpers
const kw = (s: string) => <span style={{ color: '#c586c0' }}>{s}</span>;
const st = (s: string) => <span style={{ color: '#ce9178' }}>{s}</span>;
const co = (s: string) => <span style={{ color: '#6a9955' }}>{s}</span>;
const ty = (s: string) => <span style={{ color: '#4ec9b0' }}>{s}</span>;
const vr = (s: string) => <span style={{ color: '#9cdcfe' }}>{s}</span>;
const tx = (s: string) => <span style={{ color: '#d4d4d4' }}>{s}</span>;

interface LineProps { num: number; children?: React.ReactNode; indent?: number }
const L: React.FC<LineProps> = ({ num, children, indent = 0 }) => (
  <div className="flex hover:bg-[#2a2d2e] group min-h-[1.35rem]">
    <span className="select-none text-right pr-4 w-12 flex-shrink-0 text-xs leading-[1.35rem]" style={{ color: '#5a5a5a' }}>{num}</span>
    <span className="flex-1 text-xs leading-[1.35rem] pr-4 font-mono whitespace-pre">{' '.repeat(indent * 2)}{children}</span>
  </div>
);

const Collapsible: React.FC<{
  startLine: number;
  header: React.ReactNode;
  children: React.ReactNode;
  lineCount: number;
}> = ({ startLine, header, children, lineCount }) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <div
        className="flex hover:bg-[#2a2d2e] cursor-pointer group min-h-[1.35rem]"
        onClick={() => setOpen(o => !o)}
      >
        <span className="select-none text-right pr-4 w-12 flex-shrink-0 text-xs leading-[1.35rem]" style={{ color: '#5a5a5a' }}>{startLine}</span>
        <span className="flex items-center gap-1 flex-1 text-xs leading-[1.35rem] pr-4 font-mono whitespace-pre">
          <span style={{ color: '#858585', fontSize: 10 }}>{open ? '▾' : '▸'}</span>
          {header}
        </span>
      </div>
      {open && children}
      {!open && (
        <div className="flex hover:bg-[#2a2d2e] min-h-[1.35rem]">
          <span className="select-none text-right pr-4 w-12 flex-shrink-0 text-xs leading-[1.35rem]" style={{ color: '#5a5a5a' }}> </span>
          <span className="text-xs leading-[1.35rem] font-mono" style={{ color: '#858585' }}>  {'... '}
            <span style={{ background: '#3c3c3c', padding: '0 6px', borderRadius: 3 }}>{lineCount} lines</span>
          </span>
        </div>
      )}
    </>
  );
};

const ExperienceEditor: React.FC = () => {
  let lineNum = 1;
  const l = () => lineNum++;

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
      <L num={l()}>{kw('import')} {ty('type')} {'{ '}{ty('Experience')}{', '}{ty('Achievement')}{' }'} {kw('from')} {st('"./types"')}{tx(';')}</L>
      <L num={l()}></L>
      <L num={l()}>{co('// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')}</L>
      <L num={l()}>{co('// Jay Sravan Vadlamudi – 9+ Years of Engineering Excellence')}</L>
      <L num={l()}>{co('// Full-Stack Java Engineer · Logistics · Finance · Healthcare · Banking')}</L>
      <L num={l()}>{co('// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')}</L>
      <L num={l()}></L>
      <L num={l()}>{kw('export const')} {vr('experience')}{tx(':')} {ty('Experience[]')} {tx('= [')}</L>

      {/* UPS */}
      <Collapsible startLine={l()} header={<>{tx('  {')} {co('// 📦 UPS — Current Role')}</>} lineCount={22}>
        <L num={l()} indent={1}>{ty('company')}{tx(': ')}{st('"United Parcel Service (UPS)"')}{tx(',')}</L>
        <L num={l()} indent={1}>{ty('role')}{tx(': ')}{st('"Sr. Software Development Engineer – Java Full Stack"')}{tx(',')}</L>
        <L num={l()} indent={1}>{ty('domain')}{tx(': ')}{st('"Logistics · International Package & Customs Processing"')}{tx(',')}</L>
        <L num={l()} indent={1}>{ty('location')}{tx(': ')}{st('"Parsippany, NJ"')}{tx(',')}</L>
        <L num={l()} indent={1}>{ty('period')}{tx(': ')}{st('"Mar 2024 – Present"')}{tx(',')}</L>
        <L num={l()} indent={1}>{ty('status')}{tx(': ')}{st('"current"')}{tx(' as const,')}</L>
        <L num={l()} indent={1}>{ty('tech')}{tx(': [')}
          {['"Java 21"','"Spring Boot WebFlux"','"Apache Camel"','"Reactor"','"Angular 17"','"OpenShift"','"ArgoCD"','"GitHub Copilot"'].map((t,i,a) => <>{st(t)}{i<a.length-1?tx(', '):''}</>)}
          {tx('],')}</L>
        <L num={l()} indent={1}>{ty('achievements')}{tx(': [')}</L>
        {[{metric:'10+', desc:'Microservices deployed for customs & logistics'},{metric:'30%', desc:'Improvement in customs processing time'},{metric:'40%', desc:'Faster data transfer via reactive pipelines'},{metric:'99.9%', desc:'Uptime for customs message delivery'},{metric:'50%', desc:'Reduction in deployment time via CI/CD'}].map((a,i) => (
          <L key={i} num={l()} indent={2}>{tx('{ ')}{ty('metric')}{tx(': ')}{st(`"${a.metric}"`)}{tx(', ')}{ty('desc')}{tx(': ')}{st(`"${a.desc}"`)}{tx(' },')}</L>
        ))}
        <L num={l()} indent={1}>{tx('],')}</L>
        <L num={l()} indent={1}>{ty('highlights')}{tx(': [')}</L>
        {['Reactive pipelines via Reactor (Mono/Flux) for 40% faster non-blocking data transfer','Strategy Pattern for country-specific customs logic (UK, UAE, CA)','GitOps deployment with ArgoCD + Helm charts on OpenShift','AI-assisted code refactoring via GitHub Copilot & ChatGPT','Prototyped LLM-based log summarization for customs error analysis'].map((h,i)=>(
          <L key={i} num={l()} indent={2}>{st(`"${h}"`)}{tx(',')}</L>
        ))}
        <L num={l()} indent={1}>{tx('],')}</L>
        <L num={l()}>{tx('  },')} {co('// ← Current')}</L>
      </Collapsible>

      {/* Mercedes */}
      <Collapsible startLine={l()} header={<>{tx('  {')} {co('// 🚗 Mercedes-Benz Financial Services')}</>} lineCount={14}>
        <L num={l()} indent={1}>{ty('company')}{tx(': ')}{st('"Mercedes Benz Financial Services"')}{tx(',')}</L>
        <L num={l()} indent={1}>{ty('role')}{tx(': ')}{st('"Software Development Engineer – Java Full Stack"')}{tx(',')}</L>
        <L num={l()} indent={1}>{ty('domain')}{tx(': ')}{st('"Automotive Finance and Leasing Platforms"')}{tx(',')}</L>
        <L num={l()} indent={1}>{ty('location')}{tx(': ')}{st('"Farmington Hills, MI"')}{tx(',')}</L>
        <L num={l()} indent={1}>{ty('period')}{tx(': ')}{st('"Apr 2022 – Mar 2024"')}{tx(',')}</L>
        <L num={l()} indent={1}>{ty('tech')}{tx(': [')}
          {['"Java"','"Spring Boot"','"Angular 17"','"OAuth 2.0"','"JWT"','"PostgreSQL"','"Jenkins"','"AWS"'].map((t,i,a)=><>{st(t)}{i<a.length-1?tx(', '):''}</>)}
          {tx('],')}</L>
        <L num={l()} indent={1}>{ty('achievements')}{tx(': [')}</L>
        {[{metric:'40%', desc:'Reduction in maintenance effort via platform modernization'},{metric:'25%', desc:'Improvement in transaction throughput'},{metric:'30%', desc:'DB performance improvement via query tuning'}].map((a,i)=>(
          <L key={i} num={l()} indent={2}>{tx('{ ')}{ty('metric')}{tx(': ')}{st(`"${a.metric}"`)}{tx(', ')}{ty('desc')}{tx(': ')}{st(`"${a.desc}"`)}{tx(' },')}</L>
        ))}
        <L num={l()} indent={1}>{tx('],')}</L>
        <L num={l()}>{tx('  },')}</L>
      </Collapsible>

      {/* UHC */}
      <Collapsible startLine={l()} header={<>{tx('  {')} {co('// 🏥 United Healthcare')}</>} lineCount={12}>
        <L num={l()} indent={1}>{ty('company')}{tx(': ')}{st('"United Healthcare"')}{tx(',')}</L>
        <L num={l()} indent={1}>{ty('role')}{tx(': ')}{st('"Full Stack Java Developer"')}{tx(',')}</L>
        <L num={l()} indent={1}>{ty('domain')}{tx(': ')}{st('"Healthcare Information Systems"')}{tx(',')}</L>
        <L num={l()} indent={1}>{ty('location')}{tx(': ')}{st('"Los Angeles, CA"')}{tx(',')}</L>
        <L num={l()} indent={1}>{ty('period')}{tx(': ')}{st('"Jan 2020 – Apr 2022"')}{tx(',')}</L>
        <L num={l()} indent={1}>{ty('tech')}{tx(': [')}
          {['"Java 8"','"Spring Boot"','"Angular"','"GraphQL"','"Kafka"','"AWS"','"JWT"','"OAuth"'].map((t,i,a)=><>{st(t)}{i<a.length-1?tx(', '):''}</>)}
          {tx('],')}</L>
        <L num={l()} indent={1}>{ty('highlights')}{tx(': [')}</L>
        {['HIPAA-compliant GraphQL APIs with JWT/OAuth fine-grained access control','Async microservices with Apache Kafka for claims processing','Deployed to AWS (S3, EC2, ELB, VPC) with CloudWatch monitoring'].map((h,i)=>(
          <L key={i} num={l()} indent={2}>{st(`"${h}"`)}{tx(',')}</L>
        ))}
        <L num={l()} indent={1}>{tx('],')}</L>
        <L num={l()}>{tx('  },')}</L>
      </Collapsible>

      {/* Wells Fargo */}
      <Collapsible startLine={l()} header={<>{tx('  {')} {co('// 🏦 Wells Fargo Bank')}</>} lineCount={12}>
        <L num={l()} indent={1}>{ty('company')}{tx(': ')}{st('"Wells Fargo Bank"')}{tx(',')}</L>
        <L num={l()} indent={1}>{ty('role')}{tx(': ')}{st('"Java Full Stack Developer"')}{tx(',')}</L>
        <L num={l()} indent={1}>{ty('domain')}{tx(': ')}{st('"Payments & Digital Banking"')}{tx(',')}</L>
        <L num={l()} indent={1}>{ty('location')}{tx(': ')}{st('"Remote"')}{tx(',')}</L>
        <L num={l()} indent={1}>{ty('period')}{tx(': ')}{st('"Apr 2017 – Dec 2019"')}{tx(',')}</L>
        <L num={l()} indent={1}>{ty('tech')}{tx(': [')}
          {['"React"','"Redux"','"Java"','"Spring Boot"','"MongoDB"','"Kafka"','"Docker"','"Azure"'].map((t,i,a)=><>{st(t)}{i<a.length-1?tx(', '):''}</>)}
          {tx('],')}</L>
        <L num={l()} indent={1}>{ty('highlights')}{tx(': [')}</L>
        {['React/Redux payment dashboard with Spring Boot microservices','MongoDB migration for high-volume transaction data','Real-time payment notifications via Apache Kafka'].map((h,i)=>(
          <L key={i} num={l()} indent={2}>{st(`"${h}"`)}{tx(',')}</L>
        ))}
        <L num={l()} indent={1}>{tx('],')}</L>
        <L num={l()}>{tx('  },')}</L>
      </Collapsible>

      <L num={l()}>{tx('];')}</L>
      <L num={l()}></L>
      <L num={l()}>{kw('export default')} {vr('experience')}{tx(';')}</L>
    </div>
  );
};

export default ExperienceEditor;

