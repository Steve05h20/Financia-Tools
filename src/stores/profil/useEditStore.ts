import { defineStore } from "pinia";
import { ref } from 'vue';
import { useUserStore } from '@/stores/useUserSotre';

export const useEditStore = defineStore('edit', () => {
  const isEditing = ref<boolean>(false);
  const userStore = useUserStore();

  const toggleEditing = (): void => {
    isEditing.value = !isEditing.value;
  };

  const saveChanges = async (): Promise<void> => {
    const success = await userStore.updateUserData();
    if (success) {
      isEditing.value = false;
    }
  };

  return {
    isEditing,
    toggleEditing,
    saveChanges
  };
});
