<script lang="ts" setup>
import Input from '../Input.vue'
</script>

<template>
  <h2>Renseignements personnels</h2>

  <div>
    <span class="label">Nom</span>
    <Input />
  </div>

  <div>
    <span class="label">Prénom</span>
    <Input />
  </div>

  <div>
    <span class="label">Date de naissance</span>
    <Input type="date" />
  </div>

  <div>
    <span class="label">Numéro de téléphone</span>
    <Input type="tel"/>
  </div>

  <div>
    <span class="label">Adresse email</span>
    <Input type="email" />
  </div>
</template>

<style>
</style>
