<template>
  <div class="tables-parent">
    <!-- COM COPARTICIPAÇÃO -->
     <v-card class="tables-content">
      <div contenteditable="true">cop</div>
     </v-card>

     <v-divider
      :vertical="$vuetify.display.mdAndUp"
      class="divider"
    />

    <!-- SEM COPARTICIPAÇÃO -->
     <v-card class="tables-content">
      <div contenteditable="true">nocop</div>
     </v-card>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">
.tables-parent{
  width: 100%;
  display: flex;
  justify-content: center;

  padding-top: 7vh;
  padding-bottom: 7vh;

  @media screen and (max-width: s.$mobile-width) {
    flex-direction: column;

    padding-top: 2vh;
    padding-bottom: 2vh;
  }
}

.tables-content{/*hi*/}

.divider{
  margin: 0 20px; /* Space between cards on desktop (vertical divider) */
  
  @media screen and (max-width: s.$mobile-width) {
    margin: 20px 0; /* Space between cards on mobile (horizontal divider) */
    width: 100%; /* Ensure full width for horizontal divider */
  }
}
</style>