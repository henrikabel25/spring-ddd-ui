import { describe, expect, it, vi } from 'vitest';

vi.mock('@vben/locales', () => ({
  $t: vi.fn((key: string) => key),
  loadLocalesMapFromDir: vi.fn().mockReturnValue({}),
}));

vi.mock('@vben/common-ui', () => ({
  Page: { name: 'Page', template: '<div><slot /></div>' },
  useVbenForm: vi.fn().mockReturnValue([{}, {}]),
  useVbenModal: vi.fn().mockReturnValue([{}, {}]),
  useVbenDrawer: vi.fn().mockReturnValue([{}, {}]),
}));

vi.mock('element-plus', () => ({
  ElButton: { name: 'ElButton', template: '<button><slot /></button>' },
  ElMessage: { success: vi.fn(), error: vi.fn() },
  ElCard: { name: 'ElCard', template: '<div><slot /></div>' },
  ElRow: { name: 'ElRow', template: '<div><slot /></div>' },
  ElCol: { name: 'ElCol', template: '<div><slot /></div>' },
}));

vi.mock('#/adapter/component/Dict.vue', () => ({
  default: { name: 'Dict', template: '<span>{ value }</span>', props: ['value'] },
}));

vi.mock('@vben/layouts', () => ({
  AuthPageLayout: { name: 'AuthPageLayout', template: '<div><slot /></div>' },
  BasicLayout: { name: 'BasicLayout', template: '<div><slot /></div>' },
}));

vi.mock('@vben/stores', () => ({
  useAccessStore: vi.fn().mockReturnValue({ accessMenus: [], isAccessChecked: true }),
  useUserStore: vi.fn().mockReturnValue({ userInfo: null }),
}));

vi.mock('@vben/hooks', () => ({
  useWatermark: vi.fn().mockReturnValue({ updateWatermark: vi.fn(), clearWatermark: vi.fn() }),
  useElementPlusDesignTokens: vi.fn(),
}));

vi.mock('@vben/icons', () => ({
  BookOpenText: { name: 'BookOpenText', template: '<span />' },
  CircleHelp: { name: 'CircleHelp', template: '<span />' },
  MdiGithub: { name: 'MdiGithub', template: '<span />' },
}));

vi.mock('@vben/utils', () => ({
  openWindow: vi.fn(),
}));

vi.mock('#/store', () => ({
  useAuthStore: vi.fn().mockReturnValue({ logout: vi.fn() }),
}));

vi.mock('#/views/_core/authentication/login.vue', () => ({
  default: { name: 'LoginForm', template: '<div>login</div>' },
}));

describe('LayoutAuth', () => {
  it('can be imported', async () => {
    const mod = await import('#/layouts/auth.vue');
    expect(mod).toBeDefined();
  }, 30000);
});
