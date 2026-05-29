import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.replace('#', ''));
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.3, rootMargin: '-20% 0px -60% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
        scrolled 
          ? 'py-3 md:py-4 px-4' 
          : 'py-5 md:py-6 px-6'
      )}
    >
      <div 
        className={cn(
          'max-w-6xl mx-auto px-6 rounded-2xl transition-all duration-500 border glass-card',
          scrolled 
            ? isDark
              ? 'bg-slate-950/80 border-slate-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.4)] shadow-indigo-950/10'
              : 'bg-white/80 border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.05)] shadow-indigo-100/30'
            : 'bg-transparent border-transparent shadow-none'
        )}
      >
        <div className="flex items-center justify-between h-14">
          
          <a
            href="#hero"
            className={cn(
              'font-black text-lg tracking-tight transition-all duration-300 flex items-center gap-1 group',
              isDark ? 'text-white' : 'text-slate-900'
            )}
          >
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform font-sans">
              RP
            </span>
            <span className={cn('text-xs font-mono font-medium opacity-50 group-hover:opacity-80 transition-opacity', isDark ? 'text-slate-400' : 'text-slate-500')}>
              .dev
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'nav-link text-xs font-semibold uppercase tracking-wider transition-colors duration-300 relative py-1.5',
                  active === link.href.replace('#', '')
                    ? 'active text-indigo-500 dark:text-indigo-400'
                    : isDark
                      ? 'text-slate-400 hover:text-slate-100'
                      : 'text-slate-600 hover:text-slate-900'
                )}
              >
                {link.label}
              </a>
            ))}

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

            <ThemeToggle isDark={isDark} toggle={toggleTheme} />
          </div>

          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle isDark={isDark} toggle={toggleTheme} />
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              className={cn(
                'p-2 rounded-xl transition-all duration-300 border',
                isDark 
                  ? 'text-slate-300 border-slate-800/80 hover:bg-slate-900/60' 
                  : 'text-slate-600 border-slate-200/80 hover:bg-slate-100/60'
              )}
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className={cn(
            'md:hidden animate-slide-down pb-4 pt-2 border-t mt-2 flex flex-col gap-1',
            isDark ? 'border-slate-800/60' : 'border-slate-100'
          )}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'block py-2.5 px-3 rounded-lg text-sm font-semibold transition-all duration-200',
                  active === link.href.replace('#', '')
                    ? 'bg-indigo-500/10 text-indigo-500 dark:text-indigo-400'
                    : isDark
                      ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                )}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

function ThemeToggle({ isDark, toggle }: { isDark: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'relative w-14 h-7 rounded-full transition-all duration-500 p-1 flex items-center cursor-pointer border',
        isDark 
          ? 'bg-slate-900 border-slate-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]' 
          : 'bg-indigo-50 border-indigo-100 shadow-[inset_0_2px_4px_rgba(99,102,241,0.06)]'
      )}
    >
      <div
        className={cn(
          'w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500 shadow-md',
          isDark 
            ? 'translate-x-7 bg-indigo-500 text-white' 
            : 'translate-x-0 bg-white text-yellow-500'
        )}
      >
        {isDark ? (
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    </button>
  );
}
