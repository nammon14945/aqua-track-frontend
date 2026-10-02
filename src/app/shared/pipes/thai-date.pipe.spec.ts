import { ThaiDatePipe } from './thai-date.pipe';

describe('ThaiDatePipe', () => {
  const pipe = new ThaiDatePipe();

  it('formats a date in the Thai Buddhist calendar', () => {
    const result = pipe.transform(new Date(2026, 8, 17));
    expect(result).toContain('2569');
    expect(result).toContain('ก.ย.');
  });

  it('returns a dash for empty values', () => {
    expect(pipe.transform(null)).toBe('-');
    expect(pipe.transform(undefined)).toBe('-');
    expect(pipe.transform('')).toBe('-');
  });
});
