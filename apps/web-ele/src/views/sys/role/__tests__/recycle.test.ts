import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('@vben/access', () => ({
  useAccess: vi.fn().mockReturnValue({
    hasAccessByCodes: vi.fn().mockReturnValue(true),
  }),
}));

vi.mock('@vben/common-ui', () => ({
  confirm: vi.fn().mockResolvedValue(true),
  useVbenModal: vi.fn().mockReturnValue([{}, {}]),
}));

vi.mock('@vben/locales', () => ({
  $t: vi.fn((key: string) => key),
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
  getRoleRecyclePage: vi.fn().mockResolvedValue({ list: [], total: 0 }),
  restoreRoleById: vi.fn().mockResolvedValue({}),
  wipeRoleById: vi.fn().mockResolvedValue({}),
}));

describe('RoleRecycle', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('can be imported', async () => {
    const mod = await import('#/views/sys/role/recycle.vue');
    expect(mod).toBeDefined();
  }, 30000);
});
