<script lang="ts" setup>
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


    <div class="grid grid-cols-3 max-sm:grid-cols-1 gap-5 transition-all">
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
