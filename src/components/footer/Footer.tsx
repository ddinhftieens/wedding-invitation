import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.hearts} aria-hidden="true">❤ ❤ ❤</div>
      <p className={styles.names}>Đình Tiến &amp; Thu Hằng</p>
      <p className={styles.date}>xx · xx · 20xx</p>
      <blockquote className={styles.quote}>
        "Gặp được em là điều may mắn, được cùng em đi hết cuộc đời là điều anh mong"
      </blockquote>
      <p className={styles.copy}>© Đình Tiến & Thu Hằng</p>
    </footer>
  );
}
