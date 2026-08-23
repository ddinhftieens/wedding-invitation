// ─── TypeScript Types & Interfaces ──────────────────────────
// src/types/index.ts

export interface WishItem {
  id: string;
  name: string;
  relation: 'friend' | 'colleague' | 'family' | 'other';
  text: string;
  time: string;
}

export interface RSVPData {
  name: string;
  phone: string;
  option: 'yes-both' | 'yes-dinner' | 'yes-wedding' | 'no' | 'yes';
  guestCount: number;
  message: string;
}

export interface FamilyMember {
  representative: string[];
  address: string;
}

export interface FamilyInfo {
  side: 'groom' | 'bride';
  label: string;
  personName: string;
  family: FamilyMember;
}

export interface StoryEvent {
  year: string;
  title: string;
  text: string;
}

export interface GiftInfo {
  role: 'groom' | 'bride';
  emoji: string;
  label: string;
  fullName: string;
  bank: string;
  accountNumber: string;
}

export interface ContactInfo {
  role: 'groom' | 'bride';
  label: string;
  phone: string;
  rawPhone: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export type AttendOption = RSVPData['option'];
export type RelationType = WishItem['relation'];

export const RELATION_LABELS: Record<RelationType, string> = {
  friend: 'Bạn bè',
  colleague: 'Đồng nghiệp',
  family: 'Họ hàng',
  other: 'Khác',
};
