<script lang="ts" setup>
import Input from '../Input.vue';
import Label from '../Label.vue';
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

    <div>
      <Label text="Institution bancaire" htmlFor="institutionName" required />
      <Input v-model="bankingDetails.institutionName" placeholder="placeholder" id="institutionName" />
    </div>

    <div>
      <Label text="Numéro de compte" htmlFor="accountinfo" required />
      <Input v-model="bankingDetails.accountinfo" placeholder="placeholder" id="accountinfo" />
    </div>
  </div>


</template>

<style>
</style>
