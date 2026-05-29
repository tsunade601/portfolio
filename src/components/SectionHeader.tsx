export interface SectionHeaderProps {
  isDark: boolean;
  eyebrow: string;
  title: string;
}

export default function SectionHeader({ isDark, eyebrow, title }: SectionHeaderProps) {
  return (
    <div className="text-center">
      <span className={`font-mono text-sm font-semibold tracking-widest uppercase ${
        isDark ? 'text-indigo-400' : 'text-indigo-600'
      }`}>
        // {eyebrow}
      </span>
      <h2 className={`mt-3 text-4xl sm:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      <div className="mt-4 flex justify-center">
        <div className="h-1 w-16 rounded-full" style={{ background: 'linear-gradient(90deg,#6366f1,#a855f7)' }} />
      </div>
    </div>
  );
}
