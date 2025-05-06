```vue
<template>
  <div class="tables-parent">
    <!-- COM COPARTICIPAÇÃO -->
    <v-card variant="tonal" color="light_bg_accent" class="tables-content">
      <div class="info-body">
        <div class="payment-category">
          <div class="title">{{ $labels.pricingtables_coparticipation_title }}</div>
          <v-icon
            class="copy-icon"
            icon="mdi-content-copy"
            size="20"
            @click="copyText('with-cop')"
          />
        </div>
        <div id="with-cop" contenteditable="true">
          <div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div>
        </div>
      </div>
    </v-card>

    <v-divider
      :vertical="$vuetify.display.mdAndUp"
      class="divider"
    />

    <!-- SEM COPARTICIPAÇÃO -->
    <v-card variant="tonal" color="light_bg_accent" class="tables-content">
      <div class="info-body">
        <div class="payment-category">
          <div class="title">{{ $labels.pricingtables_nocoparticipation_title }}</div>
          <v-icon
            class="copy-icon"
            icon="mdi-content-copy"
            size="20"
            @click="copyText('no-cop')"
          />
        </div>
        <div id="no-cop" contenteditable="true">
          <div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div><div>a</div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts" setup>

const copyText = async (id: string) => {
  try {
    const element = document.getElementById(id);
    const text = element?.innerText || '';
    if (!text) {
      alert('No text to copy!');
      return;
    }
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy text: ', err);
    alert('Failed to copy text.');
  }
};
</script>

<style scoped lang="scss">
.tables-parent {
  width: 100%;
  height: 100%;
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

#with-cop, #no-cop{
  overflow-y: auto;

  @media screen and (min-width: s.$desktop-width) {
    min-height: 60vh;
    max-height: 60vh;
  }

  @media screen and (max-width: s.$mobile-width) {
    min-height: 50vh;
    max-height: 50vh;
  }
}

.tables-content {
  border: 2px solid transparent;
  flex-grow: 1;
  margin: 0 5em;

  &:hover{
    border: 2px solid c.$primary;
  }

  @media screen and (max-width: s.$mobile-width) {
    margin: 0;
  }
}

.divider {
  @media screen and (max-width: s.$mobile-width) {
    margin: 20px 0;
    width: 100%;
  }
}

.payment-category {
  display: flex;
  align-items: center;
  background-color: c.$primary;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;

  text-align: center;
  color: c.$l-text;
  font-family: "Zain", sans-serif;
  font-size: x-large;

  @media screen and (max-width: s.$mobile-width) {
    font-size: large;
  }
}

.title{
  flex-grow: 1;;
}

.copy-icon {
  position: absolute;
  right: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10%) scale(1.2);
  }
}
</style>