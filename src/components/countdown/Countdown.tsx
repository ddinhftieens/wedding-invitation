import { SectionTitle } from '../ui/SectionTitle';
import { useCountdown } from '../../hooks/useCountdown';
import { WEDDING } from '../../constants/wedding';
import { fmt } from '../../utils/helpers';
import { SaveTheDate } from './SaveTheDate';
import styles from './Countdown.module.css';

interface CountdownItemProps {
  number: string;
  label: string;
}

function CountdownItem({ number, label }: CountdownItemProps) {
  return (
    <div className={`${styles.item} reveal`}>
      <span className={styles.number}>{number}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING.ceremonyDate);

  return (
    <section id="countdown" className={styles.section}>
      <div className="section-wrapper section-wrapper--centered">
        <SectionTitle>Đếm ngược đến ngày cưới</SectionTitle>
        <div className={styles.grid} role="timer" aria-live="polite" aria-label="Đếm ngược đến ngày cưới">
          <CountdownItem number={fmt(days)}    label="Ngày" />
          <span className={styles.sep} aria-hidden="true">:</span>
          <CountdownItem number={fmt(hours)}   label="Giờ" />
          <span className={styles.sep} aria-hidden="true">:</span>
          <CountdownItem number={fmt(minutes)} label="Phút" />
          <span className={styles.sep} aria-hidden="true">:</span>
          <CountdownItem number={fmt(seconds)} label="Giây" />
        </div>
        <SaveTheDate />
      </div>
    </section>
  );
}
