<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';

interface LabelProps {
  text: string;
  htmlFor?: string;
  required?: boolean;
}

withDefaults(defineProps<LabelProps>(), {
  htmlFor: '',
  required: false,
});

</script>

<template>
  <label :for="htmlFor" class="label w-full">
    {{ text }}
    <span v-if="required" >*</span>
  </label>
</template>

<style>
</style>
