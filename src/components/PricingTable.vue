<template>
  <div class="mt-2">
    <div class="reference">
      {{ $labels.pricingtable_reference_label }} {{ currentReference }} {{ currentDiscount }}
    </div>
    <div>hi</div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAppStore } from '@/stores/app';
import { useAgeOperationsStore } from '@/stores/ageOperations';
import { useGlobalConfigStore } from '@/stores/globalConfig';
import * as labels from '@/labels'

const appStore = useAppStore()
const globalConfigStore = useGlobalConfigStore()
const ageOperationsStore = useAgeOperationsStore()

const currentReference = computed(() => {
  const index = appStore.selectedPlanIndex
  const referenceIndex = index - 1 // Adjust for zero-based array
    return ageOperationsStore.ageInput.length <= 1
      ? labels.reference_names[referenceIndex][0]
      : labels.reference_names[referenceIndex][1]
})

const currentDiscount = computed(() => {
  const index = appStore.selectedPlanIndex
  const ageInputLength = ageOperationsStore.ageInput.length
  const { discountValue, baseDiscount, discountDuration } = globalConfigStore

  // Case 1: discountValue === 0
  if (discountValue === 0) {
    if (
      (index === 1 && ageInputLength > 1) ||
      (index === 2 && ageInputLength > 1) ||
      (index === 3 && ageInputLength > 1)
    ) {
      return `${baseDiscount}% discount will be applied`
    }
    return '' // No message if none of the conditions are met
  }

  // Case 2: discountValue > 0
  let message = `${discountValue}% discount will be applied for ${discountDuration} months`
  
  if (
    (index === 1 && ageInputLength > 1) ||
    (index === 2 && ageInputLength > 1) ||
    (index === 3 && ageInputLength > 1)
  ) {
    message += `, then ${baseDiscount}% discount will be applied`
  } else {
    message += ', then usual table values will be applied'
  }

  return message
})
</script>

<style scoped lang="scss">
.reference {
  font-family: "Zain", sans-serif !important;
}
</style>