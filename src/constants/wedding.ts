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
  ceremonyDate: new Date('2026-09-14'),
  ceremonyDateLabel: 'Chủ nhật xx / xx / 20xx',
  ceremonyTime: 'xx:00',
  ceremonyLunar: 'Âm Lịch: xx tháng xx năm xxxx',
  ceremonyAddress: 'Xóm xx, Thôn Vĩnh Thịnh, Xã Ngọc Hồi, Thành phố Hà Nội',

  // Intimate dinner
  dinnerDate: new Date('2026-09-14'),
  dinnerDateLabel: 'Thứ bảy xx / xx / 20xx',
  dinnerTime: 'xx:00',
  dinnerAddress: 'Xóm xx, Thôn Vĩnh Thịnh, Xã Ngọc Hồi, Thành phố Hà Nội',

  // RSVP deadline
  rsvpDeadline: 'xx/xx/20xx',

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

export const WEDDING_PHOTOS: string[] = [
  `${baseUrl}image/1.jpg`,
  `${baseUrl}image/2.jpg`,
  `${baseUrl}image/3.jpg`,
  `${baseUrl}image/4.jpg`,
  `${baseUrl}image/5.jpg`,
  `${baseUrl}image/6.jpg`,
  `${baseUrl}image/7.jpg`,
  `${baseUrl}image/8.jpg`,
  `${baseUrl}image/9.jpg`,
  `${baseUrl}image/10.jpg`,
  `${baseUrl}image/11.jpg`,
  `${baseUrl}image/12.jpg`,
  `${baseUrl}image/13.jpg`,
  `${baseUrl}image/14.jpg`,
  `${baseUrl}image/15.jpg`,
  `${baseUrl}image/16.jpg`,
  `${baseUrl}image/17.jpg`,
  `${baseUrl}image/18.jpg`,
  `${baseUrl}image/19.jpg`,
  `${baseUrl}image/20.jpg`,
  `${baseUrl}image/21.jpg`,
  `${baseUrl}image/22.jpg`,
  `${baseUrl}image/23.jpg`,
  `${baseUrl}image/24.jpg`,
  `${baseUrl}image/25.jpg`
];
