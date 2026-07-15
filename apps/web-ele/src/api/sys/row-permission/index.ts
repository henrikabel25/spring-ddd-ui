import { requestClient } from '#/api/request';

export interface RowPermissionRule {
  id?: number | string;
  roleId?: number | string;
  menuId?: number | string;
  scopeType: number;
  targetId?: number | string;
}

export interface RowPermissionSaveRequest {
  roleId: number | string;
  menuId: number | string;
  rules: RowPermissionRule[];
}

export async function getRowPermissionList(
  roleId: number | string,
  menuId: number | string,
) {
  return requestClient.get('/sys/row-permission/list', {
    params: {
      roleId,
      menuId,
    },
  });
}

export async function saveRowPermissions(data: RowPermissionSaveRequest) {
  return requestClient.post('/sys/row-permission/save', data);
}

export async function deleteRowPermission(id: number | string) {
  return requestClient.post('/sys/row-permission/delete', null, {
    params: { id },
  });
}
