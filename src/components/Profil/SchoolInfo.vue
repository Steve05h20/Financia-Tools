<script lang="ts" setup>

import InputLabelDiv from '../InputLabelDiv.vue'
import { ref } from 'vue'
import type { ISchoolDetails } from '@/models/schoolDetails.interface'
import { EFieldOfStudy } from '@/models/schoolDetails.interface'
import AppLabel from '../AppLabel.vue'
import AppSelect from '../AppSelect.vue'

const schoolDetails = ref<Partial<ISchoolDetails>>({
  schoolName: '',
  fieldOfStudy: '',
  startDate: undefined,
  projectedEndDate: undefined,
})

</script>

<template>


  <div class="grid grid-cols-2 max-sm:grid-cols-1 gap-5 transition-all">
    <InputLabelDiv
      labelText="Nom de l'établissement"
      htmlFor="schoolName"
      required
      v-model="schoolDetails.schoolName"
      placeholder="placeholder"
    />

    <div>
      <AppLabel text="Champ d'études" htmlFor="fieldOfStudy" required />
      <AppSelect v-model="schoolDetails.fieldOfStudy" id="fieldOfStudy"
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
    </div>

    <InputLabelDiv
      labelText="Date de début"
      htmlFor="startDate"
      required
      v-model="schoolDetails.startDate"
      placeholder="placeholder"
      type="date"
      />

    <InputLabelDiv
      labelText="Date de fin prévue"
      htmlFor="projectedEndDate"
      required
      v-model="schoolDetails.projectedEndDate"
      placeholder="placeholder"
      type="date"
    />

  </div>

</template>

<style>
</style>
