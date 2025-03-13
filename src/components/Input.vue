<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';

interface Option {
  value: string;
  label: string;
}

withDefaults(defineProps<{
  type?: 'text' | 'email' | 'date' | 'tel' | 'password' | 'number' | 'select';
  options?: Option[];
}>(), {
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
    <input :type="type" placeholder="Type here" class="input input-ghost my-1" />
  </div>

</template>

<style>
</style>
