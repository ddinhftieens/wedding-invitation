import { WEDDING } from '../../constants/wedding';
import styles from './SaveTheDate.module.css';

interface SaveTheDateProps {
  date?: Date;
  bgImage?: string;
}

export function SaveTheDate({
  date = WEDDING.ceremonyDate,
  bgImage = `${import.meta.env.BASE_URL}image/1.jpg`,
}: SaveTheDateProps) {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-indexed
  const monthNum = month + 1;
  const targetDay = date.getDate();

  // Get total days in month
  const totalDays = new Date(year, month + 1, 0).getDate();
  // Get starting day index (0 = Sun, 1 = Mon, ..., 6 = Sat)
  const firstDayIndex = new Date(year, month, 1).getDay();

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Array of blank slots before day 1
  const blanks = Array.from({ length: firstDayIndex });
  // Array of days 1..totalDays
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  const cardStyle = {
    backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.85) 0%, rgba(9, 13, 22, 0.93) 100%), url(${bgImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className={`${styles.card} reveal`}>
      <div className={styles.bgImage} style={cardStyle} />
      <div className={styles.cardContent}>
        {/* Month & Year Header */}
        <h3 className={styles.monthHeader}>
          THÁNG {monthNum} / {year}
        </h3>

        {/* Days of week header */}
        <div className={styles.weekdaysGrid}>
          {daysOfWeek.map((day, idx) => (
            <div key={idx} className={styles.weekday}>
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className={styles.daysGrid}>
          {blanks.map((_, idx) => (
            <div key={`blank-${idx}`} className={styles.emptyCell} />
          ))}
          {days.map((d) => {
            const isWeddingDay = d === targetDay;
            return (
              <div
                key={d}
                className={`${styles.dayCell} ${isWeddingDay ? styles.weddingDayCell : ''}`}
              >
                {isWeddingDay ? (
                  <div className={styles.heartBadge} title={`Ngày cưới: ${d}/${monthNum}/${year}`}>
                    <span>{d}</span>
                  </div>
                ) : (
                  <span>{d}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Divider line */}
        <div className={styles.divider} />

        {/* Save the Date cursive text */}
        <div className={styles.scriptTitle}>Save the Date</div>
      </div>
    </div>
  );
}
