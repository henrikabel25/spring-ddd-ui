import { describe, expect, it, vi } from 'vitest';

import { requestClient } from '#/api/request';

import { getColumnPermissionMetadataApi, getVisibleColumnsApi } from '#/api/sys/column-permission';

vi.mock('#/api/request', () => ({
  requestClient: {
    post: vi.fn().mockResolvedValue({}),
  },
}));

describe('column-permission api', () => {
  it('getColumnPermissionMetadataApi calls correct endpoint', async () => {
    await getColumnPermissionMetadataApi();
    expect(requestClient.post).toHaveBeenCalledWith('/sys/column-permission/metadata');
  });

  it('getVisibleColumnsApi calls correct endpoint with params', async () => {
    const entityCode = 'sys_user';
    await getVisibleColumnsApi(entityCode);
    expect(requestClient.post).toHaveBeenCalled();
  });
});
