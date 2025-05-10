<template>
  <v-card>
    <div>
      <div>
        <v-textarea 
          class="text-area"
          color="primary"
          :label="$labels.outputconfig_change_price_label" 
          :hint="$labels.outputconfig_change_price_hint"
          v-model="globalConfig.customOutputTemplates.ageFormatter"
        >
        </v-textarea>
      </div>
      <div>
        <v-textarea 
          class="text-area"
          color="primary"
          :label="$labels.outputconfig_change_total_label" 
          :hint="$labels.outputconfig_change_total_hint"
          v-model="globalConfig.customOutputTemplates.totalsFormatter.total"
        >
        </v-textarea>
      </div>
      <div>
        <v-textarea 
          class="text-area"
          color="primary"
          :label="$labels.outputconfig_change_discount_price_label" 
          :hint="$labels.outputconfig_change_discount_price_hint"
          v-model="globalConfig.customOutputTemplates.totalsFormatter.discount"
        >
      </v-textarea>
      </div>
      <div>
        <v-textarea 
          class="text-area"
          color="primary"
          :label="$labels.outputconfig_change_discount_label" 
          :hint="$labels.outputconfig_change_discount_hint"
          v-model="globalConfig.customOutputTemplates.totalsFormatter.afterDiscount"
        >
        </v-textarea>
      </div>
      <div>
        <v-textarea 
          class="text-area"
          color="primary"
          :label="$labels.outputconfig_change_discount_duration_label" 
          :hint="$labels.outputconfig_change_discount_duration_hint"
          v-model="globalConfig.customOutputTemplates.totalsFormatter.noDiscount"
        >
        </v-textarea>
      </div>
    </div>

    <template v-slot:actions>
      <v-btn @click="$emit('close')" text="Cancelar"></v-btn>
      <v-btn @click="()=> {handleSave(); $emit('close')}" text="Salvar"></v-btn>
    </template>
  </v-card>
</template>

<script lang="ts" setup>
import { useGlobalConfigStore } from '@/stores/globalConfig';

const globalConfig = useGlobalConfigStore();

function handleSave(){
  console.log('Save clicked');
}
</script>

<style lang="scss" scoped>
.text-area{
  margin-bottom: 1rem;
}
</style>