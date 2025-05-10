<template>
  <v-card>
    <div>
      <div>
        <v-textarea 
          class="text-area"
          :label="$labels.outputconfig_change_price_label" 
          :hint="$labels.outputconfig_change_price_hint"
        >
        </v-textarea>
      </div>
      <div>
        <v-textarea 
          class="text-area"
          :label="$labels.outputconfig_change_total_label" 
          :hint="$labels.outputconfig_change_total_hint"
        >
        </v-textarea>
      </div>
      <div>
        <v-textarea 
          class="text-area"
          :label="$labels.outputconfig_change_discount_price_label" 
          :hint="$labels.outputconfig_change_discount_price_hint"
        >
      </v-textarea>
      </div>
      <div>
        <v-textarea 
          class="text-area"
          :label="$labels.outputconfig_change_discount_label" 
          :hint="$labels.outputconfig_change_discount_hint"
        >
        </v-textarea>
      </div>
      <div>
        <v-textarea 
          class="text-area"
          :label="$labels.outputconfig_change_discount_duration_label" 
          :hint="$labels.outputconfig_change_discount_duration_hint"
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

function handleSave(){
  console.log('Save clicked');
}
</script>

<style lang="scss" scoped>
.text-area{
  margin-bottom: 1rem;
}
</style>