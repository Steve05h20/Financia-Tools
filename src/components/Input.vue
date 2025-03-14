<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';

interface Props {
  type: 'text' | 'email' | 'date' | 'tel' | 'password' | 'number' | 'select';
  placeholder: string;
}

withDefaults(defineProps<Props>(), {
  type: 'text',
});
</script>


<template>

  <div>
    <input :type="type" :placeholder="placeholder" class="input input-ghost my-1" />
  </div>

</template>

<style>
</style>
