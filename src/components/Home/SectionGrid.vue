<script lang="ts" setup>
defineProps<{
  id: string
  colsDesktop: string
  colsTablet: string
  colsMobile: string
}>()
</script>




<template>
  <section :id="id" class="grid max-w-screen-xl px-4 py-8 mx-auto my-10" :class="`grid-cols-${colsDesktop} max-md:grid-cols-${colsTablet} max-sm:grid-cols-${colsMobile}`" >
    <slot />
  </section>
</template>




