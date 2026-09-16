import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.hearts} aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <svg
            key={i}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="#ef4444"
            className={styles.heartIcon}
            style={{ animationDelay: `${(i - 1) * 0.3}s` }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ))}
      </div>
      <p className={styles.names}>
        <span>Đình Tiến</span>
        <span className={styles.ampersand}>&amp;</span>
        <span>Thu Hằng</span>
      </p>
      <p className={styles.date}>xx · xx · 20xx</p>
      <blockquote className={styles.quote}>
        "Gặp được em là điều may mắn, được cùng em đi hết cuộc đời là điều anh mong"
      </blockquote>
      <p className={styles.copy}>© Đình Tiến & Thu Hằng</p>
    </footer>
  );
}
