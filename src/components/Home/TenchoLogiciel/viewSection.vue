<script lang="ts" setup>
import SectionGrid from '@/components/Home/SectionGrid.vue'
import { dataSection } from './dataSection'

const { images, platformDescriptions, nameSection } = dataSection()
</script>
<template>
  <div class="py-12 sm:py-20 md:py-24 bg-base-100">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="flex flex-nowrap items-center justify-center gap-6 overflow-x-auto py-6 bg-base-200 rounded-xl shadow-sm"
      >
        <div
          v-for="(image, key) in images"
          :key="key"
          class="flex items-center justify-center flex-shrink-0 w-11 sm:w-16 md:w-20 lg:w-24 transition-transform duration-300 hover:scale-110"
        >
          <img
            :src="image.url"
            :alt="image.alt"
            class="w-full h-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </div>

      <SectionGrid :id="nameSection" colsDesktop="12" colsTablet="6" colsMobile="1">
        <h1 class="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Notre utilisation des plateformes de développement
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div
            class="card card-border bg-base-100 w-full shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div class="card-body">
              <h2 class="card-title text-2xl text-primary">Tailwind CSS</h2>
              <p class="text-base-content/80">{{ platformDescriptions.tailwind }}</p>
            </div>
          </div>

          <div
            class="card card-border bg-base-100 w-full shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div class="card-body">
              <h2 class="card-title text-2xl text-primary">Vue.js</h2>
              <p class="text-base-content/80">{{ platformDescriptions.vue }}</p>
            </div>
          </div>

          <div
            class="card card-border bg-base-100 w-full shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div class="card-body">
              <h2 class="card-title text-2xl text-primary">TypeScript</h2>
              <p class="text-base-content/80">{{ platformDescriptions.typescript }}</p>
            </div>
          </div>

          <div
            class="card card-border bg-base-100 w-full shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div class="card-body">
              <h2 class="card-title text-2xl text-primary">DaisyUI</h2>
              <p class="text-base-content/80">{{ platformDescriptions.daisyui }}</p>
            </div>
          </div>

          <div
            class="card card-border bg-base-100 w-full shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div class="card-body">
              <h2 class="card-title text-2xl text-primary">Figma</h2>
              <p class="text-base-content/80">{{ platformDescriptions.figma }}</p>
            </div>
          </div>

          <div
            class="card card-border bg-base-100 w-full shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div class="card-body">
              <h2 class="card-title text-2xl text-primary">GitHub</h2>
              <p class="text-base-content/80">{{ platformDescriptions.github }}</p>
            </div>
          </div>

          <div
            class="card card-border bg-base-100 w-full shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div class="card-body">
              <h2 class="card-title text-2xl text-primary">Trello</h2>
              <p class="text-base-content/80">{{ platformDescriptions.trello }}</p>
            </div>
          </div>
        </div>
      </SectionGrid>
    </div>
  </div>
</template>
