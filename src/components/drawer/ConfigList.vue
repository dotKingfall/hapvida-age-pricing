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
          v-model="discountValueComputed"
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
          v-model="baseDiscountComputed"
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
          v-model="discountDurationComputed"
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

    <v-dialog v-model="showChangeOutput" class="output-config-dialog">
      <OutputConfig @close="showChangeOutput = false" />
    </v-dialog>

    <!-- OPEN CUSTOM CONFIG -->
     <v-btn @click="showChangeOutput = true" color="primary">{{ $labels.drawer_customize_output }}</v-btn>
  </div>
</template>

<script lang="ts" setup>
import { useGlobalConfigStore } from '@/stores/globalConfig';
import { ref, computed } from 'vue';

const globalConfigStore = useGlobalConfigStore();

// Initialize refs with store values
const applyDiscount = ref(false);
const overrideDiscount = ref(false);
const updateDiscountDuration = ref(false);
const showRange = ref(globalConfigStore.showRange);
const showChangeOutput = ref(false);

const discountValueComputed = computed({
  get: () => globalConfigStore.discountValue ?? 0,
  set: (value) => {
    globalConfigStore.setDiscountSettings({
      value: value ?? 0,
      base: globalConfigStore.baseDiscount,
      duration: globalConfigStore.discountDuration,
    });
  },
});

const baseDiscountComputed = computed({
  get: () => globalConfigStore.baseDiscount ?? 0,
  set: (value) => {
    globalConfigStore.setDiscountSettings({
      value: globalConfigStore.discountValue,
      base: value ?? 0,
      duration: globalConfigStore.discountDuration,
    });
  },
});

const discountDurationComputed = computed({
  get: () => globalConfigStore.discountDuration ?? 0,
  set: (value) => {
    globalConfigStore.setDiscountSettings({
      value: globalConfigStore.discountValue,
      base: globalConfigStore.baseDiscount,
      duration: value ?? 0,
    });
  },
});

//WATCH FUNCTIONS
watch(showRange, (newShowRange) => {
  if (newShowRange !== globalConfigStore.showRange) {
    globalConfigStore.toggleShowRange();
  }
});

watch(
  () => globalConfigStore.showRange,
  (newShowRange) => {
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

.output-config-dialog {
  width: 100%;
  max-width: 650px;
}
</style>