<script lang="ts" setup>
import SectionGrid from '@/components/Home/SectionGrid.vue'
import { dataSection } from './dataSection'

const { images, platformDescriptions, nameSection } = dataSection()
</script>
<template>
  <div class="py-10 sm:py-16 md:py-20">
    <div class="container mx-auto">
      <div class="flex flex-nowrap items-center justify-between overflow-x-auto px-2 sm:px-4">
        <div
          v-for="(image, key) in images"
          :key="key"
          class="flex items-center justify-center flex-shrink-0 w-16 sm:w-16 md:w-16 lg:w-20 mx-2 sm:mx-3 md:mx-4"
        >
          <img
            :src="image.url"
            :alt="image.alt"
            class="w-full h-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </div>
      <SectionGrid :id="nameSection" colsDesktop="12" colsTablet="6" colsMobile="1">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 px-4">
          <div class="card card-border bg-base-200 w-full">
            <div class="card-body">
              <h2 class="card-title">Tailwind CSS</h2>
              <p>{{ platformDescriptions.tailwind }}</p>
            </div>
          </div>

          <div class="card card-border bg-base-200 w-full">
            <div class="card-body">
              <h2 class="card-title">Vue.js</h2>
              <p>{{ platformDescriptions.vue }}</p>
            </div>
          </div>

          <div class="card card-border bg-base-200 w-full">
            <div class="card-body">
              <h2 class="card-title">TypeScript</h2>
              <p>{{ platformDescriptions.typescript }}</p>
            </div>
          </div>

          <div class="card card-border bg-base-200 w-full">
            <div class="card-body">
              <h2 class="card-title">DaisyUI</h2>
              <p>{{ platformDescriptions.daisyui }}</p>
            </div>
          </div>

          <div class="card card-border bg-base-200 w-full">
            <div class="card-body">
              <h2 class="card-title">Figma</h2>
              <p>{{ platformDescriptions.figma }}</p>
            </div>
          </div>

          <div class="card card-border bg-base-200 w-full">
            <div class="card-body">
              <h2 class="card-title">GitHub</h2>
              <p>{{ platformDescriptions.github }}</p>
            </div>
          </div>

          <div class="card card-border bg-base-200 w-full">
            <div class="card-body">
              <h2 class="card-title">Trello</h2>
              <p>{{ platformDescriptions.trello }}</p>
            </div>
          </div>
        </div>
      </SectionGrid>
    </div>
  </div>
</template>
