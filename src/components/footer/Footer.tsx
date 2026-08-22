import { WEDDING } from '../../constants/wedding';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.hearts} aria-hidden="true">❤ ❤ ❤</div>
      <p className={styles.names}>{WEDDING.groomName} &amp; {WEDDING.brideName}</p>
      <p className={styles.date}>xx · xx · 2026</p>
      <blockquote className={styles.quote}>
        "Bảo với em rằng: một đời dài lắm, hãy để anh được che chở em."
      </blockquote>
      <p className={styles.copy}>© 2026 Thiệp mời cưới điện tử</p>
    </footer>
  );
}
