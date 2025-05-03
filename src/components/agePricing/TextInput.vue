<template>
  <div>
    <v-text-field
      v-model="input"
      color="primary"
      :label="$labels.textinput_age_label"
      :rules="[intSpaceRule]"
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

const input = ref("")

function clearInput(){
  input.value = ""
}

const intSpaceRule = (value: string) => {
  if (!value) return true;
  return /^[0-9\s]*$/.test(value) || 'Digite apenas números inteiros e espaços';
};

function restrictInput(event: KeyboardEvent) {
  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
  if (allowedKeys.includes(event.key)) return;
  if (!/[0-9\s]/.test(event.key)) {
    event.preventDefault(); // Prevent non-integer, non-space characters
  }
}
</script>