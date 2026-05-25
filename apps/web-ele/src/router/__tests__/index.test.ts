import { describe, expect, it, vi } from 'vitest';

vi.mock('vue-router', () => ({
  createRouter: vi.fn().mockReturnValue({ beforeEach: vi.fn(), afterEach: vi.fn(), onError: vi.fn() }),
  createWebHashHistory: vi.fn().mockReturnValue({}),
  createWebHistory: vi.fn().mockReturnValue({}),
}));

vi.mock('@vben/utils', () => ({
  resetStaticRoutes: vi.fn(),
}));

vi.mock('#/router/guard', () => ({
  createRouterGuard: vi.fn(),
}));

vi.mock('#/router/routes', () => ({
  routes: [],
}));

describe('Router', () => {
  it('can be imported', async () => {
    const mod = await import('#/router/index.ts');
    expect(mod).toBeDefined();
  }, 30000);
});
