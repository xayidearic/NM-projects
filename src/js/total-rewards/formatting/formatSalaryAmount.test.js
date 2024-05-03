import { describe, expect, it } from 'vitest';

import { formatSalaryAmounts } from './formatSalaryAmount.js';

describe('formatSalaryAmount', () => {
    it('should format a salary amount', () => {
        expect(formatSalaryAmounts(1234)).toBe('$1,234');
        expect(formatSalaryAmounts('275')).toBe('$275');
        expect(formatSalaryAmounts(275)).not.toEqual(275);
    });

    it('should only contain decimals at the end if not .00', () => {
        expect(formatSalaryAmounts(1234.00)).toBe('$1,234');
        expect(formatSalaryAmounts(250000.00)).toEqual('$250,000');
        expect(formatSalaryAmounts('275.15')).toBe('$275.15');
    });

    it('should retain original value if contains alphabeticaly string', () => {
        expect(formatSalaryAmounts('1 x Salary')).toBe('1 x Salary');
    });
});