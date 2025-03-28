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

    try {


      /* Steve Debug
      Méthodes PUT  */


      const userId = userStore.user.id;
      if (userId === undefined || userId === null) {
        throw new Error("ID utilisateur non défini");
      }

      await userStore.userService.PUT_USER_BY_ID(Number(userId),
          {
            id:userId, firstName:userStore.user.firstName,
            lastName:userStore.user.lastName,
            isActive:userStore.user.isActive,
            email:userStore.user.email,
            password:userStore.user.password,
            phone:userStore.user.phone,
            birthDate:userStore.user.birthDate
          });


       if (userStore.user.schoolDetails && userStore.user.schoolDetails.length > 0) {
        await userStore.schoolDetailsService.PUT_SCHOOL_DETAILS_BY_USER_ID(userId, {
          schoolName: userStore.user.schoolDetails[0].schoolName,
          fieldOfStudy: userStore.user.schoolDetails[0].fieldOfStudy,
          startDate: userStore.user.schoolDetails[0].startDate,
          projectedEndDate: userStore.user.schoolDetails[0].projectedEndDate,
      })}

      if (userStore.user.bankingDetails && userStore.user.bankingDetails.length > 0) {
        await userStore.bankingDetailsService.putBankingDetailsByUserId(userId,{
          institutionName:userStore.user.bankingDetails[0].institutionName,
          accountInfo:userStore.user.bankingDetails[0].accountInfo,
        }
        );
      }

      isEditing.value = false;

      userStore.notificationService.message("Les modifications ont été enregistrées avec succès", "success");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erreur lors de la sauvegarde des données";
      userStore.notificationService.message(errorMessage, "error");
    }
  };

  return {
    isEditing,
    toggleEditing,
    saveChanges
  };
});
