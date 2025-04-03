<script lang="ts" setup>
import InputLabelDiv from '../InputLabelDiv.vue'
import { onMounted, watch } from 'vue'
import { EFieldOfStudy } from '@/models/schoolDetails.interface'
import AppLabel from '../AppLabel.vue'
import AppSelect from '../AppSelect.vue'
import { useEditStore } from '@/stores/profil/useEditStore'
import useValidation from '@/services/useValidation'

const props = defineProps({
  currentSchoolDetails: {
    type: Object,
    required: true
  }
});

const editStore = useEditStore();
const validation = useValidation();

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

watch(() => props.currentSchoolDetails?.schoolName, (newValue: string | undefined) => {
  if (!newValue || newValue.trim() === '') {
    validation.validateSchoolName(newValue, 'schoolName');
  } else {
    validation.validateTextLength(newValue, 2, 50, 'schoolName');
  }
});

watch(() => props.currentSchoolDetails?.fieldOfStudy, (newValue: string | undefined) => {
  if (!newValue || newValue.trim() === '') {
    validation.errors.value.fieldOfStudy = validation.ErrorMessage.EMPTY_SELECT;
  } else {
    validation.validateSelect(newValue, 'fieldOfStudy');
  }
});

watch(() => props.currentSchoolDetails?.startDate, (newValue: string | Date | undefined) => {
  if (!newValue) {
    validation.errors.value.startDate = '';
  } else {
    validation.validatePrevDate(newValue, 'startDate');
  }
});

watch(() => props.currentSchoolDetails?.projectedEndDate, (newValue: string | Date | undefined) => {
  if (!newValue) {
    validation.errors.value.projectedEndDate = validation.ErrorMessage.EMPTY_DATE;
  } else {
    validation.validateFutureDate(newValue, 'projectedEndDate');
  }
});
</script>

<template>
  <div class="grid grid-cols-2 max-sm:grid-cols-1 gap-5 transition-all">
    <div>
      <InputLabelDiv
        labelText="Nom de l'établissement"
        htmlFor="schoolName"
        required
        v-model="currentSchoolDetails.schoolName"
        placeholder="Entrez le nom de votre établissement"
        :disabled="!editStore.isEditing"
        :hasError="!!validation.errors.value.schoolName"
        :errorMessage="validation.errors.value.schoolName"
      />
    </div>

    <div>
      <AppLabel text="Champ d'études" htmlFor="fieldOfStudy" required />
      <AppSelect
        v-model="currentSchoolDetails.fieldOfStudy"
        id="fieldOfStudy"
        :disabled="!editStore.isEditing"
        :hasError="!!validation.errors.value.fieldOfStudy"
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
    </div>

    <div>
      <InputLabelDiv
        labelText="Date de début"
        htmlFor="startDate"
        required
        v-model="currentSchoolDetails.startDate"
        placeholder="Sélectionnez une date"
        type="date"
        :disabled="!editStore.isEditing"
        :hasError="!!validation.errors.value.startDate"
        :errorMessage="validation.errors.value.startDate"
      />
    </div>

    <div>
      <InputLabelDiv
        labelText="Date de fin prévue"
        htmlFor="projectedEndDate"
        v-model="currentSchoolDetails.projectedEndDate"
        placeholder="Sélectionnez une date"
        type="date"
        :disabled="!editStore.isEditing"
        :hasError="!!validation.errors.value.projectedEndDate"
        :errorMessage="validation.errors.value.projectedEndDate"
      />
    </div>
  </div>
</template>
