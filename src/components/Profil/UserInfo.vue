<script lang="ts" setup>
import Input from '../Input.vue'
import Label from '../Label.vue'
import { ref } from 'vue'
import type { IUser} from '@/models/user.interface'

const user = ref<Partial<IUser>>({
  lastName: '',
  firstName: '',
  birthDate: new Date(),
  phone: '',
  email: ''
})
</script>

<template>

    <h2 class="my-8">Renseignements personnels</h2>

    <div class="flex flex-col lg:flex-row justify-center lg:justify-start mx-auto">
      <div>
        <Label text="Nom" htmlFor="lastName" required />
        <Input v-model="user.lastName" placeholder="placeholder" id="lastName" />
      </div>

      <div>
        <Label text="Prénom" htmlFor="firstName" required />
        <Input v-model="user.firstName" placeholder="placeholder" id="firstName" />
      </div>

      <div>
        <Label text="Date de naissance" htmlFor="birthDate" required />
        <Input v-model="user.birthDate" placeholder="placeholder" type="date" id="birthDate" />
      </div>

    </div>

    <div class="flex flex-col lg:flex-row justify-center lg:justify-start lg:pt-10 mx-auto w-full">
      <div>
        <Label text="Numéro de téléphone" htmlFor="phone" required />
        <Input v-model="user.phone" placeholder="placeholder" type="tel" id="phone"/>
      </div>

      <div>
        <Label text="Adresse courriel" htmlFor="email" required />
        <Input v-model="user.email" placeholder="placeholder" type="email" id="email" />
      </div>

    </div>
</template>

<style>
</style>
