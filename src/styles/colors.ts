import { computed } from 'vue'
import { useTheme } from 'vuetify'

const themeColors = {
  light: {
    primary: '#981482',
    accent: '#C51AA9',
    text: '#E0E0E0',
    text_accent: '#981482',
    text_output: '#000',
    foreground: '#F3F2ED',
    overlay: '#981482',
    bg: '#F3E7F3',
    bg_accent: '#f1e7f3',
    bg_output_outline: '#e6d9e6',
  },
  dark: {
    primary: '#221B27',
    accent: '#281A3D',
    text: '#E0E0E0',
    text_accent: '#E0E0E0',
    text_output: '#E0E0E0',
    foreground: '#F3F2ED',
    overlay: '#F3F2ED',
    bg: '#221B27',
    bg_accent: '#38313c',
    bg_output_outline: '#2e2535',
  },
}

export function useThemeColors() {
  const theme = useTheme()

  const primary = computed(() => themeColors[theme.global.name.value].primary)
  const accent = computed(() => themeColors[theme.global.name.value].accent)
  const text = computed(() => themeColors[theme.global.name.value].text)
  const text_accent = computed(() => themeColors[theme.global.name.value].text_accent)
  const text_output = computed(() => themeColors[theme.global.name.value].text_output)
  const foreground = computed(() => themeColors[theme.global.name.value].foreground)
  const overlay = computed(() => themeColors[theme.global.name.value].overlay)
  const bg = computed(() => themeColors[theme.global.name.value].bg)
  const bg_accent = computed(() => themeColors[theme.global.name.value].bg_accent)
  const bg_output_outline = computed(() => themeColors[theme.global.name.value].bg_output_outline)

  return {
    primary,
    accent,
    text,
    text_accent,
    text_output,
    foreground,
    overlay,
    bg,
    bg_accent,
    bg_output_outline,
  }
}