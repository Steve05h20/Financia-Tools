<script lang="ts" setup>
import { ref } from 'vue'
import { HeroDataSection } from './HeroDataSection'
import SectionGrid from "@/components/Home/SectionGrid.vue"
import AuthView from '@/views/AuthView.vue'

const { texts, images, nameSection } = HeroDataSection()

const isModalOpen = ref(false)
const currentAction = ref<'connexion' | 'inscription'>('inscription')

const openSignupModal = () => {
  currentAction.value = 'inscription'
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const handleChangeAction = (newAction: any) => {
  if (newAction === 'connexion' || newAction === 'inscription') {
    currentAction.value = newAction
  } else {
    console.error('Action non reconnue:', newAction)
  }
}

const handleAuthSuccess = () => {
  closeModal()
}
</script>

<template>
  <div class="relative h-120 md:h-[500px] lg:h-[600px]">
    <div
      class="absolute inset-0 bg-cover bg-center brightness-50"
      :style="{ backgroundImage: `url(${images.imageHero.url})` }">
    </div>

    <SectionGrid
      :id="nameSection"
      colsDesktop="12"
      colsTablet="6"
      colsMobile="1"
      class="relative z-10 h-full flex items-center"
    >
      <div class="col-span-12 text-center md:text-left lg:col-span-7 md:col-span-6 text-white m-8">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 md:mb-6">{{ texts.title }}</h1>
        <p class="text-base md:text-lg mb-6 md:mb-8 max-w-xl">
          {{ texts.description }}
        </p>
        <button
          @click="openSignupModal"
          class="btn btn-primary btn-lg p-6 mt-15">S'inscrire</button>
      </div>

      <div class="col-span-12 lg:col-span-5 md:col-span-6 flex justify-center items-center mt-6 lg:mt-0">
        <img
          :src="images.imagePhone.url"
          :alt="images.imagePhone.alt"
          class="object-contain hidden md:inline-block md:w-[150px] lg:w-[220px] drop-shadow-2xl"
        />
      </div>
    </SectionGrid>
  </div>

  <!-- Modal avec AuthView -->
  <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center z-50">
    <div
      class="fixed inset-0 transition-opacity backdrop-blur-sm  bg-opacity-70"
      @click="closeModal"
    ></div>

    <div class="relative bg-white bg-opacity-95 rounded-lg shadow-xl w-full max-w-md mx-4 z-10">
      <button
        @click="closeModal"
        class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <AuthView
        :action="currentAction"
        @connexion-reussie="handleAuthSuccess"
        @change-action="handleChangeAction"
      />
    </div>
  </div>
</template>
