<script lang="ts" setup>
import { ref } from 'vue'
import { HeroDataSection } from './HeroDataSection'
import SectionGrid from "@/components/Home/SectionGrid.vue"
import AuthView from '@/views/AuthView.vue'
import { useUserStore } from '@/stores/useUserSotre'
import { useRouter } from 'vue-router'

const { texts, images, nameSection } = HeroDataSection()

const router = useRouter()
const userStore = useUserStore()
const inscriptionModalRef = ref<HTMLDialogElement | null>(null)

const fermerModal = () => {
  if (inscriptionModalRef.value) {
    inscriptionModalRef.value.close()
  }
}

const handleButtonClick = () => {
  if (userStore.isConnected) {
    router.push('/budget')
  } else {
    inscriptionModalRef.value?.showModal()
  }
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
      <div class="flex flex-row items-center w-full px-8">
        <div class="col-span-12 text-center lg:text-left lg:col-span-7 md:col-span-6 text-white m-8">
          <h1 class="text-4xl md:text-5xl font-bold mb-4 md:mb-6">{{ texts.title }}</h1>
          <p class="text-base md:text-lg mb-6 md:mb-8 max-w-xl">
            {{ texts.description }}
          </p>
          <div>
            <button
              @click="handleButtonClick"
              class="btn btn-primary btn-lg p-6 sm:mt-15 mt-2"
            >
              {{ !userStore.isConnected ? 'S\'inscrire' : ' Budgeter '}}
            </button>
          </div>
        </div>

        <div class="hidden md:w-2/5 lg:w-1/3 md:flex justify-center items-center">
          <img
            :src="images.imagePhone.url"
            :alt="images.imagePhone.alt"
            class="object-contain md:w-[180px] lg:w-[250px] drop-shadow-2xl"
          />
        </div>
      </div>
    </SectionGrid>
  </div>

  <dialog ref="inscriptionModalRef" class="modal w-full md:w-96 h-auto m-auto">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <AuthView
        action="inscription"
        @inscription-reussie="fermerModal"
        @connexion-reussie="fermerModal"
      />
    </div>
  </dialog>
</template>
