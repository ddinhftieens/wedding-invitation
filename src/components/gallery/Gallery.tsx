import { useState, useEffect, useCallback, useRef } from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { CAROUSEL_PHOTO_ITEMS, WEDDING_PHOTO_ITEMS } from '../../constants/wedding';
import styles from './Gallery.module.css';
import gridStyles from './GalleryGrid.module.css';

const VISIBLE_SIDE = 3; // 3 cards visible on each side (total 7 visible across full width)

export function Gallery() {
  // ── Carousel state ──
  const [activeIndex, setActiveIndex] = useState(0);
  const total = CAROUSEL_PHOTO_ITEMS.length;
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Grid / Lightbox state ──
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const gridTouchStartXRef = useRef<number | null>(null);
  const gridTouchStartYRef = useRef<number | null>(null);

  // ── Carousel navigation ──
  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % total);
  }, [total]);

  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(goNext, 3800);
  }, [goNext]);

  useEffect(() => {
    resetAutoPlay();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [resetAutoPlay]);

  const handleNav = useCallback(
    (dir: 'prev' | 'next') => {
      if (dir === 'prev') goPrev();
      else goNext();
      resetAutoPlay();
    },
    [goPrev, goNext, resetAutoPlay]
  );

  // Touch swipe for carousel
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartXRef.current;
    const dy = e.changedTouches[0].clientY - touchStartYRef.current;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) handleNav('next');
      else handleNav('prev');
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Keyboard navigation for carousel when lightbox is closed
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selectedIndex !== null) return; // Lightbox handles keyboard when open
      if (e.key === 'ArrowLeft') handleNav('prev');
      if (e.key === 'ArrowRight') handleNav('next');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleNav, selectedIndex]);

  // Preload neighbours for carousel
  useEffect(() => {
    [-3, -2, -1, 1, 2, 3].forEach((off) => {
      const idx = (activeIndex + off + total) % total;
      const img = new Image();
      img.decoding = 'async';
      img.src = CAROUSEL_PHOTO_ITEMS[idx]?.full;
    });
  }, [activeIndex, total]);

  const getOffset = (index: number) => {
    let o = index - activeIndex;
    if (o > total / 2) o -= total;
    if (o < -total / 2) o += total;
    return o;
  };

  const getCardStyle = (index: number): React.CSSProperties => {
    const offset = getOffset(index);
    const abs = Math.abs(offset);
    if (abs > VISIBLE_SIDE) return { display: 'none' };

    const sign = offset < 0 ? -1 : offset > 0 ? 1 : 0;
    const pct = abs === 0 ? 0 : abs === 1 ? 54 : abs === 2 ? 102 : 146;
    const vw = abs === 0 ? 0 : abs === 1 ? 2.5 : abs === 2 ? 5.5 : 9;
    const scale = abs === 0 ? 1 : abs === 1 ? 0.88 : abs === 2 ? 0.75 : 0.63;
    const rotateY = sign * (abs === 1 ? 22 : abs === 2 ? 34 : 44);
    const opacity = abs === 0 ? 1 : abs === 1 ? 0.95 : abs === 2 ? 0.80 : 0.55;
    const filter = abs === 0 ? 'none' : `brightness(${abs === 1 ? 0.95 : abs === 2 ? 0.88 : 0.80})`;
    const zIndex = abs === 0 ? 10 : 8 - abs * 2;

    const transform =
      abs === 0
        ? 'perspective(1200px) scale(1)'
        : `perspective(1200px) translateX(${sign * pct}%) translateX(${sign * vw}vw) scale(${scale}) rotateY(${rotateY}deg)`;

    return {
      transform,
      opacity,
      filter,
      zIndex,
      pointerEvents: abs === 0 ? 'auto' : 'none',
    };
  };

  // ── Lightbox actions ──
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

  // Touch swipe handling for lightbox
  const handleGridTouchStart = (e: React.TouchEvent) => {
    gridTouchStartXRef.current = e.touches[0].clientX;
    gridTouchStartYRef.current = e.touches[0].clientY;
  };

  const handleGridTouchEnd = (e: React.TouchEvent) => {
    if (gridTouchStartXRef.current === null || gridTouchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - gridTouchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - gridTouchStartYRef.current;
    const minSwipeDistance = 45;

    if (Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        showNext();
      } else {
        showPrev();
      }
    }

    gridTouchStartXRef.current = null;
    gridTouchStartYRef.current = null;
  };

  // Preload adjacent photos when lightbox is open
  useEffect(() => {
    if (selectedIndex === null) return;
    const nextIdx = (selectedIndex + 1) % WEDDING_PHOTO_ITEMS.length;
    const nextNextIdx = (selectedIndex + 2) % WEDDING_PHOTO_ITEMS.length;
    const prevIdx = (selectedIndex - 1 + WEDDING_PHOTO_ITEMS.length) % WEDDING_PHOTO_ITEMS.length;

    [nextIdx, nextNextIdx, prevIdx].forEach((idx) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = WEDDING_PHOTO_ITEMS[idx].full;
    });
  }, [selectedIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, showNext, showPrev]);

  const preloadGridImage = (index: number) => {
    const photo = WEDDING_PHOTO_ITEMS[index];
    if (photo) {
      const img = new Image();
      img.decoding = 'async';
      img.src = photo.full;
    }
  };

  return (
    <section id="gallery" className={styles.carouselSection}>
      <div className="section-wrapper section-wrapper--wide">
        <SectionTitle>Ảnh cưới</SectionTitle>

        {/* ── 3D Carousel Stage ── */}
        <div
          className={styles.carouselStage}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className={styles.carouselTrack}>
            {CAROUSEL_PHOTO_ITEMS.map((photo, i) => {
              const cardStyle = getCardStyle(i);
              if (cardStyle.display === 'none') return null;
              const offset = getOffset(i);
              const isActive = offset === 0;

              return (
                <div
                  key={photo.id}
                  className={`${styles.card} ${isActive ? styles.cardActive : styles.cardSide}`}
                  style={cardStyle}
                  onClick={() => {
                    if (!isActive) {
                      setActiveIndex(i);
                      resetAutoPlay();
                    }
                  }}
                  role={isActive ? undefined : 'button'}
                  aria-label={isActive ? undefined : `Xem ảnh ${i + 1}`}
                >
                  <div className={styles.cardInner}>
                    <picture>
                      <source
                        srcSet={isActive ? photo.full : photo.thumb}
                        type="image/webp"
                      />
                      <img
                        src={isActive ? photo.fullFallback : photo.thumbFallback}
                        alt={`Ảnh cưới Đình Tiến & Thu Hằng ${i + 1}`}
                        className={styles.cardImg}
                        loading={Math.abs(offset) <= 1 ? 'eager' : 'lazy'}
                        decoding="async"
                        draggable={false}
                      />
                    </picture>
                    {isActive && <div className={styles.cardShine} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Dot indicators ── */}
        <div className={styles.dots} role="tablist" aria-label="Chọn ảnh">
          {CAROUSEL_PHOTO_ITEMS.map((photo, i) => (
            <button
              key={photo.id}
              className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
              onClick={() => {
                setActiveIndex(i);
                resetAutoPlay();
              }}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Ảnh ${i + 1}`}
            />
          ))}
        </div>

        {/* ── Subtitle for grid gallery ── */}
        <p className={gridStyles.subtext} style={{ marginTop: 'var(--space-8)' }}>
          Nhấn vào ảnh để xem chi tiết phóng to
        </p>

        {/* ── Photo Grid ── */}
        <div className={gridStyles.grid}>
          {WEDDING_PHOTO_ITEMS.map((photo, i) => (
            <div
              key={photo.id}
              className={`${gridStyles.item} reveal`}
              onClick={() => openLightbox(i)}
              onMouseEnter={() => preloadGridImage(i)}
              role="button"
              tabIndex={0}
              aria-label={`Xem ảnh cưới ${i + 1}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') openLightbox(i);
              }}
            >
              <div className={gridStyles.imageWrapper}>
                <picture>
                  <source srcSet={photo.thumb} type="image/webp" />
                  <img
                    src={photo.thumbFallback}
                    alt={`Ảnh cưới Đình Tiến & Thu Hằng ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="600"
                    className={gridStyles.img}
                  />
                </picture>
                <div className={gridStyles.overlay}>
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

        {/* ── Lightbox Modal ── */}
        {selectedIndex !== null && (
          <div
            className={gridStyles.lightbox}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            onTouchStart={handleGridTouchStart}
            onTouchEnd={handleGridTouchEnd}
          >
            <div className={gridStyles.lightboxOverlay} />

            <button
              className={gridStyles.closeBtn}
              onClick={closeLightbox}
              aria-label="Đóng xem ảnh"
              title="Đóng (ESC)"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className={gridStyles.lightboxContent} onClick={(e) => e.stopPropagation()}>
              <button
                className={`${gridStyles.navBtn} ${gridStyles.prevBtn}`}
                onClick={showPrev}
                aria-label="Ảnh trước"
                title="Ảnh trước (←)"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <button
                className={`${gridStyles.navBtn} ${gridStyles.nextBtn}`}
                onClick={showNext}
                aria-label="Ảnh tiếp theo"
                title="Ảnh tiếp theo (→)"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              <div
                key={selectedIndex}
                className={`${gridStyles.lightboxImgContainer} ${
                  direction === 'next'
                    ? gridStyles.slideNext
                    : direction === 'prev'
                      ? gridStyles.slidePrev
                      : gridStyles.zoomIn
                }`}
              >
                <picture>
                  <source srcSet={WEDDING_PHOTO_ITEMS[selectedIndex].full} type="image/webp" />
                  <img
                    src={WEDDING_PHOTO_ITEMS[selectedIndex].fullFallback}
                    alt={`Ảnh cưới phóng to ${selectedIndex + 1}`}
                    className={gridStyles.lightboxImg}
                    decoding="async"
                  />
                </picture>
              </div>

              <div className={gridStyles.counter}>
                {selectedIndex + 1} / {WEDDING_PHOTO_ITEMS.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}