<script lang="ts" setup>
import SectionGrid from "@/components/Home/SectionGrid.vue"
import { dataSection } from "./dataSection"

const { texts, images, nameSection } = dataSection()

</script>



<template>
  <SectionGrid :id="nameSection" colsDesktop="12" colsTablet="6" colsMobile="1"  >

    <div class="col-span-9 my-auto">
        <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">{{ texts.title }}</h1>
        <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">{{ texts.description }}</p>
        <button class="btn btn-primary btn-lg">Get Started</button>
    </div>
    <div class="col-span-3 col-end-13 ">
        <img  :src="images.imageHome.url" :alt="images.imageHome.alt" class="object-contain w-[200px] max-sm:w-[150px]"  />
    </div>

  </SectionGrid>
</template>