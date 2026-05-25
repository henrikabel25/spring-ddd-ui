import { describe, expect, it, vi } from 'vitest';
import { requestClient } from '#/api/request';
import { getDeptPage, getDeptRecyclePage, getTree, createDept, updateDept, delDeptById, wipeDeptById, restoreDeptById } from '#/api/sys/dept';

vi.mock('#/api/request', () => ({
  requestClient: {
    post: vi.fn().mockResolvedValue({}),
    put: vi.fn().mockResolvedValue({}),
    delete: vi.fn().mockResolvedValue({}),
  },
}));

describe('dept', () => {
  const mockData = { id: '1' };
  const mockIds = ['1'];
  const mockCode = 'code';
  const mockValue = 1;
  it('getDeptPage calls correct endpoint', async () => {
    await getDeptPage(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('getDeptRecyclePage calls correct endpoint', async () => {
    await getDeptRecyclePage(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('getTree calls correct endpoint', async () => {
    await getTree(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('createDept calls correct endpoint', async () => {
    await createDept(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('updateDept calls correct endpoint with PUT', async () => {
    await updateDept(mockData);
    expect(requestClient.put).toHaveBeenCalled();
  });
  it('delDeptById calls correct endpoint', async () => {
    await delDeptById(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('wipeDeptById calls correct endpoint with DELETE', async () => {
    await wipeDeptById(mockData);
    expect(requestClient.delete).toHaveBeenCalled();
  });
  it('restoreDeptById calls correct endpoint', async () => {
    await restoreDeptById(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
});
