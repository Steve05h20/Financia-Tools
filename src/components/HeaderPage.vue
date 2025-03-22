<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AuthView from '@/views/AuthView.vue'

// Références pour les modals
const inscriptionModalRef = ref<HTMLDialogElement | null>(null)
const connexionModalRef = ref<HTMLDialogElement | null>(null)

// Fonction pour alterner entre les modals
const toggleModal = () => {
  if (inscriptionModalRef.value?.open) {
    inscriptionModalRef.value.close()
    connexionModalRef.value?.showModal()
  } else {
    connexionModalRef.value?.close()
    inscriptionModalRef.value?.showModal()
  }
}
</script>
<template>
  <header class="navbar bg-base-300 text-base-content flex justify-around">
    <h1>Logo</h1>
    <nav class="flex gap-8">
      <RouterLink class="btn" :class="{ 'btn-secondary': $route.path === '/' }" to="/">
        Home
      </RouterLink>
      <RouterLink class="btn" :class="{ 'btn-secondary': $route.path === '/budget' }" to="/budget">
        Budget
      </RouterLink>
      <RouterLink
        class="btn"
        :class="{ 'btn-secondary': $route.path === '/profile' }"
        to="/profile"
      >
        Profile
      </RouterLink>
      <button class="btn" @click="connexionModalRef?.showModal()">Se connecter</button>
      <button class="btn" @click="inscriptionModalRef?.showModal()">S'inscrire</button>
    </nav>
  </header>
  <!-- Modal pour l'inscription -->

  <dialog ref="inscriptionModalRef" class="modal w-96 h-auto m-auto">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <AuthView action="inscription" @toggle-action="toggleModal" />
    </div>
  </dialog>

  <!-- Modal pour la connexion -->
  <dialog ref="connexionModalRef" class="modal w-96 h-auto m-auto">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <AuthView action="connexion" @toggle-action="toggleModal" />
    </div>
  </dialog>
</template>
