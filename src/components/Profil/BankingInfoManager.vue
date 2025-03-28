<script lang="ts" setup>
import { ref, watch } from 'vue';
import BankingInfo from './BankingInfo.vue';
import { useUserStore } from '@/stores/useUserSotre';
import { useEditStore } from '@/stores/profil/useEditStore';
import BtnAddDataForm from "./BtnAddDataForm.vue";
import useAddFormToggle from '@/services/useAddFormToggle ';

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
    userStore.user.bankingDetails.push({
      institutionName: '',
      accountInfo: '',
      user: { id: userStore.user.id } as any
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

    // Supprimer d'abord de l'UI
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
      <!-- Bouton de suppression -->
      <div class="flex justify-end mb-2" v-if="editStore.isEditing">
        <button
          @click="removeBankingDetails(index)"
          class="btn btn-error btn-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
            <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
          </svg>
          Supprimer
        </button>
      </div>

      <BankingInfo
        :currentBankingDetails="bankingDetail"
        @validation-change="updateBankingValidation"
      />
    </div>
  </div>
</template>
