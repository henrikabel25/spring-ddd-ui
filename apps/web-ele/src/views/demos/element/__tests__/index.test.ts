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

describe('DemosElement', () => {
  it('can be imported', async () => {
    const mod = await import('#/views/demos/element/index.vue');
    expect(mod).toBeDefined();
  }, 20000);
});
