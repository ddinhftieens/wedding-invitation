import { WEDDING } from '../../constants/wedding';
import styles from './InfoCard.module.css';

interface Props {
  onDirections?: () => void;
  onPhotos?: () => void;
}

export function InfoCard({ onDirections, onPhotos }: Props) {
  return (
    <div className={styles.card} id="wedding-info-card">
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.title}>Thông tin Lễ Thành Hôn</span>
        <span className={styles.heart} aria-label="heart">♥</span>
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
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <polygon points="3 11 22 2 13 21 11 13 3 11" />
          </svg>
          Chỉ đường
        </a>
        <a
          href="#gallery"
          className={styles.actionBtn}
          id="photo-btn"
          onClick={onPhotos}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          Ảnh cưới
        </a>
      </div>

      {/* Dinner */}
      <div className={styles.dinner}>
        <p className={styles.label}>Bữa cơm thân mật</p>
        <p className={styles.value}>{WEDDING.dinnerTime} • {WEDDING.dinnerDateLabel}</p>
        <p className={styles.sub}>Tại nhà trai: {WEDDING.dinnerAddress}</p>
      </div>
    </div>
  );
}
