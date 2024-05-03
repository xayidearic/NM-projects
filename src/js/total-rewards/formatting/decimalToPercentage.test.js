import { describe, expect, it } from 'vitest';

import decimalToPercentage from './decimalToPercentage.js';

describe('decimalToPercentage', () => {
  it('should convert a decimal to a percentage', () => {
    expect(decimalToPercentage(0.1234)).toBe('12.34%');
    expect(decimalToPercentage(0.275)).toBe('27.5%');
    expect(decimalToPercentage(0.075)).toBe('7.5%');
    expect(decimalToPercentage(0.15)).toBe('15%');
    expect(decimalToPercentage(2.47)).toBe('247%');
    expect(decimalToPercentage(1.15)).toBe('115%');
  });
});
