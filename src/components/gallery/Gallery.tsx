import { useState, useEffect, useCallback } from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { WEDDING_PHOTOS } from '../../constants/wedding';
import styles from './Gallery.module.css';

export function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const showNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % WEDDING_PHOTOS.length : 0));
  }, [selectedIndex]);

  const showPrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + WEDDING_PHOTOS.length) % WEDDING_PHOTOS.length : 0));
  }, [selectedIndex]);

  // Handle keyboard events (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, showNext, showPrev]);

  return (
    <section id="gallery">
      <div className="section-wrapper section-wrapper--wide">
        <SectionTitle>Album</SectionTitle>
        <p className={styles.subtext}>Nhấn vào ảnh để xem chi tiết phóng to</p>

        {/* Gallery Grid */}
        <div className={styles.grid}>
          {WEDDING_PHOTOS.map((src, i) => (
            <div
              key={src}
              className={`${styles.item} reveal`}
              onClick={() => openLightbox(i)}
              role="button"
              tabIndex={0}
              aria-label={`Xem ảnh cưới ${i + 1}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') openLightbox(i);
              }}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={src}
                  alt={`Ảnh cưới Đình Tiến & Thu Hằng ${i + 1}`}
                  loading="lazy"
                  className={styles.img}
                />
                <div className={styles.overlay}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedIndex !== null && (
          <div className={styles.lightbox} onClick={closeLightbox} role="dialog" aria-modal="true">
            <div className={styles.lightboxOverlay} />

            {/* Close Button */}
            <button
              className={styles.closeBtn}
              onClick={closeLightbox}
              aria-label="Đóng xem ảnh"
              title="Đóng (ESC)"
            >
              ✕
            </button>

            <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
              {/* Prev Button */}
              <button
                className={`${styles.navBtn} ${styles.prevBtn}`}
                onClick={showPrev}
                aria-label="Ảnh trước"
                title="Ảnh trước (←)"
              >
                ❮
              </button>

              {/* Next Button */}
              <button
                className={`${styles.navBtn} ${styles.nextBtn}`}
                onClick={showNext}
                aria-label="Ảnh tiếp theo"
                title="Ảnh tiếp theo (→)"
              >
                ❯
              </button>

              {/* Enlarged Image */}
              <img
                src={WEDDING_PHOTOS[selectedIndex]}
                alt={`Ảnh cưới phóng to ${selectedIndex + 1}`}
                className={styles.lightboxImg}
              />

              {/* Counter Indicator */}
              <div className={styles.counter}>
                {selectedIndex + 1} / {WEDDING_PHOTOS.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
