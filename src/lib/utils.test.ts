
import { cn } from './utils';

describe('cn utility', () => {
  it('should merge classnames correctly', () => {
    expect(cn('base-class', 'additional-class')).toBe('base-class additional-class');
    expect(cn('base-class', undefined)).toBe('base-class');
    expect(cn('base-class', null)).toBe('base-class');
    expect(cn('base-class', { 'conditional-class': true })).toBe('base-class conditional-class');
  });
});
