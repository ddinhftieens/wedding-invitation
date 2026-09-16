import { useEffect } from 'react';
import { Button } from './Button';
import styles from './ThankYouModal.module.css';

export interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  guestName?: string;
  message: string;
  type?: 'rsvp-yes' | 'rsvp-no' | 'wish';
}

export function ThankYouModal({
  isOpen,
  onClose,
  title,
  guestName,
  message,
  // type = 'rsvp-yes',
}: ThankYouModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // const icon = type === 'rsvp-yes' ? '🎉' : type === 'rsvp-no' ? '💌' : '💖';

  return (
    <div className={styles.backdrop} onClick={onClose} aria-modal="true" role="dialog">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Đóng popup">
          ✕
        </button>

        {/* <div className={styles.iconCircle}>{icon}</div> */}

        {guestName && (
          <p className={styles.guestGreeting}>
            Thân gửi <strong>{guestName}</strong>,
          </p>
        )}

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>

        <p className={styles.signature}>
          <span>Đình Tiến</span>
          <span className={styles.ampersand}>&amp;</span>
          <span>Thu Hằng</span>
        </p>

        <div className={styles.actions}>
          <Button variant="primary" onClick={onClose} fullWidth id="close-thankyou-modal">
            Cảm ơn!
          </Button>
        </div>
      </div>
    </div>
  );
}
