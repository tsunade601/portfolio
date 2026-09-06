import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { isDark } = useTheme();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-md animate-fade-in-up"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border p-6 sm:p-10 shadow-2xl transition-all',
          isDark
            ? 'bg-slate-900/95 border-white/10 text-slate-100 shadow-indigo-500/10'
            : 'bg-white border-slate-200 text-slate-900 shadow-slate-300'
        )}
      >
        {/* Modal Actions Header */}
        <div className="flex items-center justify-between border-b pb-5 mb-8 no-print border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-indigo-500" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-500">
              Curriculum Vitae
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              aria-label="Print or Save as PDF"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md shadow-indigo-500/20 active:scale-95 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              aria-label="Close résumé modal"
              className={cn(
                'p-2 rounded-xl border transition-all hover:scale-105 active:scale-95 cursor-pointer',
                isDark ? 'border-slate-700 hover:bg-slate-800 text-slate-400' : 'border-slate-200 hover:bg-slate-100 text-slate-600'
              )}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Printable Resume Content */}
        <div id="resume-document" className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6 border-slate-200 dark:border-slate-800">
            <div>
              <h2 id="resume-title" className="text-3xl font-extrabold tracking-tight">
                Roberto Pires
              </h2>
              <p className="text-base font-semibold text-indigo-500 mt-1">
                Senior Full-Stack Engineer & Creative Technologist
              </p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                São Paulo, Brazil • Remote Worldwide
              </p>
            </div>

            <div className="text-xs sm:text-sm space-y-1 font-mono text-slate-600 dark:text-slate-300">
              <div>
                <a href="mailto:roberto@pires.dev" className="hover:text-indigo-500 transition-colors">
                  roberto@pires.dev
                </a>
              </div>
              <div>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition-colors">
                  linkedin.com/in/robertopires
                </a>
              </div>
              <div>
                <a href="https://github.com/tsunade601" target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition-colors">
                  github.com/tsunade601
                </a>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-500 mb-2">
              Professional Summary
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
              Results-driven Full-Stack Engineer with 6+ years of experience engineering high-performance web applications, scalable distributed backends, and responsive, accessible user interfaces. Specialized in React, TypeScript, Node.js, and cloud architectures. Proven track record of boosting app load speeds by 45% and leading cross-functional engineering initiatives.
            </p>
          </div>

          {/* Work Experience */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-500 mb-4">
              Work Experience
            </h3>

            <div className="space-y-6">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                  <h4 className="text-base font-bold">Senior Full-Stack Engineer — Techflow Inc.</h4>
                  <span className="text-xs font-mono text-indigo-500 font-semibold">Jan 2022 – Present</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Remote — São Paulo, BR</p>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <li>Lead architect on the core real-time analytics SaaS platform serving over 50,000 active monthly users.</li>
                  <li>Architected a micro-frontend architecture using React and Module Federation, decreasing deployment friction by 60%.</li>
                  <li>Reduced cold-start page load times by 45% via edge computing, intelligent code-splitting, and query caching with Redis.</li>
                  <li>Introduced automated end-to-end testing with Playwright and CI/CD pipelines through GitHub Actions.</li>
                </ul>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                  <h4 className="text-base font-bold">Full-Stack Developer — Nexora Digital</h4>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Mar 2020 – Dec 2021</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">São Paulo, BR</p>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <li>Delivered 8 production-grade web applications with modern React, TypeScript, and Python/Django backends.</li>
                  <li>Designed secure OAuth2 and JWT-based authentication flows and implemented role-based access control.</li>
                  <li>Improved SQL database query performance by 35% through indexing and schema optimization.</li>
                </ul>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                  <h4 className="text-base font-bold">Frontend Developer — StartUp Hub</h4>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Jun 2018 – Feb 2020</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">São Paulo, BR</p>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <li>Engineered rapid client MVPs within rapid 6-week sprints, helping 3 early-stage startups acquire seed funding.</li>
                  <li>Established the company's reusable UI design system and component library with Vue.js and Tailwind CSS.</li>
                  <li>Integrated Stripe payments and subscription billing workflows.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-500 mb-2">
                Education
              </h3>
              <p className="text-sm font-bold">B.S. in Computer Science</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">University of São Paulo (USP) • 2014 – 2018</p>
            </div>

            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-500 mb-2">
                Languages
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <strong>Portuguese:</strong> Native • <strong>English:</strong> Fluent (C2) • <strong>Spanish:</strong> Conversational (B2)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
