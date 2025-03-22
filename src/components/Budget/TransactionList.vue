<template>
  <div class="bg-white p-5 rounded-lg shadow-md">
    <h2 class="text-lg font-semibold mb-4">Liste des transactions</h2>
    <table class="w-full text-left">
      <thead>
        <tr class="text-sm text-gray-600">
          <th class="p-2">Description</th>
          <th class="p-2">Montant</th>
          <th class="p-2">Type</th>
          <th class="p-2">Date de début</th>
          <th class="p-2">Date de fin</th>
          <th class="p-2">Fréquence</th>
          <th class="p-2">Catégorie</th>
          <th class="p-2">Statut</th>
          <th class="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in transactions" :key="transaction.id ?? 0" class="border-t">
          <td class="p-2">
            <span v-if="!editingTransaction || editingTransaction.id !== transaction.id">
              {{ transaction.description ?? '-' }}
            </span>
            <input
              v-else
              v-model="editingTransaction.description"
              type="text"
              class="w-full p-1 border rounded"
            />
          </td>
          <td class="p-2">
            <span v-if="!editingTransaction || editingTransaction.id !== transaction.id">
              {{ transaction.amount }}€
            </span>
            <input
              v-else
              v-model.number="editingTransaction.amount"
              type="number"
              class="w-full p-1 border rounded"
            />
          </td>
          <td class="p-2">
            <span
              :class="
                transaction.type === EType.EXPENSE
                  ? 'bg-red-100 text-red-600'
                  : 'bg-green-100 text-green-600'
              "
              class="px-2 py-1 rounded"
            >
              {{ transaction.type }}
            </span>
          </td>
          <td class="p-2">
            <span v-if="!editingTransaction || editingTransaction.id !== transaction.id">
              {{ formatDate(transaction.startDate) }}
            </span>
            <input
              v-else
              v-model="editingTransaction.startDate"
              type="date"
              class="w-full p-1 border rounded"
            />
          </td>
          <td class="p-2">
            <span v-if="!editingTransaction || editingTransaction.id !== transaction.id">
              {{ transaction.endDate ? formatDate(transaction.endDate) : '-' }}
            </span>
            <input
              v-else
              v-model="editingTransaction.endDate"
              type="date"
              class="w-full p-1 border rounded"
            />
          </td>
          <td class="p-2">
            <span v-if="!editingTransaction || editingTransaction.id !== transaction.id">
              {{ getFrequencyLabel(transaction.frequency) }}
            </span>
            <select v-else v-model="editingTransaction.frequency" class="w-full p-1 border rounded">
              <option v-for="(value, key) in EFrequency" :key="key" :value="value">
                {{ key }}
              </option>
            </select>
          </td>
          <td class="p-2">
            <span v-if="!editingTransaction || editingTransaction.id !== transaction.id">
              {{ transaction.category ?? '-' }}
            </span>
            <select v-else v-model="editingTransaction.category" class="w-full p-1 border rounded">
              <option value="Factures">Factures</option>
              <option value="Revenue">Revenue</option>
            </select>
          </td>
          <td class="p-2">
            <button
              v-if="!editingTransaction || editingTransaction.id !== transaction.id"
              @click="toggleStatus(transaction)"
              :class="transaction.isDone ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'"
              class="px-3 py-1 rounded"
            >
              {{ transaction.isDone ? 'Payée' : 'En attente' }}
            </button>
            <input v-else v-model="editingTransaction.isDone" type="checkbox" class="mr-2" />
          </td>
          <td class="p-2 flex space-x-2">
            <button
              v-if="!editingTransaction || editingTransaction.id !== transaction.id"
              @click="startEditing(transaction)"
              class="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Éditer
            </button>
            <button
              v-if="editingTransaction && editingTransaction.id === transaction.id"
              @click="saveEditing"
              class="bg-green-500 text-white px-2 py-1 rounded"
            >
              Sauvegarder
            </button>
            <button
              v-if="editingTransaction && editingTransaction.id === transaction.id"
              @click="cancelEditing"
              class="bg-gray-500 text-white px-2 py-1 rounded"
            >
              Annuler
            </button>
            <button
              v-if="
                transaction.id !== undefined &&
                (!editingTransaction || editingTransaction.id !== transaction.id)
              "
              @click="handleDelete(transaction.id)"
              class="bg-red-500 text-white px-2 py-1 rounded"
            >
              X
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { EFrequency, ITransaction } from '../../models/transaction.interface'
import { useBudgetStore } from '../../stores/useBudgetStore'

const budgetStore = useBudgetStore()

const transactions = budgetStore.transactions

const editingTransaction = ref<ITransaction | null>(null)

const formatDate = (date: Date): string => {
  return new Date(date).toISOString().split('T')[0]
}

const getFrequencyLabel = (frequency: EFrequency): string => {
  const frequencyLabel = Object.keys(EFrequency).find(
    (key) => EFrequency[key as keyof typeof EFrequency] === frequency,
  )
  return frequencyLabel ?? '-'
}

const toggleStatus = async (transaction: ITransaction) => {
  if (transaction.id === undefined) return
  try {
    await budgetStore.updateTransaction(transaction.id, {
      ...transaction,
      isDone: !transaction.isDone,
    })
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la transaction:', error)
    alert('Une erreur est survenue lors de la mise à jour de la transaction.')
  }
}

const handleDelete = async (id: number) => {
  try {
    await budgetStore.deleteTransaction(id)
  } catch (error) {
    console.error('Erreur lors de la suppression de la transaction:', error)
    alert('Une erreur est survenue lors de la suppression de la transaction.')
  }
}

const startEditing = (transaction: ITransaction) => {
  editingTransaction.value = { ...transaction }
}

const saveEditing = async () => {
  if (!editingTransaction.value || editingTransaction.value.id === undefined) return
  try {
    await budgetStore.updateTransaction(editingTransaction.value.id, editingTransaction.value)
    editingTransaction.value = null
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la transaction:', error)
    alert('Une erreur est survenue lors de la sauvegarde de la transaction.')
  }
}

// Annuler l'édition
const cancelEditing = () => {
  editingTransaction.value = null
}
</script>
