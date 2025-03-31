<script lang="ts" setup>
import { useEditStore }  from '@/stores/profil/useEditStore';

const editStore = useEditStore();
</script>

<template>
  <button
    :class="editStore.isEditing ? 'btn btn-soft my-10 lg:my-0 lg:col-start-4 lg:col-span-1 lg:w-full btn-lg mr-6' : 'hidden'"
    @click="editStore.cancelEditing()"
  >
    Annuler
  </button>
</template>

<style>
</style>
