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
        <div>{{ $labels.global_title }}</div>
        <div class="last-updated-message">
          <v-icon icon="mdi-clock-outline" size="small" />
           <span class="ml-1 mt-1">{{ $labels.global_last_updated }}</span>
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
      class="bg-light_bg"
      v-model="isDrawerOpen"
      temporary
    >

    </v-navigation-drawer>

    <v-main class="app-outline">
      <router-view class="app-padding" />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isDrawerOpen = ref(false)
</script>

<style scoped lang="scss">

.app-outline{
  background-color: c.$l-bg;

  .app-padding{
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

.appbar-title{
  font-size: xx-large;
  font-family: "Zain", sans-serif;
  height: 100%;
  display: flex;
  align-items: center;

  @media screen and (max-width: s.$mobile-width) {
    font-size: large;
  }
}

.last-updated-message{
  font-size: medium;
  display: flex;
  align-items: center;
}
</style>
