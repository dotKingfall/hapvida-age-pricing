<template>
  <v-app>
    <!-- TOP BAR -->
    <v-app-bar class="top-bar" :elevation="2" height="85" app>
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
      class="bg-light_bg drawer"
      v-model="isDrawerOpen"
      :width="drawerSize"
      temporary
    >
      <div class="drawer-title">
        <v-icon color="primary" size="3.5vh">mdi-cog</v-icon>
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
      <!-- Progress Circular when loading -->
      <div v-if="appStore.isLoading" class="loading-overlay">
        <v-progress-circular
          color="primary"
          indeterminate
          size="64"
          width="6"
        />
      </div>
      <!-- Main content when not loading -->
      <router-view v-else class="app-padding" />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import ApplyDiscount from '@/components/drawer/ConfigList.vue'
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const isDrawerOpen = ref(false)
const { mobile } = useDisplay()

const drawerSize = computed(() => {
  return mobile.value ? 280 : 500
})

const drawerItems = [
  ApplyDiscount,
]
</script>

<style scoped lang="scss">
.drawer-title {
  color: c.$primary;
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
  background-color: c.$l-bg;

  .app-padding {
    padding: 15px;
  }
}

.top-bar {
  background: linear-gradient(
    18deg,
    c.$primary,
    c.$accent
  ) !important;
  color: c.$l-text !important;
}

.appbar-title {
  font-size: xx-large;
  font-family: "Zain", sans-serif;
  height: 100%;
  display: flex;
  align-items: center;

  @media screen and (max-width: s.$mobile-width) {
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