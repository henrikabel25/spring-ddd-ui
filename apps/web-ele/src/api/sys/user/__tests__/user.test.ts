import { describe, expect, it, vi } from 'vitest';
import { requestClient } from '#/api/request';
import { getUserPage, getRecyclePage, createUser, updateUser, delUserById, restoreUser, wipeUserById, linkUserAndRole, queryRolesByUserId } from '#/api/sys/user';

vi.mock('#/api/request', () => ({
  requestClient: {
    post: vi.fn().mockResolvedValue({}),
    put: vi.fn().mockResolvedValue({}),
    delete: vi.fn().mockResolvedValue({}),
  },
}));

describe('user', () => {
  const mockData = { id: '1' };
  const mockIds = ['1'];
  const mockCode = 'code';
  const mockValue = 1;
  it('getUserPage calls correct endpoint', async () => {
    await getUserPage(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('getRecyclePage calls correct endpoint', async () => {
    await getRecyclePage(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('createUser calls correct endpoint', async () => {
    await createUser(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('updateUser calls correct endpoint with PUT', async () => {
    await updateUser(mockData);
    expect(requestClient.put).toHaveBeenCalled();
  });
  it('delUserById calls correct endpoint', async () => {
    await delUserById(mockIds);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('restoreUser calls correct endpoint', async () => {
    await restoreUser(mockIds);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('wipeUserById calls correct endpoint with DELETE', async () => {
    await wipeUserById(mockData);
    expect(requestClient.delete).toHaveBeenCalled();
  });
  it('linkUserAndRole calls correct endpoint', async () => {
    await linkUserAndRole(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('queryRolesByUserId calls correct endpoint', async () => {
    await queryRolesByUserId(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
});
