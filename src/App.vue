<script setup lang="ts">
import { RouterView } from 'vue-router'

import { EFrequency, EType, type ITransaction } from './models/transaction.interface';



  const Transaction1: Omit<ITransaction, "id" | "user"> = {
  description: "Facture d'électricité",
  category: "Factures",
  amount: 85.50,
  type: EType.EXPENSE,
  isDone: false,
  startDate: new Date(),
  endDate: new Date(),
  frequency: EFrequency.Monthly
}

const updateTransaction: ITransaction = {
  ...Transaction1,amount: 200
}



</script>

<template>
  <h2 v-if="useTransactionService.loading.value">...</h2>
  <h1 v-else>{{ useTransactionService.error.value }}</h1>
  <p>{{ useTransactionService.transactions.value }}</p>
  <a class="link m-2" href="/profile">profil </a>
  <a class="link m-2" href="/budget">budget </a>
  <a class="link m-2" href="/">Home d</a>
  <RouterView />



</template>
