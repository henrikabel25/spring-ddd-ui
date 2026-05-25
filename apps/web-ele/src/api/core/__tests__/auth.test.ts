import { describe, expect, it, vi } from 'vitest';

import { requestClient } from '#/api/request';

import { getAccessCodesApi, loginApi, logoutApi, refreshTokenApi } from '#/api/core/auth';

vi.mock('#/api/request', () => ({
  requestClient: {
    post: vi.fn().mockResolvedValue({}),
  },
  baseRequestClient: {
    post: vi.fn().mockResolvedValue({}),
  },
}));

describe('auth api', () => {
  it('loginApi calls correct endpoint', async () => {
    const params = { username: 'admin', password: 'admin' };
    await loginApi(params);
    expect(requestClient.post).toHaveBeenCalledWith('/auth/login', params);
  });

  it('refreshTokenApi calls correct endpoint', async () => {
    await refreshTokenApi();
  });

  it('logoutApi calls correct endpoint', async () => {
    await logoutApi();
  });

  it('getAccessCodesApi calls correct endpoint', async () => {
    await getAccessCodesApi();
    expect(requestClient.post).toHaveBeenCalledWith('/auth/codes');
  });
});
