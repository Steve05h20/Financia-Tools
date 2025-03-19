<script lang="ts" setup>
import { ref } from 'vue'
import AppLabel from '../AppLabel.vue'
import AppSelect from '../AppSelect.vue'
import InputLabelDiv from '../InputLabelDiv.vue'
import { useValidationStore } from '@/stores/profil/UseValidationStore'
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
const errors = ref<{ [key: string]: string }>({
  streetNumber: '',
  streetName: '',
  city: '',
  province: '',
  country: ''
});

const validateStreetNumber = () => {
  errors.value.streetNumber = address.value.streetNumber ? '' : "Le numéro de rue est requis";
};

const validateStreetName = () => {
  if(!address.value.streetName) {
    errors.value.streetName = "Le nom de rue est requis";
    return;
  }

  errors.value.streetName = validationStore.validateTextLength(
    address.value.streetName, 2, 50
  );
};

const validateCity = () => {
  if(!address.value.city) {
    errors.value.city = "La ville est requise";
    return;
  }
  errors.value.city = validationStore.validateTextLength(
    address.value.city, 2, 50
  );
};

const validateProvince = () => {
  errors.value.province = validationStore.validateSelect(address.value.province);
};

const validateCountry = () => {
  errors.value.country = validationStore.validateSelect(address.value.country);
};

/*
For validation tests

const validateForm = () => {
  validateStreetNumber();
  validateStreetName();
  validateCity();
  validateProvince();
  validateCountry();

  return validationStore.isFormValid(errors.value);
};

const isFormValid = () => {
  return Object.values(errors.value).every(error => error === '');
}; */
</script>

<template>
 <div class="grid grid-cols-3 max-sm:grid-cols-1 gap-5 transition-all">

  <div>
     <InputLabelDiv
      labelText="Addresse"
      htmlFor="addresse"
      required
      v-model="address.streetNumber"
      placeholder="placeholder"
      @input="validateStreetNumber"
      @blur="validateStreetNumber"
    />
    <div v-if="errors.streetNumber" class="text-red-500 text-sm mt-1">
        {{ errors.streetNumber }}
    </div>
  </div>


  <div>
    <InputLabelDiv
      labelText="Rue"
      htmlFor="streetName"
      required
      v-model="address.streetName"
      placeholder="placeholder"
      @input="validateStreetName"
      @blur="validateStreetName"
    />
    <div v-if="errors.streetName" class="text-red-500 text-sm mt-1">
        {{ errors.streetName }}
    </div>
  </div>


  <div>
    <InputLabelDiv
      labelText="Ville"
      htmlFor="city"
      required
      v-model="address.city"
      placeholder="placeholder"
      @input="validateCity"
      @blur="validateCity"
    />
    <div v-if="errors.city" class="text-red-500 text-sm mt-1">
        {{ errors.city }}
    </div>
  </div>


    <div>
      <AppLabel text="Province" htmlFor="province" required />
      <AppSelect
        v-model="address.province"
        placeholder="Choisissez une province"
        id="province"
        @change="validateProvince"
        @blur="validateProvince"
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
    <div v-if="errors.province" class="text-red-500 text-sm mt-1">
        {{ errors.province }}
    </div>
    <div>
      <AppLabel text="pays" htmlFor="pays" required />
      <AppSelect
        v-model="address.country"
        placeholder="Choisissez un pays"
        id="pays"
        @change="validateCountry"
        @blur="validateCountry"
        :options="[
          ECountry.CANADA
          ]"
      />
      <div v-if="errors.country" class="text-red-500 text-sm mt-1">
          {{ errors.country }}
      </div>


    </div>

</div>
<!--
  For validation tests

  <button
    @click="validateForm"
    class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    :disabled="!isFormValid()"
  >
    Valider
  </button> -->
</template>

<style>
</style>
