<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/HeaderPage.vue'
import Notification from './components/ToastNotification.vue';








</script>

<template>
  <Header />
  <Notification />
  <RouterView />
  <footer>
    <h1>Footer</h1>
  </footer>
</template>


