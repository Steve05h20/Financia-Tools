
<script lang="ts" setup>
import UserInfo from '@/components/Profil/UserInfo.vue';
import BankingInfo from '@/components/Profil/BankingInfo.vue';
import AddressInfo from '@/components/Profil/AddressInfo.vue';
import SchoolInfo from '@/components/Profil/SchoolInfo.vue';
import HeaderProfil from '@/components/Profil/HeaderProfil.vue';
import BtnUpdate from '@/components/Profil/BtnUpdate.vue';
import { useUserStore } from '@/stores/useUserSotre';
import { onMounted } from 'vue';

const userStore = useUserStore();

//connextion simulée test@test.com
onMounted(() => {
  userStore.loadUserData("test@test.com");
});



</script>
<template>
  <div class="container mx-auto px-4 py-10">
    <div v-if="userStore.loading" class="flex justify-center items-center h-64">
      <span class="loading loading-spinner text-info"></span>
    </div>

    <div class="flex justify-between items-center mb-8">
      <HeaderProfil />
      <div class="hidden sm:block">
        <BtnUpdate />
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">

      <section class="mb-8 lg:col-span-4  w-full ">
        <div class="divider text-lg font-semibold">Informations personnelles</div>
          <UserInfo />
      </section>

      <section v-for="(address, index) in userStore.user.addresses" :key="index" class="mb-8 lg:col-span-4 w-full">
        <div class="divider text-lg font-semibold">Adresse {{ index + 1 }} </div>
        <span v-if="address.type" class="text-sm font-normal ml-2">({{ address.type }})</span>
        <div class="w-full p-4">
          <AddressInfo :address-index="index" />
        </div>
      </section>

      <section class="mb-8 lg:col-span-2 w-full">
        <div class="divider text-lg font-semibold">Détails scolaires</div>
        <div class="w-full p-4">
          <SchoolInfo />
        </div>
      </section>

      <section class="mb-8 lg:col-span-2 w-full">
        <div class="divider text-lg font-semibold">Informations bancaires</div>
        <div class="w-full p-4">
          <BankingInfo />
        </div>
      </section>

      <div class="sm:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 w-full p-4 text-center">
        <BtnUpdate />
      </div>
    </div>

  </div>


</template>

<style>
</style>

