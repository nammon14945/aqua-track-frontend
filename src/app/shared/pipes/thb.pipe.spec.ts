import { ThbPipe } from './thb.pipe';

describe('ThbPipe', () => {
  const pipe = new ThbPipe();

  it('formats a number as THB with two decimals', () => {
    const result = pipe.transform(1250);
    expect(result).toContain('1,250.00');
    expect(result).toContain('฿');
  });

  it('supports zero decimals', () => {
    expect(pipe.transform(1250, 0)).toContain('1,250');
  });

  it('returns a dash for empty values', () => {
    expect(pipe.transform(null)).toBe('-');
    expect(pipe.transform(undefined)).toBe('-');
  });
});
