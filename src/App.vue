<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/HeaderPage.vue'
</script>

<template>
  <Header />
  <RouterView />
  <footer>
    <h1>Footer</h1>
  </footer>
</template>

