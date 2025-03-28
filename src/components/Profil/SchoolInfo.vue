<script lang="ts" setup>
import InputLabelDiv from '../InputLabelDiv.vue'
import { onMounted, watch, ref, computed } from 'vue'
import { EFieldOfStudy } from '@/models/schoolDetails.interface'
import AppLabel from '../AppLabel.vue'
import AppSelect from '../AppSelect.vue'
import { useUserStore } from '@/stores/useUserSotre'
import useValidationProfil from '@/services/useValidationProfil'
import { useEditStore } from '@/stores/profil/useEditStore'
import useAddFormToggle from '@/services/useAddFormToggle '
import BtnAddDataForm from "./BtnAddDataForm.vue";
import useDateFormatter from '@/services/useDateFormatter'


const userStore = useUserStore();
const editStore = useEditStore();
const validation = useValidationProfil();

const { showForm: showSchoolForm } = useAddFormToggle();
const { formatSchoolDates } = useDateFormatter();

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


//Ajout d'un watcher pour les détails scolaires
watch(
  () => [userStore.user, userStore.loading],
  ([user, loading]) => {
    if (user && !loading) {
      // Log des détails scolaires une fois chargés
      console.log('Détails scolaires après chargement:', JSON.stringify(userStore.user.schoolDetails, null, 2));

      // Si les détails scolaires existent, on affiche le formulaire
      if (userStore.user.schoolDetails && userStore.user.schoolDetails.length > 0) {
        console.log('Détails scolaires trouvés, affichage du formulaire');

        formatSchoolDates(userStore.user.schoolDetails[0]);

        showSchoolForm.value = true;
      } else {
        console.log('Aucun détail scolaire trouvé');
      }
    }
  },
  { immediate: true }
);

// Fonction pour initialiser les détails scolaires qui permet d'ajouter des informations si le tableau est vide
const initializeSchoolDetails = () => {
  // S'assurer que la liste existe
  if (!userStore.user.schoolDetails) {
    userStore.user.schoolDetails = [];
  }
  // Ajouter un nouvel élément si nécessaire
  if (userStore.user.schoolDetails.length === 0) {
    userStore.user.schoolDetails.push({
      schoolName: '',
      fieldOfStudy: '' as EFieldOfStudy,
      startDate: new Date(),
      projectedEndDate: '2026-06-30',
      user: { id: userStore.user.id } as any
    });
  }
  // Activer l'affichage du formulaire et le mode édition
  showSchoolForm.value = true;
  editStore.isEditing = true;
  console.log("Détails scolaires initialisés:", userStore.user.schoolDetails);
}

watch(() => userStore.user.schoolDetails?.[0]?.schoolName, (newValue: string | undefined) => {
  if (!newValue || newValue.trim() === '') {
    validation.validateInstitutionName(newValue, 'schoolName');
  } else {
    validation.validateTextLength(newValue, 2, 50, 'schoolName');
  }
});

watch(()=> userStore.user.schoolDetails?.[0]?.fieldOfStudy, (newValue: string | undefined) => {
  if (!newValue || newValue.trim() === '') {
    validation.errors.value.fieldOfStudy = validation.ErrorMessage.EMPTY_SELECT;
  } else {
    validation.validateSelect(newValue, 'fieldOfStudy');
  }
});

watch(() => userStore.user.schoolDetails?.[0]?.startDate, (newValue: string | Date | undefined) => {
  if (!newValue) {
    validation.errors.value.startDate = validation.ErrorMessage.EMPTY_DATE;
  } else {
    validation.validatePrevDate(newValue, 'startDate');
  }
});

watch(() => userStore.user.schoolDetails?.[0]?.projectedEndDate, (newValue: string | Date | undefined) => {
  if (!newValue) {
    validation.errors.value.projectedEndDate = validation.ErrorMessage.EMPTY_DATE;
  } else {
    validation.validateFutureDate(newValue, 'projectedEndDate');
  }
});
</script>

<template>
  <div v-if="!showSchoolForm && !userStore.loading" class="flex justify-center my-5">
    <BtnAddDataForm
      buttonText="Ajouter mes détails scolaires"
      @click="initializeSchoolDetails"
    />
  </div>

  <div v-if="showSchoolForm" class="grid grid-cols-2 max-sm:grid-cols-1 gap-5 transition-all">
    <div v-if="userStore.user && userStore.user.schoolDetails && userStore.user.schoolDetails.length > 0">
      <InputLabelDiv
        labelText="Nom de l'établissement"
        htmlFor="schoolName"
        required
        v-model="userStore.user.schoolDetails[0].schoolName"
        placeholder="Entrez le nom de votre établissement"
        :disabled="!editStore.isEditing"
      />
      <div v-if="validation.errors.value.schoolName" class="text-red-500 text-sm mt-1">
        {{ validation.errors.value.schoolName }}
      </div>
    </div>

    <div v-if="userStore.user && userStore.user.schoolDetails && userStore.user.schoolDetails.length > 0">
      <AppLabel text="Champ d'études" htmlFor="fieldOfStudy" required />
      <AppSelect
        v-model="userStore.user.schoolDetails[0].fieldOfStudy"
        id="fieldOfStudy"
        :disabled="!editStore.isEditing"
        :options="[
          EFieldOfStudy.INFORMATIQUE,
          EFieldOfStudy.INGENIERIE,
          EFieldOfStudy.SANTE,
          EFieldOfStudy.DROIT,
          EFieldOfStudy.SCIENCES_SOCIALES,
          EFieldOfStudy.SCIENCES,
          EFieldOfStudy.ARTS,
          EFieldOfStudy.EDUCATION,
        ]"
         :useDisplayNames="true"
      />
      <div v-if="validation.errors.value.fieldOfStudy" class="text-red-500 text-sm mt-1">
        {{ validation.errors.value.fieldOfStudy }}
      </div>
    </div>

    <div v-if="userStore.user && userStore.user.schoolDetails && userStore.user.schoolDetails.length > 0">
      <InputLabelDiv
        labelText="Date de début"
        htmlFor="startDate"
        required
        v-model="userStore.user.schoolDetails[0].startDate"
        placeholder="Sélectionnez une date"
        type="date"
        :disabled="!editStore.isEditing"
      />
      <div v-if="validation.errors.value.startDate" class="text-red-500 text-sm mt-1">
        {{ validation.errors.value.startDate }}
      </div>
    </div>

    <div v-if="userStore.user && userStore.user.schoolDetails && userStore.user.schoolDetails.length > 0">
      <InputLabelDiv
        labelText="Date de fin prévue"
        htmlFor="projectedEndDate"
        v-model="userStore.user.schoolDetails[0].projectedEndDate"
        placeholder="Sélectionnez une date"
        type="date"
        :disabled="!editStore.isEditing"
      />
      <div v-if="validation.errors.value.projectedEndDate" class="text-red-500 text-sm mt-1">
        {{ validation.errors.value.projectedEndDate }}
      </div>
    </div>
  </div>
</template>

<style>
</style>
