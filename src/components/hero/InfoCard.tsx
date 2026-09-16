import { WEDDING } from '../../constants/wedding';
import { getInvitationParams } from '../../utils/urlParams';
import styles from './InfoCard.module.css';

export function InfoCard() {
  const { side, dinner } = getInvitationParams();

  // Xác định cấu hình bữa cơm thân mật dựa trên param URL
  // side: 'groom' (mặc định) | 'bride'
  // dinner: 'morning' | 'evening' (mặc định)
  const isBride = side === 'bride';
  const isMorning = dinner === 'morning';

  type DinnerConfig = {
    readonly time: string;
    readonly dateLabel: string;
    readonly lunar: string;
    readonly address: string;
  };

  let dinnerConfig: DinnerConfig = WEDDING.groomDinnerEvening;
  if (isBride && isMorning) {
    dinnerConfig = WEDDING.brideDinnerMorning;
  } else if (isBride && !isMorning) {
    dinnerConfig = WEDDING.brideDinnerEvening;
  } else if (!isBride && isMorning) {
    dinnerConfig = WEDDING.groomDinnerMorning;
  }

  const dinnerLabel = "Tổ chức tiệc cưới";

  return (
    <div className={styles.cardContainer} id="wedding-info-card">
      {/* Main Glass Card */}
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.title}>Lễ Thành Hôn</span>
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

        {/* Action: Album button */}
        <div className={styles.actions}>
          <a
            href="#gallery"
            id="infocard-gallery-btn"
            className={styles.actionBtn}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('gallery');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setTimeout(() => {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 400);
              }
            }}
          >
            <div className={styles.iconCircle}>
              <svg className={styles.galleryIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <span className={styles.actionText}>Ảnh cưới</span>
          </a>
        </div>
      </div>

      {/* Dinner Separate Glass Card */}
      <div className={styles.dinnerCard}>
        <p className={styles.label}>{dinnerLabel}</p>
        <p className={styles.value}>{dinnerConfig.time} • {dinnerConfig.dateLabel}</p>
        <p className={styles.sub}>{dinnerConfig.address}</p>
      </div>
    </div>
  );
}

