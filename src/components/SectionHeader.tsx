import { cn } from '../utils/cn';

export interface SectionHeaderProps {
  isDark: boolean;
  eyebrow: string;
  title: string;
  description?: string;
}

export default function SectionHeader({ isDark, eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="text-center max-w-3xl mx-auto px-4">
      <div className="inline-flex items-center gap-2">
        <span
          className={cn(
            'inline-flex items-center rounded-full border px-3.5 py-1 font-mono text-xs font-semibold tracking-[0.25em] uppercase transition-colors',
            isDark
              ? 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10'
              : 'text-indigo-600 border-indigo-200 bg-indigo-50/80 shadow-sm'
          )}
        >
          {eyebrow}
        </span>
      </div>

      <h2
        className={cn(
          'mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight',
          isDark ? 'text-white' : 'text-slate-900'
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            'mt-3.5 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto',
            isDark ? 'text-slate-400' : 'text-slate-600'
          )}
        >
          {description}
        </p>
      )}

      <div className="mt-5 flex justify-center items-center gap-1.5">
        <div className="h-1 w-2 rounded-full bg-indigo-500" />
        <div
          className="h-1 w-20 sm:w-28 rounded-full"
          style={{ background: 'linear-gradient(90deg, #6366f1, #a855f7, #06b6d4)' }}
        />
        <div className="h-1 w-2 rounded-full bg-cyan-400" />
      </div>
    </div>
  );
}
