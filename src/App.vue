<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useFetchBankingDetails } from './services/useFetchBankingDetails';

const useBankingDetailsService = useFetchBankingDetails();

useBankingDetailsService.getBankingDetailsByUserId(1);



</script>

<template>
  <h2 v-if="useBankingDetailsService.loading.value">...</h2>
  <h1 v-else>{{ useBankingDetailsService.error.value }}</h1>
  <a class="link m-2" href="/profile">profil </a>
  <a class="link m-2" href="/budget">budget </a>
  <a class="link m-2" href="/">Home d</a>
  <RouterView />



</template>
