<template>
  <div>
    <div class="input-fields">
      <PlanChoices class="plan-choices" />
      <TextInput class="ti" />
    </div>
    <div>
      discount2Plus {{ globalConfig.baseDiscount }}//
      discountValue {{ globalConfig.discountValue }}//
      {{ globalConfig.showRange }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGlobalConfigStore } from '@/stores/globalConfig';

const globalConfig = useGlobalConfigStore();
</script>

<style scoped lang="scss">
.input-fields {
  display: flex;

  @media screen and (max-width: s.$mobile-width) {
    flex-direction: column;
  }
}

.ti {
  flex-grow: 1;
}

.plan-choices {
  @media screen and (max-width: s.$mobile-width) {
    order: 2;
  }
}

.ti {
  @media screen and (max-width: s.$mobile-width) {
    order: 1;
  }
}
</style>