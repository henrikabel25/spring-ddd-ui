import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('@vben/common-ui', () => ({
  useVbenModal: vi.fn().mockReturnValue([{}, {}]),
}));

vi.mock('@vben/locales', () => ({
  $t: vi.fn((key: string) => key),
}));

vi.mock('element-plus', () => ({
  ElMessage: { success: vi.fn(), error: vi.fn() },
}));

vi.mock('#/adapter/form', () => ({
  useVbenForm: vi.fn().mockReturnValue([{}, {}]),
}));

vi.mock('#/api/sys/role', () => ({
  createRole: vi.fn().mockResolvedValue({}),
  updateRole: vi.fn().mockResolvedValue({}),
}));

describe('RoleForm', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('can be imported', async () => {
    const mod = await import('#/views/sys/role/form.vue');
    expect(mod).toBeDefined();
  }, 30000);
});
