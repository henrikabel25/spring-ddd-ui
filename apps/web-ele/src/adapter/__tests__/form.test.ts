import { describe, expect, it, vi } from 'vitest';

vi.mock('@vben/common-ui', () => ({
  useVbenForm: vi.fn().mockReturnValue([{}, {}]),
}));

vi.mock('vxe-pc-ui', () => ({
  VxeUI: { setup: vi.fn() },
}));

vi.mock('vxe-table', () => ({
  VXETable: { setup: vi.fn() },
}));

describe('AdapterForm', () => {
  it('can be imported', async () => {
    const mod = await import('#/adapter/form.ts');
    expect(mod).toBeDefined();
  }, 20000);
});
