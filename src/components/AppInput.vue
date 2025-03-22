<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';

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
      class="input input-ghost bg-slate-50 my-1 w-full" />
  </div>

</template>

<style>
</style>
