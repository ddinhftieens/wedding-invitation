/**
 * Helper to extract invitation URL parameters
 * Supports ?id=...&name=...&side=...&honorific=...&dinner=...
 */
export interface InvitationParams {
  id?: string;
  name?: string;
  side?: 'groom' | 'bride' | string;
  honorific?: string;
  dinner?: 'morning' | 'evening' | string;
}

export function getInvitationParams(): InvitationParams {
  if (typeof window === 'undefined') return {};
  
  const searchParams = new URLSearchParams(window.location.search);
  
  const id = searchParams.get('id') || undefined;
  const name = searchParams.get('name') || undefined;
  const side = searchParams.get('side') || undefined;
  const honorific = searchParams.get('honorific') || undefined;
  const dinner = searchParams.get('dinner') || undefined;

  return { id, name, side, honorific, dinner };
}
