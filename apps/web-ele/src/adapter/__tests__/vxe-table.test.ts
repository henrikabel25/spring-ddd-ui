import { describe, expect, it, vi } from 'vitest';

vi.mock('@vben/plugins/vxe-table', () => ({
  setupVbenVxeTable: vi.fn(),
  useVbenVxeGrid: vi.fn().mockReturnValue([vi.fn(), { gridOptions: {} }]),
}));

vi.mock('element-plus', () => ({
  ElButton: { name: 'ElButton', template: '<button><slot /></button>' },
  ElImage: { name: 'ElImage', template: '<img />' },
}));

vi.mock('#/adapter/form', () => ({
  useVbenForm: vi.fn().mockReturnValue([{}, {}]),
}));

describe('AdapterVxeTable', () => {
  it('can be imported', async () => {
    const mod = await import('#/adapter/vxe-table.ts');
    expect(mod).toBeDefined();
  }, 30000);
});
