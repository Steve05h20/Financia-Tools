<script lang="ts" setup>
import { ref, watch } from 'vue';
import BankingInfo from './BankingInfo.vue';
import { useUserStore } from '@/stores/useUserSotre';
import { useEditStore } from '@/stores/profil/useEditStore';
import BtnAddDataForm from "./BtnAddDataForm.vue";
import useAddFormToggle from '@/services/useAddFormToggle ';
import BtnDelete from './BtnDelete.vue';

const userStore = useUserStore();
const editStore = useEditStore();
const { showForm: showBankingForm } = useAddFormToggle();

const emit = defineEmits(['validation-change']);
const bankingDetailsHaveErrors = ref(false);

const updateBankingValidation = (hasErrors: boolean) => {
  bankingDetailsHaveErrors.value = hasErrors;
  emit('validation-change', bankingDetailsHaveErrors.value);
};

watch(
  () => [userStore.user, userStore.loading, userStore.bankingDetailsService?.bankingDetails],
  ([user, loading, serviceBankingDetails]) => {
    if (user && !loading) {
      console.log('Détails bancaires après chargement:',
                JSON.stringify(userStore.user.bankingDetails, null, 2));
      console.log('Service bankingDetails:', serviceBankingDetails);

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

const initializeBankingDetails = () => {
  if (!userStore.user.bankingDetails) {
    userStore.user.bankingDetails = [];
  }

  if (userStore.user.bankingDetails.length === 0) {
    const userRef = { id: userStore.user.id } as unknown as typeof userStore.user;

    userStore.user.bankingDetails.push({
      institutionName: '',
      accountInfo: '',
      loanInfo: '',
      other: '',
      user: userRef
    });
  }

  showBankingForm.value = true;
  editStore.isEditing = true;
  console.log("Détails bancaires initialisés:", userStore.user.bankingDetails);
};

const removeBankingDetails = async (index: number) => {
  if (userStore.user?.bankingDetails && index < (userStore.user.bankingDetails?.length ?? 0)) {
    const detailsToRemove = userStore.user.bankingDetails[index];
    const userId = userStore.user.id;

    userStore.user.bankingDetails.splice(index, 1);

    if (userId) {
      try {
        await userStore.bankingDetailsService?.deleteBankingDetailsByUserId(userId);
        userStore.notificationService.message("Informations bancaires supprimées avec succès", "success");

        showBankingForm.value = false;
      } catch (error) {
        userStore.user.bankingDetails.splice(index, 0, detailsToRemove);
        const errorMessage = error instanceof Error ? error.message : "Erreur lors de la suppression des informations bancaires";
        userStore.notificationService.message(errorMessage, "error");
      }
    } else {
      showBankingForm.value = false;
      userStore.notificationService.message("Informations bancaires supprimées", "success");
    }
  }
};
</script>

<template>
  <div v-if="!showBankingForm && !userStore.loading" class="flex justify-center my-5">
    <BtnAddDataForm
      buttonText="Ajouter mes informations bancaires"
      @click="initializeBankingDetails"
    />
  </div>

  <div v-if="showBankingForm && (userStore.user?.bankingDetails?.length || 0) > 0" class="relative">
    <div v-for="(bankingDetail, index) in userStore.user.bankingDetails" :key="index" class="mb-4">

      <div class="flex justify-end mb-2" v-if="editStore.isEditing">
        <BtnDelete
          v-if="editStore.isEditing"
          @delete-confirmed="removeBankingDetails(index)"
          :modalText="'Voulez-vous vraiment supprimer ces détails bancaires?'"
          :index="`banking-${index}`"
        />
      </div>

      <BankingInfo
        :currentBankingDetails="bankingDetail"
        @validation-change="updateBankingValidation"
      />
    </div>
  </div>
</template>
