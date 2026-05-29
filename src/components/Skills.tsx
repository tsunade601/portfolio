import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import SectionHeader from './SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { CARD_SURFACE, SECTION_CONTAINER, SECTION_SPACING } from './layout';

const SKILL_GROUPS = [
  {
    category: 'Frontend',
    icon: '🎨',
    color: '#6366f1',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Vue.js', level: 78 },
      { name: 'Animations & Motion', level: 80 },
    ],
  },
  {
    category: 'Backend',
    icon: '⚙️',
    color: '#a855f7',
    skills: [
      { name: 'Node.js / Express', level: 90 },
      { name: 'Python / Django', level: 82 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'GraphQL', level: 78 },
      { name: 'Redis & Caching', level: 75 },
    ],
  },
  {
    category: 'DevOps & Tools',
    icon: '🛠️',
    color: '#06b6d4',
    skills: [
      { name: 'Docker & Compose', level: 82 },
      { name: 'AWS / GCP', level: 75 },
      { name: 'CI/CD (GitHub Actions)', level: 85 },
      { name: 'Git & Version Control', level: 95 },
      { name: 'Linux / Shell', level: 78 },
    ],
  },
];

const TOOLS = [
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'Node.js', icon: '🟩' },
  { name: 'Python', icon: '🐍' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Docker', icon: '🐳' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Git', icon: '📁' },
  { name: 'Figma', icon: '🎨' },
  { name: 'GraphQL', icon: '◈' },
  { name: 'Redis', icon: '🔴' },
  { name: 'Linux', icon: '🐧' },
];

export default function Skills() {
  const { isDark } = useTheme();
  const ref = useScrollReveal();
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimated(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref} className={`section-hidden section-shell ${SECTION_SPACING} ${isDark ? 'bg-gray-950/80' : 'bg-gray-50/80'}`}>
      <div className={SECTION_CONTAINER} ref={sectionRef}>
        <SectionHeader isDark={isDark} eyebrow="My toolkit" title="Skills" />

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className={`${CARD_SURFACE} p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                isDark
                  ? 'bg-gray-900/80 border-white/5 hover:shadow-black/30'
                  : 'bg-white/85 border-gray-100 hover:shadow-gray-100'
              }`}
            >
              
              <div className="flex items-center gap-4 mb-8">
                <span className="text-2xl">{group.icon}</span>
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {group.category}
                </h3>
              </div>

              <div className="space-y-6">
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {skill.name}
                      </span>
                      <span className={`text-xs font-mono font-semibold`} style={{ color: group.color }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      <div
                        className="h-full rounded-full skill-bar-fill"
                        style={{
                          width: animated ? `${skill.level}%` : '0%',
                          background: `linear-gradient(90deg, ${group.color}, ${group.color}aa)`,
                          boxShadow: `0 0 8px ${group.color}60`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className={`text-center text-sm font-mono font-semibold uppercase tracking-widest mb-8 ${
            isDark ? 'text-gray-500' : 'text-gray-400'
          }`}>
            Technologies I work with
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
            {TOOLS.map((tool) => (
              <div
                key={tool.name}
                className={`flex flex-col items-center gap-3 p-6 rounded-2xl border cursor-default
                  transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                  isDark
                    ? 'bg-gray-900 border-white/5 hover:border-indigo-500/30 hover:shadow-indigo-500/10'
                    : 'bg-white border-gray-100 hover:border-indigo-200 hover:shadow-indigo-50'
                }`}
              >
                <span className="text-2xl">{tool.icon}</span>
                <span className={`text-xs font-medium text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { label: 'Problem Solving', icon: '🧩' },
            { label: 'Team Leadership', icon: '🤝' },
            { label: 'System Design', icon: '🏗️' },
            { label: 'Communication', icon: '💬' },
          ].map((s) => (
            <div
              key={s.label}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl border text-base font-medium ${
                isDark
                  ? 'bg-gray-900 border-white/5 text-gray-300'
                  : 'bg-white border-gray-100 text-gray-700'
              }`}
            >
              <span className="text-xl">{s.icon}</span>
              {s.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
