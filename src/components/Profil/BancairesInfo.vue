<script lang="ts" setup>
import Input from '../Input.vue';
import Label from '../Label.vue';
</script>

<template>
  <div class="flex flex-col justify-center mx-auto max-w-lg">
    <h2 class="my-6">Renseignements bancaires</h2>

    <div>
      <Label text="Institution bancaire" htmlFor="bankingInst" required />
      <Input id="bankingInst" />
    </div>

    <div>
      <Label text="Numéro de compte" htmlFor="accountNb" required />
      <Input id="accountNb" />
    </div>
  </div>


</template>

<style>
</style>
