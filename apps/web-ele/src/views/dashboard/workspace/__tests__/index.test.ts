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

vi.mock('vue-router', () => ({
  useRouter: vi.fn().mockReturnValue({ push: vi.fn() }),
}));

vi.mock('@vben/preferences', () => ({
  preferences: { app: { defaultAvatar: '' } },
}));

vi.mock('@vben/stores', () => ({
  useUserStore: vi.fn().mockReturnValue({ userInfo: { avatar: '', realName: 'Test' } }),
}));

vi.mock('@vben/utils', () => ({
  openWindow: vi.fn(),
}));

vi.mock('../analytics/analytics-visits-source.vue', () => ({
  default: { name: 'AnalyticsVisitsSource', template: '<div>source</div>' },
}));

describe('DashboardWorkspace', () => {
  it('can be imported', async () => {
    const mod = await import('#/views/dashboard/workspace/index.vue');
    expect(mod).toBeDefined();
  }, 30000);
});
