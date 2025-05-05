<template>
  <div class="mt-2">
    <div class="reference">
      {{ $labels.pricingtable_reference_label }} {{ currentReference }}
    </div>
    <div>hi</div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAppStore } from '@/stores/app';
import { useAgeOperationsStore } from '@/stores/ageOperations';
import * as labels from '@/labels'

const appStore = useAppStore()
const ageOperationsStore = useAgeOperationsStore()

const currentReference = computed(() => {
  const index = appStore.selectedPlanIndex
  if (index === 1) {
    return labels.reference_names[0]
  } else if (index === 2) {
    return labels.reference_names[1]
  } else if ([3, 4, 5].includes(index)) {
    const referenceIndex = index - 1 // Adjust for zero-based array
    return ageOperationsStore.ageInput.length <= 1
      ? labels.reference_names[referenceIndex][0]
      : labels.reference_names[referenceIndex][1]
  }
  return '' // Default fallback
})
</script>

<style scoped lang="scss">
.reference {
  font-family: "Zain", sans-serif !important;
}
</style>