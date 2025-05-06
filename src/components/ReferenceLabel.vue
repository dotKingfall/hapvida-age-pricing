<template>
  <div class="mt-2">
    <div class="reference">
      {{ $labels.pricingtable_reference_label }} {{ currentReference }} {{ currentDiscount }}
    </div>
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

  if (discountValue === 0) {
    if (
      (index === 1 && ageInputLength > 1) ||
      (index === 2 && ageInputLength > 1) ||
      (index === 3 && ageInputLength > 1)
    ) {
      return `(${baseDiscount}% de desconto aplicado).`
    }
    return ''
  }

  // Case 2: discountValue > 0
  let message = `(${discountValue}% de desconto aplicado por ${discountDuration} meses`
  
  if (
    (index === 1 && ageInputLength > 1) ||
    (index === 2 && ageInputLength > 1) ||
    (index === 3 && ageInputLength > 1)
  ) {
    message += `, com ${baseDiscount}% de desconto vitalício após prazo.)`
  } else {
    message += ', sem desconto vitalício, com valor base após prazo.)'
  }

  return message
})
</script>

<style scoped lang="scss">
.reference {
  font-family: "Zain", sans-serif !important;
}
</style>