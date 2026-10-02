import { ThaiDateTimePipe } from './thai-date-time.pipe';

describe('ThaiDateTimePipe', () => {
  const pipe = new ThaiDateTimePipe();

  it('formats date and time in the Thai Buddhist calendar', () => {
    const result = pipe.transform(new Date(2026, 8, 17, 14, 30));
    expect(result).toContain('2569');
    expect(result).toContain('14:30');
  });

  it('returns a dash for empty values', () => {
    expect(pipe.transform(null)).toBe('-');
  });
});
