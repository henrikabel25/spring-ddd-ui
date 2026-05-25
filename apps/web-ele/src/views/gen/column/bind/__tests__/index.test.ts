import { describe, expect, it, vi } from 'vitest';

vi.mock('@vben/access', () => ({
  useAccess: vi.fn().mockReturnValue({
    hasAccessByCodes: vi.fn().mockReturnValue(true),
  }),
}));

vi.mock('@vben/common-ui', () => ({
  Page: { name: 'Page', template: '<div><slot /></div>' },
  confirm: vi.fn().mockResolvedValue(true),
  useVbenForm: vi.fn().mockReturnValue([{}, {}]),
  useVbenModal: vi.fn().mockReturnValue([{}, {}]),
  useVbenDrawer: vi.fn().mockReturnValue([{}, {}]),
}));

vi.mock('@vben/locales', () => ({
  $t: vi.fn((key: string) => key),
  loadLocalesMapFromDir: vi.fn().mockReturnValue({}),
}));

vi.mock('element-plus', () => ({
  ElButton: { name: 'ElButton', template: '<button><slot /></button>' },
  ElMessage: { success: vi.fn(), error: vi.fn() },
  ElTag: { name: 'ElTag', template: '<span><slot /></span>' },
  ElSwitch: { name: 'ElSwitch', template: '<input type="checkbox" />' },
}));

vi.mock('#/adapter/component/Dict.vue', () => ({
  default: { name: 'Dict', template: '<span>{ value }</span>', props: ['value'] },
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

vi.mock('#/api/gen/bind', () => ({
  getBindPage: vi.fn().mockResolvedValue({ list: [], total: 0 }),
  getBindRecyclePage: vi.fn().mockResolvedValue({ list: [], total: 0 }),
  createBind: vi.fn().mockResolvedValue({}),
  updateBind: vi.fn().mockResolvedValue({}),
  deleteBind: vi.fn().mockResolvedValue({}),
  restoreBind: vi.fn().mockResolvedValue({}),
  wipeBind: vi.fn().mockResolvedValue({}),
}));


describe('GenBindIndex', () => {
  it('can be imported', async () => {
    const mod = await import('#/views/gen/column/bind/index.vue');
    expect(mod).toBeDefined();
  }, 20000);
});
