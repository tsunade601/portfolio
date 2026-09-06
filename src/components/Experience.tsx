import { useTheme } from '../context/ThemeContext';
import SectionHeader from './SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { CARD_SURFACE, SECTION_CONTAINER, SECTION_SPACING } from './layout';
import { cn } from '../utils/cn';

const EXPERIENCES = [
  {
    role: 'Senior Full-Stack Engineer',
    company: 'Techflow Inc.',
    location: 'Remote — São Paulo, BR',
    period: 'Jan 2022 – Present',
    current: true,
    color: '#6366f1',
    description:
      'Lead developer on the core product engineering squad, scaling a real-time analytics SaaS platform serving over 50,000 active users. Architected an enterprise-grade micro-frontend system using React & Webpack Module Federation, reducing deployment release cycles from days to minutes.',
    highlights: [
      'Reduced page load latency by 45% through aggressive bundle-splitting, SSR caching, and edge distribution.',
      'Led architectural migration to TypeScript across 120k+ lines of code, reducing runtime error reports by 38%.',
      'Mentored and coached a team of 5 junior and mid-level software engineers on modern best practices.',
      'Designed and executed automated CI/CD deployment pipelines utilizing GitHub Actions, Docker, and AWS ECS.',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'GraphQL'],
  },
  {
    role: 'Full-Stack Developer',
    company: 'Nexora Digital',
    location: 'São Paulo, BR',
    period: 'Mar 2020 – Dec 2021',
    current: false,
    color: '#a855f7',
    description:
      'Developed, tested, and maintained 8+ production client web applications using React, Python, and Django. Partnered closely with UX designers to engineer accessible, WCAG-compliant design systems and high-throughput RESTful API endpoints.',
    highlights: [
      'Shipped 8 multi-tenant production web apps on-schedule across fintech, healthcare, and retail verticals.',
      'Implemented bank-grade OAuth2, JWT, and multi-factor authentication systems with zero security incidents.',
      'Optimized complex SQL queries and PostgreSQL schemas, decreasing average endpoint latency by 35%.',
    ],
    tech: ['React', 'Python', 'Django', 'MySQL', 'Docker', 'Figma', 'Tailwind CSS', 'Jest'],
  },
  {
    role: 'Frontend Developer',
    company: 'StartUp Hub',
    location: 'São Paulo, BR',
    period: 'Jun 2018 – Feb 2020',
    current: false,
    color: '#06b6d4',
    description:
      'Founding engineer at a fast-paced startup accelerator. Built rapid MVPs, internal tooling, and client portals within tight deadlines, empowering 3 venture-backed startups to successfully close their seed rounds.',
    highlights: [
      'Delivered 3 complete product MVPs within consecutive 6-week development sprints.',
      'Created the accelerator’s first shared UI component library, slashing subsequent project kickoff times in half.',
      'Implemented Stripe Checkout and customized subscription management flows for high-converting landing pages.',
    ],
    tech: ['Vue.js', 'JavaScript', 'Firebase', 'Tailwind CSS', 'Stripe API', 'HTML5/CSS3'],
  },
];

export default function Experience() {
  const { isDark } = useTheme();
  const ref = useScrollReveal();

  return (
    <section
      id="experience"
      ref={ref}
      className={cn('section-hidden section-shell', SECTION_SPACING, isDark ? 'bg-slate-950/80' : 'bg-slate-50/80')}
    >
      <div className={SECTION_CONTAINER}>
        <SectionHeader
          isDark={isDark}
          eyebrow="Where I've worked"
          title="Work Experience"
          description="A track record of engineering scalable platforms, leading technical teams, and shipping production software."
        />

        <div className="mt-16 sm:mt-20 relative">
          {/* Vertical timeline line with glowing gradient */}
          <div
            className={cn(
              'absolute left-5 sm:left-8 top-4 bottom-4 w-[2px]',
              isDark
                ? 'bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-500 opacity-30'
                : 'bg-gradient-to-b from-indigo-400 via-purple-400 to-cyan-400 opacity-40'
            )}
          />

          <div className="space-y-10 sm:space-y-14">
            {EXPERIENCES.map((exp, i) => (
              <ExperienceCard key={exp.company} exp={exp} isDark={isDark} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  exp,
  isDark,
  index,
}: {
  exp: (typeof EXPERIENCES)[0];
  isDark: boolean;
  index: number;
}) {
  return (
    <div className="relative pl-14 sm:pl-20 md:pl-24" style={{ animationDelay: `${index * 0.15}s` }}>
      {/* Glowing Timeline Marker */}
      <div
        className="absolute left-1.5 sm:left-4.5 top-6 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-125 duration-300"
        style={{
          background: exp.color,
          boxShadow: `0 0 16px ${exp.color}70`,
        }}
      >
        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* Main Experience Card */}
      <div
        className={cn(
          CARD_SURFACE,
          'spotlight-card p-6 sm:p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl',
          isDark
            ? 'bg-slate-900/85 border-white/10 hover:border-indigo-500/40 hover:shadow-black/40'
            : 'bg-white/90 border-slate-200/90 hover:border-indigo-300 hover:shadow-slate-300/70'
        )}
      >
        {/* Role & Company Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h3 className={cn('text-xl sm:text-2xl font-bold tracking-tight', isDark ? 'text-white' : 'text-slate-900')}>
                {exp.role}
              </h3>
              {exp.current && (
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Current Role
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="font-bold text-base sm:text-lg" style={{ color: exp.color }}>
                {exp.company}
              </span>
              <span className={cn('text-xs sm:text-sm font-medium', isDark ? 'text-slate-400' : 'text-slate-500')}>
                • {exp.location}
              </span>
            </div>
          </div>

          <span
            className={cn(
              'text-xs sm:text-sm font-mono font-semibold shrink-0 px-3.5 py-1.5 rounded-xl border',
              isDark
                ? 'bg-slate-800/80 border-slate-700 text-slate-300'
                : 'bg-slate-100 border-slate-200 text-slate-600'
            )}
          >
            {exp.period}
          </span>
        </div>

        {/* Description */}
        <p className={cn('text-sm sm:text-base leading-relaxed mb-6', isDark ? 'text-slate-300' : 'text-slate-700')}>
          {exp.description}
        </p>

        {/* Highlights List */}
        <div className="mb-6 space-y-2.5">
          <div className={cn('text-xs font-mono font-bold uppercase tracking-wider', isDark ? 'text-slate-400' : 'text-slate-500')}>
            Key Contributions
          </div>
          <ul className="space-y-2">
            {exp.highlights.map((h, j) => (
              <li
                key={j}
                className={cn('flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed', isDark ? 'text-slate-300' : 'text-slate-700')}
              >
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: exp.color }}
                />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          {exp.tech.map((t) => (
            <span
              key={t}
              className={cn(
                'px-2.5 py-1 rounded-lg text-xs font-mono font-medium border transition-colors',
                isDark
                  ? 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:border-indigo-500/50'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-indigo-300'
              )}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
