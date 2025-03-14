<script lang="ts" setup>
import Input from '../Input.vue'
import Label from '../Label.vue'
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
    <div>
      <Label text="Addresse" htmlFor="addresse" required />
      <Input v-model="address" type="text" placeholder="placeholder" id="addresse" />
    </div>

    <div>
      <Label text="rue" htmlFor="streetName" required />
      <Input v-model="address.streetName" type="text" placeholder="placeholder" id="streetName" />
    </div>

    <div>
      <Label text="ville" htmlFor="city" required />
      <Input v-model="address.city" type="text" placeholder="placeholder" id="ville" />
    </div>
  </div>

  <div class="flex flex-col lg:flex-row justify-center lg:justify-start mx-auto lg:pt-10">
    <div>
      <Label text="province" htmlFor="province" required />
      <Input v-model="address.province" type="select" placeholder="Choisir une province" id="province"
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
      <Input type="select" placeholder="placeholder" id="pays"
      :options="[
          { value: ECountry.CA, label: 'Canada' }
        ]"
      />

    </div>
  </div>

</template>

<style>
</style>
