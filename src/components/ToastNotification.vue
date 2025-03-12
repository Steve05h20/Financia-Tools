<script setup lang="ts">
import useNotification from '@/services/useNotification';

const { notifications } = useNotification();
</script>

<template>
<div class="toast toast-top mt-24 toast-end w-48 font-semibold">
  <div
    v-for="notification in notifications"
    :key="notification.id"
    class="alert  transition-all duration-500 flex items-center gap-2"
    :class="{ 'translate-x-0': notification.isVisible, 'translate-x-52': !notification.isVisible , 'alert-success': notification.type === 'success', 'alert-error': notification.type === 'error', 'alert-warning': notification.type === 'warning', 'alert-info': notification.type === 'info' }"
  >
    <span class="material-symbols-outlined text-white fill-white">
      {{ notification.type === 'success' ? 'check_circle' : notification.type === 'error' ? 'error' : notification.type === 'warning' ? 'warning' : 'info' }}
    </span>
    <span class="text-white">{{ notification.message }}</span>
  </div>
</div>
</template>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 1;
}
</style>

