<script lang="ts" setup>
import SectionGrid from '@/components/Home/SectionGrid.vue'
import { dataSection } from './dataSection'

const { images } = dataSection()
</script>
<template>
  <div class="py-20">
    <div class="container mx-auto">
      <div class="flex flex-nowrap items-center justify-between overflow-x-auto px-4">
        <div
          v-for="(image, key) in images"
          :key="key"
          class="flex items-center justify-center flex-shrink-0 w-24 md:w-24 mx-4"
        >
          <img
            :src="image.url"
            :alt="image.alt"
            class="w-full h-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </div>
    </div>
  </div>
</template>
