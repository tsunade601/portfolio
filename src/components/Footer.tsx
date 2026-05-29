import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { isDark } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer className={`py-10 border-t ${isDark ? 'bg-gray-950 border-white/5' : 'bg-white border-gray-100'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            <span className="text-lg font-black gradient-text">RP</span>
            <span className={`text-sm ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>·</span>
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
