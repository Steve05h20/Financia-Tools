<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderPage from './components/HeaderPage.vue'
import Notification from './components/ToastNotification.vue'
import FooterHome from './components/FooterHome.vue'
</script>

<template>
  <HeaderPage />
  <div class="py-24">
    <Notification />
    <RouterView />
  </div>
  <FooterHome class="mt-10 fixed bottom-0 w-full bg-base-100" />
</template>
