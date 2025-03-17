<script lang="ts" setup>
import { ref } from 'vue'
import AppLabel from '../AppLabel.vue'
import AppSelect from '../AppSelect.vue'
import InputLabelDiv from '../InputLabelDiv.vue'
import { useValidationStore } from '@/stores/profil/validationStore'
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

const validationStore = useValidationStore();
const error = ref<{ [key: string]: string }>({});

const validateForm = () => {
  let hasError = false;
  error.value = {};

 // Validation du numéro de rue
 if (!address.value.streetNumber) {
    error.value.streetNumber = "Le numéro d'adresse est requis";
    hasError = true;
  }

  // Validation du nom de rue
  if (!address.value.streetName) {
    error.value.streetName = "Le nom de rue est requis";
    hasError = true;
  } else {
    const streetNameLengthValidation = validationStore.validateTextLength(address.value.streetName, 4, 50);
    if (!streetNameLengthValidation.isValid) {
      error.value.streetName = "Le nom de la rue doit contenir entre 4 et 50 caractères.";
      hasError = true;
    }
  }

  // Validation de la ville
  if (!address.value.city) {
    error.value.city = "La ville est requise";
    hasError = true;
  } else {
    const cityLengthValidation = validationStore.validateTextLength(address.value.city, 4, 50);
    if (!cityLengthValidation.isValid) {
      error.value.city = "La ville doit contenir entre 4 et 50 caractères.";
      hasError = true;
    }
  }

  // Validation de la province
  const provinceValidation = validationStore.validateSelect(address.value.province);
  if (!provinceValidation.isValid) {
    error.value.province = "Veuillez choisir une province.";
    hasError = true;
  }

  // Validation du pays
  const countryValidation = validationStore.validateSelect(address.value.country);
  if (!countryValidation.isValid) {
    error.value.country = "Veuillez choisir un pays.";
    hasError = true;
  }

  return !hasError;
}

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
    <div v-if="error.streetNumber" class="text-red-500 text-sm mt-1">
        {{ error.streetNumber }}
    </div>

    <InputLabelDiv
      labelText="Rue"
      htmlFor="streetName"
      required
      v-model="address.streetName"
      placeholder="placeholder"
    />
    <div v-if="error.streetName" class="text-red-500 text-sm mt-1">
        {{ error.streetName }}
    </div>


    <InputLabelDiv
      labelText="Ville"
      htmlFor="city"
      required
      v-model="address.city"
      placeholder="placeholder"
    />
    <div v-if="error.city" class="text-red-500 text-sm mt-1">
        {{ error.city }}
    </div>

    <div>
      <AppLabel text="Province" htmlFor="province" required />
      <AppSelect v-model="address.province" placeholder="Choisissez une province" id="province"
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
    <div v-if="error.province" class="text-red-500 text-sm mt-1">
        {{ error.province }}
    </div>
    <div>

        <AppLabel text="pays" htmlFor="pays" required />
        <AppSelect v-model="address.country" placeholder="Choisissez un pays" id="pays"
        :options="[
          ECountry.CANADA
          ]"
        />
        <div v-if="error.contry" class="text-red-500 text-sm mt-1">
            {{ error.contry }}
        </div>


      </div>

</div>
</template>

<style>
</style>
