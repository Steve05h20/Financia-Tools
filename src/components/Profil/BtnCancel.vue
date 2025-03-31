<script lang="ts" setup>
import { useEditStore }  from '@/stores/profil/useEditStore';

const editStore = useEditStore();
</script>

<template>
    <button
      :class="editStore.isEditing ? 'btn btn-soft lg:my-0 lg:w-full btn-lg' : 'hidden'"
      @click="editStore.cancelEditing()"
    >
      Annuler
  </button>
</template>

<style>
</style>
