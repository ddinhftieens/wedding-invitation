import { useState, type FormEvent } from 'react';
import { WEDDING } from '../constants/wedding';
import { Button } from '../components/ui/Button';
import { ThankYouModal } from '../components/ui/ThankYouModal';
import styles from './GuestsPage.module.css';

interface GuestFormData {
  fullName: string;
  side: 'groom' | 'bride';
  honorific: string; // Nhân xưng (text tự nhập: Bạn, Anh, Chị, Bác, Em...)
  intimateDinner: 'morning' | 'evening'; // Cơm thân mật: sáng hoặc tối
}

const defaultForm: GuestFormData = {
  fullName: '',
  side: 'groom',
  honorific: '',
  intimateDinner: 'evening',
};

export function GuestsPage() {
  const [form, setForm] = useState<GuestFormData>(defaultForm);
  const [guestId, setGuestId] = useState<string>(() => `g_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Tạo URL thiệp mời điện tử kèm tất cả query params (bao gồm cả id)
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://ddinhftieens.github.io';
  const baseUrl = `${origin}/wedding-invitation/`;
  const params = new URLSearchParams();
  params.set('id', guestId);
  if (form.fullName.trim()) params.set('name', form.fullName.trim());
  if (form.side) params.set('side', form.side);
  if (form.honorific.trim()) params.set('honorific', form.honorific.trim());
  if (form.intimateDinner) params.set('dinner', form.intimateDinner);

  const queryString = params.toString();
  const invitationLink = `${baseUrl}?${queryString}`;

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(invitationLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Không thể copy link:', err);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.fullName.trim() || isSubmitting) return;

    const guestName = form.fullName.trim();
    setIsSubmitting(true);

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
            action: 'add_guest',
            id: guestId,
            fullName: guestName,
            side: form.side === 'groom' ? 'Chú rể' : 'Cô dâu',
            honorific: form.honorific.trim() || 'Bạn',
            intimateDinner:
              form.intimateDinner === 'evening'
                ? 'Cơm tối thân mật'
                : 'Cơm sáng thân mật',
            invitationLink: invitationLink,
          }),
        });
      } catch (err) {
        console.error('Lỗi gửi thông tin khách mời:', err);
      }
    }

    setForm(defaultForm);
    setIsSubmitting(false);
    setShowModal(true);
    // Sinh id mới cho khách mời tiếp theo
    setGuestId(`g_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`);
  }

  return (
    <div className={styles.pageContainer}>
      <a href="/" className={styles.backHome} aria-label="Quay lại thiệp cưới">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Trang chủ thiệp cưới
      </a>

      <div className={styles.card}>
        <div className={styles.header}>
          {/* <span className={styles.badge}>Quản lý khách mời</span> */}
          <h1 className={styles.title}>Thông Tin Khách Mời</h1>
          {/* <p className={styles.subtitle}>
            Điền thông tin khách mời và tạo link thiệp điện tử cá nhân hóa
          </p> */}
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Họ tên */}
          <div className={styles.group}>
            <label htmlFor="guest-fullname" className={styles.label}>
              Họ và tên *
            </label>
            <input
              id="guest-fullname"
              name="fullName"
              type="text"
              className={styles.input}
              placeholder="VD: Nguyễn Văn A"
              value={form.fullName}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Khách của cô dâu hay chú rể */}
          <div className={styles.group}>
            <label className={styles.label}>Khách của ai *</label>
            <div className={styles.radioGroup}>
              <label
                className={`${styles.radioCard} ${form.side === 'groom' ? styles.radioActive : ''
                  }`}
              >
                <input
                  type="radio"
                  name="side"
                  value="groom"
                  checked={form.side === 'groom'}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <span className={styles.radioText}>Nhà Trai (Chú rể)</span>
              </label>

              <label
                className={`${styles.radioCard} ${form.side === 'bride' ? styles.radioActive : ''
                  }`}
              >
                <input
                  type="radio"
                  name="side"
                  value="bride"
                  checked={form.side === 'bride'}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <span className={styles.radioText}>Nhà Gái (Cô dâu)</span>
              </label>
            </div>
          </div>

          {/* Nhân xưng (Text input) */}
          <div className={styles.group}>
            <label htmlFor="guest-honorific" className={styles.label}>
              Nhân xưng (Cách xưng hô với khách mời)
            </label>
            <input
              id="guest-honorific"
              name="honorific"
              type="text"
              className={styles.input}
              placeholder="VD: Bạn, Anh, Chị, Bác, Em, Chú, Gia đình..."
              value={form.honorific}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          {/* Cơm thân mật (Sáng hoặc Tối) */}
          <div className={styles.group}>
            <label className={styles.label}>Tổ chức tiệc cưới *</label>
            <div className={styles.radioGroup}>
              <label
                className={`${styles.radioCard} ${form.intimateDinner === 'evening' ? styles.radioActive : ''
                  }`}
              >
                <input
                  type="radio"
                  name="intimateDinner"
                  value="evening"
                  checked={form.intimateDinner === 'evening'}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <span className={styles.radioText}>Cơm tối (18:00 xx/xx)</span>
              </label>

              <label
                className={`${styles.radioCard} ${form.intimateDinner === 'morning' ? styles.radioActive : ''
                  }`}
              >
                <input
                  type="radio"
                  name="intimateDinner"
                  value="morning"
                  checked={form.intimateDinner === 'morning'}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <span className={styles.radioText}>Cơm trưa (10:00 xx/xx)</span>
              </label>
            </div>
          </div>

          {/* Nút lưu lên Google Sheet */}
          <div className={styles.submitBtn}>
            <Button
              variant="primary"
              type="submit"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className={styles.spinner} />
                  Đang lưu thông tin...
                </>
              ) : (
                'Lưu vào Google Sheet'
              )}
            </Button>
          </div>
        </form>

        {/* Section Link thiệp mời điện tử */}
        <div className={styles.linkSection}>
          <div className={styles.linkSectionHeader}>
            <span className={styles.linkSectionTitle}>Link thiệp mời điện tử</span>
          </div>
          <div className={styles.linkBox}>
            <input
              type="text"
              readOnly
              value={invitationLink}
              className={styles.linkInput}
              title="Link thiệp mời điện tử kèm thông tin cá nhân"
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className={`${styles.copyBtn} ${copied ? styles.copyBtnCopied : ''}`}
            >
              {copied ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Đã copy
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Sao chép link
                </>
              )}
            </button>
          </div>
          <p className={styles.linkHint}>
            💡 Link này tự động cập nhật theo thông tin bạn vừa nhập ở trên để bạn gửi thiệp mời riêng cho từng người.
          </p>
        </div>

        <ThankYouModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          type="rsvp-yes"
          title="Đã lưu thành công!"
          message="Thông tin khách mời đã được thêm vào Google Sheet (sheet guests)."
        />
      </div>
    </div>
  );
}
