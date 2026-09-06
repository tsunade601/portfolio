import { useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import SectionHeader from './SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { CARD_SURFACE, SECTION_CONTAINER, SECTION_SPACING } from './layout';
import ProjectModal, { ProjectDetail } from './ProjectModal';
import { cn } from '../utils/cn';

const PROJECTS: ProjectDetail[] = [
  {
    title: 'Flowlytics',
    category: 'SaaS',
    description:
      'A real-time analytics dashboard for high-growth SaaS products. Tracks conversion funnels, churn prediction, cohort retention, and live user actions with low-latency WebSocket updates and reactive D3 charts.',
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'D3.js', 'Redis'],
    gradient: 'from-indigo-500 via-purple-500 to-indigo-600',
    icon: '📊',
    links: {
      github: 'https://github.com/tsunade601',
      live: 'https://flowlytics.demo.robertopires.dev',
    },
    featured: true,
    highlights: [
      'Sub-50ms WebSocket streaming for over 10,000 concurrent client sessions.',
      'Custom D3.js SVG rendering pipeline optimized for 60fps canvas updates.',
      'Configurable funnel drilldowns and automatic anomaly detection alerts.',
    ],
    role: 'Lead Architect & Frontend Engineer',
  },
  {
    title: 'Nimbus CMS',
    category: 'Open Source',
    description:
      'A developer-first headless content management engine. Features an intuitive GraphQL API, schema designer, role-based access control, automated webhooks, and an ultra-fast markdown editorial studio. 450+ GitHub stars.',
    tech: ['Next.js', 'GraphQL', 'Prisma', 'PostgreSQL', 'Docker', 'Tailwind CSS'],
    gradient: 'from-purple-500 via-pink-500 to-rose-500',
    icon: '☁️',
    links: {
      github: 'https://github.com/tsunade601',
      live: 'https://nimbus-cms.demo.robertopires.dev',
    },
    featured: true,
    highlights: [
      'GraphQL code-generation tools for fully type-safe queries in TypeScript.',
      'Microservices-based media asset pipeline with automatic WebP conversion.',
      'Extensible plugin ecosystem allowing custom editor block widgets.',
    ],
    role: 'Creator & Maintainer',
  },
  {
    title: 'DevCollab',
    category: 'Community',
    description:
      'A cloud-based real-time collaborative workspace featuring code sharing, live multi-cursor editing, low-latency peer-to-peer audio/video calling, and interactive developer terminals. 1st place hackathon winner.',
    tech: ['React', 'Socket.io', 'WebRTC', 'Express', 'MongoDB', 'Monaco Editor'],
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
    icon: '👥',
    links: {
      github: 'https://github.com/tsunade601',
      live: 'https://devcollab.demo.robertopires.dev',
    },
    featured: true,
    highlights: [
      'Operational Transformation (OT) synchronization for conflict-free code editing.',
      'WebRTC mesh networking for direct P2P video conferencing.',
      'Sandboxed remote execution docker containers for running JavaScript and Python.',
    ],
    role: 'Full-Stack Developer',
  },
  {
    title: 'TrailMapper',
    category: 'Mobile',
    description:
      'Cross-platform GPS hiking and outdoor navigation application. Includes offline vector maps, topographical elevation profiles, trail recording, and GPX track export built for mountain explorers.',
    tech: ['React Native', 'Expo', 'MapBox', 'Firebase', 'TypeScript', 'Zustand'],
    gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
    icon: '🗺️',
    links: {
      github: 'https://github.com/tsunade601',
      live: 'https://trailmapper.demo.robertopires.dev',
    },
    featured: false,
    highlights: [
      'Offline-first tile cache engine with background location recording.',
      'Elevation profile spline generation with real-time gradient warnings.',
      'Community crowdsourced trail difficulty ratings and photos.',
    ],
    role: 'Mobile Architect',
  },
  {
    title: 'AI Resume Builder',
    category: 'AI/ML',
    description:
      'An intelligent career acceleration tool that dynamically tailors resumes to job descriptions using LLMs. Features real-time ATS scoring, keyword optimization, and pixel-perfect PDF rendering.',
    tech: ['Next.js', 'OpenAI API', 'Tailwind CSS', 'Puppeteer', 'Vercel', 'PostgreSQL'],
    gradient: 'from-amber-500 via-orange-500 to-rose-600',
    icon: '🤖',
    links: {
      github: 'https://github.com/tsunade601',
      live: 'https://airesume.demo.robertopires.dev',
    },
    featured: false,
    highlights: [
      'Automated semantic similarity ranking against target job listings.',
      'Headless Chromium PDF generation pipeline ensuring ATS scanner compatibility.',
      'Privacy-focused zero data retention mode for confidential executive CVs.',
    ],
    role: 'Creator & Engineer',
  },
  {
    title: 'Budget Zen',
    category: 'Finance',
    description:
      'A minimalist personal finance planner with secure Open Banking synchronization, automatic recurring expense categorization, monthly savings milestones, and predictive cash flow simulations.',
    tech: ['Vue.js', 'Plaid API', 'FastAPI', 'SQLite', 'Chart.js', 'Python'],
    gradient: 'from-violet-500 via-indigo-500 to-cyan-500',
    icon: '💰',
    links: {
      github: 'https://github.com/tsunade601',
      live: 'https://budgetzen.demo.robertopires.dev',
    },
    featured: false,
    highlights: [
      'Zero-knowledge client-side encryption for sensitive bank transactions.',
      'Machine learning model categorizing recurring expenses with 94% accuracy.',
      'Interactive compounding interest and retirement scenario calculators.',
    ],
    role: 'Full-Stack Developer',
  },
];

const CATEGORIES = ['All', 'SaaS', 'Open Source', 'Community', 'Mobile', 'AI/ML', 'Finance'];

export default function Projects() {
  const { isDark } = useTheme();
  const ref = useScrollReveal();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: PROJECTS.length };
    PROJECTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter projects by category and search
  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section
      id="projects"
      ref={ref}
      className={cn('section-hidden section-shell', SECTION_SPACING, isDark ? 'bg-slate-900/60' : 'bg-slate-50/70')}
    >
      <div className={SECTION_CONTAINER}>
        <SectionHeader
          isDark={isDark}
          eyebrow="What I've built"
          title="Featured Projects"
          description="A curated selection of applications, tools, and open-source software I've designed and shipped."
        />

        {/* Filter Toolbar: Search Bar + Category Pills */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto space-y-6">
          {/* Search Input */}
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by name, keyword, or tech (e.g., React, GraphQL)..."
              className={cn(
                'w-full pl-10 pr-9 py-2.5 rounded-2xl text-xs sm:text-sm font-medium border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50',
                isDark
                  ? 'bg-slate-800/80 border-slate-700/80 text-white placeholder-slate-500'
                  : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm'
              )}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const count = categoryCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer',
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25 scale-105'
                      : isDark
                        ? 'bg-slate-800/70 text-slate-400 hover:bg-slate-700/80 hover:text-white border border-slate-700/50'
                        : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 shadow-sm'
                  )}
                >
                  <span>{cat}</span>
                  <span
                    className={cn(
                      'text-[10px] px-1.5 py-0.2 rounded-full font-mono',
                      isActive
                        ? 'bg-white/20 text-white'
                        : isDark
                          ? 'bg-slate-700 text-slate-300'
                          : 'bg-slate-100 text-slate-500'
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        {filtered.length > 0 ? (
          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                isDark={isDark}
                index={i}
                onSelect={() => setSelectedProject(project)}
                onSelectTag={(tag) => setSearchQuery(tag)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center py-12 px-4 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 max-w-lg mx-auto">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className={cn('text-lg font-bold mb-1', isDark ? 'text-white' : 'text-slate-900')}>
              No projects found
            </h3>
            <p className={cn('text-sm mb-4', isDark ? 'text-slate-400' : 'text-slate-500')}>
              No projects match your search for "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 dark:text-indigo-400 hover:bg-indigo-100 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* View All on GitHub Link */}
        <div className="mt-14 sm:mt-16 text-center">
          <a
            href="https://github.com/tsunade601"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-xs sm:text-sm border transition-all duration-300 hover:-translate-y-0.5 shadow-sm',
              isDark
                ? 'border-slate-700 bg-slate-900 text-white hover:bg-slate-800 hover:border-slate-600'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400'
            )}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>Explore All Repositories on GitHub</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      {/* Case Study Project Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}

function ProjectCard({
  project,
  isDark,
  index,
  onSelect,
  onSelectTag,
}: {
  project: ProjectDetail;
  isDark: boolean;
  index: number;
  onSelect: () => void;
  onSelectTag: (tag: string) => void;
}) {
  return (
    <div
      className={cn(
        'project-card group relative flex flex-col justify-between overflow-hidden',
        CARD_SURFACE,
        'spotlight-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer',
        isDark
          ? 'bg-slate-900/85 border-white/10 hover:border-indigo-500/40 hover:shadow-indigo-500/10'
          : 'bg-white/90 border-slate-200/90 hover:border-indigo-300 hover:shadow-slate-300/80'
      )}
      style={{ animationDelay: `${index * 0.08}s` }}
      onClick={onSelect}
    >
      {/* Top Gradient Banner */}
      <div className={`h-1.5 bg-gradient-to-r ${project.gradient}`} />

      <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
        <div>
          {/* Header Icon and Category Badge */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl p-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/15">
              {project.icon}
            </span>
            <div className="flex items-center gap-1.5">
              {project.featured && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-500 border border-amber-500/20">
                  Featured
                </span>
              )}
              <span
                className={cn(
                  'px-2.5 py-0.5 rounded-full text-xs font-semibold',
                  isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                )}
              >
                {project.category}
              </span>
            </div>
          </div>

          {/* Title with hover effect */}
          <h3
            className={cn(
              'text-lg sm:text-xl font-bold mb-2.5 transition-colors duration-200 flex items-center justify-between group-hover:text-indigo-500',
              isDark ? 'text-white' : 'text-slate-900'
            )}
          >
            <span>{project.title}</span>
            <svg
              className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 -translate-x-1 text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </h3>

          {/* Description */}
          <p className={cn('text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3', isDark ? 'text-slate-300' : 'text-slate-600')}>
            {project.description}
          </p>
        </div>

        <div>
          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.map((t) => (
              <button
                key={t}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectTag(t);
                }}
                title={`Filter by ${t}`}
                className={cn(
                  'px-2 py-0.5 rounded-md text-[11px] font-mono font-medium transition-colors hover:scale-105 cursor-pointer',
                  isDark
                    ? 'bg-slate-800 text-slate-400 hover:text-indigo-300 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-600 hover:text-indigo-600 hover:bg-slate-200'
                )}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Links & Details Action */}
          <div
            className={cn(
              'flex items-center justify-between pt-3.5 border-t text-xs font-semibold',
              isDark ? 'border-white/10' : 'border-slate-100'
            )}
          >
            <div className="flex items-center gap-3">
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  'flex items-center gap-1 transition-colors hover:text-indigo-500',
                  isDark ? 'text-slate-400' : 'text-slate-500'
                )}
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>Code</span>
              </a>

              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-indigo-500 hover:text-indigo-400 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Live Demo</span>
              </a>
            </div>

            <span className="text-indigo-500 group-hover:underline flex items-center gap-0.5">
              <span>Case Study</span>
              <span>→</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
