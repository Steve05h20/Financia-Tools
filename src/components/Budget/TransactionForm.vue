<template>
  <div class="bg-white p-5 rounded-lg shadow-md mb-5">
    <h2 class="text-lg font-semibold mb-4">Ajouter une facture</h2>
    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm text-gray-600 mb-1">Description</label>
        <input
          v-model="form.description"
          type="text"
          placeholder="Description de la facture"
          class="w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label class="block text-sm text-gray-600 mb-1">Montant</label>
        <input
          v-model.number="form.amount"
          type="number"
          placeholder="0"
          class="w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label class="block text-sm text-gray-600 mb-1">Date de début</label>
        <input v-model="form.startDate" type="date" class="w-full p-2 border rounded-md" />
      </div>
      <div>
        <label class="block text-sm text-gray-600 mb-1">Date de fin</label>
        <input v-model="form.endDate" type="date" class="w-full p-2 border rounded-md" />
      </div>
      <div>
        <label class="block text-sm text-gray-600 mb-1">Fréquence</label>
        <select v-model="form.frequency" class="w-full p-2 border rounded-md">
          <option v-for="(value, key) in EFrequency" :key="key" :value="value">
            {{ key }}
          </option>
        </select>
      </div>
      <div>
        <label class="block text-sm text-gray-600 mb-1">Catégorie</label>
        <select v-model="form.category" class="w-full p-2 border rounded-md">
          <option value="Factures">Factures</option>
          <option value="Revenue">Revenue</option>
        </select>
      </div>
      <div class="flex items-center">
        <input v-model="form.isDone" type="checkbox" class="mr-2" />
        <label class="text-sm text-gray-600">Payée</label>
      </div>
      <div class="md:col-span-2">
        <button type="submit" class="btn max-sm:btn-xl btn-primary">Ajouter la facture</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useBudgetStore } from '../../stores/useBudgetStore'
import { EFrequency, EType, ITransaction } from '../../models/transaction.interface'
import { useUserStore } from '../../stores/useUserSotre'

const budgetStore = useBudgetStore()
const userStore = useUserStore()

const form = ref<Partial<ITransaction>>({
  description: '',
  amount: 0,
  startDate: new Date(),
  endDate: new Date(),
  frequency: EFrequency.Monthly,
  category: 'Factures',
  isDone: false,
})

const handleSubmit = async () => {
  if (!form.value.amount || !form.value.description) {
    alert('Veuillez remplir tous les champs obligatoires.')
    return
  }

  const type = form.value.category === 'Revenue' ? EType.REVENUE : EType.EXPENSE

  try {
    await budgetStore.addTransactionByType(
      {
        description: form.value.description,
        amount: form.value.amount,
        startDate: new Date(form.value.startDate!),
        endDate: form.value.endDate ? new Date(form.value.endDate) : undefined,
        frequency: form.value.frequency!,
        category: form.value.category,
        isDone: form.value.isDone!,
        user: userStore.user,
      },
      type,
    )

    form.value = {
      description: '',
      amount: 0,
      startDate: new Date(),
      endDate: new Date(),
      frequency: EFrequency.Monthly,
      category: 'Factures',
      isDone: false,
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout de la transaction:", error)
    alert("Une erreur est survenue lors de l'ajout de la transaction.")
  }
}
</script>
