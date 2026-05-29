import { useTheme } from '../context/ThemeContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SectionHeader from './SectionHeader';
import { cn } from '../utils/cn';

const STATS = [
  { value: '6+', label: 'Years Experience' },
  { value: '40+', label: 'Projects Shipped' },
  { value: '15+', label: 'Happy Clients' },
  { value: '∞', label: 'Coffees Consumed' },
];

export default function About() {
  const { isDark } = useTheme();
  const ref = useScrollReveal();

  return (
    <section id="about" ref={ref} className={cn('section-hidden py-24 sm:py-32', isDark ? 'bg-gray-900' : 'bg-white')}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader isDark={isDark} eyebrow="Get to know me" title="About Me" />

        <div className="mt-16 flex flex-col items-center gap-12 text-center">
          <div className="space-y-6 flex flex-col items-center">
            <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Hey! I'm <strong className={isDark ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}>Roberto</strong> — a full-stack developer based in São Paulo, Brazil 🇧🇷, with a deep love for building robust web applications and intuitive user interfaces.
            </p>
            <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              I specialize in the JavaScript ecosystem — React, Node.js, TypeScript — and love pairing engineering precision with thoughtful design. Whether it's architecting a scalable API or crafting a delightful micro-interaction, I care about every detail.
            </p>
            <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              When I'm not coding, you'll find me exploring hiking trails, experimenting with generative art, or contributing to open-source projects. I believe the best products come from the intersection of empathy and engineering.
            </p>

            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {['Clean Code', 'Agile', 'Open Source', 'UX-Driven', 'Remote-First', 'Continuous Learner'].map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    'px-3 py-1 rounded-full text-sm font-medium border',
                    isDark
                      ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300'
                      : 'bg-indigo-50 border-indigo-200 text-indigo-700'
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all duration-300 hover:-translate-y-0.5',
                  isDark
                    ? 'border-white/15 text-white hover:bg-white/10'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                )}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Résumé
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8 w-full">
            {STATS.map((s) => (
              <div
                key={s.label}
                className={cn(
                  'rounded-2xl p-8 text-center border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
                  isDark
                    ? 'bg-gray-800/60 border-white/5 hover:border-indigo-500/30 hover:shadow-indigo-500/10'
                    : 'bg-gray-50 border-gray-100 hover:border-indigo-200 hover:shadow-indigo-100'
                )}
              >
                <div className="text-4xl font-black gradient-text mb-2">{s.value}</div>
                <div className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

