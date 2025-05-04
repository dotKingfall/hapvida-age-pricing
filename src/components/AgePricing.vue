<template>
  <div>
    <div class="inputFields">
      <PlanChoices />
      <TextInput class="ti" />
    </div>
    <div>
      discount2Plus {{ globalConfig.baseDiscount }}//
      discountValue {{ globalConfig.discountValue }}//
      {{ globalConfig.showRange }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGlobalConfigStore } from '@/stores/globalConfig';

const globalConfig = useGlobalConfigStore()
</script>

<style scoped lang="scss">
.inputFields{
  display: flex;
}

.ti{
  flex-grow: 1;
}
</style>