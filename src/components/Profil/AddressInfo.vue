<script lang="ts" setup>
import { watch, onMounted, computed } from 'vue'
import AppLabel from '../AppLabel.vue'
import AppSelect from '../AppSelect.vue'
import InputLabelDiv from '../InputLabelDiv.vue'
import { EProvince, ECountry, EAddressType } from '@/models/address.interface'
import { useUserStore } from '@/stores/useUserSotre'
import useValidationProfil from '@/services/useValidationProfil'

const props = defineProps({
  currentAddress: {
    type: Object,
    required: true
  }
});

const userStore = useUserStore();
const validation = useValidationProfil();

onMounted(async () => {
  validation.resetErrors();
  emitValidationState();
});

const emit = defineEmits(['validation-change']);

const emitValidationState = () => {
  const hasErrors = Object.values(validation.errors.value).some(error => error !== '');
  emit('validation-change', hasErrors);
};

watch(() => validation.errors.value, () => {
  emitValidationState();
}, { deep: true });

watch(() => userStore.user.addresses?.[props.currentAddress.id]?.streetNumber, (newValue: string | undefined) => {
  if (!newValue || newValue.trim() === '') {
    validation.errors.value.streetNumber = validation.ErrorMessage.EMPTY_ADDRESS;
  } else {
    validation.validateAddress(newValue, 'streetNumber');
  }
});

watch(() => userStore.user.addresses?.[props.currentAddress.id]?.streetName, (newValue: string | undefined) => {
  if (!newValue || newValue.trim() === '') {
    validation.errors.value.streetName = validation.ErrorMessage.EMPTY_STREET;
  } else {
    validation.validateStreet(newValue, 'streetName');
  }
});

watch(() => userStore.user.addresses?.[props.currentAddress.id]?.city, (newValue: string | undefined) => {
  if (!newValue || newValue.trim() === '') {
    validation.errors.value.city = validation.ErrorMessage.EMPTY_CITY;
  } else {
    validation.validateCity(newValue, 'city');
  }
});

watch(() => userStore.user.addresses?.[props.currentAddress.id]?.province, (newValue: string | undefined) => {
  if (!newValue || newValue.trim() === '') {
    validation.errors.value.province = validation.ErrorMessage.EMPTY_SELECT;
  } else {
    validation.validateSelect(newValue, 'province');
  }
});

watch(() => userStore.user.addresses?.[props.currentAddress.id]?.country, (newValue: string | undefined) => {
  if (!newValue || newValue.trim() === '') {
    validation.errors.value.country = validation.ErrorMessage.EMPTY_SELECT;
  } else {
    validation.validateSelect(newValue, 'country');
  }
});

watch(()=> userStore.user.addresses?.[props.currentAddress.id]?.type, (newValue: string | undefined) => {
  if (!newValue || newValue.trim() === '') {
    validation.errors.value.type = validation.ErrorMessage.EMPTY_SELECT;
  } else {
    validation.validateSelect(newValue, 'type');
  }
});

</script>

<template>
  <div class="grid grid-cols-3 max-sm:grid-cols-1 gap-5 transition-all" v-if="currentAddress">

   <div>
      <InputLabelDiv
       labelText="Adresse"
       htmlFor="streetNumber"
       required
       v-model="currentAddress.streetNumber"
       placeholder="placeholder"
     />
     <div v-if="validation.errors.value.streetNumber" class="text-red-500 text-sm mt-1">
         {{ validation.errors.value.streetNumber }}
     </div>
   </div>

   <div>
     <InputLabelDiv
       labelText="Rue"
       htmlFor="streetName"
       required
       v-model="currentAddress.streetName"
       placeholder="placeholder"
     />
     <div v-if="validation.errors.value.streetName" class="text-red-500 text-sm mt-1">
         {{ validation.errors.value.streetName }}
     </div>
   </div>

   <div>
     <InputLabelDiv
       labelText="Ville"
       htmlFor="city"
       required
       v-model="currentAddress.city"
       placeholder="placeholder"
     />
     <div v-if="validation.errors.value.city" class="text-red-500 text-sm mt-1">
         {{ validation.errors.value.city }}
     </div>
   </div>

   <div>
     <AppLabel text="Province" htmlFor="province" required />
     <AppSelect
       v-model="currentAddress.province"
       placeholder="Choisissez une province"
       id="province"
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
     <div v-if="validation.errors.value.province" class="text-red-500 text-sm mt-1">
       {{ validation.errors.value.province }}
     </div>
   </div>

   <div>
     <AppLabel text="Pays" htmlFor="country" required />
     <AppSelect
       v-model="currentAddress.country"
       placeholder="Choisissez un pays"
       id="country"
       :options="[
         ECountry.CANADA
       ]"
     />
     <div v-if="validation.errors.value.country" class="text-red-500 text-sm mt-1">
       {{ validation.errors.value.country }}
     </div>
   </div>

   <div>
    <AppLabel text="Type d'adresse" htmlFor="type" required />
    <AppSelect
      v-model="currentAddress.type"
      placeholder="Choisissez un type d'adresse"
      id="type"
      :options="[
        EAddressType.PERSONAL,
        EAddressType.WORK,
      ]"
    />
    <div v-if="validation.errors.value.type" class="text-red-500 text-sm mt-1">
       {{ validation.errors.value.type }}
     </div>
   </div>

  </div>
 </template>
