<script lang="ts" setup>
import UserInfo from '@/components/Profil/UserInfo.vue';
import BankingInfo from '@/components/Profil/BankingInfo.vue';
import AddressInfo from '@/components/Profil/AddressInfo.vue';
import SchoolInfo from '@/components/Profil/SchoolInfo.vue';
</script>

<template>
  <div class="container mx-auto px-4 py-10">

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">

      <section class="mb-8 lg:col-span-4 border-2 w-full">
        <div class="w-full p-4">
          <UserInfo />
        </div>
      </section>

      <section class="mb-8 lg:col-span-4 border-2 w-full">
        <div class="w-full p-4">
          <AddressInfo />
        </div>
      </section>


      <section class="mb-8 lg:col-span-2 border-2 w-full">
        <div class="w-full p-4">
          <SchoolInfo />
        </div>
      </section>

      <section class="mb-8 lg:col-span-2 border-2 w-full">
        <div class="w-full p-4">
          <BankingInfo />
        </div>
      </section>
    </div>
  </div>
</template>

<style>
</style>

