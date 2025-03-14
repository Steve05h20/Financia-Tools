<script lang="ts" setup>
import Label from '../Label.vue'
import Select from '../Select.vue'
import InputLabelDiv from '../InputLabelDiv.vue'
import { ref } from 'vue'
import type { IAddress } from '@/models/address.interface'
import { EAddressType, EProvince, ECountry } from '@/models/address.interface'

const address = ref<Partial<IAddress>>({
  type: EAddressType.PERSONAL,
  streetName:'',
  streetNumber: '',
  city: '',
  province: EProvince.QC,
  country: ECountry.CA
})

</script>

<template>

  <h2 class="my-6">Addresses</h2>
 <div class="flex flex-col lg:flex-row justify-center lg:justify-start mx-auto">

    <InputLabelDiv
      labelText="Addresse"
      htmlFor="addresse"
      required
      v-model="address.streetNumber"
      placeholder="placeholder"
    />

    <InputLabelDiv
      labelText="Rue"
      htmlFor="streetName"
      required
      v-model="address.streetName"
      placeholder="placeholder"
    />


    <InputLabelDiv
      labelText="Ville"
      htmlFor="city"
      required
      v-model="address.city"
      placeholder="placeholder"
    />

  </div>

  <div class="flex flex-col lg:flex-row justify-center lg:justify-start mx-auto lg:pt-10">
    <div>
      <Label text="Province" htmlFor="province" required />
      <Select v-model="address.province" placeholder="Choisissez une province" type="select" id="province"
        :options="[
          { value: EProvince.QC, label: 'Québec' },
          { value: EProvince.ON, label: 'Ontario' },
          { value: EProvince.BC, label: 'Colombie-Britannique' },
          { value: EProvince.AB, label: 'Alberta' },
          { value: EProvince.MB, label: 'Manitoba' },
          { value: EProvince.SK, label: 'Saskatchewan, ' },
          { value: EProvince.NB, label: 'Nouveau-Brunswick' },
          { value: EProvince.NL, label: 'Terre-Neuve-et-Labrador' },
          { value: EProvince.NS, label: 'Nouvelle-Écosse' },
          { value: EProvince.PE, label: 'Île-du-Prince-Édouard' },
          { value: EProvince.NT, label: 'Territoires du Nord-Ouest' },
          { value: EProvince.YT, label: 'Yukon' },
          { value: EProvince.NU, label: 'Nunavut' }
        ]"
      />
    <div>
  </div>
      <Label text="pays" htmlFor="pays" required />
      <Select v-model="address.country" type="select" placeholder="Choisissez un pays" id="pays"
      :options="[
          { value: ECountry.CA, label: 'Canada' }
        ]"
      />

    </div>
  </div>

</template>

<style>
</style>
