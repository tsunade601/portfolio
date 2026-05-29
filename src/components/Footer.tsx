import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { isDark } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer className={`py-12 border-t ${isDark ? 'bg-gray-950/90 border-white/5' : 'bg-white/80 border-gray-100'}`}>
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          
          <div className="flex items-center gap-2">
            <span className="text-lg font-black gradient-text">RP</span>
            <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Designed & built by Roberto Pires
            </span>
          </div>

          <div className={`text-sm font-mono ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
            © {year} — All rights reserved
          </div>

          <a
            href="#hero"
            className={`flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-indigo-500 ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            Back to top
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
