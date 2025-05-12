<template>
  <v-app>
    <!-- TOP BAR -->
    <v-app-bar
      class="top-bar"
      :elevation="2"
      height="85"
      app
    >
      <!-- MENU ICON-->
      <template #prepend>
        <v-app-bar-nav-icon
          @click="isDrawerOpen = !isDrawerOpen"
        />
      </template>

      <!-- TITLE-->
      <v-app-bar-title class="appbar-title">
        <div>{{ $labels.appbar_title }}</div>
        <div class="last-updated-message">
          <v-icon icon="mdi-clock-outline" size="small" />
          <span class="ml-1 mt-1">{{ $labels.appbar_last_updated }}</span>
        </div>
      </v-app-bar-title>

      <v-btn
        variant="outlined"
        @click="toggleTheme"
      >
        <div>{{ $labels.appbar_change_theme }}</div>
      </v-btn>

      <v-divider inset vertical :thickness="4" class="mx-2" />

      <!-- GITHUB -->
      <template #append>
        <v-btn
          class="mr-1"
          flat
          variant="outlined"
          href="https://www.github.com/dotKingfall"
          target="_blank"
          rel="noopener noreferrer"
        >
          <!-- GITHUB ICON -->
          <template #prepend>
            <v-icon icon="mdi-github" size="24" />
          </template>
          Github
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer
      class="drawer"
      v-model="isDrawerOpen"
      :width="drawerSize"
      temporary
      :color="colors.bg.value"
    >
      <div class="drawer-title">
        <v-icon size="3.5vh">mdi-cog</v-icon>
        <div class="ml-2">{{ $labels.drawer_title }}</div>
      </div>

      <v-divider />

      <div>
        <v-list-item v-for="(item, index) in drawerItems" :key="index">
          <component :is="item" />
        </v-list-item>
      </div>
    </v-navigation-drawer>

    <v-main class="app-outline">
      <div v-if="appStore.isLoading" class="loading-overlay">
        <v-progress-circular
          color="primary"
          indeterminate
          size="64"
          width="6"
        />
      </div>

      <router-view v-else class="app-padding" />
    </v-main>
    <SpeedInsights/>
  </v-app>
</template>

<script lang="ts" setup>
import { SpeedInsights } from "@vercel/speed-insights/next"
import ApplyDiscount from '@/components/drawer/ConfigList.vue'
import { ref, computed, onMounted, watch } from 'vue'
import { useDisplay, useTheme } from 'vuetify'
import { useAppStore } from '@/stores/app'
import { useThemeColors } from '@/styles/colors'

const appStore = useAppStore()
const isDrawerOpen = ref(false)
const theme = useTheme()
const { mobile } = useDisplay()
const colors = useThemeColors()

const drawerSize = computed(() => {
  return mobile.value ? 280 : 500
})

const drawerItems = [
  ApplyDiscount,
]

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
}))

const applyRootStyles = () => {
  console.log('Applying root styles:', rootStyles.value)
  const style = document.documentElement.style
  Object.entries(rootStyles.value).forEach(([key, value]) => {
    style.setProperty(key, value)
  })
}

// Load saved theme and apply styles on mount
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'light' || savedTheme === 'dark') {
    theme.global.name.value = savedTheme
  }

  applyRootStyles()
})

// Watch for theme or color changes
watch(rootStyles, () => {
  applyRootStyles()
})

function toggleTheme() {
  const newTheme = theme.global.name.value === 'light' ? 'dark' : 'light'
  theme.global.name.value = newTheme
  localStorage.setItem('theme', newTheme)
  console.log('Theme switched to:', newTheme, 'Saved to localStorage')
}
</script>

<style scoped lang="scss">
.drawer-title {
  color: var(--text-accent);
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  font-size: x-large;
  justify-content: center;
  align-items: center;
}

.drawer {
  font-family: "Zain", sans-serif;
}

.app-outline {
  background-color: var(--bg);

  .app-padding {
    padding: 15px;
  }
}

.top-bar {
  background: linear-gradient(
    18deg,
    var(--primary),
    var(--accent)
  ) !important;
  color: var(--text) !important;
}

.appbar-title {
  font-size: xx-large;
  font-family: "Zain", sans-serif;
  height: 100%;
  display: flex;
  align-items: center;

  @media screen and (max-width: 600px) {
    font-size: large;
  }
}

.last-updated-message {
  font-size: medium;
  display: flex;
  align-items: center;
}

.loading-overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
</style>