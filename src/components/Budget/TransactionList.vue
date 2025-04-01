<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="flex justify-between items-center">
        <h2 class="card-title text-primary">Liste des transactions</h2>
        <button @click="openDeleteNonRecurrentModal" class="btn btn-warning">
          Nouveau mois
        </button>
      </div>

      <!-- Indicateur de chargement -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-8">
        <span class="loading loading-spinner loading-lg text-primary"></span>
        <p class="mt-2 text-base-content/70">Chargement des transactions...</p>
      </div>



      <!-- Vue mobile : cartes pour chaque transaction -->
      <div class="block lg:hidden space-y-4">
        <div
          v-for="transaction in transactions"
          :key="transaction.id ?? 0"
          class="card bg-base-100 shadow-sm"
        >
          <div class="card-body p-4">
            <div class="flex justify-between items-center">
              <h3 class="font-bold text-primary text-lg">{{ capitalizeText(transaction.description ?? '-') }}</h3>
              <span
                :class="
                  transaction.type === EType.EXPENSE
                    ? 'badge badge-error badge-sm'
                    : 'badge badge-success badge-sm'
                "
              >
                {{ transaction.type }}
              </span>
            </div>

            <div class="grid grid-cols-2 gap-2 text-sm my-3">
              <div>
                <p class="text-base-content/70">Montant</p>
                <p class="font-medium">{{ transaction.amount }}$</p>
              </div>
              <div>
                <p class="text-base-content/70">Catégorie</p>
                <p>{{ transaction.category ?? '-' }}</p>
              </div>
              <div>
                <p class="text-base-content/70">Date de début</p>
                <p>{{ formatDate(transaction.startDate) }}</p>
              </div>
              <div>
                <p class="text-base-content/70">Date de fin</p>
                <p>{{ transaction.endDate ? formatDate(transaction.endDate) : '-' }}</p>
              </div>
              <div>
                <p class="text-base-content/70">Fréquence</p>
                <p>{{ FREQUENCY_LABELS[getFrequencyKey(transaction.frequency)] }}</p>
              </div>
              <div>
                <p class="text-base-content/70">Statut</p>
                <button
                  @click="toggleStatus(transaction)"
                  :class="transaction.isDone ? 'badge badge-success' : 'badge badge-warning'"
                  class="mt-1"
                >
                  {{ transaction.isDone ? 'Récurrent' : 'Non Récurrent' }}
                </button>
              </div>
            </div>

            <div class="card-actions justify-end border-t pt-2">
              <button
                v-if="!editingTransaction || editingTransaction.id !== transaction.id"
                @click="startEditing(transaction)"
                class="btn btn-sm btn-info"
              >
                Éditer
              </button>
              <button
                v-if="editingTransaction && editingTransaction.id === transaction.id"
                @click="saveEditing"
                class="btn btn-sm btn-success"
              >
                Sauvegarder
              </button>
              <button
                v-if="editingTransaction && editingTransaction.id === transaction.id"
                @click="cancelEditing"
                class="btn btn-sm btn-ghost"
              >
                Annuler
              </button>
              <button
                v-if="
                  transaction.id !== undefined &&
                  (!editingTransaction || editingTransaction.id !== transaction.id)
                "
                @click="openDeleteSingleModal(transaction.id)"
                class="btn btn-sm btn-error"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Vue tablette/desktop : tableau traditionnel -->
      <div class="hidden lg:block overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Description</th>
              <th>Montant</th>
              <th>Type</th>
              <th>Date de début</th>
              <th class="hidden xl:table-cell">Date de fin</th>
              <th class="hidden xl:table-cell">Fréquence</th>
              <th>Catégorie</th>
              <th>Statut</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="transaction in transactions"
              :key="transaction.id ?? 0"
              class="hover"
            >
              <td>
                <span v-if="!editingTransaction || editingTransaction.id !== transaction.id">
                  {{ capitalizeText(transaction.description ?? '-') }}
                </span>
                <input
                  v-else
                  v-model="editingTransaction.description"
                  type="text"
                  class="input input-bordered input-sm w-full"
                />
              </td>
              <td>
                <span
                  v-if="!editingTransaction || editingTransaction.id !== transaction.id"
                  class="font-medium"
                >
                  {{ transaction.amount }}$
                </span>
                <input
                  v-else
                  v-model.number="editingTransaction.amount"
                  type="number"
                  class="input input-bordered input-sm w-full"
                />
              </td>
              <td>
                <span
                  v-if="!editingTransaction || editingTransaction.id !== transaction.id"
                  :class="
                    transaction.type === EType.EXPENSE
                      ? 'badge badge-error badge-sm'
                      : 'badge badge-success badge-sm'
                  "
                >
                  {{ transaction.type === EType.EXPENSE ? 'Dépenses' : 'Revenue' }}
                </span>
                <select
                  v-else
                  v-model="editingTransaction.type"
                  class="select select-bordered select-sm w-full"
                >
                  <option :value="EType.EXPENSE">Dépenses</option>
                  <option :value="EType.REVENUE">Revenue</option>
                </select>
              </td>
              <td>
                <span v-if="!editingTransaction || editingTransaction.id !== transaction.id">
                  {{ formatDate(transaction.startDate) }}
                </span>
                <input
                  v-else
                  v-model="editingTransaction.startDate"
                  type="date"
                  class="input input-bordered input-sm w-full "
                />
              </td>
              <td class="hidden xl:table-cell">
                <span v-if="!editingTransaction || editingTransaction.id !== transaction.id">
                  {{ transaction.endDate ? formatDate(transaction.endDate) : '-' }}
                </span>
                <input
                  v-else
                  v-model="editingTransaction.endDate"
                  type="date"
                  class="input input-bordered input-sm w-full"
                />
              </td>
              <td class="hidden xl:table-cell">
                <span v-if="!editingTransaction || editingTransaction.id !== transaction.id">
                  {{ FREQUENCY_LABELS[getFrequencyKey(transaction.frequency)] }}
                </span>
                <select
                  v-else
                  v-model="editingTransaction.frequency"
                  class="select select-bordered select-sm w-full"
                >
                  <option v-for="(label, key) in FREQUENCY_LABELS" :key="key" :value="EFrequency[key as keyof typeof EFrequency]">
                    {{ label }}
                  </option>
                </select>
              </td>
              <td>
                <span v-if="!editingTransaction || editingTransaction.id !== transaction.id">
                  {{ capitalizeText(transaction.category ?? '-') }}
                </span>
                <input
                  v-else
                  v-model="editingTransaction.category"
                  class="input input-bordered input-sm w-full"
                >
              </td>
              <td>
                <button
                  v-if="!editingTransaction || editingTransaction.id !== transaction.id"
                  @click="toggleStatus(transaction)"
                  :class="transaction.isDone ? 'badge badge-info' : 'badge badge-base-300'"
                >
                  {{ transaction.isDone ? 'Récurrent' : 'Non Récurrent' }}
                </button>
                <div v-else class="flex items-center">
                  <input v-model="editingTransaction.isDone" type="checkbox" class="toggle toggle-sm toggle-success mr-2" />
                  <span class="text-sm">Récurrent</span>
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
                    @click="openDeleteSingleModal(transaction.id)"
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

      <!-- Message si aucune transaction -->
      <div v-if="transactions.length === 0 && !isLoading" class="alert alert-info shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>Aucune transaction à afficher</span>
      </div>
    </div>
  </div>

  <!-- Modal d'édition -->
  <input  type="checkbox" id="edit-modal" class="modal-toggle " v-model="isEditModalOpen" />
  <div class="modal sm:hidden max-sm:block" :class="{ 'modal-open': isEditModalOpen }" >
    <div class="modal-box">
      <h3 class="font-bold text-lg">Éditer la transaction</h3>
      <div v-if="editingTransaction" class="py-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text text-primary">Description</span>
            </label>
            <input type="text" v-model="editingTransaction.description" class="input input-bordered" />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text text-primary">Montant</span>
            </label>
            <input type="number" v-model.number="editingTransaction.amount" class="input input-bordered" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-2">
          <div class="form-control">
            <label class="label">
              <span class="label-text text-primary">Date de début</span>
            </label>
            <input type="date" v-model="editingTransaction.startDate" class="input input-bordered" />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text text-primary">Date de fin</span>
            </label>
            <input type="date" v-model="editingTransaction.endDate" class="input input-bordered" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-2">
          <div class="form-control">
            <label class="label">
              <span class="label-text text-primary">Fréquence</span>
            </label>
            <select v-model="editingTransaction.frequency" class="select select-bordered w-full">
              <option v-for="(label, key) in FREQUENCY_LABELS" :key="key" :value="EFrequency[key as keyof typeof EFrequency]">
                {{ label }}
              </option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text text-primary">Type</span>
            </label>
            <select v-model="editingTransaction.type" class="select select-bordered w-full">
              <option :value="EType.EXPENSE">Dépenses</option>
              <option :value="EType.REVENUE">Revenue</option>
            </select>
          </div>
        </div>

        <div class="form-control mt-2">
          <label class="label cursor-pointer justify-start gap-4">
            <span class="label-text text-primary">Catégorie</span>
            <input type="text" v-model="editingTransaction.category" class="input input-bordered" />
          </label>
        </div>
        <div class="grid grid-cols-2 gap-4 mt-2">
          <div class="form-control mt-2">
            <label class="label cursor-pointer justify-start gap-4">
              <span class="label-text text-primary">Récurrent</span>
              <input type="checkbox" v-model="editingTransaction.isDone" class="toggle toggle-success" />
            </label>
          </div>
        </div>
      </div>
      <div class="modal-action">
        <button @click="saveEditing" class="btn btn-success">Sauvegarder</button>
        <button @click="cancelEditing" class="btn">Annuler</button>
      </div>
    </div>
  </div>

  <!-- Modal de confirmation pour la suppression des transactions non récurrentes -->
  <input type="checkbox" id="delete-non-recurrent-modal" class="modal-toggle" v-model="isDeleteNonRecurrentModalOpen" />
  <div class="modal" :class="{ 'modal-open': isDeleteNonRecurrentModalOpen }">
    <div class="modal-box">
      <h3 class="font-bold text-lg">
        {{ deleteMode === 'month' ? 'Confirmation nouveau mois' : 'Confirmation de suppression' }}
      </h3>
      <p class="py-4">
        {{ deleteMode === 'month'
          ? 'Êtes-vous sûr de vouloir commencer un nouveau mois ? Toutes les transactions non récurrentes seront supprimées.'
          : 'Êtes-vous sûr de vouloir supprimer cette transaction ?' }}
      </p>
      <div class="modal-action">
        <button @click="handleDelete" class="btn" :class="deleteMode === 'month' ? 'btn-primary' : 'btn-error'">
          {{ deleteMode === 'month' ? 'Confirmer' : 'Supprimer' }}
        </button>
        <button @click="isDeleteNonRecurrentModalOpen = false" class="btn">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { EFrequency, EType, type ITransaction, FREQUENCY_LABELS } from '../../models/transaction.interface'
import { useBudgetStore } from '../../stores/useBudgetStore'

// Interface pour l'édition avec les dates en string
interface IEditingTransaction extends Omit<ITransaction, 'startDate' | 'endDate'> {
  startDate: string;
  endDate?: string;
}

const budgetStore = useBudgetStore()
const isLoading = ref(true)
const editingTransaction = ref<IEditingTransaction | null>(null)
const isEditModalOpen = ref(false)
const isDeleteNonRecurrentModalOpen = ref(false)
const deleteMode = ref<'single' | 'month'>('month')
const transactionToDelete = ref<number | null>(null)

// Utiliser computed pour réagir aux changements du store
const transactions = computed(() => budgetStore.transactions)

const formatDate = (date: string | Date): string => {
  return new Date(date).toISOString().split('T')[0]
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

const handleDelete = async () => {
  try {
    if (deleteMode.value === 'month') {
      const nonRecurrentTransactions = transactions.value.filter(t => !t.isDone && t.id !== undefined)
      for (const transaction of nonRecurrentTransactions) {
        await budgetStore.deleteTransaction(transaction.id!)
      }
    } else if (deleteMode.value === 'single' && transactionToDelete.value) {
      await budgetStore.deleteTransaction(transactionToDelete.value)
    }
    isDeleteNonRecurrentModalOpen.value = false
    transactionToDelete.value = null
  } catch (error) {
    console.error('Erreur lors de la suppression:', error)
    alert('Une erreur est survenue lors de la suppression.')
  }
}

const startEditing = (transaction: ITransaction) => {
  editingTransaction.value = {
    ...transaction,
    startDate: new Date(transaction.startDate).toISOString().split('T')[0],
    endDate: transaction.endDate ? new Date(transaction.endDate).toISOString().split('T')[0] : undefined
  }
  isEditModalOpen.value = true
}

const saveEditing = async () => {
  if (!editingTransaction.value || editingTransaction.value.id === undefined) return
  try {
    await budgetStore.updateTransaction(editingTransaction.value.id, {
      description: editingTransaction.value.description,
      amount: Number(editingTransaction.value.amount),
      startDate: new Date(editingTransaction.value.startDate),
      endDate: editingTransaction.value.endDate ? new Date(editingTransaction.value.endDate) : undefined,
      frequency: editingTransaction.value.frequency,
      category: editingTransaction.value.category,
      isDone: editingTransaction.value.isDone,
      type: editingTransaction.value.type
    })
    isEditModalOpen.value = false
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la transaction:', error)
    alert(error instanceof Error ? error.message : 'Une erreur est survenue lors de la sauvegarde de la transaction.')
  }
  finally {
    editingTransaction.value = null
  }
}

const cancelEditing = () => {
  editingTransaction.value = null
  isEditModalOpen.value = false
}

const capitalizeText = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

const getFrequencyKey = (frequency: EFrequency): keyof typeof EFrequency => {
  return EFrequency[frequency] as keyof typeof EFrequency
}

const openDeleteNonRecurrentModal = () => {
  deleteMode.value = 'month'
  isDeleteNonRecurrentModalOpen.value = true
}

const openDeleteSingleModal = (id: number) => {
  deleteMode.value = 'single'
  transactionToDelete.value = id
  isDeleteNonRecurrentModalOpen.value = true
}

onMounted(async () => {
  try {
    isLoading.value = true
    await budgetStore.loadTransactions()
    console.log('Transactions chargées au montage :', transactions.value)
  } catch (error) {
    console.error('Erreur lors du chargement des transactions:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<style>
/* Personnalisation du date picker */
input[type="date"] {
  color-scheme: light;
  background-color: white;
  color: #333;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  background-color: white;
  padding: 4px;
  cursor: pointer;
  border-radius: 4px;
}

input[type="date"]::-webkit-calendar-picker-indicator:hover {
  background-color: #f0f0f0;
}
</style>
