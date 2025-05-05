<template>
  <div>
    <AgePricing />
    <v-divider />
    <PricingTable />
  </div>
  
</template>

<script lang="ts" setup>
  import { useAgeOperationsStore } from '@/stores/ageOperations';

  const ageOperationsStore = useAgeOperationsStore()
</script>