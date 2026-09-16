import { useState, useEffect, type FormEvent } from 'react';
import { Button } from '../ui/Button';
import { SectionTitle } from '../ui/SectionTitle';
import { ThankYouModal } from '../ui/ThankYouModal';
import { WEDDING } from '../../constants/wedding';
import { getInvitationParams } from '../../utils/urlParams';
import type { RSVPData } from '../../types';
import styles from './RSVP.module.css';

const defaultForm: RSVPData = {
  name: '',
  option: 'yes',
  guestCount: 0,
  message: '',
};

export function RSVP() {
  const [form, setForm] = useState<RSVPData>(defaultForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ name: string; option: string } | null>(null);

  // Tự động điền họ tên từ URL parameters khi khách mở link
  useEffect(() => {
    const { name } = getInvitationParams();
    if (name) {
      setForm((prev) => ({ ...prev, name }));
    }
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => {
      if (name === 'option' && value === 'no') {
        return { ...prev, option: 'no', guestCount: 0 };
      }
      return { ...prev, [name]: name === 'guestCount' ? Number(value) : value };
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const { id: guestId } = getInvitationParams();
    const guestName = form.name.trim();

    // Gửi cập nhật thông tin lên Google Sheet
    const url = WEDDING.guestbookScriptUrl;
    if (url) {
      try {
        await fetch(url, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify({
            action: 'update_rsvp',
            id: guestId || '',
            name: guestName,
            option: form.option === 'yes' ? 'Sẽ tham dự' : 'Không thể tham gia',
            guestCount: form.guestCount,
          }),
        });
      } catch (err) {
        console.error('Lỗi khi gửi xác nhận tham dự:', err);
      }
    }

    setSubmittedData({ name: guestName, option: form.option });
    setIsSubmitting(false);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    setForm(defaultForm);
  }

  const isAttending = submittedData?.option !== 'no';

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
                disabled={form.option === 'no' || isSubmitting}
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

          {/* <div className={styles.group}>
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
          </div> */}

          <Button variant="primary" type="submit" fullWidth id="submit-rsvp" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className={styles.spinner} />
                <span className={styles.submitText}>Đang gửi xác nhận...</span>
              </>
            ) : (
              <>
                <svg className={styles.submitIcon} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className={styles.submitText}>Gửi xác nhận</span>
              </>
            )}
          </Button>
        </form>

        <ThankYouModal
          isOpen={showModal}
          onClose={handleCloseModal}
          guestName={submittedData?.name}
          type={isAttending ? 'rsvp-yes' : 'rsvp-no'}
          title={
            isAttending
              ? 'Cảm ơn bạn đã tới tham dự!'
              : 'Cảm ơn phản hồi của bạn!'
          }
          message={
            isAttending
              ? 'Gia đình cô dâu và chú rể rất vui mừng và hân hạnh được đón tiếp bạn trong ngày trọng đại này.'
              : 'Dù rất tiếc vì bạn không thể đến dự, nhưng cảm ơn bạn rất nhiều vì đã gửi lời chúc và tình cảm ấm áp dành cho cô dâu & chú rể!'
          }
        />
      </div>
    </section>
  );
}
