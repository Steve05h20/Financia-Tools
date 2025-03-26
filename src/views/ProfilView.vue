<script lang="ts" setup>
import UserInfo from '@/components/Profil/UserInfo.vue';
import BankingInfo from '@/components/Profil/BankingInfo.vue';
import AddressManager from '@/components/Profil/AddressManager.vue';
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
  <div class="container mx-auto px-4 pt-10 pb-28">
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
      <!-- Informations personnelles -->
      <section class="collapse collapse-arrow bg-base-100 border border-base-300 mb-8 lg:col-span-4 w-full">
        <input type="radio" name="profile-accordion" checked />
        <div class="collapse-title font-semibold">Informations personnelles</div>
        <div class="collapse-content">
          <UserInfo />
        </div>
      </section>

      <!-- Adresses -->
      <section class="collapse collapse-arrow bg-base-100 border border-base-300 mb-8 lg:col-span-4 w-full">
        <input type="radio" name="profile-accordion" />
        <div class="collapse-title font-semibold">Adresses</div>
        <div class="collapse-content">
          <AddressManager />
        </div>
      </section>

      <!-- Détails scolaires -->
      <section class="collapse collapse-arrow bg-base-100 border border-base-300 mb-8 lg:col-span-4 w-full">
        <input type="radio" name="profile-accordion" />
        <div class="collapse-title font-semibold">Détails scolaires</div>
        <div class="collapse-content">
          <SchoolInfo />
        </div>
      </section>

      <!-- Informations bancaires -->
      <section class="collapse collapse-arrow bg-base-100 border border-base-300 mb-8 lg:col-span-4 w-full">
        <input type="radio" name="profile-accordion" />
        <div class="collapse-title font-semibold">Informations bancaires</div>
        <div class="collapse-content">
          <BankingInfo />
        </div>
      </section>

      <div class="sm:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 w-full p-4 text-center">
        <BtnUpdate />
      </div>
    </div>
  </div>
</template>



