<template>
  <!-- TOP BAR -->
  <v-app-bar class="top-bar" :elevation="2">
    <!-- MENU ICON-->
    <template #prepend>
      <v-app-bar-nav-icon
        @click="isDrawerOpen = !isDrawerOpen"
      />
    </template>

    <!-- TITLE-->
    <v-app-bar-title class="text-white">[CHANGE]</v-app-bar-title>

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
    v-model="isDrawerOpen"
    temporary
  >

  </v-navigation-drawer>

  <v-main>
    <router-view />
  </v-main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isDrawerOpen = ref(false)
</script>

<style scoped lang="scss">
@use "/src/styles/colors.scss";

.top-bar {
  background: linear-gradient(
    18deg,
    colors.$primary,
    colors.$accent
  ) !important;
  color: colors.$l-text !important;
}
</style>
