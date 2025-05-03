<template>
  <div>
    <v-text-field
      v-model="input"
      :label="$labels.textinput_age_label"
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
</script>