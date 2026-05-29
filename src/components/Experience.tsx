import { useTheme } from '../context/ThemeContext';
import SectionHeader from './SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';

const EXPERIENCES = [
  {
    role: 'Senior Full-Stack Engineer',
    company: 'Techflow Inc.',
    location: 'Remote — São Paulo, BR',
    period: 'Jan 2022 – Present',
    current: true,
    color: '#6366f1',
    description:
      'Lead developer on the core product team, building a real-time SaaS analytics platform serving 50k+ users. Architected a micro-frontend system using React & Module Federation, reducing deployment complexity by 60%.',
    highlights: [
      'Reduced page load time by 45% through code-splitting and edge caching',
      'Mentored a team of 5 junior developers',
      'Introduced TypeScript across the entire codebase',
      'Built CI/CD pipelines with GitHub Actions & Docker',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
  },
  {
    role: 'Full-Stack Developer',
    company: 'Nexora Digital',
    location: 'São Paulo, BR',
    period: 'Mar 2020 – Dec 2021',
    current: false,
    color: '#a855f7',
    description:
      'Developed and maintained 8+ client-facing web apps using React and Django. Collaborated closely with UX designers to implement accessible, pixel-perfect interfaces and RESTful APIs.',
    highlights: [
      'Shipped 8 production apps across diverse industries',
      'Implemented OAuth2 & JWT authentication systems',
      'Reduced API response times by 35% via query optimization',
    ],
    tech: ['React', 'Python', 'Django', 'MySQL', 'Docker', 'Figma'],
  },
  {
    role: 'Frontend Developer',
    company: 'StartUp Hub',
    location: 'São Paulo, BR',
    period: 'Jun 2018 – Feb 2020',
    current: false,
    color: '#06b6d4',
    description:
      'Joined as a founding engineer at a startup accelerator, building internal tools and client MVPs. Wore many hats — from dev to DevOps — helping 3 startups successfully launch their products.',
    highlights: [
      'Delivered 3 MVPs within 6-week sprints each',
      'Set up the company\'s first design system',
      'Integrated Stripe payment processing for e-commerce clients',
    ],
    tech: ['Vue.js', 'JavaScript', 'Firebase', 'Tailwind CSS', 'Stripe'],
  },
];

export default function Experience() {
  const { isDark } = useTheme();
  const ref = useScrollReveal();

  return (
    <section id="experience" ref={ref} className={`section-hidden py-24 sm:py-32 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader isDark={isDark} eyebrow="Where I've worked" title="Experience" />

        <div className="mt-16 relative">
          
          <div className={`absolute left-4 md:left-8 top-0 bottom-0 w-px ${isDark ? 'bg-white/5' : 'bg-gray-200'}`} />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} isDark={isDark} index={i} />
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
    <div className="relative pl-14 md:pl-24" style={{ animationDelay: `${index * 0.15}s` }}>
      
      <div
        className="absolute left-0 md:left-4 top-6 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: exp.color,
          boxShadow: `0 0 20px ${exp.color}60`,
        }}
      >
        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>

      <div
        className={`rounded-2xl border p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
          isDark
            ? 'bg-gray-900 border-white/5 hover:border-white/10 hover:shadow-black/30'
            : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-gray-200/60'
        }`}
      >
        
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{exp.role}</h3>
              {exp.current && (
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-500/15 text-green-500 border border-green-500/20">
                  Current
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="font-semibold" style={{ color: exp.color }}>{exp.company}</span>
              <span className={isDark ? 'text-gray-600' : 'text-gray-300'}>·</span>
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{exp.location}</span>
            </div>
          </div>
          <span className={`text-sm font-mono shrink-0 px-3 py-1 rounded-lg ${
            isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'
          }`}>
            {exp.period}
          </span>
        </div>

        <p className={`text-base leading-relaxed mb-5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {exp.description}
        </p>

        <ul className="space-y-2 mb-5">
          {exp.highlights.map((h, j) => (
            <li key={j} className={`flex items-start gap-2 text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: exp.color }} />
              {h}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {exp.tech.map((t) => (
            <span
              key={t}
              className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium ${
                isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
