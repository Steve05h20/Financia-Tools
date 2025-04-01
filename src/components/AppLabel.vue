<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';
import { useEditStore } from '@/stores/profil/useEditStore';

const editStore = useEditStore();

interface LabelProps {
  text: string;
  htmlFor?: string;
  required?: boolean;
}

withDefaults(defineProps<LabelProps>(), {
  text: '',
  htmlFor: '',
  required: false,
});


</script>

<template>
  <label :for="htmlFor" class="label w-full text-info relative group">
    {{ text }}
    <span v-if="required"
      :class="{'hidden' : !editStore.isEditing, 'text-error': editStore.isEditing }"
      >
      *
    </span>
  </label>
</template>
