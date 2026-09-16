// ─── Wedding Data Constants ──────────────────────────────────
// src/constants/wedding.ts

import type { FamilyInfo, StoryEvent, GiftInfo, WishItem } from '../types';

// ── Core Info ─────────────────────────────────────────────────
export const WEDDING = {
  groomName: 'ĐÌNH TIẾN',
  brideName: 'THU HẰNG',
  groomFullName: 'Nguyễn Đình Tiến',
  brideFullName: 'Nguyễn Thị Thu Hằng',

  // Wedding ceremony
  ceremonyDate: new Date('2026-12-09'),
  ceremonyDateLabel: 'Chủ nhật xx / xx / 20xx',
  ceremonyTime: 'xx:00',
  ceremonyLunar: 'Âm Lịch: xx tháng xx năm xxxx',
  ceremonyAddress: 'Xóm xx, Thôn Vĩnh Thịnh, Xã Ngọc Hồi, Thành phố Hà Nội',

  // Intimate dinner default / specific configurations
  dinnerDate: new Date('2026-09-14'),
  dinnerDateLabel: 'Thứ bảy xx / xx / 20xx',
  dinnerTime: 'xx:00',
  dinnerAddress: 'Xóm xx, Thôn Vĩnh Thịnh, Xã Ngọc Hồi, Thành phố Hà Nội',

  // Configs for specific guest sides and meal times
  groomDinnerEvening: {
    time: '18:30',
    dateLabel: 'Thứ bảy xx / xx / 20xx',
    lunar: 'Âm lịch: xx tháng xx năm xxxx',
    address: 'Tại Nhà Trai: Xóm xx, Thôn Vĩnh Thịnh, Xã Ngọc Hồi, Thành phố Hà Nội',
  },
  groomDinnerMorning: {
    time: '10:30',
    dateLabel: 'Chủ nhật xx / xx / 20xx',
    lunar: 'Âm lịch: xx tháng xx năm xxxx',
    address: 'Tại Nhà Trai: Xóm xx, Thôn Vĩnh Thịnh, Xã Ngọc Hồi, Thành phố Hà Nội',
  },
  brideDinnerEvening: {
    time: '18:00',
    dateLabel: 'Thứ bảy xx / xx / 20xx',
    lunar: 'Âm lịch: xx tháng xx năm xxxx',
    address: 'Tại Nhà Gái: Xóm xx, Thôn Vĩnh Thịnh, Xã Ngọc Hồi, Thành phố Hà Nội',
  },
  brideDinnerMorning: {
    time: '10:00',
    dateLabel: 'Chủ nhật xx / xx / 20xx',
    lunar: 'Âm lịch: xx tháng xx năm xxxx',
    address: 'Tại Nhà Gái: Xóm xx, Thôn Vĩnh Thịnh, Xã Ngọc Hồi, Thành phố Hà Nội',
  },

  // RSVP deadline
  rsvpDeadline: 'xx / xx / 20xx',

  // Map link
  mapsUrl: 'https://maps.google.com',

  // Google Apps Script Guestbook API
  guestbookScriptUrl: 'https://script.google.com/macros/s/AKfycby0Ki5AqI8HZAvjiDG590KD2D2ZzzT1OfrHBciJIRt_J9CBkrqqYGpVDVt4KGmIqgu9/exec',
} as const;

// ── Families ──────────────────────────────────────────────────
export const FAMILIES: FamilyInfo[] = [
  {
    side: 'groom',
    label: 'Nhà trai',
    personName: `Gia đình chú rể ${WEDDING.groomName}`,
    family: {
      representative: ['Ông AAAA', 'Bà BBBB'],
      address: 'Xóm xx, Thôn Vĩnh Thịnh, Xã Ngọc Hồi, Thành phố Hà Nội',
    },
  },
  {
    side: 'bride',
    label: 'Nhà gái',
    personName: `Gia đình cô dâu ${WEDDING.brideName}`,
    family: {
      representative: ['Ông CCCCC', 'Bà DDDDD'],
      address: 'Xóm xx, Thôn Vĩnh Thịnh, Xã Ngọc Hồi, Thành phố Hà Nội',
    },
  },
];

// ── Contact Hotline ───────────────────────────────────────────
export const HOTLINE_CONTACTS = [
  {
    role: 'groom',
    label: 'Chú Rể',
    phone: '0962 528 716',
    rawPhone: '0962528716',
  },
  {
    role: 'bride',
    label: 'Cô Dâu',
    phone: '039 662 4878',
    rawPhone: '0396624878',
  },
];

// ── Love Story ────────────────────────────────────────────────
export const STORY_EVENTS: StoryEvent[] = [
  {
    year: '2025',
    title: 'Ngày mình gặp nhau',
    text: 'Một ánh nhìn, một nụ cười và từ đó mọi thứ bắt đầu...',
  },
  {
    year: '2025-12',
    title: 'Lời yêu thương',
    text: 'Sau những ngày tháng cùng nhau trò chuyện, sẻ chia, anh đã dũng cảm nói lên cảm xúc của mình. Và em đã gật đầu với nụ cười rạng rỡ nhất...',
  },
  {
    year: '202x-xx',
    title: 'Lời cầu hôn',
    text: 'Một lời hỏi, một chiếc nhẫn và một cái gật đầu. Từ khoảnh khắc ấy, chúng mình quyết định cùng nhau viết tiếp câu chuyện của cả cuộc đời....',
  },
  {
    year: '202x-xx-xx',
    title: 'Ngày mình về chung một nhà',
    text: 'Hôm nay, tình yêu của chúng mình bước sang một chương mới. Cảm ơn gia đình và những người thân yêu đã cùng chứng kiến khoảnh khắc đặc biệt này....',
  },
];

// ── Gift / Bank Info ──────────────────────────────────────────
export const GIFT_INFO: GiftInfo[] = [
  {
    role: 'groom',
    emoji: '👨',
    label: 'Chú rể',
    fullName: WEDDING.groomFullName,
    bank: 'Vietcombank',
    accountNumber: '1234 5678 9012',
  },
  {
    role: 'bride',
    emoji: '👰',
    label: 'Cô dâu',
    fullName: WEDDING.brideFullName,
    bank: 'Techcombank',
    accountNumber: '9876 5432 1098',
  },
];

// ── Sample Wishes ─────────────────────────────────────────────
export const SAMPLE_WISHES: WishItem[] = [
  {
    id: 'w1',
    name: 'Anh Tuấn',
    relation: 'friend',
    text: 'Chúc hai bạn trăm năm hạnh phúc, mãi mãi yêu thương nhau! 🎉',
    time: '2 giờ trước',
  },
  {
    id: 'w2',
    name: 'Chị Linh',
    relation: 'colleague',
    text: 'Chúc mừng ngày trọng đại! Chúc cô dâu chú rể thật hạnh phúc, gặp nhiều may mắn trong cuộc sống mới.',
    time: '5 giờ trước',
  },
  {
    id: 'w3',
    name: 'Gia đình Hùng',
    relation: 'family',
    text: 'Kính chúc hai cháu trăm năm giai lão, sống bên nhau đến đầu bạc răng long. ❤️',
    time: '1 ngày trước',
  },
];

// ── Wedding Photos ─────────────────────────────────────────────
const baseUrl = import.meta.env.BASE_URL;

export interface WeddingPhotoItem {
  id: number;
  full: string;       // WebP
  fullFallback: string; // JPG fallback
  thumb: string;      // WebP thumbnail
  thumbFallback: string; // JPG thumbnail fallback
}

export const WEDDING_PHOTO_ITEMS: WeddingPhotoItem[] = Array.from({ length: 25 }, (_, i) => {
  const index = i + 1;
  return {
    id: index,
    // WebP (modern, ~30–40% lighter) — Gallery uses <picture> to fallback to .jpg
    full: `${baseUrl}image/${index}.webp`,
    fullFallback: `${baseUrl}image/${index}.jpg`,
    thumb: `${baseUrl}image/thumbnails/${index}.webp`,
    thumbFallback: `${baseUrl}image/thumbnails/${index}.jpg`,
  };
});

// Giữ lại mảng WEDDING_PHOTOS tương thích ngược với code cũ
export const WEDDING_PHOTOS: string[] = WEDDING_PHOTO_ITEMS.map((item) => item.full);

