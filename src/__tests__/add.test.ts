import { sum } from '@src/math';

describe('Test sum functioin', () => {
  test('Should return 9 for (5 + 4)', done => {
    expect(sum(5, 4)).toBe(9);
  });
});
