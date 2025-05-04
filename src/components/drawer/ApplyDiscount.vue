<template>
  <div>
    <div class="discount-field">
      <v-checkbox
        v-model="applyDiscount"
        color="primary"
      />

      <div class="discount-input">
        <v-number-input
          color="primary"
          :label="$labels.drawer_apply_discount"
          control-variant="stacked"
          :disabled="!applyDiscount"
          :min="0"
          :max="100"
          v-model="discountValue"
        >
        </v-number-input>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGlobalConfigStore } from '@/stores/globalConfig';
import { ref, watch } from 'vue';

const globalConfigStore = useGlobalConfigStore();
const applyDiscount = ref(globalConfigStore.applyDiscount);
const discountValue = ref(globalConfigStore.discountValue)

watch([applyDiscount, discountValue], ([newApply, newValue]) => {
  globalConfigStore.setDiscountSettings({
    apply: newApply,
    value: newValue,
    plus: globalConfigStore.discount2Plus,
  });
});

//Sync store changes back to local refs if the store is updated elsewhere
watch(
  () => [globalConfigStore.applyDiscount, globalConfigStore.discountValue],
  ([newApply, newValue]) => {
    applyDiscount.value = newApply;
    discountValue.value = newValue;
  }
);

</script>

<style scoped lang="scss">
.discount-field{
  display: flex;
  align-items: center;
}

.discount-input{
  flex-grow: 1;
}
</style>