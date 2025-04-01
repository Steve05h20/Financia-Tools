<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import AddressInfo from './AddressInfo.vue';
import BtnDelete from './BtnDelete.vue';
import { useUserStore } from '@/stores/useUserSotre';
import { useEditStore } from '@/stores/profil/useEditStore';
import { EAddressType, EProvince, ECountry, type IAddress } from '@/models/address.interface';
import BtnAddDataForm from "./BtnAddDataForm.vue";
import useAddFormToggle from '@/services/useAddFormToggle ';

const userStore = useUserStore();
const editStore = useEditStore();

const { showForm: showAddressForm } = useAddFormToggle();

const emit = defineEmits(['validation-change']);
const addressesHaveErrors = ref(false);

const addressCount = computed(() => {
  const addresses = userStore.user?.addresses || [];
  return addresses.length;
});

const updateAddressValidation = (hasErrors: boolean) => {
  addressesHaveErrors.value = hasErrors;
  emit('validation-change', addressesHaveErrors.value);
};

const showAddButton = ref<boolean>(false);

watch(
  () => [userStore.user, userStore.loading],
  ([user, loading]) => {
    if (user && !loading) {
      const hasAddresses = Boolean(userStore.user.addresses && userStore.user.addresses.length > 0);
      showAddressForm.value = hasAddresses;

      console.log(
        hasAddresses
          ? 'Adresses trouvées, affichage du formulaire'
          : 'Aucune adresse trouvée'
      );
    }
  },
  { immediate: true }
);

watch([addressCount, () => editStore.isEditing], ([newCount, isEditing]) => {
  showAddButton.value = Boolean(isEditing && newCount === 1);
}, { immediate: true });

const initializeAddress = () => {
  if (!userStore.user.addresses) {
    userStore.user.addresses = [];
  }

  if (userStore.user.addresses.length === 0) {
    const userRef = { id: userStore.user.id } as unknown as typeof userStore.user;

    const newAddress: IAddress = {
      type: EAddressType.WORK,
      streetNumber: '',
      streetName: '',
      city: '',
      province: EProvince.QUEBEC,
      country: ECountry.CANADA,
      user: userRef
    };

    userStore.user.addresses.push(newAddress);
  }

  showAddressForm.value = true;
  editStore.isEditing = true;
  console.log("Adresse initialisée:", userStore.user.addresses);
};

const addNewAddress = () => {
  if (!userStore.user.addresses) {
    userStore.user.addresses = [];
  }

  const userRef = { id: userStore.user.id } as unknown as typeof userStore.user;

  const newAddress: IAddress = {
    type: EAddressType.WORK,
    streetNumber: '',
    streetName: '',
    city: '',
    province: EProvince.QUEBEC,
    country: ECountry.CANADA,
    user: userRef
  };

  userStore.user.addresses.push(newAddress);
};

const removeAddress = async (index: number) => {
  if (!userStore.user?.addresses || index >= userStore.user.addresses.length) {
    return;
  }

  const addressToRemove = userStore.user.addresses[index];
  const userId = userStore.user.id;

  userStore.user.addresses.splice(index, 1);

  if (userStore.user.addresses.length === 0) {
    showAddressForm.value = false;
  }

  if (userId && addressToRemove.type) {
    try {
      await userStore.addressService.deleteAddressByType(userId, addressToRemove.type);
      userStore.notificationService.message("Adresse supprimée avec succès", "success");
    } catch (error) {
      userStore.user.addresses.splice(index, 0, addressToRemove);
      const errorMessage = error instanceof Error
        ? error.message
        : "Erreur lors de la suppression de l'adresse";
      userStore.notificationService.message(errorMessage, "error");

      if (userStore.user.addresses.length > 0) {
        showAddressForm.value = true;
      }
    }
  }
};
</script>

<template>
    <div v-if="!showAddressForm && !userStore.loading" class="flex justify-center my-5">
      <BtnAddDataForm
        buttonText="Ajouter une adresse"
        @click="initializeAddress"
      />
    </div>
    <div v-if="showAddressForm && (userStore.user?.addresses?.length || 0) > 0">
      <div v-for="(address, index) in userStore.user?.addresses || []" :key="index" class="mb-8 w-full">
        <div class="divider collapse-title font-semibold">
          Adresse {{ index + 1 }}
        </div>
        <div class="flex justify-between">
            <span v-if="address.type" class="text-sm font-normal ml-2">{{ address.type }}</span>
            <BtnDelete
              v-if="editStore.isEditing"
              @delete-confirmed="removeAddress(index)"
              :modalText="'Voulez-vous vraiment supprimer cette adresse?'"
              :index="`address-${index}`"
            />
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
          Ajouter une seconde adresse
        </button>
      </div>
  </div>
</template>
