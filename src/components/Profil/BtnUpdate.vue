<script lang="ts" setup>
import { useEditStore } from '@/stores/profil/useEditStore';

const editStore = useEditStore();

const handleBtnClick = () => {
  if(editStore.isEditing) {
    editStore.saveChanges();
  } else {
    editStore.toggleEditing();
  }
}
</script>

<template>
  <button
    class="btn btn-primary my-10 lg:my-0 lg:col-start-4 lg:col-span-1 lg:w-full"
    @click="handleBtnClick"
    :class="{ 'btn-primary': !editStore.isEditing, 'btn-success': editStore.isEditing }"
  >
   {{ editStore.isEditing ?  'Sauvegarder' :  ' Modifier mes informations' }}
  </button>
</template>

<style>
</style>
