<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';

import { useAccess } from '@vben/access';
import { confirm, Page, useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';

import {
  ElButton,
  ElMessage,
  ElOption,
  ElSelect,
  ElTable,
  ElTableColumn,
  ElTreeSelect,
} from 'element-plus';

import { getTree as getDeptTree } from '#/api/sys/dept';
import { getMenuTreeWithoutPermission } from '#/api/sys/menu';
import { getPostList } from '#/api/sys/post';
import { getAllRole } from '#/api/sys/role';
import {
  deleteRowPermission,
  getRowPermissionList,
  saveRowPermissions,
} from '#/api/sys/row-permission';
import { getUserList } from '#/api/sys/user';

type ScopeType = 0 | 1 | 2 | 3 | 4;

interface RuleItem {
  id?: number | string;
  scopeType: ScopeType;
  targetId?: number | string;
  targetName?: string;
}

interface TargetOption {
  label: string;
  value: number | string;
}

const { hasAccessByCodes } = useAccess();

const scopeTypeOptions: { label: string; value: ScopeType }[] = [
  { label: $t('permission.rowPermission.scope.all'), value: 0 },
  { label: $t('permission.rowPermission.scope.dept'), value: 1 },
  {
    label: $t('permission.rowPermission.scope.deptAndChild'),
    value: 2,
  },
  { label: $t('permission.rowPermission.scope.post'), value: 3 },
  { label: $t('permission.rowPermission.scope.user'), value: 4 },
];

const selectedRoleId = ref<number | string>('');
const selectedMenuId = ref<number | string>('');
const roleOptions = ref<{ id: number | string; roleName: string }[]>([]);
const menuTreeData = ref<any[]>([]);
const rules = ref<RuleItem[]>([]);
const addForm = reactive<{
  scopeType: ScopeType;
  targetId: number | string;
  targetIds: (number | string)[];
}>({
  scopeType: 0,
  targetIds: [],
  targetId: '',
});
const deptTreeData = ref<any[]>([]);
const postOptions = ref<TargetOption[]>([]);
const userOptions = ref<TargetOption[]>([]);

const saving = ref(false);
const adding = ref(false);

const canOperate = computed(
  () => Boolean(selectedRoleId.value) && Boolean(selectedMenuId.value),
);

function normalizeList(resp: any): any[] {
  return Array.isArray(resp) ? resp : (resp?.data ?? []);
}

async function loadRoles() {
  const resp = await getAllRole({});
  roleOptions.value = normalizeList(resp);
}

async function loadMenus() {
  async function buildTree(parentId?: null | number | string): Promise<any[]> {
    const resp = await getMenuTreeWithoutPermission(parentId as any);
    const nodes = normalizeList(resp);
    for (const node of nodes) {
      if (node.hasChildren) {
        node.children = await buildTree(node.id);
      }
    }
    return nodes;
  }
  menuTreeData.value = await buildTree();
}

async function loadDepts() {
  const resp = await getDeptTree({});
  deptTreeData.value = normalizeList(resp);
}

async function loadPosts() {
  const resp = await getPostList();
  const list = normalizeList(resp);
  postOptions.value = list.map((item: any) => ({
    label: item.postName ?? item.name ?? item.label ?? item.id,
    value: item.id,
  }));
}

async function loadUsers() {
  const resp = await getUserList();
  const list = normalizeList(resp);
  userOptions.value = list.map((item: any) => ({
    label: item.username ?? item.nickname ?? item.name ?? item.label ?? item.id,
    value: item.id,
  }));
}

async function loadRules() {
  if (!selectedRoleId.value || !selectedMenuId.value) {
    rules.value = [];
    return;
  }
  try {
    const resp = await getRowPermissionList(
      selectedRoleId.value,
      selectedMenuId.value,
    );
    const list = normalizeList(resp);
    rules.value = list.map((item: any) => ({
      id: item.id,
      scopeType: item.scopeType,
      targetId: item.targetId,
      targetName: item.targetName,
    }));
  } catch {
    rules.value = [];
  }
}

async function init() {
  await Promise.all([
    loadRoles(),
    loadMenus(),
    loadDepts(),
    loadPosts(),
    loadUsers(),
  ]);
  await loadRules();
}

onMounted(() => {
  init();
});

watch([selectedRoleId, selectedMenuId], () => {
  loadRules();
});

const [AddDrawer, drawerApi] = useVbenDrawer({
  onConfirm: () => {
    if (adding.value) {
      return;
    }
    adding.value = true;
    drawerApi.lock();
    try {
      if (addForm.scopeType === 0) {
        const hasAll = rules.value.some((rule) => rule.scopeType === 0);
        if (!hasAll) {
          rules.value.push({ scopeType: 0 });
        }
      } else if (addForm.scopeType === 2) {
        if (!addForm.targetId) {
          ElMessage.warning(
            $t('permission.rowPermission.validation.targetRequired'),
          );
          return;
        }
        rules.value.push({
          scopeType: 2,
          targetId: addForm.targetId,
          targetName: getTargetLabel(2, addForm.targetId),
        });
      } else {
        if (addForm.targetIds.length === 0) {
          ElMessage.warning(
            $t('permission.rowPermission.validation.targetRequired'),
          );
          return;
        }
        addForm.targetIds.forEach((targetId) => {
          rules.value.push({
            scopeType: addForm.scopeType,
            targetId,
            targetName: getTargetLabel(addForm.scopeType, targetId),
          });
        });
      }
      resetAddForm();
      drawerApi.close();
    } finally {
      adding.value = false;
      drawerApi.unlock();
    }
  },
  confirmText: $t('system.common.button.confirm'),
  cancelText: $t('system.common.button.cancel'),
});

function resetAddForm() {
  addForm.scopeType = 0;
  addForm.targetIds = [];
  addForm.targetId = '';
}

function openAddDrawer() {
  resetAddForm();
  drawerApi.open();
}

function findDeptName(
  nodes: any[],
  targetId: number | string,
): string | undefined {
  for (const node of nodes) {
    if (String(node.id) === String(targetId)) {
      return node.deptName ?? node.name ?? node.label;
    }
    if (node.children?.length) {
      const found = findDeptName(node.children, targetId);
      if (found) {
        return found;
      }
    }
  }
  return undefined;
}

function getTargetLabel(
  scopeType: ScopeType,
  targetId?: number | string,
): string {
  if (scopeType === 0 || !targetId) {
    return '-';
  }
  if (scopeType === 1 || scopeType === 2) {
    return findDeptName(deptTreeData.value, targetId) ?? '-';
  }
  if (scopeType === 3) {
    return (
      postOptions.value.find((item) => String(item.value) === String(targetId))
        ?.label ?? '-'
    );
  }
  if (scopeType === 4) {
    return (
      userOptions.value.find((item) => String(item.value) === String(targetId))
        ?.label ?? '-'
    );
  }
  return '-';
}

async function removeRule(index: number) {
  const rule = rules.value[index];
  if (!rule) {
    return;
  }
  confirm({
    content: $t('system.common.delete.confirm'),
    icon: 'error',
  }).then(async () => {
    try {
      if (rule.id) {
        await deleteRowPermission(rule.id);
      }
      rules.value.splice(index, 1);
      ElMessage.success($t('system.common.delete.success'));
    } catch {
      ElMessage.error($t('system.common.delete.error'));
    }
  });
}

async function handleSave() {
  if (!selectedRoleId.value || !selectedMenuId.value) {
    ElMessage.warning($t('system.common.validation.error'));
    return;
  }
  if (saving.value) {
    return;
  }
  saving.value = true;
  try {
    const payloadRules = rules.value.map((rule) => ({
      id: rule.id,
      scopeType: rule.scopeType,
      targetId: rule.targetId,
    }));
    await saveRowPermissions({
      roleId: selectedRoleId.value,
      menuId: selectedMenuId.value,
      rules: payloadRules,
    });
    ElMessage.success($t('system.common.save.success'));
    await loadRules();
  } catch {
    ElMessage.error($t('system.common.save.error'));
  } finally {
    saving.value = false;
  }
}

watch(
  () => addForm.scopeType,
  () => {
    addForm.targetIds = [];
    addForm.targetId = '';
  },
);
</script>

<template>
  <Page>
    <div class="card-box mb-3 p-4">
      <div class="mb-4 text-base font-medium">
        {{ $t('permission.rowPermission.filterConditions') }}
      </div>
      <div class="flex flex-wrap items-end gap-4">
        <div class="w-[300px]">
          <label class="mb-1 block text-sm font-medium">
            {{ $t('permission.rowPermission.role') }}
          </label>
          <ElSelect
            v-model="selectedRoleId"
            clearable
            filterable
            :placeholder="$t('permission.rowPermission.placeholder.role')"
            class="w-full"
          >
            <ElOption
              v-for="role in roleOptions"
              :key="role.id"
              :label="role.roleName"
              :value="role.id"
            />
          </ElSelect>
        </div>
        <div class="w-[300px]">
          <label class="mb-1 block text-sm font-medium">
            {{ $t('permission.rowPermission.menu') }}
          </label>
          <ElTreeSelect
            v-model="selectedMenuId"
            :data="menuTreeData"
            node-key="id"
            :props="{ label: 'name', children: 'children' }"
            check-on-click-node
            check-strictly
            default-expand-all
            render-after-expand
            clearable
            filterable
            :placeholder="$t('permission.rowPermission.placeholder.menu')"
            class="w-full"
          />
        </div>
      </div>
    </div>

    <div class="card-box mb-3 px-4 py-3">
      <ElButton
        class="mr-2"
        bg
        text
        type="primary"
        :disabled="!canOperate"
        v-if="hasAccessByCodes(['sys:rowPermission:create'])"
        @click="openAddDrawer"
      >
        {{ $t('permission.rowPermission.addRule') }}
      </ElButton>
      <ElButton
        class="mr-2"
        bg
        text
        type="success"
        :disabled="!canOperate"
        :loading="saving"
        v-if="hasAccessByCodes(['sys:rowPermission:create'])"
        @click="handleSave"
      >
        {{ $t('permission.rowPermission.save') }}
      </ElButton>
    </div>

    <div class="card-box p-4">
      <div class="mb-4 text-base font-medium">
        {{ $t('permission.rowPermission.rules') }}
      </div>
      <ElTable :data="rules" border style="width: 100%">
        <ElTableColumn
          :label="$t('permission.rowPermission.scopeType')"
          min-width="180"
        >
          <template #default="{ row }">
            {{
              scopeTypeOptions.find((item) => item.value === row.scopeType)
                ?.label ?? row.scopeType
            }}
          </template>
        </ElTableColumn>
        <ElTableColumn
          :label="$t('permission.rowPermission.target')"
          min-width="240"
        >
          <template #default="{ row }">
            {{ row.targetName ?? getTargetLabel(row.scopeType, row.targetId) }}
          </template>
        </ElTableColumn>
        <ElTableColumn
          :label="$t('system.common.operation')"
          width="120"
          fixed="right"
        >
          <template #default="{ $index }">
            <ElButton
              type="danger"
              link
              v-if="hasAccessByCodes(['sys:rowPermission:delete'])"
              @click="removeRule($index)"
            >
              {{ $t('system.common.button.delete') }}
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
      <div class="mt-4 text-xs text-gray-500">
        {{ $t('permission.rowPermission.hint') }}
      </div>
    </div>

    <AddDrawer :title="$t('permission.rowPermission.addRule')" class="w-[45%]">
      <div class="flex flex-col gap-4 p-4">
        <div>
          <label class="mb-1 block text-sm font-medium">
            {{ $t('permission.rowPermission.scopeType') }}
          </label>
          <ElSelect v-model="addForm.scopeType" class="w-full">
            <ElOption
              v-for="opt in scopeTypeOptions"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </ElSelect>
        </div>
        <div v-if="addForm.scopeType === 1">
          <label class="mb-1 block text-sm font-medium">
            {{ $t('permission.rowPermission.targetDept') }}
          </label>
          <ElTreeSelect
            v-model="addForm.targetIds"
            :data="deptTreeData"
            node-key="id"
            :props="{ label: 'deptName', children: 'children' }"
            multiple
            show-checkbox
            check-strictly
            check-on-click-node
            clearable
            filterable
            class="w-full"
          />
        </div>
        <div v-if="addForm.scopeType === 2">
          <label class="mb-1 block text-sm font-medium">
            {{ $t('permission.rowPermission.targetDept') }}
          </label>
          <ElTreeSelect
            v-model="addForm.targetId"
            :data="deptTreeData"
            node-key="id"
            :props="{ label: 'deptName', children: 'children' }"
            check-on-click-node
            clearable
            filterable
            class="w-full"
          />
        </div>
        <div v-if="addForm.scopeType === 3">
          <label class="mb-1 block text-sm font-medium">
            {{ $t('permission.rowPermission.targetPost') }}
          </label>
          <ElSelect
            v-model="addForm.targetIds"
            multiple
            clearable
            filterable
            class="w-full"
          >
            <ElOption
              v-for="opt in postOptions"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </ElSelect>
        </div>
        <div v-if="addForm.scopeType === 4">
          <label class="mb-1 block text-sm font-medium">
            {{ $t('permission.rowPermission.targetUser') }}
          </label>
          <ElSelect
            v-model="addForm.targetIds"
            multiple
            clearable
            filterable
            class="w-full"
          >
            <ElOption
              v-for="opt in userOptions"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </ElSelect>
        </div>
      </div>
    </AddDrawer>
  </Page>
</template>
