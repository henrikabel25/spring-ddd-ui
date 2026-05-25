import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('@vben/access', () => ({
  useAccess: vi.fn().mockReturnValue({
    hasAccessByCodes: vi.fn().mockReturnValue(true),
  }),
}));

vi.mock('@vben/common-ui', () => ({
  Page: { name: 'Page', template: '<div><slot /></div>' },
  confirm: vi.fn().mockResolvedValue(true),
  useVbenForm: vi.fn().mockReturnValue([{}, {}]),
}));

vi.mock('@vben/locales', () => ({
  $t: vi.fn((key: string) => key),
  loadLocalesMapFromDir: vi.fn().mockReturnValue({}),
}));

vi.mock('element-plus', () => ({
  ElButton: { name: 'ElButton', template: '<button><slot /></button>' },
  ElMessage: { success: vi.fn(), error: vi.fn(), warning: vi.fn() },
}));

vi.mock('#/adapter/component/Dict.vue', () => ({
  default: { name: 'Dict', template: '<span>{{ value }}</span>', props: ['value'] },
}));

vi.mock('#/adapter/vxe-table', () => ({
  useVbenVxeGrid: vi.fn().mockReturnValue([
    vi.fn().mockReturnValue({}),
    { gridOptions: {} },
  ]),
}));

vi.mock('#/api/sys/role', () => ({
  getRolePage: vi.fn().mockResolvedValue({ list: [], total: 0 }),
  delRoleById: vi.fn().mockResolvedValue({}),
}));

vi.mock('#/composables/useColumnPermission', () => ({
  useColumnPermission: vi.fn().mockReturnValue({
    applyColumnPermission: vi.fn().mockImplementation((cols: any[]) => cols),
    loadMetadata: vi.fn(),
    visibleColumns: new Set(),
  }),
}));

vi.mock('./form.vue', () => ({
  default: { name: 'RoleForm', template: '<div>form</div>' },
}));

vi.mock('./data-permission.vue', () => ({
  default: { name: 'DataPermissionDrawer', template: '<div>data-permission</div>' },
}));

vi.mock('./link.vue', () => ({
  default: { name: 'GrantingPermissionsForm', template: '<div>link</div>' },
}));

vi.mock('./recycle.vue', () => ({
  default: { name: 'RoleRecycleForm', template: '<div>recycle</div>' },
}));

describe('RoleIndex', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('can be imported', async () => {
    const mod = await import('#/views/sys/role/index.vue');
    expect(mod).toBeDefined();
  }, 30000);
});
