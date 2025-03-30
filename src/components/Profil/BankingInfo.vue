<script lang="ts" setup>
import InputLabelDiv from '../InputLabelDiv.vue';
import { watch, onMounted } from 'vue';
import { useEditStore } from '@/stores/profil/useEditStore';
import useValidationProfil from '@/services/useValidationProfil';

const props = defineProps({
  currentBankingDetails: {
    type: Object,
    required: true
  }
});

const editStore = useEditStore();
const validation = useValidationProfil();

onMounted(() => {
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

watch(() => props.currentBankingDetails?.institutionName, (newValue: string | undefined) => {
  if (!newValue || newValue.trim() === '') {
    validation.validateInstitutionName(newValue, 'institutionName');
  } else {
    validation.validateTextLength(newValue, 2, 50, 'institutionName');
  }
});

watch(() => props.currentBankingDetails?.accountInfo, (newValue: string | undefined) => {
  if (!newValue || newValue.trim() === '') {
    validation.errors.value.accountInfo = validation.ErrorMessage.EMPTY_ACCOUNT_INFO;
  } else {
    validation.validateAccountInfo(newValue, 'accountInfo');
  }
});

watch(() => props.currentBankingDetails?.loanInfo, (newValue: string | undefined) => {
    validation.validateNonRequiredTextLength(newValue, 2, 50, 'loanInfo');
});

watch(() => props.currentBankingDetails?.other, (newValue: string | undefined) => {
    validation.validateNonRequiredTextLength(newValue, 2, 50, 'other');
});

</script>

<template>
  <div class="grid grid-cols-2 max-sm:grid-cols-1 gap-5 transition-all">
    <div>
      <InputLabelDiv
        labelText="Nom de l'institution"
        htmlFor="institutionName"
        required
        v-model="currentBankingDetails.institutionName"
        placeholder="Entrez le nom de votre institution bancaire"
        :disabled="!editStore.isEditing"
        :hasError="!!validation.errors.value.institutionName"
        :errorMessage="validation.errors.value.institutionName"
      />
    </div>

    <div>
       <InputLabelDiv
        labelText="Numéro de compte"
        htmlFor="accountInfo"
        required
        v-model="currentBankingDetails.accountInfo"
        placeholder="Entrez votre numéro de compte"
        :disabled="!editStore.isEditing"
        :hasError="!!validation.errors.value.accountInfo"
        :errorMessage="validation.errors.value.accountInfo"
      />
    </div>
    <div>
       <InputLabelDiv
        labelText="Numéro de prêt"
        htmlFor="loanInfo"
        v-model="currentBankingDetails.loanInfo"
        placeholder="Entrez votre numéro de prêt"
        :disabled="!editStore.isEditing"
        :hasError="!!validation.errors.value.loanInfo"
        :errorMessage="validation.errors.value.loanInfo"
      />
    </div>
    <div>
       <InputLabelDiv
        labelText="Autre information"
        htmlFor="other"
        v-model="currentBankingDetails.other"
        placeholder="Autre information"
        :disabled="!editStore.isEditing"
        :hasError="!!validation.errors.value.other"
        :errorMessage="validation.errors.value.other"
      />
    </div>
  </div>
</template>
