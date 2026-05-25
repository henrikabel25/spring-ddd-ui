import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('@vben/access', () => ({
  useAccess: vi.fn().mockReturnValue({
    hasAccessByCodes: vi.fn().mockReturnValue(true),
  }),
}));

vi.mock('@vben/common-ui', () => ({
  useVbenForm: vi.fn().mockReturnValue([{}, {}]),
  Page: { name: 'Page', template: '<div><slot /></div>' },
  confirm: vi.fn().mockResolvedValue(true),
}));

vi.mock('@vben/locales', () => ({
  loadLocalesMapFromDir: vi.fn().mockReturnValue({}),
  $t: vi.fn((key: string) => key),
}));

vi.mock('element-plus', () => ({
  ElButton: { name: 'ElButton', template: '<button><slot /></button>' },
  ElMessage: { success: vi.fn(), error: vi.fn() },
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

vi.mock('#/composables/useColumnPermission', () => ({
  useColumnPermission: vi.fn().mockReturnValue({
    applyColumnPermission: vi.fn().mockImplementation((cols: any[]) => cols),
    loadMetadata: vi.fn(),
    visibleColumns: new Set(),
  }),
}));

vi.mock('#/api/sys/role', () => ({
  getRolePage: vi.fn().mockResolvedValue({ list: [], total: 0 }),
  getRoleRecyclePage: vi.fn().mockResolvedValue({ list: [], total: 0 }),
  getAllRole: vi.fn().mockResolvedValue([]),
  createRole: vi.fn().mockResolvedValue({}),
  updateRole: vi.fn().mockResolvedValue({}),
  delRoleById: vi.fn().mockResolvedValue({}),
  restoreRoleById: vi.fn().mockResolvedValue({}),
  wipeRoleById: vi.fn().mockResolvedValue({}),
  linkRoleAndMenu: vi.fn().mockResolvedValue({}),
  queryMenusByRoleId: vi.fn().mockResolvedValue([]),
  queryDataPermissionRules: vi.fn().mockResolvedValue([]),
  saveDataPermissionRules: vi.fn().mockResolvedValue({}),
}));


describe('RoleDataPermissionRuleForm', () => {{
  beforeEach(() => {{
    setActivePinia(createPinia());
  }});

  it('can be imported', async () => {
    const mod = await import('#/views/sys/role/data-permission-rule-form.vue');
    expect(mod).toBeDefined();
  }, 20000);
}});
