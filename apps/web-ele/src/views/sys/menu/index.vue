<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { confirm, Page } from '@vben/common-ui';

import { ElButton, ElMessage } from 'element-plus';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { delById, getMenusPage } from '#/api/sys/menu/menu';

import MenuForm from './form.vue';

const menuFormRef = ref();

interface RowType {
  id: string;
  parentId: null | number;
  name: string;
  permission: string;
  path: string;
  menuType: number;
}

const gridOptions: VxeGridProps<RowType> = {
  columns: [
    { field: 'name', title: 'Menu Name', align: 'left', treeNode: true },
    { field: 'component', title: 'Component' },
    { field: 'permission', title: 'Permission' },
    { field: 'path', title: 'Path' },
    { field: 'menuType', title: 'Menu Type' },
    {
      field: 'action',
      fixed: 'right',
      slots: { default: 'action' },
      title: 'Operation',
      width: 120,
    },
  ],
  exportConfig: {},
  keepSource: true,
  proxyConfig: {
    ajax: {
      query: async ({ page }) => {
        return await getMenusPage({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
        });
      },
    },
  },
  editConfig: {
    mode: 'row',
    trigger: 'click',
  },
  treeConfig: {
    parentField: 'parentId',
    rowField: 'id',
    transform: true,
  },
  toolbarConfig: {
    custom: true,
    export: true,
    // import: true,
    refresh: true,
    zoom: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
});

const openForm = () => {
  menuFormRef.value?.open();
};

const editRow = (row: RowType) => {
  menuFormRef.value?.open(row);
};

const expandAll = () => {
  gridApi.grid?.setAllTreeExpand(true);
};

const collapseAll = () => {
  gridApi.grid?.setAllTreeExpand(false);
};

const deleteById = (row: RowType) => {
  confirm({
    content: 'Confirm deletion?',
    icon: 'error',
  }).then(async () => {
    await delById({
      id: row.id,
    })
      .then(async () => {
        await gridApi.reload();
        ElMessage.success('Deletion successful');
      })
      .catch(() => {
        ElMessage.error('Deletion failed');
      });
  });
};
</script>

<template>
  <Page>
    <div class="vp-raw h-[300px] w-full">
      <Grid>
        <template #toolbar-tools>
          <ElButton class="mr-2" type="primary" @click="expandAll">
            Expand All
          </ElButton>
          <ElButton type="primary" @click="collapseAll"> Collapse All</ElButton>
        </template>
        <template #toolbar-actions>
          <ElButton class="mr-2" type="primary" @click="openForm">
            Add
          </ElButton>
        </template>
        <template #action="{ row }">
          <ElButton type="primary" link @click="editRow(row)"> Edit </ElButton>
          <ElButton type="danger" link @click="deleteById(row)">
            Delete
          </ElButton>
        </template>
      </Grid>
    </div>
    <MenuForm ref="menuFormRef" :grid-api="gridApi" />
  </Page>
</template>
