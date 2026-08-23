import { useState, type FormEvent } from 'react';
import { Button } from '../ui/Button';
import { SectionTitle } from '../ui/SectionTitle';
import type { RSVPData } from '../../types';
import styles from './RSVP.module.css';

const defaultForm: RSVPData = {
  name: '',
  phone: '',
  option: 'yes-both',
  guestCount: 0,
  message: '',
};

export function RSVP() {
  const [form, setForm] = useState<RSVPData>(defaultForm);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'guestCount' ? Number(value) : value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    console.log('RSVP submitted:', form);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section id="rsvp">
        <div className="section-wrapper section-wrapper--centered">
          <div className={styles.success}>
            <div className={styles.successIcon}>🎉</div>
            <h3 className={styles.successTitle}>Cảm ơn bạn rất nhiều!</h3>
            <p className={styles.successText}>
              Chúng tôi rất vui khi biết bạn sẽ đến. Hẹn gặp bạn vào ngày trọng đại!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp">
      <div className="section-wrapper section-wrapper--centered">
        <SectionTitle>Xác nhận tham dự</SectionTitle>
        <p className={styles.desc}>
          Sự hiện diện của bạn là món quà quý giá nhất dành cho gia đình chúng tôi.
          {/* <br /> */}
          {/* Hãy xác nhận trước <strong>{WEDDING.rsvpDeadline}</strong> để chúng tôi chuẩn bị chu đáo hơn nhé! */}
        </p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.row}>
            <div className={styles.group}>
              <label htmlFor="rsvp-name" className="form-label">Họ và tên *</label>
              <input
                id="rsvp-name"
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
              <label htmlFor="rsvp-phone" className="form-label">Số điện thoại</label>
              <input
                id="rsvp-phone"
                name="phone"
                type="tel"
                className="form-input"
                placeholder="0912 345 678"
                value={form.phone}
                onChange={handleChange}
                autoComplete="tel"
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.group}>
              <label htmlFor="rsvp-option" className="form-label">Tham dự</label>
              <select
                id="rsvp-option"
                name="option"
                className="form-input"
                value={form.option}
                onChange={handleChange}
              >
                <option value="yes">Sẽ tham dự</option>
                {/* <option value="yes-dinner">Chỉ bữa cơm thân mật (xx/xx)</option> */}
                {/* <option value="yes-wedding">Chỉ lễ thành hôn (xx/xx)</option> */}
                <option value="no">Tiếc là không thể đến</option>
              </select>
            </div>
            <div className={styles.group}>
              <label htmlFor="rsvp-guests" className="form-label">Số người đi cùng</label>
              <select
                id="rsvp-guests"
                name="guestCount"
                className="form-input"
                value={form.guestCount}
                onChange={handleChange}
              >
                <option value={0}>Chỉ mình tôi</option>
                <option value={1}>1 người</option>
                <option value={2}>2 người</option>
                <option value={3}>3 người</option>
                <option value={4}>4 người</option>
                <option value={5}>5 người</option>
                <option value={6}>6 người</option>
              </select>
            </div>
          </div>

          <div className={styles.group}>
            <label htmlFor="rsvp-message" className="form-label">Lời nhắn cho cô dâu &amp; chú rể</label>
            <textarea
              id="rsvp-message"
              name="message"
              className="form-input"
              rows={4}
              placeholder="Chúc hai bạn trăm năm hạnh phúc..."
              value={form.message}
              onChange={handleChange}
            />
          </div>

          <Button variant="primary" type="submit" fullWidth id="submit-rsvp">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            Gửi xác nhận
          </Button>
        </form>
      </div>
    </section>
  );
}
