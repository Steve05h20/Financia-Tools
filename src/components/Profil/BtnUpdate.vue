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
    class="btn btn-primary my-10 lg:my-0 lg:px-12 btn-lg"
    @click="handleBtnClick"
    :class="{ 'btn-primary': !editStore.isEditing, 'btn-success': editStore.isEditing }"
  >
   {{ editStore.isEditing ?  'Sauvegarder' :  ' Modifier mes informations' }}
  </button>
</template>

<style>
</style>
