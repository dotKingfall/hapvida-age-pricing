<template>
  <div>
    <div>
      <AgePricing />
      <v-divider />
    </div>

    <div>
      <ReferenceLabel />
      <PricingTables />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useAgeOperationsStore } from '@/stores/ageOperations';

  const ageOperationsStore = useAgeOperationsStore()
</script>