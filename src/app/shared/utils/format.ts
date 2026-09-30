export type ThaiDateInput = Date | string | number | null | undefined;

const THAI_LOCALE = 'th-TH-u-ca-buddhist';

const toDate = (value: ThaiDateInput): Date | null => {
  if (value === null || value === undefined || value === '') return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

/** 17 ก.ย. 2569 */
export const formatThaiDate = (value: ThaiDateInput): string => {
  const date = toDate(value);
  if (!date) return '-';
  return new Intl.DateTimeFormat(THAI_LOCALE, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

/** 17 กันยายน 2569 */
export const formatThaiDateLong = (value: ThaiDateInput): string => {
  const date = toDate(value);
  if (!date) return '-';
  return new Intl.DateTimeFormat(THAI_LOCALE, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

/** 17 ก.ย. 2569 14:30 */
export const formatThaiDateTime = (value: ThaiDateInput): string => {
  const date = toDate(value);
  if (!date) return '-';
  return new Intl.DateTimeFormat(THAI_LOCALE, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

/** 24 พ.ค. • 13:40 น. — รูปแบบกะทัดรัดสำหรับตารางที่ต้องประหยัดพื้นที่ */
export const formatThaiDateTimeShort = (value: ThaiDateInput): string => {
  const date = toDate(value);
  if (!date) return '-';
  const day = new Intl.DateTimeFormat(THAI_LOCALE, { day: 'numeric', month: 'short' }).format(date);
  const time = new Intl.DateTimeFormat(THAI_LOCALE, { hour: '2-digit', minute: '2-digit' }).format(
    date,
  );
  return `${day} • ${time} น.`;
};

/** จ. / อังคาร — short weekday label */
export const formatThaiWeekday = (
  value: ThaiDateInput,
  style: 'short' | 'long' = 'short',
): string => {
  const date = toDate(value);
  if (!date) return '-';
  return new Intl.DateTimeFormat(THAI_LOCALE, { weekday: style }).format(date);
};

/** ฿1,250.00 */
export const formatThb = (
  value: number | null | undefined,
  options?: { decimals?: number; compact?: boolean },
): string => {
  if (value === null || value === undefined || Number.isNaN(value)) return '-';
  const { decimals = 2, compact = false } = options ?? {};
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    notation: compact ? 'compact' : 'standard',
  }).format(value);
};

/** 1,250 (no currency symbol) */
export const formatNumber = (
  value: number | null | undefined,
  options?: Intl.NumberFormatOptions,
): string => {
  if (value === null || value === undefined || Number.isNaN(value)) return '-';
  return new Intl.NumberFormat('th-TH', options).format(value);
};

/** +12.5% / -3.1% */
export const formatDeltaPercent = (value: number | null | undefined): string => {
  if (value === null || value === undefined || Number.isNaN(value)) return '-';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
};
