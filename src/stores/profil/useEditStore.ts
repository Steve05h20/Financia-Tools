import { defineStore } from "pinia";
import { ref } from 'vue';

type ValidationHandler = () => boolean;

export const useEditStore = defineStore('edit', () => {

  const isEditing = ref<boolean>(false);
  const validationHandlers = ref<ValidationHandler[]>([]);

  const toggleEditing = (): void => {
    isEditing.value = !isEditing.value;
  };

  const registerValidation = (handler: ValidationHandler): void => {
    validationHandlers.value.push(handler);
  };

 //Validate forms before saving
  const validateAll = (): boolean => {
    if (validationHandlers.value.length === 0) {
      return true;
    }
    return validationHandlers.value.every(handler => handler());
  };


  const saveChanges = (): boolean => {
    if (validateAll()) {
      //Ajouter logique PUT
      console.log('Validation réussie, sauvegarde des données...');
      isEditing.value = false;
      return true;
    } else {
      console.log('Validation échouée, reste en mode édition');
      return false;
    }
  };

  return {
    isEditing,
    toggleEditing,
    saveChanges,
    registerValidation,
    validateAll,
  };
});
