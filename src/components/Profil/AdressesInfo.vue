<script lang="ts" setup>
import Input from '../Input.vue'
</script>

<template>
  <div class="flex flex-col justify-center mx-auto max-w-lg">
    <h2 class="my-6">Addresses</h2>

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
