<template>
  <div class="flex justify-between mb-5 stats stats-vertical lg:stats-horizontal shadow">
    <div class="stat">
      <h3 class="text-xl max-sm:text-sm  font-bold stat-title">REVENUS</h3>
      <p :class="revenues >= 0 ? 'text-green-500' : 'text-red-500'" class="text-xl max-sm:text-xs font-bold stat-value">
        {{ revenues.toFixed(2) }}$
      </p>
    </div>
    <div class="stat">
      <h3 class="text-xl max-sm:text-sm font-bold stat-title ">DÉPENSES</h3>
      <p :class="expenses > 0 ? 'text-red-500' : 'text-green-500'" class="text-xl max-sm:text-xs font-bold stat-value">
        {{ expenses.toFixed(2) }}$
      </p>
    </div>
    <div class="stat">
      <h3 class="text-xl max-sm:text-sm font-bold stat-title">BALANCE</h3>
      <p :class="balance >= 0 ? 'text-green-500' : 'text-red-500'" class="text-xl max-sm:text-xs font-bold stat-value">
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
