import type { ReactNode } from 'react';
import styles from './SectionTitle.module.css';

interface Props {
  children: ReactNode;
  ornament?: boolean;
  className?: string;
}

export function SectionTitle({ children, ornament = true, className = '' }: Props) {
  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      {ornament && <p className={styles.ornament}>✦ ─────── ✦ ─────── ✦</p>}
      <h2 className={styles.title}>{children}</h2>
    </div>
  );
}
