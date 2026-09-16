import { useState, useEffect, useCallback, useRef } from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { WEDDING_PHOTO_ITEMS } from '../../constants/wedding';
import styles from './Gallery.module.css';

export function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const openLightbox = (index: number) => {
    setDirection(null);
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const showNext = useCallback(() => {
    if (selectedIndex === null) return;
    setDirection('next');
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % WEDDING_PHOTO_ITEMS.length : 0));
  }, [selectedIndex]);

  const showPrev = useCallback(() => {
    if (selectedIndex === null) return;
    setDirection('prev');
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + WEDDING_PHOTO_ITEMS.length) % WEDDING_PHOTO_ITEMS.length : 0));
  }, [selectedIndex]);

  // Touch swipe handling (swipe left for next, swipe right for prev)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartXRef.current;
    const deltaY = touchEndY - touchStartYRef.current;
    const minSwipeDistance = 45;

    if (Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        showNext();
      } else {
        showPrev();
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

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
        <SectionTitle>Ảnh cưới</SectionTitle>
        <p className={styles.subtext}>Nhấn vào ảnh để xem chi tiết phóng to</p>

        {/* Gallery Grid */}
        <div className={styles.grid}>
          {WEDDING_PHOTO_ITEMS.map((photo, i) => (
            <div
              key={photo.id}
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
                <picture>
                  <source srcSet={photo.thumb} type="image/webp" />
                  <img
                    src={photo.thumbFallback}
                    alt={`Ảnh cưới Đình Tiến & Thu Hằng ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="600"
                    className={styles.img}
                  />
                </picture>
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
          <div
            className={styles.lightbox}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className={styles.lightboxOverlay} />

            {/* Close Button */}
            <button
              className={styles.closeBtn}
              onClick={closeLightbox}
              aria-label="Đóng xem ảnh"
              title="Đóng (ESC)"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
              {/* Prev Button */}
              <button
                className={`${styles.navBtn} ${styles.prevBtn}`}
                onClick={showPrev}
                aria-label="Ảnh trước"
                title="Ảnh trước (←)"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Next Button */}
              <button
                className={`${styles.navBtn} ${styles.nextBtn}`}
                onClick={showNext}
                aria-label="Ảnh tiếp theo"
                title="Ảnh tiếp theo (→)"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              {/* Enlarged Image with dynamic transition */}
              <div
                key={selectedIndex}
                className={`${styles.lightboxImgContainer} ${
                  direction === 'next'
                    ? styles.slideNext
                    : direction === 'prev'
                    ? styles.slidePrev
                    : styles.zoomIn
                }`}
              >
                <picture>
                  <source srcSet={WEDDING_PHOTO_ITEMS[selectedIndex].full} type="image/webp" />
                  <img
                    src={WEDDING_PHOTO_ITEMS[selectedIndex].fullFallback}
                    alt={`Ảnh cưới phóng to ${selectedIndex + 1}`}
                    className={styles.lightboxImg}
                    decoding="async"
                  />
                </picture>
              </div>

              {/* Counter Indicator */}
              <div className={styles.counter}>
                {selectedIndex + 1} / {WEDDING_PHOTO_ITEMS.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
