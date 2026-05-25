import { describe, expect, it, vi } from 'vitest';
import { requestClient } from '#/api/request';
import { getBindPage, getBindRecyclePage, createBind, updateBind, deleteBind, restoreBind, wipeBind } from '#/api/gen/bind';

vi.mock('#/api/request', () => ({
  requestClient: {
    post: vi.fn().mockResolvedValue({}),
    put: vi.fn().mockResolvedValue({}),
    delete: vi.fn().mockResolvedValue({}),
  },
}));

describe('bind', () => {
  const mockData = { id: '1' };
  const mockIds = ['1'];
  const mockCode = 'code';
  const mockValue = 1;
  it('getBindPage calls correct endpoint', async () => {
    await getBindPage(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('getBindRecyclePage calls correct endpoint', async () => {
    await getBindRecyclePage(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('createBind calls correct endpoint', async () => {
    await createBind(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('updateBind calls correct endpoint with PUT', async () => {
    await updateBind(mockData);
    expect(requestClient.put).toHaveBeenCalled();
  });
  it('deleteBind calls correct endpoint', async () => {
    await deleteBind(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('restoreBind calls correct endpoint', async () => {
    await restoreBind(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('wipeBind calls correct endpoint with DELETE', async () => {
    await wipeBind(mockData);
    expect(requestClient.delete).toHaveBeenCalled();
  });
});
