```vue
<template>
  <div>
    <v-select
      color="primary"
      class="plan-select"
      :items="planItems"
      v-model="appStore.selectedPlanIndex"
      @update:modelValue="handlePlanChange"
      item-title="title"
      item-value="value"
      :label="$labels.plan_label"
    ></v-select>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const planItems = computed(() => {
  return appStore.spPlans.map(plan => ({
    title: plan.getName(),
    value: plan.getId()
  }))
})

// Handle plan selection change
const handlePlanChange = (newId: number) => {
  appStore.selectedPlanIndex = newId
  appStore.selectedPlan = appStore.spPlans.find(plan => plan.getId() === newId) || null
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