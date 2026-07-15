import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:shield',
      order: 100,
      title: $t('permission.title'),
    },
    name: 'PermissionManagement',
    path: '/permission',
    children: [
      {
        name: 'RowPermission',
        path: '/permission/row-permission',
        component: () => import('#/views/sys/permission/row/index.vue'),
        meta: {
          icon: 'lucide:lock',
          title: $t('permission.rowPermission.title'),
        },
      },
      {
        name: 'ColumnPermission',
        path: '/permission/column-permission',
        component: () => import('#/views/sys/permission/column/index.vue'),
        meta: {
          icon: 'lucide:columns-3',
          title: $t('permission.columnPermission.title'),
        },
      },
    ],
  },
];

export default routes;
