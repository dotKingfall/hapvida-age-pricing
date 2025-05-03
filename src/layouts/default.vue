<template>
  <v-main>
    <v-app-bar
      class="top-bar"
      :elevation="2"
    >
      <v-app-bar-title class="text-white">hey</v-app-bar-title>
    </v-app-bar>
    <router-view />
  </v-main>
</template>

<script lang="ts" setup>
  //
</script>

<style scoped lang="scss">
@use '/src/styles/colors.scss';

.top-bar{
  background: linear-gradient(18deg, colors.$primary, colors.$accent) !important;
  color: colors.$l-text !important;
}
</style>
