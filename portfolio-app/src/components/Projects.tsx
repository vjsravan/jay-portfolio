import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Brain } from 'lucide-react';

// 3D tilt + spotlight card
function TiltCard({ children, color }: { children: React.ReactNode; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(nx); y.set(ny);
    spotX.set(((e.clientX - rect.left) / rect.width) * 100);
    spotY.set(((e.clientY - rect.top) / rect.height) * 100);
  };
  const onLeave = () => { x.set(0); y.set(0); setHovered(false); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', perspective: 800 }}
      className="relative overflow-hidden glass-card flex flex-col cursor-default"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Spotlight overlay */}
      {hovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl z-10"
          style={{
            background: `radial-gradient(280px circle at ${spotX.get()}% ${spotY.get()}%, ${color}15, transparent 70%)`,
          }}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
        />
      )}
      {/* Animated gradient border on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `linear-gradient(135deg, ${color}40, transparent, ${color}20)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />
      <div className="group relative z-0 flex flex-col h-full">{children}</div>
    </motion.div>
  );
}

const projects = [
  {
    id: 1,
    title: 'Customs Processing Platform',
    company: 'UPS',
    type: 'Enterprise',
    description: 'Reactive microservices architecture handling 100k+ customs transactions weekly across UK, UAE, and Canada with 99.9% uptime.',
    icon: '📦',
    color: '#06b6d4',
    tags: ['Java 21', 'Spring WebFlux', 'Apache Camel', 'Reactor', 'OpenShift', 'ArgoCD'],
    highlights: [
      '10+ microservices in production',
      '30% faster customs processing',
      '40% faster data transfer (reactive)',
      'Strategy Pattern for multi-country logic',
    ],
    aiFeature: 'LLM-based log summarization prototype for error root-cause analysis',
    category: 'backend',
  },
  {
    id: 2,
    title: 'Real-Time Customs Dashboard',
    company: 'UPS',
    type: 'Frontend',
    description: 'Angular 17 dashboard enabling customs operations teams to track international shipments in real-time, reducing manual lookup time by 50%.',
    icon: '📊',
    color: '#38bdf8',
    tags: ['Angular 17', 'TypeScript', 'REST APIs', 'OAuth 2.0', 'JWT', 'Material UI'],
    highlights: [
      'Real-time tracking & status updates',
      '50% reduction in manual lookups',
      'OAuth2 + JWT secured endpoints',
      'Responsive for operations teams',
    ],
    aiFeature: 'AI-assisted component scaffolding via GitHub Copilot',
    category: 'frontend',
  },
  {
    id: 3,
    title: 'Automotive Finance Platform',
    company: 'Mercedes Benz Financial',
    type: 'Full Stack',
    description: 'Modernized legacy Struts application to Angular 17 + Spring Boot microservices for loan payments and lease tracking with 25% improved throughput.',
    icon: '🚗',
    color: '#8b5cf6',
    tags: ['Spring Boot', 'Angular 17', 'DB2', 'PostgreSQL', 'Jenkins', 'AWS CodeDeploy'],
    highlights: [
      'Legacy Struts → Angular 17 migration',
      '40% maintenance effort reduction',
      '25% transaction throughput boost',
      '30% DB performance improvement',
    ],
    aiFeature: 'AI-accelerated UI migration and API mapping automation',
    category: 'fullstack',
  },
  {
    id: 4,
    title: 'Healthcare Claims Portal',
    company: 'United Healthcare',
    type: 'Full Stack',
    description: 'HIPAA-compliant healthcare claims portal with GraphQL APIs, JWT/OAuth fine-grained access control, and Apache Kafka for async data exchange.',
    icon: '🏥',
    color: '#10b981',
    tags: ['GraphQL', 'Spring Boot', 'Angular', 'Apache Kafka', 'AWS', 'Hibernate', 'MySQL'],
    highlights: [
      'HIPAA-compliant architecture',
      'GraphQL with fine-grained JWT access',
      'Async processing via Kafka',
      'Deployed on AWS (EC2, S3, ELB)',
    ],
    aiFeature: null,
    category: 'fullstack',
  },
  {
    id: 5,
    title: 'AI Portfolio Assistant',
    company: 'Personal Project',
    type: 'AI Application',
    description: 'This very portfolio! Features a streaming AI assistant powered by GPT, built with React, TypeScript, and custom LLM prompt engineering to answer questions about career and skills.',
    icon: '🤖',
    color: '#ec4899',
    tags: ['React', 'TypeScript', 'OpenAI API', 'Streaming', 'Framer Motion', 'Vite'],
    highlights: [
      'Streaming GPT-3.5/4 responses',
      'Resume-aware context system',
      'Particle background canvas animation',
      'Interactive Tech Radar visualization',
    ],
    aiFeature: 'Core feature — LLM integration with streaming responses and resume context',
    category: 'ai',
  },
  {
    id: 6,
    title: 'Payment Dashboard',
    company: 'Wells Fargo',
    type: 'Full Stack',
    description: 'React/Redux interactive payment dashboard integrated with Spring Boot microservices, MongoDB for large-volume transactions, with real-time Kafka notifications.',
    icon: '🏦',
    color: '#f59e0b',
    tags: ['React', 'Redux', 'Spring Boot', 'MongoDB', 'Apache Kafka', 'Docker', 'Azure'],
    highlights: [
      'Real-time payment notifications',
      'MongoDB migration from SQL',
      'Containerized with Docker',
      'Deployed on Azure Cloud',
    ],
    aiFeature: null,
    category: 'fullstack',
  },
];

const filters = [
  { key: 'all', label: 'All Projects' },
  { key: 'backend', label: 'Backend' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'fullstack', label: 'Full Stack' },
  { key: 'ai', label: 'AI' },
];

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-24 px-4">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent-green/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="terminal-text text-sm mb-2">// projects.filter(p =&gt; p.isImpactful)</p>
          <h2 className="section-title">Featured Work</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Enterprise systems, AI experiments, and production-grade engineering
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {filters.map(f => (
            <motion.button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-300 ${
                activeFilter === f.key
                  ? 'bg-accent-cyan/20 border-accent-cyan/50 text-accent-cyan'
                  : 'border-white/10 text-gray-400 hover:text-white glass-card'
              }`}
            >
              {f.label}
              {f.key === 'ai' && (
                <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-accent-pink animate-pulse" />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88, y: -20 }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.23, 1, 0.32, 1] }}
              >
                <TiltCard color={project.color}>
                  <div className="flex flex-col h-full" style={{ borderTop: `2px solid ${project.color}` }}>
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">{project.icon}</div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-mono"
                        style={{
                          color: project.color,
                          backgroundColor: `${project.color}15`,
                          border: `1px solid ${project.color}30`,
                        }}
                      >
                        {project.type}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-white font-bold text-lg mb-1 transition-colors" style={{ color: undefined }}>
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono mb-3" style={{ color: project.color }}>
                    @ {project.company}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Highlights */}
                <div className="px-6 pb-4 flex-1">
                  <ul className="space-y-1.5">
                    {project.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-400">
                        <span style={{ color: project.color }} className="mt-0.5 flex-shrink-0 text-base leading-none">•</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* AI Feature badge */}
                {project.aiFeature && (
                  <div className="mx-6 mb-4 p-2.5 rounded-lg border border-accent-pink/20 bg-accent-pink/5">
                    <div className="flex items-start gap-1.5">
                      <Brain size={11} className="text-accent-pink mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-gray-400 leading-tight">
                        <span className="text-accent-pink font-semibold">AI: </span>
                        {project.aiFeature}
                      </p>
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="px-6 pb-6 border-t border-white/5 pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded font-mono bg-dark-700"
                        style={{ color: project.color, border: `1px solid ${project.color}20` }}
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="text-xs px-2 py-0.5 rounded font-mono text-gray-600 border border-white/10">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>
                </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

