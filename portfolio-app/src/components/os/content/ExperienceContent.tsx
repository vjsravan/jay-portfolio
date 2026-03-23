import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences } from '../../../data/resume';
import { MapPin, Calendar, Sparkles } from 'lucide-react';

const ExperienceContent: React.FC = () => {
  const [expanded, setExpanded] = useState<number>(experiences[0].id);

  return (
    <div className="flex flex-col h-full overflow-y-auto os-scrollbar">
      {/* Horizontal company timeline at top */}
      <div
        className="flex items-center gap-0 px-4 py-3 overflow-x-auto flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', scrollbarWidth: 'none' }}
      >
        {experiences.map((exp, i) => (
          <React.Fragment key={exp.id}>
            <button
              onClick={() => setExpanded(exp.id)}
              className="flex-shrink-0 flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-all"
              style={expanded === exp.id
                ? { background: exp.color + '18', border: `1px solid ${exp.color}40` }
                : { border: '1px solid transparent' }
              }
            >
              <span className="text-lg">{exp.logo}</span>
              <span className="text-[9px] font-mono whitespace-nowrap" style={{ color: expanded === exp.id ? exp.color : 'rgba(255,255,255,0.35)' }}>
                {exp.company.split(' ').slice(0, 2).join(' ')}
              </span>
              {exp.current && (
                <span className="text-[8px] px-1 py-0.5 rounded-full font-mono animate-pulse"
                  style={{ background: exp.color + '25', color: exp.color }}>
                  NOW
                </span>
              )}
            </button>
            {i < experiences.length - 1 && (
              <div className="w-6 h-px flex-shrink-0" style={{ background: 'linear-gradient(90deg, ' + exp.color + '50, ' + experiences[i + 1].color + '50)' }} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Expanded detail panel */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto os-scrollbar">
        <AnimatePresence mode="wait">
          {experiences.filter(e => e.id === expanded).map(exp => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {/* Role header */}
              <div
                className="p-4 rounded-xl"
                style={{ background: exp.color + '0c', border: `1px solid ${exp.color}25` }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{exp.logo}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-white font-bold text-sm">{exp.company}</h3>
                      {exp.current && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full font-mono animate-pulse"
                          style={{ background: exp.color + '30', color: exp.color }}>
                          ● LIVE
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-medium mt-0.5" style={{ color: exp.color }}>{exp.role}</p>
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-500">
                      <span className="flex items-center gap-1"><Calendar size={9} />{exp.period}</span>
                      <span className="flex items-center gap-1"><MapPin size={9} />{exp.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key metrics */}
              <div className="grid grid-cols-3 gap-2">
                {exp.achievements.slice(0, 3).map(a => (
                  <div
                    key={a.metric}
                    className="p-2.5 rounded-xl text-center"
                    style={{ background: exp.color + '0c', border: `1px solid ${exp.color}20` }}
                  >
                    <div className="text-base font-black" style={{ color: exp.color }}>{a.metric}</div>
                    <div className="text-[9px] text-gray-500 leading-tight mt-0.5">{a.desc}</div>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div className="space-y-1.5">
                {exp.highlights.slice(0, 3).map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-2 text-xs text-gray-400"
                  >
                    <span style={{ color: exp.color }} className="flex-shrink-0 mt-0.5">▸</span>
                    <span>{h}</span>
                  </motion.div>
                ))}
              </div>

              {/* AI Work (if any) */}
              {exp.aiWork && exp.aiWork.length > 0 && (
                <div
                  className="p-3 rounded-xl"
                  style={{ background: 'rgba(236,72,153,0.06)', border: '1px solid rgba(236,72,153,0.18)' }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={11} className="text-pink-400" />
                    <span className="text-[10px] text-pink-400 font-mono">AI Work</span>
                  </div>
                  <div className="space-y-1">
                    {exp.aiWork.map((a, i) => (
                      <p key={i} className="text-[10px] text-gray-500 flex items-start gap-1.5">
                        <span className="text-pink-400 flex-shrink-0">•</span>{a}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5">
                {exp.tech.map(t => (
                  <span
                    key={t}
                    className="text-[10px] px-2 py-0.5 rounded-md font-mono"
                    style={{ color: exp.color, background: exp.color + '12', border: `1px solid ${exp.color}25` }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExperienceContent;

