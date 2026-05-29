export interface SectionHeaderProps {
  isDark: boolean;
  eyebrow: string;
  title: string;
  description?: string;
}

export default function SectionHeader({ isDark, eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <span className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs font-semibold tracking-[0.3em] uppercase ${
        isDark ? 'text-indigo-400' : 'text-indigo-600'
      } ${isDark ? 'border-white/10 bg-white/5' : 'border-indigo-100 bg-indigo-50/80'}`}>
        {eyebrow}
      </span>
      <h2 className={`mt-5 text-4xl sm:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base sm:text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {description}
        </p>
      )}
      <div className="mt-6 flex justify-center">
        <div className="h-px w-24 rounded-full" style={{ background: 'linear-gradient(90deg,#6366f1,#a855f7,#06b6d4)' }} />
      </div>
    </div>
  );
}
