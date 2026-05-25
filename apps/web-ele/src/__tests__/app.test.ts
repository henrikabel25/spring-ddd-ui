import { describe, expect, it, vi } from 'vitest';

vi.mock('@vben/hooks', () => ({
  useElementPlusDesignTokens: vi.fn(),
  useWatermark: vi.fn().mockReturnValue({ updateWatermark: vi.fn(), clearWatermark: vi.fn() }),
}));

vi.mock('element-plus', () => ({
  ElConfigProvider: { name: 'ElConfigProvider', template: '<div><slot /></div>' },
}));

vi.mock('#/locales', () => ({
  $t: vi.fn((key: string) => key),
  loadLocalesMapFromDir: vi.fn().mockReturnValue({}),
  elementLocale: {},
}));

vi.mock('vue-router', () => ({
  RouterView: { name: 'RouterView', template: '<div>router-view</div>' },
}));

describe('App', () => {
  it('can be imported', async () => {
    const mod = await import('#/app.vue');
    expect(mod).toBeDefined();
  }, 30000);
});
