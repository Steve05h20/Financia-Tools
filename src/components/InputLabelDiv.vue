<script lang="ts" setup>
import Input from './Input.vue';
import Label from './Label.vue';
import { defineProps, withDefaults } from 'vue';

interface InputLabelDivProps {
  labelText: string;
  htmlFor: string;
  required?: boolean;
  modelValue: string | number | Date | undefined;
}

withDefaults(defineProps<InputLabelDivProps>(), {
  required: false,
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div>
    <Label
      :text="labelText"
      :htmlFor="htmlFor"
      :required="required"
    />
    <Input
      :id="htmlFor"
      :modelValue="modelValue"
      @update:modelValue="value => emit('update:modelValue', value)"
      v-bind="$attrs"
    />
  </div>
</template>
