<script setup lang="ts">
import { useUserStore } from '@/stores/useUserSotre';
import { onMounted } from 'vue';

const userStore = useUserStore();

//connextion simulée test@test.com
onMounted(() => {
  userStore.loadUserData("test@test.com");
});



</script>
<template>
  <main>
    <h1>Profile</h1>
  </main>
</template>
