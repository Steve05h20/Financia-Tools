<script lang="ts" setup>
import AppInput from './AppInput.vue';
import AppLabel from './AppLabel.vue';
import { defineProps, withDefaults } from 'vue';

interface InputLabelDivProps {
  labelText: string;
  htmlFor: string;
  required?: boolean;
  modelValue: string | number | Date | undefined;
  type?: 'text' | 'email' | 'date' | 'tel' | 'password' | 'number' | 'select';
  placeholder?: string;
}

withDefaults(defineProps<InputLabelDivProps>(), {
  required: false,
  type: 'text',
  placeholder: '',
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="">
    <AppLabel
      :text="labelText"
      :htmlFor="htmlFor"
      :required="required"
    />
    <AppInput
      :id="htmlFor"
      :type="type"
      :placeholder="placeholder"
      :modelValue="modelValue"
      @update:modelValue="(value: any) => emit('update:modelValue', value)"
      v-bind="$attrs"
    />
  </div>
</template>
