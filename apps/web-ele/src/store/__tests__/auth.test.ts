import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('vue-router', () => ({
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
    replace: vi.fn(),
    currentRoute: { value: { fullPath: '/' } },
  }),
}));

vi.mock('@vben/stores', () => ({
  useAccessStore: vi.fn().mockReturnValue({
    setAccessToken: vi.fn(),
    setAccessCodes: vi.fn(),
    setLoginExpired: vi.fn(),
    isAccessChecked: true,
    loginExpired: false,
    accessToken: null,
  }),
  useUserStore: vi.fn().mockReturnValue({
    setUserInfo: vi.fn(),
  }),
  resetAllStores: vi.fn(),
}));

vi.mock('@vben/preferences', () => ({
  preferences: {
    app: {
      loginExpiredMode: 'modal',
      defaultHomePath: '/',
      enableRefreshToken: true,
    },
  },
}));

vi.mock('element-plus', () => ({
  ElNotification: vi.fn(),
}));

vi.mock('#/api', () => ({
  getAccessCodesApi: vi.fn().mockResolvedValue(['admin']),
  getUserInfoApi: vi.fn().mockResolvedValue({ realName: 'Admin', homePath: '/' }),
  loginApi: vi.fn().mockResolvedValue({ accessToken: 'token123' }),
  logoutApi: vi.fn().mockResolvedValue({}),
}));

vi.mock('#/locales', () => ({
  $t: vi.fn((key: string) => key),
}));

describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('can be imported', async () => {
    const { useAuthStore } = await import('#/store/auth');
    expect(useAuthStore).toBeDefined();
  });
});
