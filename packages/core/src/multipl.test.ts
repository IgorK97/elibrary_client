import { test, expect } from 'vitest';
import { multiply } from './multipl';

test('multiply(10, 20, 3) should return 600', () => {
  expect(multiply(10, 20, 3)).toBe(600);
});
