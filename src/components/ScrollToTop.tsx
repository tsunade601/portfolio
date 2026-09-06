import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

export default function ScrollToTop() {
  const { isDark } = useTheme();
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress(Number((currentScroll / scrollHeight).toFixed(3)));
      }
      setVisible(currentScroll > 320);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-fade-in-up">
      <button
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className={cn(
          'relative flex items-center justify-center w-12 h-12 rounded-full border shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer',
          isDark
            ? 'bg-slate-900/90 border-slate-700 text-indigo-400 hover:text-white hover:border-indigo-500 shadow-black/40'
            : 'bg-white/95 border-slate-200 text-indigo-600 hover:text-indigo-800 hover:border-indigo-300 shadow-slate-300'
        )}
      >
        <svg className="w-12 h-12 absolute -rotate-90 pointer-events-none" viewBox="0 0 44 44">
          <circle
            cx="22"
            cy="22"
            r="18"
            className={cn('fill-none stroke-current', isDark ? 'text-slate-800' : 'text-slate-100')}
            strokeWidth="3"
          />
          <circle
            cx="22"
            cy="22"
            r="18"
            className="fill-none stroke-indigo-500 transition-all duration-150"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        <svg className="w-5 h-5 relative z-10 transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}
