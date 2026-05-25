import { describe, expect, it, vi } from 'vitest';

vi.mock('@vben/common-ui', () => ({
  Fallback: { name: 'Fallback', template: '<div><slot /></div>' },
}));

describe('FallbackOffline', () => {
  it('can be imported', async () => {
    const mod = await import('#/views/_core/fallback/offline.vue');
    expect(mod).toBeDefined();
  }, 30000);
});
