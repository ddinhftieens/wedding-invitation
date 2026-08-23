import { useMemo } from 'react';
import styles from './RosePetals.module.css';

interface PetalConfig {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  sway: number;
  opacity: number;
  blur: number;
  gradientId: string;
}

const GRADIENTS = [
  { id: 'roseGrad1', start: '#f43f5e', end: '#be123c' },
  { id: 'roseGrad2', start: '#fb7185', end: '#e11d48' },
  { id: 'roseGrad3', start: '#fda4af', end: '#f43f5e' },
  { id: 'roseGrad4', start: '#e11d48', end: '#881337' },
];

export function RosePetals({ count = 24 }: { count?: number }) {
  const petals = useMemo<PetalConfig[]>(() => {
    return Array.from({ length: count }, (_, i) => {
      const grad = GRADIENTS[i % GRADIENTS.length];
      return {
        id: i,
        left: Math.random() * 100,
        size: 16 + Math.random() * 18, // 16px to 34px
        duration: 9 + Math.random() * 9, // 9s to 18s
        delay: Math.random() * 12, // 0s to 12s delay
        sway: (Math.random() - 0.5) * 160, // -80px to +80px sway
        opacity: 0.45 + Math.random() * 0.45,
        blur: Math.random() > 0.7 ? 1.5 : 0,
        gradientId: grad.id,
      };
    });
  }, [count]);

  return (
    <div className={styles.container} aria-hidden="true">
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          {GRADIENTS.map((g) => (
            <linearGradient key={g.id} id={g.id} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={g.start} />
              <stop offset="100%" stopColor={g.end} />
            </linearGradient>
          ))}
        </defs>
      </svg>

      {petals.map((p) => (
        <div
          key={p.id}
          className={styles.petal}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.25}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
            filter: p.blur ? `blur(${p.blur}px)` : 'none',
            ['--sway-x' as string]: `${p.sway}px`,
          }}
        >
          <svg viewBox="0 0 30 36" className={styles.petalSvg}>
            <path
              d="M15 2 C23 2, 29 8, 28 18 C27 27, 18 34, 15 34 C12 34, 3 27, 2 18 C1 8, 7 2, 15 2 Z"
              fill={`url(#${p.gradientId})`}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
