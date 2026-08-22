import { useEffect, useRef } from 'react';
import styles from './Particles.module.css';

interface Particle {
  left: string;
  size: string;
  duration: string;
  delay: string;
  opacity: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    left:     `${Math.random() * 100}%`,
    size:     `${Math.random() * 3 + 1}px`,
    duration: `${Math.random() * 12 + 8}s`,
    delay:    `${Math.random() * 10}s`,
    opacity:  Math.random() * 0.5 + 0.1,
  }));
}

export function Particles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = useRef<Particle[]>(generateParticles(25));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    particles.current.forEach((p) => {
      const el = document.createElement('div');
      el.className = styles.particle;
      el.style.left            = p.left;
      el.style.width           = p.size;
      el.style.height          = p.size;
      el.style.animationDuration = p.duration;
      el.style.animationDelay  = p.delay;
      el.style.opacity         = String(p.opacity);
      container.appendChild(el);
    });

    return () => {
      while (container.firstChild) container.removeChild(container.firstChild);
    };
  }, []);

  return <div ref={containerRef} className={styles.container} aria-hidden="true" />;
}
