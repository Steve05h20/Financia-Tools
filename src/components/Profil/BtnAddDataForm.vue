<script lang="ts" setup>
defineProps({
  buttonText: {
    type: String,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['add'])
</script>

<template>
  <div v-if="!loading" class="flex justify-center my-5">
    <button
      @click="$emit('add')"
      class="btn btn-primary"
    >
      {{ buttonText }}
    </button>
  </div>
</template>
