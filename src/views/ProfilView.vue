<script lang="ts" setup>

import UserInfo from '@/components/Profil/UserInfo.vue';
import BankingInfoManager from '@/components/Profil/BankingInfoManager.vue';
import AddressManager from '@/components/Profil/AddressManager.vue';
import SchoolInfoManager from '@/components/Profil/SchoolInfoManager.vue';
import HeaderProfil from '@/components/Profil/HeaderProfil.vue';
import BtnUpdate from '@/components/Profil/BtnUpdate.vue';
import { useUserStore } from '@/stores/useUserSotre';
import { onMounted } from 'vue';
import useAccordionValidation from '@/services/useAccordionValidation';
import { AccordionSection } from '@/services/useAccordionValidation';
import useNotification from '@/services/useNotification';
import BtnCancel from '@/components/Profil/BtnCancel.vue';

const userStore = useUserStore();
const accordionValidation = useAccordionValidation();
const notification = useNotification();

onMounted(async () => {
  await userStore.loadUserData(userStore.user.email)
});

const toggleSection = (section: AccordionSection) => {

  if (accordionValidation.activeSection.value === section) {
    accordionValidation.activeSection.value = null;
    return;
  }

  if (accordionValidation.activeSection.value !== null &&
      accordionValidation.hasActiveErrors.value) {
    notification.message("Veuillez corriger les erreurs avant de changer de section.", "error");
    return;
  }

  accordionValidation.activeSection.value = section;
};

</script>


<template>
  <div class="container mx-auto pt-28 md:pt-10 flex flex-col bg-base-100">
    <div v-if="userStore.loading" class="flex justify-center items-center h-20">
      <span class="loading loading-spinner text-info"></span>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 w-full relative px-4 sm:px-0">
      <div class="col-span-1 sm:col-span-2">
        <HeaderProfil />
      </div>
      <div class="col-span-1 sm:col-span-2 hidden sm:flex items-center justify-end gap-8">
        <BtnCancel />
        <BtnUpdate />
      </div>
    </div>

    <div class="sticky w-full mb-10 sm:hidden top-0 left-0 right-0 bg-white shadow-lg z-50 flex justify-center items-center py-2">
      <div class="flex items-center space-x-4">
        <BtnCancel />
        <BtnUpdate />
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full px-4 flex-grow pb-10">

      <div class="flex flex-col gap-6 flex-grow">
        <section
          class="collapse collapse-arrow bg-base-100 border border-base-300"
          :class="{
            'collapse-open': accordionValidation.activeSection.value === AccordionSection.PERSONAL_INFO,
            'collapse-close': accordionValidation.activeSection.value !== AccordionSection.PERSONAL_INFO
          }"
        >
          <div
            class="collapse-title font-semibold"
            @click="toggleSection(AccordionSection.PERSONAL_INFO)"
          >
            Informations personnelles
          </div>
          <div class="collapse-content">
            <UserInfo @validation-change="accordionValidation.updatePersonalInfoValidation" />
          </div>
        </section>

        <section
          class="collapse collapse-arrow bg-base-100 border border-base-300"
           :class="{
            'collapse-open': accordionValidation.activeSection.value === AccordionSection.SCHOOL_DETAILS,
            'collapse-close': accordionValidation.activeSection.value !== AccordionSection.SCHOOL_DETAILS
            /* Pas de mb-* ici si c'est le dernier de la colonne avant le pb-10 du parent */
          }"
        >
          <div
            class="collapse-title font-semibold"
            @click="toggleSection(AccordionSection.SCHOOL_DETAILS)"
          >
            Détails scolaires
          </div>
          <div class="collapse-content">
            <SchoolInfoManager @validation-change="accordionValidation.updateSchoolDetailsValidation" />
          </div>
        </section>
      </div>

      <div class="flex flex-col gap-6 flex-grow">
        <section
          class="collapse collapse-arrow bg-base-100 border border-base-300"
          :class="{
            'collapse-open': accordionValidation.activeSection.value === AccordionSection.ADDRESSES,
            'collapse-close': accordionValidation.activeSection.value !== AccordionSection.ADDRESSES
          }"
        >
          <div
            class="collapse-title font-semibold"
            @click="toggleSection(AccordionSection.ADDRESSES)"
          >
            Adresses
          </div>
          <div class="collapse-content">
            <AddressManager @validation-change="accordionValidation.updateAddressesValidation" />
          </div>
        </section>

        <section
          class="collapse collapse-arrow bg-base-100 border border-base-300"
          :class="{
            'collapse-open': accordionValidation.activeSection.value === AccordionSection.BANKING_INFO,
            'collapse-close': accordionValidation.activeSection.value !== AccordionSection.BANKING_INFO
          }"
        >
          <div
            class="collapse-title font-semibold"
            @click="toggleSection(AccordionSection.BANKING_INFO)"
          >
            Informations bancaires
          </div>
          <div class="collapse-content">
            <BankingInfoManager @validation-change="accordionValidation.updateBankingInfoValidation" />
          </div>
        </section>
      </div>
    </div>
     </div>
</template>





