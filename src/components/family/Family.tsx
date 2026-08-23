import { SectionTitle } from '../ui/SectionTitle';
import { Contact } from '../contact/Contact';
import { FAMILIES } from '../../constants/wedding';
import type { FamilyInfo } from '../../types';
import styles from './Family.module.css';

function FamilyCard({ info }: { info: FamilyInfo }) {
  return (
    <div className={`${styles.card} reveal`} id={`${info.side}-family`}>
      <span className={styles.tag}>{info.label}</span>
      <h3 className={styles.title}>{info.personName}</h3>
      <div className={styles.rows}>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Đại diện</span>
          <span className={styles.rowValue}>
            {info.family.representative.join('\n')}
          </span>
        </div>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Địa chỉ</span>
          <span className={styles.rowValue}>{info.family.address}</span>
        </div>
      </div>
    </div>
  );
}

export function Family() {
  return (
    <section id="family">
      <div className="section-wrapper section-wrapper--wide">
        <div className={styles.header}>
          <SectionTitle ornament>Nhà trai &amp; nhà gái</SectionTitle>
          <p className={styles.note}>
            Hai gia đình cách nhau 4' đi bộ, rất gần nha!
          </p>
        </div>
        <div className={styles.grid}>
          {FAMILIES.map((info) => (
            <FamilyCard key={info.side} info={info} />
          ))}
        </div>

        {/* Contact Hotline */}
        <Contact />
      </div>
    </section>
  );
}
