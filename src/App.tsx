import { useState, useEffect } from 'react';
import { WeddingPage } from './pages/WeddingPage';
import { GuestsPage } from './pages/GuestsPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Check if pathname ends with /guests or contains guests
  const isGuestsRoute =
    currentPath.endsWith('/guests') ||
    currentPath.endsWith('/guests/') ||
    window.location.hash === '#/guests';

  if (isGuestsRoute) {
    return <GuestsPage />;
  }

  return <WeddingPage />;
}
