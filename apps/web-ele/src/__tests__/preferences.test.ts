import { describe, expect, it, vi } from 'vitest';

vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal<typeof import('vue')>();
  return {
    ...actual,
    createApp: vi.fn().mockReturnValue({
      use: vi.fn().mockReturnThis(),
      mount: vi.fn(),
    }),
  };
});

vi.mock('vue-router', () => ({
  createRouter: vi.fn().mockReturnValue({}),
  createWebHashHistory: vi.fn().mockReturnValue({}),
}));

vi.mock('pinia', () => ({
  createPinia: vi.fn().mockReturnValue({}),
}));

vi.mock('@vben/locales', () => ({
  $t: vi.fn((key: string) => key),
  loadLocalesMapFromDir: vi.fn().mockReturnValue({}),
}));



vi.mock('@vben/stores', () => ({
  resetAllStores: vi.fn(),
}));

vi.mock('element-plus', () => ({
  default: {},
}));

vi.mock('@vben/hooks', () => ({
  useElementPlusDesignTokens: vi.fn(),
}));

describe('Preferences', () => {
  it('can be imported', async () => {
    const mod = await import('#/preferences.ts');
    expect(mod).toBeDefined();
  }, 30000);
});
