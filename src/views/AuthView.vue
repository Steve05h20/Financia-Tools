<script setup lang="ts">
import { useAuth } from '@/services/useAuth'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { defineEmits } from 'vue'
import { useUserStore } from '@/stores/useUserSotre'

// Props pour déterminer l'action (connexion ou inscription)
const props = defineProps({
  action: {
    type: String,
    required: true,
    validator: (value: string) => ['connexion', 'inscription'].includes(value),
  },
})

const router = useRouter()
const auth = useAuth()
const userStore = useUserStore()

// Détermine si l'utilisateur est sur la page d'inscription
const isSignUp = computed(() => props.action === 'inscription')

// Gestion du formulaire
const handleSubmit = async (e: Event) => {
  e.preventDefault()
  try {
    if (isSignUp.value) {
      await auth.creerUtilisateur(e)
    } else {
      await auth.connecterUtilisateur(e)
    }

    // Si la connexion/inscription est réussie
    if (userStore.user.id !== 0 && userStore.user.email !== '' && userStore.isConnected !== false) {
      // Émettre l'événement de connexion réussie pour fermer le modal
      connexionReussie()

      // Attendre un court instant pour que le modal se ferme
      await new Promise(resolve => setTimeout(resolve, 300))

      // Rediriger vers le profil
      router.push('/profile')
    } else {
      console.log('Utilisateur non connecté, redirection annulée')
    }
  } catch (error) {
    console.error('Erreur lors de la connexion/inscription:', error)
  }
}
const emits = defineEmits(['connexion-reussie', 'change-action'])

const connexionReussie = () => {
  console.log('Connexion réussie')
  emits('connexion-reussie')
}

const toggleAction = () => {
  emits('change-action', isSignUp.value ? 'connexion' : 'inscription')
}
</script>

<template>
  <div class="flex items-center justify-center bg-white">
    <form @submit.prevent="handleSubmit" class="space-y-4 p-8">
      <h1 class="text-2xl font-medium text-center">
        {{ isSignUp ? 'Inscrivez-vous' : 'Connectez-vous' }}
      </h1>

      <!-- Message d'erreur global -->
      <div
        v-if="auth.stateAcount.errorMessage"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <p>{{ auth.stateAcount.errorMessage }}</p>
      </div>

      <!-- Champ Nom d'utilisateur (uniquement pour l'inscription) -->
      <div v-if="isSignUp">
        <label for="firstName" class="label text-primary font-semibold">Prénom</label>
        <input
          type="text"
          v-model="auth.stateAcount.userName"
          @input="auth.validateUserNameRealTime(auth.stateAcount.userName)"
          id="firstName"
          placeholder="Entrez votre prénom"
          class="input w-full "
        />
        <p v-if="auth.stateAcount.validationErrors.userName" class="mt-1 text-sm text-red-600">
          {{ auth.stateAcount.validationErrors.userName }}
        </p>
      </div>

      <!-- Champ Email -->
      <div>
        <label for="email" class="label text-primary font-semibold">Email</label>
        <input
          type="email"
          v-model="auth.stateAcount.email"
          @input="auth.validateEmailRealTime(auth.stateAcount.email)"
          id="email"
          placeholder="Entrez votre email"
          class="input w-full"
        />
        <p v-if="auth.stateAcount.validationErrors.email" class="mt-1 text-sm text-red-600">
          {{ auth.stateAcount.validationErrors.email }}
        </p>
      </div>

      <!-- Champ Mot de passe -->
      <div>
        <label for="password" class="label text-primary font-semibold">Mot de passe</label>
        <input
          type="password"
          v-model="auth.stateAcount.pwd"
          @input="auth.validatePasswordRealTime(auth.stateAcount.pwd)"
          id="password"
          placeholder="Entrez votre mot de passe"
          class="input w-full"
        />
        <p v-if="auth.stateAcount.validationErrors.pwd" class="mt-1 text-sm text-red-600">
          {{ auth.stateAcount.validationErrors.pwd }}
        </p>
      </div>
      <!-- Champ confirmation Mot de passe -->
      <div v-if="isSignUp">
        <label for="confirmPassword" class="label text-primary font-semibold">Confirmez le mot de passe</label>
        <input
          type="password"
          v-model="auth.stateAcount.confirmPwd"
          @input="auth.validateConfirmPasswordRealTime(auth.stateAcount.confirmPwd)"
          id="confirmPassword"
          placeholder="Confirmez votre mot de passe"
          class="input w-full"
        />
        <p v-if="auth.stateAcount.validationErrors.confirmPwd" class="mt-1 text-sm text-red-600">
          {{ auth.stateAcount.validationErrors.confirmPwd }}
        </p>
      </div>

      <!-- Bouton de soumission -->
      <div>
        <button
          type="submit"
          :disabled="!auth.isValid || auth.stateAcount.loading"
          class="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <span v-if="auth.stateAcount.loading">Connexion en cours...</span>
          <span v-else>{{ isSignUp ? 'Créer un compte' : 'Se connecter' }}</span>
        </button>
      </div>

      <!-- Lien pour basculer entre connexion et inscription -->
      <div class="text-center">
        <button
          @click="toggleAction"
          type="button"
          class="text-primary hover:text-primary-focus hover:underline"
        >
          {{
            isSignUp
              ? 'Vous avez déjà un compte ? Connectez-vous'
              : 'Pas de compte ? Inscrivez-vous'
          }}
        </button>
      </div>
    </form>
  </div>
</template>
