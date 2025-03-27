<script lang="ts" setup>
import InputLabelDiv from '../InputLabelDiv.vue';
import { watch, onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/useUserSotre'
import useValidationProfil from '@/services/useValidationProfil'
import { useEditStore } from '@/stores/profil/useEditStore';
import useAddFormToggle from '@/services/useAddFormToggle '
import BtnAddDataForm from "./BtnAddDataForm.vue";

const userStore = useUserStore();
const editStore = useEditStore();
const validation = useValidationProfil();
const { showForm: showBankingForm } = useAddFormToggle();

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

watch(
  () => [userStore.user, userStore.loading, userStore.bankingDetailsService?.bankingDetails],
  ([user, loading, serviceBankingDetails]) => {
    if (user && !loading) {
      console.log('Détails bancaires après chargement:',
                JSON.stringify(userStore.user.bankingDetails, null, 2));
      console.log('Service bankingDetails:', serviceBankingDetails);

      // Vérifie les détails dans userStore ET dans le service
      if ((userStore.user.bankingDetails && userStore.user.bankingDetails.length > 0) ||
          serviceBankingDetails) {
        console.log('Détails bancaires trouvés, affichage du formulaire');
        showBankingForm.value = true;
      } else {
        console.log('Aucun détail bancaire trouvé');
        showBankingForm.value = false;
      }
    }
  },
  { immediate: true }
);

// Fonction pour initialiser les détails bancaires
const initializeBankingDetails = () => {

  if (!userStore.user.bankingDetails) {
    userStore.user.bankingDetails = [];
  }

  if (userStore.user.bankingDetails.length === 0) {
    userStore.user.bankingDetails.push({
      institutionName: '',
      accountInfo: '',
      user: { id: userStore.user.id } as any
    });
  }

  showBankingForm.value = true;
  editStore.isEditing = true;
  console.log("Détails bancaires initialisés:", userStore.user.bankingDetails);
}

watch(() => userStore.user.bankingDetails?.[0]?.institutionName, (newValue: string | undefined) => {
  if (!newValue || newValue.trim() === '') {
    validation.validateInstitutionName(newValue, 'institutionName');
  } else {
    validation.validateTextLength(newValue, 2, 50, 'institutionName');
  }
});

watch(() => userStore.user.bankingDetails?.[0]?.accountInfo, (newValue: string | undefined) => {
  if (!newValue || newValue.trim() === '') {
    validation.errors.value.accountInfo = validation.ErrorMessage.EMPTY_ACCOUNT_INFO;
  } else {
    validation.validateAccountInfo(newValue, 'accountInfo');
  }
});

</script>


<template>
  <div v-if="!showBankingForm && !userStore.loading" class="flex justify-center my-5">
    <BtnAddDataForm
      buttonText="Ajouter mes informations bancaires"
      @click="initializeBankingDetails"
    />
  </div>

  <div v-if="showBankingForm" class="grid grid-cols-2 max-sm:grid-cols-1 gap-5 transition-all">
    <div v-if="userStore.user && userStore.user.bankingDetails && userStore.user.bankingDetails.length > 0">
      <InputLabelDiv
        labelText="Nom de l'institution"
        htmlFor="institutionName"
        required
        v-model="userStore.user.bankingDetails[0].institutionName"
        placeholder="Entrez le nom de votre institution bancaire"
        :disabled="!editStore.isEditing"
      />
      <div v-if="validation.errors.value.institutionName" class="text-red-500 text-sm mt-1">
        {{ validation.errors.value.institutionName }}
      </div>
    </div>

    <div v-if="userStore.user && userStore.user.bankingDetails && userStore.user.bankingDetails.length > 0">
       <InputLabelDiv
        labelText="Numéro de compte"
        htmlFor="accountInfo"
        required
        v-model="userStore.user.bankingDetails[0].accountInfo"
        placeholder="Entrez votre numéro de compte"
        :disabled="!editStore.isEditing"
      />
      <div v-if="validation.errors.value.accountInfo" class="text-red-500 text-sm mt-1">
        {{ validation.errors.value.accountInfo }}
      </div>
    </div>
  </div>
</template>

<style>
</style>
