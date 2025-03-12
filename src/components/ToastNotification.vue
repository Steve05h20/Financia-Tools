<script setup lang="ts">

import useNotification from '@/services/useNotification';

const useNotificationService = useNotification()
const notifications = useNotificationService.notifications
</script>

<template>
<div class="toast toast-top mt-24 toast-end w-48 font-semibold">
  <div
    v-for="notification in notifications"
    :key="notification.message"
    class="alert transition-all duration-500 flex items-center gap-2"
    :class="[
      `alert-${notification.type}`,
      { 'translate-x-0': notification.isVisible, 'translate-x-52': !notification.isVisible }
    ]"
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

