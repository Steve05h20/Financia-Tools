<script lang="ts" setup>
import SectionGrid from '@/components/Home/SectionGrid.vue'
import { dataSection } from './dataSection'

const { images, platformDescriptions, nameSection } = dataSection()
</script>
<template>
  <div class="bg-base-100">
    <div class="mx-auto">
      <div
        class=" bg-linear-to-b from-base-100 to-slate-200 shadow-sm"
      >
    <div class="flex mx-auto h-48 max-sm:h-50 max-sm:flex-wrap max-lg:flex-wrap  items-center justify-between gap-6 w-3/4 max-sm:w-[80%]">
      <img
      v-for="(image, key) in images"
      :key="key"
        :src="image.url"
        :alt="image.alt"
        class="h-14 max-sm:h-9 max-lg:h-10 max-md:h-9 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300  transition-transform duration-300 hover:scale-110"
      />
    </div>

      </div>

      <SectionGrid :id="nameSection" colsDesktop="12" colsTablet="6" colsMobile="1">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Notre utilisation des plateformes de développement
        </h2>
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
