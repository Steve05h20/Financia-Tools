<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-primary">Liste des transactions</h2>

    <!-- Vue mobile : cartes -->
    <div class="block lg:hidden space-y-4">
      <div
        v-for="transaction in transactions"
        :key="transaction.id ?? 0"
        class="p-3 border rounded-lg shadow-sm"
      >
        <div class="flex justify-between items-center mb-2">
          <span
            v-if="!editingTransaction || editingTransaction.id !== transaction.id"
            class="font-medium"
          >
            {{ transaction.description ?? '-' }}
          </span>
          <input
            v-else
            v-model="editingTransaction.description"
            type="text"
            class="w-full p-1 border rounded text-sm"
          />
          <span
            :class="
              transaction.type === EType.EXPENSE
                ? 'bg-red-100 text-red-600'
                : 'bg-green-100 text-green-600'
            "
            class="px-2 py-1 rounded text-xs"
          >
            {{ transaction.type }}
          </span>
        </div>
        <div class="grid grid-cols-2 gap-2 text-sm mb-3">
          <div>
            <p class="text-gray-500">Montant</p>
            <p
              v-if="!editingTransaction || editingTransaction.id !== transaction.id"
              class="font-medium"
            >
              {{ transaction.amount }} $
            </p>
            <input
              v-else
              v-model.number="editingTransaction.amount"
              type="number"
              class="w-full p-1 border rounded text-sm"
            />
          </div>
          <div>
            <p class="text-gray-500">Catégorie</p>
            <p v-if="!editingTransaction || editingTransaction.id !== transaction.id">
              {{ transaction.category ?? '-' }}
            </p>
            <select
              v-else
              v-model="editingTransaction.category"
              class="w-full p-1 border rounded text-sm"
            >
              <option value="Dépenses">Dépenses</option>
              <option value="Revenue">Revenue</option>
            </select>
          </div>
          <div>
            <p class="text-gray-500">Date de début</p>
            <p v-if="!editingTransaction || editingTransaction.id !== transaction.id">
              {{ formatDate(transaction.startDate) }}
            </p>
            <input
              v-else
              v-model="editingTransaction.startDate"
              type="date"
              class="w-full p-1 border rounded text-sm"
            />
          </div>
          <div>
            <p class="text-gray-500">Date de fin</p>
            <p v-if="!editingTransaction || editingTransaction.id !== transaction.id">
              {{ transaction.endDate ? formatDate(transaction.endDate) : '-' }}
            </p>
            <input
              v-else
              v-model="editingTransaction.endDate"
              type="date"
              class="w-full p-1 border rounded text-sm"
            />
          </div>
          <div>
            <p class="text-gray-500">Fréquence</p>
            <p v-if="!editingTransaction || editingTransaction.id !== transaction.id">
              {{ getFrequencyLabel(transaction.frequency) }}
            </p>
            <select
              v-else
              v-model="editingTransaction.frequency"
              class="w-full p-1 border rounded text-sm"
            >
              <option v-for="(value, key) in EFrequency" :key="key" :value="value">
                {{ key }}
              </option>
            </select>
          </div>
          <div>
            <p class="text-gray-500">Statut</p>
            <button
              v-if="!editingTransaction || editingTransaction.id !== transaction.id"
              @click="toggleStatus(transaction)"
              :class="transaction.isDone ? 'bg-green-500' : 'bg-yellow-500'"
              class="mt-1 px-2 py-0.5 rounded text-white text-xs"
            >
              {{ transaction.isDone ? 'Payée' : 'En attente' }}
            </button>
            <div v-else class="flex items-center mt-1">
              <input v-model="editingTransaction.isDone" type="checkbox" class="mr-2" />
              <span class="text-sm">Payée</span>
            </div>
          </div>
        </div>
        <div class="flex justify-end space-x-2 mt-2 border-t pt-2">
          <button
            v-if="!editingTransaction || editingTransaction.id !== transaction.id"
            @click="startEditing(transaction)"
            class="bg-blue-500 text-white px-3 py-1 rounded text-sm"
          >
            Éditer
          </button>
          <button
            v-if="editingTransaction && editingTransaction.id === transaction.id"
            @click="saveEditing"
            class="bg-green-500 text-white px-3 py-1 rounded text-sm"
          >
            Sauvegarder
          </button>
          <button
            v-if="editingTransaction && editingTransaction.id === transaction.id"
            @click="cancelEditing"
            class="bg-gray-500 text-white px-3 py-1 rounded text-sm"
          >
            Annuler
          </button>
          <button
            v-if="
              transaction.id !== undefined &&
              (!editingTransaction || editingTransaction.id !== transaction.id)
            "
            @click="handleDelete(transaction.id)"
            class="bg-red-500 text-white px-3 py-1 rounded text-sm"
          >
            Supprimer
          </button>
        </div>
      </div>

    <!-- Vue desktop : tableau -->
    <div class="hidden lg:block overflow-x-auto">
      <table class="min-w-full text-left text-sm">
        <thead>
          <tr class="bg-gray-50 text-gray-600">
            <th class="p-2 font-medium">Description</th>
            <th class="p-2 font-medium">Montant</th>
            <th class="p-2 font-medium">Type</th>
            <th class="p-2 font-medium">Date de début</th>
            <th class="p-2 font-medium hidden xl:table-cell">Date de fin</th>
            <th class="p-2 font-medium hidden xl:table-cell">Fréquence</th>
            <th class="p-2 font-medium">Catégorie</th>
            <th class="p-2 font-medium">Statut</th>
            <th class="p-2 font-medium text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="transaction in transactions"
            :key="transaction.id ?? 0"
            class="border-t hover:bg-gray-50"
          >
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
              <span
                v-if="!editingTransaction || editingTransaction.id !== transaction.id"
                class="font-medium"
              >
                {{ transaction.amount }} $
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
                class="px-2 py-1 rounded text-xs"
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
            <td class="p-2 hidden xl:table-cell">
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
            <td class="p-2 hidden xl:table-cell">
              <span v-if="!editingTransaction || editingTransaction.id !== transaction.id">
                {{ getFrequencyLabel(transaction.frequency) }}
              </span>
              <select
                v-else
                v-model="editingTransaction.frequency"
                class="w-full p-1 border rounded"
              >
                <option v-for="(value, key) in EFrequency" :key="key" :value="value">
                  {{ key }}
                </option>
              </select>
            </td>
            <td class="p-2">
              <span v-if="!editingTransaction || editingTransaction.id !== transaction.id">
                {{ transaction.category ?? '-' }}
              </span>
              <select
                v-else
                v-model="editingTransaction.category"
                class="w-full p-1 border rounded"
              >
                <option value="Dépenses">Dépenses</option>
                <option value="Revenue">Revenue</option>
              </select>
            </td>
            <td class="p-2">
              <button
                v-if="!editingTransaction || editingTransaction.id !== transaction.id"
                @click="toggleStatus(transaction)"
                :class="transaction.isDone ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'"
                class="px-2 py-1 rounded text-xs"
              >
                {{ transaction.isDone ? 'Payée' : 'En attente' }}
              </button>
              <div v-else class="flex items-center">
                <input v-model="editingTransaction.isDone" type="checkbox" class="mr-2" />
                <span class="text-sm">Payée</span>
              </div>
            </td>
            <td class="p-2">
              <div class="flex justify-center space-x-1">
                <button
                  v-if="!editingTransaction || editingTransaction.id !== transaction.id"
                  @click="toggleStatus(transaction)"
                  :class="transaction.isDone ? 'badge badge-success' : 'badge badge-warning'"
                >
                  {{ transaction.isDone ? 'Payée' : 'En attente' }}
                </button>
                <div v-else class="flex items-center">
                  <input v-model="editingTransaction.isDone" type="checkbox" class="toggle toggle-sm toggle-success mr-2" />
                  <span class="text-sm">Payée</span>
                </div>
              </td>
              <td>
                <div class="flex justify-center gap-1">
                  <button
                    v-if="!editingTransaction || editingTransaction.id !== transaction.id"
                    @click="startEditing(transaction)"
                    class="btn btn-xs btn-info"
                  >
                    Éditer
                  </button>
                  <button
                    v-if="editingTransaction && editingTransaction.id === transaction.id"
                    @click="saveEditing"
                    class="btn btn-xs btn-success"
                  >
                    Sauver
                  </button>
                  <button
                    v-if="editingTransaction && editingTransaction.id === transaction.id"
                    @click="cancelEditing"
                    class="btn btn-xs btn-ghost"
                  >
                    Annuler
                  </button>
                  <button
                    v-if="
                      transaction.id !== undefined &&
                      (!editingTransaction || editingTransaction.id !== transaction.id)
                    "
                    @click="handleDelete(transaction.id)"
                    class="btn btn-xs btn-error"
                  >
                    <span class="hidden sm:inline">Supprimer</span>
                    <span class="sm:hidden">X</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    <div v-if="transactions.length === 0" class="text-center py-8 text-gray-500">
      Aucune transaction à afficher
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { EFrequency, EType } from '../../models/transaction.interface'
import type { ITransaction } from '../../models/transaction.interface'
import { useBudgetStore } from '../../stores/useBudgetStore'

const budgetStore = useBudgetStore()
const transactions = budgetStore.transactions
const editingTransaction = ref<ITransaction | null>(null)
const isEditModalOpen = ref(false)

const formatDate = (date: Date | string): string => {
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
    console.error('Erreur lors de la mise à jour du statut :', error)
    alert('Erreur lors de la mise à jour.')
  }
}

const handleDelete = async (id: number) => {
  if (confirm('Voulez-vous vraiment supprimer cette transaction ?')) {
    try {
      await budgetStore.deleteTransaction(id)
    } catch (error) {
      console.error('Erreur lors de la suppression :', error)
      alert('Erreur lors de la suppression.')
    }
  }
}

const startEditing = (transaction: ITransaction) => {
  editingTransaction.value = {
    ...transaction,
    startDate: formatDate(transaction.startDate),
    endDate: transaction.endDate ? formatDate(transaction.endDate) : undefined,
  }
}

const saveEditing = async () => {
  if (!editingTransaction.value || editingTransaction.value.id === undefined) return
  try {
    const updatedTransaction = {
      ...editingTransaction.value,
      startDate: new Date(editingTransaction.value.startDate),
      endDate: editingTransaction.value.endDate
        ? new Date(editingTransaction.value.endDate)
        : undefined,
    }
    await budgetStore.updateTransaction(editingTransaction.value.id, updatedTransaction)
    editingTransaction.value = null
    isEditModalOpen.value = false
  } catch (error) {
    console.error('Erreur lors de la sauvegarde :', error)
    alert('Erreur lors de la sauvegarde.')
  }
}

const cancelEditing = () => {
  editingTransaction.value = null
  isEditModalOpen.value = false
}

const rechargerTransactions = async () => {
  try {
    isLoading.value = true
    await budgetStore.loadTransactions()
    console.log('Transactions rechargées:', transactions.value)
  } catch (error) {
    console.error('Erreur lors du rechargement des transactions:', error)
  } finally {
    isLoading.value = false
  }
}

const capitalizeText = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

onMounted(async () => {
  try {
    isLoading.value = true
    await budgetStore.loadTransactions()
  }
})
</script>
