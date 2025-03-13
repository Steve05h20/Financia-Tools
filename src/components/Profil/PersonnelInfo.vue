<script lang="ts" setup>
import Input from '../Input.vue'
import Label from '../Label.vue'
</script>

<template>

    <h2 class="my-8">Renseignements personnels</h2>

    <div class="flex flex-col lg:flex-row justify-center lg:justify-start mx-auto">
      <div>
        <Label text="Nom" htmlFor="name" required />
        <Input id="name" />
      </div>

      <div>
        <Label text="Prénom" htmlFor="firstName" required />
        <Input id="firstName" />
      </div>

      <div>
        <Label text="Date de naissance" htmlFor="dob" required />
        <Input type="date" id="dob" />
      </div>

    </div>

    <div class="flex flex-col lg:flex-row justify-center lg:justify-start lg:pt-10 mx-auto w-full">
      <div>
        <Label text="Numéro de téléphone" htmlFor="tel" required />
        <Input type="tel"/>
      </div>

      <div>
        <Label text="Adresse courriel" htmlFor="email" required />
        <Input type="email" id="email" />
      </div>

    </div>
</template>

<style>
</style>
