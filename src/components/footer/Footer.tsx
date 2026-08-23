import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.hearts} aria-hidden="true">❤ ❤ ❤</div>
      <p className={styles.names}>Đình Tiến &amp; Thu Hằng</p>
      <p className={styles.date}>xx · xx · 20xx</p>
      <blockquote className={styles.quote}>
        "Bảo với em rằng: MỘT ĐỜI DÀI LẮM, HÃY ĐỂ ANH ĐƯỢC CHE CHỞ EM."
      </blockquote>
      <p className={styles.copy}>© Đình Tiến & Thu Hằng</p>
    </footer>
  );
}
