<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue';
import { defineProps, withDefaults } from 'vue';
import IconUpdate from '@/components/Profil/IconUpdate.vue';

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

const route = useRoute();
const isProfil = computed(() => {
  return route.path.includes('/profile') || route.name === 'profile';
});

</script>

<template>
  <label :for="htmlFor" class="label w-full text-info relative group">
    {{ text }}
    <span v-if="required" class="text-error" >*</span>
    <div v-if="isProfil" class="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <IconUpdate />
    </div>
  </label>
</template>
