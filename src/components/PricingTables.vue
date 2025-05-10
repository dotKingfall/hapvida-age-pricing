<template>
  <div class="tables-parent">

    <!-- NO COP -->
    <v-card variant="tonal" color="light_bg_accent" class="tables-content">
      <div class="info-body">
        <div class="payment-category">
          <div class="title">{{ $labels.pricingtables_nocoparticipation_title }}</div>
          <v-icon
            class="copy-icon"
            icon="mdi-content-copy"
            size="20"
            @click="copyText('no-cop-outline')"
          />
        </div>

        <div id="no-cop-outline" contenteditable="true" ref="noCop">
          <div class="mod-title" v-if="hasNonNullField(formattedData.noCop, 'enf')">
            <b>{{ $labels.pricingtables_enf_title }}</b>
            <div v-for="item in formattedData.noCop" :key="item.age" class="price">
              {{ ageFormatter(item.tier.enf, item.age, item.range) }}
            </div>
            <div class="total">{{ totalsFormatter(formattedData.noCop, 'enf') }}</div>
          </div>
          <div class="mod-title" v-if="hasNonNullField(formattedData.noCop, 'amb')">
            <b>{{ $labels.pricingtables_amb_title }}</b>
            <div v-for="item in formattedData.noCop" :key="item.age" class="price">
              {{ ageFormatter(item.tier.amb, item.age, item.range) }}
            </div>
            <div class="total">{{ totalsFormatter(formattedData.noCop, 'amb') }}</div>
          </div>
          <div class="mod-title" v-if="hasNonNullField(formattedData.noCop, 'apt')">
            <b>{{ $labels.pricingtables_apt_title }}</b>
            <div v-for="item in formattedData.noCop" :key="item.age" class="price">
              {{ ageFormatter(item.tier.apt, item.age, item.range) }}
            </div>
            <div class="total">{{ totalsFormatter(formattedData.noCop, 'apt') }}</div>
          </div>
        </div>
      </div>
    </v-card>

    <v-divider :vertical="$vuetify.display.mdAndUp" class="divider" />

    <!-- WITH COP -->
    <v-card variant="tonal" color="light_bg_accent" class="tables-content">
      <div class="info-body">
        <div class="payment-category">
          <div class="title">{{ $labels.pricingtables_coparticipation_title }}</div>
          <v-icon
            class="copy-icon"
            icon="mdi-content-copy"
            size="20"
            @click="copyText('with-cop-outline')"
          />
        </div>

        <div id="with-cop-outline" contenteditable="true" ref="withCop">
          <div class="mod-title" v-if="hasNonNullField(formattedData.withCop, 'enf')">
            <b>{{ $labels.pricingtables_enf_title }}</b>
            <div v-for="item in formattedData.withCop" :key="item.age" class="price">
              {{ ageFormatter(item.tier.enf, item.age, item.range) }}
            </div>
            <div class="total">{{ totalsFormatter(formattedData.withCop, 'enf') }}</div>
          </div>
          <div class="mod-title" v-if="hasNonNullField(formattedData.withCop, 'amb')">
            <b>{{ $labels.pricingtables_amb_title }}</b>
            <div v-for="item in formattedData.withCop" :key="item.age" class="price">
              {{ ageFormatter(item.tier.amb, item.age, item.range) }}
            </div>
            <div class="total">{{ totalsFormatter(formattedData.withCop, 'amb') }}</div>
          </div>
          <div class="mod-title" v-if="hasNonNullField(formattedData.withCop, 'apt')">
            <b>{{ $labels.pricingtables_apt_title }}</b>
            <div v-for="item in formattedData.withCop" :key="item.age" class="price">
              {{ ageFormatter(item.tier.apt, item.age, item.range) }}
            </div>
            <div class="total">{{ totalsFormatter(formattedData.withCop, 'apt') }}</div>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useAgeOperationsStore } from '@/stores/ageOperations';
import { useGlobalConfigStore } from '@/stores/globalConfig';
import { formatPricingData } from '@/utils/outputFormatter';
import { ageFormatter, totalsFormatter } from '@/utils/labelsFormatter';

// Store and refs
const ageOperations = useAgeOperationsStore();
const globalConfig = useGlobalConfigStore();
const withCop = ref<HTMLElement | null>(null);
const noCop = ref<HTMLElement | null>(null);

const formattedData = computed(() => {
  const data = formatPricingData(ageOperations.agePrices);
  return {
    withCop: data.withCop || [],
    noCop: data.noCop || [],
  };
});

const hasNonNullField = (
  data: { tier: { enf: number | null; amb: number | null; apt: number | null } }[],
  field: 'enf' | 'amb' | 'apt'
): boolean => {
  return data.some((item) => item.tier[field] !== null);
};

const copyText = async (id: string) => {
  try {
    const element = document.getElementById(id);
    const text = element?.innerText || '';
    if (!text) {
      alert('No text to copy!');
      return;
    }
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy text:', err);
    alert('Failed to copy text.');
  }
};

const syncScroll = (source: HTMLElement, target: HTMLElement) => {
  target.scrollTop = source.scrollTop;
};

onMounted(() => {
  if (withCop.value && noCop.value) {
    withCop.value.addEventListener('scroll', () =>
      noCop.value && syncScroll(withCop.value!, noCop.value)
    );
    noCop.value.addEventListener('scroll', () =>
      withCop.value && syncScroll(noCop.value!, withCop.value)
    );
  }
});

onUnmounted(() => {
  if (withCop.value && noCop.value) {
    withCop.value.removeEventListener('scroll', () =>
      noCop.value && syncScroll(withCop.value!, noCop.value)
    );
    noCop.value.removeEventListener('scroll', () =>
      withCop.value && syncScroll(noCop.value!, withCop.value)
    );
  }
});
</script>

<style scoped lang="scss">
.mod-title {
  text-align: center;
  font-family: 'Zain', sans-serif;
  font-size: x-large;
  margin-bottom: 1rem;
}

.price {
  color: black;
  font-size: large;
  margin-top: 0.3rem;
  margin-left: 1rem;
  text-align: start;
}

.total {
  color: black;
  font-size: large;
  font-weight: bold;
  margin-top: 0.5rem;
  margin-left: 1rem;
  text-align: start;
  white-space: pre;
}

.tables-parent {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 7vh;
  padding-bottom: 7vh;

  @media screen and (max-width: s.$mobile-width) {
    flex-direction: column;
    padding-top: 2vh;
    padding-bottom: 2vh;
  }
}

#with-cop-outline,
#no-cop-outline {
  overflow-y: auto;
  padding: 0.3rem 0.5rem 0.5rem 0.3rem;

  /* WebKit browsers (Chrome, Safari, Edge) */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: c.$primary;
    border-radius: 4px;
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: c.$primary transparent;

  @media screen and (min-width: s.$desktop-width) {
    min-height: 55vh;
    max-height: 55vh;
  }

  @media screen and (max-width: s.$mobile-width) {
    min-height: 48vh;
    max-height: 48vh;
  }
}

.tables-content {
  border: 2px solid transparent;
  flex: 0 0 42%;
  margin: 0 5em;

  &:hover {
    border: 2px solid c.$primary;
  }

  @media screen and (max-width: s.$mobile-width) {
    margin: 0;
  }
}

.divider {
  @media screen and (max-width: s.$mobile-width) {
    margin: 20px 0;
    width: 100%;
  }
}

.payment-category {
  display: flex;
  align-items: center;
  background-color: c.$primary;
  padding: 0.3rem;
  text-align: center;
  color: c.$l-text;
  font-family: 'Zain', sans-serif;
  font-size: x-large;

  @media screen and (max-width: s.$mobile-width) {
    font-size: large;
  }
}

.title {
  flex-grow: 1;
}

.copy-icon {
  position: absolute;
  right: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10%) scale(1.2);
  }
}

[contenteditable] {
  outline: 0 solid transparent;
}
</style>