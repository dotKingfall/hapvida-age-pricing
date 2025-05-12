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
    hover_overlay: '#C51AA9',
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
    hover_overlay: '#3b275a',
    bg: '#221B27',
    bg_accent: '#38313c',
    bg_output_outline: '#2e2535',
  },
}


export function useThemeColors() {
  const theme = useTheme()
  const color = themeColors[theme.global.name.value as 'light' | 'dark'];

  const primary = computed(() => color.primary)
  const accent = computed(() => color.accent)
  const text = computed(() => color.text)
  const text_accent = computed(() => color.text_accent)
  const text_output = computed(() => color.text_output)
  const foreground = computed(() => color.foreground)
  const overlay = computed(() => color.overlay)
  const hover_overlay = computed(() => color.hover_overlay)
  const bg = computed(() => color.bg)
  const bg_accent = computed(() => color.bg_accent)
  const bg_output_outline = computed(() => color.bg_output_outline)

  return {
    primary,
    accent,
    text,
    text_accent,
    text_output,
    foreground,
    overlay,
    hover_overlay,
    bg,
    bg_accent,
    bg_output_outline,
  }
}