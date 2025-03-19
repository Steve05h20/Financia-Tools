<script lang="ts" setup>
import InputLabelDiv from '../InputLabelDiv.vue'
import { ref, onMounted, watch } from 'vue'
import type { ISchoolDetails } from '@/models/schoolDetails.interface'
import { EFieldOfStudy } from '@/models/schoolDetails.interface'
import { useValidationStore } from '@/stores/profil/UseValidationStore'
import { useEditStore } from '@/stores/profil/useEditStore'
import AppLabel from '../AppLabel.vue'
import AppSelect from '../AppSelect.vue'
import { useUserStore } from '@/stores/useUserSotre'

const userStore = useUserStore();
const validationStore = useValidationStore();
const editStore = useEditStore();

const schoolDetails = ref<Partial<ISchoolDetails>>({
  schoolName: '',
  fieldOfStudy: '',
  startDate: undefined,
  projectedEndDate: undefined,
})

const errors = ref<{ [key: string]: string }>({
  schoolName: '',
  fieldOfStudy: '',
  startDate: '',
  projectedEndDate: '',
});

const validateSchoolName = () => {
  if(!schoolDetails.value.schoolName) {
    errors.value.schoolName = "Le nom de l'établissement scolaire est requis";
    return;
  }

  errors.value.schoolName = validationStore.validateTextLength(
    schoolDetails.value.schoolName, 2, 50
  );
};

const validateFieldOfStudy = () => {
  errors.value.fieldOfStudy = validationStore.validateSelect(schoolDetails.value.fieldOfStudy);
};

const validateStartDate = () => {
  errors.value.startDate = schoolDetails.value.startDate ? '' : "La date de début est requise";
};

const validateProjectedEndDate = () => {
  errors.value.projectedEndDate = validationStore.validateFutureDate(schoolDetails.value.projectedEndDate);
};

const validateForm = () => {
  validateSchoolName();
  validateFieldOfStudy();
  validateStartDate();
  validateProjectedEndDate();

  return isFormValid();
};

const isFormValid = () => {
  return Object.values(errors.value).every(error => error === '');
};

onMounted(() => {
  editStore.registerValidation(validateForm);
});
</script>

<template>


  <div class="grid grid-cols-2 max-sm:grid-cols-1 gap-5 transition-all">
    <div v-if="userStore.user && userStore.user.schoolDetails && userStore.user.schoolDetails.length > 0">
      <InputLabelDiv
        labelText="Nom de l'établissement"
        htmlFor="schoolName"
        required
        v-model="userStore.user.schoolDetails[0].schoolName"
        placeholder="placeholder"
        @input="validateSchoolName"
        @blur="validateSchoolName"
      />
      <div v-if="errors.schoolName" class="text-red-500 text-sm mt-1">
        {{ errors.schoolName }}
    </div>
    </div>


    <div v-if="userStore.user && userStore.user.schoolDetails && userStore.user.schoolDetails.length > 0">
      <AppLabel text="Champ d'études" htmlFor="fieldOfStudy" required />
      <AppSelect
        v-model="userStore.user.schoolDetails[0].fieldOfStudy"
        id="fieldOfStudy"
        @input="validateFieldOfStudy"
        @blur="validateFieldOfStudy"
       :options="[
          EFieldOfStudy.INFORMATIQUE,
          EFieldOfStudy.INGENIERIE,
          EFieldOfStudy.SANTE,
          EFieldOfStudy.DROIT,
          EFieldOfStudy.SCIENCES_SOCIALES,
          EFieldOfStudy.SCIENCES,
          EFieldOfStudy.ARTS,
          EFieldOfStudy.EDUCATION,
      ]" />
      <div v-if="errors.fieldOfStudy" class="text-red-500 text-sm mt-1">
        {{ errors.fieldOfStudy }}
      </div>
    </div>

    <div v-if="userStore.user && userStore.user.schoolDetails && userStore.user.schoolDetails.length > 0">
      <InputLabelDiv
        labelText="Date de début"
        htmlFor="startDate"
        required
        v-model="userStore.user.schoolDetails[0].startDate"
        placeholder="placeholder"
        type="date"
        @input="validateStartDate"
        @blur="validateStartDate"
      />
      <div v-if="errors.startDate" class="text-red-500 text-sm mt-1">
        {{ errors.startDate }}
      </div>
    </div>

    <div v-if="userStore.user && userStore.user.schoolDetails && userStore.user.schoolDetails.length > 0">
       <InputLabelDiv
        labelText="Date de fin prévue"
        htmlFor="projectedEndDate"
        required
        v-model="userStore.user.schoolDetails[0].projectedEndDate"
        placeholder="placeholder"
        type="date"
        @input="validateProjectedEndDate"
        @blur="validateProjectedEndDate"
      />
      <div v-if="errors.projectedEndDate" class="text-red-500 text-sm mt-1">
        {{ errors.projectedEndDate }}
      </div>
    </div>
  </div>
</template>

<style>
</style>
