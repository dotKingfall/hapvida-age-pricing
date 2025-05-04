<template>
  <div>
    <v-select
      color="primary"
      class="plan-select"
      :label="$labels.plan_label"
      :items="labels.plan_names"
      v-model="selectedPlan"
    ></v-select>
  </div>
</template>

<script lang="ts" setup>
import * as labels from "@/labels"
import { ref } from 'vue'

const selectedPlan = ref(labels.plan_names[0])
</script>

<style scoped lang="scss">
.plan-select{
  min-width: 22vw;
  
  @media (min-width: (s.$mobile-width + 1px)) {
    margin-right: 6.5vh;
  }
}
</style>