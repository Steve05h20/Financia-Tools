<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';

interface Option {
  value: string | number;
  label: string;
}

interface Props {
  type: 'text' | 'email' | 'date' | 'tel' | 'password' | 'number' | 'select';
  placeholder: string;
  options: Option[];
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  options: () => []
});
</script>


<template>
  <div v-if="type === 'select'">
    <select class="select select-ghost my-1">
      <option v-for="option in options" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>

  <div>
    <input :type="type" :placeholder="placeholder" class="input input-ghost my-1" />
  </div>

</template>

<style>
</style>
