<script lang="ts" setup>
import Input from '../Input.vue'
</script>

<template>

  <h2 class="my-6">Addresses</h2>
 <div class="flex flex-col lg:flex-row justify-center lg:justify-start mx-auto">
    <div>
      <span class="label w-full">Adresse</span>
      <Input />
    </div>

    <div>
      <span class="label w-full">Rue</span>
      <Input />
    </div>

    <div>
      <span class="label w-full">Ville</span>
      <Input />
    </div>
  </div>

  <div class="flex flex-col lg:flex-row justify-center lg:justify-start mx-auto lg:pt-10">
    <div>
      <span class="label w-full">Province</span>
      <Input />
    </div>

    <div>
      <span class="label w-full">Pays</span>
      <Input />
    </div>
  </div>

</template>

<style>
</style>
