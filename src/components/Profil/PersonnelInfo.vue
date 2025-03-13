<script lang="ts" setup>
import Input from '../Input.vue'
</script>

<template>

    <h2 class="my-8">Renseignements personnels</h2>

    <div class="flex flex-col lg:flex-row justify-center lg:justify-start mx-auto">
      <div>
        <span class="label w-full">Nom</span>
        <Input />
      </div>

      <div>
        <span class="label w-full">Prénom</span>
        <Input />
      </div>

      <div>
        <span class="label w-full">Date de naissance</span>
        <Input type="date" />
      </div>

    </div>

    <div class="flex flex-col lg:flex-row justify-center lg:justify-start lg:pt-10 mx-auto w-full">
      <div>
        <span class="label w-full">Numéro de téléphone</span>
        <Input type="tel"/>
      </div>

      <div>
        <span class="label w-full">Adresse email</span>
        <Input type="email" />
      </div>

    </div>
</template>

<style>
</style>
