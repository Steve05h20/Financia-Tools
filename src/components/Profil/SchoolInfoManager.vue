<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import SchoolInfo from './SchoolInfo.vue';
import { useUserStore } from '@/stores/useUserSotre';
import { useEditStore } from '@/stores/profil/useEditStore';
import { EFieldOfStudy } from '@/models/schoolDetails.interface';
import BtnAddDataForm from "./BtnAddDataForm.vue";
import useAddFormToggle from '@/services/useAddFormToggle ';
import useDateFormatter from '@/services/useDateFormatter';

const userStore = useUserStore();
const editStore = useEditStore();
const { showForm: showSchoolForm } = useAddFormToggle();
const { formatSchoolDates } = useDateFormatter();

const emit = defineEmits(['validation-change']);
const schoolDetailsHaveErrors = ref(false);

const updateSchoolValidation = (hasErrors: boolean) => {
  schoolDetailsHaveErrors.value = hasErrors;
  emit('validation-change', schoolDetailsHaveErrors.value);
};

watch(
  () => [userStore.user, userStore.loading],
  ([user, loading]) => {
    if (user && !loading) {
      console.log('Détails scolaires après chargement:', JSON.stringify(userStore.user.schoolDetails, null, 2));

      if (userStore.user.schoolDetails && userStore.user.schoolDetails.length > 0) {
        console.log('Détails scolaires trouvés, affichage du formulaire');

        if (userStore.user.schoolDetails[0]) {
          formatSchoolDates(userStore.user.schoolDetails[0]);
        }
        showSchoolForm.value = true;
      } else {
        console.log('Aucun détail scolaire trouvé');
        showSchoolForm.value = false;
      }
    }
  },
  { immediate: true }
);


const initializeSchoolDetails = () => {
  if (!userStore.user.schoolDetails) {
    userStore.user.schoolDetails = [];
  }

  if (userStore.user.schoolDetails.length === 0) {
    userStore.user.schoolDetails.push({
      schoolName: '',
      fieldOfStudy: '' as EFieldOfStudy,
      startDate: new Date(),
      projectedEndDate: '2026-06-30',
      user: { id: userStore.user.id } as any
    });
  }

  showSchoolForm.value = true;
  editStore.isEditing = true;
  console.log("Détails scolaires initialisés:", userStore.user.schoolDetails);
};

// Fonction pour supprimer les détails scolaires
const removeSchoolDetails = async (index: number) => {
  if (userStore.user?.schoolDetails && index < (userStore.user.schoolDetails?.length ?? 0)) {
    const detailsToRemove = userStore.user.schoolDetails[index];
    const userId = userStore.user.id;

    userStore.user.schoolDetails.splice(index, 1);

    if (userId) {
      try {
        await userStore.schoolDetailsService?.DELETE_SCHOOL_DETAILS_BY_USER_ID(userId);
        userStore.notificationService.message("Détails scolaires supprimés avec succès", "success");

        showSchoolForm.value = false;
      } catch (error) {
        userStore.user.schoolDetails.splice(index, 0, detailsToRemove);
        const errorMessage = error instanceof Error ? error.message : "Erreur lors de la suppression des détails scolaires";
        userStore.notificationService.message(errorMessage, "error");
      }
    } else {
      showSchoolForm.value = false;
      userStore.notificationService.message("Détails scolaires supprimés", "success");
    }
  }
};
</script>

<template>
  <div v-if="!showSchoolForm && !userStore.loading" class="flex justify-center my-5">
    <BtnAddDataForm
      buttonText="Ajouter mes détails scolaires"
      @click="initializeSchoolDetails"
    />
  </div>

  <div v-if="showSchoolForm && (userStore.user?.schoolDetails?.length || 0) > 0" class="relative">
    <div v-for="(schoolDetail, index) in userStore.user.schoolDetails" :key="index" class="mb-4">
      <!-- Bouton de suppression -->
      <div class="flex justify-end mb-2" v-if="editStore.isEditing">
        <button
          @click="removeSchoolDetails(index)"
          class="btn btn-error btn-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
            <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
          </svg>
          Supprimer
        </button>
      </div>

      <!-- Formulaire de détails scolaires -->
      <SchoolInfo
        :currentSchoolDetails="schoolDetail"
        @validation-change="updateSchoolValidation"
      />
    </div>
  </div>
</template>
