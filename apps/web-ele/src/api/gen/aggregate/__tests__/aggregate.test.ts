import { describe, expect, it, vi } from 'vitest';
import { requestClient } from '#/api/request';
import { getAggregatePage, wipeAggregate, createAggregate, updateAggregate } from '#/api/gen/aggregate';

vi.mock('#/api/request', () => ({
  requestClient: {
    post: vi.fn().mockResolvedValue({}),
    put: vi.fn().mockResolvedValue({}),
    delete: vi.fn().mockResolvedValue({}),
  },
}));

describe('aggregate', () => {
  const mockData = { id: '1' };
  const mockIds = ['1'];
  const mockCode = 'code';
  const mockValue = 1;
  it('getAggregatePage calls correct endpoint', async () => {
    await getAggregatePage(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('wipeAggregate calls correct endpoint with DELETE', async () => {
    await wipeAggregate(mockData);
    expect(requestClient.delete).toHaveBeenCalled();
  });
  it('createAggregate calls correct endpoint', async () => {
    await createAggregate(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('updateAggregate calls correct endpoint with PUT', async () => {
    await updateAggregate(mockData);
    expect(requestClient.put).toHaveBeenCalled();
  });
});
