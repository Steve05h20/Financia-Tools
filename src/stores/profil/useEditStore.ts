import { defineStore } from "pinia";
 import { ref } from 'vue';

 export const useEditStore = defineStore('edit', () => {
   const isEditing = ref<boolean>(false);

   const toggleEditing = (): void => {
     isEditing.value = !isEditing.value;
   };

   const saveChanges = (): void => {
    //Ajouter logique PUT
     console.log('Sauvegarde des données...');
     isEditing.value = false;
   };

   return {
       isEditing,
       toggleEditing,
       saveChanges
       };
 });
