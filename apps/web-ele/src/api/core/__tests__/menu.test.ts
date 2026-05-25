import { describe, expect, it, vi } from 'vitest';

import { requestClient } from '#/api/request';

import { getAllMenusApi } from '#/api/core/menu';

vi.mock('#/api/request', () => ({
  requestClient: {
    post: vi.fn().mockResolvedValue([]),
  },
}));

describe('menu api', () => {
  it('getAllMenusApi calls correct endpoint', async () => {
    await getAllMenusApi();
    expect(requestClient.post).toHaveBeenCalledWith('/sys/menu/all');
  });
});
