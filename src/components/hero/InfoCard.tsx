import { WEDDING } from '../../constants/wedding';
import styles from './InfoCard.module.css';

interface Props {
  onDirections?: () => void;
  onPhotos?: () => void;
}

export function InfoCard({ onDirections, onPhotos }: Props) {
  return (
    <div className={styles.cardContainer} id="wedding-info-card">
      {/* Main Glass Card */}
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.title}>Thông tin Lễ Thành Hôn</span>
          <div className={styles.heartCircle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#ef4444" className={styles.heartIcon} aria-label="Heart icon">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>

        {/* Ceremony time */}
        <div className={styles.block}>
          <p className={styles.label}>Thời gian</p>
          <p className={styles.value}>{WEDDING.ceremonyTime} • {WEDDING.ceremonyDateLabel}</p>
          <p className={styles.sub}>{WEDDING.ceremonyLunar}</p>
        </div>

        {/* Location */}
        <div className={styles.block}>
          <p className={styles.label}>Địa điểm</p>
          <p className={styles.value}>{WEDDING.ceremonyAddress}</p>
        </div>

        {/* Action buttons */}
        <div className={styles.actions}>
          <a
            href="#family"
            className={styles.actionBtn}
            id="directions-btn"
            onClick={(e) => {
              if (onDirections) {
                onDirections();
              } else {
                e.preventDefault();
                document.getElementById('family')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            <div className={styles.iconCircle}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
            </div>
            Chỉ đường
          </a>
          <a
            href="#gallery"
            className={styles.actionBtn}
            id="photo-btn"
            onClick={onPhotos}
          >
            <div className={styles.iconCircle}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            Album
          </a>
        </div>
      </div>

      {/* Dinner Separate Glass Card */}
      <div className={styles.dinnerCard}>
        <p className={styles.label}>Bữa cơm thân mật</p>
        <p className={styles.value}>{WEDDING.dinnerTime} • {WEDDING.dinnerDateLabel}</p>
        <p className={styles.sub}>Tại nhà trai: {WEDDING.dinnerAddress}</p>
      </div>
    </div>
  );
}
