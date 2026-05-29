import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

export function useParticles(canvasRef: React.RefObject<HTMLCanvasElement | null>, isDark: boolean): void {
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = isDark
      ? ['#6366f1', '#a855f7', '#06b6d4', '#818cf8', '#c084fc']
      : ['#4f46e5', '#7c3aed', '#0891b2', '#6366f1', '#a855f7'];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const count = Math.min(Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 12000), 80);

    const initParticles = () => {
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.15,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const drawConnections = (p: Particle, particles: Particle[]) => {
      particles.forEach((q) => {
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 130;
        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.18 * (isDark ? 1 : 0.7);
          ctx!.beginPath();
          ctx!.strokeStyle = isDark
            ? `rgba(99,102,241,${opacity})`
            : `rgba(79,70,229,${opacity})`;
          ctx!.lineWidth = 0.8;
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(q.x, q.y);
          ctx!.stroke();
        }
      });
    };

    const drawMouseConnections = (p: Particle) => {
      const dx = p.x - mouseRef.current.x;
      const dy = p.y - mouseRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 160;
      if (dist < maxDist) {
        const opacity = (1 - dist / maxDist) * 0.45;
        ctx!.beginPath();
        ctx!.strokeStyle = isDark
          ? `rgba(168,85,247,${opacity})`
          : `rgba(99,102,241,${opacity})`;
        ctx!.lineWidth = 1;
        ctx!.moveTo(p.x, p.y);
        ctx!.lineTo(mouseRef.current.x, mouseRef.current.y);
        ctx!.stroke();

        // repel / attract
        const force = (maxDist - dist) / maxDist;
        p.vx -= (dx / dist) * force * 0.015;
        p.vy -= (dy / dist) * force * 0.015;
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        // dampen velocity
        p.vx *= 0.99;
        p.vy *= 0.99;

        // base drift
        p.vx += (Math.random() - 0.5) * 0.01;
        p.vy += (Math.random() - 0.5) * 0.01;

        // clamp velocity
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.5) { p.vx = (p.vx / speed) * 1.5; p.vy = (p.vy / speed) * 1.5; }

        p.x += p.vx;
        p.y += p.vy;

        // bounce
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > canvas.width) { p.x = canvas.width; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > canvas.height) { p.y = canvas.height; p.vy *= -1; }

        drawConnections(p, particlesRef.current);
        drawMouseConnections(p);

        // draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        const hex = p.color;
        ctx.fillStyle = hex + Math.round(p.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    const handleTouch = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      mouseRef.current = { x: t.clientX - rect.left, y: t.clientY - rect.top };
    };

    window.addEventListener('resize', resize);
    canvas.parentElement?.addEventListener('mousemove', handleMouse as EventListener);
    canvas.parentElement?.addEventListener('mouseleave', handleMouseLeave);
    canvas.parentElement?.addEventListener('touchmove', handleTouch as EventListener, { passive: true });

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      canvas.parentElement?.removeEventListener('mousemove', handleMouse as EventListener);
      canvas.parentElement?.removeEventListener('mouseleave', handleMouseLeave);
      canvas.parentElement?.removeEventListener('touchmove', handleTouch as EventListener);
    };
  }, [isDark, canvasRef]);
}
