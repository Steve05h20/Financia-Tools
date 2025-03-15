<script lang="ts" setup>
import InputLabelDiv from '../InputLabelDiv.vue';
import { ref } from 'vue';
import type { IBankingDetails } from '@/models/bankingDetails.interface'

const bankingDetails= ref<Partial<IBankingDetails>>({
  institutionName: '',
  accountinfo: ''
})

</script>


<template>
  <div class="grid grid-cols-2 max-sm:grid-cols-1 gap-5 transition-all">

    <InputLabelDiv
      labelText="Nom de l'institution"
      htmlFor="institutionName"
      required
      v-model="bankingDetails.institutionName"
      placeholder="placeholder"
    />

   <InputLabelDiv
      labelText="Numéro de compte"
      htmlFor="accountinfo"
      required
      v-model="bankingDetails.accountinfo"
      placeholder="placeholder"
    />

  </div>


</template>

<style>
</style>
