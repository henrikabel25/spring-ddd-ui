import { describe, expect, it, vi } from 'vitest';
import { requestClient } from '#/api/request';
import { getMenusPage, getMenusRecyclePage, create, update, getMenuTreeWithoutPermission, getMenuTreeWithPermission, delById, restoreById, wipeById } from '#/api/sys/menu';

vi.mock('#/api/request', () => ({
  requestClient: {
    post: vi.fn().mockResolvedValue({}),
    put: vi.fn().mockResolvedValue({}),
    delete: vi.fn().mockResolvedValue({}),
  },
}));

describe('menu', () => {
  const mockData = { id: '1' };
  const mockIds = ['1'];
  const mockCode = 'code';
  const mockValue = 1;
  it('getMenusPage calls correct endpoint', async () => {
    await getMenusPage(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('getMenusRecyclePage calls correct endpoint', async () => {
    await getMenusRecyclePage(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('create calls correct endpoint', async () => {
    await create(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('update calls correct endpoint with PUT', async () => {
    await update(mockData);
    expect(requestClient.put).toHaveBeenCalled();
  });
  it('getMenuTreeWithoutPermission calls correct endpoint', async () => {
    await getMenuTreeWithoutPermission();
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('getMenuTreeWithPermission calls correct endpoint', async () => {
    await getMenuTreeWithPermission();
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('delById calls correct endpoint', async () => {
    await delById(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('restoreById calls correct endpoint', async () => {
    await restoreById(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('wipeById calls correct endpoint with DELETE', async () => {
    await wipeById(mockData);
    expect(requestClient.delete).toHaveBeenCalled();
  });
});
