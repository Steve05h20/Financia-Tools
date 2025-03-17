<script lang="ts" setup>
import InputLabelDiv from '../InputLabelDiv.vue';
import { useValidationStore } from '@/stores/profil/validationStore';
import { ref } from 'vue';
import type { IBankingDetails } from '@/models/bankingDetails.interface'

const bankingDetails= ref<Partial<IBankingDetails>>({
  institutionName: '',
  accountinfo: ''
})

const validationStore = useValidationStore();
const errors = ref<{ [key: string]: string }>({
  institutionName: '',
  accountinfo: ''
});

const validateinstitutionName = () => {
  if(!bankingDetails.value.institutionName) {
    errors.value.institutionName = "Le nom de l'institution est requis";
    return;
  }

  errors.value.institutionName = validationStore.validateTextLength(
    bankingDetails.value.institutionName, 2, 50
  );
};

const validateAccountInfo = () => {
  errors.value.accountinfo = validationStore.validateAccountInfo(bankingDetails.value.accountinfo);
}

/*
For validation tests

const validateForm = () => {
  validateinstitutionName();
  validateAccountInfo();
};

const isFormValid = () => {
  return Object.values(errors.value).every(error => error === '');
}; */

</script>


<template>
  <div class="grid grid-cols-2 max-sm:grid-cols-1 gap-5 transition-all">

    <div>
      <InputLabelDiv
        labelText="Nom de l'institution"
        htmlFor="institutionName"
        required
        v-model="bankingDetails.institutionName"
        placeholder="placeholder"
        @input="validateinstitutionName"
        @blur="validateinstitutionName"
      />
      <div v-if="errors.institutionName" class="text-red-500 text-sm mt-1">
        {{ errors.institutionName }}
      </div>
    </div>

    <div>
       <InputLabelDiv
        labelText="Numéro de compte"
        htmlFor="accountinfo"
        required
        v-model="bankingDetails.accountinfo"
        placeholder="placeholder"
        @input="validateAccountInfo"
        @blur="validateAccountInfo"
      />
      <div v-if="errors.accountinfo" class="text-red-500 text-sm mt-1">
        {{ errors.accountinfo }}
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
