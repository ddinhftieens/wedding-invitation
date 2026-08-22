import { useEffect, useRef } from 'react';
import { FloatingButtons } from '../components/ui/FloatingButtons';
import { Hero } from '../components/hero/Hero';
import { Countdown } from '../components/countdown/Countdown';
import { Family } from '../components/family/Family';
import { Story } from '../components/story/Story';
import { Gallery } from '../components/gallery/Gallery';
import { RSVP } from '../components/RSVP/RSVP';
import { Wishes } from '../components/wishes/Wishes';
import { Footer } from '../components/footer/Footer';

/**
 * Initialise IntersectionObserver for .reveal elements.
 * Called once on mount; handles all sections globally.
 */
function useGlobalReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    // Observe all existing .reveal elements
    document.querySelectorAll('.reveal').forEach((el) => {
      observerRef.current?.observe(el);
    });

    // MutationObserver to catch dynamically added .reveal elements (e.g. new wishes)
    const mo = new MutationObserver(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
        observerRef.current?.observe(el);
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observerRef.current?.disconnect();
      mo.disconnect();
    };
  }, []);
}

export function WeddingPage() {
  useGlobalReveal();

  return (
    <main>
      <Hero />
      <Countdown />
      <Family />
      <Story />
      <Gallery />
      <RSVP />
      <Wishes />
      {/* <Gift /> - Đã ẩn phần mừng cưới */}
      <Footer />
      <FloatingButtons />
    </main>
  );
}
