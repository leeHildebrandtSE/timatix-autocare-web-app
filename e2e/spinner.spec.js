import { describe, it, expect } from 'vitest';

describe('e2e placeholder', () => {
  it('placeholder to avoid accidental Playwright import during unit test runs', () => {
    expect(true).toBe(true);
  });
});
