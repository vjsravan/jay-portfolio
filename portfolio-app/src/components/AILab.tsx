import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Bot, User, Sparkles, Brain, Code2, FileText,
  Zap, ChevronRight, RotateCcw, Cpu
} from 'lucide-react';
import { aiAssistantContext } from '../data/resume';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  "What is Jay's current role?",
  "Tell me about AI work at UPS",
  "What are Jay's top Java skills?",
  "How many years of experience?",
  "What cloud platforms has Jay used?",
  "Describe the customs processing system",
];

// Simple response generator using keyword matching (no API key needed for demo)
const generateResponse = async (
  message: string,
  apiKey: string | null,
  onChunk: (chunk: string) => void
): Promise<void> => {
  if (apiKey) {
    // Real OpenAI call
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: aiAssistantContext },
            { role: 'user', content: message },
          ],
          stream: true,
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) return;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(l => l.startsWith('data: '));
        for (const line of lines) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;
          try {
            const parsed = JSON.parse(data);
            const token = parsed.choices?.[0]?.delta?.content;
            if (token) onChunk(token);
          } catch {}
        }
      }
    } catch (err) {
      onChunk("I'm having trouble connecting to OpenAI. Please check the API key and try again.");
    }
    return;
  }

  // Demo mode - intelligent keyword-based responses
  const msg = message.toLowerCase();
  let response = '';

  if (msg.includes('current role') || msg.includes('ups') || msg.includes('present')) {
    response = `Jay is currently a **Sr. Software Development Engineer** at **United Parcel Service (UPS)** since March 2024. 🚀

He's working on international customs & logistics processing for UK, UAE, and Canada markets, using:
- **Java 21** + Spring Boot WebFlux (reactive programming)
- **Apache Camel** for integration flows
- **Angular 17** dashboards for customs operations
- **OpenShift** + ArgoCD for GitOps deployments

Key achievement: Processing **100k+ customs transactions per week** with 99.9% uptime!`;
  } else if (msg.includes('ai') || msg.includes('llm') || msg.includes('copilot') || msg.includes('chatgpt')) {
    response = `Jay is actively building his AI engineering skills! 🤖

**Current AI Work at UPS:**
- Using **GitHub Copilot** for AI-assisted code refactoring & test generation
- **ChatGPT (GPT-4)** for complex stored procedure documentation
- Designed structured **prompt templates** for system architecture explanations
- Prototyped **LLM-based log summarization** to analyze customs errors
- Exploring **AI-agent workflows** for automated rule explanation

**AI Toolkit:** OpenAI API, RAG Concepts, Vector Embeddings, LLM Prompt Engineering, Agent-based Workflow Design`;
  } else if (msg.includes('java') || msg.includes('spring') || msg.includes('backend')) {
    response = `Jay is a **Java expert** with deep Spring ecosystem knowledge! ☕

**Java Skills:**
- Java **8 through 21** (including records, sealed classes, virtual threads)
- Spring Boot, Spring **WebFlux** (reactive programming)
- Spring Data JPA, Hibernate
- **Apache Camel** for EIP patterns
- Reactor (Mono/Flux) for reactive pipelines
- REST APIs, SOAP, GraphQL

At UPS, he built **10+ microservices** using reactive Java, improving customs processing speed by **30%**.`;
  } else if (msg.includes('year') || msg.includes('experience') || msg.includes('how long')) {
    response = `Jay has **9+ years** of professional software engineering experience! 📅

Career timeline:
- 🏦 **Wells Fargo** (2017-2019) - React/Redux + Spring Boot banking
- 🏥 **United Healthcare** (2020-2022) - Healthcare claims & HIPAA compliance
- 🚗 **Mercedes Benz Financial** (2022-2024) - Automotive finance platform
- 📦 **UPS** (2024-Present) - Logistics & AI-driven customs processing`;
  } else if (msg.includes('cloud') || msg.includes('aws') || msg.includes('azure') || msg.includes('devops')) {
    response = `Jay has extensive **cloud & DevOps** experience! ☁️

**Platforms Used:**
- **AWS** - EC2, S3, ELB, VPC, CloudWatch, CodeDeploy (AWS Certified Developer!)
- **Azure** - Azure DevOps, Azure Cloud deployments
- **GCP** - Google Pub/Sub integration at UPS
- **OpenShift** - Container platform at UPS with ArgoCD

**DevOps Tools:** Docker, Helm, Jenkins, GitHub Actions, Azure Pipelines, HashiCorp Vault, JFrog`;
  } else if (msg.includes('customs') || msg.includes('logistics') || msg.includes('microservice')) {
    response = `At **UPS**, Jay built a comprehensive customs processing platform! 📦

**Architecture highlights:**
- **10+ microservices** for international customs (UK, UAE, CA)
- Reactive pipelines with **Reactor (Mono/Flux)** - 40% faster throughput
- **Google Pub/Sub** + **ActiveMQ** for 99.9% message delivery uptime
- **Strategy Pattern** for country-specific customs logic
- **ConcurrentMapCacheManager** with 15-min TTL - 40% less DB load
- **HashiCorp Vault** + **JFrog** for security
- **OAuth 2.0** + JWT for API security`;
  } else if (msg.includes('frontend') || msg.includes('react') || msg.includes('angular')) {
    response = `Jay is a true **full-stack** engineer with strong frontend skills! 🎨

**Frontend Expertise:**
- **React.js** + Redux - Built payment dashboards at Wells Fargo
- **Angular** (all versions up to **v21**) - Main frontend at UPS & Mercedes
- **TypeScript** - Used across all recent projects
- Bootstrap, Material UI for UI components

At UPS, he built **Angular 17 dashboards** for real-time customs tracking, reducing manual lookup time by **50%**.`;
  } else if (msg.includes('education') || msg.includes('degree') || msg.includes('university')) {
    response = `Jay holds a **Master's degree** in Computer and Information Science! 🎓

- **Degree:** M.S. in Computer and Information Science
- **University:** Western Illinois University, Macomb, IL
- **Year:** 2021

Plus **AWS Certified Developer – Associate** certification! ☁️`;
  } else if (msg.includes('contact') || msg.includes('email') || msg.includes('hire') || msg.includes('reach')) {
    response = `Want to connect with Jay? Here's how! 📬

- **Email:** jayforfullstack@gmail.com
- **LinkedIn:** Connect to discuss opportunities
- **GitHub:** Check out his code

Jay is open to discussing senior engineering and AI-focused roles. Feel free to reach out!`;
  } else {
    response = `I'm Jay's AI assistant! I can tell you about:

🔧 **Technical Skills** - Java, Spring Boot, React, Angular, Python
☁️ **Cloud Expertise** - AWS, Azure, OpenShift, Docker  
🤖 **AI Engineering** - LLM tools, prompt engineering, RAG concepts
🏢 **Work Experience** - UPS, Mercedes Benz, United Healthcare, Wells Fargo
📚 **Education** - Masters in CS, AWS Certification

What would you like to know? Try asking about his current role, AI work, or any specific technology!`;
  }

  // Simulate streaming
  const words = response.split(' ');
  for (let i = 0; i < words.length; i++) {
    await new Promise(r => setTimeout(r, 30 + Math.random() * 20));
    onChunk((i === 0 ? '' : ' ') + words[i]);
  }
};

const AILab: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: `Hi! 👋 I'm Jay's AI portfolio assistant, powered by his resume data. Ask me anything about his experience, skills, or technical background!\n\nTry one of the suggested questions below, or ask your own.`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [streamingContent, setStreamingContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setIsStreaming(true);
    setStreamingContent('');

    let accumulated = '';
    await generateResponse(text, apiKey, (chunk) => {
      accumulated += chunk;
      setStreamingContent(accumulated);
    });

    setIsStreaming(false);
    setStreamingContent('');

    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: accumulated,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, assistantMsg]);
    setIsLoading(false);
  };

  const formatMessage = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />')
      .replace(/`(.*?)`/g, '<code class="font-mono text-accent-cyan bg-dark-700 px-1 rounded">$1</code>');
  };

  return (
    <section id="ai-lab" className="relative py-24 px-4">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="terminal-text text-sm mb-2">// ai_lab.initialize()</p>
          <h2 className="section-title">AI Lab</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Chat with Jay's AI assistant — powered by his resume context. 
            Connect your OpenAI API key for GPT-4 responses!
          </p>
        </motion.div>

        {/* AI Features Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { icon: <Brain size={20} />, label: 'Resume-Aware', color: 'accent-cyan', desc: 'Knows Jay\'s full background' },
            { icon: <Zap size={20} />, label: 'Streaming', color: 'accent-purple', desc: 'Real-time responses' },
            { icon: <Code2 size={20} />, label: 'Tech Deep-Dive', color: 'accent-green', desc: 'Ask about any tech' },
            { icon: <FileText size={20} />, label: 'Context-Rich', color: 'accent-orange', desc: 'Detailed answers' },
          ].map((f) => (
            <div key={f.label} className={`glass-card p-4 text-center border-${f.color}/20`}>
              <div className={`flex justify-center text-${f.color} mb-2`}>{f.icon}</div>
              <div className="text-white text-sm font-semibold">{f.label}</div>
              <div className="text-gray-500 text-xs mt-1">{f.desc}</div>
            </div>
          ))}
        </motion.div>

        {/* Main Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="glass-card overflow-hidden"
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-dark-800/50">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-accent-cyan to-accent-purple rounded-lg flex items-center justify-center">
                  <Cpu size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Jay's AI Assistant</p>
                  <p className="text-xs text-gray-500 font-mono">
                    {apiKey ? 'GPT-4 Mode 🔑' : 'Demo Mode'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-accent-purple/30 text-accent-purple rounded-lg hover:bg-accent-purple/10 transition-colors font-mono"
              >
                🔑 {apiKey ? 'Change Key' : 'Add OpenAI Key'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMessages([{
                  id: '0', role: 'assistant',
                  content: "Chat cleared! Ask me anything about Jay's experience and skills. 👋",
                  timestamp: new Date()
                }])}
                className="p-1.5 text-gray-500 hover:text-white transition-colors"
              >
                <RotateCcw size={14} />
              </motion.button>
            </div>
          </div>

          {/* API Key Input */}
          <AnimatePresence>
            {showApiKeyInput && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-b border-white/10 bg-dark-800/30 overflow-hidden"
              >
                <div className="p-4 flex items-center gap-3">
                  <input
                    type="password"
                    value={apiKeyInput}
                    onChange={e => setApiKeyInput(e.target.value)}
                    placeholder="sk-... (your OpenAI API key)"
                    className="flex-1 bg-dark-700 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono placeholder-gray-600 focus:outline-none focus:border-accent-purple/50"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (apiKeyInput.startsWith('sk-')) {
                        setApiKey(apiKeyInput);
                        setApiKeyInput('');
                        setShowApiKeyInput(false);
                      }
                    }}
                    className="px-4 py-2 bg-accent-purple/20 border border-accent-purple/30 text-accent-purple rounded-lg text-sm hover:bg-accent-purple/30 transition-colors"
                  >
                    Connect
                  </motion.button>
                  {apiKey && (
                    <button
                      onClick={() => { setApiKey(null); setShowApiKeyInput(false); }}
                      className="px-3 py-2 text-gray-500 hover:text-red-400 text-sm transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <p className="px-4 pb-3 text-xs text-gray-600 font-mono">
                  🔒 Key is stored in memory only and never sent anywhere except OpenAI.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-6 space-y-4 scrollbar-thin">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user'
                      ? 'bg-accent-cyan/20 text-accent-cyan'
                      : 'bg-gradient-to-br from-accent-cyan to-accent-purple text-white'
                  }`}
                >
                  {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-accent-cyan/10 border border-accent-cyan/20 text-white rounded-tr-none'
                      : 'bg-dark-700 border border-white/10 text-gray-300 rounded-tl-none'
                  }`}
                  dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                />
              </motion.div>
            ))}

            {/* Streaming message */}
            {isStreaming && streamingContent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3"
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-accent-cyan to-accent-purple text-white">
                  <Bot size={14} />
                </div>
                <div
                  className="max-w-[80%] px-4 py-3 rounded-2xl rounded-tl-none text-sm leading-relaxed bg-dark-700 border border-white/10 text-gray-300"
                  dangerouslySetInnerHTML={{ __html: formatMessage(streamingContent) + '<span class="cursor-blink ml-1" />' }}
                />
              </motion.div>
            )}

            {/* Loading dots */}
            {isLoading && !isStreaming && (
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center">
                  <Bot size={14} className="text-white" />
                </div>
                <div className="bg-dark-700 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 bg-accent-cyan rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          <div className="px-6 py-3 border-t border-white/5">
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  disabled={isLoading}
                  className="flex items-center gap-1 px-3 py-1 text-xs border border-accent-cyan/20 text-gray-400 hover:text-accent-cyan hover:border-accent-cyan/40 rounded-full transition-all duration-200 font-mono disabled:opacity-50"
                >
                  <ChevronRight size={10} />
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-3 bg-dark-800 border border-white/10 rounded-xl px-4 py-3 focus-within:border-accent-cyan/40 transition-colors">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
                placeholder="Ask about Jay's experience, skills, or projects..."
                disabled={isLoading}
                className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => sendMessage(input)}
                disabled={isLoading || !input.trim()}
                className="p-2 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Sparkles size={16} className="text-white animate-spin" />
                ) : (
                  <Send size={16} className="text-white" />
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* AI Concepts showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 grid md:grid-cols-3 gap-4"
        >
          {[
            {
              icon: '🧠',
              title: 'LLM Integration',
              desc: 'Built prompt templates for architecture docs and API generation at UPS.',
              tag: 'Production Prototype',
              color: 'accent-cyan',
            },
            {
              icon: '📊',
              title: 'Log Intelligence',
              desc: 'Prototyped LLM-based customs error log summarization for root cause analysis.',
              tag: 'Prototype',
              color: 'accent-purple',
            },
            {
              icon: '🤖',
              title: 'Agent Workflows',
              desc: 'Exploring autonomous AI agents for developer onboarding & regulatory rule explanation.',
              tag: 'Research',
              color: 'accent-green',
            },
          ].map((card) => (
            <motion.div
              key={card.title}
              whileHover={{ y: -4 }}
              className="glass-card-hover p-6"
            >
              <div className="text-3xl mb-3">{card.icon}</div>
              <h3 className="text-white font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-400 text-sm mb-3 leading-relaxed">{card.desc}</p>
              <span className={`text-xs font-mono px-2 py-0.5 rounded bg-${card.color}/10 text-${card.color} border border-${card.color}/20`}>
                {card.tag}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AILab;

