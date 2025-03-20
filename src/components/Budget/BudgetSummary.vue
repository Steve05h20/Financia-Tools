<template>
  <div class="flex justify-between mb-5">
    <div class="text-center">
      <h3 class="text-sm text-gray-600">REVENUS</h3>
      <p :class="revenues >= 0 ? 'text-green-500' : 'text-red-500'" class="text-2xl font-bold">
        {{ revenues }}$
      </p>
    </div>
    <div class="text-center">
      <h3 class="text-sm text-gray-600">DÉPENSES</h3>
      <p :class="expenses > 0 ? 'text-red-500' : 'text-green-500'" class="text-2xl font-bold">
        {{ expenses }}$
      </p>
    </div>
    <div class="text-center">
      <h3 class="text-sm text-gray-600">BALANCE</h3>
      <p :class="balance >= 0 ? 'text-green-500' : 'text-red-500'" class="text-2xl font-bold">
        {{ balance }}$
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBudgetStore } from '../../stores/useBudgetStore'
import { EType } from '../../models/transaction.interface'

const budgetStore = useBudgetStore()

const revenues = budgetStore.getTotalByType(EType.REVENUE)
const expenses = budgetStore.getTotalByType(EType.EXPENSE)
const balance = revenues - expenses
</script>
