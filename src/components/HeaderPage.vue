<script setup lang="ts">
import AuthView from '@/views/AuthView.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser, faWallet, faHome, faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import HeaderAvatar from './HeaderAvatar.vue'
import { useUserStore } from '@/stores/useUserSotre'
import { useAuth } from '@/services/useAuth'

const userStore = useUserStore()
const isMenuOpen = ref(false)
const auth = useAuth()

// Références pour les modals
const inscriptionModalRef = ref<HTMLDialogElement | null>(null)
const connexionModalRef = ref<HTMLDialogElement | null>(null)

// Fonction pour alterner entre les modals
const toggleModal = () => {
  if (inscriptionModalRef.value?.open) {
    inscriptionModalRef.value.close()
    auth.resetForm()
    connexionModalRef.value?.showModal()
  } else {
    connexionModalRef.value?.close()
    auth.resetForm()
    inscriptionModalRef.value?.showModal()
  }
}

// Fonction pour fermer le modal
const fermerModal = () => {
  if (connexionModalRef.value && inscriptionModalRef.value) {
    connexionModalRef.value.close()
    inscriptionModalRef.value.close()
    auth.resetForm()
  }
}

// Fonction pour gérer la fermeture manuelle des modales
const handleCloseModal = () => {
  auth.resetForm()
}
</script>
<template>
  <div class="fixed top-0 left-0 right-0 z-50">
    <header
      class="navbar bg-base-100 text-base-content flex justify-around border-b-6 shadow-lg border-primary max-lg:flex-col max-lg:items-center transition-all"
    >
      <div class="flex justify-between items-center">
        <h1 class="text-3xl text-primary m-4 font-bold">
          Financia/<span class="text-black font-normal text-xs">Tools</span>
        </h1>
        <button
          class="btn btn-xl hidden max-sm:block pt-1.5"
          :class="{ 'btn-neutral': isMenuOpen }"
          @click="isMenuOpen = !isMenuOpen"
        >
          <i v-if="!isMenuOpen" class="material-symbols-outlined">menu</i>
          <i v-else class="material-symbols-outlined">close</i>
        </button>
      </div>
      <nav
        class="flex gap-8 max-sm:flex-col m-4 w-full items-center justify-end max-sm:justify-start max-lg:justify-center max-sm:h-screen"
        :class="{ 'max-sm:hidden ': !isMenuOpen }"
      >
        <RouterLink
          class="btn max-sm:btn-xl"
          :class="{ 'btn-neutral': $route.path === '/' }"
          to="/"
          @click="isMenuOpen = false"
          v-if="userStore.isConnected"
        >
        <font-awesome-icon :icon="faHome" /> Home
        </RouterLink>
        <RouterLink
          class="btn max-sm:btn-xl"
          :class="{ 'btn-neutral': $route.path === '/budget' }"
          to="/budget"
          @click="isMenuOpen = false"
          v-if="userStore.isConnected"
        >
        <font-awesome-icon :icon="faWallet" /> Budget
        </RouterLink>
        <RouterLink
          class="btn max-sm:btn-xl"
          :class="{ 'btn-neutral': $route.path === '/profile' }"
          to="/profile"
          @click="isMenuOpen = false"
          v-if="userStore.isConnected"
        >
        <font-awesome-icon :icon="faUser" /> Profile
        </RouterLink>

        <div v-if="!userStore.isConnected" class="flex justify-between items-center gap-8">
          <button class="btn btn-neutral"  @click="connexionModalRef?.showModal()"> <font-awesome-icon :icon="faRightToBracket" /> Se connecter</button>
          <button class="btn btn-primary" @click="inscriptionModalRef?.showModal()"> <font-awesome-icon :icon="faUserPlus" /> S'inscrire</button>
        </div>

        <HeaderAvatar :userName="userStore.user.firstName" v-else />
      </nav>
    </header>
  </div>

  <!-- Modal pour l'inscription -->
  <dialog ref="inscriptionModalRef" class="modal w-96 h-auto m-auto">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="handleCloseModal">✕</button>
      </form>
      <AuthView action="inscription" @change-action="toggleModal" @inscription-reussie="fermerModal" @connexion-reussie="fermerModal" />
    </div>
  </dialog>

  <!-- Modal pour la connexion -->
  <dialog ref="connexionModalRef" class="modal w-96 h-auto m-auto">
    <div class="modal-box">
      <form method="dialog">
        <button @click="handleCloseModal" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <AuthView action="connexion" @inscription-reussie="fermerModal" @connexion-reussie="fermerModal" @change-action="toggleModal" />
    </div>
  </dialog>
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
  nav a:nth-child(1),
  nav button:nth-child(1) {
    animation-delay: 0.1s;
  }
  nav a:nth-child(2),
  nav button:nth-child(2) {
    animation-delay: 0.15s;
  }
  nav a:nth-child(3),
  nav button:nth-child(3) {
    animation-delay: 0.2s;
  }
  nav a:nth-child(4),
  nav button:nth-child(4) {
    animation-delay: 0.25s;
  }
  nav a:nth-child(5),
  nav button:nth-child(5) {
    animation-delay: 0.3s;
  }

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
