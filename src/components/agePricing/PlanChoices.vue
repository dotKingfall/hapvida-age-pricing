<template>
  <div>
    <v-select
      color="primary"
      class="plan-select"
      :label="$labels.plan_label"
      :items="planItems"
      v-model="appStore.selectedPlanIndex"
      @update:modelValue="handlePlanChange"
    ></v-select>
  </div>
</template>

<script lang="ts" setup>
import * as labels from '@/labels'
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const planItems = computed(() => {
  return labels.plan_names.map((name, index) => ({
    value: index + 1,
    title: name,
  }))
})

// HANDLE PLAN CHANGE
const handlePlanChange = (groupId: number) => {
  appStore.getGroup(groupId)
}
</script>

<style scoped lang="scss">
.plan-select {
  min-width: 22vw;
  
  @media (min-width: (s.$mobile-width + 1px)) {
    margin-right: 6.5vh;
  }
}
</style>