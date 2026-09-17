import { useState, useEffect, useRef, type MouseEvent } from 'react';
import styles from './FloatingButtons.module.css';

interface Props {
  audioSrc?: string; // Optional audio file path, e.g. "/music/wedding.mp3"
}

export function FloatingButtons({ audioSrc }: Props) {
  const [showTop, setShowTop] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // true = user explicitly paused; reset on every page load (we always want autoplay)
  const userPausedRef = useRef(false);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  // Track scroll position for back to top button
  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Audio engine
  useEffect(() => {
    const src = audioSrc
      || `${import.meta.env.BASE_URL}mp3/i_do.mp3`.replace(/([^:]\/)\/+/g, '$1');

    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.4;
    // iOS Safari: must call load() before play() works after a gesture
    audio.load();
    audioRef.current = audio;

    // Attempt playback; resolves instantly on desktop, rejects on iOS until gesture
    const tryPlay = () => {
      if (!audioRef.current || userPausedRef.current) return;
      playPromiseRef.current = audioRef.current.play();
      playPromiseRef.current
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false)); // blocked — gesture listener below will retry
    };

    // iOS/Safari require play() to be called synchronously inside a user gesture.
    // We attach ONE-TIME listeners on the first real interaction anywhere on the page.
    const onFirstGesture = (e: Event) => {
      // Ignore taps on the music button itself (handled by toggleMusic)
      if ((e.target as HTMLElement | null)?.closest('#music-toggle-btn')) return;

      if (!userPausedRef.current && audioRef.current?.paused) {
        tryPlay();
      }
      // Remove after first gesture — audio is now unlocked for this session
      window.removeEventListener('click', onFirstGesture);
      window.removeEventListener('touchstart', onFirstGesture);
      window.removeEventListener('keydown', onFirstGesture);
    };

    // iOS Safari kills audio when the app goes to background; resume on tab focus
    const onVisibility = () => {
      if (document.visibilityState === 'visible' && !userPausedRef.current && audioRef.current?.paused) {
        tryPlay();
      }
    };

    tryPlay();
    // passive:false needed so iOS doesn't cancel touchstart before play() runs
    window.addEventListener('click', onFirstGesture);
    window.addEventListener('touchstart', onFirstGesture, { passive: false });
    window.addEventListener('keydown', onFirstGesture);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.removeEventListener('click', onFirstGesture);
      window.removeEventListener('touchstart', onFirstGesture);
      window.removeEventListener('keydown', onFirstGesture);
      document.removeEventListener('visibilitychange', onVisibility);
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [audioSrc]);

  function toggleMusic(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation(); // prevent bubbling to onFirstGesture
    if (!audioRef.current) return;

    if (isPlaying) {
      userPausedRef.current = true;
      setIsPlaying(false);
      // Wait for any pending play() promise before pausing (required by browsers)
      playPromiseRef.current
        ?.then(() => audioRef.current?.pause())
        .catch(() => audioRef.current?.pause());
    } else {
      userPausedRef.current = false;
      playPromiseRef.current = audioRef.current.play();
      playPromiseRef.current
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Audio play error:', err);
          setIsPlaying(false);
        });
    }
  }


  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className={styles.floatingContainer}>
      {/* Nút bật/tắt nhạc */}
      <button
        className={`${styles.musicBtn} ${isPlaying ? styles.musicPlaying : ''}`}
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
        title={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
        id="music-toggle-btn"
      >
        <svg
          className={`${styles.musicIcon} ${isPlaying ? styles.spinIcon : ''}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
        <span className={styles.musicLabel}>
          {isPlaying ? 'Tắt nhạc' : 'Nhạc nền'}
        </span>
      </button>

      {/* Nút Lên đầu trang */}
      <button
        className={`${styles.backTop} ${showTop ? styles.visible : ''}`}
        onClick={scrollToTop}
        aria-label="Lên đầu trang"
        title="Lên đầu trang"
        id="back-top-btn"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </div>
  );
}
