<script lang="ts" setup>
import Input from '../Input.vue'
import Label from '../Label.vue'
</script>

<template>

  <h2 class="my-6">Renseignements sur l'établissement scolaire</h2>
  <div class="flex flex-col justify-center mx-auto max-w-lg">
    <div>
      <Label text="Nom de l'établissement" htmlFor="schoolName" required />
      <Input id="schoolName" />
    </div>

    <div>
      <Label text="Champ d'études" htmlFor="schoolName" required />
      <Input id="schoolName" type="select" :options="[
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
      <Label text="Date de début" htmlFor="schoolStartDate" required />
      <Input id="schoolStartDate" type="date" />
    </div>

    <div>
      <Label text="Date de fin" htmlFor="schoolEndDate" required />
      <Input id="schoolEndDate" type="date"/>
    </div>
  </div>

</template>

<style>
</style>
