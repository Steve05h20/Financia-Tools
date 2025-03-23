<script lang="ts" setup>
import InputLabelDiv from '../InputLabelDiv.vue';
import { watch, onMounted } from 'vue';
import { useUserStore } from '@/stores/useUserSotre'
import useValidationProfil from '@/services/useValidationProfil'

const userStore = useUserStore();
const validation = useValidationProfil();

onMounted(() => {
  validation.resetErrors();
})

watch(() => userStore.user.bankingDetails?.[0]?.institutionName, (newValue: string | undefined) => {
  if (!newValue || newValue.trim() === '') {
    validation.validateInstitutionName(newValue, 'institutionName');
  } else {
    validation.validateTextLength(newValue, 2, 50, 'institutionName');
  }
});

watch(() => userStore.user.bankingDetails?.[0]?.accountinfo, (newValue: string | undefined) => {
  if (!newValue || newValue.trim() === '') {
    validation.errors.value.accountinfo = validation.ErrorMessage.EMPTY_ACCOUNT_INFO;
  } else {
    validation.validateAccountinfo(newValue, 'accountinfo');
  }
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
      />
      <div v-if="validation.errors.value.institutionName" class="text-red-500 text-sm mt-1">
        {{ validation.errors.value.institutionName }}
      </div>
    </div>

    <div v-if="userStore.user && userStore.user.bankingDetails && userStore.user.bankingDetails.length > 0">
       <InputLabelDiv
        labelText="Numéro de compte"
        htmlFor="accountinfo"
        required
        v-model="userStore.user.bankingDetails[0].accountinfo"
        placeholder="placeholder"
      />
      <div v-if="validation.errors.value.accountinfo" class="text-red-500 text-sm mt-1">
        {{ validation.errors.value.accountinfo }}
      </div>
    </div>

  </div>
</template>

<style>
</style>
