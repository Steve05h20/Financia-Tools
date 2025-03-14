<script lang="ts" setup>
import Input from '../Input.vue'
import Label from '../Label.vue'
import InputLabelDiv from '../InputLabelDiv.vue'
import { ref } from 'vue'
import type { IUser} from '@/models/user.interface'

const user = ref<Partial<IUser>>({
  lastName: '',
  firstName: '',
  birthDate: undefined,
  phone: '',
  email: ''
})
</script>

<template>

    <h2 class="my-8">Renseignements personnels</h2>

    <div class="flex flex-col lg:flex-row justify-center lg:justify-start mx-auto">
      <InputLabelDiv
        labelText="Nom de famille"
        htmlFor="lastName"
        required
        v-model="user.lastName"
        placeholder="placeholder"
      />

      <InputLabelDiv
        labelText="Prénom"
        htmlFor="firstName"
        required
        v-model="user.firstName"
        placeholder="placeholder"
      />

      <InputLabelDiv
        labelText="Date de naissance"
        htmlFor="birthDate"
        required
        v-model="user.birthDate"
        placeholder="placeholder"
        type="date"
      />

    </div>

    <div class="flex flex-col lg:flex-row justify-center lg:justify-start lg:pt-10 mx-auto w-full">
      <InputLabelDiv
        labelText="Téléphone"
        htmlFor="phone"
        required
        v-model="user.phone"
        placeholder="placeholder"
        type="tel"
      />

     <InputLabelDiv
        labelText="Courriel"
        htmlFor="email"
        required
        v-model="user.email"
        placeholder="placeholder"
        type="email"
    />

    </div>
</template>

<style>
</style>
