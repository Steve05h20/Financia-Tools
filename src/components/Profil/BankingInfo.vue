<script lang="ts" setup>
import InputLabelDiv from '../InputLabelDiv.vue';
import { ref, onMounted } from 'vue';
import type { IBankingDetails } from '@/models/bankingDetails.interface'
import { useValidationStore } from '@/stores/profil/UseValidationStore'
import { useEditStore } from '@/stores/profil/useEditStore'
import { useUserStore } from '@/stores/useUserSotre'

const validationStore = useValidationStore();
const editStore = useEditStore();
const userStore = useUserStore();

const bankingDetails= ref<Partial<IBankingDetails>>({
  institutionName: '',
  accountinfo: ''
})

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

const validateForm = () => {
  validateinstitutionName();
  validateAccountInfo();

  return isFormValid();
};

const isFormValid = () => {
  return Object.values(errors.value).every(error => error === '');
};

onMounted(() => {
  editStore.registerValidation(validateForm);
});

</script>


<template>
  <div class="grid grid-cols-2 max-sm:grid-cols-1 gap-5 transition-all">

    <div v-if="userStore.user && userStore.user.bankingDetails && userStore.user.bankingDetails.length > 0">
      <InputLabelDiv
        labelText="Nom de l'institution"
        htmlFor="institutionName"
        required
        v-model="userStore.user.bankingDetails[0].institutionName"
        placeholder="placeholder"
        @input="validateinstitutionName"
        @blur="validateinstitutionName"
      />
      <div v-if="errors.institutionName" class="text-red-500 text-sm mt-1">
        {{ errors.institutionName }}
      </div>
    </div>

    <div v-if="userStore.user && userStore.user.bankingDetails && userStore.user.bankingDetails.length > 0">
       <InputLabelDiv
        labelText="Numéro de compte"
        htmlFor="accountinfo"
        required
        v-model="userStore.user.bankingDetails[0].accountinfo"
        placeholder="placeholder"
        @input="validateAccountInfo"
        @blur="validateAccountInfo"
      />
      <div v-if="errors.accountinfo" class="text-red-500 text-sm mt-1">
        {{ errors.accountinfo }}
      </div>
    </div>

  </div>
</template>

<style>
</style>
