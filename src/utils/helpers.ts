// src/utils/helpers.ts

/** Pad number with leading zero */
export function fmt(n: number): string {
  return String(n).padStart(2, '0');
}

/** Escape HTML to prevent XSS */
export function escapeHTML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Get first character (uppercase) for avatar */
export function getInitial(name: string): string {
  return name.trim().charAt(0).toUpperCase();
}

/** Copy text to clipboard, returns promise */
export async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers / iOS WebView
    const el = document.createElement('textarea');
    el.value = text;
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.focus();
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
}

/** Format relative time label */
export function formatRelativeTime(date: Date): string {
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Vừa xong';
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  return `${days} ngày trước`;
}

import { WEDDING_PHOTOS } from '../constants/wedding';

/** Generate unique ID */
export function generateId(): string {
  return `w_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

/** Get a deterministic random photo background based on a seed key */
export function getCardBgImage(seed: string | number): string {
  if (!WEDDING_PHOTOS || WEDDING_PHOTOS.length === 0) {
    return `${import.meta.env.BASE_URL}image/bg.jpg`;
  }
  const str = String(seed);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % WEDDING_PHOTOS.length;
  return WEDDING_PHOTOS[index];
}
