import { describe, expect, it, vi } from 'vitest';

import { requestClient } from '#/api/request';

import { getUserInfoApi } from '#/api/core/user';

vi.mock('#/api/request', () => ({
  requestClient: {
    post: vi.fn().mockResolvedValue({}),
  },
}));

describe('user api', () => {
  it('getUserInfoApi calls correct endpoint', async () => {
    await getUserInfoApi();
    expect(requestClient.post).toHaveBeenCalledWith('/auth/user/info');
  });
});
