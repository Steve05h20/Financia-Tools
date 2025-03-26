<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';
import { useEditStore } from '@/stores/profil/useEditStore';

interface Props {
  type: 'text' | 'email' | 'date' | 'tel' | 'password' | 'number' | 'select';
  placeholder: string;
  modelValue: string | number | Date | undefined;
  id?: string;
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  id: '',
});

const editStore = useEditStore();
const emit = defineEmits(['update:modelValue']);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};


</script>


<template>

  <div>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :id="id"
      @input="updateValue"
      :disabled="!editStore.isEditing"
      :readonly="!editStore.isEditing"
      :class="{
      'input my-1 w-full border-none disabled:bg-transparent disabled:opacity-100 disabled:text-black ': !editStore.isEditing,
      'input input-ghost bg-slate-50 my-1 w-full ': editStore.isEditing
      }"
    />
  </div>

</template>

<style>
</style>
