import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../../data/resume';
import { useIsMobile } from '../../../hooks/useIsMobile';

const ProjectsPanel: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const isTablet = useIsMobile(1024);

  return (
    <div className="w-full h-full flex flex-col overflow-y-auto nx-scroll" style={{ padding: isMobile ? '1rem' : '1.5rem 2rem' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-5"
      >
        <div className="w-1.5 h-6 rounded-full" style={{ background: '#ff6b00', boxShadow: '0 0 10px #ff6b00' }} />
        <h2 className="font-mono font-bold tracking-widest text-sm" style={{ color: '#ff6b00' }}>
          PROJECT DOSSIER
        </h2>
        <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(255,107,0,0.4), transparent)' }} />
        <span className="font-mono text-[10px]" style={{ color: 'rgba(255,107,0,0.4)' }}>
          {projects.length} ENTRIES
        </span>
      </motion.div>

      {/* Project grid */}
      <div className={`grid gap-3 pb-4 ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {projects.map((proj, i) => {
            const isHovered = hovered === proj.id;
            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                onHoverStart={() => setHovered(proj.id)}
                onHoverEnd={() => setHovered(null)}
                className="relative rounded-xl overflow-hidden flex flex-col"
                style={{
                  background: `${proj.color}07`,
                  border: `1px solid ${proj.color}${isHovered ? '55' : '20'}`,
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  boxShadow: isHovered ? `0 0 25px ${proj.color}30` : 'none',
                  cursor: 'default',
                  minHeight: 200,
                }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Top accent bar */}
                <div
                  className="h-1 flex-shrink-0"
                  style={{ background: `linear-gradient(90deg, ${proj.color}, ${proj.color}40)` }}
                />

                {/* Scan line animation on hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ top: 0, opacity: 0 }}
                      animate={{ top: '100%', opacity: [0, 0.8, 0.8, 0] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: 'linear' }}
                      className="absolute left-0 right-0 h-px pointer-events-none z-10"
                      style={{ background: proj.color, boxShadow: `0 0 8px ${proj.color}` }}
                    />
                  )}
                </AnimatePresence>

                <div className="p-4 flex flex-col gap-2 flex-1">
                  {/* Icon + featured badge */}
                  <div className="flex items-start justify-between">
                    <span className="text-2xl">{proj.icon}</span>
                    {proj.featured && (
                      <span
                        className="font-mono text-[9px] px-1.5 py-0.5 rounded"
                        style={{ background: `${proj.color}20`, color: proj.color, border: `1px solid ${proj.color}40` }}
                      >
                        FEATURED
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="font-bold text-white text-sm leading-tight">{proj.title}</h3>
                    <p className="font-mono text-[10px] mt-0.5" style={{ color: proj.color }}>{proj.subtitle}</p>
                  </div>

                  {/* Description */}
                  <p
                    className="text-[11px] leading-relaxed flex-1"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                  >
                    {proj.description}
                  </p>

                  {/* Metric */}
                  <div className="flex items-baseline gap-1">
                    <span
                      className="font-mono font-black text-xl"
                      style={{ color: proj.color, textShadow: `0 0 12px ${proj.color}80` }}
                    >
                      {proj.metric}
                    </span>
                    <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      {proj.metricLabel}
                    </span>
                  </div>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {proj.tech.slice(0, 4).map(t => (
                      <span
                        key={t}
                        className="font-mono text-[9px] px-1.5 py-0.5 rounded"
                        style={{
                          background: `${proj.color}0f`,
                          border: `1px solid ${proj.color}22`,
                          color: 'rgba(255,255,255,0.5)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                    {proj.tech.length > 4 && (
                      <span className="font-mono text-[9px] px-1.5 py-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
                        +{proj.tech.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
};

export default ProjectsPanel;

