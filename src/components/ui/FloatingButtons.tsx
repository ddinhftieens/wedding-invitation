import { useState, useEffect, useRef, type MouseEvent } from 'react';
import styles from './FloatingButtons.module.css';

interface Props {
  audioSrc?: string; // Optional audio file path, e.g. "/music/wedding.mp3"
}

export function FloatingButtons({ audioSrc }: Props) {
  const [showTop, setShowTop] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userManuallyPausedRef = useRef<boolean>(false);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  // Track scroll position for back to top button
  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Initialize and handle audio play/pause
  useEffect(() => {
    const defaultMp3 = `${import.meta.env.BASE_URL}mp3/a_thousand_years.mp3`.replace(/([^:]\/)\/+/g, "$1");
    const audio = new Audio(audioSrc || defaultMp3 || './mp3/a_thousand_years.mp3');
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    // Helper to start playback
    const startAudio = () => {
      if (!audioRef.current || userManuallyPausedRef.current) return;
      playPromiseRef.current = audioRef.current.play();
      playPromiseRef.current
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked by browser policy
          setIsPlaying(false);
        });
    };

    // User gesture handler to unlock autoplay if blocked
    const handleFirstUserGesture = (e: Event) => {
      // Don't auto-start if the user clicked directly on the music button to toggle
      const target = e.target as HTMLElement | null;
      if (target && target.closest('#music-toggle-btn')) {
        return;
      }

      if (!userManuallyPausedRef.current && audioRef.current && audioRef.current.paused) {
        startAudio();
      }

      // Cleanup gesture listeners after first interaction
      window.removeEventListener('click', handleFirstUserGesture);
      window.removeEventListener('touchstart', handleFirstUserGesture);
      window.removeEventListener('keydown', handleFirstUserGesture);
    };

    // Try starting immediately
    startAudio();

    // Listen for first interaction if initial play was blocked
    window.addEventListener('click', handleFirstUserGesture);
    window.addEventListener('touchstart', handleFirstUserGesture);
    window.addEventListener('keydown', handleFirstUserGesture);

    return () => {
      window.removeEventListener('click', handleFirstUserGesture);
      window.removeEventListener('touchstart', handleFirstUserGesture);
      window.removeEventListener('keydown', handleFirstUserGesture);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc]);

  function toggleMusic(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation(); // Stop event from bubbling to window gesture listener
    if (!audioRef.current) return;

    if (isPlaying) {
      // User wants to pause music
      userManuallyPausedRef.current = true;
      setIsPlaying(false);

      if (playPromiseRef.current) {
        playPromiseRef.current.then(() => {
          audioRef.current?.pause();
        }).catch(() => {
          audioRef.current?.pause();
        });
      } else {
        audioRef.current.pause();
      }
    } else {
      // User wants to play music
      userManuallyPausedRef.current = false;
      playPromiseRef.current = audioRef.current.play();
      playPromiseRef.current
        .then(() => {
          setIsPlaying(true);
        })
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
          className={isPlaying ? styles.spinIcon : ''}
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
