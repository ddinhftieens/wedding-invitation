import { useState, useEffect, type FormEvent } from 'react';
import { Button } from '../ui/Button';
import { SectionTitle } from '../ui/SectionTitle';
import { ThankYouModal } from '../ui/ThankYouModal';
import { WEDDING } from '../../constants/wedding';
import type { WishItem, RelationType } from '../../types';
import { RELATION_LABELS } from '../../types';
import { getInitial } from '../../utils/helpers';
import styles from './Wishes.module.css';

function WishCard({ wish }: { wish: WishItem }) {
  return (
    <article className={`${styles.card} reveal`} aria-label={`Lời chúc của ${wish.name}`}>
      <div className={styles.cardHeader}>
        <div className={styles.avatar} aria-hidden="true">{getInitial(wish.name)}</div>
        <div className={styles.meta}>
          <span className={styles.name}>{wish.name}</span>
          <span className={styles.relation}>{RELATION_LABELS[wish.relation] || wish.relation}</span>
        </div>
        <span className={styles.time}>{wish.time}</span>
      </div>
      <p className={styles.text}>{wish.text}</p>
    </article>
  );
}

interface WishFormData {
  name: string;
  relation: RelationType;
  text: string;
}

const defaultForm: WishFormData = { name: '', relation: 'friend', text: '' };

export function Wishes() {
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<WishFormData>(defaultForm);
  const [showModal, setShowModal] = useState(false);
  const [submittedGuestName, setSubmittedGuestName] = useState('');

  // Fetch approved wishes from Google Sheets via Apps Script
  useEffect(() => {
    const url = WEDDING.guestbookScriptUrl;
    if (!url) return;

    let isMounted = true;
    setIsLoading(true);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data && data.status === 'success' && Array.isArray(data.data)) {
          setWishes(data.data);
        }
      })
      .catch((err) => {
        console.warn('Không thể tải lời chúc từ Google Sheet:', err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim() || isSubmitting) return;

    const guestName = form.name.trim();
    const guestRelation = form.relation;
    const guestText = form.text.trim();

    setIsSubmitting(true);

    const url = WEDDING.guestbookScriptUrl;
    if (url) {
      try {
        // Send payload as stringified JSON with text/plain (avoids CORS preflight options request)
        await fetch(url, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify({
            name: guestName,
            relation: guestRelation,
            text: guestText,
          }),
        });
      } catch (err) {
        console.error('Lỗi khi gửi lời chúc lên Google Apps Script:', err);
      }
    }

    setSubmittedGuestName(guestName);
    setForm(defaultForm);
    setIsSubmitting(false);
    setShowModal(true);
  }

  return (
    <section id="wishes">
      <div className="section-wrapper section-wrapper--centered">
        <SectionTitle>Sổ lưu bút</SectionTitle>
        <p className={styles.desc}>Hãy để lại lời chúc yêu thương cho cô dâu và chú rể nhé!</p>

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.row}>
            <div className={styles.group}>
              <label htmlFor="wish-name" className="form-label">Tên bạn *</label>
              <input
                id="wish-name"
                name="name"
                type="text"
                className="form-input"
                placeholder="Nguyễn Văn A"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
                disabled={isSubmitting}
              />
            </div>
            <div className={styles.group}>
              <label htmlFor="wish-relation" className="form-label">Quan hệ</label>
              <select
                id="wish-relation"
                name="relation"
                className="form-input"
                value={form.relation}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                {(Object.keys(RELATION_LABELS) as RelationType[]).map((key) => (
                  <option key={key} value={key}>{RELATION_LABELS[key]}</option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.group}>
            <label htmlFor="wish-text" className="form-label">Lời chúc *</label>
            <textarea
              id="wish-text"
              name="text"
              className="form-input"
              rows={3}
              placeholder="Chúc hai bạn mãi mãi yêu thương nhau..."
              value={form.text}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>
          <Button variant="outline" type="submit" fullWidth id="submit-wish" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className={styles.spinner} style={{ width: 16, height: 16, borderWidth: 2 }} />
                Đang gửi...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                Gửi lời chúc
              </>
            )}
          </Button>
        </form>

        {/* Wishes list */}
        <div className={styles.list} aria-label="Danh sách lời chúc">
          {isLoading ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner} />
              <span>Đang tải lời chúc...</span>
            </div>
          ) : wishes.length === 0 ? (
            <div className={styles.emptyState}>
              <span>Hãy là người đầu tiên gửi lời chúc tới cô dâu và chú rể</span>
            </div>
          ) : (
            wishes.map((w) => <WishCard key={w.id} wish={w} />)
          )}
        </div>

        <ThankYouModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          guestName={submittedGuestName}
          type="wish"
          title="Cảm ơn lời chúc của bạn!"
          message="Lời chúc ý nghĩa của bạn đã được gửi thành công đến cô dâu & chú rể và sẽ hiển thị trên trang sau khi được phê duyệt."
        />
      </div>
    </section>
  );
}
