import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SectionHeader from './SectionHeader';
import { cn } from '../utils/cn';
import { CARD_SURFACE, SECTION_CONTAINER, SECTION_SPACING } from './layout';

interface StatItem {
  target: number;
  suffix: string;
  label: string;
  isInfinity?: boolean;
}

const STATS_DATA: StatItem[] = [
  { target: 6, suffix: '+', label: 'Years Experience' },
  { target: 40, suffix: '+', label: 'Projects Shipped' },
  { target: 15, suffix: '+', label: 'Happy Clients' },
  { target: 999, suffix: '', label: 'Coffees Consumed', isInfinity: true },
];

const PILLARS = [
  {
    icon: '⚡',
    title: 'Performance & Scale',
    desc: 'Architecting sub-second APIs, smart caching strategies, and ultra-optimized frontend bundle deliveries.',
  },
  {
    icon: '🎨',
    title: 'Design-Driven Engineering',
    desc: 'Translating complex UX design systems into accessible, fluid, and pixel-accurate interactive components.',
  },
  {
    icon: '🤝',
    title: 'Collaborative Leadership',
    desc: 'Mentoring engineering teams, setting up high-standard code reviews, CI/CD automation, and modern standards.',
  },
];

interface AboutProps {
  onOpenResume?: () => void;
}

export default function About({ onOpenResume }: AboutProps) {
  const { isDark } = useTheme();
  const ref = useScrollReveal();
  const statsRef = useRef<HTMLDivElement>(null);
  const [hasCounted, setHasCounted] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  // Count up stats animation when visible
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasCounted) {
          setHasCounted(true);

          const duration = 1600;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounts([
              Math.floor(easeOut * 6),
              Math.floor(easeOut * 40),
              Math.floor(easeOut * 15),
              999,
            ]);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts([6, 40, 15, 999]);
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasCounted]);

  return (
    <section
      id="about"
      ref={ref}
      className={cn('section-hidden section-shell', SECTION_SPACING, isDark ? 'bg-slate-900/60' : 'bg-slate-50/70')}
    >
      <div className={SECTION_CONTAINER}>
        <SectionHeader
          isDark={isDark}
          eyebrow="Get to know me"
          title="About Me"
          description="A passion for elegant code, modern web performance, and building resilient systems."
        />

        <div className="mt-16 sm:mt-20 flex flex-col items-center gap-14">
          {/* Main Narrative */}
          <div className="max-w-3xl text-center space-y-6">
            <p className={cn('text-lg sm:text-xl leading-relaxed', isDark ? 'text-slate-300' : 'text-slate-700')}>
              Hey there! I'm <strong className={isDark ? 'text-white font-bold' : 'text-slate-900 font-bold'}>Roberto Pires</strong> — a senior full-stack developer based in São Paulo, Brazil 🇧🇷. Over the past 6+ years, I've had the privilege of architecting high-impact SaaS applications, leading agile developer squads, and building systems that scale effortlessly.
            </p>

            <p className={cn('text-base sm:text-lg leading-relaxed', isDark ? 'text-slate-300' : 'text-slate-600')}>
              My core playground is the modern TypeScript & JavaScript ecosystem — specifically React, Next.js, Node.js, and cloud backends. I thrive at the exact crossroads of robust engineering and thoughtful user experience: where sub-second latency meets micro-animations and intuitive workflows.
            </p>

            <p className={cn('text-base sm:text-lg leading-relaxed', isDark ? 'text-slate-300' : 'text-slate-600')}>
              When away from the keyboard, you'll find me exploring Brazilian backcountry hiking trails, experimenting with creative coding and generative shaders, or reading up on distributed systems architecture.
            </p>

            {/* Core Values & Tags */}
            <div className="flex flex-wrap justify-center gap-2 pt-3">
              {[
                'Clean Code',
                'Design Systems',
                'Micro-Frontends',
                'Open Source',
                'WCAG Accessibility',
                'Cloud Architecture',
                'Remote-First',
                'Continuous Mentorship',
              ].map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    'px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-200 hover:scale-105',
                    isDark
                      ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20'
                      : 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Résumé Action Button */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onOpenResume}
                className={cn(
                  'inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-2xl font-semibold text-sm sm:text-base border transition-all duration-300 shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer',
                  isDark
                    ? 'border-indigo-500/40 bg-indigo-600/20 text-indigo-200 hover:bg-indigo-600/30 hover:border-indigo-400'
                    : 'border-indigo-200 bg-white text-indigo-600 hover:bg-indigo-50 shadow-slate-200'
                )}
              >
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>View Full Curriculum Vitae</span>
              </button>
            </div>
          </div>

          {/* Pillars Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className={cn(
                  CARD_SURFACE,
                  'spotlight-card p-6 sm:p-8 flex flex-col items-start gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
                  isDark
                    ? 'bg-slate-800/60 border-white/5 hover:border-indigo-500/30 shadow-black/20'
                    : 'bg-white/90 border-slate-200/80 hover:border-indigo-200 shadow-slate-200/60'
                )}
              >
                <span className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-indigo-500/10 border border-indigo-500/20">
                  {pillar.icon}
                </span>
                <h3 className={cn('text-lg font-bold', isDark ? 'text-white' : 'text-slate-900')}>
                  {pillar.title}
                </h3>
                <p className={cn('text-sm leading-relaxed', isDark ? 'text-slate-300' : 'text-slate-600')}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Animated Stats Grid */}
          <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 w-full">
            {STATS_DATA.map((s, idx) => (
              <div
                key={s.label}
                className={cn(
                  CARD_SURFACE,
                  'spotlight-card p-6 sm:p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl',
                  isDark
                    ? 'bg-slate-800/60 border-white/5 hover:border-indigo-500/30 hover:shadow-indigo-500/10'
                    : 'bg-white/85 border-slate-200/80 hover:border-indigo-200 hover:shadow-indigo-100'
                )}
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black gradient-text mb-2 font-mono">
                  {s.isInfinity ? '∞' : `${counts[idx]}${s.suffix}`}
                </div>
                <div className={cn('text-xs sm:text-sm font-semibold tracking-wide', isDark ? 'text-slate-400' : 'text-slate-600')}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
