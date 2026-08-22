import { useState } from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { GIFT_INFO } from '../../constants/wedding';
import type { GiftInfo } from '../../types';
import { copyToClipboard } from '../../utils/helpers';
import styles from './Gift.module.css';

const QR_SVG = (
  <svg width="90" height="90" viewBox="0 0 90 90" fill="none" aria-hidden="true">
    <rect x="5"  y="5"  width="30" height="30" rx="3" stroke="currentColor" strokeWidth="2"/>
    <rect x="11" y="11" width="18" height="18" fill="currentColor" rx="1"/>
    <rect x="55" y="5"  width="30" height="30" rx="3" stroke="currentColor" strokeWidth="2"/>
    <rect x="61" y="11" width="18" height="18" fill="currentColor" rx="1"/>
    <rect x="5"  y="55" width="30" height="30" rx="3" stroke="currentColor" strokeWidth="2"/>
    <rect x="11" y="61" width="18" height="18" fill="currentColor" rx="1"/>
    <rect x="42" y="42" width="6" height="6" fill="currentColor"/>
    <rect x="50" y="42" width="6" height="6" fill="currentColor"/>
    <rect x="58" y="42" width="6" height="6" fill="currentColor"/>
    <rect x="42" y="50" width="6" height="6" fill="currentColor"/>
    <rect x="58" y="50" width="6" height="6" fill="currentColor"/>
    <rect x="50" y="58" width="6" height="6" fill="currentColor"/>
    <rect x="66" y="58" width="6" height="6" fill="currentColor"/>
    <rect x="74" y="50" width="6" height="6" fill="currentColor"/>
    <rect x="74" y="66" width="6" height="6" fill="currentColor"/>
    <rect x="66" y="74" width="6" height="6" fill="currentColor"/>
  </svg>
);

function GiftCard({ info }: { info: GiftInfo }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await copyToClipboard(info.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={`${styles.card} reveal`} id={`gift-${info.role}`}>
      <div className={styles.avatar} aria-hidden="true">{info.emoji}</div>
      <h3 className={styles.label}>{info.label}</h3>
      <p className={styles.fullName}>{info.fullName}</p>

      <div className={styles.bank}>
        <span className={styles.bankName}>{info.bank}</span>
        <div className={styles.accountRow}>
          <span className={styles.account} id={`${info.role}-account`}>
            {info.accountNumber}
          </span>
          <button
            className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
            onClick={handleCopy}
            aria-label={copied ? 'Đã sao chép' : 'Sao chép số tài khoản'}
            title={copied ? 'Đã sao chép!' : 'Sao chép'}
          >
            {copied ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className={styles.qr}>
        <div className={styles.qrBox}>{QR_SVG}</div>
        <p className={styles.qrLabel}>Mã QR {info.label.toLowerCase()}</p>
      </div>
    </div>
  );
}

export function Gift() {
  return (
    <section id="gift">
      <div className="section-wrapper section-wrapper--wide">
        <SectionTitle>Mừng cưới online</SectionTitle>
        <p className={styles.desc}>
          Nếu bạn muốn gửi lời chúc mừng qua hình thức chuyển khoản, đây là thông tin của chúng tôi:
        </p>
        <div className={styles.grid}>
          {GIFT_INFO.map((info) => (
            <GiftCard key={info.role} info={info} />
          ))}
        </div>
      </div>
    </section>
  );
}
