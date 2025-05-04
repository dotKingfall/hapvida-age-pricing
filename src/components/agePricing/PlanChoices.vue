<template>
  <div>
    <v-select
      color="primary"
      :label="$labels.plan_label"
      :items="planOptions"
    ></v-select>
  </div>
</template>

<script lang="ts" setup>
import * as labels from "@/labels"

const planOptions = [
  labels.plan1,
  labels.plan2,
  labels.plan3,
  labels.plan4,
  labels.plan5,
  labels.plan6,
  labels.plan7,
  labels.plan8,
]
</script>