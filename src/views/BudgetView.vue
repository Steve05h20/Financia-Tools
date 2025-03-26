<template>
  <div class="p-5">
    <BudgetSummary />
    <TransactionForm />
    <TransactionList />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { useBudgetStore } from '../stores/useBudgetStore'
import BudgetSummary from '../components/Budget/BudgetSummary.vue'
import TransactionForm from '../components/Budget/TransactionForm.vue'
import TransactionList from '../components/Budget/TransactionList.vue'
import { useUserStore } from '../stores/useUserSotre'

const budgetStore = useBudgetStore()
const userStore = useUserStore()

// Connexion simulée et chargement des données en une seule fois
onMounted(async () => {
  try {
    // Charger d'abord les données utilisateur
    await userStore.loadUserData('test@test.com')

    // Puis charger les transactions
    await budgetStore.loadTransactions()

    console.log('Données chargées avec succès dans BudgetView')
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error)
    alert('Une erreur est survenue lors du chargement des données.')
  }
})
</script>
