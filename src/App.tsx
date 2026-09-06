import { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import ScrollToTop from './components/ScrollToTop';
import { cn } from './utils/cn';

function AppContent() {
  const { isDark } = useTheme();
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Smooth spotlight card cursor tracking with RAF
  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const cards = document.querySelectorAll<HTMLElement>('.spotlight-card');
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          // Only calculate for cards in or close to viewport
          if (
            rect.bottom > -100 &&
            rect.top < window.innerHeight + 100 &&
            rect.right > -100 &&
            rect.left < window.innerWidth + 100
          ) {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
          }
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className={cn(
        'app-shell min-h-screen transition-colors duration-500 relative overflow-x-hidden selection:bg-indigo-500/20',
        isDark
          ? 'bg-[#030712] text-slate-100 bg-grid-pattern-dark'
          : 'bg-[#fafafa] text-slate-900 bg-grid-pattern-light'
      )}
    >
      <Navbar />

      <main id="main-content" className="relative z-10 focus:outline-none">
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <About onOpenResume={() => setIsResumeOpen(true)} />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />

      {/* Interactive Digital Curriculum Vitae Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Floating Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
