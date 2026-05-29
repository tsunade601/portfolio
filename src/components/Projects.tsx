import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import SectionHeader from './SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { CARD_SURFACE, SECTION_CONTAINER, SECTION_SPACING } from './layout';

const PROJECTS = [
  {
    title: 'Flowlytics',
    category: 'SaaS',
    description:
      'A real-time analytics dashboard for SaaS products. Tracks user funnels, conversion rates, and cohort analysis with live WebSocket updates and beautiful data visualizations.',
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'D3.js', 'Redis'],
    gradient: 'from-indigo-500 to-purple-600',
    icon: '📊',
    links: { github: '#', live: '#' },
    featured: true,
  },
  {
    title: 'Nimbus CMS',
    category: 'Open Source',
    description:
      'A headless CMS built for developers. API-first architecture with GraphQL, customizable content types, webhooks, and a sleek admin panel. 400+ GitHub stars.',
    tech: ['Next.js', 'GraphQL', 'Prisma', 'PostgreSQL', 'Docker'],
    gradient: 'from-purple-500 to-pink-600',
    icon: '☁️',
    links: { github: '#', live: '#' },
    featured: true,
  },
  {
    title: 'DevCollab',
    category: 'Community',
    description:
      'A real-time collaborative code editor with video calling, shared terminals, and a developer Q&A forum. Built during a 48-hour hackathon — won 1st place.',
    tech: ['React', 'Socket.io', 'WebRTC', 'Express', 'MongoDB'],
    gradient: 'from-cyan-500 to-blue-600',
    icon: '👥',
    links: { github: '#', live: '#' },
    featured: true,
  },
  {
    title: 'TrailMapper',
    category: 'Mobile',
    description:
      'A cross-platform mobile app for hikers to discover, record, and share trails. Offline map support, elevation data, and social sharing built with React Native.',
    tech: ['React Native', 'Expo', 'MapBox', 'Firebase', 'TypeScript'],
    gradient: 'from-green-500 to-teal-600',
    icon: '🗺️',
    links: { github: '#', live: '#' },
    featured: false,
  },
  {
    title: 'AI Resume Builder',
    category: 'AI/ML',
    description:
      'An AI-powered resume builder that tailors your CV to specific job descriptions using GPT-4. Includes ATS scoring, keyword optimization, and PDF export.',
    tech: ['Next.js', 'OpenAI API', 'Tailwind CSS', 'Puppeteer', 'Vercel'],
    gradient: 'from-orange-500 to-rose-600',
    icon: '🤖',
    links: { github: '#', live: '#' },
    featured: false,
  },
  {
    title: 'Budget Zen',
    category: 'Finance',
    description:
      'A minimalist personal finance tracker with bank sync, smart categorization, monthly budget goals, and insightful spending reports.',
    tech: ['Vue.js', 'Plaid API', 'FastAPI', 'SQLite', 'Chart.js'],
    gradient: 'from-yellow-500 to-amber-600',
    icon: '💰',
    links: { github: '#', live: '#' },
    featured: false,
  },
];

const FILTERS = ['All', 'SaaS', 'Open Source', 'Community', 'Mobile', 'AI/ML', 'Finance'];

export default function Projects() {
  const { isDark } = useTheme();
  const ref = useScrollReveal();
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" ref={ref} className={`section-hidden section-shell ${SECTION_SPACING} ${isDark ? 'bg-gray-900/70' : 'bg-white/70'}`}>
      <div className={SECTION_CONTAINER}>
        <SectionHeader isDark={isDark} eyebrow="What I've built" title="Projects" />

        <div className="mt-12 flex flex-wrap gap-2.5 justify-center">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                filter === f
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                  : isDark
                  ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} isDark={isDark} index={i} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
              border transition-all duration-300 hover:-translate-y-0.5
              ${isDark
                ? 'border-white/15 text-white hover:bg-white/10'
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View all on GitHub
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  isDark,
  index,
}: {
  project: (typeof PROJECTS)[0];
  isDark: boolean;
  index: number;
}) {
  return (
    <div
      className={`project-card group relative overflow-hidden ${CARD_SURFACE} ${
        isDark
          ? 'bg-gray-800/60 border-white/5 hover:border-white/15 hover:shadow-2xl hover:shadow-black/40'
      : 'bg-white/85 border-gray-100 hover:border-gray-200 hover:shadow-2xl hover:shadow-gray-200/80'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      
      <div className={`h-1.5 bg-gradient-to-r ${project.gradient}`} />

      <div className="p-8">
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl">{project.icon}</span>
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
            isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
          }`}>
            {project.category}
          </span>
        </div>

        <h3 className={`text-lg font-bold mb-2 transition-all duration-300 ${isDark ? 'text-white group-hover:text-indigo-400' : 'text-gray-900 group-hover:text-indigo-600'}`}>
          {project.title}
        </h3>

        <p className={`text-base leading-relaxed mb-5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className={`px-2 py-0.5 rounded text-xs font-mono ${
                isDark ? 'bg-gray-900 text-gray-400' : 'bg-gray-50 text-gray-500'
              }`}
            >
              {t}
            </span>
          ))}
        </div>

        <div className={`flex items-center gap-3 pt-2 border-t ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
              isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Code
          </a>
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-500 hover:text-indigo-400 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}
