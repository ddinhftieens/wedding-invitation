// ─── Wedding Data Constants ──────────────────────────────────
// src/constants/wedding.ts

import type { FamilyInfo, StoryEvent, GiftInfo, WishItem } from '../types';

// ── Core Info ─────────────────────────────────────────────────
export const WEDDING = {
  groomName: 'Đình Tiến',
  brideName: 'Thu Hằng',
  groomFullName: 'Nguyễn Đình Tiến',
  brideFullName: 'Nguyễn Thị Thu Hằng',

  // Wedding ceremony
  ceremonyDate: new Date('2026-03-29T11:00:00'),
  ceremonyDateLabel: 'Chủ nhật xx/xx/2026',
  ceremonyTime: 'xx:xx Sáng',
  ceremonyLunar: 'Âm Lịch: xx Tháng xx năm Bính Ngọ',
  ceremonyAddress: 'Xóm xx, Thôn Vĩnh Thịnh, Xã Ngọc Hồi, Thành phố Hà Nội',

  // Intimate dinner
  dinnerDate: new Date('2026-03-28T16:00:00'),
  dinnerDateLabel: 'Thứ Bảy xx/xx/2026',
  dinnerTime: 'xx:00',
  dinnerAddress: 'Xóm xx, Thôn Vĩnh Thịnh, Xã Ngọc Hồi, Thành phố Hà Nội',

  // RSVP deadline
  rsvpDeadline: 'xx/xx/2026',

  // Map link
  mapsUrl: 'https://maps.google.com',
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

// ── Love Story ────────────────────────────────────────────────
export const STORY_EVENTS: StoryEvent[] = [
  {
    year: '2025',
    title: 'Lần đầu gặp gỡ',
    text: 'Một ánh nhìn, một nụ cười và từ đó mọi thứ bắt đầu...',
  },
  {
    year: '2025',
    title: 'Chính thức hẹn hò',
    text: 'Sau những tháng ngày bên nhau, anh đã dũng cảm nói lên cảm xúc của mình. Và em đã gật đầu với nụ cười rạng rỡ nhất...',
  },
  {
    year: '2026',
    title: 'Cầu hôn',
    text: 'Thời khắc quan trọng nhất cuộc đời...',
  },
  {
    year: '2026',
    title: 'Ngày trọng đại',
    text: 'Và bây giờ, chúng tôi hạnh phúc được chia sẻ với bạn bè và gia đình ngày quan trọng nhất của cuộc đời mình.',
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
export const WEDDING_PHOTOS: string[] = [
  '/image/1787373659540_2074575787760938811_4968601588389153029_a4d91b8bb6656fb4f9ff544aa25e0757.jpg',
  '/image/1787373660094_2074575787760938811_4968601588389153029_0fa6af972efbb6e6c206e73804770b09.jpg',
  '/image/1787373660609_2074575787760938811_4968601588389153029_e64ebfa0f8cd6c922e8b77e5a2c0acce.jpg',
  '/image/1787373661145_2074575787760938811_4968601588389153029_11ccc085e176bbdf4624f103fc8412f5.jpg',
  '/image/1787373661737_2074575787760938811_4968601588389153029_ec72e3781f6297f0e1850121db264f7e.jpg',
  '/image/1787373662241_2074575787760938811_4968601588389153029_ab02641819c9cbbb94a4d64c7ff324d7.jpg',
  '/image/1787373662777_2074575787760938811_4968601588389153029_1016750d81e09bf29c2f702312f42ea2.jpg',
  '/image/1787373663303_2074575787760938811_4968601588389153029_eca154f00673512bd3e4ba85c8d93edb.jpg',
  '/image/1787373663777_2074575787760938811_4968601588389153029_63f6ca3e863c10202227804efe16c339.jpg',
  '/image/1787373664309_2074575787760938811_4968601588389153029_dfd2fa699d32e95f62f243394a03fb1d.jpg',
  '/image/1787373664948_2074575787760938811_4968601588389153029_4eca37e04a7d83564a27e9d02134027a.jpg',
  '/image/1787373665520_2074575787760938811_4968601588389153029_8ba88bb757dbc056f2ee0b8669fdef44.jpg',
  '/image/1787373666115_2074575787760938811_4968601588389153029_3cbebbf36333a363fccd78d68902b5fa.jpg',
  '/image/1787373666694_2074575787760938811_4968601588389153029_02f4e4bf1bc728676b729fa81feecb96.jpg',
  '/image/1787373667534_2074575787760938811_4968601588389153029_a247faf14638fbf368f7b3f1e86984ed.jpg',
  '/image/1787373668373_2074575787760938811_4968601588389153029_6554207f420acb982f53b4e3cc3ef9ec.jpg',
  '/image/1787373668980_2074575787760938811_4968601588389153029_0a92fed3b4b7d6f351ad68c12926483c.jpg',
  '/image/1787373669512_2074575787760938811_4968601588389153029_cf19db2375d03a7025303ac25e10bd21.jpg',
  '/image/1787373670230_2074575787760938811_4968601588389153029_269bfd582b9636ccce8712d98791955d.jpg',
  '/image/1787373670910_2074575787760938811_4968601588389153029_a00726279ec476538ab42d583e3d7c4f.jpg',
  '/image/1787373671528_2074575787760938811_4968601588389153029_f9b970e287051f516e682918146b5721.jpg',
  '/image/1787373672186_2074575787760938811_4968601588389153029_e729ad9973ac8d38a7b27439de31edf6.jpg',
  '/image/1787373672734_2074575787760938811_4968601588389153029_4b3869b2fc522e77f015e74fe5bd68fa.jpg',
  '/image/1787373673326_2074575787760938811_4968601588389153029_2096ac4c8276d30a07e1faa58785cfcd.jpg',
  '/image/1787373673927_2074575787760938811_4968601588389153029_587a404953145dbc3bc6c5d0d2ebdc87.jpg',
  '/image/1787373674483_2074575787760938811_4968601588389153029_f2f6ff90657d735482c98d68403118d1.jpg',
  '/image/1787373675206_2074575787760938811_4968601588389153029_7f117822b775c133040105315e778fa7.jpg',
  '/image/1787373675806_2074575787760938811_4968601588389153029_92c9b2c600d956855c6d54addd30d0e6.jpg',
  '/image/1787373676685_2074575787760938811_4968601588389153029_be236e640ef36ccb13955cf099b859d3.jpg',
  '/image/1787373677281_2074575787760938811_4968601588389153029_b3248148ec210eea459d75dc67784acf.jpg',
  '/image/1787373677806_2074575787760938811_4968601588389153029_b0baff8f0c40c4e96779f4d136a10045.jpg',
  '/image/1787373678853_2074575787760938811_4968601588389153029_927556bb904378fe1e928b45097de840.jpg',
  '/image/1787373679431_2074575787760938811_4968601588389153029_0d17c0e52c2d2d81b6ad615ba7153a85.jpg',
  '/image/1787373680145_2074575787760938811_4968601588389153029_6cc781d7a3374ed012bad35b64d64a08.jpg',
  '/image/1787373680702_2074575787760938811_4968601588389153029_21bb195464c92a1046756755eabfc8f8.jpg',
];
