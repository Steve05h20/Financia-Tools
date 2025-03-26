<script lang="ts" setup>
import { computed, ref } from 'vue';
import AddressInfo from './AddressInfo.vue';
import { useUserStore } from '@/stores/useUserSotre';
import { useEditStore } from '@/stores/profil/useEditStore';
import { EAddressType, EProvince, ECountry } from '@/models/address.interface';

const userStore = useUserStore();
const editStore = useEditStore();

const addressCount = computed(() => {
  return userStore.user?.addresses?.length || 0;
});

const addNewAddress = () => {
  if (!userStore.user.addresses) {
    userStore.user.addresses = [];
  }

  const newAddress = {
    type: EAddressType.WORK,
    streetNumber: '',
    streetName: '',
    city: '',
    province: EProvince.QUEBEC,
    country: ECountry.CANADA,
    user: userStore.user
  };

  userStore.user.addresses.push(newAddress);
};

// Fonction pour supprimer une adresse
const removeAddress = (index: number) => {
  if (userStore.user?.addresses && index < (userStore.user.addresses?.length ?? 0)) {
    userStore.user.addresses.splice(index, 1);
  }
};
</script>

<template>
  <div>
    <div v-for="(address, index) in userStore.user?.addresses || []" :key="index" class="mb-8 w-full">
      <div class="divider collapse-title font-semibold">
        Adresse {{ index + 1 }}
      </div>
      <div class="flex justify-between">
          <span v-if="address.type" class="text-sm font-normal ml-2">{{ address.type }}</span>

          <button
            v-if="editStore.isEditing && (userStore.user?.addresses?.length ?? 0) > 1"
            @click="removeAddress(index)"
            class="btn btn-error btn-sm ml-4"
          >
            Supprimer
          </button>
        </div>

      <div class="w-full p-4">
        <AddressInfo :currentAddress="address" type="radio" name="my-accordion-2"/>
      </div>
    </div>


    <div
      v-if="editStore.isEditing && (addressCount ?? 0) < 2"
      class="flex justify-center mt-4 mb-8"
    >
      <button
        @click="addNewAddress"
        class="btn btn-primary"
      >
        Ajouter une adresse
      </button>
    </div>
  </div>
</template>
