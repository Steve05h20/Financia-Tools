<script lang="ts" setup>
import Input from '../Input.vue'
import Label from '../Label.vue'
import Select from '../Select.vue'
import InputLabelDiv from '../InputLabelDiv.vue'
import { ref } from 'vue'
import type { ISchoolDetails } from '@/models/schoolDetails.interface'
import { EFieldOfStudy } from '@/models/schoolDetails.interface'

const schoolDetails = ref<Partial<ISchoolDetails>>({
  schoolName: '',
  fieldOfStudy: '',
  startDate: undefined,
  projectedEndDate: undefined,
})

</script>

<template>

  <h2 class="my-6">Renseignements sur l'établissement scolaire</h2>
  <div class="flex flex-col justify-center mx-auto max-w-lg">
    <InputLabelDiv
      labelText="Nom de l'établissement"
      htmlFor="schoolName"
      required
      v-model="schoolDetails.schoolName"
      placeholder="placeholder"
    />

    <div>
      <Label text="Champ d'études" htmlFor="fieldOfStudy" required />
      <Select v-model="schoolDetails.fieldOfStudy" id="fieldOfStudy" type="select"
      :options="[
        {value: EFieldOfStudy.informatique, label: 'Informatique'},
        {value: EFieldOfStudy.ingenerie, label: 'Ingénierie'},
        {value: EFieldOfStudy.sante, label: 'Médecine/Santé'},
        {value: EFieldOfStudy.droit, label: 'Droit'},
        {value: EFieldOfStudy.sciencesSociales, label: 'Sciences Sociales'},
        {value: EFieldOfStudy.sciences, label: 'Sciences'},
        {value: EFieldOfStudy.arts, label: 'Arts et Design'},
        {value: EFieldOfStudy.education, label: 'Éducation'},
        {value: EFieldOfStudy.communication, label: 'Communication'},
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
