export const SITE = {
  name: 'KVS Global Exim',
  shortName: 'KVS',
  tagline: 'Connecting worlds, delivering trust',
  proprietor: 'Kalle Vijaya Kumar',
  location: 'Anantapur, Andhra Pradesh',
  email: 'kvsglobalexim@gmail.com',
  phoneDisplay: '+91 99668 58723',
  phoneTel: '+919966858723',
  phoneDisplayAlt: '+91 99009 71274',
  phoneTelAlt: '+919900971274',
  whatsappE164: '919966858723',
  whatsappMessage: 'Hello KVS Global Exim — I would like to enquire about Indian agricultural products.',
  hours: 'Mon–Fri 09:00–18:00 · Sat 09:00–14:00 IST',
  office: 'Anantapur, Andhra Pradesh (full address on request)',
  markets: 'Serving buyers across EU, GCC & USA',
  origin: 'https://kvsglobalexim.com',
  /** Inbox that receives website enquiries (same as kvs.enquiry.notify-to). */
  enquiryNotifyEmail: 'kallesivaiah@gmail.com',
  /** Google Apps Script web-app /exec URL. Reads the product sheet and can send enquiries. Empty = FormSubmit for mail; built-in product list until the script URL is set. */
  appsScriptUrl: 'https://script.google.com/macros/s/AKfycbxtcoIHHV72Es20ncf3O_B3HjZUbq55cQsJMEQ7KsAMAU2hPzOY6gtEyoJ3xOY7VTLwOA/exec',
} as const;

export function whatsappUrl(): string {
  const text = encodeURIComponent(SITE.whatsappMessage);
  return `https://wa.me/${SITE.whatsappE164}?text=${text}`;
}
