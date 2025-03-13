<script lang="ts" setup>
import Input from '../Input.vue'
</script>

<template>
  <h2>Renseignements sur l'établissement scolaire</h2>

  <div>
    <span class="label">Nom de l'établissement</span>
    <Input />
  </div>

  <div>
    <span class="label">Champ d'études</span>
    <Input />
  </div>

  <div>
    <span class="label">Date de début</span>
    <Input type="date" />
  </div>

  <div>
    <span class="label">Date de fin</span>
    <Input type="date"/>
  </div>
</template>

<style>
</style>
