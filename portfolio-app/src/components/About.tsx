import React, { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { metrics } from '../data/resume';
import { Layers, Cpu, CloudLightning, GraduationCap } from 'lucide-react';

const colorMap: Record<string, string> = {
  cyan: 'text-accent-cyan',
  purple: 'text-accent-purple',
  green: 'text-accent-green',
  orange: 'text-accent-orange',
};

// Animated counter using only framer-motion
function AnimatedCount({ value, inView }: { value: number; inView: boolean }) {
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, v => Math.round(v));

  React.useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, motionVal, value]);

  return <motion.span>{display}</motion.span>;
}

const About: React.FC = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.05 });

  return (
    <section id="about" ref={sectionRef} className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="terminal-text text-sm mb-2">// about.tsx</p>
          <h2 className="section-title">About Me</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Senior engineer passionate about building scalable systems and AI-augmented workflows
          </p>
        </motion.div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {metrics.map((m) => (
            <motion.div
              key={m.label}
              whileHover={{ scale: 1.05 }}
              className="glass-card-hover p-6 text-center"
            >
              <div className={`text-3xl md:text-4xl font-black mb-2 ${colorMap[m.color]}`}>
                <AnimatedCount value={m.value} inView={inView} />
                {m.suffix}
              </div>
              <p className="text-gray-400 text-sm font-medium">{m.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - About text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="glass-card p-8">
              {/* Terminal window chrome */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs font-mono text-gray-500">profile.md</span>
              </div>

              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  <span className="text-accent-cyan font-semibold">9+ years</span> of crafting robust,
                  scalable software across <span className="text-accent-purple">logistics</span>,{' '}
                  <span className="text-accent-green">automotive finance</span>, and{' '}
                  <span className="text-accent-orange">healthcare</span>.
                </p>
                <p>
                  At <span className="text-white font-semibold">UPS</span>, I architect microservices
                  processing <span className="text-accent-cyan font-semibold">100k+ customs transactions weekly</span>,
                  using reactive Java with Spring WebFlux and deploying via GitOps to OpenShift.
                </p>
                <p>
                  My AI journey includes <span className="text-accent-purple font-semibold">LLM Prompt Engineering</span>,
                  building AI-assisted dev workflows, and prototyping{' '}
                  <span className="text-accent-cyan font-semibold">log summarization systems</span> using
                  GPT-based models.
                </p>
                <p className="text-gray-400 text-sm font-mono">
                  <span className="text-accent-green">// Currently exploring: </span>
                  RAG pipelines, Agent workflows, OpenAI API integrations
                </p>
              </div>

              {/* Education */}
              <div className="mt-6 pt-6 border-t border-white/10 flex items-start gap-3">
                <GraduationCap className="text-accent-cyan mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-white font-semibold">Masters in Computer & Information Science</p>
                  <p className="text-gray-400 text-sm">Western Illinois University, Macomb, IL · 2021</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4"
          >
            {[
              {
                icon: <Layers className="text-accent-cyan" size={24} />,
                title: 'Full-Stack Architecture',
                desc: 'End-to-end ownership from React/Angular UIs to Spring Boot microservices, database design, and API contracts.',
                gradient: 'from-accent-cyan/10 to-transparent',
              },
              {
                icon: <CloudLightning className="text-accent-purple" size={24} />,
                title: 'Cloud & DevOps',
                desc: 'Deploying to AWS, Azure, GCP, and OpenShift using Docker, ArgoCD, Jenkins pipelines with GitOps practices.',
                gradient: 'from-accent-purple/10 to-transparent',
              },
              {
                icon: <Cpu className="text-accent-green" size={24} />,
                title: 'AI-Augmented Engineering',
                desc: 'Integrating LLM tools into development workflows — code review, documentation generation, and log analysis.',
                gradient: 'from-accent-green/10 to-transparent',
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                whileHover={{ x: 6 }}
                className={`glass-card-hover p-6 bg-gradient-to-r ${card.gradient}`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-white/5">{card.icon}</div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{card.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* AWS Badge */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card p-4 flex items-center gap-4 border border-accent-orange/30"
            >
              <div className="text-3xl">☁️</div>
              <div>
                <p className="text-white font-semibold text-sm">AWS Certified Developer</p>
                <p className="text-accent-orange text-xs font-mono">Associate Level · Amazon Web Services</p>
              </div>
              <div className="ml-auto">
                <span className="px-2 py-1 bg-accent-orange/20 text-accent-orange text-xs rounded-full font-mono">
                  CERTIFIED
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

