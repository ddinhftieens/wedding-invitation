import { useState, type FormEvent } from 'react';
import { Button } from '../ui/Button';
import { SectionTitle } from '../ui/SectionTitle';
import { SAMPLE_WISHES } from '../../constants/wedding';
import type { WishItem, RelationType } from '../../types';
import { RELATION_LABELS } from '../../types';
import { getInitial, generateId } from '../../utils/helpers';
import styles from './Wishes.module.css';

function WishCard({ wish }: { wish: WishItem }) {
  return (
    <article className={`${styles.card} reveal`} aria-label={`Lời chúc của ${wish.name}`}>
      <div className={styles.cardHeader}>
        <div className={styles.avatar} aria-hidden="true">{getInitial(wish.name)}</div>
        <div className={styles.meta}>
          <span className={styles.name}>{wish.name}</span>
          <span className={styles.relation}>{RELATION_LABELS[wish.relation]}</span>
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
  const [wishes, setWishes] = useState<WishItem[]>(SAMPLE_WISHES);
  const [form, setForm] = useState<WishFormData>(defaultForm);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;

    const newWish: WishItem = {
      id: generateId(),
      name: form.name.trim(),
      relation: form.relation,
      text: form.text.trim(),
      time: 'Vừa xong',
    };

    setWishes((prev) => [newWish, ...prev]);
    setForm(defaultForm);
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
            />
          </div>
          <Button variant="outline" type="submit" fullWidth id="submit-wish">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            Gửi lời chúc
          </Button>
        </form>

        {/* Wishes list */}
        <div className={styles.list} aria-label="Danh sách lời chúc">
          {wishes.map((w) => <WishCard key={w.id} wish={w} />)}
        </div>
      </div>
    </section>
  );
}
