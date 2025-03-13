<script lang="ts" setup>
import PersonnelInfo from '@/components/Profil/PersonnelInfo.vue'
import AdressesInfo from '@/components/Profil/AdressesInfo.vue'
import ScolaireInfo from '@/components/Profil/ScolaireInfo.vue'
import BancairesInfo from '@/components/Profil/BancairesInfo.vue'
</script>

<template>
  <div class="container mx-auto px-4 py-10">

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">

      <section class="mb-8 lg:col-span-4 border-2 w-full">
        <div class="w-full p-4">
          <PersonnelInfo />
        </div>
      </section>

      <section class="mb-8 lg:col-span-4 border-2 w-full">
        <div class="w-full p-4">
          <AdressesInfo />
        </div>
      </section>


      <section class="mb-8 lg:col-span-2 border-2 w-full">
        <div class="w-full p-4">
          <ScolaireInfo />
        </div>
      </section>

      <section class="mb-8 lg:col-span-2 border-2 w-full">
        <div class="w-full p-4">
          <BancairesInfo />
        </div>
      </section>
    </div>
  </div>
</template>

<style>
</style>

