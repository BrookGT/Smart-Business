import { dateAndTimeConverter } from '../../src/utils/DateAndTimeConverter';

describe('dateAndTimeConverter', () => {
  it('formats 24h input to 12h display', () => {
    expect(dateAndTimeConverter.dateWithTime('14:30', '12')).toBe('02:30 pm');
  });

  it('formats 12h input to 24h display', () => {
    expect(dateAndTimeConverter.dateWithTime('02:30 PM', '24')).toBe('14:30');
  });
});
