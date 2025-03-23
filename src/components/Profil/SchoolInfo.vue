<script lang="ts" setup>
import InputLabelDiv from '../InputLabelDiv.vue'
import { onMounted, watch } from 'vue'
import { EFieldOfStudy } from '@/models/schoolDetails.interface'
import AppLabel from '../AppLabel.vue'
import AppSelect from '../AppSelect.vue'
import { useUserStore } from '@/stores/useUserSotre'
import useValidationProfil from '@/services/useValidationProfil'

const userStore = useUserStore();
const validation = useValidationProfil();

onMounted(() => {
  validation.resetErrors();
})

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


  <div class="grid grid-cols-2 max-sm:grid-cols-1 gap-5 transition-all">
    <div v-if="userStore.user && userStore.user.schoolDetails && userStore.user.schoolDetails.length > 0">
      <InputLabelDiv
        labelText="Nom de l'établissement"
        htmlFor="schoolName"
        required
        v-model="userStore.user.schoolDetails[0].schoolName"
        placeholder="placeholder"
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
        placeholder="placeholder"
        type="date"
      />
      <div v-if="validation.errors.value.startDate" class="text-red-500 text-sm mt-1">
        {{ validation.errors.value.startDate }}
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
      />
      <div v-if="validation.errors.value.projectedEndDate" class="text-red-500 text-sm mt-1">
        {{ validation.errors.value.projectedEndDate }}
      </div>
    </div>
  </div>
</template>

<style>
</style>
