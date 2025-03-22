<template>
  <div class="bg-white p-3 sm:p-5 rounded-lg shadow-md">
    <h2 class="text-lg font-semibold mb-2 sm:mb-4">Liste des transactions</h2>

    <!-- Vue mobile : cartes pour chaque transaction -->
    <div class="block lg:hidden space-y-4">
      <div
        v-for="transaction in transactions"
        :key="transaction.id ?? 0"
        class="p-3 border rounded-lg shadow-sm"
      >
        <div class="flex justify-between items-center mb-2">
          <span class="font-medium">{{ transaction.description ?? '-' }}</span>
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
            <p class="font-medium">{{ transaction.amount }}€</p>
          </div>
          <div>
            <p class="text-gray-500">Catégorie</p>
            <p>{{ transaction.category ?? '-' }}</p>
          </div>
          <div>
            <p class="text-gray-500">Date de début</p>
            <p>{{ formatDate(transaction.startDate) }}</p>
          </div>
          <div>
            <p class="text-gray-500">Date de fin</p>
            <p>{{ transaction.endDate ? formatDate(transaction.endDate) : '-' }}</p>
          </div>
          <div>
            <p class="text-gray-500">Fréquence</p>
            <p>{{ getFrequencyLabel(transaction.frequency) }}</p>
          </div>
          <div>
            <p class="text-gray-500">Statut</p>
            <button
              @click="toggleStatus(transaction)"
              :class="transaction.isDone ? 'bg-green-500' : 'bg-yellow-500'"
              class="mt-1 px-2 py-0.5 rounded text-white text-xs"
            >
              {{ transaction.isDone ? 'Payée' : 'En attente' }}
            </button>
          </div>
        </div>

        <!-- Actions de la vue mobile -->
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

        <!-- Formulaire d'édition en mode mobile -->
        <div
          v-if="editingTransaction && editingTransaction.id === transaction.id"
          class="mt-3 border-t pt-3"
        >
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-sm text-gray-600 mb-1">Description</label>
              <input
                v-model="editingTransaction.description"
                type="text"
                class="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">Montant</label>
              <input
                v-model.number="editingTransaction.amount"
                type="number"
                class="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">Date de début</label>
              <input
                v-model="editingTransaction.startDate"
                type="date"
                class="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">Date de fin</label>
              <input
                v-model="editingTransaction.endDate"
                type="date"
                class="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">Fréquence</label>
              <select v-model="editingTransaction.frequency" class="w-full p-2 border rounded">
                <option v-for="(value, key) in EFrequency" :key="key" :value="value">
                  {{ key }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">Catégorie</label>
              <select v-model="editingTransaction.category" class="w-full p-2 border rounded">
                <option value="Factures">Factures</option>
                <option value="Revenue">Revenue</option>
              </select>
            </div>
            <div class="flex items-center">
              <input v-model="editingTransaction.isDone" type="checkbox" class="mr-2" />
              <label class="text-sm text-gray-600">Transaction payée</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Vue tablette/desktop : tableau traditionnel -->
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
                <option value="Factures">Factures</option>
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
                  @click="startEditing(transaction)"
                  class="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                >
                  Éditer
                </button>
                <button
                  v-if="editingTransaction && editingTransaction.id === transaction.id"
                  @click="saveEditing"
                  class="bg-green-500 text-white px-2 py-1 rounded text-xs"
                >
                  Sauver
                </button>
                <button
                  v-if="editingTransaction && editingTransaction.id === transaction.id"
                  @click="cancelEditing"
                  class="bg-gray-500 text-white px-2 py-1 rounded text-xs"
                >
                  Annuler
                </button>
                <button
                  v-if="
                    transaction.id !== undefined &&
                    (!editingTransaction || editingTransaction.id !== transaction.id)
                  "
                  @click="handleDelete(transaction.id)"
                  class="bg-red-500 text-white px-2 py-1 rounded text-xs"
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

    <!-- Message si aucune transaction -->
    <div v-if="transactions.length === 0" class="text-center py-8 text-gray-500">
      Aucune transaction à afficher
    </div>
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

const cancelEditing = () => {
  editingTransaction.value = null
}
</script>
