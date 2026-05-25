import { describe, expect, it, vi } from 'vitest';

vi.mock('vue-router', () => ({
  createRouter: vi.fn().mockReturnValue({ beforeEach: vi.fn(), afterEach: vi.fn(), onError: vi.fn() }),
  createWebHashHistory: vi.fn().mockReturnValue({}),
  createWebHistory: vi.fn().mockReturnValue({}),
}));

vi.mock('@vben/access', () => ({
  generateAccessible: vi.fn().mockReturnValue({ accessibleRoutes: [], menus: [] }),
}));

vi.mock('@vben/utils', () => ({
  resetStaticRoutes: vi.fn(),
  startProgress: vi.fn(),
  stopProgress: vi.fn(),
  openWindow: vi.fn(),
}));

vi.mock('@vben/stores', () => ({
  useAccessStore: vi.fn().mockReturnValue({
    setIsAccessChecked: vi.fn(),
    isAccessChecked: true,
    accessMenus: [],
    accessToken: null,
    setAccessToken: vi.fn(),
    setLoginExpired: vi.fn(),
    loginExpired: false,
    setAccessCodes: vi.fn(),
  }),
  useUserStore: vi.fn().mockReturnValue({
    setUserInfo: vi.fn(),
    userInfo: null,
  }),
}));

vi.mock('@vben/preferences', () => ({
  preferences: {
    app: { defaultHomePath: '/', loginExpiredMode: 'modal' },
    logo: { source: '' },
  },
}));

vi.mock('@vben/constants', () => ({
  LOGIN_PATH: '/login',
  VBEN_DOC_URL: '',
  VBEN_GITHUB_URL: '',
}));

vi.mock('@vben/locales', () => ({
  $t: vi.fn((key: string) => key),
  loadLocalesMapFromDir: vi.fn().mockReturnValue({}),
}));

vi.mock('#/api', () => ({
  getAllMenusApi: vi.fn().mockResolvedValue([]),
}));

vi.mock('#/layouts', () => ({
  BasicLayout: { name: 'BasicLayout', template: '<div><slot /></div>' },
  IFrameView: { name: 'IFrameView', template: '<div>iframe</div>' },
}));

vi.mock('#/store', () => ({
  useAuthStore: vi.fn().mockReturnValue({
    fetchUserInfo: vi.fn().mockResolvedValue({}),
    logout: vi.fn(),
  }),
}));

vi.mock('#/router/routes', () => ({
  routes: [],
  accessRoutes: [],
  coreRouteNames: [],
}));

describe('RouterAccess', () => {
  it('can be imported', async () => {
    const mod = await import('#/router/access.ts');
    expect(mod).toBeDefined();
  }, 60000);
});
