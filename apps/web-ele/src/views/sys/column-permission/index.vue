<script lang="ts" setup>
import { Page } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { ElCard, ElEmpty } from 'element-plus';
</script>

<template>
  <Page>
    <ElCard>
      <ElEmpty :description="$t('permission.columnPermission.comingSoon')">
        <template #description>
          <span class="text-muted-foreground">
            {{ $t('permission.columnPermission.comingSoon') }}
          </span>
        </template>
      </ElEmpty>
    </ElCard>
  </Page>
</template>
