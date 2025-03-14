<script lang="ts" setup>
import { defineProps, defineEmits, withDefaults } from 'vue';

interface Option {
  value: string | number;
  label: string;
}

interface Props {
  modelValue: string | number;
  placeholder?: string;
  options?: Option[];
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
    class="select select-ghost my-1"
    :value="modelValue"
    @change="updateValue"
  >
    <option value="" disabled>{{ placeholder }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>

</template>

<style>
</style>
