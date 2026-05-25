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

vi.mock('#/api/sys/dept', () => ({
  getDeptPage: vi.fn().mockResolvedValue({ list: [], total: 0 }),
  getDeptRecyclePage: vi.fn().mockResolvedValue({ list: [], total: 0 }),
  getTree: vi.fn().mockResolvedValue([]),
  createDept: vi.fn().mockResolvedValue({}),
  updateDept: vi.fn().mockResolvedValue({}),
  delDeptById: vi.fn().mockResolvedValue({}),
  restoreDeptById: vi.fn().mockResolvedValue({}),
  wipeDeptById: vi.fn().mockResolvedValue({}),
}));


describe('DeptIndex', () => {{
  beforeEach(() => {{
    setActivePinia(createPinia());
  }});

  it('can be imported', async () => {{
    const { default: Component } = await import('#/views/sys/dept/index.vue');
    expect(Component).toBeDefined();
  }});
}});
