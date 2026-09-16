import { useState, useEffect } from 'react';
import { WeddingPage } from './pages/WeddingPage';
import { GuestsPage } from './pages/GuestsPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Check if pathname ends with /guests or hash is #guests / #/guests
  const isGuestsRoute =
    currentPath.endsWith('/guests') ||
    currentPath.endsWith('/guests/') ||
    currentHash === '#/guests' ||
    currentHash === '#guests';

  if (isGuestsRoute) {
    return <GuestsPage />;
  }

  return <WeddingPage />;
}
