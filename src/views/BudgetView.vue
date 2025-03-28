<template>
  <div class="p-5 bg-base-100">
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


const budgetStore = useBudgetStore()


onMounted(async () => {
  try {

    // Puis charger les transactions
    await budgetStore.loadTransactions()

    console.log('Données chargées avec succès dans BudgetView')
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error)
    alert('Une erreur est survenue lors du chargement des données.')
  }
})
</script>
