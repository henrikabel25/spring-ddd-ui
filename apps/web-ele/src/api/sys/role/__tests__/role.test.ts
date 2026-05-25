import { describe, expect, it, vi } from 'vitest';
import { requestClient } from '#/api/request';
import { getRolePage, getRoleRecyclePage, getAllRole, createRole, updateRole, delRoleById, restoreRoleById, wipeRoleById, linkRoleAndMenus, queryMenusByRoleId } from '#/api/sys/role';

vi.mock('#/api/request', () => ({
  requestClient: {
    post: vi.fn().mockResolvedValue({}),
    put: vi.fn().mockResolvedValue({}),
    delete: vi.fn().mockResolvedValue({}),
  },
}));

describe('role', () => {
  const mockData = { id: '1' };
  const mockIds = ['1'];
  const mockCode = 'code';
  const mockValue = 1;
  it('getRolePage calls correct endpoint', async () => {
    await getRolePage(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('getRoleRecyclePage calls correct endpoint', async () => {
    await getRoleRecyclePage(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('getAllRole calls correct endpoint', async () => {
    await getAllRole(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('createRole calls correct endpoint', async () => {
    await createRole(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('updateRole calls correct endpoint with PUT', async () => {
    await updateRole(mockData);
    expect(requestClient.put).toHaveBeenCalled();
  });
  it('delRoleById calls correct endpoint', async () => {
    await delRoleById(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('restoreRoleById calls correct endpoint', async () => {
    await restoreRoleById(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('wipeRoleById calls correct endpoint with DELETE', async () => {
    await wipeRoleById(mockData);
    expect(requestClient.delete).toHaveBeenCalled();
  });
  it('linkRoleAndMenus calls correct endpoint', async () => {
    await linkRoleAndMenus(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('queryMenusByRoleId calls correct endpoint', async () => {
    await queryMenusByRoleId(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
});
