<script lang="ts" setup>
import type { ECountry, EProvince, EAddressType } from '@/models/address.interface';
import type { EFieldOfStudy } from '@/models/schoolDetails.interface';
import { defineProps, defineEmits, withDefaults } from 'vue';
import { useEditStore } from '@/stores/profil/useEditStore';


interface Props {
  modelValue: string | undefined;
  placeholder?: string;
  options?: EFieldOfStudy[] | EProvince[] | ECountry[] | EAddressType[];
}

withDefaults(defineProps<Props>(), {
  options: () => [],
  modelValue: '',
  placeholder: 'Sélectionnez une option'
});

const editStore = useEditStore();
const emit = defineEmits(['update:modelValue']);

const updateValue = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
};

</script>


<template>

  <select
    :value="modelValue"
    @change="updateValue"
    :disabled="!editStore.isEditing"
    :readonly="!editStore.isEditing"
    :class="{
      'input my-1 w-full border-none disabled:bg-transparent disabled:opacity-100 disabled:text-black': !editStore.isEditing,
      'input input-ghost bg-slate-50 my-1 w-full': editStore.isEditing
      }"
  >
    <option value="" disabled>{{ placeholder }}</option>
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>

</template>

<style>
</style>
