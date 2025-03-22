<script lang="ts" setup>
import type { ECountry, EProvince } from '@/models/address.interface';
import type { EFieldOfStudy } from '@/models/schoolDetails.interface';
import { defineProps, defineEmits, withDefaults } from 'vue';


interface Props {
  modelValue: string | undefined;
  placeholder?: string;
  options?: EFieldOfStudy[] | EProvince[] | ECountry[];
}

withDefaults(defineProps<Props>(), {
  options: () => [],
  modelValue: '',
  placeholder: 'Sélectionnez une option'
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
};

</script>


<template>

  <select
    class="select select-ghost bg-slate-50 my-1"
    :value="modelValue"
    @change="updateValue"
  >
    <option value="" disabled>{{ placeholder }}</option>
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>

</template>

<style>
</style>
