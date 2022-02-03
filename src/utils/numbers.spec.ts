import { generateRandomDecimal } from './numbers';

describe('Number Utils', () => {
  describe('generateRandomDecimal', () => {
    it('should return random decimal number from 0 to 10', () => {
      const minValue = 0;
      const maxValue = 10;
      const precision = 2;

      expect(
        generateRandomDecimal(minValue, maxValue, precision),
      ).toBeLessThanOrEqual(10);
      expect(
        generateRandomDecimal(minValue, maxValue, precision),
      ).toBeGreaterThanOrEqual(0);
      expect(!isNaN(generateRandomDecimal(minValue, maxValue, precision))).toBe(
        true,
      );
    });
  });
});
