<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import AddressInfo from './AddressInfo.vue';
import { useUserStore } from '@/stores/useUserSotre';
import { useEditStore } from '@/stores/profil/useEditStore';
import { EAddressType, EProvince, ECountry } from '@/models/address.interface';

const userStore = useUserStore();
const editStore = useEditStore();

const addressCount = computed(() => {
  const addresses = userStore.user?.addresses || [];
  return addresses.length;
});

const emit = defineEmits(['validation-change']);
const addressesHaveErrors = ref(false);

const updateAddressValidation = (hasErrors: boolean) => {
  addressesHaveErrors.value = hasErrors;
  emit('validation-change', addressesHaveErrors.value);
};

const showAddButton = ref<boolean>(false);

watch(addressCount, (newCount) => {
  showAddButton.value = editStore.isEditing && newCount < 2;
}, { immediate: true });

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

const removeAddress = async (index: number) => {
  if (userStore.user?.addresses && index < (userStore.user.addresses?.length ?? 0)) {
    const addressToRemove = userStore.user.addresses[index];
    const userId = userStore.user.id;

    userStore.user.addresses.splice(index, 1);


    if (userId && addressToRemove.type) {
      try {
        await userStore.addressService.deleteAddressByType(userId, addressToRemove.type);
        userStore.notificationService.message("Adresse supprimée avec succès", "success");
      } catch (error) {
        // Si une erreur se produit, réinsérer l'adresse dans l'UI
        userStore.user.addresses.splice(index, 0, addressToRemove);
        const errorMessage = error instanceof Error ? error.message : "Erreur lors de la suppression de l'adresse";
        userStore.notificationService.message(errorMessage, "error");
      }
    }
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
        <AddressInfo
          :currentAddress="address"
          @validation-change="updateAddressValidation"
          type="radio"
          name="my-accordion-2"
        />
      </div>
    </div>


    <div
      v-if="showAddButton"
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
