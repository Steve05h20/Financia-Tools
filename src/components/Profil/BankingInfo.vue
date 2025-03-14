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
  <div class="flex flex-col justify-center mx-auto max-w-lg">
    <h2 class="my-6">Renseignements bancaires</h2>

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
