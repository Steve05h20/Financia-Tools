<script lang="ts" setup>
import AppLabel from '../AppLabel.vue'
import AppSelect from '../AppSelect.vue'
import InputLabelDiv from '../InputLabelDiv.vue'
import { ref } from 'vue'
import type { IAddress } from '@/models/address.interface'
import { EAddressType, EProvince, ECountry } from '@/models/address.interface'

const address = ref<Partial<IAddress>>({
  type: EAddressType.PERSONAL,
  streetName:'',
  streetNumber: '',
  city: '',
  province: EProvince.QUEBEC,
  country: ECountry.CANADA
})

</script>

<template>
 <div class="grid grid-cols-3 max-sm:grid-cols-1 gap-5 transition-all">

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

    <div>
      <AppLabel text="Province" htmlFor="province" required />
      <AppSelect v-model="address.province" placeholder="Choisissez une province" type="select" id="province"
        :options="[
          EProvince.QUEBEC,
          EProvince.ONTARIO,
          EProvince.BRITISH_COLUMBIA,
          EProvince.ALBERTA,
          EProvince.MANITOBA,
          EProvince.SASKATCHEWAN,
          EProvince.NEW_BRUNSWICK,
          EProvince.NEWFOUNDLAND_LABRADOR,
          EProvince.NOVA_SCOTIA,
          EProvince.PRINCE_EDWARD_ISLAND,
          EProvince.NORTHWEST_TERRITORIES,
          EProvince.NUNAVUT,
          EProvince.YUKON
        ]"
      />
    </div>
    <div>

              <AppLabel text="pays" htmlFor="pays" required />
            <AppSelect v-model="address.country" type="select" placeholder="Choisissez un pays" id="pays"
            :options="[
              ECountry.CANADA
              ]"
            />

          </div>

</div>

</template>

<style>
</style>
