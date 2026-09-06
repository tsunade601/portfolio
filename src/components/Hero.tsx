import { useRef, useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useParticles } from '../hooks/useParticles';
// @ts-ignore
import robertoImg from '/images/roberto.jpg';

const TAGLINES = [
  'Full-Stack Developer',
  'Creative Technologist',
  'TypeScript & React Enthusiast',
  'Cloud & Systems Architect',
  'Open Source Contributor',
];

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/tsunade601',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:roberto@pires.dev',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

interface HeroProps {
  onOpenResume?: () => void;
}

export default function Hero({ onOpenResume }: HeroProps) {
  const { isDark } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticles(canvasRef, isDark);

  // Typewriter effect
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const target = TAGLINES[taglineIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (typing) {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
      } else {
        setTaglineIndex((i) => (i + 1) % TAGLINES.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, taglineIndex]);

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className={`relative min-h-[95vh] flex items-center overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 ${
        isDark
          ? 'bg-slate-950/90'
          : 'bg-gradient-to-br from-slate-50 via-indigo-50/25 to-purple-50/20'
      }`}
    >
      {/* Particle canvas background */}
      <canvas
        ref={canvasRef}
        id="particle-canvas"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Decorative ambient glowing orbs */}
      <div
        className="absolute top-1/4 -left-20 w-80 h-80 rounded-full blur-3xl opacity-25 pointer-events-none animate-pulse-subtle"
        style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none animate-pulse-subtle"
        style={{ background: 'radial-gradient(circle, #a855f7, transparent 70%)' }}
      />
      <div
        className="absolute top-2/3 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 w-full">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          {/* Text Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Status Pill */}
            <div className="animate-fade-in-up inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold font-mono mb-6 border border-indigo-500/25 bg-indigo-500/10 text-indigo-400 dark:text-indigo-300 shadow-sm backdrop-blur">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for full-time roles & projects</span>
            </div>

            {/* Name */}
            <h1 className={`animate-fade-in-up delay-100 text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] mb-4 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Roberto <br className="hidden sm:inline" />
              <span className="gradient-text">Pires</span>
            </h1>

            {/* Typewriter Subtitle */}
            <div className={`animate-fade-in-up delay-200 min-h-10 mb-6 flex items-center justify-center lg:justify-start gap-1 text-xl sm:text-2xl font-bold font-mono ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <span className="text-indigo-500">&gt;</span>
              <span>{displayed}</span>
              <span className="inline-block w-2 h-6 bg-indigo-500 animate-pulse ml-0.5" />
            </div>

            {/* Biography Summary */}
            <p className={`animate-fade-in-up delay-300 max-w-xl text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Senior Full-Stack Engineer crafting elegant, highly scalable digital platforms. Combining engineering rigor with thoughtful UX design — from resilient cloud backends to fluid, accessible user interfaces.
            </p>

            {/* Action Buttons */}
            <div className="animate-fade-in-up delay-400 flex flex-wrap gap-3.5 justify-center lg:justify-start w-full sm:w-auto">
              <button
                onClick={() => scrollToElement('projects')}
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-2xl font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>View My Work</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              <button
                onClick={() => scrollToElement('contact')}
                className={`inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-2xl font-semibold text-sm sm:text-base border transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
                  isDark
                    ? 'border-slate-700 bg-slate-900/50 text-white hover:bg-slate-800 hover:border-slate-600'
                    : 'border-slate-300 bg-white/80 text-slate-700 hover:bg-slate-100 hover:border-slate-400'
                }`}
              >
                <span>Let's Talk</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>

              {onOpenResume && (
                <button
                  onClick={onOpenResume}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-semibold text-sm sm:text-base border transition-all duration-300 hover:-translate-y-0.5 cursor-pointer ${
                    isDark
                      ? 'border-indigo-500/30 text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20'
                      : 'border-indigo-200 text-indigo-600 bg-indigo-50/70 hover:bg-indigo-100'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Résumé</span>
                </button>
              )}
            </div>

            {/* Social Links */}
            <div className="animate-fade-in-up delay-500 flex items-center gap-3.5 mt-8 justify-center lg:justify-start">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className={`p-2.5 rounded-xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                    isDark
                      ? 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:border-slate-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Profile Picture with Ambient Glowing Ring */}
          <div className="animate-scale-in delay-300 flex-shrink-0 relative flex justify-center lg:justify-end">
            <div
              className="absolute inset-0 rounded-full animate-spin-slow opacity-70 pointer-events-none"
              style={{
                background: 'conic-gradient(from 0deg, #6366f1, #a855f7, #06b6d4, #6366f1)',
                padding: '2px',
                borderRadius: '50%',
              }}
            />
            <div
              className="absolute -inset-4 rounded-full blur-2xl opacity-35 pointer-events-none"
              style={{ background: 'radial-gradient(circle, #6366f1, #a855f7)' }}
            />
            <div
              className="animate-float relative w-64 h-64 sm:w-72 sm:h-72 lg:w-84 lg:h-84 rounded-full p-1.5"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #a855f7, #06b6d4)',
              }}
            >
              <div className={`w-full h-full rounded-full overflow-hidden shadow-2xl ${
                isDark ? 'ring-4 ring-slate-950' : 'ring-4 ring-white'
              }`}>
                {imageFailed ? (
                  <div
                    className="w-full h-full flex flex-col items-center justify-center font-black text-white"
                    style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)' }}
                  >
                    <span className="text-6xl font-black">RP</span>
                    <span className="text-xs font-mono tracking-wider mt-1 opacity-80">Full-Stack Dev</span>
                  </div>
                ) : (
                  <img
                    src={robertoImg}
                    alt="Roberto Pires — Full-Stack Developer"
                    className="w-full h-full object-cover select-none transition-transform duration-500 hover:scale-105"
                    onError={() => setImageFailed(true)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-fade-in-up delay-700 flex justify-center mt-16 sm:mt-20">
          <button
            onClick={() => scrollToElement('about')}
            aria-label="Scroll to About section"
            className={`flex flex-col items-center gap-2 group transition-opacity duration-300 hover:opacity-100 cursor-pointer ${
              isDark ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase font-semibold">Explore</span>
            <svg
              className="w-5 h-5 animate-bounce text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
