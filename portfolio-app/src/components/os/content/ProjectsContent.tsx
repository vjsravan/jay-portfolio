import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: 'Customs Processing Platform',
    company: 'UPS',
    icon: '📦',
    color: '#06b6d4',
    metric: '100k+',
    metricLabel: 'tx / week',
    tags: ['Java 21', 'Spring WebFlux', 'Apache Camel', 'OpenShift', 'ArgoCD'],
    highlights: ['10+ microservices in production', '30% faster customs processing', '40% faster data transfer (reactive)', '99.9% uptime SLA'],
    aiFeature: 'LLM-based log summarization for error root-cause analysis',
  },
  {
    id: 2,
    title: 'Automotive Finance Platform',
    company: 'Mercedes-Benz FS',
    icon: '🚗',
    color: '#8b5cf6',
    metric: '40%',
    metricLabel: 'less maintenance',
    tags: ['Spring Boot', 'Angular 17', 'DB2', 'PostgreSQL', 'Jenkins'],
    highlights: ['Legacy Struts → Angular 17 migration', '25% transaction throughput boost', '30% DB performance improvement'],
    aiFeature: 'AI-accelerated UI migration and API scaffolding',
  },
  {
    id: 3,
    title: 'Healthcare Claims Portal',
    company: 'United Healthcare',
    icon: '🏥',
    color: '#10b981',
    metric: 'HIPAA',
    metricLabel: 'Compliant',
    tags: ['GraphQL', 'Kafka', 'AWS', 'Spring Boot', 'JWT'],
    highlights: ['GraphQL APIs with fine-grained JWT/OAuth', 'Async processing via Apache Kafka', 'Deployed on AWS (EC2, S3, ELB)'],
    aiFeature: null,
  },
  {
    id: 4,
    title: 'Payment Dashboard',
    company: 'Wells Fargo',
    icon: '🏦',
    color: '#f59e0b',
    metric: 'Real-Time',
    metricLabel: 'Kafka alerts',
    tags: ['React', 'Redux', 'MongoDB', 'Docker', 'Azure'],
    highlights: ['Real-time payment notifications via Kafka', 'MongoDB migration from SQL', 'Containerized with Docker on Azure'],
    aiFeature: null,
  },
  {
    id: 5,
    title: 'AI Portfolio Assistant',
    company: 'Personal Project',
    icon: '🤖',
    color: '#ec4899',
    metric: 'GPT-4',
    metricLabel: 'powered',
    tags: ['React', 'TypeScript', 'OpenAI API', 'Framer Motion'],
    highlights: ['Streaming GPT-3.5/4 responses', 'Resume-aware context system', 'LLM prompt engineering'],
    aiFeature: 'Core feature — streaming OpenAI integration with portfolio context',
  },
  {
    id: 6,
    title: 'Real-Time Customs Dashboard',
    company: 'UPS',
    icon: '📊',
    color: '#38bdf8',
    metric: '50%',
    metricLabel: 'fewer lookups',
    tags: ['Angular 17', 'TypeScript', 'OAuth 2.0', 'Material UI'],
    highlights: ['Real-time shipment tracking', '50% reduction in manual lookups', 'OAuth2 + JWT secured endpoints'],
    aiFeature: 'AI-assisted component scaffolding via GitHub Copilot',
  },
];

const ProjectsContent: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="h-full overflow-y-auto os-scrollbar">
      <div className="p-4 grid grid-cols-2 gap-3">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => setSelected(selected === p.id ? null : p.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-xl p-3.5 cursor-pointer transition-all"
            style={{
              background: selected === p.id ? p.color + '15' : p.color + '08',
              border: `1px solid ${selected === p.id ? p.color + '50' : p.color + '20'}`,
              boxShadow: selected === p.id ? `0 0 20px ${p.color}18` : 'none',
            }}
          >
            {/* Card header */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-2xl">{p.icon}</span>
              <div className="text-right">
                <div className="text-lg font-black leading-tight" style={{ color: p.color }}>{p.metric}</div>
                <div className="text-[9px] text-gray-600 leading-tight">{p.metricLabel}</div>
              </div>
            </div>
            <h3 className="text-white font-semibold text-xs leading-tight mb-0.5">{p.title}</h3>
            <p className="text-gray-500 text-[10px] mb-2">{p.company}</p>

            {/* Tech tags (always visible) */}
            <div className="flex flex-wrap gap-1">
              {p.tags.slice(0, 3).map(t => (
                <span key={t} className="text-[9px] px-1.5 py-0.5 rounded font-mono"
                  style={{ color: p.color, background: p.color + '18', border: `1px solid ${p.color}25` }}>
                  {t}
                </span>
              ))}
            </div>

            {/* Expanded details */}
            <AnimatePresence>
              {selected === p.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 pt-3 space-y-1.5" style={{ borderTop: `1px solid ${p.color}20` }}>
                    {p.highlights.map((h, j) => (
                      <p key={j} className="text-[10px] text-gray-400 flex items-start gap-1">
                        <span style={{ color: p.color }} className="flex-shrink-0">▸</span>{h}
                      </p>
                    ))}
                    {p.aiFeature && (
                      <div className="mt-2 flex items-start gap-1.5 text-[10px]"
                        style={{ color: '#ec4899' }}>
                        <Sparkles size={9} className="flex-shrink-0 mt-0.5" />
                        <span>{p.aiFeature}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsContent;

