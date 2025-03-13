<script lang="ts" setup>
import PersonnelInfo from '@/components/Profil/PersonnelInfo.vue'
import AdressesInfo from '@/components/Profil/AdressesInfo.vue'
import ScolaireInfo from '@/components/Profil/ScolaireInfo.vue'
import BancairesInfo from '@/components/Profil/BancairesInfo.vue'
</script>

<template>
  <div class="container mx-auto px-4">
    <section class="mb-8">
      <div class="max-w-md mx-auto">
        <PersonnelInfo />
      </div>
    </section>

    <section class="mb-8">
      <div class="max-w-md mx-auto">
        <AdressesInfo />
      </div>
    </section>

    <section class="mb-8">
      <div class="max-w-md mx-auto">
        <ScolaireInfo />
      </div>
    </section>

    <section class="mb-8">
      <div class="max-w-md mx-auto">
        <BancairesInfo />
      </div>
    </section>
  </div>
</template>

<style>
</style>

