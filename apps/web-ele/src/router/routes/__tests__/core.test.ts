import { describe, expect, it, vi } from 'vitest';

vi.mock('vue-router', () => ({
  createRouter: vi.fn().mockReturnValue({}),
  createWebHashHistory: vi.fn().mockReturnValue({}),
  createWebHistory: vi.fn().mockReturnValue({}),
}));

vi.mock('@vben/access', () => ({
  generateMenuByAccess: vi.fn().mockReturnValue([]),
  generateRoutesByAccess: vi.fn().mockReturnValue([]),
}));

vi.mock('@vben/stores', () => ({
  useAccessStore: vi.fn().mockReturnValue({
    setIsAccessChecked: vi.fn(),
    isAccessChecked: true,
    accessMenus: [],
  }),
}));

vi.mock('#/store', () => ({
  useAuthStore: vi.fn().mockReturnValue({
    fetchUserInfo: vi.fn().mockResolvedValue({}),
  }),
}));

vi.mock('@vben/locales', () => ({
  $t: vi.fn((key: string) => key),
  loadLocalesMapFromDir: vi.fn().mockReturnValue({}),
}));

describe('RouterCoreRoutes', () => {
  it('can be imported', async () => {
    const mod = await import('#/router/routes/core.ts');
    expect(mod).toBeDefined();
  }, 20000);
});
