import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('@vben/common-ui', () => ({
  useVbenDrawer: vi.fn().mockReturnValue([{}, {}]),
  useVbenForm: vi.fn().mockReturnValue([{}, {}]),
  VbenTree: { name: 'VbenTree', template: '<div><slot /></div>' },
}));

vi.mock('@vben/icons', () => ({
  IconifyIcon: { name: 'IconifyIcon', template: '<span />' },
}));

vi.mock('@vben/locales', () => ({
  $t: vi.fn((key: string) => key),
}));

vi.mock('element-plus', () => ({
  ElMessage: { success: vi.fn(), error: vi.fn() },
}));

vi.mock('#/api/sys/menu', () => ({
  getMenuTreeWithPermission: vi.fn().mockResolvedValue([]),
}));

vi.mock('#/api/sys/role', () => ({
  linkRoleAndMenus: vi.fn().mockResolvedValue({}),
  queryMenusByRoleId: vi.fn().mockResolvedValue([]),
}));

describe('RoleLink', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('can be imported', async () => {
    const mod = await import('#/views/sys/role/link.vue');
    expect(mod).toBeDefined();
  }, 30000);
});
