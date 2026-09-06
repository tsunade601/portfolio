import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

const FOOTER_LINKS = [
  { label: 'GitHub', href: 'https://github.com/tsunade601' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Twitter / X', href: 'https://twitter.com' },
  { label: 'Email', href: 'mailto:roberto@pires.dev' },
];

export default function Footer() {
  const { isDark } = useTheme();
  const year = new Date().getFullYear();

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={cn(
        'py-12 border-t transition-colors duration-300 relative z-10',
        isDark ? 'bg-slate-950/90 border-slate-800/80 text-slate-400' : 'bg-white/80 border-slate-200 text-slate-600'
      )}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Signature */}
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-indigo-500/20">
              RP
            </span>
            <div className="text-xs sm:text-sm">
              <span className={cn('font-bold', isDark ? 'text-white' : 'text-slate-900')}>
                Roberto Pires
              </span>
              <span className="mx-1.5 opacity-40">•</span>
              <span className="font-mono text-indigo-500 font-medium">Crafted with precision</span>
            </div>
          </div>

          {/* Social and Navigation Links */}
          <div className="flex flex-wrap items-center gap-5 text-xs sm:text-sm font-semibold">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="hover:text-indigo-500 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Back to top & Copyright */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <span>© {year} All rights reserved</span>
            <span className="opacity-40">•</span>
            <a
              href="#hero"
              onClick={scrollToTop}
              className="flex items-center gap-1 font-semibold text-indigo-500 hover:text-indigo-400 transition-colors cursor-pointer"
            >
              <span>Top</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
