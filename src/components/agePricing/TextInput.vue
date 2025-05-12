<template>
  <div>
    <v-text-field
    ref="ageTextField"
      v-model="input"
      :color="theme.global.name.value === 'light' ? 'primary' : ''"
      :label="$labels.textinput_age_label"
      :rules="[intSpaceRule]"
      :hint="$labels.textinput_separate_by_blank_space"
      inputmode="numeric"
      @keypress="restrictInput"
    >
      <template #prepend>
        <v-icon color="primary">mdi-account</v-icon>
      </template>

      <template #append>
        <v-icon color="primary" @click="clearInput">mdi-close</v-icon>
      </template>
    </v-text-field>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { VTextField } from 'vuetify/components'
import { useAgeOperationsStore } from '@/stores/ageOperations'
import { useAppStore } from '@/stores/app';
import { useTheme } from 'vuetify'
import * as labels from '@/labels'

const theme = useTheme()
const appStore = useAppStore()
const ageTextField = ref<InstanceType<typeof VTextField> | null>(null)
  const ageOperationsStore = useAgeOperationsStore()

const input = ref("")
const ages = computed(() => {
  if (!input.value) return []
  return input.value.trim().split(/\s+/).map(Number)
})

function clearInput(){
  input.value = ""
}

const intSpaceRule = (value: string) => {
  if (!value) return true;
  return /^[0-9\s]*$/.test(value) || labels.textinput_intspace_rule;
};

const maxAgeRule = () => {
  if (!ages.value.length || appStore.selectedPlanIndex !== 1) return true
  return ages.value.every(age => age < 50) || labels.textinput_maxage_rule
}

function restrictInput(event: KeyboardEvent) {
  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
  if (allowedKeys.includes(event.key)) return;
  if (!/[0-9\s]/.test(event.key)) {
    event.preventDefault(); // Prevent non-integer, non-space characters
  }
}

watch(ages, (newAges) => {
  ageOperationsStore.ageInput = [...newAges] // Update store with a new array copy
}, { deep: true })

// Trigger validation when I change between plans
watch(() => appStore.selectedPlanIndex, () => {
  if (ageTextField.value) {
    ageTextField.value.validate()
  }
})
</script>