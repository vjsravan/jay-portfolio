import React from 'react';

const kw = (s: string) => <span style={{ color: '#c586c0' }}>{s}</span>;
const st = (s: string) => <span style={{ color: '#ce9178' }}>{s}</span>;
const co = (s: string) => <span style={{ color: '#6a9955' }}>{s}</span>;
const ty = (s: string) => <span style={{ color: '#4ec9b0' }}>{s}</span>;
const vr = (s: string) => <span style={{ color: '#9cdcfe' }}>{s}</span>;
const tx = (s: string) => <span style={{ color: '#d4d4d4' }}>{s}</span>;

interface LineProps { num: number; children?: React.ReactNode; indent?: number }
const L: React.FC<LineProps> = ({ num, children, indent = 0 }) => (
  <div className="flex hover:bg-[#2a2d2e] min-h-[1.35rem]">
    <span className="select-none text-right pr-4 w-12 flex-shrink-0 text-xs leading-[1.35rem]" style={{ color: '#5a5a5a' }}>{num}</span>
    <span className="flex-1 text-xs leading-[1.35rem] pr-4 font-mono whitespace-pre">{' '.repeat(indent * 2)}{children}</span>
  </div>
);

const AILabEditor: React.FC = () => {
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
      <L num={l()}>{co('/**')}</L>
      <L num={l()}>{co(' * ai-lab.ts — Jay Sravan\'s AI Experiments & Applied Work')}</L>
      <L num={l()}>{co(' * Actively exploring LLM integration, RAG, and agentic workflows.')}</L>
      <L num={l()}>{co(' * Status: Continuously evolving 🚀')}</L>
      <L num={l()}>{co(' */')}</L>
      <L num={l()}></L>
      <L num={l()}>{co('// ── Interfaces ──────────────────────────────────────')}</L>
      <L num={l()}>{kw('interface')} {ty('LLMExperiment')} {tx('{')}</L>
      <L num={l()} indent={1}>{vr('name')}{tx(':')} {ty('string')}{tx(';')}</L>
      <L num={l()} indent={1}>{vr('model')}{tx(':')} {st('"gpt-4"')} {tx('|')} {st('"gpt-4o"')} {tx('|')} {st('"claude-3"')} {tx('|')} {st('"copilot"')}{tx(';')}</L>
      <L num={l()} indent={1}>{vr('status')}{tx(':')} {st('"prototype"')} {tx('|')} {st('"production"')} {tx('|')} {st('"research"')}{tx(';')}</L>
      <L num={l()} indent={1}>{vr('context')}{tx(':')} {ty('string')}{tx(';')}</L>
      <L num={l()} indent={1}>{vr('outcome')}{tx(':')} {ty('string')}{tx(';')}</L>
      <L num={l()}>{tx('}')}</L>
      <L num={l()}></L>
      <L num={l()}>{co('// ── Active Experiments ───────────────────────────────')}</L>
      <L num={l()}>{kw('const')} {vr('experiments')}{tx(':')} {ty('LLMExperiment[]')} {tx('= [')}</L>
      <L num={l()} indent={1}>{tx('{')}</L>
      <L num={l()} indent={2}>{vr('name')}{tx(': ')}{st('"LLM Log Summarizer"')}{tx(',')}</L>
      <L num={l()} indent={2}>{vr('model')}{tx(': ')}{st('"gpt-4"')}{tx(',')}</L>
      <L num={l()} indent={2}>{vr('status')}{tx(': ')}{st('"prototype"')}{tx(',')}</L>
      <L num={l()} indent={2}>{vr('context')}{tx(': ')}{st('"UPS customs error logs – root cause analysis"')}{tx(',')}</L>
      <L num={l()} indent={2}>{vr('outcome')}{tx(': ')}{st('"Natural language error summaries for on-call engineers"')}{tx(',')}</L>
      <L num={l()} indent={1}>{tx('},')}</L>
      <L num={l()} indent={1}>{tx('{')}</L>
      <L num={l()} indent={2}>{vr('name')}{tx(': ')}{st('"AI Code Refactoring Pipeline"')}{tx(',')}</L>
      <L num={l()} indent={2}>{vr('model')}{tx(': ')}{st('"copilot"')}{tx(',')}</L>
      <L num={l()} indent={2}>{vr('status')}{tx(': ')}{st('"production"')}{tx(',')}</L>
      <L num={l()} indent={2}>{vr('context')}{tx(': ')}{st('"Java legacy code modernization at UPS"')}{tx(',')}</L>
      <L num={l()} indent={2}>{vr('outcome')}{tx(': ')}{st('"40% faster refactoring cycles with AI pair programming"')}{tx(',')}</L>
      <L num={l()} indent={1}>{tx('},')}</L>
      <L num={l()} indent={1}>{tx('{')}</L>
      <L num={l()} indent={2}>{vr('name')}{tx(': ')}{st('"Regulatory Rule Explainer Agent"')}{tx(',')}</L>
      <L num={l()} indent={2}>{vr('model')}{tx(': ')}{st('"gpt-4o"')}{tx(',')}</L>
      <L num={l()} indent={2}>{vr('status')}{tx(': ')}{st('"research"')}{tx(',')}</L>
      <L num={l()} indent={2}>{vr('context')}{tx(': ')}{st('"Customs regulations → developer-friendly explanations"')}{tx(',')}</L>
      <L num={l()} indent={2}>{vr('outcome')}{tx(': ')}{st('"Agent workflow design for regulatory onboarding"')}{tx(',')}</L>
      <L num={l()} indent={1}>{tx('},')}</L>
      <L num={l()} indent={1}>{tx('{')}</L>
      <L num={l()} indent={2}>{vr('name')}{tx(': ')}{st('"Document Summarizer – Financial Statements"')}{tx(',')}</L>
      <L num={l()} indent={2}>{vr('model')}{tx(': ')}{st('"gpt-4"')}{tx(',')}</L>
      <L num={l()} indent={2}>{vr('status')}{tx(': ')}{st('"research"')}{tx(',')}</L>
      <L num={l()} indent={2}>{vr('context')}{tx(': ')}{st('"Mercedes-Benz: lease/loan document processing"')}{tx(',')}</L>
      <L num={l()} indent={2}>{vr('outcome')}{tx(': ')}{st('"Prototype for intelligent document summarization via RAG"')}{tx(',')}</L>
      <L num={l()} indent={1}>{tx('},')}</L>
      <L num={l()}>{tx('];')}</L>
      <L num={l()}></L>
      <L num={l()}>{co('// ── Prompt Engineering Snippets ─────────────────────')}</L>
      <L num={l()}>{kw('const')} {vr('systemPrompts')} {tx('= {')}</L>
      <L num={l()} indent={1}>{vr('logAnalysis')}{tx(': ')}{st('`')}</L>
      <L num={l()} indent={2}>{st('You are an expert Java/microservices engineer.')}</L>
      <L num={l()} indent={2}>{st('Analyze the following error log and provide:')}</L>
      <L num={l()} indent={2}>{st('1. Root cause in plain English')}</L>
      <L num={l()} indent={2}>{st('2. Likely code location')}</L>
      <L num={l()} indent={2}>{st('3. Recommended fix')}</L>
      <L num={l()} indent={1}>{st('`')}{tx(',')}</L>
      <L num={l()} indent={1}>{vr('codeReview')}{tx(': ')}{st('`')}</L>
      <L num={l()} indent={2}>{st('Review this Java code for: SOLID principles, performance,')}</L>
      <L num={l()} indent={2}>{st('Spring Boot best practices, and security concerns.')}</L>
      <L num={l()} indent={1}>{st('`')}{tx(',')}</L>
      <L num={l()}>{tx('};')}</L>
      <L num={l()}></L>
      <L num={l()}>{co('// ── Tech Stack for AI Work ────────────────────────────')}</L>
      <L num={l()}>{kw('const')} {vr('aiStack')} {tx('= {')}</L>
      <L num={l()} indent={1}>{vr('llms')}{tx(': [')}
        {['"GPT-4"', '"GPT-4o"', '"Claude-3"'].map((s,i,a)=><>{st(s)}{i<a.length-1?tx(', '):''}</>)}
        {tx('],')}
      </L>
      <L num={l()} indent={1}>{vr('tools')}{tx(': [')}
        {['"GitHub Copilot"', '"LangChain"', '"OpenAI API"', '"Hugging Face"'].map((s,i,a)=><>{st(s)}{i<a.length-1?tx(', '):''}</>)}
        {tx('],')}
      </L>
      <L num={l()} indent={1}>{vr('concepts')}{tx(': [')}
        {['"RAG"', '"Vector Embeddings"', '"Agent Workflows"', '"Prompt Engineering"'].map((s,i,a)=><>{st(s)}{i<a.length-1?tx(', '):''}</>)}
        {tx('],')}
      </L>
      <L num={l()} indent={1}>{vr('languages')}{tx(': [')}
        {['"Python"', '"TypeScript"', '"Java"'].map((s,i,a)=><>{st(s)}{i<a.length-1?tx(', '):''}</>)}
        {tx('],')}
      </L>
      <L num={l()}>{tx('};')}</L>
      <L num={l()}></L>
      <L num={l()}>{kw('export')} {tx('{ ')}{vr('experiments')}{tx(', ')}{vr('aiStack')}{tx(', ')}{vr('systemPrompts')}{tx(' };')}</L>
    </div>
  );
};

export default AILabEditor;

