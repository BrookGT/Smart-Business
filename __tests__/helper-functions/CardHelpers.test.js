const mockGetState = jest.fn(() => ({
  configData: {
    configData: {
      digit_after_decimal_point: 2,
      currency_symbol: '$',
      currency_symbol_direction: 'left',
    },
  },
}));

jest.mock('redux/store', () => ({
  store: {
    getState: (...args) => mockGetState(...args),
  },
}));

import {
  getAmountWithSign,
  getDiscountedAmount,
  getReferDiscount,
  getSelectedAddOn,
} from '../../src/helper-functions/CardHelpers';

describe('CardHelpers', () => {
  beforeEach(() => {
    mockGetState.mockReturnValue({
      configData: {
        configData: {
          digit_after_decimal_point: 2,
          currency_symbol: '$',
          currency_symbol_direction: 'left',
        },
      },
    });
  });

  describe('getAmountWithSign', () => {
    it('returns empty string for invalid amounts', () => {
      expect(getAmountWithSign(null)).toBe('');
      expect(getAmountWithSign('abc')).toBe('');
    });

    it('prefixes currency symbol by default', () => {
      expect(getAmountWithSign(12.5)).toBe('$12.50');
    });

    it('suffixes currency symbol when configured', () => {
      mockGetState.mockReturnValue({
        configData: {
          configData: {
            digit_after_decimal_point: 0,
            currency_symbol: 'ETB',
            currency_symbol_direction: 'right',
          },
        },
      });

      expect(getAmountWithSign(150000, false)).toBe('150.0KETB');
    });

    it('formats large values with compact suffixes', () => {
      expect(getAmountWithSign(2500000)).toBe('$2.5M');
      expect(getAmountWithSign(150000)).toBe('$150.0K');
      expect(getAmountWithSign(2500000000)).toBe('$2.5B');
      expect(getAmountWithSign(50, false)).toBe('$50');
    });

    it('handles missing config with defaults', () => {
      mockGetState.mockReturnValue({});
      expect(getAmountWithSign(10)).toBe('10.00');
    });
  });

  describe('getDiscountedAmount', () => {
    it('applies fixed amount discount with quantity', () => {
      expect(getDiscountedAmount(100, 10, 'amount', 0, 2)).toBe(80);
      expect(getDiscountedAmount(100, 10, 'amount', 0)).toBe(90);
    });

    it('applies percent discount', () => {
      expect(getDiscountedAmount(200, 25, 'percent', 0, 1)).toBe(150);
    });

    it('applies fixed discount type', () => {
      expect(getDiscountedAmount(80, 50, 'fixed', 0, 1)).toBe(40);
    });

    it('returns original price when no discount', () => {
      expect(getDiscountedAmount(90, 0, 'percent', 0, 1)).toBe(90);
    });
  });

  describe('getSelectedAddOn', () => {
    it('joins checked addon names', () => {
      const addons = [
        { name: 'Cheese', isChecked: true },
        { name: 'Sauce', isChecked: false },
        { name: 'Olives', isChecked: true },
      ];

      expect(getSelectedAddOn(addons)).toBe('Cheese, Olives');
    });

    it('returns empty string when no addons selected', () => {
      expect(getSelectedAddOn([])).toBe('');
      expect(getSelectedAddOn(undefined)).toBe('');
    });
  });

  describe('getReferDiscount', () => {
    it('calculates percentage referral discount', () => {
      expect(getReferDiscount(200, 10, 'percentage')).toBe(20);
    });

    it('returns flat referral discount', () => {
      expect(getReferDiscount(200, 15, 'flat')).toBe(15);
    });
  });
});
