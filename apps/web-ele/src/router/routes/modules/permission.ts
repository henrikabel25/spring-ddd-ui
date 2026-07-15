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
        component: () => import('#/views/sys/row-permission/index.vue'),
        meta: {
          icon: 'lucide:lock',
          title: $t('permission.rowPermission.title'),
        },
      },
    ],
  },
];

export default routes;
