<script setup lang="ts">
import { RouterView } from 'vue-router'
import { EAddressType } from './models/address.interface'
import { useFetchAddress } from './services/useFetchAddress'

const useAddressService = useFetchAddress()
const newAddress = {
  streetNumber: '999',
  streetName: 'string',
  city: 'Drummondville',
  province: 'QC',
  type: 'PERSONAL',
}
const { addresses } = useAddressService
useAddressService.deleteAddressByType(1, EAddressType.WORK)
</script>

<template>
  <h1>{{ addresses }}</h1>
  <p :v-if="useAddressService.error.value">{{ useAddressService.error }}</p>
  <a class="link m-2" href="/profile">profil </a>
  <a class="link m-2" href="/budget">budget </a>
  <a class="link m-2" href="/">Home d</a>

  <button class="btn btn-secondary text-secondary">hallo</button>
  <RouterView />
</template>
