import React from 'react';

const co = (s: string) => <span style={{ color: '#6a9955' }}>{s}</span>;
const st = (s: string) => <span style={{ color: '#ce9178' }}>{s}</span>;
const vr = (s: string) => <span style={{ color: '#9cdcfe' }}>{s}</span>;
const tx = (s: string) => <span style={{ color: '#d4d4d4' }}>{s}</span>;

interface LineProps { num: number; children?: React.ReactNode; indent?: number }
const L: React.FC<LineProps> = ({ num, children, indent = 0 }) => (
  <div className="flex hover:bg-[#2a2d2e] min-h-[1.35rem]">
    <span className="select-none text-right pr-4 w-12 flex-shrink-0 text-xs leading-[1.35rem]" style={{ color: '#5a5a5a' }}>{num}</span>
    <span className="flex-1 text-xs leading-[1.35rem] pr-4 font-mono whitespace-pre">{' '.repeat(indent * 2)}{children}</span>
  </div>
);

const SkillsEditor: React.FC = () => {
  let n = 1;
  const l = () => n++;


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
      <L num={l()}>{tx('{')}</L>
      <L num={l()} indent={1}>{vr('"$schema"')}{tx(': ')}{st('"./types/skills.schema.json"')}{tx(',')}</L>
      <L num={l()} indent={1}>{vr('"engineer"')}{tx(': ')}{st('"Jay Sravan Vadlamudi"')}{tx(',')}</L>
      <L num={l()} indent={1}>{vr('"experience"')}{tx(': ')}{st('"9+ years"')}{tx(',')}</L>
      <L num={l()} indent={1}>{vr('"lastUpdated"')}{tx(': ')}{st('"2026-03-19"')}{tx(',')}</L>
      <L num={l()}></L>

      {/* Languages */}
      <L num={l()} indent={1}>{co('// Primary development languages')}</L>
      <L num={l()} indent={1}>{vr('"languages"')}{tx(': {')}</L>
      <L num={l()} indent={2}>{vr('"primary"')}{tx(': [')}
        {['"Java 8–21"', '"TypeScript"', '"JavaScript ES6+"'].map((s, i, a) => <>{st(s)}{i < a.length - 1 ? tx(', ') : ''}</>)}
        {tx('],')}
      </L>
      <L num={l()} indent={2}>{vr('"secondary"')}{tx(': [')}
        {['"Python"', '"SQL"', '"PL/SQL"'].map((s, i, a) => <>{st(s)}{i < a.length - 1 ? tx(', ') : ''}</>)}
        {tx(']')}
      </L>
      <L num={l()} indent={1}>{tx('},')}</L>
      <L num={l()}></L>

      {/* Frontend */}
      <L num={l()} indent={1}>{co('// UI frameworks & libraries')}</L>
      <L num={l()} indent={1}>{vr('"frontend"')}{tx(': [')}
        {['"React.js"', '"Angular (v21)"', '"Redux"', '"HTML5"', '"CSS3"', '"Bootstrap"', '"Material UI"'].map((s, i, a) => <>{st(s)}{i < a.length - 1 ? tx(', ') : ''}</>)}
        {tx('],')}
      </L>
      <L num={l()}></L>

      {/* Backend */}
      <L num={l()} indent={1}>{co('// Server-side technologies')}</L>
      <L num={l()} indent={1}>{vr('"backend"')}{tx(': {')}</L>
      <L num={l()} indent={2}>{vr('"frameworks"')}{tx(': [')}
        {['"Spring Boot"', '"Spring WebFlux"', '"Spring MVC"', '"Node.js"', '"Express.js"', '"Flask"', '"Django"'].map((s, i, a) => <>{st(s)}{i < a.length - 1 ? tx(', ') : ''}</>)}
        {tx('],')}
      </L>
      <L num={l()} indent={2}>{vr('"patterns"')}{tx(': [')}
        {['"Microservices"', '"Reactive Programming"', '"RESTful APIs"', '"GraphQL"', '"SOAP"', '"EJB"'].map((s, i, a) => <>{st(s)}{i < a.length - 1 ? tx(', ') : ''}</>)}
        {tx(']')}
      </L>
      <L num={l()} indent={1}>{tx('},')}</L>
      <L num={l()}></L>

      {/* AI */}
      <L num={l()} indent={1}>{co('// AI / LLM tooling — actively expanding')}</L>
      <L num={l()} indent={1}>{vr('"ai"')}{tx(': {')}</L>
      <L num={l()} indent={2}>{vr('"tools"')}{tx(': [')}
        {['"GitHub Copilot"', '"ChatGPT (GPT-4/5)"', '"OpenAI API"', '"LLM Prompt Engineering"'].map((s, i, a) => <>{st(s)}{i < a.length - 1 ? tx(', ') : ''}</>)}
        {tx('],')}
      </L>
      <L num={l()} indent={2}>{vr('"concepts"')}{tx(': [')}
        {['"RAG"', '"Vector Embeddings"', '"Agent Workflows"', '"AI Log Summarization"'].map((s, i, a) => <>{st(s)}{i < a.length - 1 ? tx(', ') : ''}</>)}
        {tx(']')}
      </L>
      <L num={l()} indent={1}>{tx('},')}</L>
      <L num={l()}></L>

      {/* Cloud */}
      <L num={l()} indent={1}>{co('// Cloud & DevOps platforms')}</L>
      <L num={l()} indent={1}>{vr('"cloud"')}{tx(': [')}
        {['"AWS"', '"GCP"', '"Azure DevOps"', '"OpenShift (OCP)"', '"Docker"', '"Argo CD"', '"Helm"'].map((s, i, a) => <>{st(s)}{i < a.length - 1 ? tx(', ') : ''}</>)}
        {tx('],')}
      </L>
      <L num={l()}></L>

      {/* Databases */}
      <L num={l()} indent={1}>{co('// Data stores')}</L>
      <L num={l()} indent={1}>{vr('"databases"')}{tx(': [')}
        {['"PostgreSQL"', '"MongoDB"', '"DB2"', '"MySQL"', '"SQL Server"', '"Oracle"'].map((s, i, a) => <>{st(s)}{i < a.length - 1 ? tx(', ') : ''}</>)}
        {tx('],')}
      </L>
      <L num={l()}></L>

      {/* Messaging */}
      <L num={l()} indent={1}>{co('// Event streaming & messaging')}</L>
      <L num={l()} indent={1}>{vr('"messaging"')}{tx(': [')}
        {['"Apache Kafka"', '"Google Pub/Sub"', '"ActiveMQ"', '"JMS"'].map((s, i, a) => <>{st(s)}{i < a.length - 1 ? tx(', ') : ''}</>)}
        {tx('],')}
      </L>
      <L num={l()}></L>

      {/* CI/CD */}
      <L num={l()} indent={1}>{co('// CI/CD & build tooling')}</L>
      <L num={l()} indent={1}>{vr('"cicd"')}{tx(': [')}
        {['"Jenkins"', '"Azure Pipelines"', '"GitHub Actions"', '"GitLab CI"', '"Gradle"', '"Maven"'].map((s, i, a) => <>{st(s)}{i < a.length - 1 ? tx(', ') : ''}</>)}
        {tx('],')}
      </L>
      <L num={l()}></L>

      {/* Security */}
      <L num={l()} indent={1}>{co('// Security & compliance')}</L>
      <L num={l()} indent={1}>{vr('"security"')}{tx(': [')}
        {['"OAuth 2.0"', '"JWT"', '"HashiCorp Vault"', '"HIPAA Compliance"'].map((s, i, a) => <>{st(s)}{i < a.length - 1 ? tx(', ') : ''}</>)}
        {tx('],')}
      </L>
      <L num={l()}></L>

      {/* Certifications */}
      <L num={l()} indent={1}>{co('// Certifications')}</L>
      <L num={l()} indent={1}>{vr('"certifications"')}{tx(': [')}</L>
      <L num={l()} indent={2}>{tx('{ ')}{vr('"name"')}{tx(': ')}{st('"AWS Certified Developer – Associate"')}{tx(', ')}{vr('"issuer"')}{tx(': ')}{st('"Amazon Web Services"')}{tx(' }')}</L>
      <L num={l()} indent={1}>{tx(']')}</L>
      <L num={l()}>{tx('}')}</L>
    </div>
  );
};

export default SkillsEditor;

