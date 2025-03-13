<script lang="ts" setup>
import Input from '../Input.vue'
</script>

<template>

  <h2 class="my-6">Renseignements sur l'établissement scolaire</h2>
  <div class="flex flex-col justify-center mx-auto max-w-lg">
    <div>
      <span class="label w-full">Nom de l'établissement</span>
      <Input />
    </div>

    <div>
      <span class="label w-full">Champ d'études</span>
      <Input />
    </div>

    <div>
      <span class="label w-full">Date de début</span>
      <Input type="date" />
    </div>

    <div>
      <span class="label w-full">Date de fin</span>
      <Input type="date"/>
    </div>
  </div>

</template>

<style>
</style>
