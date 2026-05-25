import { describe, expect, it, vi } from 'vitest';
import { requestClient } from '#/api/request';
import { getInfoPage, createInfo, updateInfo, deleteInfo, wipeInfo } from '#/api/gen/info';

vi.mock('#/api/request', () => ({
  requestClient: {
    post: vi.fn().mockResolvedValue({}),
    put: vi.fn().mockResolvedValue({}),
    delete: vi.fn().mockResolvedValue({}),
  },
}));

describe('info', () => {
  const mockData = { id: '1' };
  const mockIds = ['1'];
  const mockCode = 'code';
  const mockValue = 1;
  it('getInfoPage calls correct endpoint', async () => {
    await getInfoPage(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('createInfo calls correct endpoint', async () => {
    await createInfo(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('updateInfo calls correct endpoint with PUT', async () => {
    await updateInfo(mockData);
    expect(requestClient.put).toHaveBeenCalled();
  });
  it('deleteInfo calls correct endpoint', async () => {
    await deleteInfo(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('wipeInfo calls correct endpoint with DELETE', async () => {
    await wipeInfo(mockData);
    expect(requestClient.delete).toHaveBeenCalled();
  });
});
