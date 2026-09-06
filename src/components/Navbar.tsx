import { useState, useEffect, useRef } from 'react';
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  // Track scroll position & progress
  useEffect(() => {
    const onScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 20);

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress((currentScroll / scrollHeight) * 100);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Section observer for active link
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.replace('#', ''));
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
          }
        },
        { threshold: 0.25, rootMargin: '-10% 0px -50% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  // Close mobile menu on Escape key or outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
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
      window.history.pushState(null, '', href);
      setActive(targetId);
    }
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 z-50 pointer-events-none transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Skip to Content for Accessibility */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-xl focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out',
          scrolled ? 'py-3 px-4 sm:px-6' : 'py-5 sm:py-6 px-4 sm:px-8'
        )}
      >
        <nav
          ref={menuRef}
          aria-label="Main Navigation"
          className={cn(
            'max-w-7xl mx-auto px-4 sm:px-6 rounded-2xl sm:rounded-3xl transition-all duration-500 border',
            scrolled
              ? isDark
                ? 'bg-slate-950/80 border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.4)] backdrop-blur-xl'
                : 'bg-white/85 border-slate-200/80 shadow-[0_16px_48px_rgba(15,23,42,0.08)] backdrop-blur-xl'
              : 'bg-transparent border-transparent shadow-none'
          )}
        >
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => scrollToSection(e, '#hero')}
              className={cn(
                'font-black text-lg sm:text-xl tracking-tight transition-all duration-300 flex items-center gap-1.5 group',
                isDark ? 'text-white' : 'text-slate-900'
              )}
            >
              <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-indigo-500/30 group-hover:scale-105 transition-transform">
                RP
              </span>
              <span className="font-sans font-bold tracking-tight">
                Roberto
                <span className="text-indigo-500">.</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = active === link.href.replace('#', '');
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={cn(
                      'px-3.5 py-1.5 rounded-xl text-xs lg:text-sm font-semibold tracking-wide transition-all duration-200 relative',
                      isActive
                        ? isDark
                          ? 'text-white bg-white/10 shadow-sm'
                          : 'text-indigo-600 bg-indigo-50 shadow-sm'
                        : isDark
                          ? 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right Tools: Theme Toggle & Quick CTA */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle isDark={isDark} toggle={toggleTheme} />

              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95"
              >
                <span>Hire Me</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              </a>
            </div>

            {/* Mobile Actions: Theme Toggle & Hamburger */}
            <div className="flex md:hidden items-center gap-2.5">
              <ThemeToggle isDark={isDark} toggle={toggleTheme} />

              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                className={cn(
                  'p-2 rounded-xl transition-all border cursor-pointer',
                  isDark
                    ? 'text-slate-300 border-slate-800 hover:bg-slate-900'
                    : 'text-slate-600 border-slate-200 hover:bg-slate-100'
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

          {/* Mobile Drawer */}
          {menuOpen && (
            <div
              className={cn(
                'md:hidden animate-slide-down pb-4 pt-2 border-t mt-2 flex flex-col gap-1',
                isDark ? 'border-slate-800' : 'border-slate-200'
              )}
            >
              {NAV_LINKS.map((link) => {
                const isActive = active === link.href.replace('#', '');
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={cn(
                      'flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm font-semibold transition-all duration-200',
                      isActive
                        ? isDark
                          ? 'bg-indigo-500/15 text-indigo-400 font-bold'
                          : 'bg-indigo-50 text-indigo-600 font-bold'
                        : isDark
                          ? 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    )}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    )}
                  </a>
                );
              })}

              <div className="pt-2 mt-1 border-t border-slate-200 dark:border-slate-800">
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-500/20"
                >
                  <span>Let's Work Together</span>
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}

function ThemeToggle({ isDark, toggle }: { isDark: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'relative w-13 h-7 rounded-full transition-all duration-300 p-0.5 flex items-center cursor-pointer border',
        isDark
          ? 'bg-slate-900 border-slate-700 shadow-inner'
          : 'bg-slate-200 border-slate-300 shadow-inner'
      )}
    >
      <div
        className={cn(
          'w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 shadow-md',
          isDark
            ? 'translate-x-6 bg-indigo-600 text-white'
            : 'translate-x-0 bg-white text-amber-500'
        )}
      >
        {isDark ? (
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </button>
  );
}
