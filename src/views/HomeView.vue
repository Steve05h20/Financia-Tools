<script setup lang="ts">
import ViewConference from '@/components/Home/Conferences/viewConference.vue'
import ViewSection from '@/components/Home/TenchoLogiciel/viewSection.vue'
import HeroSection from '@/components/Home/Hero/HeroSection.vue';
</script>

<template>
  <main class="bg-white">
    <HeroSection />
    <ViewSection />
    <ViewConference />
  </main>
</template>
