<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router'

const isMenuOpen = ref(false);

</script>
<template>
  <header class="navbar bg-base-100 text-base-content flex justify-around border-b-6 shadow-lg border-primary max-lg:flex-col max-lg:items-center transition-all">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl text-primary m-4 font-bold">Financia/<span class="text-black font-normal text-xs">Tools</span></h1>
      <button class="btn btn-xl hidden max-sm:block pt-1.5" :class="{ 'btn-neutral': isMenuOpen }" @click="isMenuOpen = !isMenuOpen">
        <i  v-if="!isMenuOpen"  class="material-symbols-outlined">menu</i>
        <i  v-else class="material-symbols-outlined">close</i>
      </button>
    </div>
    <nav class="flex gap-8 max-sm:flex-col m-4 w-full justify-center max-sm:h-screen" :class="{ 'max-sm:hidden ': !isMenuOpen }">
      <RouterLink
        class="btn max-sm:btn-xl"
        :class="{ 'btn-neutral': $route.path === '/' }"
        to="/"
        @click="isMenuOpen = false"
      >
        Home
      </RouterLink>
      <RouterLink
        class="btn max-sm:btn-xl"
        :class="{ 'btn-neutral': $route.path === '/budget' }"
        to="/budget"
        @click="isMenuOpen = false"
      >
        Budget
      </RouterLink>
      <RouterLink
        class="btn max-sm:btn-xl"
        :class="{ 'btn-neutral': $route.path === '/profile' }"
        to="/profile"
        @click="isMenuOpen = false"
      >
        Profile
      </RouterLink>
      <button class="btn max-sm:btn-xl btn-outline btn-primary border-2 border-primary" @click="isMenuOpen = false">S'inscrire</button>
      <button class="btn max-sm:btn-xl btn-primary" @click="isMenuOpen = false">Se connecter</button>
    </nav>

  </header>
</template>

<style scoped>
@media (max-width: 640px) {
  /* Animation d'ouverture du menu */
  nav:not(.max-sm\:hidden) {
    animation: slideDown 0.3s ease-out forwards;
  }

  /* Animation pour les éléments du menu */
  nav:not(.max-sm\:hidden) a,
  nav:not(.max-sm\:hidden) button {
    animation: fadeIn 0.4s ease-out forwards;
    opacity: 0;
  }

  /* Animation séquentielle pour chaque élément du menu */
  nav a:nth-child(1), nav button:nth-child(1) { animation-delay: 0.1s; }
  nav a:nth-child(2), nav button:nth-child(2) { animation-delay: 0.15s; }
  nav a:nth-child(3), nav button:nth-child(3) { animation-delay: 0.2s; }
  nav a:nth-child(4), nav button:nth-child(4) { animation-delay: 0.25s; }
  nav a:nth-child(5), nav button:nth-child(5) { animation-delay: 0.3s; }

  /* Keyframes pour l'animation du menu */
  @keyframes slideDown {
    from {
      transform: translateY(-30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  /* Keyframes pour l'animation des éléments du menu */
  @keyframes fadeIn {
    from {
      transform: translateY(-15px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
}
</style>

