import { Button } from '../ui/Button';
import { WEDDING } from '../../constants/wedding';
import styles from './Hero.module.css';
import { Particles } from './Particles';
import { InfoCard } from './InfoCard';
import { getInvitationParams } from '../../utils/urlParams';

export function Hero() {
  const { name, honorific } = getInvitationParams();

  // Tạo câu mời cá nhân hoá theo tên và danh xưng từ URL param
  const guestName = name ? name.trim() : 'bạn';
  const hostHonorific = honorific ? honorific.trim() : 'chúng tôi';

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
            Trân trọng kính mời <strong style={{ color: 'var(--gold)' }}>{guestName}</strong> đến chung vui trong ngày trọng đại của {hostHonorific}
          </p>

          <div className={`${styles.actions} animate-fade-up delay-800`}>
            <Button
              variant="primary"
              href="#rsvp"
              id="rsvp-btn"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('rsvp');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  // Fallback adjustment if images load or layout shifts during scroll
                  setTimeout(() => {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 400);
                }
              }}
            >
              <svg className={styles.rsvpIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span className={styles.rsvpText}>Xác nhận tham dự</span>
            </Button>
            <Button
              variant="outline"
              href="#wishes"
              id="wishes-btn"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('wishes');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  setTimeout(() => {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 400);
                }
              }}
            >
              <svg className={styles.wishesIcon} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className={styles.wishesText}>Lời chúc yêu thương</span>
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
