<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useFetchTransaction } from './stores/useFetchTransaction';
import { onMounted } from 'vue';

const useTransactionService = useFetchTransaction();

onMounted(() => {
  useTransactionService.GET_TRANSACTIONS_BY_USER_ID(1);
})






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
