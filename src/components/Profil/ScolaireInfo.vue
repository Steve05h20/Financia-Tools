<script lang="ts" setup>
import Input from '../Input.vue'
import Label from '../Label.vue'
import { ref } from 'vue'
import type { ISchoolDetails } from '@/models/schoolDetails.interface'

const schoolDetails = ref<Partial<ISchoolDetails>>({
  schoolName: '',
  fieldOfStudy: '',
  startDate: new Date(),
  projectedEndDate: new Date(),
})

</script>

<template>

  <h2 class="my-6">Renseignements sur l'établissement scolaire</h2>
  <div class="flex flex-col justify-center mx-auto max-w-lg">
    <div>
      <Label text="Nom de l'établissement" htmlFor="schoolName" required />
      <Input v-model="schoolDetails.schoolName"  placeholder="placeholder" id="schoolName" />
    </div>

    <div>
      <Label text="Champ d'études" htmlFor="fieldOfStudy" required />
      <Input v-model="schoolDetails.fieldOfStudy"  placeholder="placeholder" id="fieldOfStudy" type="select" :options="[
        {value: 'default', label: 'Choisir un champ d\'études'},
        {value: 'informatique', label: 'Informatique'},
        {value: 'ingenerie', label: 'Ingénierie'},
        {value: 'sante', label: 'Médecine/Santé'},
        {value: 'droit', label: 'Droit'},
        {value: 'sciencesSociales', label: 'Sciences Sociales'},
        {value: 'sciences', label: 'Sciences'},
        {value: 'arts', label: 'Arts et Design'},
        {value: 'education', label: 'Éducation'},
        {value: 'communication', label: 'Communication'},
      ]"/>
    </div>

    <div>
      <Label text="Date de début" htmlFor="startDate" required />
      <Input v-model="schoolDetails.startDate" placeholder="placeholder" id="startDate" type="date" />
    </div>

    <div>
      <Label text="Date de fin" htmlFor="projectedEndDate" required />
      <Input  v-model="schoolDetails.projectedEndDate" placeholder="placeholder" id="projectedEndDate" type="date"/>
    </div>
  </div>

</template>

<style>
</style>
