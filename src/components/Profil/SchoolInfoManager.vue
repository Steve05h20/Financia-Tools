<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import SchoolInfo from './SchoolInfo.vue';
import { useUserStore } from '@/stores/useUserSotre';
import { useEditStore } from '@/stores/profil/useEditStore';
import { EFieldOfStudy } from '@/models/schoolDetails.interface';
import BtnAddDataForm from "./BtnAddDataForm.vue";
import useAddFormToggle from '@/services/useAddFormToggle ';
import useDateFormatter from '@/services/useDateFormatter';
import BtnDelete from './BtnDelete.vue';

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

      <div class="flex justify-end mb-2" v-if="editStore.isEditing">
        <BtnDelete
            v-if="editStore.isEditing"
            @delete-confirmed="removeSchoolDetails(index)"
            :modalText="'Voulez-vous vraiment supprimer ces détails scolaires?'"
          />
      </div>

      <!-- Formulaire de détails scolaires -->
      <SchoolInfo
        :currentSchoolDetails="schoolDetail"
        @validation-change="updateSchoolValidation"
      />
    </div>
  </div>
</template>
