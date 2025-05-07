<template>
  <div class="tables-parent">

    <!-- COM COPARTICIPAÇÃO -->
    <v-card variant="tonal" color="light_bg_accent" class="tables-content">
      <div class="info-body">
        <div class="payment-category">
          <div class="title">{{ $labels.pricingtables_coparticipation_title }}</div>
          <v-icon
            class="copy-icon"
            icon="mdi-content-copy"
            size="20"
            @click="copyText('with-cop')"
          />
        </div>
        
        <!-- FIELD WITH COP -->
        <div id="with-cop" contenteditable="true" ref="withCop">{{ formattedData }}</div>
      </div>
    </v-card>

    <v-divider
      :vertical="$vuetify.display.mdAndUp"
      class="divider"
    />

    <div>{{ appStore.selectedPlans }}</div>

    <!-- SEM COPARTICIPAÇÃO -->
    <v-card variant="tonal" color="light_bg_accent" class="tables-content">
      <div class="info-body">
        <div class="payment-category">
          <div class="title">{{ $labels.pricingtables_nocoparticipation_title }}</div>
          <v-icon
            class="copy-icon"
            icon="mdi-content-copy"
            size="20"
            @click="copyText('no-cop')"
          />
        </div>

        <!-- FIELD NO COP -->
        <div id="no-cop" contenteditable="true" ref="noCop">{{ formattedData }}</div>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useAppStore } from '@/stores/app';
import { useAgeOperationsStore } from '@/stores/ageOperations';
import { formatPricingData } from '@/utils/outputFormatter';

const appStore = useAppStore()
const ageOperations = useAgeOperationsStore()

const withCop = ref<HTMLElement | null>(null);
const noCop = ref<HTMLElement | null>(null);

const formattedData = computed(() => { //TODO HERE
  return appStore.spPlans;
});

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
    console.error('Failed to copy text: ', err);
    alert('Failed to copy text.');
  }
};

// Sync scroll function
const syncScroll = (source: HTMLElement, target: HTMLElement) => {
  target.scrollTop = source.scrollTop;
};

// ADD LISTENERS
onMounted(() => {
  if (withCop.value && noCop.value) {
    withCop.value.addEventListener('scroll', () => syncScroll(withCop.value!, noCop.value!));
    noCop.value.addEventListener('scroll', () => syncScroll(noCop.value!, withCop.value!));
  }
});

// REMOVE LISTENERS
onUnmounted(() => {
  if (withCop.value && noCop.value) {
    withCop.value.removeEventListener('scroll', () => syncScroll(withCop.value!, noCop.value!));
    noCop.value.removeEventListener('scroll', () => syncScroll(noCop.value!, withCop.value!));
  }
});
</script>

<style scoped lang="scss">
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

#with-cop, #no-cop{
  overflow-y: auto;
  padding: .3rem .5rem .5rem .3rem;

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
  scrollbar-width: 10px;
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

  &:hover{
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
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;

  text-align: center;
  color: c.$l-text;
  font-family: "Zain", sans-serif;
  font-size: x-large;

  @media screen and (max-width: s.$mobile-width) {
    font-size: large;
  }
}

.title{
  flex-grow: 1;;
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
  outline: 0px solid transparent;
}
</style>