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

vi.mock('#/api/sys/menu', () => ({
  getMenusPage: vi.fn().mockResolvedValue({ list: [], total: 0 }),
  getMenusRecyclePage: vi.fn().mockResolvedValue({ list: [], total: 0 }),
  create: vi.fn().mockResolvedValue({}),
  update: vi.fn().mockResolvedValue({}),
  delMenuById: vi.fn().mockResolvedValue({}),
  restoreMenuById: vi.fn().mockResolvedValue({}),
  wipeMenuById: vi.fn().mockResolvedValue({}),
  getMenuTreeWithoutPermission: vi.fn().mockResolvedValue([]),
}));


describe('MenuForm', () => {{
  beforeEach(() => {{
    setActivePinia(createPinia());
  }});

  it('can be imported', async () => {{
    const { default: Component } = await import('#/views/sys/menu/form.vue');
    expect(Component).toBeDefined();
  }});
}});
