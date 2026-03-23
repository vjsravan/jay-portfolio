import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences } from '../data/resume';
import { MapPin, Calendar, ChevronDown, ChevronUp, Sparkles, TrendingUp } from 'lucide-react';

const Experience: React.FC = () => {
  const [expanded, setExpanded] = useState<number>(1);

  return (
    <section id="experience" className="relative py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="terminal-text text-sm mb-2">// experience.forEach(role =&gt; render())</p>
          <h2 className="section-title">Professional Journey</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            9+ years across logistics, automotive finance, healthcare, and banking
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-cyan via-accent-purple to-accent-orange hidden md:block" />

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative md:pl-20"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-5 top-6 w-6 h-6 rounded-full border-2 hidden md:flex items-center justify-center z-10"
                  style={{
                    borderColor: exp.color,
                    backgroundColor: exp.current ? exp.color : '#0f172a',
                    boxShadow: exp.current ? `0 0 15px ${exp.color}80` : 'none',
                  }}
                >
                  {exp.current && <div className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                </div>

                {/* Card */}
                <div
                  className="glass-card overflow-hidden transition-all duration-300"
                  style={{ borderLeft: `3px solid ${expanded === exp.id ? exp.color : 'transparent'}` }}
                >
                  {/* Card Header */}
                  <button
                    className="w-full p-6 text-left"
                    onClick={() => setExpanded(expanded === exp.id ? -1 : exp.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">{exp.logo}</div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="text-white font-bold text-lg">{exp.company}</h3>
                            {exp.current && (
                              <span className="px-2 py-0.5 bg-accent-cyan/20 text-accent-cyan text-xs rounded-full font-mono animate-pulse">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-medium mb-2" style={{ color: exp.color }}>{exp.role}</p>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1"><Calendar size={12} />{exp.period}</span>
                            <span className="flex items-center gap-1"><MapPin size={12} />{exp.location}</span>
                            <span className="px-2 py-0.5 bg-white/5 rounded text-gray-400">{exp.domain}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-gray-500 flex-shrink-0 mt-1">
                        {expanded === exp.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>

                    {/* Tech tags preview */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.tech.slice(0, 5).map(t => (
                        <span key={t} className="px-2 py-0.5 text-xs font-mono rounded border"
                          style={{ color: exp.color, borderColor: `${exp.color}30`, backgroundColor: `${exp.color}10` }}>
                          {t}
                        </span>
                      ))}
                      {exp.tech.length > 5 && (
                        <span className="px-2 py-0.5 text-xs font-mono text-gray-500 border border-white/10 rounded">
                          +{exp.tech.length - 5} more
                        </span>
                      )}
                    </div>
                  </button>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expanded === exp.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 border-t border-white/10">
                          {/* Metrics */}
                          {exp.achievements.length > 0 && (
                            <div className="mt-6">
                              <div className="flex items-center gap-2 mb-3">
                                <TrendingUp size={14} style={{ color: exp.color }} />
                                <span className="text-xs font-mono text-gray-400">Key Metrics</span>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {exp.achievements.map((a, i) => (
                                  <div key={i} className="p-3 rounded-xl text-center border"
                                    style={{ backgroundColor: `${exp.color}08`, borderColor: `${exp.color}20` }}>
                                    <div className="text-xl font-black" style={{ color: exp.color }}>{a.metric}</div>
                                    <div className="text-xs text-gray-400 mt-1 leading-tight">{a.desc}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Highlights */}
                          <div className="mt-6">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-xs font-mono text-gray-400">Highlights</span>
                            </div>
                            <ul className="space-y-2">
                              {exp.highlights.map((h, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                  <span style={{ color: exp.color }} className="mt-1 flex-shrink-0">▸</span>
                                  {h}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* AI Work */}
                          {exp.aiWork.length > 0 && (
                            <div className="mt-6 p-4 rounded-xl border border-accent-orange/20 bg-accent-orange/5">
                              <div className="flex items-center gap-2 mb-3">
                                <Sparkles size={14} className="text-accent-orange" />
                                <span className="text-xs font-mono text-accent-orange">AI Contributions</span>
                              </div>
                              <ul className="space-y-2">
                                {exp.aiWork.map((w, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                    <span className="text-accent-orange mt-1 flex-shrink-0">✦</span>{w}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* All tech tags */}
                          <div className="mt-6">
                            <p className="text-xs font-mono text-gray-500 mb-3">Full Tech Stack</p>
                            <div className="flex flex-wrap gap-2">
                              {exp.tech.map(t => (
                                <span key={t} className="px-2 py-1 text-xs font-mono rounded border"
                                  style={{ color: exp.color, borderColor: `${exp.color}30`, backgroundColor: `${exp.color}10` }}>
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

