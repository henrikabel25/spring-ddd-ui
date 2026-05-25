import { describe, expect, it, vi } from 'vitest';

vi.mock('#/api/sys/column-permission', () => ({
  getColumnPermissionMetadataApi: vi.fn().mockResolvedValue({
    sys_user: ['id', 'username'],
  }),
}));

describe('useColumnPermission', () => {
  it('can be imported', async () => {
    const { useColumnPermission } = await import('#/composables/useColumnPermission');
    expect(useColumnPermission).toBeDefined();
  });
});
