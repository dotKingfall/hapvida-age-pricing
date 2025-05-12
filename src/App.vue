<template>
  <v-app :style="rootStyles">
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
import { useThemeColors } from '@/styles/colors'

const colors = useThemeColors()

const rootStyles = computed(() => ({
  '--primary': colors.primary.value,
  '--accent': colors.accent.value,
  '--text': colors.text.value,
  '--text-accent': colors.text_accent.value,
  '--text-output': colors.text_output.value,
  '--foreground': colors.foreground.value,
  '--overlay': colors.overlay.value,
  '--bg': colors.bg.value,
  '--bg-accent': colors.bg_accent.value,
  '--bg-output-outline': colors.bg_output_outline.value,
}))
</script>
