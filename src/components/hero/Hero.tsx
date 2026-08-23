import { Button } from '../ui/Button';
import { WEDDING } from '../../constants/wedding';
import styles from './Hero.module.css';
import { Particles } from './Particles';
import { InfoCard } from './InfoCard';

export function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      {/* Background decoration */}
      <div className={styles.overlay} aria-hidden="true" />
      <Particles />

      <div className={styles.container}>
        {/* Main content */}
        <div className={styles.content}>
          <p className={`${styles.dateTag} animate-fade-up delay-200`}>
            Chủ Nhật • xx / xx / 20xx
          </p>

          <div className={styles.names}>
            <h1 className={`${styles.groom} animate-fade-up delay-400`}>
              {WEDDING.groomName}
            </h1>
            <span className={`${styles.ampersand} animate-fade-up delay-500`} aria-hidden="true">
              &amp;
            </span>
            <h1 className={`${styles.bride} animate-fade-up delay-600`}>
              {WEDDING.brideName}
            </h1>
          </div>

          <p className={`${styles.subtitle} animate-fade-up delay-700`}>
            Trân trọng kính mời bạn đến chung vui trong ngày trọng đại của chúng tôi
          </p>

          <div className={`${styles.actions} animate-fade-up delay-800`}>
            <Button variant="primary" href="#rsvp" id="rsvp-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              Xác nhận tham dự
            </Button>
            <Button variant="outline" href="#gallery" id="gallery-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              Album
            </Button>
          </div>
        </div>

        {/* Info card */}
        <div className={`${styles.cardWrapper} animate-fade-up delay-900`}>
          <InfoCard />
        </div>
      </div>
    </section>
  );
}
