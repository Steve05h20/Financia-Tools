<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';

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
    <span v-if="required" class="text-error" >*</span>
  </label>
</template>
