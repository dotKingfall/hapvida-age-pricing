<template>
  <div>
    <!-- APPLY CUSTOM DISCOUNT -->
    <div class="discount-field">
      <v-checkbox v-model="applyDiscount" color="primary" />

      <div class="discount-input">
        <v-number-input
          color="primary"
          :label="$labels.drawer_apply_discount"
          control-variant="stacked"
          :disabled="!applyDiscount"
          :min="0"
          :max="100"
          v-model="discountValue"
        ></v-number-input>
      </div>
    </div>

    <!-- OVERRIDE BASE DISCOUNT -->
    <div class="discount-field">
      <v-checkbox v-model="overrideDiscount" color="primary" />

      <div class="discount-input">
        <v-number-input
          color="primary"
          :label="$labels.drawer_override_base_discount"
          control-variant="stacked"
          :disabled="!overrideDiscount"
          :min="0"
          :max="100"
          v-model="baseDiscount"
        ></v-number-input>
      </div>
    </div>

    <!-- SET DISCOUNT DURATION -->
    <div class="discount-field">
      <v-checkbox v-model="updateDiscountDuration" color="primary" />

      <div class="discount-input">
        <v-number-input
          color="primary"
          :label="$labels.drawer_discount_duration"
          control-variant="stacked"
          :disabled="!updateDiscountDuration"
          :min="1"
          :max="365"
          v-model="discountDuration"
        ></v-number-input>
      </div>
    </div>

    <!-- SHOW AGE RANGE -->
    <v-checkbox
      :model-value="showRange"
      color="primary"
      :label="$labels.drawer_show_age_range"
      @update:model-value="globalConfigStore.toggleShowRange()"
    />
  </div>
</template>

<script lang="ts" setup>
import { useGlobalConfigStore } from '@/stores/globalConfig';
import { ref, watch } from 'vue';

const globalConfigStore = useGlobalConfigStore();

// Initialize refs with store values
const applyDiscount = ref(false);
const overrideDiscount = ref(false);
const updateDiscountDuration = ref(false);
const discountValue = ref(globalConfigStore.discountValue);
const baseDiscount = ref(globalConfigStore.baseDiscount);
const discountDuration = ref(globalConfigStore.discountDuration);
const showRange = ref(globalConfigStore.showRange);

// Watch for changes to discount refs and update the store
watch(
  [discountValue, baseDiscount, discountDuration],
  ([newValue, newBase, newDuration]) => {
    globalConfigStore.setDiscountSettings({
      value: newValue,
      base: newBase,
      duration: newDuration,
    });
  }
);

// Watch for changes to showRange and toggle it
watch(showRange, (newShowRange) => {
  if (newShowRange !== globalConfigStore.showRange) {
    globalConfigStore.toggleShowRange();
  }
});

// Sync store changes back to local refs if the store is updated elsewhere
watch(
  () => [
    globalConfigStore.discountValue,
    globalConfigStore.baseDiscount,
    globalConfigStore.discountDuration,
    globalConfigStore.showRange,
  ],
  ([newValue, newBase, newDuration, newShowRange]) => {
    discountValue.value = newValue;
    baseDiscount.value = newBase;
    discountDuration.value = newDuration;
    showRange.value = newShowRange;
  }
);
</script>

<style scoped lang="scss">
.discount-field {
  display: flex;
  align-items: center;
}

.discount-input {
  flex-grow: 1;
}
</style>