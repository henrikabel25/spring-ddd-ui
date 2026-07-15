<script lang="ts" setup>
import type { Recordable } from '@vben/types';

import { ref } from 'vue';

import { useVbenDrawer, useVbenForm, VbenTree } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';
import { $t } from '@vben/locales';

import { ElMessage } from 'element-plus';

import { getMenuTreeWithPermission } from '#/api/sys/menu';
import { linkRoleAndMenus, queryMenusByRoleId } from '#/api/sys/role';

const writeForm = ref<Record<string, any>>({});
const treeData = ref<any>([]);
const selectedIds = ref<any>([]);

const [Form] = useVbenForm({
  showDefaultActions: false,
  schema: [
    {
      component: 'Input',
      fieldName: 'permissions',
      formItemClass: 'items-start',
      label: $t('system.role.permissions'),
      modelPropName: 'modelValue',
    },
  ],
});

const [Drawer, drawerApi] = useVbenDrawer({
  onOpenChange: async (open) => {
    if (open) {
      await getMenuTreeWithPermission().then((resp: any) => {
        treeData.value = resp;
      });
      await queryMenusByRoleId({
        roleId: writeForm.value?.id,
      }).then((resp: any) => {
        selectedIds.value = [
          ...new Set(resp.map((item: any) => String(item.menuId))),
        ];
      });
    } else {
      drawerApi.setState({ loading: false });
    }
  },
  onConfirm: async () => {
    drawerApi.setState({ loading: true });
    const menuIds: string[] = selectedIds.value || [];

    try {
      await linkRoleAndMenus({
        roleId: writeForm.value.id,
        menuIds,
      });
      ElMessage.success($t('system.common.save.success'));
    } catch (error: any) {
      ElMessage.error(`${$t('system.common.save.error')}: ${error}`);
    } finally {
      drawerApi.setState({ loading: false }).close();
    }
  },
  onCancel: () => {
    drawerApi.setState({ loading: false }).close();
  },
  confirmText: $t('system.common.button.confirm'),
  cancelText: $t('system.common.button.cancel'),
});

const open = (row: any) => {
  treeData.value = [];
  selectedIds.value = [];
  if (row?.id) {
    writeForm.value = row;
  }
  drawerApi.open();
};
const close = () => drawerApi.close();

defineExpose({ open, close });

function getNodeClass(node: Recordable<any>) {
  const classes: string[] = [];
  if (node.value?.menuType === 3) {
    node.value.children = null;
  }

  return classes.join(' ');
}
</script>

<template>
  <Drawer class="w-[45%]" :title="$t('system.common.alert.permissions')">
    <Form>
      <template #permissions>
        <VbenTree
          :tree-data="treeData"
          multiple
          bordered
          :default-expanded-level="2"
          :get-node-class="getNodeClass"
          v-model="selectedIds"
          value-field="id"
          label-field="name"
          icon-field="meta.icon"
        >
          <template #node="{ value }">
            <span class="flex items-center gap-2">
              <IconifyIcon v-if="value.meta.icon" :icon="value.meta.icon" />
              {{ value.name }}
            </span>
          </template>
        </VbenTree>
      </template>
    </Form>
  </Drawer>
</template>
