import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import SectionHeader from './SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { CARD_SURFACE, SECTION_CONTAINER, SECTION_SPACING } from './layout';
import { cn } from '../utils/cn';

const SKILL_GROUPS = [
  {
    category: 'Frontend & Architecture',
    icon: '🎨',
    color: '#6366f1',
    skills: [
      { name: 'React 19 & Next.js', level: 95 },
      { name: 'TypeScript & JavaScript (ESNext)', level: 92 },
      { name: 'Tailwind CSS & Design Systems', level: 94 },
      { name: 'Micro-Frontends & Module Federation', level: 85 },
      { name: 'Web Performance & Web Vitals', level: 90 },
      { name: 'Vue.js & Modern UI Tooling', level: 80 },
    ],
  },
  {
    category: 'Backend & Systems',
    icon: '⚙️',
    color: '#a855f7',
    skills: [
      { name: 'Node.js & Express / NestJS', level: 90 },
      { name: 'PostgreSQL & Database Design', level: 88 },
      { name: 'GraphQL & RESTful API Architecture', level: 86 },
      { name: 'Redis Caching & Pub/Sub', level: 82 },
      { name: 'Python & Django Backend Services', level: 80 },
      { name: 'WebSockets & Event-Driven Systems', level: 85 },
    ],
  },
  {
    category: 'DevOps & Cloud Infrastructure',
    icon: '🛠️',
    color: '#06b6d4',
    skills: [
      { name: 'Docker & Containerization', level: 86 },
      { name: 'CI/CD Pipelines (GitHub Actions)', level: 88 },
      { name: 'AWS Cloud (ECS, S3, CloudFront)', level: 80 },
      { name: 'Git & Advanced Version Control', level: 95 },
      { name: 'Automated Testing (Jest, Playwright)', level: 84 },
      { name: 'Linux / Shell Scripting', level: 82 },
    ],
  },
];

const TOOLS = [
  { name: 'React', icon: '⚛️', note: 'Primary library for dynamic UIs' },
  { name: 'TypeScript', icon: '🔷', note: 'Strict typing for production code' },
  { name: 'Node.js', icon: '🟩', note: 'High-throughput event-driven backends' },
  { name: 'PostgreSQL', icon: '🐘', note: 'Relational data modeling & queries' },
  { name: 'GraphQL', icon: '◈', note: 'Flexible schema-driven data graphs' },
  { name: 'Docker', icon: '🐳', note: 'Reproducible containerized environments' },
  { name: 'AWS', icon: '☁️', note: 'Cloud hosting, serverless & storage' },
  { name: 'Tailwind', icon: '🎨', note: 'Utility-first modern design systems' },
  { name: 'Redis', icon: '🔴', note: 'In-memory caching and session store' },
  { name: 'Python', icon: '🐍', note: 'Scripting, APIs, and data utilities' },
  { name: 'Git', icon: '📁', note: 'Distributed branching & releases' },
  { name: 'Linux', icon: '🐧', note: 'Server deployment & administration' },
];

const METHODOLOGIES = [
  { label: 'System Design & Scalability', icon: '🏗️', desc: 'Designing decoupled, failure-tolerant architectures.' },
  { label: 'Agile & Continuous Delivery', icon: '🚀', desc: 'Rapid sprints, short feedback loops, CI/CD automation.' },
  { label: 'Cross-Functional Leadership', icon: '🤝', desc: 'Bridging design, product management, and engineering.' },
  { label: 'Performance & Accessibility', icon: '♿', desc: 'Delivering WCAG-compliant and ultra-fast user experiences.' },
];

export default function Skills() {
  const { isDark } = useTheme();
  const ref = useScrollReveal();
  const [animated, setAnimated] = useState(false);
  const [selectedTool, setSelectedTool] = useState<(typeof TOOLS)[0] | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={ref}
      className={cn('section-hidden section-shell', SECTION_SPACING, isDark ? 'bg-slate-950/80' : 'bg-slate-50/80')}
    >
      <div className={SECTION_CONTAINER} ref={sectionRef}>
        <SectionHeader
          isDark={isDark}
          eyebrow="My toolkit"
          title="Skills & Expertise"
          description="A comprehensive overview of the technologies, frameworks, and architectural principles I leverage."
        />

        {/* 3 Main Skill Groups with Animated Progress Bars */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className={cn(
                CARD_SURFACE,
                'spotlight-card p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl',
                isDark
                  ? 'bg-slate-900/85 border-white/10 hover:border-indigo-500/30 hover:shadow-black/30'
                  : 'bg-white/90 border-slate-200/90 hover:border-indigo-200 hover:shadow-indigo-100'
              )}
            >
              {/* Category Heading */}
              <div className="flex items-center gap-3.5 mb-8">
                <span className="text-2xl p-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                  {group.icon}
                </span>
                <h3 className={cn('text-base sm:text-lg font-bold tracking-tight', isDark ? 'text-white' : 'text-slate-900')}>
                  {group.category}
                </h3>
              </div>

              {/* Progress Bars */}
              <div className="space-y-5">
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1.5 text-xs sm:text-sm">
                      <span className={cn('font-medium', isDark ? 'text-slate-300' : 'text-slate-700')}>
                        {skill.name}
                      </span>
                      <span className="font-mono font-bold text-xs" style={{ color: group.color }}>
                        {skill.level}%
                      </span>
                    </div>

                    <div className={cn('h-2 rounded-full overflow-hidden', isDark ? 'bg-slate-800' : 'bg-slate-100')}>
                      <div
                        className="h-full rounded-full skill-bar-fill"
                        style={{
                          width: animated ? `${skill.level}%` : '0%',
                          background: `linear-gradient(90deg, ${group.color}, ${group.color}cc)`,
                          boxShadow: `0 0 10px ${group.color}50`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technologies Grid */}
        <div className="mt-16 sm:mt-20">
          <div className="text-center mb-8">
            <h3 className={cn('text-xs font-mono font-bold uppercase tracking-widest', isDark ? 'text-slate-400' : 'text-slate-500')}>
              Technologies & Frameworks
            </h3>
            <p className={cn('text-xs mt-1', isDark ? 'text-slate-500' : 'text-slate-400')}>
              Click any tool below to inspect its operational role
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {TOOLS.map((tool) => {
              const isSelected = selectedTool?.name === tool.name;
              return (
                <button
                  key={tool.name}
                  onClick={() => setSelectedTool(isSelected ? null : tool)}
                  className={cn(
                    'flex flex-col items-center gap-2.5 p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer text-center',
                    isSelected
                      ? 'border-indigo-500 bg-indigo-500/15 shadow-indigo-500/20 scale-105'
                      : isDark
                        ? 'bg-slate-900/80 border-slate-800 hover:border-indigo-500/40 hover:bg-slate-800/80'
                        : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-slate-200'
                  )}
                >
                  <span className="text-3xl transition-transform hover:scale-110 duration-200">{tool.icon}</span>
                  <span className={cn('text-xs font-bold font-mono tracking-wide', isDark ? 'text-slate-200' : 'text-slate-800')}>
                    {tool.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Tool Highlight Card */}
          {selectedTool && (
            <div
              className={cn(
                'mt-6 p-5 rounded-2xl border flex items-center justify-between gap-4 max-w-xl mx-auto animate-fade-in-up',
                isDark ? 'bg-indigo-950/40 border-indigo-500/30 text-slate-200' : 'bg-indigo-50/80 border-indigo-200 text-slate-800'
              )}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedTool.icon}</span>
                <div>
                  <h4 className="text-sm font-bold">{selectedTool.name}</h4>
                  <p className="text-xs text-indigo-500 dark:text-indigo-300">{selectedTool.note}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTool(null)}
                className="text-xs font-semibold px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-white/10"
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Methodologies & Soft Skills */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {METHODOLOGIES.map((m) => (
            <div
              key={m.label}
              className={cn(
                CARD_SURFACE,
                'p-6 flex flex-col gap-2 transition-all duration-200 hover:-translate-y-0.5',
                isDark ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white border-slate-200/80 shadow-sm'
              )}
            >
              <span className="text-2xl mb-1">{m.icon}</span>
              <h4 className={cn('text-sm font-bold', isDark ? 'text-white' : 'text-slate-900')}>
                {m.label}
              </h4>
              <p className={cn('text-xs leading-relaxed', isDark ? 'text-slate-400' : 'text-slate-500')}>
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
