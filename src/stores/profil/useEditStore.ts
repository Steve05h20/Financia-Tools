import { defineStore } from "pinia";
import { ref } from 'vue';
import { useUserStore } from '@/stores/useUserSotre';
import useValidationProfil from "@/services/useValidationProfil";

export const useEditStore = defineStore('edit', () => {
  const validation = useValidationProfil();
  const isEditing = ref<boolean>(false);
  const userStore = useUserStore();

  const toggleEditing = (): void => {
    isEditing.value = !isEditing.value;
  };

  const saveChanges = async (): Promise<void> => {

    if (!validation.validateAll(userStore.user)) {
      userStore.notificationService.message("Veuillez corriger les erreurs avant de sauvegarder", "error");
      return;
    }

    const success = await userStore.updateUserData();
    if (success) {
      isEditing.value = false;
    }
  };

  return {
    isEditing,
    toggleEditing,
    saveChanges
  };
});
