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

/** Format relative time label (handles ISO string, Date, Vietnamese formatted strings, or pre-formatted text) */
export function formatRelativeTime(dateInput: Date | string | number): string {
  if (!dateInput) return 'Vừa xong';
  
  let d: Date;
  if (dateInput instanceof Date) {
    d = dateInput;
  } else if (typeof dateInput === 'number') {
    d = new Date(dateInput);
  } else {
    const str = String(dateInput).trim();
    // If it's already a relative label (e.g. "Vừa xong", "2 phút trước")
    if (str.includes('trước') || str === 'Vừa xong') {
      return str;
    }

    // Handle "14:39:11 24/8/2026" or "14:39:11 24/08/2026"
    const vnPattern1 = /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?\s+(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    const match1 = str.match(vnPattern1);
    if (match1) {
      const [, hour, min, sec, day, month, year] = match1;
      d = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(min), Number(sec || 0));
    } else {
      // Handle "24/8/2026 14:39:11" or "24/08/2026"
      const vnPattern2 = /^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?$/;
      const match2 = str.match(vnPattern2);
      if (match2) {
        const [, day, month, year, hour, min, sec] = match2;
        d = new Date(Number(year), Number(month) - 1, Number(day), Number(hour || 0), Number(min || 0), Number(sec || 0));
      } else {
        d = new Date(str);
      }
    }
  }

  const timestamp = d.getTime();
  if (isNaN(timestamp)) {
    return 'Vừa xong'; // fallback to clean label instead of "Invalid Date"
  }

  const diff = Date.now() - timestamp;
  if (diff < 0) return 'Vừa xong';

  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Vừa xong';
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} ngày trước`;
  
  return d.toLocaleDateString('vi-VN');
}

import { WEDDING_PHOTOS } from '../constants/wedding';

/** Generate unique ID */
export function generateId(): string {
  return `w_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

/** Get a deterministic random photo background based on a seed key */
export function getCardBgImage(seed: string | number): string {
  if (!WEDDING_PHOTOS || WEDDING_PHOTOS.length === 0) {
    return `${import.meta.env.BASE_URL}image/bg.webp`;
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
