<template>
  <div class="flex justify-between mb-5">
    <div class="text-center">
      <h3 class="text-xl font-bold">REVENUS</h3>
      <p :class="revenues >= 0 ? 'text-green-500' : 'text-red-500'" class="text-2xl font-bold">
        {{ revenues.toFixed(2) }}$
      </p>
    </div>
    <div class="text-center">
      <h3 class="text-xl font-bold">DÉPENSES</h3>
      <p :class="expenses > 0 ? 'text-red-500' : 'text-green-500'" class="text-2xl font-bold">
        {{ expenses.toFixed(2) }}$
      </p>
    </div>
    <div class="text-center">
      <h3 class="text-xl font-bold">BALANCE</h3>
      <p :class="balance >= 0 ? 'text-green-500' : 'text-red-500'" class="text-2xl font-bold">
        {{ balance.toFixed(2) }}$
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBudgetStore } from '../../stores/useBudgetStore'
import { EType } from '../../models/transaction.interface'

const budgetStore = useBudgetStore()

const revenues = computed(() => budgetStore.getTotalByType(EType.REVENUE))
const expenses = computed(() => budgetStore.getTotalByType(EType.EXPENSE))
const balance = computed(() => revenues.value - expenses.value)
</script>
