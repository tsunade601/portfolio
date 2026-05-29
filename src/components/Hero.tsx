import { useRef, useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useParticles } from '../hooks/useParticles';
// @ts-ignore
import robertoImg from '/images/roberto.jpg';

const TAGLINES = [
  'Full-Stack Developer',
  'Creative Technologist',
  'Open Source Enthusiast',
  'Problem Solver',
];

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com',
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
    label: 'Twitter',
    href: 'https://twitter.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Hero() {
  const { isDark } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticles(canvasRef, isDark);

  // Typewriter
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const target = TAGLINES[taglineIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (typing) {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 65);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setTaglineIndex((i) => (i + 1) % TAGLINES.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, taglineIndex]);

  const scrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className={`relative min-h-screen flex items-center overflow-hidden pt-24 pb-20 sm:pt-28 sm:pb-24 ${
        isDark
          ? 'bg-gray-950/95'
          : 'bg-gradient-to-br from-slate-50 via-white to-indigo-50/40'
      }`}
    >
      <canvas
        ref={canvasRef}
        id="particle-canvas"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      />

      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }}
      />
      <div
        className="absolute top-3/4 left-1/3 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 w-full">
        <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold font-mono mb-7
              border border-indigo-500/20 bg-white/5 text-indigo-300 shadow-lg shadow-indigo-500/10 backdrop-blur">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for new opportunities
            </div>

            <h1 className={`animate-fade-in-up delay-100 text-5xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-5 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Roberto<br />
              <span className="gradient-text">Pires</span>
            </h1>

            <div className={`animate-fade-in-up delay-200 min-h-10 mb-6 flex items-center justify-center lg:justify-start gap-1 text-xl sm:text-2xl font-semibold ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <span>{displayed}</span>
            </div>

            <p className={`animate-fade-in-up delay-300 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed mb-10 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              I craft elegant, high-performance digital experiences — from scalable back-end systems
              to pixel-perfect UIs. Passionate about clean code, great design, and building things that matter.
            </p>

            <div className="animate-fade-in-up delay-400 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white
                  bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500
                  shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40
                  transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                View My Work
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#contact"
                className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold
                  border transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0
                  ${isDark
                    ? 'border-white/15 text-white hover:bg-white/10 hover:border-white/30'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                  }`}
              >
                Let's Talk
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </a>
            </div>

            <div className="animate-fade-in-up delay-500 flex items-center gap-4 mt-9 justify-center lg:justify-start">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`p-2.5 rounded-xl transition-all duration-200 hover:-translate-y-1 ${
                    isDark
                      ? 'text-gray-400 hover:text-white hover:bg-white/10'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="animate-scale-in delay-300 flex-shrink-0 relative flex justify-center lg:justify-end">
            <div className="absolute inset-0 rounded-full animate-spin-slow opacity-60"
              style={{
                background: 'conic-gradient(from 0deg, #6366f1, #a855f7, #06b6d4, #6366f1)',
                padding: '2px',
                borderRadius: '50%',
                filter: 'blur(0px)',
              }}
            />
            <div className="absolute -inset-4 rounded-full blur-2xl opacity-30"
              style={{ background: 'radial-gradient(circle, #6366f1, #a855f7)' }}
            />
            <div className="animate-float relative w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full p-1"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #a855f7, #06b6d4)',
              }}
            >
              <div className={`w-full h-full rounded-full overflow-hidden ${
                isDark ? 'ring-4 ring-gray-950' : 'ring-4 ring-white'
              }`}>
                {imageFailed ? (
                  <div
                    className="w-full h-full flex items-center justify-center text-6xl font-black text-white"
                    style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)' }}
                  >
                    RP
                  </div>
                ) : (
                  <img
                    src={robertoImg}
                    alt="Roberto Pires"
                    className="w-full h-full object-cover"
                    onError={() => setImageFailed(true)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="animate-fade-in-up delay-700 flex justify-center mt-20">
          <button
            onClick={scrollDown}
            aria-label="Scroll down"
            className={`flex flex-col items-center gap-2 group transition-opacity duration-300 hover:opacity-70 ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            <span className="text-xs font-mono tracking-[0.3em] uppercase">Scroll</span>
            <svg
              className="w-5 h-5 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
